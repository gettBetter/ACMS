<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加部门</span>
      </div>

      <div class="warningbox">
        <span class="el-icon-bell warning"></span>
        <span class="warning-text">提示：当上级部门为空时候，你所新增的为根目录</span>
      </div>

      <el-form :model="addDepData" :rules="rules" ref="addDepData">
        <el-form-item :label-width="formLabelWidth" label="部门名称：" prop="dep_name">
          <el-input v-model="addDepData.dep_name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="上级部门：">
          <el-row>
            <el-col :span="13">
              <el-input v-model="addDepData.par_indx" v-if="false"></el-input>
              <span>{{addDepData.p_dep_name}}
              </span>
            </el-col>
            <el-col :span="6" ::offset="1">
              <el-button type="text" @click="openDepTree">选择部门</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-form-item :label-width="formLabelWidth" label="部门层级：">
              <el-input v-model="addDepData.dep_rank"></el-input>
            </el-form-item> -->
        <el-form-item :label-width="formLabelWidth" label="部门前缀：">
          <el-input v-model="addDepData.dep_pref"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="部门领导：">
          <el-input v-model="addDepData.dep_prnc"></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="生效日期：">
          <el-date-picker value-format="yyyy-MM-dd" v-model="addDepData.end_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

      </el-form>

      <el-row style=" padding: 20px 0 40px 0;margin-left: 20%;">
        <el-button class="submit-btn" type="primary" @click="depAddSave('addDepData')">确定</el-button>
        <el-button class="cancel-btn" @click="addCancel">取消</el-button>
      </el-row>

      <el-dialog width="40%" min-height="200px" title="选择部门" :visible.sync="treeVisible" append-to-body>
        <el-tree :data="depData" :props="treeProp" accordion @node-click="handleNodeClick">
        </el-tree>
      </el-dialog>
    </el-card>

  </div>
</template>


<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";

export default {
  data() {
    return {
      addDepData: {},
      formLabelWidth: "20%",
      treeVisible: false,
      depData: [],
      treeProp: {
        label: "dep_name",
        children: "children"
      },
      rules: {
        dep_name: [
<<<<<<< HEAD
          { required: true, message: '请输入部门名称', trigger: 'blur' },
=======
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
>>>>>>> f61615dfd49a6b7d6e2106f626c51f23137b6f0a
        ]
      }
    };
  },
  methods: {
    openDepTree() {
      axios
        .get("/index/dept_tree")
        .then(data => {
          this.depData = data.data.deptree;
        })
        .catch(data => {
          alert(data.data.msg);
        });
      this.treeVisible = true;
    },
    handleNodeClick(node) {
      this.addDepData.p_dep_name = node.dep_name;
      this.addDepData.par_indx = node.dep_indx;
      this.treeVisible = false;
    },
    depAddSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.addDepData;
<<<<<<< HEAD
          delete params.p_dep_name

          axios.post('/dept/dept_add',params).then(res=>{
            console.log(res.data)
            this.$router.go(-1);
          }).catch(res=>{

          })
=======
          delete params.p_dep_name;
>>>>>>> f61615dfd49a6b7d6e2106f626c51f23137b6f0a

          axios
            .post("/admin/dept/dept_add", params)
            .then(res => {
              console.log(res.data);
              this.$router.go(-1);
            })
            .catch(res => {});
        } else {
          return false;
        }
      });
    },
    addCancel() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.el-input,
.el-date-editor.el-input {
  width: 60%;
}
.submit-btn,
.cancel-btn {
  width: 100px;
}
.warningbox {
  margin-left: 20%;
  padding: 0px 0 30px 0;
}
.warning {
  font-size: 20px;
  color: #ff4040;
}
.warning-text {
  font-size: 14px;
  color: #7b7b7b;
}
</style>