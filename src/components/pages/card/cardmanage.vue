<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div style="margin-bottom:20px">部门人员树</div>
                    <el-tree :data="treeData" :props="treeProp" @node-click="handleNodeClick" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll">
                        <!-- show-checkbox @check-change="handleCheckChange" -->
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>
                                <!-- <span v-if="data.emp_indx">
                                    <el-checkbox :v-model="false" :id="data.emp_indx" @change="checed=>changeUserList(checed,node,data)"></el-checkbox>
                                </span> -->
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
                    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="add">发卡</el-button>

                    <el-table :data="pageData" border>
                        width="80%"
                        <el-table-column fixed="left" label="操作" width="160px">
                            <template slot-scope="scope">
                                <el-button @click="edit(scope.row)" type="text" title="编辑">
                                    <i class="el-icon-edit"></i>
                                </el-button>

                                <el-button @click="loss(scope.row)" type="text" title="挂失" style="font-size:12px" v-if="scope.row.sta_indx != '4'">
                                    <i class="iconfont icon-guashi"></i>
                                </el-button>

                                <el-button @click="unloss(scope.row)" type="text" title="解挂" style="font-size:12px" v-if="scope.row.sta_indx == '4'">
                                    <i class="iconfont icon-jiegua"></i>
                                </el-button>

                                <el-button @click="exchange(scope.row)" type="text" title="换卡">
                                    <i class="iconfont icon-zhuanhuan"></i>
                                </el-button>

                                <el-button @click="remove(scope.row)" type="text" title="注销">
                                    <i class="iconfont icon-xiaohu"></i>
                                </el-button>

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
        .get("/index/dept_users_tree")
        .then(data => {
          console.info("tree", data.data);
          const temp = data.data.data[0].children;
          function getChildren(arr) {
            arr.forEach(item => {
              item.label = item.dep_name || item.emp_name;
              if (item.children) {
                if (item.user_list) {
                  item.children = item.children.concat(item.user_list);
                }
                getChildren(item.children);
              } else {
                item.label = item.emp_name || item.dep_name;
                item.children = item.user_list.map(item => {
                  item.label = item.emp_name || item.dep_name;
                  return item;
                });
              }
            });
          }
          getChildren(temp);
          this.treeData = temp;
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
        .get("/card/card_user_list", { params: param })
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
    add() {
      this.$parent.$router.push({
        name: "addcard"
      });
    },
    exchange() {
      this.$parent.$router.push("/admin/user/adduser");
    },
    loss(recored) {
      let param = {
        crd_indx: recored.crd_indx
      };

      this.$confirm(`卡片一经挂失，其卡号被列入各业务系统黑名单中，导致卡片不可用。确实要挂失卡号为${recored.crd_indx}的卡片?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/card/card_loss", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "挂失成功!"
                });
                this.getList();
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    unloss(recored) {
      let param = {
        crd_indx: recored.crd_indx
      };

      this.$confirm(`卡片一经解挂，其卡号变为可用。确实要解挂卡号为${recored.crd_indx}的卡片?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/card/card_unloss", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "解挂成功!"
                });
                this.getList();
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },

    remove(recored) {
      let param = {
        crd_indx: recored.crd_indx
      };

      this.$confirm("此操作需要回收所有POS的交易数据，是否已回收?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/card/card_remove", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "销户成功!"
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
  },
  activated() {
    this.getList();
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


