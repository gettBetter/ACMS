<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>菜单管理</span>
            </div>
            <div class="block">
                <el-tree :data="menuTree" node-key="id" default-expand-all @node-click="handleNodeClick" :props="treeProp" :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-button v-if="data.children" @click="addMenu(node,data)" type="text">
                                <i class="el-icon-plus"></i>
                            </el-button>
                            <el-button @click="editMenu(node,data)" type="text">
                                <i class="el-icon-edit"></i>
                            </el-button>
                            <el-button @click="delMenu(node,data)" type="text">
                                <i class="el-icon-delete"></i>
                            </el-button>
                        </span>
                    </span>
                </el-tree>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";

export default {
  data() {
    return {
      menuTree: [],
      treeProp: {
        label: "name",
        children: "children"
        // isLeaf: true
      }
    };
  },
  methods: {
    addMenu(node, data) {},
    editMenu(node, data) {},
    delMenu(node, data) {
      const param = {
        a_id: data.a_id
      };
      axios.post("/sysmenu/sysmenu_del", param).then(data => {
        if (data.data.success) {
          this.getMenuTree();
        }
      });
      console.info(node, data);
    },
    handleNodeClick(node) {
      console.info(node);
    },
    getMenuTree() {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get("/sysmenu/sysmenu_tree").then(data => {
        loadingInstance.close();
        console.info(data);
        this.menuTree = data.data.sysmenu_tree;
      });
    }
  },
  created() {
    this.getMenuTree();
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>


