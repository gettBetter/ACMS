<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>

      <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;" @click="addUser">添加</el-button>

      <el-table :data="pageData" border>
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

        <el-table-column prop="emp_indx" label="用户ID" width="80%"></el-table-column>
        <el-table-column prop="emp_code" label="用户编号" width="80%"></el-table-column>
        <el-table-column prop="emp_name" label="用户姓名" width="100%"></el-table-column>
        <el-table-column prop="dep_name" label="所属部门"></el-table-column>
        <el-table-column prop="role_name" label="WEB角色名称"></el-table-column>
        <el-table-column prop="gdr_indx" label="性别" width="80%"></el-table-column>
        <el-table-column prop="reg_time" label="注册时间 "></el-table-column>
        <el-table-column prop="est_indx" label="人员状态" width="80%"></el-table-column>
        <el-table-column prop="rnk_indx" label="人员类别"></el-table-column>
        <el-table-column prop="crt_code" label="证件号码"></el-table-column>
      </el-table>

      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

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
      currentPage: 1,
      pageCurSize: 10,
      dialogTableVisible: false,
      dialogFormVisible: false,
      userInfo: {},
      innerVisible: false,
      depData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      userEditData: {},
      allListData: []
    };
  },
  methods: {
    getUserList() {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get("/user/user_list").then(
        data => {
          if (data.data.success === true) {
            loadingInstance.close();
            this.allListData = data.data.listuser;
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    addUser() {
      this.$parent.$router.push("/admin/user/adduser");
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
    }
  },
  activated() {
    this.getUserList();
  }
  // beforeRouteEnter(to, from, next) {
  //   if (to.query.saveBack) {
  //     next(vm => vm.getUserList());
  //   }
  //   next();
  // }
};
</script>

<style >
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>


