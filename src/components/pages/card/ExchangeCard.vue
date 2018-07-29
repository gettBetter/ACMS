<template>
  <div id="exchange-card">
    <el-dialog width="70%" style="min-height:400px" title="换卡" :visible.sync="dialogVisible" append-to-body center>
      <el-row>
        <el-col :span="8">
          <!-- <div style="font-size:16px;margin-bottom:10px">区域树</div> -->
          <el-tree :data="treeData" :props="treeProp" ref="areaTree" :expand-on-click-node="false" @check-change="handleCheckChange" highlight-current style="max-height:600px;overflow:scroll" show-checkbox node-key="are_indx">
          </el-tree>
        </el-col>
        <el-col :span="14" :offset="1">
          <el-form :model="data">
            <el-form-item :label-width="formLabelWidth" label="人员编号:">
              <span v-text="data.emp_code"></span>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="人员姓名:">
              <span v-text="data.emp_name"></span>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="所属部门:">
              <span v-text="data.dep_name"></span>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="人员类别:">
              <span v-text="data.rnk_name"></span>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="证件号码:">
              <span v-text="data.crt_code"></span>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="卡序号:">
              <el-input v-model="data.crd_indx"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="卡物理号:">
              <el-input v-model="data.crd_code"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="证卡状态:">
              <el-select v-model="data.sta_indx">
                <el-option v-for="opt in sta_list" :label="opt.sta_name" :value="opt.sta_indx" :key="opt.sta_indx">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="证卡类型:">
              <el-select v-model="data.typ_indx">
                <el-option v-for="opt in type_list" :label="opt.typ_name" :value="opt.typ_indx" :key="opt.typ_indx">
                </el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: "80px",
      treeData: [],
      treeProp: {
        label: "are_name",
        children: "children"
      },
      data: {},
      exchangeData: {},
      type_list: [],
      sta_list: [],
      areaList: []
    };
  },
  methods: {
    openExchange() {
      this.dialogVisible = true;
      this.isExchanged = false;
      this.getTree();
      const param = {
        crd_indx: this.crdIndx
      };
      this.getData(param);
      console.info("param", param);
    },

    handleCheckChange(data, checked, indeterminate) {
      console.info(
        data,
        checked,
        indeterminate,
        this.$refs.areaTree.getCheckedKeys()
      );
      this.areaList = this.$refs.areaTree
        .getCheckedKeys()
        .filter(item => !!item);
    },
    getTree() {
      axios
        .get("/card/card_area_config_data")
        .then(data => {
          console.info("tree", data.data);
          this.treeData = data.data.data[0].children;
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    getData(param) {
      axios
        .get("/card/card_exchange", { params: param })
        .then(data => {
          console.info("card_exchange", data.data);
          this.data = data.data.data[0];
          this.type_list = data.data.card_type;
          this.sta_list = data.data.card_sta;
          console.info("this.data", this.data);
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    save() {
      //...
      const param = this.data;
      delete param.ROW_NUMBER;
      delete param.emp_code;
      delete param.emp_name;
      delete param.dep_name;
      delete param.dep_indx;
      delete param.rnk_name;
      delete param.rnk_indx;
      delete param.dep_indx;
      delete param.crt_code;
      delete param.emp_pswd;
      delete param.sta_name;
      delete param.typ_name;

      console.info(param);
      axios.post("/card/card_exchange_save", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "换卡成功!"
          });
          //   this.$router.go(-1);
          this.dialogVisible = false;
          this.$emit("exchanged", true);
        }
      });
    }
  },
  computed: {
    crdIndx() {
      return this.$parent.$data.crdIndx;
    }
  },
  created() {},
  mounted() {
  },
  watch: {
  }
};
</script>

<style>
</style>
