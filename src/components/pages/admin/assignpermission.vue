<template>
  <div class="addaut">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="11" :offset="1">
          <div style="margin-bottom:20px">部门树</div>
          <el-tree ref="depTree" :data="depTreeData" :props="depTreeProp" show-checkbox node-key="dep_indx" :default-checked-keys="depChecked" :expand-on-click-node="false" highlight-current style="max-height:600px;overflow:scroll" @check-change="handleDepCheckChange">
          </el-tree>
        </el-col>
        <el-col :span="11" :offset="1">
          <div style="margin-bottom:20px">区域树</div>
          <el-tree ref="devTree" :data="devTreeData" :props="devTreeProp" show-checkbox node-key="are_indx" :default-checked-keys="devChecked" :expand-on-click-node="false" highlight-current style="max-height:600px;overflow:scroll">
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
// import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";

export default {
  props: ["emp"],
  data() {
    return {
      depTreeData: [],
      depTreeProp: {
        label: "dep_name",
        children: "children"
      },
      devTreeData: [],
      devTreeProp: {
        label: "are_name",
        children: "children"
      },
      // getDepTop: false,
      // getAreTop: false
    };
  },
  methods: {
    refresh() {
      this.getTreeData();
    },
    // handleDepCheckChange(data, checked, indeterminate) {
    //   console.log(data, checked, indeterminate);
    //   if (checked && data.children) {
    //   }
    // },
    getTreeData() {
      axios.get(`/index/dept_noauth_tree/emp_indx/${this.emp}`).then(data => {
        if (data.data.success) {
          console.info("depTreeData", data.data.data);
          this.depTreeData = data.data.data;
        }
      });
      // /index/devicearea_tree
      axios.get(`/index/devicearea_tree/emp_indx/${this.emp}`).then(data => {
        if (data.data.success) {
          console.info("devTreeData", data.data.data);
          this.devTreeData = data.data.data;
        }
      });
    },
    save() {
      const param = {};
      delete param.ROW_NUMBER;
      param.emp_indx = this.emp;
      param.deva_list = this.$refs.devTree.getCheckedKeys();
      param.dept_list = this.$refs.depTree.getCheckedKeys();
      console.info(param);
      axios.post("/useradmin/useradmin_data_add", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "授权成功!"
          });
          this.$router.go(-1);
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    getDefaultCheckedData(arr = [], ret = []) {
      arr.forEach(item => {
        if (item.checked == 1) {
          let indx = item.are_indx || item.dep_indx;
          ret.push(indx);
        }
        if (item.children) {
          this.getDefaultCheckedData(item.children, ret);
        }
      });
    }
  },
  computed: {
    depChecked() {
      const defaultCheckNodes = [];
      this.getDefaultCheckedData(this.depTreeData, defaultCheckNodes);
      return defaultCheckNodes;
    },
    devChecked() {
      const defaultCheckNodes = [];
      this.getDefaultCheckedData(this.devTreeData, defaultCheckNodes);
      return defaultCheckNodes;
    }
  },
  activated() {
    this.refresh();
  },
  watch: {
    depCheckedData(newVal, oldVal) {
      console.info("depCheckedData", newVal.length, oldVal.length);
    }
  }
};
</script>

<style>
</style>

