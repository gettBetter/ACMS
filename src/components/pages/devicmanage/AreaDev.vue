<template>
    <el-dialog width="50%" style="min-height:400px" title="选择区域设备" :visible.sync="dialogVisible" append-to-body center>
        <el-tree :data="treeData" :props="treeProp" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll" show-checkbox @check-change="handleCheckChange" ref="depTree" node-key="dev_indx" defalult-expand-all>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span v-if="data.tag == 1">
                  <i class="iconfont icon-ditu" style="padding:0 4px" />
                </span>
                <span v-if="data.tag == 2">
                  <i class="iconfont icon-menjinshebei" style="padding:0 4px" />
                </span>
                <span v-if="data.tag == 3">
                  <i class="iconfont icon-tongdao" style="padding:0 4px" />
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
      devList:'',
      formLabelWidth: "80px"
    };
  },
  computed: {
    // user_list() {
    //   return this.$parent.$data.user_list;
    // }
  },
  methods: {
    open() {
    //   console.info("user_list", this.user_list);
      this.dialogVisible = true;
      this.getTree();
    },
    getTree() {
      axios.get("/authorlist/authorlist_channel_tree").then(data => {
        if (data.data.success) {
          console.info(data.data);
          let temp = data.data.data;
          function getChildren(arr) {
            arr.forEach(item => {
              item.label = item.are_name || item.emp_name;
              if (item.children) {
                if (item.dev_list) {
                  item.children = item.children.concat(item.dev_list);
                }
                getChildren(item.children);
              } else {
                item.label = item.are_name || item.dev_name;
                if (item.dev_list) {
                  item.children = item.dev_list.map(item => {
                    item.label = item.emp_name || item.dev_name;
                    return item;
                  });
                }
              }
            });
          }
          getChildren(temp);
          this.treeData = temp;
        }
      });
    },
    query(){
        const param = this.data
        this.getTree(param)
    },
    handleCheckChange(data, checked, indeterminate) {
      this.devList = this.$refs.depTree
        .getCheckedKeys()
        .filter(item => !!item)
        .join(',');
        console.info('devlist',this.devList)
        
    },
    save() {
        this.dialogVisible = false;
        if(this.devList.length > 0){
            this.$emit('getDevList',  this.devList)
        }
    }
  }
};
</script>
