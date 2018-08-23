<template>
  <div class="cardpage">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-bottom:20px">部门人员树</div>
          <el-tree :data="treeData" :props="treeProp" @node-click="handleNodeClick" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span v-if="!data.emp_indx">
                  <i class="iconfont icon-plus-departments" style="padding:0 4px" />
                </span>
                <span v-if="data.emp_indx">
                  <i class="iconfont icon-renyuan" style="padding:0 4px" />
                </span>
                <span>{{node.label}}</span>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="18">
          <div style="margin-bottom:20px">发卡列表</div>
          <el-row>
            <el-col :span="18">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="add">发卡</el-button>
                </el-form-item>
                <el-form-item label-width="100px" label="设备端口：">
                  <el-input v-model="dev_param"></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" @click="openDev">打开端口</el-button>
                   -->
                  <span>如：COM3.38400,8,0</span>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <el-table :data="pageData" border>
            <el-table-column fixed="left" label="操作" width="140px">
              <template slot-scope="scope">
                <el-button @click="loss(scope.row)" type="text" title="挂失" style="font-size:12px" v-if="scope.row.sta_indx != '4'">
                  <i class="iconfont icon-guashi"></i>
                </el-button>

                <el-button @click="unloss(scope.row)" type="text" title="解挂" style="font-size:12px" v-if="scope.row.sta_indx == '4'">
                  <i class="iconfont icon-jiegua"></i>
                </el-button>

                <el-button @click="exchange(scope.row)" type="text" title="换卡">
                  <i class="iconfont icon-zhuanhuan"></i>
                </el-button>

                <el-button @click="remove(scope.row)" type="text" title="注销">
                  <i class="iconfont icon-xiaohu"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="emp_indx" label="用户ID"></el-table-column>
            <el-table-column prop="crd_indx" label="卡序号"></el-table-column>
            <el-table-column prop="emp_code" label="用户编号"></el-table-column>
            <el-table-column prop="emp_name" label="用户姓名"></el-table-column>
            <el-table-column prop="dep_name" label="所属部门"></el-table-column>
            <el-table-column prop="crd_code" label="卡物理号"></el-table-column>
            <el-table-column prop="sta_name" label="证卡状态"></el-table-column>
            <el-table-column prop="typ_name" label="卡类型"></el-table-column>
            <el-table-column prop="inc_cost" label="收工本费"></el-table-column>
            <el-table-column prop="exp_cost" label="退工本费"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>

    </el-card>

    <exchange-card ref="exchangeCard" @exchanged="isExchange"></exchange-card>

    <!-- <object classid="clsid:EDFCE70C-1AA8-4C7F-BE71-D22B2D0DC8BD" :codebase="codebase" width="10" height="10" align="center" hspace="0" vspace="0" id="WSPCPP"></object> -->
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
import ExchangeCard from "./ExchangeCard";

