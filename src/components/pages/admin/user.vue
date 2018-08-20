<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-bottom:20px">部门</div>
          <el-tree :data="depData" :props="treeProp" default-expand-all @node-click="handleNodeClick" style="max-height:600px;overflow:scroll">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span>
                  <i class="iconfont icon-plus-departments" style="padding:0 4px" />
                </span>
                <span>{{node.label}}</span>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="18">
          <div style="margin-bottom:20px">用户列表</div>
          <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="addUser">添加</el-button>
          <!-- <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="exportTemplate">导出模板</el-button> -->
          <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="importExcel">导入</el-button>
          <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="exportExcel">导出</el-button>

          <el-table :data="pageData" border :default-sort="{prop: 'reg_time', order: 'descending'}">
            <el-table-column fixed="left" label="操作" width="80%">
              <template slot-scope="scope">
                <el-button @click="popupEdit(scope.row)" type="text" size="">
                  <i class="el-icon-edit"></i>
                </el-button>

                <el-button type="text" @click="delUser(scope.row)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="emp_indx" label="用户ID" sortable></el-table-column>
            <el-table-column prop="emp_code" label="用户编号" sortable></el-table-column>
            <el-table-column prop="emp_name" label="用户姓名" sortable></el-table-column>
            <el-table-column prop="dep_name" label="所属部门"></el-table-column>
            <!-- <el-table-column prop="role_name" label="角色"></el-table-column> -->
            <el-table-column prop="gdr_indx" label="性别" sortable></el-table-column>
            <el-table-column prop="reg_time" label="注册时间 " sortable></el-table-column>
            <el-table-column prop="est_indx" label="人员状态" sortable></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>

    </el-card>
    <ImportExcel ref="importExcel" @importSuccess="importSuccess"></ImportExcel>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import "../../../assets/iconfont/iconfont.css";
import _ from "lodash";
import ImportExcel from "./ImportExcel";
import baseURL from "@/utils/baseURL";

export default {
  components: {
    ImportExcel
  },
  data() {
    return {
      baseURL,
      currentPage: 1,
      pageCurSize: 10,
      userInfo: {},
      depData: [],
      treeProp: {
        label: "dep_name",
        children: "children"
      },
      allListData: []
    };
  },
  methods: {
    handleNodeClick(node, data) {
      console.info(node, data);
      const param = { dep_indx: node.dep_indx };
      this.allListData = [];
      this.getUserList(param);
    },
    getTree() {
      axios
        .get("/index/dept_users_tree")
        .then(data => {
          this.depData = data.data.data[0];
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    importSuccess() {
      this.getUserList();
    },
    getUserList(param) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios
        .get("/user/user_list", { params: param })
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              this.allListData = data.data.listuser;
            } else {
              alert(data.data.msg);
            }
          },
          data => loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    },
    addUser() {
      this.$parent.$router.push("/admin/user/adduser");
    },
    exportExcel() {
      const url = this.exportUrl;
      console.info("exportUrl", url, this.exportUrl);
      window.open(url, "_blank");
    },
    importExcel() {
      this.$refs.importExcel.open();
    },
    delUser(recored) {
      let param = {
        emp_indx: recored.emp_indx
      };

      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/user/user_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getUserList();
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    popupEdit(recored) {
      this.$parent.$router.push({
        name: "userinfo",
        params: { userId: recored.emp_indx }
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  },
  computed: {
    total() {
      return this.allListData.length;
    },
    chunkList() {
      return _.chunk(this.allListData, this.pageCurSize);
    },
    pageData() {
      return this.chunkList[this.currentPage - 1];
    },
    exportUrl() {
      const token = JSON.parse(localStorage.userToken);
      return `${this.baseURL}/user/user_report/token/${
        token.token
      }/username/${token.username}`;
    }
  },
  activated() {
    this.getUserList();
    this.getTree();
  }
};
</script>

<style >
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>


