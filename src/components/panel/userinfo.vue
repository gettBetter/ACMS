<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <el-form :model="userInfo">
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="11" :offset="1">
              <el-form-item  :label-width="formLabelWidth" label="用户ID：" >
                <span>{{userInfo.emp_indx}}</span>
              </el-form-item>
            </el-col>   
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="用户编号：" >
                <span>{{userInfo.emp_code}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11" :offset="1">
              <el-form-item  :label-width="formLabelWidth" label="用户姓名：" >
                <el-input v-model="userInfo.emp_name"></el-input>
              </el-form-item>
            </el-col>   
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="人员昵称：" >
                <el-input v-model="userInfo.emp_nick"></el-input>
              </el-form-item>
            </el-col>  
          </el-row>      

          <el-row>
            <el-col :span="11" :offset="1">
              <el-form-item  :label-width="formLabelWidth" label="性别：">
                <el-select v-model="userInfo.gdr_indx">
                  <el-option 
                    v-for="opt in userEditData.gender_list"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="所属部门：" >
                <el-row>
                  <el-col :span="17">
                    <el-input v-model="userInfo.dep_indx" v-if="false"></el-input>
                    <span>{{depCn}}</span>    
                  </el-col>
                  <el-col :span="6" ::offset="1">
                    <el-button type="text" @click="openDepTree">选择部门</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>    
          </el-row>     

          <el-row>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="证件类型：">
                <el-select v-model="userInfo.crt_indx">
                  <el-option 
                    v-for="opt in userEditData.cardbit_list"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="证件号码：" >
                <el-input v-model="userInfo.crt_code"></el-input>
              </el-form-item>
            </el-col>   
          </el-row>      

          <el-row>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="婚姻状况：">
                <el-select v-model="userInfo.mrg_indx">
                  <el-option 
                    v-for="opt in userEditData.marry_list"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="最高学历：">
                <el-select v-model="userInfo.dgr_indx">
                  <el-option 
                    v-for="opt in userEditData.最高学历"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>   
          </el-row>      

          <el-row>
            <el-col :span="11" :offset="1">
              <el-form-item  :label-width="formLabelWidth" label="出生日期：">
                <el-date-picker
                  v-model="userInfo.brt_date"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="政治面貌：">
                <el-select v-model="userInfo.prt_indx">
                  <el-option 
                    v-for="opt in userEditData.party_list"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>   
          </el-row>      

          <el-row>
            <el-col :span="11" :offset="1">      
                <el-form-item  :label-width="formLabelWidth" label="籍贯：">
                  <el-select v-model="userInfo.ntv_indx">
                    <el-option 
                    v-for="opt in userEditData.native_list"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">  
              <el-form-item  :label-width="formLabelWidth" label="民族：">
                <el-select v-model="userInfo.ntn_indx">
                  <el-option 
                  v-for="opt in userEditData.nation_list"
                  :label="opt.bas_name"  
                  :value="opt.bas_indx"
                  :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>   
          </el-row>      

          <el-row>
            <el-col :span="11" :offset="1">  
              <el-form-item  :label-width="formLabelWidth" label="联系电话：" >
                <el-input v-model="userInfo.tel_code" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">  
              <el-form-item  :label-width="formLabelWidth" label="语言能力：">
                <el-select v-model="userInfo.lgg_indx">
                  <el-option 
                    v-for="opt in userEditData.language_list"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>   
          </el-row>      

          <el-row>
            <el-col :span="23" :offset="1">  
              <el-form-item  :label-width="formLabelWidth" label="联系地址：" >
                <el-input v-model="userInfo.tel_code" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11" :offset="1">  
              <el-form-item  :label-width="formLabelWidth" label="职务类别：">
                <el-select v-model="userInfo.rnk_indx">
                  <el-option 
                    v-for="opt in userEditData.rank_list"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">  
              <el-form-item  :label-width="formLabelWidth" label="职位等级：">
                <el-select v-model="userInfo.dty_indx">
                  <el-option 
                    v-for="opt in userEditData.degree_list"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="合同开始时间：">
                <el-date-picker
                    v-model="userInfo.beg_date"
                    type="date">
                  </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="合同结束时间：">
                <el-date-picker
                  v-model="userInfo.end_date"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="试用到期：">
                <el-date-picker
                  v-model="userInfo.try_date"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item  :label-width="formLabelWidth" label="在职状态：">
                <el-select v-model="userInfo.est_indx">
                  <el-option 
                    v-for="opt in userEditData.empstat_list"
                    :label="opt.bas_name"  
                    :value="opt.bas_indx"
                    :key="opt.bas_indx">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11" :offset="1"> 
              <el-form-item  :label-width="formLabelWidth" label="注册时间：" >
                <span>{{userInfo.reg_time}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item  :label-width="formLabelWidth" label="用户密码：" >
                <el-input v-model="userInfo.emp_pswd" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>  

        </el-col>

        <el-col :span="5">  
          <div>照片在这里</div>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="text-right">
       <el-button type="primary" @click="submit">确定</el-button>
       <el-button>取消</el-button>
    </el-row>


    <el-dialog
        width="40%"
        min-height="200px"
        title="选择部门"
        :visible.sync="treeVisible"
        append-to-body>
        <el-tree
          :data="depTreeData"
          :props="treeProp"
          highlight-current
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </el-dialog>

    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      treeProp: {
        label: "name",
        children: "children"
      },
      depCn: "",
      formLabelWidth: "120px",
      treeVisible: false,
      userEditData: {},
      depTreeData: [],
      userInfo: {}
    };
  },
  methods: {
    getUserEditData(param) {
      return new Promise(resolve => {
        this.$get("/user/user_edit_data", param).then(
          data => {
            if (data.success == true) {
              // this.userEditData = data.data;
              resolve(data);
            } else {
              alert(data.msg);
            }
          },
          data => alert("System Error")
        );
      });
    },

    getDepTree() {
      return new Promise(resolve => {
        this.$get("/index/dept_tree").then(
          data => {
            if (data.success == true) {
              resolve(data);
              // this.depTreeData = data.data.deptree;
              // console.info("deptree", data.data.deptree);
            } else {
              alert(data.msg);
            }
          },
          data => alert("System Error")
        );
      });
    },
    handleNodeClick(node) {
      // handleNodeClick(data) {
      //   userInfo.dep_index = node.dep_rank;
      // userInfo.dep_name = node.dep_name;
      this.treeVisible = false;
      // },
    },
    getDiffer(newData, oldData) {
      const differ = {};
      for (let p in newData) {
        if (newData[p] != oldData[p]) {
          differ[p] = newData[p];
        }
      }
      return differ;
    },
    getDepCn(depData, depIndex) {
      let depCN = "";
      let getCn = function() {
        depData.forEach(item => {
          if (item.dep_rank == depIndex) {
            depCN = item.name;
          } else {
            if (item.children) {
              getCn(item.children, depIndex);
            }
          }
        });

        return depCN;
      };
    },
    openDepTree() {
      this.treeVisible = true;
    },
    submit() {
      if (JSON.stringify(this.userInfo) != JSON.stringify(this.copyData)) {
        const params = this.getDiffer(this.userInfo, this.copyData);
        debugger;
        params.id = this.userInfo.emp_indx;
        this.$post("/user/user_edit_save", params).then(
          data => console.info(data),
          data => console.info(data)
        );
      } else {
        alert("数据未修改");
      }
    }
  },
  computed: {
    userId() {
      console.info("111");
      return this.$route.params.userId;
    }
  },
  beforeMount() {},
  mounted() {
    console.info(this.userId);
    this.getUserEditData({ emp_indx: this.userId }).then(data => {
      console.info("edit", data);
      this.userInfo = data.user_info[0];
      this.userEditData = data;
    });
  }
};
</script>

<style>
.el-card__header span {
  line-height: 27px;
}
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
  /* max-height: 680px; */
}
.el-main {
  line-height: 0;
}
.el-select,
.el-date-editor.el-input,
.el-date-editor.el-input__inne {
  width: 100%;
}
.el-form-item__label {
  text-align: left;
}
</style>

