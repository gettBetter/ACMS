<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加区域</span>
      </div>

      <el-form :model="addData" :rules="rules" ref="addArea">
        <!-- <el-form-item :label-width="formLabelWidth" label="序号：">
                    <el-input v-model="addData.are_indx"></el-input>
                </el-form-item> -->
        <el-form-item :label-width="formLabelWidth" label="区域名称：" prop="are_name">
          <el-input v-model="addData.are_name"></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="上级区域：" prop="par_indx">
          <el-row>
            <el-col :span="17">
              <el-input v-model="addData.par_indx" v-if="false"></el-input>
              <span>{{addData.p_are_name}}
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
      addData: {},
      areaTree: [],
      treeVisible: false,
      editDialog: false,
      treeProp: {
        label: "are_name",
        children: "children"
      },
      rules: {
        are_name: [
          { required: true, message: "区域名称不能为空", trigger: "blur" }
        ],
        par_indx: [
          { required: true, message: "上级区域不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getaddData() {
      axios.get("/devicearea/devicearea_tree").then(
        data => {
          if (data.data.success === true) {
            console.info(data.data);
            // this.addData = data.data.data[0];
            this.areaTree = data.data.data;
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
      this.addData.p_are_name = node.are_name;
      this.addData.par_indx = node.are_indx;
      this.treeVisible = false;
    },
    save() {
      this.$refs.addArea.validate(valid => {
        if (valid) {
          const param = this.addData;
          delete param.ROW_NUMBER;
          delete param.p_are_name;

          console.info(param);
          axios.post("/devicearea/devicearea_add", param).then(data => {
            if (data.data.success) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$router.go(-1);
            }
          });
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  computed: {},
  activated() {
    this.addData = {};
    this.areaTree = [];
    this.$refs.addArea.resetFields();
    this.getaddData();
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


