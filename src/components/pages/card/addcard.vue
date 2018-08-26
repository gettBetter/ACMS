<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-bottom:20px">部门人员树</div>
          <el-tree :data="treeData" :props="treeProp" @node-click="handleNodeClick" :expand-on-click-node="false" highlight-current style="height:400px;overflow:scroll">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <!-- <span v-if="data.emp_indx">
                  <el-checkbox :v-model="false" :id="data.emp_indx" @change="checed=>changeUserList(checed,node,data)"></el-checkbox>
                </span> -->
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

          <!-- <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="losCard" :disabled="disableBtn">挂失</el-button> -->
          <el-row>
            <el-col :span="16">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                  <el-button type="primary" style="margin-bottom:10px;text-align:center" @click="cardConfig" :disabled="disableBtn">发卡</el-button>
                </el-form-item>

                <el-form-item label-width="100px" label="设备端口：">
                  <el-input v-model="dev_param"></el-input>
                </el-form-item>
                <el-form-item>
                  <span>如：COM3.38400,0,8,0</span>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <el-table :data="pageData" border @selection-change="selectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="emp_indx" label="用户ID"></el-table-column>
            <el-table-column prop="emp_code" label="用户编号"></el-table-column>
            <el-table-column prop="emp_name" label="用户姓名"></el-table-column>
            <el-table-column prop="crd_code" label="证件编码"></el-table-column>
            <el-table-column prop="dep_name" label="所属部门"></el-table-column>
            <el-table-column prop="rnk_name" label="人员类别"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <card-config ref="cardConfig" @config="config"></card-config>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
import CardConfig from "./CardConfig";

export default {
  components: {
    CardConfig
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
      disableBtn: true,
      dev_param: "COM3.38400,0,8,0"
    };
  },
  methods: {
    reset() {
      this.user_list = [];
    },
    selectionChange(data) {
      console.info(data);
      this.user_list = data.map(item => {
        let { emp_indx, crd_code } = item;
        return { emp_indx, crd_code };
      });
      if (this.user_list.length) this.disableBtn = false;
    },
    handleNodeClick(node, data) {
      const isDep = !node.emp_indx;
      console.info("isDep", isDep, node, data);
      let param = {};
      if (isDep) {
        param = `/card/nocard_userlist/dep_indx/${node.dep_indx}`;
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
          // this.treeData = data.data.data[0].children;
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
        .get(param)
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
    // openDev() {
    //   // const param = ;
    //   this.card_id = WSPCPP.PORT_Open(this.dev_param);

    //   if (this.card_id < 0) {
    //     alert("打开失败，请检测设备连接是否正常");
    //   } else {
    //     this.$message({
    //       type: "success",
    //       message: "打开端口成功!"
    //     });
    //   }
    // },
    // losCard() {
    //   const users = this.user_list;
    //   const count = users.length;

    // },
    cardConfig() {
      this.$refs.cardConfig.openConfig();

      // const users = this.user_list;
      // const count = users.length;
      // this.$confirm(`发卡人数：${count}，确定发卡？`, "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {
      //   for (let i = 0; i < count; i++) {
      //     this.$confirm(
      //       `请放入卡片，点击【确定】进行发卡，点击【取消】退出`,
      //       "提示",
      //       {
      //         confirmButtonText: "确定",
      //         cancelButtonText: "取消",
      //         type: "warning"
      //       }
      //     ).then(() => {
      //       // users
      //       const resCardId = WSPCPP.Access_CommandBLX(
      //         this.card_id,
      //         65535,
      //         0x000601,
      //         ""
      //       );
      //       WSPCPP.Access_CommandBLX(this.card_id, 65535, 0x000608, "1,100");

      //       // /card/card_add
      //     });
      //   }
      //   WSPCPP.Port_Close(this.card_id);
      // });
    },
    config(val) {
      if (val) {
        this.getList();
      }
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
    this.reset();
    this.getTree();
  },
  mounted() {
    try {
      var objCard = new ActiveXObject("WSPCPP.WSPCPPCtrl.1");
    } catch (e) {
      this.$confirm("调用控件失败，先进行下载安装!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // http://203.195.236.217:9000/WSPCPP.rar
        window.open("http://203.195.236.217:9000/WSPCPP.rar");
      });
      //注意:弹出一个下载地址,或者一个页面.http://网站地址/WSPCPP.rar
    }
  }
};
</script>
