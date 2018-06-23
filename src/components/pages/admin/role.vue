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

        <!-- 编辑角色     -->
        <el-dialog width="40%" title="编辑角色" :visible.sync="editDialog" append-to-body>
            <el-form :model="editData">
                <el-form-item :label-width="formLabelWidth" label="角色ID：">
                    <el-input v-model="editData.r_id"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="角色名称：">
                    <el-input v-model="editData.role_name"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="描述：">
                    <el-input v-model="editData.description"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="角色代码：">
                    <el-input v-model="editData.action_list"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth"></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editSave">确 定</el-button>
                <el-button @click="editDialog = false">取 消</el-button>
            </span>
        </el-dialog>

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
      editDialog: false
    };
  },
  methods: {
    addRole() {},
    editRole(data) {
      const param = {
        r_id: data.r_id
      };
      console.info("param", param);
      axios
        .get("/role/role_edit_data", { params: param })
        .then(data => {
          if (data.data.success) {
            console.info(data.data);
            this.editData = data.data.role_data[0];
            this.editDialog = true;
          } else {
            //   ...
          }
        })
        .catch(err => alert(err));
    },
    delRole(data) {},
    editSave() {
      const param = this.editData;
      delete param.ROW_NUMBER;
      axios.post("/role/role_edit_save", param).then(data => {
        this.getRoleList();
        this.editDialog = false;
      });
    },
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


