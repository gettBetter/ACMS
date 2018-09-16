<template>
  <div class="addaut">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="11" :offset="1">
          <div style="margin-bottom:20px">部门人员树</div>
          <el-tree :data="userTreeData" :props="userTreeProp" :expand-on-click-node="false" highlight-current style="height:360px;overflow:scroll">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span v-if="data.tag == 2">
                  <el-checkbox :v-model="false" @change="checed=>changeUserList(checed,node,data)"></el-checkbox>
                </span>
                <span v-if="data.tag == 1">
                  <i class="iconfont icon-plus-departments" style="padding:0 4px" />
                </span>
                <span v-if="data.tag == 2">
                  <i class="iconfont icon-renyuan" style="padding:0 4px" />
                </span>
                <span>{{node.label}}</span>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="11" :offset="1">
          <div style="margin-bottom:20px">区域设备通道树</div>
          <el-tree :data="devTreeData" :props="devTreeProp" :expand-on-click-node="false" highlight-current style="height:360px;overflow:scroll">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span v-if="data.tag !== 1">
                  <el-checkbox :v-model="false" @change="checed=>changeDevList(checed,node,data)"></el-checkbox>
                </span>
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
        </el-col>
      </el-row>

      <el-form style="margin-top:20px">

        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="人员组别
:">
              <el-select v-model="addData.rank_indx" @change="changeUserTree">
                <el-option v-for="opt in rank_list" :label="opt.rank_name" :value="opt.rank_indx" :key="opt.rank_indx">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="设备组别
:">
              <el-select v-model="addData.grp_indx" @change="changeDepTree">
                <el-option v-for="opt in grp_list" :label="opt.grp_name" :value="opt.grp_indx" :key="opt.grp_indx">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="应用群组:">
              <el-select v-model="addData.tmr_indx">
                <el-option v-for="opt in tmr_list" :label="opt.tmr_name" :value="opt.tmr_indx" :key="opt.tmr_indx">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="检查APB
:">
              <el-select v-model="addData.fcd_indx">
                <el-option v-for="opt in fcd_list" :label="opt.fcd_name" :value="opt.fcd_indx" :key="opt.fcd_indx">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="卡片类型:">
              <el-select v-model="addData.mcd_indx">
                <el-option v-for="opt in mcd_list" :label="opt.mcd_name" :value="opt.mcd_indx" :key="opt.mcd_indx">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="是否授权:">
              <el-select v-model="addData.aut_flag">
                <el-option v-for="opt in aut_list" :label="opt.aut_name" :value="opt.aut_indx" :key="opt.aut_indx">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div>
              <div class="itemclass">
                <!-- use_cdat -->
                <el-checkbox v-model="enableDate">启用卡证有效日期</el-checkbox>
              </div>
              <div style="margin: 15px 0;"></div>
              <el-row>
                <el-col :span="11" :offset="1">
                  <el-form-item :label-width="formLabelWidth" label="起始日期:">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="addData.bgn_date" type="date" :disabled="!this.enableDate">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-form-item :label-width="formLabelWidth" label="截止日期 
:">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="addData.end_date" type="date" :disabled="!this.enableDate">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="text-align:center;margin-top:40px;margin-bottom:20px">
        <el-button class="submit-btn" type="primary" @click="save">确定</el-button>
        <el-button class="cancel-btn" @click="cancel">取消</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
// import { mapMutations } from "vuex";

