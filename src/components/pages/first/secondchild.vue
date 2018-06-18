<template>
    <div>
  <el-table
    :data="pageData"
    border>
    <el-table-column

      prop="emp_indx"
      label="用户ID"
      >
    </el-table-column>
    <el-table-column
      prop="emp_code"
      label="用户编号"
      >
    </el-table-column>
    <el-table-column
      prop="emp_name"
      label="用户姓名"
      >
    </el-table-column>
    <el-table-column
      prop="dep_name"
      label="所属部门"
      >
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="WEB角色名称"
      >
    </el-table-column>
    <el-table-column
      prop="gbas_name"
      label="性别"
      >
    </el-table-column>
    <el-table-column
      prop="reg_time"
      label="注册时间 "
      >
    </el-table-column>
    <el-table-column
      prop="pbas_name"
      label="人员状态"
      >
    </el-table-column>
    <el-table-column
      prop="kbas_name"
      label="人员类别"
      >
    </el-table-column>
    <el-table-column
      prop="crt_code"
      label="证件号码"
      >
    </el-table-column>
    
    <!-- <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button 
        @click="handleClick(scope.row)" 
        type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column> -->
  </el-table>
    <div class="block">
    <!-- <span class="demonstration">完整功能</span> -->
    <!-- @size-change="handleSizeChange" -->
     <!-- :page-sizes="pageSize" -->
    <el-pagination
      
      @current-change="handleCurrentChange"
      :current-page="currentPage"
     
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

  </div>
</template>


<script>
export default {
  methods: {
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    chunkArray(arr, count) {
      let retArr = [];
      for (let i = 0; i < arr.length; i = i + count) {
        retArr.push(arr.slice(i, i + count));
      }
      console.info(retArr);
      return retArr;
    },
    getUserList() {
      this.$parent.$store.dispatch("getUserList");
      this.userList = this.$parent.$store.getters.userList;
      console.info(this.userList);
    }
    //   prev-click
    //   next-click
  },

  data() {
    return {
      currentPage: 1,
      //   pageSize: [10, 20, 50],
      pageCurSize: 10
      //   userList: []
    };
  },
  //   created() {
  //     console.info(this.userList);
  //     this.getUserList();
  //   },
  computed: {
    // currentData() {
    //   return this.userList / this.pageCurSize / (this.currentPage - 1);
    // },
    userList() {
      return this.$parent.$store.getters.userList;
    },
    total() {
      return this.userList.length;
    },
    chunkList() {
      return this.chunkArray(this.userList, this.pageCurSize);
    },
    pageData() {
      return this.chunkList[this.currentPage - 1];
    }
  },
  mounted() {
    this.$parent.$store.dispatch("getUserList");
  }
};
</script>

<style>
.el-table th {
  text-align: center;
  line-height: 40px;
}
</style>


