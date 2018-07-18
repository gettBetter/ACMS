<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员列表</span>
      </div>
      <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="add">添加</el-button>
      <!-- <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="copyAuth">复制授权</el-button>
            <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="jobAuth">岗位授权</el-button> -->

      <el-table :data="pageData" border>
        <el-table-column fixed="left" label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" title="编辑">
              <i class="el-icon-edit"></i>
            </el-button>

            <el-button type="text" @click="del(scope.row)" title="删除">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button type="text" @click="resetPW(scope.row)" title="重置密码">
              <i class="iconfont icon-zhongzhi"></i>
            </el-button>
          </template>
        </el-table-column>

        <el-table-column prop="emp_indx" label="人员序号"></el-table-column>
        <el-table-column prop="emp_code" label="人员编号"></el-table-column>
        <el-table-column prop="emp_name" label="人员姓名"></el-table-column>
        <el-table-column prop="role_name" label="角色名称"></el-table-column>
        <el-table-column prop="aut_flag" label="是否授权"></el-table-column>
      </el-table>

      <div class="block ">
        <el-pagination @current-change="handleCurrentChange " :current-page="currentPage " :page-size="10 " layout="total, prev, pager, next, jumper " :total="total ">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
// import { mapMutations } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      pageCurSize: 10,
      list: []
    };
  },
  methods: {
    getList(param) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      this.list = [];
      axios
        .get("/useradmin/useradmin_list")
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              console.info(data.data);
              this.list = data.data.data.map(item => {
                item.aut_flag = item.aut_flag == 1 ? "授权" : "未授权";
                return item;
              });
            } else {
              alert(data.data.msg);
            }
          },
          data => loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    },
    edit(record) {
      console.info(record);
      this.$parent.$router.push({
        name: "edituseradmin",
        params: { emp: record.emp_indx }
      });
    },
    add() {
      this.$parent.$router.push({
        name: "adduseradmin"
      });
    },
    del(record) {
      let param = {
        dev_indx: record.dev_indx,
        emp_indx: record.emp_indx
      };

      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/authorlist/authorlist_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    resetPW(record) {
      let param = {
        emp_indx: record.emp_indx
      };

      this.$confirm("请确认重置密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/admin/useradmin/reset_pwd", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "密码重置成功!"
                });
                this.getList();
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  },
  computed: {
    total() {
      return this.list.length;
    },
    chunkList() {
      return _.chunk(this.list, this.pageCurSize);
    },
    pageData() {
      return this.chunkList[this.currentPage - 1];
    }
    // ...mapState({
    //   userList: state => state.authorlist.userList
    // })
  },
  activated() {
    this.getList();
  }
};
</script>

<style scoped>
</style>


