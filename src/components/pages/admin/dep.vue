<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>部门列表</span>
      </div>

      <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;" @click="addDep">添加</el-button>
     
      <el-table :data="pageData" border >
        <el-table-column fixed="left" label="操作">
          <template slot-scope="scope">
            <el-button @click="editDep(scope.row)" type="text">
              <i class="el-icon-edit"></i>
            </el-button>

            <el-button type="text" @click="delDep(scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>

        <el-table-column prop="dep_indx" label="序号"></el-table-column>
        <el-table-column prop="dep_name" label="部门名称"></el-table-column>
        <el-table-column prop="p_dep_name" label="上级部门"></el-table-column>
        <el-table-column prop="dep_prnc" label="部门领导"></el-table-column>
        <el-table-column prop="dep_rank" label="部门层级"></el-table-column>
        <el-table-column prop="end_date" label="生效日期"></el-table-column>
      </el-table>

      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>

    </el-card>

    <!-- 修改部门 -->
    <el-dialog width="60%" min-height="200px" title="修改部门" :visible.sync="editDepDialog" append-to-body>
      <el-form :model="editDepData">
        <el-form-item :label-width="formLabelWidth" label="部门名称：">
          <span>{{editDepData.dep_name}}</span>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="上级部门：">
          <!-- <el-input v-model="editDepData.emp_name"></el-input> -->
          <el-row>
            <el-col :span="17">
              <el-input v-model="editDepData.par_indx" v-if="false"></el-input>
              <span>{{editDepData.par_name}}
              </span>
            </el-col>
            <el-col :span="6" ::offset="1">
              <el-button type="text" @click="openDepTree">选择部门</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="部门层级：">
          <el-input v-model="editDepData.dep_rank"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="部门前缀：">
          <el-input v-model="editDepData.dep_pref"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="部门领导：">
          <el-input v-model="editDepData.dep_prnc"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="depEditSave">确 定</el-button>
        <el-button @click="editDepDialog = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog width="40%" min-height="200px" title="选择部门" :visible.sync="treeVisible" append-to-body>
      <el-tree :data="depData" :props="treeProp" accordion @node-click="handleNodeClick">
      </el-tree>
    </el-dialog>

  </div>
</template>


<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from 'lodash'

export default {
  data() {
    return {
      formLabelWidth: "120px",
      depList: [],
      depData: [],
      treeProp: {
        label: "dep_name",
        // id: "dep_indx",
        children: "children"
      },
      currentPage: 1,
      pageCurSize: 10,
      editDepDialog: false,
      treeVisible: false,
      editDepData: {},
      orignalEditData: {}
    };
  },
  methods: {
    getDiffer(newData, oldData) {
      const differ = {};
      for (let p in newData) {
        if (newData[p] != oldData[p]) {
          differ[p] = newData[p];
        }
      }
      return differ;
    },
    addDep() {},
    delDep(record) {
      let param = {
        dep_indx: record.dep_indx
      };
      this.$confirm('请确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          axios.post("/dept/dept_del", param).then(
            data => {
              if (data.data.success === true) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getDepList();
              }
            }
          ).catch(err => alert(err));
      })
    },
    editDep(record) {
      axios.get("/dept/dept_edit_data",{params:{ 'dep_indx': record.dep_indx }}).then(data => {
        this.editDepData = data.data.data[0];
        this.orignalEditData = _.cloneDeep(data.data.data[0]);
        this.editDepDialog = true;
      });
    },
    handleNodeClick(node) {
      this.editDepData.dep_name = node.dep_name;
      this.editDepData.dep_indx = node.dep_indx;
      this.treeVisible = false;
    },
    depEditSave() {
      const hasModifyDep = !_.isEqual(
        this.editDepData,
        this.orignalEditData
      );

      if (hasModifyDep) {
        const modifyData = this.getDiffer(
          this.editDepData,
          this.orignalEditData
        );

        _.merge(modifyData, {
          dep_indx: this.editDepData.dep_indx
        });

        axios.post("/dept/dept_edit_save", modifyData).then(data => {
          this.editDepDialog = false;
          this.getDepList();
        });
      } else {
        alert("数据未更改");
      }
    },
    openDepTree() {
      axios.get("/index/dept_tree").then(data=>{
        this.depData = data.data.deptree;
      }).catch(data=>{
        alert(data.data.msg);
      })
      this.treeVisible = true;
    },
    dialogClose(done) {},
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getDepList() {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get("/dept/dept_list").then(data => {
        loadingInstance.close();
        this.depList = data.data.listdept;
      });
    }
  },
  computed: {
    total() {
      return this.depList.length;
    },
    chunkList() {
      return _.chunk(this.depList, this.pageCurSize);
    },
    pageData() {
      return this.chunkList[this.currentPage - 1];
    }
  },
  created() {
    this.getDepList();
  }

};
</script>

<style>
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>


