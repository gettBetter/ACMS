<template>
    <el-dialog width="50%" style="min-height:400px" title="选择部门人员" :visible.sync="dialogVisible" append-to-body center>

        <el-form :data="data" label-width="80px" :inline="true">
            <el-form-item label="姓名:">
                <el-input v-model="data.emp_name"></el-input>
            </el-form-item>
            <el-form-item label="编号:">
                <el-input v-model="data.emp_indx"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
        </el-form>

        <el-tree :data="treeData" :props="treeProp" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll" show-checkbox @check-change="handleCheckChange" ref="depTree" node-key="emp_indx" default-expand-all>
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
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import axios from "axios";
// import { Loading } from "element-ui";
// import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";

export default {
  data() {
    return {
      dialogVisible: false,
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      },
      data: {},
      userList:{},
      formLabelWidth: "80px",
      flatData:[]
    };
  },
  computed: {
  },
  methods: {
    open() {
      this.dialogVisible = true;
      this.getTree();
    },
    getTree(param){
        axios
        .get("/index/dept_users_tree",{params:param})
        .then(data => {
          console.info("tree", data.data);
          const temp = data.data.data[0];
          function getChildren(arr) {
            arr.forEach(item => {
              item.label = item.dep_name || item.emp_name;
              if (item.children) {
                if (item.user_list) {
                  item.children = item.children.concat(item.user_list);
                }
                getChildren(item.children,data);
              } else {
                item.label = item.emp_name || item.dep_name;
                if (item.user_list) {
                  item.children = item.user_list.map(item => {
                    item.label = item.emp_name || item.dep_name;
                    return item;
                  });
                }
              }
            });
          }
          getChildren(temp);
          this.treeData = temp;
        })
    },
    query(){
        const setKeys = []
        const param = this.data
            function getIndx(arr1,arr2,name){
                arr1.forEach(item=>{
                    if(item.children){
                        getIndx(item.children,arr2,name)
                    }else{
                        if(item.emp_indx){
                            if(item.emp_name === name){
                                arr2.push(item.emp_indx)
                            }
                        }
                    }
                })
            }

            if(param.emp_name){
                getIndx(this.treeData,setKeys,param.emp_name)
                console.info('setKey',setKeys)
            }
            if(param.emp_indx){
                setKeys.push(param.emp_indx)
            }
            
        this.$refs.depTree.setCheckedKeys(setKeys)
    },
    handleCheckChange(data, checked, indeterminate) {
      this.userList = this.$refs.depTree
        .getCheckedKeys()
        .filter(item => !!item)
        .join(',');
        console.info(this.userList)
        
    },
    save() {
        this.dialogVisible = false;
        if(this.userList.length > 0){
            this.$emit('getUserList',  this.userList)
        }
        
    }
  }
};
</script>
