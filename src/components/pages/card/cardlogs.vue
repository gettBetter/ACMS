<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-bottom:20px">部门人员树</div>
          <el-tree :data="treeData" :props="treeProp" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll" show-checkbox @check-change="handleCheckChange" ref="depTree" node-key="emp_indx">
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
          <el-form :inline="true" :model="queryData" class="demo-form-inline">
            <el-form-item label="操作时间:"></el-form-item>
            <el-form-item label="">
              <el-date-picker v-model="queryData.bgn_date" type="datetime" placeholder="开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="-">
              <el-date-picker v-model="queryData.end_date" type="datetime" placeholder="截止时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
          </el-form>
          <div style="margin-bottom:20px">日志查询列表</div>
          <el-table :data="pageData" border>
            <el-table-column prop="emp_code" label="人员编号"></el-table-column>
            <el-table-column prop="emp_name" label="用户姓名"></el-table-column>
            <el-table-column prop="dep_name" label="所属部门"></el-table-column>
            <el-table-column prop="old_indx" label="之前卡号"></el-table-column>
            <el-table-column prop="new_indx" label="之后卡号"></el-table-column>
            <el-table-column prop="opr_name" label="操作类型"></el-table-column>
            <el-table-column prop="usr_name" label="操作人员"></el-table-column>
            <el-table-column prop="log_time" label="操作时间"></el-table-column>
            <el-table-column prop="opr_addr" label="IP地址"></el-table-column>
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
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      },
      list: [],
      user_list: [],
      queryData: {}
    };
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      this.user_list = this.$refs.depTree
        .getCheckedKeys()
        .filter(item => !!item);
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
    getList() {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".cardpage")
      });
      this.list = [];

      const param = {
        user_list: this.user_list,
        bgn_date: queryData.bgn_date,
        end_data: queryData.end_date
      };
      axios
        .get("/card/card_log", { params: param })
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


