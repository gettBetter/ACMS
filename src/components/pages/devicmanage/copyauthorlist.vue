<template>
    <div class="addaut">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="11" :offset="1">
                    <div style="margin-bottom:20px">部门人员树</div>
                    <el-tree :data="userTreeData" :props="userTreeProp" @node-click="handleNodeClick" :expand-on-click-node="false" highlight-current style="max-height:400px;overflow:scroll">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>
                                <!-- :checked="userChecked" -->
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
                    </el-tree>
                </el-col>

            </el-row>
        </el-card>
    </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import "../../../assets/iconfont/iconfont.css";

export default {
  data() {
    return {
      userTreeData: [],
      userTreeProp: {
        label: "label",
        children: "children"
      },
      origUser: {}
    };
  },
  computed: {},
  methods: {
    handleCheckedGroup(val) {
      console.info(val, this.checkedUsers);
    },
    refresh() {
      this.getTreeData();
    },
    handleNodeClick(node, data) {
      //   console.info(node, data, this.$refs.userCheckbox);
    },
    changeUserList(checked, node, data) {
      //   let _this = document.getElementById(data.emp_indx);
      let doms = document.getElementsByClassName(
        "el-checkbox__input is-checked"
      );
      doms[0].className = "el-checkbox__input";
      //   _this.className = "el-checkbox userCheckbox is-checked";

      this.origUser = data;
    },
    setUserList({ type, user }) {
      if (type === "add") {
        this.userList.push(user);
      } else if (type === "del") {
        let idx = userList.findIndex(item => item.dev_indx == user.dev_indx);
        if (idx != -1) {
          this.userList.splice(idx, 1);
        }
      } else if (type === "clean") {
        this.userList = [];
      }
      cosnole.info("userList", this.userList);
    },
    getTreeData() {
      //部门人员树
      axios.get("/authorlist/dept_users_auth_tree").then(data => {
        if (data.data.success) {
          //   console.info("tree", data.data.data);
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
          this.userTreeData = temp;
          console.info("userTreeData", this.userTreeData);
        }
      });
      //   区域设备通道树
    },
    save() {
      const param = this.addData;
      delete param.ROW_NUMBER;
      console.info(param);
      axios.post("/authorlist/authorlist_add", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.$router.go(-1);
        }
      });
    }
  },
  activated() {
    this.refresh();
  }
};
</script>

<style>
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

