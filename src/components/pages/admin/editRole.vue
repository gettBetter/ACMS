<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色编辑</span>
      </div>

      <!-- 编辑角色     -->
      <el-form :model="editData">
        <el-form-item :label-width="formLabelWidth" label="角色ID：">
          <el-input v-model="editData.r_id"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="角色名称：">
          <el-input v-model="editData.role_name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="描述：">
          <el-input type="textarea" :rows="2" v-model="editData.description"></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="菜单权限：">

          <div v-for="menu in menuTree" :key="menu.a_id">
            <div class="itemclass">
              <el-checkbox :indeterminate="isIndeterminate" @change="checed=>handleCheckAllChange(checed,menu)"> {{menu.name}}</el-checkbox>
            </div>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="defaultCheckedData" @change="CheckedChange">
              <el-checkbox v-for="item in menu.children" :label="item.action_code" :key="item.a_id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>

        </el-form-item>
      </el-form>

      <el-row style=" padding: 20px 0 40px 0;margin-left: 20%;">
        <el-button class="submit-btn" type="primary" @click="editSave">确定</el-button>
        <el-button class="cancel-btn" @click="editCancel">取消</el-button>
      </el-row>

    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // checkAll: false,
      formLabelWidth: "20%",
      editData: {},
      menuTree: [],
      defaultCheckedData: [],
      isIndeterminate: true
    };
  },
  methods: {
    CheckedChange(node, data) {
      this.editData.action_list = node.join(",");
    },

    handleCheckAllChange(val, menu) {
      console.info("val", val, menu);
      if (val) {
        menu.children.forEach(chlid => {
          if (chlid.action_code) {
            if (!this.defaultCheckedData.includes(chlid.action_code)) {
              this.defaultCheckedData.push(chlid.action_code);
            }
          }
        });
      } else {
        menu.children.forEach(chlid => {
          if (chlid.action_code) {
            let idx = this.defaultCheckedData.indexOf(chlid.action_code);
            if (idx != -1) {
              this.defaultCheckedData.splice(idx, 1);
            }
          }
        });
      }
      this.isIndeterminate = false;
    },
    editRole() {
      const param = {
        r_id: this.$route.params.r_id
      };
      console.info("param", param);
      axios
        .get("/role/role_edit_data", { params: param })
        .then(data => {
          if (data.data.success) {
            console.info(data.data);
            this.editData = data.data.role_data[0];
            this.menuTree = data.data.sysmenu_data;
            this.defaultCheckedData = this.editData.action_list.split(",");
          } else {
          }
        })
        .catch(err => alert(err));
    },
    editSave() {
      const param = this.editData;
      delete param.ROW_NUMBER;

      axios.post("/role/role_edit_save", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          //编辑角色后，刷新menu
          this.getMenu().then(data => {
            this.$parent.$store.commit("setMenus", data.data.menu);
            localStorage.setItem("userMenus", JSON.stringify(data.data.menu));
            this.$router.go(-1);
          });
        }
      });
    },
    getMenu() {
      return axios.get("/index/left");
    },
    editCancel() {
      this.$router.go(-1);
    }
  },
  activated() {
    this.editData = {};
    this.menuTree = [];
    this.defaultCheckedData = [];
    this.editRole();
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


