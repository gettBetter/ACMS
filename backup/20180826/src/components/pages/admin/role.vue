<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色列表</span>
      </div>

      <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;" @click="addRole">添加</el-button>

      <el-table :data="roleList" border>
        <el-table-column fixed="left" label="操作" width="80%">
          <template slot-scope="scope">
            <el-button @click="editRole(scope.row)" type="text">
              <i class="el-icon-edit"></i>
            </el-button>

            <el-button type="text" @click="delRole(scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="r_id" label="角色ID" width="80%"></el-table-column>
        <el-table-column prop="role_name" label="角色名称" width="300%"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <!-- <el-table-column prop="action_list" label="菜单权限"></el-table-column> -->
      </el-table>
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
      formLabelWidth: "100px",
      roleList: [],
      editData: {},
      defaultCheckedData: []
    };
  },
  methods: {
    addRole() {
      this.$parent.$router.push({ name: "addRole" });
    },
    editRole(data) {
      console.log(this.$router);
      this.$router.push({ name: "editRole", params: { r_id: data.r_id } });
    },
    delRole(data) {
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const param = {
            params: {
              r_id: data.r_id
            }
          };
          axios("/role/role_del", param)
            .then(data => {
              if (data.data.success) {
                this.getRoleList();
              }
            })
            .catch(err => alert(arr));
        })
        .catch(() => {});
    },
    getRoleList() {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios
        .get("/role/role_list")
        .then(
          data => {
            if (data.data.success) {
              loadingInstance.close();
              console.info(data);
              this.roleList = data.data.data;
            }
          },
          data => loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    }
  },
  activated() {
    this.getRoleList();
  }
};
</script>

<style >
.el-tree {
  margin-top: 8px;
}
</style>


