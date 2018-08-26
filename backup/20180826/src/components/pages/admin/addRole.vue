<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加角色</span>
      </div>
      <el-form :model="addData" ref="addRole" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="角色名称：" prop="role_name">
          <el-input v-model="addData.role_name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="描述：">
          <el-input type="textarea" :rows="2" v-model="addData.description"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="菜单权限：">
          <div v-for="(menu,index) in menuTree" :key="menu.a_id">
            <div class="itemclass">
              <el-checkbox v-model="isIndeterminate[index]" @change="checed=>handleCheckAllChange(checed,menu,index)"> {{menu.name}}</el-checkbox>
            </div>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="menuCheckData" @change="node=>CheckedChange(node,menu.children,index)">
              <el-checkbox v-for="item in menu.children" :label="item.action_code" :key="item.a_id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>

      <el-row style=" padding: 20px 0 40px 0;margin-left: 20%;">
        <el-button class="submit-btn" type="primary" @click="addSave">确定</el-button>
        <el-button class="cancel-btn" @click="addCancel">取消</el-button>
      </el-row>

    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
// import _ from "lodash";

export default {
  data() {
    return {
      formLabelWidth: "20%",
      addData: {
        action_list: ""
      },
      menuTree: [],
      menuCheckData: [],
      // isIndeterminate: true,
      isIndeterminate: [],
      rules: {
        role_name: [
          {
            required: true,
            message: "角色名称不得为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    CheckedChange(node, data, index) {
      this.menuCheckData = node;
      this.addData.action_list = this.menuCheckData.join(",");
      const ret = data
        .map(item => item.action_code)
        .every(item => node.includes(item));
      this.$set(this.isIndeterminate, index, ret);
    },
    handleCheckAllChange(val, menu, index) {
      // console.info("val", val, menu);
      this.$set(this.isIndeterminate, index, val);
      if (val) {
        menu.children.forEach(chlid => {
          if (chlid.action_code) {
            if (!this.menuCheckData.includes(chlid.action_code)) {
              this.menuCheckData.push(chlid.action_code);
            }
          }
        });
      } else {
        menu.children.forEach(chlid => {
          if (chlid.action_code) {
            let idx = this.menuCheckData.indexOf(chlid.action_code);
            if (idx != -1) {
              this.menuCheckData.splice(idx, 1);
            }
          }
        });
      }
      this.addData.action_list = this.defaultCheckedData.join(",");
    },
    addRole() {
      axios
        .get("/role/role_add_data")
        .then(data => {
          if (data.data.success) {
            this.menuTree = data.data.data;
          } else {
          }
        })
        .catch(err => alert(err));
    },
    addSave() {
      this.$refs.addRole.validate(valid => {
        if (valid) {
          const param = this.addData;
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          axios.post("/role/role_add", param).then(data => {
            if (data.data.success) {
              this.$refs.addRole.resetFields();
              this.$router.go(-1);
            }
          });
        }
      });
    },
    addCancel() {
      this.$router.go(-1);
    }
  },
  activated() {
    // this.addData = {};
    // this.menuTree = [];
    // this.menuCheckData = [];
    this.addRole();
  }
};
</script>

<style scoped>
.el-input,
.el-date-editor.el-input,
.el-textarea {
  width: 80%;
}
.submit-btn,
.cancel-btn {
  width: 100px;
}
.itemclass {
  background-color: #f3f3f3;
  padding-left: 10px;
  margin-top: 10px;
  width: 80%;
}
.el-checkbox-group {
  padding-left: 35px;
  width: 80%;
}
</style>


