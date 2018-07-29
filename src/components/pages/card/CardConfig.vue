<template>
    <el-dialog width="70%" style="min-height:400px" title="换卡" :visible.sync="dialogVisible" append-to-body center>
        <el-row :gutter="20">
            <el-col :span="8">
                <div style="margin-bottom:20px">部门人员树</div>
                <el-tree :data="treeData" :props="treeProp" ref="areaTree" :expand-on-click-node="false" @check-change="handleCheckChange" highlight-current style="max-height:600px;overflow:scroll" show-checkbox node-key="are_indx">
                </el-tree>
            </el-col>
            <el-col :span="14" :offset="1">
                <el-form :model="data">
                    <el-form-item :label-width="formLabelWidth" label="证卡类型:">
                        <el-select v-model="data.typ_indx">
                            <el-option v-for="opt in type_list" :label="opt.typ_name" :value="opt.typ_indx" :key="opt.typ_indx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" label="收工本费:">
                        <el-input type="number" v-model="data.inc_cost">
                            <template slot="prepend">￥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" label="到期时间:">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="data.end_date" type="date">
                        </el-date-picker>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";

export default {
  data() {
    return {
      dialogVisible: false,
      treeData: [],
      treeProp: {
        label: "are_name",
        children: "children"
      },
      data: {},
      formLabelWidth: "80px",
      type_list: [],
      //   sta_list: [],
      are_list: []
    };
  },
  computed: {
    user_list() {
      return this.$parent.$data.user_list;
    }
  },
  methods: {
    openConfig() {
      console.info("user_list", this.user_list);
      this.dialogVisible = true;
      this.getTree();
    },
    handleCheckChange(data, checked, indeterminate) {
      this.areaList = this.$refs.areaTree
        .getCheckedKeys()
        .filter(item => !!item);
      console.info(this.areaList);
    },
    getTree() {
      axios
        .get("/card/card_area_config_data")
        .then(data => {
          console.info("tree", data.data);
          this.treeData = data.data.data[0].children;
          this.type_list = data.data.type_list;
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    save() {
      const param = this.data;
      param.user_list = this.user_list;
      param.are_list = this.are_list;
      console.info(param);
      axios
        .post("/card/card_add", param)
        .then(data => {
          this.dialogVisible = false;
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "发卡成功!"
            });
            this.$emit("config", true);
          }
        })
        .catch(err => {
          this.dialogVisible = false;
        });
    }
  },
  created() {},
  mounted() {}
};
</script>
