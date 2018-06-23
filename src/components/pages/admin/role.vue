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
                <el-table-column prop="role_name" label="角色名称" width="80%"></el-table-column>
                <el-table-column prop="description" label="描述" width="100%"></el-table-column>
                <el-table-column prop="action_list" label="角色代码"></el-table-column>
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
      roleList: []
    };
  },
  methods: {
    addRole() {},
    editRole(data) {},
    delRole(data) {},
    getRoleList() {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios
        .get("/role/role_list")
        .then(data => {
          if (data.data.success) {
            loadingInstance.close();
            console.info(data);
            this.roleList = data.data.data;
          }
        })
        .catch(err => alert(err));
    }
  },
  computed: {},
  created() {
    this.getRoleList();
  }
};
</script>

<style >
/* .block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
} */
</style>


