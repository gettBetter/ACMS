<template>
  <div class="addaut">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="11" :offset="1">
          <div style="margin-bottom:20px">部门人员树</div>
          <el-tree :data="userTreeData1" :props="userTreeProp1" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span v-if="data.tag == 2">
                  <el-checkbox :v-model="false" :id="data.emp_indx" class="usercheckbox" @change="checed=>changeUserList(checed,node,data)" on-click=""></el-checkbox>
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

        <el-col :span="11" :offset="1">
          <div style="margin-bottom:20px">待授权人员树</div>
          <el-tree :data="userTreeData2" :props="userTreeProp2" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span v-if="data.tag == 2">
                  <el-checkbox :v-model="false" :id="data.emp_indx" class="usercheckbox" @change="checed=>changecUserList(checed,node,data)" on-click=""></el-checkbox>
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
      <el-row style="text-align:center;margin-top:40px;margin-bottom:20px">
        <el-button class="submit-btn" type="primary" @click="save">确定</el-button>
        <el-button class="cancel-btn" @click="cancel">取消</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import "../../../assets/iconfont/iconfont.css";
import _ from "lodash";

export default {
  data() {
    return {
      userTreeData1: [],
      userTreeProp1: {
        label: "label",
        children: "children"
      },
      userTreeData2: [],
      userTreeProp2: {
        label: "label",
        children: "children"
      },
      b_copy_user: "",
      s_copy_user: [],
      firstChange: true
    };
  },
  computed: {},
  methods: {
    refresh() {
      this.getTreeData();
    },
    changeUserList(checked, node, data) {
      let usercheckbox = document.getElementsByClassName(
        "el-checkbox usercheckbox is-checked"
      );

      if (this.firstChange) {
        this.firstChange = false;
      } else {
        usercheckbox[0].click();
      }
      this.b_copy_user = data.emp_indx;
      console.info(this.b_copy_user, data.emp_indx);
    },
    changecUserList(checked, node, data) {
      if (checked) {
        this.s_copy_user.push(data.emp_indx);
      } else {
        _.pull(this.s_copy_user, data.emp_indx);
      }
    },
    getTreeData() {
      //部门人员树
      axios.get("/authorlist/dept_users_auth1_tree").then(data => {
        if (data.data.success) {
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
                if (item.dev_list) {
                  item.children = item.dev_list.map(item => {
                    item.label = item.emp_name || item.dep_name;
                    return item;
                  });
                }
              }
            });
          }
          getChildren(temp);
          this.userTreeData1 = temp;
          console.info("userTreeData", this.userTreeData);
        }
      });

      axios.get("/authorlist/dept_users_auth2_tree").then(data => {
        if (data.data.success) {
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
                if (item.dev_list) {
                  item.children = item.dev_list.map(item => {
                    item.label = item.emp_name || item.dep_name;
                    return item;
                  });
                }
              }
            });
          }
          getChildren(temp);
          this.userTreeData2 = temp;
          console.info("userTreeData", this.userTreeData);
        }
      });
    },
    save() {
      const param = {
        b_copy_user: this.b_copy_user,
        s_copy_user: this.s_copy_user
      };

      console.info(param);
      axios.post("/authorlist/copy_users_auth", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "复制权限成功!"
          });
          this.$router.go(-1);
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  activated() {
    this.refresh();
  }
};
</script>

<style>
</style>

