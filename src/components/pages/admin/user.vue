<template>
    <div>

      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
        <el-button style="float: right;padding: 5px 20px;margin-top: -5px;" type="button">添加</el-button>
      </div>
      <!-- <div v-for="o in 4" :key="o" class="text item"> -->
        <!-- {{'列表内容 ' + o }} -->


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
          
          <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
              <el-button 
              @click="popupEdit(scope.row)"
              type="text" size=""><i class="el-icon-edit"></i></el-button>

              <el-button type="text" @click="delUser(scope.row)"><i class="el-icon-delete"></i></el-button>
            </template>
          </el-table-column>
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
        <!-- </div> -->
      </div>
    </el-card>

    <!-- <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="userInfo">

        <el-form-item label="用户ID：" :label-width="formLabelWidth">
          <span>{{userInfo.emp_indx}}</span>
        </el-form-item>

        <el-form-item label="用户姓名：" :label-width="formLabelWidth">
          <el-input v-model="userInfo.emp_name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属部门：" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="userInfo.dep_name" auto-complete="off"></el-input>
              </el-col>
              <el-col :span="6" :offset="2"><el-button type="text" @click="openDepTree">选择部门</el-button>
              </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="WEB角色名称：" :label-width="formLabelWidth">
          <el-select v-model="userInfo.role_name" placeholder="请选择活动区域">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="用户" value="user"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="性别：" :label-width="formLabelWidth">
          <el-select v-model="userInfo.gbas_name" placeholder="请选择活动区域">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="人员状态：" :label-width="formLabelWidth">
          <el-select v-model="userInfo.pbas_name" placeholder="请选择活动区域">
            <el-option label="状态1" value="man"></el-option>
            <el-option label="状态2" value="female"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="人员类别：" :label-width="formLabelWidth">
          <el-select v-model="userInfo.pbas_name" placeholder="请选择活动区域">
            <el-option label="类别1" value="man"></el-option>
            <el-option label="类别2" value="female"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="证件号码：" :label-width="formLabelWidth">
          <el-input v-model="userInfo.crt_code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
        <el-dialog
        width="40%"
        min-height="200px"
        title="选择部门"
        :visible.sync="innerVisible"
        append-to-body>
        <el-tree
          :data="depData"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </el-dialog>
    </el-dialog> -->
  </div>
</template>


<script>
// import editUser from "@/components/popup/editUser";
export default {
  data() {
    return {
      currentPage: 1,
      pageCurSize: 10,
      dialogTableVisible: false,
      dialogFormVisible: false,
      userInfo: {},
      // formLabelWidth: "120px",
      innerVisible: false,
      depData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      userEditData: {}
    };
  },
  methods: {
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // openDepTree() {
    //   // new Promise(this.getDepTree()).then(() => (this.innerVisible = true));
    //   // this.getDepTree();
    //   // this.innerVisible = true;
    //   // new Promise(resolve => resolve(this.getDepTree())).then(() => {
    //   // setTimeout(() => {
    //   this.innerVisible = true;
    //   // }, 1000);
    //   // });
    // },
    // handleNodeClick(data) {
    //   this.userInfo.dep_name = data.label;
    //   this.innerVisible = false;
    // },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // },

    delUser(recored) {
      console.info(recored);
      let param = {
        id: recored.emp_indx
      };

      this.$post("/user/user_del", param)
        .then(
          data => {
            if (data.sucess != false) {
              this.$parent.$store.dispatch("getUserList");
            }
          },
          data => console.info(data)
        )
        .catch(err => alert(err));
    },
    popupEdit(recored) {
      // debugger;
      // this.getUserEditData({ id: recored.emp_indx });
      // this.userInfo = recored;
      // console.info(this.userInfo);
      // this.dialogFormVisible = true;
      // this.getDepTree();
      // console.info(recored);
      console.info(this.$parent.$router);
      this.$parent.$router.push({
        name: "userinfo",
        params: { userId: recored.emp_indx }
      });
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
      console.info(retArr);
      return retArr;
    },
    getUserList() {
      // this.$parent.$store.dispatch("getUserList");
      this.userList = this.$parent.$store.getters.userList;
      console.info(this.userList);
    },
    getDepTree() {
      this.$parent.$store.dispatch("getDepTree");
      this.depData = this.$parent.$store.getters.depTree;
      console.info("this.depData", this.depData);
    },
    getUserEditData(param) {
      this.$parent.$store.dispatch("getUserEditData", param);
      this.userEditData = this.$parent.$store.getters.userEditData;
    }
  },
  //   prev-click
  //   next-click

  //   created() {
  //     console.info(this.userList);
  //     this.getUserList();
  //   },
  computed: {
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

<style >
.el-main {
  line-height: 0;
}
.el-table th {
  text-align: center;
  line-height: 40px;
}
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

/* .clearfix:before,
.clearfix:after {
  display: table;
  content: "";
} */
/* .clearfix:after {
  clear: both;
} */

.box-card {
  width: 100%;
}

.el-card__header span {
  line-height: 27px;
}
.el-form-item__content {
  text-align: left;
  /* float: left; */
}
.el-dialog {
  min-height: 280px;
  max-height: 680px;
}
</style>


