<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>门禁通道</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="6">
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
        <el-col :span="17" :offset="1">
          <el-tabs v-model="activeName" type="card" @tab-click="handleTab" lazy="true">
            <el-tab-pane label="开门关门" name="door">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddDoorDialog">添加开关门</el-button>
              <el-table :data="pageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditDoorDialog(scope.row)" type="text">
                      <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" @click="del(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="grp_indx" label="设备组别"></el-table-column> -->
                <el-table-column prop="chn_indx" label="通道编号"></el-table-column>
                <el-table-column prop="chn_name" label="通道名称"></el-table-column>
                <el-table-column prop="ctl_name" label="控制方式"></el-table-column>
                <el-table-column prop="dly_time" label="打开延时"></el-table-column>
                <el-table-column prop="chn_stat_name" label="门位状态"></el-table-column>
                <!-- <el-table-column prop="apb_name" label="反潜回名称"></el-table-column> -->
                <!-- <el-table-column prop="pin_spwd" label="安全密码"></el-table-column> -->

              </el-table>
              <div class="block ">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>

            <el-tab-pane label="反潜回控制" name="stat">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddStatDialog">添加反潜回控制</el-button>
              <el-table :data="pageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditStatDialog(scope.row)" type="text">
                      <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" @click="del(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="grp_indx" label="设备组别"></el-table-column> -->
                <el-table-column prop="chn_indx" label="通道编号"></el-table-column>
                <el-table-column prop="chn_name" label="通道名称"></el-table-column>

                <!-- <el-table-column prop="dly_time" label="控制方式"></el-table-column>
                <el-table-column prop="chn_stat_name" label="门位名称"></el-table-column> -->
                <el-table-column prop="apb_name" label="反潜回名称"></el-table-column>
                <!-- <el-table-column prop="pin_spwd" label="安全密码"></el-table-column> -->

              </el-table>
              <div class="block ">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>

            <el-tab-pane label="安全密码" name="spwd">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddSpwdDialog">添加安全密码</el-button>
              <el-table :data="pageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditSpwdDialog(scope.row)" type="text">
                      <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" @click="del(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="grp_indx" label="设备组别"></el-table-column> -->
                <el-table-column prop="chn_indx" label="通道编号"></el-table-column>
                <el-table-column prop="chn_name" label="通道名称"></el-table-column>

                <!-- <el-table-column prop="dly_time" label="控制方式"></el-table-column>
              <el-table-column prop="chn_stat_name" label="门位名称"></el-table-column>
                <el-table-column prop="apb_name" label="反潜回名称"></el-table-column> -->
                <el-table-column prop="pin_spwd" label="安全密码"></el-table-column>

              </el-table>
              <div class="block ">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
    <Door ref="doorDialog" @channelSucc="channelSucc"></Door>
    <Stat ref="statDialog" @channelSucc="channelSucc"></Stat>
    <Spwd ref="spwdDialog" @channelSucc="channelSucc"></Spwd>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
import Door from "./Door";
import Stat from "./Stat";
import Spwd from "./Spwd";

export default {
  components: {
    Door,
    Stat,
    Spwd
  },
  data() {
    return {
      activeName: "door",
      currentPage: 1,
      pageCurSize: 10,
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      },
      list: [],
      devGroup: [],
      grpIndx: "1",
      chn_indx: "",
      data: {
        grp_indx: "1"
      },
      type: ""
    };
  },
  methods: {
    handleTab(tab, event) {
      // console.info(tab, event);
      this.activeName = tab.name;
      // this.getList(this.grpIndx);
    },
    changeGrp(val) {
      console.info(val);
      const param = {
        grp_indx: val
      };
      this.grpIndx = val;
      this.getTree(param);
      this.getList(val);
    },
    getList(grp_indx = 1) {
      this.list = [];
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get(`/devchannel/devchannel_list/grp_indx/${grp_indx}`).then(
        data => {
          loadingInstance.close();
          if (data.data.success === true) {
            console.info(data.data);
            this.list = data.data.data;
          }
        },
        data => loadingInstance.close()
      );
    },
    openAddDoorDialog() {
      console.info("type", this.type);
      this.type = "添加开门关门";
      this.$nextTick(() => {
        this.$refs.doorDialog.open();
      });
    },
    openEditDoorDialog(record) {
      this.type = "编辑开门关门";
      this.chn_indx = record.chn_indx;
      this.$nextTick(() => {
        this.$refs.doorDialog.open();
      });
    },
    openAddStatDialog() {
      console.info("type", this.type);
      this.type = "添加反潜回控制";
      this.$nextTick(() => {
        this.$refs.statDialog.open();
      });
    },
    openEditStatDialog(record) {
      this.type = "编辑反潜回控制";
      this.chn_indx = record.chn_indx;
      this.$nextTick(() => {
        this.$refs.statDialog.open();
      });
    },
    openAddSpwdDialog() {
      console.info("type", this.type);
      this.type = "添加安全密码";
      this.$nextTick(() => {
        this.$refs.spwdDialog.open();
      });
    },
    openEditSpwdDialog(record) {
      this.type = "编辑安全密码";
      this.chn_indx = record.chn_indx;
      this.$nextTick(() => {
        this.$refs.spwdDialog.open();
      });
    },
    channelSucc(val) {
      if (val) {
        this.type = "";
        this.getList(this.grpIndx);
      }
    },
    del(record) {
      const { grp_indx, chn_indx } = record;
      const param = {
        grp_indx,
        chn_indx
      };
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/devchannel/devchannel_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList(this.grpIndx);
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    changeTreeList(checked, node, data) {
      console.info("changeDevList", checked, node, data);
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
  created() {
    this.getDepGroup();
    this.getTree();
  },
  activated() {
    this.getList();
  }
};
</script>
