<template>
    <div id="adduserdialog">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form :model="data" label-width="80px">
                        <el-form-item label="部门人员:">
                            <el-input v-model="data.user_list" @focus="openUserDialog">
                                <el-button slot="append" icon="el-icon-close" title="清空" @click="clearUser"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="区域设备:">
                            <el-input v-model="data.dev_list" @focus="openDevDialog">
                                <el-button slot="append" icon="el-icon-close" title="清空" @click="clearDev"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="出入时间:" style="margin-bottom:0">
                        </el-form-item>
                        <el-form-item label="从">
                            <el-date-picker v-model="data.bgn_date" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="到">
                            <el-date-picker v-model="data.end_date" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="出入类型:">
                            <el-select v-model="data.ver_list" multiple>
                                <el-option v-for="opt in access_list" :label="opt.ver_name" :value="opt.ver_indx" :key="opt.ver_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="操作人员:">
                            <el-select v-model="data.usr_list" multiple>
                                <el-option v-for="opt in admin_list" :label="opt.emp_name" :value="opt.emp_indx" :key="opt.emp_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="query">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="16">
                    <div style="margin-bottom:20px">门禁出入明细</div>
                    <el-table :data="pageData" border>
                        <el-table-column prop="emp_code" label="人员编号"></el-table-column>
                        <el-table-column prop="emp_name" label="用户姓名"></el-table-column>
                        <el-table-column prop="dep_name" label="所属部门"></el-table-column>
                        <el-table-column prop="crd_indx" label="卡流水号"></el-table-column>
                        <el-table-column prop="are_name" label="区域名称"></el-table-column>
                        <el-table-column prop="dev_name" label="设备名称"></el-table-column>
                        <el-table-column prop="ver_name" label="出入状态"></el-table-column>
                        <el-table-column prop="usr_name" label="操作人员"></el-table-column>
                        <el-table-column prop="chg_mode" label="出入类型"></el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <DepUser ref="depUser" @getUserList="getUserList"></DepUser>
        <AreaDev ref="areaDev" @getDevList="getDevList"></AreaDev>
    </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
// import "../../../assets/iconfont/iconfont.css";
import DepUser from "./DepUser";
import AreaDev from "./AreaDev";

export default {
  components: {
    DepUser,
    AreaDev
  },
  data() {
    return {
      currentPage: 1,
      pageCurSize: 10,
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      },
      data: {},
      list: [],
      emp_indx: "",
      dev_indx: "",
      admin_list: [],
      access_list: []
    };
  },
  methods: {
    selecta(val) {
      console.info("selecta", val, this.data);
    },
    openUserDialog() {
      this.$refs.depUser.open();
    },
    getUserList(val) {
      console.info("list", val);
      this.$set(this.data, "user_list", val);
    },
    clearUser() {
      this.data.user_list = "";
    },
    getDevList(val) {
      this.$set(this.data, "dev_list", val);
    },
    openDevDialog() {
      this.$refs.areaDev.open();
    },
    clearDev() {
      this.data.dev_list = "";
    },
    query() {
      //   const param = this.data;
      const {
        user_list,
        dev_list,
        ver_list,
        usr_list,
        bgn_date,
        end_Date
      } = this.data;

      const param = {
        user_list,
        dev_list,
        ver_list: ver_list.join(","),
        usr_list: usr_list.join(","),
        bgn_date,
        end_Date
      };
      //   param.usr_list = this.data.usr_list.join(',')
      //   param.ver_list = this.data.ver_list.join(',')
      console.info(param, this.data);
      let url = "/index/dept_users_tree";
      for (let p in param) {
        if (param[p]) {
          url += `/${p}/${param[p]}`;
        }
      }
      this.getList(url);
    },
    getSelectData() {
      axios
        .get("/accrecord/select_data")
        .then(({ data }) => {
          if (data.success === true) {
            console.info(data);
            this.admin_list = data.admin_list;
            this.access_list = data.access_list;
          }
        })
        .catch(err => console.error(err));
    },
    getTree() {
      axios
        .get("/index/dept_users_tree")
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
                getChildren(item.children);
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
        .catch(data => {
          alert(data.data.msg);
        });
    },
    getList(url = "/accrecord/accrecord_list", cb) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".cardpage")
      });
      this.list = [];

      axios
        .get(url)
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              this.list = data.data.data ? data.data.data : [];
              console.info(this.data);
              cb && cb();
            } else {
              alert(data.data.msg);
            }
          },
          data => loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  },
  computed: {
    total() {
      return this.list.length;
    },
    chunkList() {
      return _.chunk(this.list, this.pageCurSize);
    },
    pageData() {
      return this.chunkList[this.currentPage - 1];
    }
  },
  activated() {
    // this.getTree();
    this.getList();
    this.getSelectData();
  }
};
</script>

<style>
#adduserdialog .el-input-group__append,
.el-input-group__prepend {
  background-color: transparent;
}
</style>


