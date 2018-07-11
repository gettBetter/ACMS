<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-bottom:20px">门禁设备</div>
          <el-tree :data="treeData" :props="treeProp" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false" highlight-current>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <span v-if="data.tag == 1">{{node.tag}}
                  <i class="iconfont icon-ditu" style="padding:0 4px" />
                </span>
                <span v-if="data.tag == 2">
                  <i class="iconfont icon-menjinshebei" style="padding:0 4px" />
                </span>
                <span>{{node.label}}</span>
              </span>
              <span v-if="data.tag === 2">
                <el-button @click="add(node,data)" type="text">
                  <i class="el-icon-plus"></i>
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="18">
          <div style="margin-bottom:20px">列表</div>
          <!-- <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;text-align:center" @click="add">添加</el-button> -->

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

            <el-table-column prop="trm_indx" label="终端序号"></el-table-column>
            <el-table-column prop="trm_name" label="终端名称"></el-table-column>
            <el-table-column prop="dev_indx" label="设备序号"></el-table-column>
            <el-table-column prop="pkb_isok" label="启用密码开门"></el-table-column>
            <el-table-column prop="att_isok" label="考勤扩展"></el-table-column>
            <el-table-column prop="con_isok" label="次计就餐"></el-table-column>
            <el-table-column prop="oep_isok" label="在线巡逻"></el-table-column>
            <el-table-column prop="met_isok" label="会议签到"></el-table-column>
            <el-table-column prop="chn_indx" label="关联通道"></el-table-column>
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
        label: "label",
        children: "children"
        // id: "tag"
      },
      revertFields: ["pkb_isok", "att_isok", "con_isok", "oep_isok", "met_isok"]
    };
  },
  methods: {
    getTree() {
      axios.get("/devtermina/devtermina_tree").then(data => {
        if (data.data.success) {
          let temp = data.data.data;
          function getChildren(arr) {
            arr.forEach(item => {
              item.label = item.are_name || item.dev_name;
              if (item.children) {
                if (item.dev_list) {
                  item.children = item.children.concat(item.dev_list);
                }
                getChildren(item.children);
              }
            });
          }
          getChildren(temp);
          this.treeData = temp;
        }
      });
    },
    getList(param) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      this.list = [];
      axios
        .get("/devtermina/devtermina_list", { params: param })
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              console.info(data.data);

              let temp = data.data.data || [];

              temp.forEach(item => {
                for (let p in item) {
                  if (this.revertFields.includes(p)) {
                    item[p] = this.revertData(item[p]);
                  }
                }
                this.list.push(item);
              });
            } else {
              alert(data.data.msg);
            }
          },
          data => {
            loadingInstance.close();
            alert("System Error");
          }
        )
        .catch(err => {
          alert(err);
        });
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
      this.$parent.$router.push({
        name: "editdevtermina",
        params: { dev: record.dev_indx, trm: record.trm_indx }
      });
    },
    add(record) {
      this.$parent.$router.push({
        name: "adddevtermina",
        params: { id: record.data.dev_indx }
      });
    },
    del(record) {
      let param = {
        dev_indx: record.dev_indx,
        trm_indx: record.trm_indx
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
    },
    revertData(input) {
      if (input === "0") {
        return "否";
      } else if (input === "1") {
        return "是";
      } else {
        return input;
      }
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>


