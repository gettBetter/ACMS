<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>菜单管理</span>
            </div>
            <div class="block menubox">
                <div style="text-align: right;">
                    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px;" @click="addMenu">添加菜单</el-button>
                </div>
                <el-tree :data="menuTree" node-key="id" default-expand-all @node-click="handleNodeClick" :props="treeProp" :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
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

        <!-- adds菜单 -->
        <el-dialog width="40%" title="添加菜单"  :visible.sync="addDialog" append-to-body>
            <el-form :model="addMenuData" :rules="rules" ref="addMenuData">
                <el-form-item :label-width="formLabelWidth" label="菜单名称：" prop="name">
                    <el-input v-model="addMenuData.name"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="菜单代码：" prop="action_code">
                    <el-input v-model="addMenuData.action_code"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="菜单路径：" prop="path">
                    <el-input v-model="addMenuData.path"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="菜单组件：" prop="component">
                    <el-input v-model="addMenuData.component"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="所属大类：" prop="parent_id">
                    <el-select v-model="addMenuData.parent_id">
                        <el-option v-for="opt in firstMenu" :label="opt.name" :value="opt.a_id" :key="opt.a_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="排序号：">
                    <el-input type="number" v-model="addMenuData.sort"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="menuAddSave('addMenuData')">确 定</el-button>
                <el-button @click="addDialog = false">取 消</el-button>
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
      },
      editMenuData: {},
      editDialog: false,
      addDialog: false,
      addMenuData: {},
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ],
        action_code: [
          { required: true, message: '请输入菜单代码', trigger: 'blur' },
        ],
        path: [
          { required: true, message: '请输入菜单路径', trigger: 'blur' },
        ],
        component: [
          { required: true, message: '请输入菜单组件', trigger: 'blur' },
        ],
        parent_id: [
          { required: true, message: '请输入所属大类', trigger: 'change' },
        ]
      }
    };
  },
  computed:{
    firstMenu(){
      let newMenu=this.menuTree.concat([]);
      newMenu.unshift({name:"无",a_id:0})
      return newMenu
    }
  },
  methods: {
    addMenu() {
      this.addDialog = true;
      this.addMenuData.sort = 100;
    },
    editMenu(node, data) {
      const param = {
        a_id: data.a_id
      };
      axios.get("/sysmenu/sysmenu_edit_data", { params: param }).then(data => {
        if (data.data.success) {
          this.editMenuData = data.data.sysmenu_data[0];
          this.editDialog = true;
          if(this.editMenuData.parent_id==='0'){
            this.editMenuData.parent_id=0;
          }
        }
      });
    },
    menuEditSave() {
      const param = this.editMenuData;
      delete param.ROW_NUMBER;
      delete param.menu;
      axios.post("/sysmenu/sysmenu_edit_save", param)
        .then(data => {
          if (data.data.success) {
            this.editDialog = false;
            this.getMenuTree();
          }
        }).catch(err => alert(err));
    },
    menuAddSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.addMenuData;
          axios.post('/sysmenu/sysmenu_add',params).then(res=>{
            this.addDialog = false;
            this.getMenuTree();
            this.$refs[formName].resetFields();
          }).catch(res=>{})
        } else {
          return false;
        }
      });
    },
    delMenu(node, data) {
      const param = {
        a_id: data.a_id
      };
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/sysmenu/sysmenu_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getMenuTree();
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
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

<style scoped>
.menubox {
  margin-left: 20%;
  width: 50%;
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


