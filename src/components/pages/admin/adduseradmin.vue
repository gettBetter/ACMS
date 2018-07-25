<template>
  <div>
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
                <span>添加管理员</span>
            </div> -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div style="margin-bottom:20px">部门人员树</div>
          <el-tree :data="userTreeData" :props="userTreeProp" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll">
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
        <el-col :span="14" :offset="1">
          <!-- <div style="margin-bottom:20px">g</div> -->
          <el-form :model="data" style="margin-top:20px">

            <el-form-item :label-width="formLabelWidth" label="用户ID:">
              <el-input v-model="addUser.emp_indx" disabled></el-input>
            </el-form-item>

            <!-- <el-form-item :label-width="formLabelWidth" label="用户编号:">
                            <el-input v-model="addUser.emp_code" disabled></el-input>
                        </el-form-item> -->

            <el-form-item :label-width="formLabelWidth" label="用户姓名:">
              <el-input v-model="addUser.emp_name" disabled></el-input>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="选择角色:">
              <el-select v-model="data.role_id">
                <el-option v-for="opt in roles" :label="opt.id" :value="opt.role_name" :key="opt.id">
                </el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item :label-width="formLabelWidth" label="角色ID:">
                            <el-input v-model="data.r_id"></el-input>
                        </el-form-item> -->

            <!-- <el-form-item :label-width="formLabelWidth" label="角色名称:">
                            <el-input v-model="data.ole_name"></el-input>
                        </el-form-item> -->

            <el-form-item :label-width="formLabelWidth" label="角色说明:">
              <el-input v-model="data.usr_role"></el-input>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="首次修改密码:">
              <el-select v-model="data.new_isok">
                <el-option v-for="opt in yseOrNot" :label="opt.label" :value="opt.value" :key="opt.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="是否停用:">
              <el-select v-model="data.stp_isok">
                <el-option v-for="opt in yseOrNot" :label="opt.label" :value="opt.value" :key="opt.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="密码:">
              <el-input v-model="data.usr_pswd"></el-input>
            </el-form-item>

          </el-form>
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
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
export default {
  props: ["emp"],
  data() {
    return {
      formLabelWidth: "30%",
      data: {},
      yseOrNot: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      roles: [],
      userTreeData: [],
      userTreeProp: {
        label: "label",
        children: "children"
      },
      firstChange: true,
      addUser: {}
      //   treeData: [],
      //   treeProp: {
      //     label: "",
      //     children: children
      //   }
      //   defaultCheckedData: [],
      //   isIndeterminate: true
    };
  },
  methods: {
    changeUserList(checked, node, data) {
      let usercheckbox = document.getElementsByClassName(
        "el-checkbox usercheckbox is-checked"
      );

      if (this.firstChange) {
        this.firstChange = false;
      } else {
        usercheckbox[0].click();
      }
      this.addUser = data;
      console.info(this.addUser, data);
    },
    getTreeData() {
      //部门人员树
      axios.get("/index/dept_users_tree").then(data => {
        if (data.data.success) {
          let temp = data.data.data;

          // this.userTreeData = data.data.data;
          console.info("user", data.data);
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
            this.userTreeData = temp;
        }
      });
    },
    getRoles() {
      axios.get("/useradmin/useradmin_add_data").then(data => {
        if (data.data.success) {
          console.info("roles", data.data);
          this.roles = data.data.data;
        }
      });
    },
    save() {
      const param = this.data;
      delete param.ROW_NUMBER;
      param.emp_indx = this.addUser.emp_indx;

      axios.post("/useradmin/useradmin_add", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "添加成功!"
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
    this.getTreeData();
    this.getRoles();
  }
};
</script>

<style scoped>
</style>


