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
            <!-- 终端卡机 -->
            <el-tab-pane label="终端卡机" name="termina">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddTerminaDialog">添加终端卡机</el-button>
              <el-table :data="terminaPageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditTerminaDialog(scope.row)" type="text" size="">
                      <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text" @click="delTermina(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="grp_indx" label="设备组别"></el-table-column>
                <el-table-column prop="tmr_indx" label="时段编号"></el-table-column>
                <el-table-column prop="tmr_name" label="时段名称"></el-table-column>
                <el-table-column prop="bgn_time" label="开始日期"></el-table-column>
                <el-table-column prop="end_time" label="结束日期"></el-table-column>
              </el-table>
              <div class="block ">
                <el-pagination @current-change="terminaHandleCurrentChange" :current-page="terminaCurrentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="terminaTotal">
                </el-pagination>
              </div>
            </el-tab-pane>

            <!-- 时段时区 -->
            <el-tab-pane label="时段时区" name="zone">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddZonedialog">添加时段时区</el-button>
              <el-table :data="zonePageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditZonedialog(scope.row)" type="text" size="">
                      <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text" @click="delZone(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="grp_indx" label="设备组别"></el-table-column>
                <el-table-column prop="tzn_indx" label="设备组别"></el-table-column>
                <el-table-column prop="tzn_name" label="时区名称"></el-table-column>
                <el-table-column prop="tmr1_name" label="段一关联"></el-table-column>
                <el-table-column prop="tmr2_name" label="段二关联"></el-table-column>
                <el-table-column prop="tmr3_name" label="段三关联"></el-table-column>
              </el-table>
              <div class="block ">
                <el-pagination @current-change="zoneHandleCurrentChange" :current-page="zoneCurrentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="zoneTotal">
                </el-pagination>
              </div>
            </el-tab-pane>

            <!-- 应用群控 -->
            <el-tab-pane label="应用群控" name="ctrl">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddCtrldialog">添加应用群控</el-button>
              <el-table :data="ctrlPageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditCtrldialog(scope.row)" type="text" size="">
                      <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text" @click="delCtrl(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="grp_indx" label="设备组别"></el-table-column>
                <el-table-column prop="ctr_indx" label="群控编号"></el-table-column>
                <el-table-column prop="trm_ctrl" label="终端位控"></el-table-column>
                <el-table-column prop="chn_ctrl" label="通道位控"></el-table-column>
                <el-table-column prop="chn_sptz" label="安密通道"></el-table-column>
                <el-table-column prop="chn_pptz" label="个密通道"></el-table-column>

                <el-table-column prop="phd_hdtz" label="假日前天时控"></el-table-column>
                <el-table-column prop="phd_ctrl" label="假日前天位控"></el-table-column>
                <el-table-column prop="thd_hdtz" label="假日当天时控"></el-table-column>
                <el-table-column prop="thd_ctrl" label="假日当天位控"></el-table-column>
                <el-table-column prop="nhd_hdtz" label="假日后天时控"></el-table-column>
                <el-table-column prop="nhd_ctrl" label="假日后天位控"></el-table-column>
                <el-table-column prop="wek_wktz" label="周计划时控"></el-table-column>
                <el-table-column prop="wek_ctrl" label="周位控"></el-table-column>
              </el-table>
              <div class="block ">
                <el-pagination @current-change="ctrlHandleCurrentChange" :current-page="ctrlCurrentPage" :page-size="10 " layout="total, prev, pager, next, jumper " :total="ctrlTotal">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>

        </el-col>

      </el-row>

    </el-card>
    <!-- <Termina ref="terminaDialog" @terminaSucc="terminaSucc"></Termina>
    <Zone ref="zoneDialog" @addZoneSucc="addZoneSucc"></Zone>
    <Ctrl ref="ctrlDialog" @addCtrlSucc="addCtrlSucc"></Ctrl> -->
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
// import Termina from "./Termina";
// import Zone from "./Zone";
// import Ctrl from "./Ctrl";

export default {
  // components: {
  //   ATermina,
  //   Zone,
  //   Ctrl
  // },
  data() {
    return {
      activeName: "termina",
      terminaCurrentPage: 1,
      terminaPageCurSize: 10,
      zoneCurrentPage: 1,
      zonePageCurSize: 10,
      ctrlCurrentPage: 1,
      ctrlPageCurSize: 10,
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      },
      terminaList: [],
      zoneList: [],
      ctrlList: [],
      devGroup: [],
      grpIndx: "1",
      tmrIndx: "",
      tznIndx: "",
      ctrIndx: "",
      data: {},
      terminaType: "",
      zoneType: "",
      ctrlType: ""
    };
  },
  methods: {
    handleTab(tab, event) {
      // console.info(tab, event);
      this.activeName = tab.name;
      switch (this.activeName) {
        case "termina":
          this.getTerminaList(this.grpIndx);
          break;
        case "zone":
          this.getZoneList(this.grpIndx);
          break;
        case "ctrl":
          this.getCtrlList(this.grpIndx);
          break;
      }
      console.info("this.activeName", this.activeName);
    },
    changeGrp(val) {
      console.info(val);
      const param = {
        grp_indx: val
      };
      this.grpIndx = val;
      this.getTree(param);
      switch (this.activeName) {
        case "termina":
          this.getTerminaList(val);
          break;
        case "zone":
          this.getZoneList(val);
          break;
        case "ctrl":
          this.getCtrlList(val);
          break;
      }
    },
    getTerminaList(grp_indx = 1) {
      this.terminaList = [];
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      // /devtermina/devtermina_list
      axios.get(`/devtermina/devtermina_list/grp_indx/${grp_indx}`).then(
        data => {
          loadingInstance.close();
          if (data.data.success === true) {
            console.info(data.data);
            this.terminaList = data.data.data;
          }
        },
        data => loadingInstance.close()
      );
    },
    openAddTerminaDialog() {
      console.info("terminaType", this.terminaType);
      this.terminaType = "添加终端卡机";
      this.$nextTick(() => {
        this.$refs.terminaDialog.open();
      });
    },
    openEditTerminaDialog(record) {
      this.terminaType = "编辑终端卡机";
      this.tmrIndx = record.tmr_indx;
      this.$nextTick(() => {
        this.$refs.terminaDialog.open();
      });
    },
    terminaSucc(val) {
      if (val) {
        this.terminaType = "";
        this.getTerminaList(this.grpIndx);
      }
    },
    delTermina(record) {
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
                this.getTerminaList(this.grpIndx);
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    getZoneList(grp_indx = 1) {
      this.zoneList = [];
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get(`/timerparam/prmtmrzone_list/grp_indx/${grp_indx}`).then(
        data => {
          loadingInstance.close();
          if (data.data.success === true) {
            console.info(data.data);
            this.zoneList = data.data.data;
            console.info("zoneList", this.zoneList.length, this.zonePageData);
          }
        },
        data => loadingInstance.close()
      );
    },
    openAddZonedialog() {
      this.zoneType = "添加时段时区";

      this.$nextTick(() => {
        this.$refs.zoneDialog.open();
      });
    },
    openEditZonedialog(record) {
      this.zoneType = "编辑时段时区";
      this.tznIndx = record.tzn_indx;
      this.$nextTick(() => {
        this.$refs.zoneDialog.open();
      });
    },
    addZoneSucc(val) {
      if (val) {
        this.zoneType = "";
        this.getZoneList(this.grpIndx);
      }
    },
    delZone(record) {
      const { grp_indx, tzn_indx } = record;
      const param = {
        grp_indx,
        tzn_indx
      };
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/timerparam/prmtmrzone_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getZoneList(this.grpIndx);
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    getCtrlList(grp_indx = 1) {
      this.ctrlList = [];
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get(`/timerparam/prmtmrctrl_list/grp_indx/${grp_indx}`).then(
        data => {
          loadingInstance.close();
          if (data.data.success === true) {
            console.info(data.data);
            this.ctrlList = data.data.data;
          }
        },
        data => loadingInstance.close()
      );
    },
    openAddCtrldialog() {
      this.ctrlType = "添加应用群控";

      this.$nextTick(() => {
        this.$refs.ctrlDialog.open();
      });
    },
    openEditCtrldialog(record) {
      this.ctrlType = "编辑应用群控";
      this.ctrIndx = record.ctr_indx;
      this.$nextTick(() => {
        this.$refs.ctrlDialog.open();
      });
    },
    addCtrlSucc(val) {
      if (val) {
        this.ctrlType = "";
        this.getCtrlList(this.grpIndx);
      }
    },
    delCtrl(record) {
      const { grp_indx, ctr_indx } = record;
      const param = {
        grp_indx,
        ctr_indx
      };
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/timerparam/prmtmrctrl_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getCtrlList(this.grpIndx);
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
    terminaHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.terminaCurrentPage = val;
    },
    zoneHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.zoneCurrentPage = val;
    },
    ctrlHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.ctrlCurrentPage = val;
    }
  },
  computed: {
    terminaTotal() {
      return this.terminaList.length;
    },
    terminaChunkList() {
      return _.chunk(this.terminaList, this.terminaPageCurSize);
    },
    terminaPageData() {
      return this.terminaChunkList[this.terminaCurrentPage - 1];
    },
    zoneTotal() {
      return this.zoneList.length;
    },
    zoneChunkList() {
      return _.chunk(this.zoneList, this.zonePageCurSize);
    },
    zonePageData() {
      return this.zoneChunkList[this.zoneCurrentPage - 1];
    },
    ctrlTotal() {
      return this.ctrlList.length;
    },
    ctrlChunkList() {
      return _.chunk(this.ctrlList, this.ctrlPageCurSize);
    },
    ctrlPageData() {
      return this.ctrlChunkList[this.ctrlCurrentPage - 1];
    }
  },
  created() {
    this.getDepGroup();
    this.getTree();
  },
  activated() {
    this.getTerminaList();
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