export default {
  data() {
    return {
      formLabelWidth: "80px",
      enableDate: true,
      userTreeData: [],
      userTreeProp: {
        label: "label",
        children: "children"
      },
      devTreeData: [],
      devTreeProp: {
        label: "label",
        children: "children"
      },
      addData: {
        tmr_indx: "1",
        fcd_indx: "0",
        mcd_indx: "1",
        // grp_indx: "1",
        // rank_indx: "1",
        aut_flag: "1",
        bgn_date:
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate(),
        end_date: "2099-12-31"
      },
      mcd_list: [],
      grp_list: [],
      tmr_list: [],
      fcd_list: [],
      rank_list: [],
      aut_list: [
        {
          aut_name: "是",
          aut_indx: "1"
        },
        {
          aut_name: "否",
          aut_indx: "0"
        }
      ],
      userList: [],
      devList: [],
      chnList: []
    };
  },
  computed: {},
  methods: {
    refresh() {
      this.getTreeData();
      this.getAddData();
    },
    handleNodeClick(node, data) {
      console.info(node, data);
    },
    changeUserTree(val) {
      //  ;
      this.getUserTree(val);
    },
    changeDepTree(val) {
      //  ;
      this.getDepTree(val);
    },
    changeUserList(checked, node, data) {
      if (checked) {
        this.setList(this.userList, { type: "add", data: data.emp_indx });
      } else {
        this.setList(this.userList, { type: "del", data: data.emp_indx });
      }
    },
    changeDevList(checked, node, data) {
      if (data.tag == 2) {
        if (checked) {
          this.setList(this.devList, { type: "add", data: data.dev_indx });
        } else {
          this.setList(this.devList, { type: "del", data: data.dev_indx });
        }
      } else if (data.tag == 3) {
        if (checked) {
          this.setList(this.chnList, { type: "add", data: data.chn_indx });
        } else {
          this.setList(this.chnList, { type: "del", data: data.chn_indx });
        }
      }
    },
    setList(list, { type, data }) {
      if (type === "add") {
        list.push(data);
      } else if (type === "del") {
        _.pull(list, data);
      } else if (type === "clean") {
        list = [];
      }
      console.info("list", list);
    },
    getTreeData(param) {
      //部门人员树
      this.getUserTree();
      //   区域设备通道树
      this.getDepTree();
    },
    getUserTree(param = 0) {
      axios
        .get(`/authorlist/dept_users_auth_tree/rank_indx/${param}`)
        .then(data => {
          if (data.data.success) {
            let temp = data.data.data;
            function getChildren(arr) {
              arr.forEach(item => {
                item.label = item.dep_name || item.emp_name;
                if (item.children) {
                  if (item.dev_list) {
                    item.children = item.children.concat(item.dev_list);
                  }
                  getChildren(item.children);
                } else {
                  item.label = item.emp_name || item.dep_name;
                  if (item.dev_list) {
                    item.children = item.dev_list.map(item => {
                      item.label = item.emp_name || item.dep_name;
                      return item;
                    });
                  }
                }
              });
            }
            getChildren(temp);
            this.userTreeData = temp;
          }
        });
    },
    getDepTree(param = 0) {
      axios
        .get(`/authorlist/authorlist_channel_tree/grp_indx/${param}`)
        .then(data => {
          if (data.data.success) {
            console.info(data.data);
            let temp = data.data.data;
            function getChildren(arr) {
              arr.forEach(item => {
                item.label = item.are_name || item.dev_name;
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
            this.devTreeData = temp;
          }
        });
    },
    getAddData() {
      axios.get("/authorlist/authorlist_add_data").then(
        data => {
          if (data.data.success === true) {
            console.info("adddata", data.data);
            let temp = data.data;
            this.mcd_list = temp.mcd_list;
            this.grp_list = temp.grp_list;
            this.tmr_list = temp.tmr_list;
            this.fcd_list = temp.fcd_list;
            this.rank_list = temp.rank_list;
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    save() {
      const param = this.addData;
      delete param.ROW_NUMBER;
      param.user_list = this.userList;
      param.dev_list = this.devList;
      // param.chn_list = this.chnList;
      param.use_cdat = this.enableDate === true ? "1" : "0";
      console.info(param);
      axios.post("/authorlist/authorlist_add", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.$router.go(-1);
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  activated() {
    this.refresh();
  }
};
</script>

<style>
</style>

