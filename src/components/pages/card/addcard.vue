<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div style="margin-bottom:20px">部门人员树</div>
                    <el-tree :data="treeData" :props="treeProp" @node-click="handleNodeClick" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>
                                <span v-if="!data.emp_indx">
                                    <i class="iconfont icon-plus-departments" style="padding:0 4px" />
                                </span>
                                <span v-if="data.emp_indx">
                                    <i class="iconfont icon-renyuan" style="padding:0 4px" />
                                </span>
                                <span>{{node.label}}</span>
                            </span>
                        </span>
                    </el-tree>
                </el-col>
                <el-col :span="18">
                    <div style="margin-bottom:20px">发卡列表</div>
                    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="addUser">发卡</el-button>

                    <el-table :data="pageData" border>
                        width="80%"
                        <el-table-column fixed="left" label="操作" width="160px">
                            <template slot-scope="scope">

                                <!-- <el-button type="text" @click="delUser(scope.row)" title="删除">
                                    <i class="el-icon-delete"></i>
                                </el-button> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="emp_indx" label="用户ID"></el-table-column>
                        <el-table-column prop="crd_indx" label="卡序号"></el-table-column>
                        <el-table-column prop="emp_code" label="用户编号"></el-table-column>
                        <el-table-column prop="emp_name" label="用户姓名"></el-table-column>
                        <el-table-column prop="dep_name" label="所属部门"></el-table-column>
                        <el-table-column prop="crd_code" label="卡物理号"></el-table-column>
                        <el-table-column prop="sta_name" label="证卡状态"></el-table-column>
                        <el-table-column prop="typ_name" label="卡类型"></el-table-column>
                        <el-table-column prop="inc_cost" label="收工本费"></el-table-column>
                        <el-table-column prop="exp_cost" label="退工本费"></el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";

export default {
  data() {
    return {
      currentPage: 1,
      pageCurSize: 10,
      userInfo: {},
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      },
      list: [],
      user_list: []
    };
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      const isDep = !data.emp_indx;
      console.info(isDep, data, checked, indeterminate);
      if (isDep) {
        console.info("1");
      } else {
        console.info("2");
      }
    },
    handleNodeClick(node, data) {
      const isDep = !node.emp_indx;
      console.info("isDep", isDep, node, data);
      let param = {};
      if (isDep) {
        param = {
          dep_indx: node.dep_indx
        };
      } else {
        param = {
          emp_indx: node.emp_indx
        };
      }

      this.getList(param);
    },
    getTree() {
      axios
        .get("/card/dept_add_data_tree")
        .then(data => {
          console.info("tree", data.data);
          //   const temp = data.data.data[0].children;
          //   function getChildren(arr) {
          //     arr.forEach(item => {
          //       item.label = item.dep_name || item.emp_name;
          //       if (item.children) {
          //         if (item.user_list) {
          //           item.children = item.children.concat(item.user_list);
          //         }
          //         getChildren(item.children);
          //       } else {
          //         item.label = item.emp_name || item.dep_name;
          //         item.children = item.user_list.map(item => {
          //           item.label = item.emp_name || item.dep_name;
          //           return item;
          //         });
          //       }
          //     });
          //   }
          //   getChildren(temp);
          //   this.treeData = temp;
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    getList(param) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".cardpage")
      });
      this.list = [];

      if (param && param.emp_indx) {
        this.getEmpList(param, loadingInstance);
      } else {
        this.getDepList(param, loadingInstance);
      }
    },
    getDepList(param, loadingInstance) {
      axios
        .get("/index/nocard_userlist", { params: param })
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              this.list = data.data.data;
            } else {
              alert(data.data.msg);
            }
          },
          data => loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    },
    getEmpList(param, loadingInstance) {
      axios
        .get("/card/card_user_select", { params: param })
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              this.list = data.data.data;
            } else {
              alert(data.data.msg);
            }
          },
          data => loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    },
    save() {
      //   /card/card_add
      const param = this.addData;
      delete param.ROW_NUMBER;
      param.user_list = this.userList;
      param.dev_list = this.devList;
      // param.chn_list = this.chnList;

      console.info(param);
      axios.post("/card/card_add", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "发卡成功!"
          });
          this.$router.go(-1);
        }
      });
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
  },
  activated() {
    // this.getList();
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


