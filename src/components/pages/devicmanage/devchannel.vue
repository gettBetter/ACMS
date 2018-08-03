<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>门禁通道</span>
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
          <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="openAddDialog">添加通道</el-button>
          <el-table :data="pageData" border>
            <el-table-column fixed="left" label="操作" width="80%">
              <template slot-scope="scope">
                <el-button @click="openEditDialog(scope.row)" type="text">
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button type="text" @click="del(scope.row)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="grp_indx" label="设备组别"></el-table-column>
            <el-table-column prop="chn_indx" label="通道编号"></el-table-column>
            <el-table-column prop="chn_name" label="通道名称"></el-table-column>

            <el-table-column prop="dly_time" label="控制方式"></el-table-column>
            <el-table-column prop="chn_stat_name" label="门位名称"></el-table-column>
            <el-table-column prop="apb_name" label="反潜回名称"></el-table-column>
            <!-- <el-table-column prop="pin_spwd" label="安全密码"></el-table-column> -->

          </el-table>
          <div class="block ">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper " :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <channel ref="channelDialog" @channelSucc="channelSucc"></channel>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
import Channel from "./Channel";

export default {
  components: {
    Channel
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
      list: [],
      devGroup: [],
      grpIndx: "1",
      chn_indx: "",
      data: {},
      type: ""
    };
  },
  methods: {
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
    openAddDialog() {
      console.info("type", this.type);
      this.type = "添加门禁通道";
      this.$nextTick(() => {
        this.$refs.channelDialog.open();
      });
    },
    openEditDialog(record) {
      this.type = "编辑门禁通道";
      this.chn_indx = record.chn_indx;
      this.$nextTick(() => {
        this.$refs.channelDialog.open();
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
            .post("/timerparam/prmtmrclck_del", param)
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
