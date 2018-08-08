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
                <el-table-column prop="trm_indx" label="终端ID"></el-table-column>
                <el-table-column prop="trm_indx_name" label="终端编号"></el-table-column>
                <el-table-column prop="trm_name" label="终端名称"></el-table-column>
                <el-table-column prop="pkb_isok" label="启用密码开门"></el-table-column>
                <el-table-column prop="att_isok" label="考勤扩展"></el-table-column>
                <el-table-column prop="con_isok" label="次计就餐"></el-table-column>
                <el-table-column prop="oep_isok" label="在线巡逻"></el-table-column>
                <el-table-column prop="met_isok" label="会议签到"></el-table-column>
                <el-table-column prop="chn_indx" label="关联通道"></el-table-column>
              </el-table>
              <div class="block ">
                <el-pagination @current-change="terminaHandleCurrentChange" :current-page="terminaCurrentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="terminaTotal">
                </el-pagination>
              </div>
            </el-tab-pane>
            <!-- 模组端口 -->
            <el-tab-pane label="模组端口" name="models">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddModelsDialog">添加模组端口</el-button>
              <el-table :data="modelsPageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditModelsDialog(scope.row)" type="text" size="">
                      <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text" @click="delModels(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="grp_indx" label="设备组别"></el-table-column>
                <el-table-column prop="mod_indx" label="模组编号"></el-table-column>
                <el-table-column prop="rly_code" label="接点状态"></el-table-column>
                <el-table-column prop="act_code" label="动作状态"></el-table-column>
              </el-table>
              <div class="block ">
                <el-pagination @current-change="modelsHandleCurrentChange" :current-page="modelsCurrentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="modelsTotal">
                </el-pagination>
              </div>
            </el-tab-pane>

            <!-- 报警输入 -->
            <el-tab-pane label="报警输入" name="warn">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddWarnDialog">添加报警输入</el-button>
              <el-table :data="warnPageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditWarnDialog(scope.row)" type="text" size="">
                      <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text" @click="delWarn(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="grp_indx" label="设备组别"></el-table-column>
                <el-table-column prop="ctr_indx" label="群控ID"></el-table-column>
                <el-table-column prop="htz_code" label="假日时控"></el-table-column>
                <el-table-column prop="wtz_code" label="周时控"></el-table-column>
                <el-table-column prop="sta_code" label="动作类型"></el-table-column>
              </el-table>
              <div class="block ">
                <el-pagination @current-change="warnHandleCurrentChange" :current-page="warnCurrentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="warnTotal">
                </el-pagination>
              </div>
            </el-tab-pane>

            <!-- 端口输出 -->
            <el-tab-pane label="端口输出" name="output">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddOutputDialog">添加端口输出</el-button>
              <el-table :data="outputPageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditOutputDialog(scope.row)" type="text" size="">
                      <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text" @click="delOutput(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="grp_indx" label="设备组别"></el-table-column>
                <el-table-column prop="ctr_indx" label="群控ID"></el-table-column>
                <el-table-column prop="htz_code" label="假日时控"></el-table-column>
                <el-table-column prop="wtz_code" label="周时控"></el-table-column>
                <el-table-column prop="sta_code" label="动作类型"></el-table-column>
              </el-table>
              <div class="block ">
                <el-pagination @current-change="outputHandleCurrentChange" :current-page="outputCurrentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="outputTotal">
                </el-pagination>
              </div>
            </el-tab-pane>

            <!-- 模组配置 -->
            <el-tab-pane label="模组配置" name="conf">
              <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddConfDialog">添加模组配置</el-button>
              <el-table :data="confPageData" border>
                <el-table-column fixed="left" label="操作" width="80%">
                  <template slot-scope="scope">
                    <el-button @click="openEditConfDialog(scope.row)" type="text" size="">
                      <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text" @click="delConf(scope.row)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="grp_indx" label="设备组别"></el-table-column>
                <el-table-column prop="mod_indx" label="模组编号"></el-table-column>
                <el-table-column prop="typ_code" label="模式类型"></el-table-column>
                <el-table-column prop="trm_indx" label="终端编号"></el-table-column>
                <el-table-column prop="typ_indx" label="模式编号"></el-table-column>
              </el-table>
              <div class="block ">
                <el-pagination @current-change="confHandleCurrentChange" :current-page="confCurrentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="confTotal">
                </el-pagination>
              </div>
            </el-tab-pane>

          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
    <Termina ref="terminaDialog" @terminaSucc="terminaSucc"></Termina>
    <Models ref="modelsDialog" @modelsSucc="modelsSucc"></Models>
    <Warn ref="warnDialog" @warnSucc="warnSucc"></Warn>
    <Output ref="outputDialog" @outputSucc="outputSucc"></Output>
    <Conf ref="confDialog" @confSucc="confSucc"></Conf>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
import Termina from "./Termina";
import Models from "./Models";
import Warn from "./Warn";
import Output from "./Output";
import Conf from "./Conf";

export default {
  components: {
    Termina,
    Models,
    Warn,
    Output,
    Conf
  },
  data() {
    return {
      activeName: "termina",
      terminaCurrentPage: 1,
      terminaPageCurSize: 10,
      modelsCurrentPage: 1,
      modelsPageCurSize: 10,
      warnCurrentPage: 1,
      warnPageCurSize: 10,
      outputCurrentPage: 1,
      outputPageCurSize: 10,
      confCurrentPage: 1,
      confPageCurSize: 10,
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      },
      devGroup: [],
      terminaList: [],
      modelsList: [],
      warnList: [],
      outputList: [],
      confList: [],
      grpIndx: "1",
      type: "",
      trm_indx: "",
      mod_indx: "",
      ctr_indx: "",
      data: {
        grp_indx: "1"
      },
      revertFields: ["pkb_isok", "att_isok", "con_isok", "oep_isok", "met_isok"]
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
        case "models":
          this.getModelsList(this.grpIndx);
          break;
        case "warn":
          this.getWarnList(this.grpIndx);
          break;
        case "output":
          this.getOutputList(this.grpIndx);
          break;
        case "conf":
          this.getConfList(this.grpIndx);
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
        case "models":
          this.getModelsList(val);
          break;
        case "warn":
          this.getWarnList(val);
          break;
        case "output":
          this.getOutputList(val);
          break;
        case "conf":
          this.getConfList(val);
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
            // this.terminaList = data.data.data;
            let temp = data.data.data || [];

            temp.forEach(item => {
              for (let p in item) {
                if (this.revertFields.includes(p)) {
                  item[p] = this.revertData(item[p]);
                }
              }
              this.terminaList.push(item);
            });
          }
        },
        data => loadingInstance.close()
      );
    },
    openAddTerminaDialog() {
      console.info("type", this.type);
      this.type = "添加终端卡机";
      this.$nextTick(() => {
        this.$refs.terminaDialog.open();
      });
    },
    openEditTerminaDialog(record) {
      this.type = "编辑终端卡机";
      this.trm_indx = record.trm_indx;
      this.$nextTick(() => {
        this.$refs.terminaDialog.open();
      });
    },
    terminaSucc(val) {
      if (val) {
        this.type = "";
        this.getTerminaList(this.grpIndx);
      }
    },
    delTermina(record) {
      const { grp_indx, trm_indx } = record;
      const param = {
        grp_indx,
        trm_indx
      };
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/devtermina/devtermina_del", param)
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
    getModelsList(grp_indx = 1) {
      this.modelsList = [];
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      // /devtermina/devtermina_list
      axios.get(`/devtermina/prmtrmmods_list/grp_indx/${grp_indx}`).then(
        data => {
          loadingInstance.close();
          if (data.data.success === true) {
            console.info(data.data);
            this.modelsList = data.data.data;
          }
        },
        data => loadingInstance.close()
      );
    },
    openAddModelsDialog() {
      console.info("type", this.type);
      this.type = "添加模组端口";
      this.$nextTick(() => {
        this.$refs.modelsDialog.open();
      });
    },
    openEditModelsDialog(record) {
      this.type = "编辑模组端口";
      this.mod_indx = record.mod_indx;
      this.$nextTick(() => {
        this.$refs.modelsDialog.open();
      });
    },
    modelsSucc(val) {
      if (val) {
        this.type = "";
        this.getModelsList(this.grpIndx);
      }
    },
    delModels(record) {
      const { grp_indx, mod_indx } = record;
      const param = {
        grp_indx,
        mod_indx
      };
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/devtermina/prmtrmmods_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getModelsList(this.grpIndx);
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    getWarnList(grp_indx = 1) {
      this.warnList = [];
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get(`/devtermina/prmtrmwarn_list/grp_indx/${grp_indx}`).then(
        data => {
          loadingInstance.close();
          if (data.data.success === true) {
            console.info(data.data);
            this.warnList = data.data.data;
          }
        },
        data => loadingInstance.close()
      );
    },
    openAddWarnDialog() {
      console.info("type", this.type);
      this.type = "添加报警输入";
      this.$nextTick(() => {
        this.$refs.warnDialog.open();
      });
    },
    openEditWarnDialog(record) {
      this.type = "编辑报警输入";
      this.ctr_indx = record.ctr_indx;
      this.$nextTick(() => {
        this.$refs.warnDialog.open();
      });
    },
    warnSucc(val) {
      if (val) {
        this.type = "";
        this.getWarnList(this.grpIndx);
      }
    },
    delWarn(record) {
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
            .post("/devtermina/prmtrmwarn_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getWarnList(this.grpIndx);
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },

    getOutputList(grp_indx = 1) {
      this.outputList = [];
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get(`/devtermina/prmtrmoutp_list/grp_indx/${grp_indx}`).then(
        data => {
          loadingInstance.close();
          if (data.data.success === true) {
            console.info(data.data);
            this.outputList = data.data.data;
          }
        },
        data => loadingInstance.close()
      );
    },
    openAddOutputDialog() {
      console.info("type", this.type);
      this.type = "添加端口输出";
      this.$nextTick(() => {
        this.$refs.outputDialog.open();
      });
    },
    openEditOutputDialog(record) {
      this.type = "编辑端口输出";
      this.ctr_indx = record.ctr_indx;
      this.$nextTick(() => {
        this.$refs.outputDialog.open();
      });
    },
    outputSucc(val) {
      if (val) {
        this.type = "";
        this.getOutputList(this.grpIndx);
      }
    },
    delOutput(record) {
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
            .post("/devtermina/prmtrmoutp_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getOutputList(this.grpIndx);
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },
    getConfList(grp_indx = 1) {
      this.confList = [];
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get(`/devtermina/prmmodecfg_list/grp_indx/${grp_indx}`).then(
        data => {
          loadingInstance.close();
          if (data.data.success === true) {
            console.info(data.data);
            this.confList = data.data.data;
          }
        },
        data => loadingInstance.close()
      );
    },
    openAddConfDialog() {
      console.info("type", this.type);
      this.type = "添加模组配置";
      this.$nextTick(() => {
        this.$refs.confDialog.open();
      });
    },
    openEditConfDialog(record) {
      this.type = "编辑模组配置";
      this.mod_indx = record.mod_indx;
      this.$nextTick(() => {
        this.$refs.confDialog.open();
      });
    },
    confSucc(val) {
      if (val) {
        this.type = "";
        this.getConfList(this.grpIndx);
      }
    },
    delConf(record) {
      const { grp_indx, mod_indx } = record;
      const param = {
        grp_indx,
        mod_indx
      };
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/devtermina/prmmodecfg_del", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getConfList(this.grpIndx);
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
    modelsHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.terminaCurrentPage = val;
    },
    warnHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.terminaCurrentPage = val;
    },
    outputHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.terminaCurrentPage = val;
    },
    confHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.terminaCurrentPage = val;
    },

    revertData(input) {
      if (input === "1") {
        return "是";
      } else {
        return "否";
      }
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
    modelsTotal() {
      return this.modelsList.length;
    },
    modelsChunkList() {
      return _.chunk(this.modelsList, this.modelsPageCurSize);
    },
    modelsPageData() {
      return this.modelsChunkList[this.modelsCurrentPage - 1];
    },
    warnTotal() {
      return this.warnList.length;
    },
    warnChunkList() {
      return _.chunk(this.warnList, this.warnPageCurSize);
    },
    warnPageData() {
      return this.warnChunkList[this.warnCurrentPage - 1];
    },
    outputTotal() {
      return this.outputList.length;
    },
    outputChunkList() {
      return _.chunk(this.outputList, this.outputPageCurSize);
    },
    outputPageData() {
      return this.outputChunkList[this.outputCurrentPage - 1];
    },
    confTotal() {
      return this.confList.length;
    },
    confChunkList() {
      return _.chunk(this.confList, this.confPageCurSize);
    },
    confPageData() {
      return this.confChunkList[this.confCurrentPage - 1];
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