export default {
  components: {
    ExchangeCard
  },
  data() {
    return {
      currentPage: 1,
      pageCurSize: 10,
      userInfo: {},
      treeData: [],
      treeProp: {
        label: "label",
        children: "children"
      },
      list: [],
      user_list: [],
      crdIndx: "",
      dev_param: "",
      card_id: ""
    };
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      const isDep = !data.emp_indx;
      console.info(isDep, data, checked, indeterminate);
      if (isDep) {
        console.info("1");
      } else {
        console.info("2");
      }
    },
    handleNodeClick(node, data) {
      const isDep = !node.emp_indx;
      console.info("isDep", isDep, node, data);
      let param = {};
      if (isDep) {
        param = {
          dep_indx: node.dep_indx
        };
      } else {
        param = {
          emp_indx: node.emp_indx
        };
      }

      this.getList(param);
    },
    getTree() {
      axios
        .get("/index/dept_users_tree")
        .then(data => {
          console.info("tree", data.data);
          const temp = data.data.data[0];
          console.info("data", temp);
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
        .catch(err => {
          console.error(err);
        });
    },
    getList(param) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".cardpage")
      });
      this.list = [];

      if (param && param.emp_indx) {
        this.getEmpList(param, loadingInstance);
      } else {
        this.getDepList(param, loadingInstance);
      }
    },
    getDepList(param, loadingInstance) {
      axios
        .get("/card/card_user_list", { params: param })
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              this.list = data.data.data;
            } else {
              alert(data.data.msg);
            }
          },
          data => loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    },
    getEmpList(param, loadingInstance) {
      axios
        .get("/card/card_user_select", { params: param })
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              this.list = data.data.data;
            } else {
              alert(data.data.msg);
            }
          },
          data => loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    },
    add() {
      this.$parent.$router.push({
        name: "addcard"
      });
    },
    exchange(record) {
      this.crdIndx = record.crd_indx;
      this.$nextTick(() => {
        this.$refs.exchangeCard.openExchange();
      });
    },
    isExchange(val) {
      if (val) {
        this.getList();
      }
    },
    openDev() {
      // const param = ;
      this.card_id = WSPCPP.PORT_Open(this.dev_param);

      if (this.card_id < 0) {
        alert("打开失败，请检测设备连接是否正常");
        return false;
      } else {
        this.$message({
          type: "success",
          message: "打开端口成功!"
        });
        return true;
      }
    },
    loss(recored) {
      let param = {
        crd_indx: recored.crd_indx
      };

      if (this.openDev()) {
        this.$confirm(
          `卡片一经挂失，其卡号被列入各业务系统黑名单中，导致卡片不可用。确实要挂失卡号为${
            recored.crd_indx
          }的卡片?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            const resCardId = WSPCPP.Access_CommandBLX(
              this.card_id,
              65535,
              0x000601,
              ""
            );
            WSPCPP.Access_CommandBLX(this.card_id, 65535, 0x000608, "1,100");

            axios
              .post("/card/card_loss", param)
              .then(data => {
                if (data.data.success === true) {
                  this.$message({
                    type: "success",
                    message: "挂失成功!"
                  });
                  WSPCPP.Port_Close(this.card_id);
                  this.getList();
                }
              })
              .catch(err => alert(err));
          })
          .catch(() => {});
      }
    },
    unloss(recored) {
      let param = {
        crd_indx: recored.crd_indx
      };

      this.$confirm(
        `卡片一经解挂，其卡号变为可用。确实要解挂卡号为${
          recored.crd_indx
        }的卡片?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          axios
            .post("/card/card_unloss", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "解挂成功!"
                });
                this.getList();
              }
            })
            .catch(err => alert(err));
        })
        .catch(() => {});
    },

    remove(recored) {
      let param = {
        crd_indx: recored.crd_indx
      };

      this.$confirm("此操作需要回收所有POS的交易数据，是否已回收?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/card/card_remove", param)
            .then(data => {
              if (data.data.success === true) {
                this.$message({
                  type: "success",
                  message: "销户成功!"
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
    total() {
      return this.list.length;
    },
    chunkList() {
      return _.chunk(this.list, this.pageCurSize);
    },
    pageData() {
      return this.chunkList[this.currentPage - 1];
    }
    // codebase() {
    //   const host = location.host;
    //   return `${host}/WSPCPP.ocx#version=1,0,0,0`;
    // }
  },
  activated() {
    this.getList();
    this.getTree();
  },
  mounted() {
    // try {
    //   var objCard = new ActiveXObject("WSPCPP.WSPCPPCtrl.1");
    // } catch (e) {
    //   this.$confirm("调用控件失败，先进行下载安装!", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     // http://203.195.236.217:9000/WSPCPP.rar
    //     window.open("http://203.195.236.217:9000/WSPCPP.rar");
    //   });
    //   //注意:弹出一个下载地址,或者一个页面.http://网站地址/WSPCPP.rar
    // }
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


