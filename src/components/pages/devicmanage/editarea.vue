<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑区域</span>
      </div>

      <el-form :model="editData">
        <!-- <el-form-item :label-width="formLabelWidth" label="序号：">
                    <span>{{editData.are_indx}}</span>
                </el-form-item> -->

        <el-form-item :label-width="formLabelWidth" label="区域名称：">
          <el-input v-model="editData.are_name"></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="上级区域：">
          <el-row>
            <el-col :span="17">
              <el-input v-model="editData.par_indx" v-if="false"></el-input>
              <span>{{editData.p_are_name}}
              </span>
            </el-col>
            <el-col :span="6" ::offset="1">
              <el-button type="text" @click="openTree">选择区域</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <el-row style="text-align:center;margin-top:40px;margin-bottom:20px">
        <el-button class="submit-btn" type="primary" @click="save">确定</el-button>
        <el-button class="cancel-btn" @click="cancel">取消</el-button>
      </el-row>
    </el-card>

    <el-dialog width="40%" min-height="200px" title="选择区域" :visible.sync="treeVisible" append-to-body>
      <el-tree :data="areaTree" :props="treeProp" accordion @node-click="handleNodeClick">
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formLabelWidth: "20%",
      editData: {},
      areaTree: [],
      treeVisible: false,
      editDialog: false,
      treeProp: {
        label: "are_name",
        children: "children"
      }
    };
  },
  methods: {
    getEditData() {
      const param = {
        are_indx: this.$route.params.id
      };

      axios.get("/devicearea/devicearea_edit_data", { params: param }).then(
        data => {
          if (data.data.success === true) {
            console.info(data.data);
            this.editData = data.data.data[0];
            this.areaTree = data.data.devicearea_tree;
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    openTree() {
      console.info(this.areaTree);
      this.treeVisible = true;
    },
    handleNodeClick(node) {
      this.editData.p_are_name = node.are_name;
      this.editData.par_indx = node.are_indx;
      this.treeVisible = false;
    },
    save() {
      const param = this.editData;
      delete param.ROW_NUMBER;
      delete param.p_are_name;

      console.info(param);
      axios.post("/devicearea/devicearea_edit_save", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          this.$router.go(-1);
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  computed: {},
  activated() {
    this.editData = {};
    this.areaTree = [];
    this.getEditData();
  }
};
</script>

<style >
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}

.submit-btn,
.cancel-btn {
  width: 160px;
}
</style>


