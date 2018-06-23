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

        <!-- 修改菜单 -->
        <el-dialog width="40%" title="编辑菜单" :visible.sync="editDialog" append-to-body>
            <el-form :model="editMenuData">
                <el-form-item :label-width="formLabelWidth" label="菜单名称：">
                    <el-input v-model="editMenuData.name"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="菜单代码：">
                    <el-input v-model="editMenuData.action_code"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="菜单路径：">
                    <el-input v-model="editMenuData.path"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="菜单组件：">
                    <el-input v-model="editMenuData.component"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="所属大类：">
                    <el-select v-model="editMenuData.parent_id">
                        <el-option v-for="opt in firstMenu" :label="opt.name" :value="opt.a_id" :key="opt.a_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="排序号：">
                    <el-input type="number" v-model="editMenuData.sort"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="menuEditSave">确 定</el-button>
                <el-button @click="editDialog = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";

export default {
  data() {
    return {
      formLabelWidth: "100px",
      menuTree: [],
      treeProp: {
        label: "name",
        children: "children"
        // isLeaf: true
      },
      editMenuData: {},
      firstMenu: [],
      editDialog: false
    };
  },
  methods: {
    addMenu(node, data) {},
    editMenu(node, data) {
      const param = {
        a_id: data.a_id
      };
      axios.get("/sysmenu/sysmenu_edit_data", { params: param }).then(data => {
        if (data.data.success) {
          console.info(data.data);
          this.editMenuData = data.data.sysmenu_data[0];
          this.firstMenu = data.data.sysmenu_first;
          this.editDialog = true;
        }
      });
    },
    menuEditSave() {
      const param = this.editMenuData;
      axios
        .post("/sysmenu/sysmenu_edit_save", param)
        .then(data => {
          if (data.data.success) {
            this.editDialog = false;
            this.getMenuTree();
          }
        })
        .catch(err => alert(err));
    },
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


