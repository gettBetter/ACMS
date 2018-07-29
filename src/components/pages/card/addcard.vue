<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-bottom:20px">部门人员树</div>
          <el-tree :data="treeData" :props="treeProp" @node-click="handleNodeClick" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll">
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
          <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="cardConfig" :disabled="disableBtn">发卡</el-button>

          <el-table :data="pageData" border @selection-change="selectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="emp_indx" label="用户ID"></el-table-column>
            <el-table-column prop="emp_code" label="用户编号"></el-table-column>
            <el-table-column prop="emp_name" label="用户姓名"></el-table-column>
            <el-table-column prop="crd_code" label="证件编码"></el-table-column>
            <el-table-column prop="dep_name" label="所属部门"></el-table-column>
            <el-table-column prop="rnk_name" label="人员类别"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <card-config ref="cardConfig" :config="config"></card-config>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
import CardConfig from "./CardConfig";

export default {
  components: {
    CardConfig
  },
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
      user_list: [],
      disableBtn: true
    };
  },
  methods: {
    reset() {
      this.user_list = [];
    },
    selectionChange(data) {
      console.info(data);
      this.user_list = data.map(item => {
        let { emp_indx, crd_code } = item;
        return { emp_indx, crd_code };
      });
      if (this.user_list.length) this.disableBtn = false;
    },
    handleNodeClick(node, data) {
      const isDep = !node.emp_indx;
      console.info("isDep", isDep, node, data);
      let param = {};
      if (isDep) {
        param = `/card/nocard_userlist/dep_indx/${node.dep_indx}`;
        // param = {
        //   dep_indx: node.dep_indx
        // };
      } else {
        param = {
          emp_indx: node.emp_indx
        };
      }

      this.getList(param);
    },
    getTree() {
      axios
        .get("/card/card_add_data_tree")
        .then(data => {
          console.info("tree", data.data);
          // this.treeData = data.data.data[0].children;
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
        .get(param)
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
    cardConfig() {
      this.$refs.cardConfig.openConfig();
    },
    config(val) {
      if (val) {
        this.getList();
      }
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
  created() {
    this.reset();
    this.getTree();
  }
};
</script>
