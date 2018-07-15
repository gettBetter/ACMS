<template>
  <div>
    <el-card class="box-card">
      <!-- <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-bottom:20px">门禁权限管理</div> -->
      <!-- <el-row>
            <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="add">添加</el-button>
            <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="copyAuth">复制授权</el-button>
            <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="jobAuth">岗位授权</el-button>
          </el-row> -->
      <!-- show-checkbox  @check="checkTree"-->
      <!-- <el-tree :data="treeData" :props="treeProp" @node-click="handleNodeClick" :expand-on-click-node="false" highlight-current style="max-height:600px;overflow:scroll">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span v-if="data.tag == 2">
                  <el-checkbox :v-model="false" @change="checed=>changeUserList(checed,node,data)"></el-checkbox>
                </span>
                <span v-if="data.tag == 1">
                  <i class="iconfont icon-plus-departments" style="padding:0 4px" />
                </span>
                <span v-if="data.tag == 2">
                  <i class="iconfont icon-renyuan" style="padding:0 4px" />
                </span>
                <span>{{node.label}}</span>
              </span>
            </span>
          </el-tree> -->
      <!-- </el-col> -->
      <!-- <el-col :span="18"> -->
      <div style="margin-bottom:20px">门禁权限列表</div>
      <el-row>
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="add">添加</el-button>
        <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="copyAuth">复制授权</el-button>
        <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="jobAuth">岗位授权</el-button>
      </el-row>
      <el-table :data="pageData" border>
        <el-table-column fixed="left" label="操作" width="80%">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="">
              <i class="el-icon-edit"></i>
            </el-button>

            <el-button type="text" @click="del(scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>

        <el-table-column prop="emp_indx" label="人员编号"></el-table-column>
        <el-table-column prop="emp_name" label="人员姓名"></el-table-column>
        <el-table-column prop="dep_name" label="部门"></el-table-column>
        <el-table-column prop="dev_indx" label="设备编号"></el-table-column>
        <el-table-column prop="chn_indx" label="通道编号"></el-table-column>
        <el-table-column prop="tmr_name" label="应用群组"></el-table-column>
        <el-table-column prop="mcd_name" label="设备组别"></el-table-column>
        <el-table-column prop="grp_name" label="设备组别"></el-table-column>
        <el-table-column prop="fcd_name" label="检查APB"></el-table-column>
        <el-table-column prop="aut_flag" label="是否授权"></el-table-column>

      </el-table>

      <div class="block ">
        <el-pagination @current-change="handleCurrentChange " :current-page="currentPage " :page-size="10 " layout="total, prev, pager, next, jumper " :total="total ">
        </el-pagination>
      </div>
      <!-- </el-col> -->
      <!-- </el-row> -->

    </el-card>

  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      pageCurSize: 10,
      list: [],
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      }
    };
  },
  methods: {
    copyAuth() {
      this.$parent.$router.push({
        name: "copyauthorlist"
      });
    },
    jobAuth() {
      this.$parent.$router.push({
        name: "jobauthorlist"
      });
    },
    changeUserList(checked, node, data) {
      if (checked) {
        this.setUserList({ type: "add", user: data });
      } else {
        this.setUserList({ type: "del", user: data });
      }
    },
    getTree() {
      axios.get("/authorlist/dept_users_auth_tree").then(data => {
        if (data.data.success) {
          console.info("tree", data.data.data);
          let temp = data.data.data;
          function getChildren(arr) {
            arr.forEach(item => {
              item.label = item.dep_name || item.emp_name;
              if (item.children) {
                if (item.dev_list) {
                  item.children = item.children.concat(item.dev_list);
                }
                getChildren(item.children);
              } else {
                item.label = item.emp_name || item.dep_name;
                item.children = item.dev_list.map(item => {
                  item.label = item.emp_name || item.dep_name;
                  return item;
                });
              }
            });
          }
          getChildren(temp);
          console.info("2", temp);
          this.treeData = temp;
        }
      });
    },
    getList(param) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      this.list = [];
      axios
        .get("/authorlist/authorlist_list", { params: param })
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
    handleNodeClick(node, data) {
      console.info(node, data);
    },
    edit(record) {
      console.info(record);
      this.$parent.$router.push({
        name: "editauthorlist",
        params: { dev: record.dev_indx, emp: record.emp_indx }
      });
    },
    add() {
      this.$parent.$router.push({
        name: "addauthorlist"
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
    // ...mapMutations({
    //   setUserList: "authorlist/setUserList"
    // })
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
    this.getTree();
    this.getList();
    // this.setUserList({ type: "clean", user: [] });
  }
};
</script>

<style scoped>
</style>


