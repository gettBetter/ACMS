<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>部门列表</span>
      </div>
      <el-button type="primary" style="margin-bottom:10px;" @click="addDep">添加</el-button>
      <el-table :data="pageData" border>
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
        <el-table-column prop="dep_indx" label="序号">
        </el-table-column>
        <el-table-column prop="dep_name" label="部门名称">
        </el-table-column>
        <el-table-column prop="p_dep_name" label="上级部门">
        </el-table-column>
        <el-table-column prop="dep_prnc" label="部门领导">
        </el-table-column>
        <el-table-column prop="dep_rank" label="部门层级">
        </el-table-column>
        <el-table-column prop="end_date" label="生效日期">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>

    </el-card>
    <!-- 修改部门 -->
    <el-dialog width="40%" min-height="200px" title="选择部门" :visible.sync="treeVisible" append-to-body>
      <el-form :model="userInfo">

      </el-form>
    </el-dialog>

  </div>
</template>


<script>
export default {
  data() {
    return {
      depList: [],
      depData: {},
      treeProp: {
        label: "name",
        id: "indx",
        children: "children"
        // total: 0, //list length
        // chunkList: [], //数据分组  总数/每页数量
        // pageData
      },
      currentPage: 1,
      pageCurSize: 10,
      treeVisible: false
    };
  },
  methods: {
    addDep() {},
    delDep(record) {},
    editDep(record) {
      this.getEditDepData({ dep_indx: record.dep_indx }).then(date => {
        console.info(data);
      });
      // .catch(err => {
      //   if (err.success !== true) {
      //     this.$parent.$router("/login");
      //   }
      // });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    chunkArray(arr, count) {
      let retArr = [];
      for (let i = 0; i < arr.length; i = i + count) {
        retArr.push(arr.slice(i, i + count));
      }
      return retArr;
    },
    getDepList() {
      return this.$get("/dept/dept_list");
    },
    getEditDepData(param) {
      return this.$get("/dept/dept_edit_data", param);
    }
  },
  computed: {
    total() {
      return this.depList.length;
    },
    chunkList() {
      return this.chunkArray(this.depList, this.pageCurSize);
    },
    pageData() {
      return this.chunkList[this.currentPage - 1];
    }
  },
  created() {
    this.getDepList().then(data => {
      console.info(data);
      this.depList = data.listdept;
    });
  },
  mounted() {
    // this.$store.dispatch("getDepList");
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.container {
  height: 100%;
}
body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}
</style>


