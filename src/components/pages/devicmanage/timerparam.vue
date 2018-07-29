<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>门禁时段</span>
      </div>

      <el-row :gutter="30">
        <el-col :span="8">
          <el-form :model="data" label-width="80px">
            <el-form-item label="设备组别:">
              <el-select v-model="data.grp_indx" @change="changeGrp">
                <el-option v-for="opt in devGroup" :label="opt.grp_name" :value="opt.grp_indx" :key="opt.grp_indx">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <hr>
          <div style="margin-bottom:20px">区域设备</div>
          <!-- <el-tree :data="treeData" :props="treeProp" ref="areaTree" :expand-on-click-node="false" @check-change="handleCheckChange" highlight-current style="max-height:600px;overflow:scroll" show-checkbox node-key="are_indx">
          </el-tree> -->
          <el-tree :data="treeData" :props="treeProp" ref="areaTree" :expand-on-click-node="false" highlight-current style="max-height:600px;overflow:scroll">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span v-if="data.tag == 2">
                  <el-checkbox :v-model="false" @change="checed=>changeTreeList(checed,node,data)"></el-checkbox>
                </span>
                <span v-if="data.tag == 1">
                  <i class="iconfont icon-ditu" style="padding:0 4px" />
                </span>
                <span v-if="data.tag == 2">
                  <i class="iconfont icon-menjinshebei" style="padding:0 4px" />
                </span>
                <span>{{node.label}}</span>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="16">
          <el-tabs v-model="activeName" type="card" @tab-click="handleTab" lazy="true">
            <!-- 时段时钟 -->
            <el-tab-pane label="时段时钟" name="clock">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddClockdialog">添加时段时钟</el-button>
              <el-table :data="clockList" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditClockdialog(scope.row)" type="text" size="">
                      <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text" @click="delClock(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="grp_indx" label="设备组别"></el-table-column>
                <el-table-column prop="tmr_indx" label="时段编号"></el-table-column>
                <el-table-column prop="tmr_name" label="时段名称"></el-table-column>
                <el-table-column prop="bgn_date" label="开始日期"></el-table-column>
                <el-table-column prop="end_date" label="结束日期"></el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 时段时区 -->
            <el-tab-pane label="时段时区" name="second"></el-tab-pane>

            <!-- 应用群控 -->
            <el-tab-pane label="应用群控" name="third"></el-tab-pane>
          </el-tabs>

        </el-col>

      </el-row>

      <!-- <div class="block ">
        <el-pagination @current-change="handleCurrentChange " :current-page="currentPage " :page-size="10 " layout="total, prev, pager, next, jumper " :total="total ">
        </el-pagination>
      </div> -->

    </el-card>
    <AddClock ref="clockDialog" :grpIndx="grpIndx" :type="type" :tmrIndx="tmrIndx" @addClockSucc="addClockSucc"></AddClock>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
import AddClock from "./AddClock";

export default {
  components: {
    AddClock
  },
  data() {
    return {
      activeName: "clock",
      currentPage: 1,
      pageCurSize: 10,
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      },
      clockList: [],
      devGroup: [],
      // devgrp: {},
      grpIndx: "1",
      tmrIndx: "",
      data: {},
      type: ""
    };
  },
  methods: {
    openAddClockdialog() {
      this.type = "添加时段时钟";
      this.$refs.clockDialog.open();
    },
    openEditClockdialog(record) {
      this.type = "编辑时段时钟";
      this.tmrIndx = record.tmr_indx;
      this.$refs.clockDialog.open();
    },
    addClockSucc(val) {
      if (val) {
        this.getClockList(this.grpIndx);
      }
    },
    handleTab(tab, event) {
      console.info(tab, event);
    },
    changeTreeList(checked, node, data) {
      console.info("changeDevList", checked, node, data);
      // if (data.tag == 2) {
      //   if (checked) {
      //     this.setList(this.devList, { type: "add", data: data.dev_indx });
      //   } else {
      //     this.setList(this.devList, { type: "del", data: data.dev_indx });
      //   }
      // } else if (data.tag == 3) {
      //   if (checked) {
      //     this.setList(this.chnList, { type: "add", data: data.chn_indx });
      //   } else {
      //     this.setList(this.chnList, { type: "del", data: data.chn_indx });
      //   }
      // }
    },
    getDepGroup() {
      axios.get("/index/devgrp_list").then(data => {
        if (data.data.success === true) {
          this.devGroup = data.data.data;
        }
      });
    },
    // handleCheckChange(data, checked, indeterminate) {
    //   this.areaList = this.$refs.areaTree
    //     .getCheckedKeys()
    //     .filter(item => !!item);
    //   console.info(this.areaList);
    // },
    changeGrp(val) {
      console.info(val);
      const param = {
        grp_indx: val
      };
      this.grpIndx = val;
      this.getTree(param);
      this.getClockList(val);
    },
    getChildren(arr) {
      arr.forEach(item => {
        item.label = item.are_name || item.dev_name;
        if (item.children) {
          if (item.dev_list) {
            item.children = item.children.concat(item.dev_list);
          }
          this.getChildren(item.children);
        } else {
          if (item.dev_list) {
            item.children = item.dev_list.map(item => {
              item.label = item.are_name || item.dev_name;
              return item;
            });
          }
        }
      });
    },

    getTree(param) {
      axios
        .get("/index/area_dev_auth_tree", { params: param })
        .then(data => {
          let temp = data.data.data[0];
          this.getChildren(temp);
          this.treeData = temp;
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    getClockList(grp_indx = 1) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get(`/timerparam/prmtmrclck_list/grp_indx/${grp_indx}`).then(
        data => {
          loadingInstance.close();
          if (data.data.success === true) {
            console.info(data.data);
            // clockList = data
            //   let d = data.data.data;
            //   d.forEach(item => {
            //     if (item.use_isok === "1") {
            //       item.use_isok = "启用";
            //     } else if (item.use_isok === "0") {
            //       item.use_isok = "未启用";
            //     }
            //   });
            //   this.list = d;
            // } else {
            //   alert(data.data.msg);
          }
        },
        data => loadingInstance.close()
      );
    },
    delClock(recored) {
      // let param = {
      //   tmr_indx: recored.tmr_indx
      // };
      const { grp_indx, tmr_indx } = record;
      const param = {
        grp_indx,
        tmr_indx
      };
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/timerparam/prmtmrclck_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  },
  computed: {
    // total() {
    //   return this.list.length;
    // },
    // chunkList() {
    //   return _.chunk(this.list, this.pageCurSize);
    // },
    // pageData() {
    //   return this.chunkList[this.currentPage - 1];
    // }
  },
  created() {
    this.getDepGroup();
    this.getTree();
  },
  activated() {
    this.getClockList();
  }
};
</script>

<style >
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>


