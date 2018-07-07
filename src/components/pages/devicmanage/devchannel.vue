<template>
    <div>
        <el-card class="box-card">

            <el-row :gutter="20">
                <el-col :span="6">
                    <div style="margin-bottom:20px">门禁通道树形</div>
                    <el-tree :data="treeData" :props="treeProp" @node-click="handleNodeClick" default-expand-all :render-content="renderContent" highlight-current>
                    </el-tree>
                </el-col>
                <el-col :span="18">
                    <div style="margin-bottom:20px">门禁通道列表</div>
                    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="add">添加</el-button>

                    <el-table :data="list" border>
                        <el-table-column fixed="left" label="操作" width="80%">
                            <template slot-scope="scope">
                                <el-button @click="edit(scope.row)" type="text" size="">
                                    <i class="el-icon-edit"></i>
                                </el-button>

                                <el-button type="text" @click="del(scope.row)">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                            </template>
                        </el-table-column>

                        <el-table-column prop="chn_indx" label="序号"></el-table-column>
                        <el-table-column prop="chn_name" label="名称"></el-table-column>
                        <el-table-column prop="dev_indx" label="设备序号"></el-table-column>
                        <el-table-column prop="ctl_name" label="控制方式"></el-table-column>
                        <el-table-column prop="dly_time" label="开门延时(s)"></el-table-column>

                    </el-table>

                    <div class="block ">
                        <el-pagination @current-change="handleCurrentChange " :current-page="currentPage " :page-size="10 " layout="total, prev, pager, next, jumper " :total="total ">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>

        </el-card>

    </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
export default {
  data() {
    return {
      currentPage: 1,
      pageCurSize: 10,
      list: [],
      treeData: [],
      treeProp: {
        label: "are_name",
        children: "children"
      }
    };
  },
  methods: {
    getTree() {
      axios.get("/devchannel/devchannel_tree").then(data => {
        if (data.data.success) {
          console.info(data.data);
          this.treeData = data.data.data;
        }
      });
    },
    getList(param) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get("/devchannel/devchannel_list", { params: param }).then(
        data => {
          if (data.data.success === true) {
            loadingInstance.close();
            console.info(data.data);
            this.list = data.data.data;
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    handleNodeClick(node) {
      console.info(node);
      if (node.type == "") {
      } else if (node.type == "") {
      }
      const param = {
        are_indx: node.are_indx
      };
      this.list = [];
      this.getList(param);
    },
    edit(record) {
      // debugger
      this.$parent.$router.push({
        name: "editdevchannel",
        params: { id: record.chn_indx }
      });
    },
    add() {
      this.$parent.$router.push({
        name: "adddevchannel"
      });
    },
    del(record) {
      let param = {
        dev_indx: record.dev_indx,
        chn_indx: record.chn_indx
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
      // <i class="el-icon-share" style="padding:0 4px" />
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>
            <i class="iconfont icon-ditu" style="padding:0 4px" />
          </span>
          <span>{node.label}</span>
        </span>
      );
    }
  },
  computed: {
    total() {
      if ("length" in this.list) {
        return this.list.length;
      } else {
        return 0;
      }
    },
    chunkList() {
      return _.chunk(this.list, this.pageCurSize);
    },
    pageData() {
      return this.chunkList[this.currentPage - 1];
    }
  },
  activated() {
    this.getTree();
    this.getList();
  }
};
</script>

<style scoped>
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>


