<template>
    <div>
        <el-card class="box-card">
            <div style="margin-bottom:20px">岗位授权列表</div>
            <el-table :data="pageData" border>
                <el-table-column fixed="left" label="操作" width="60%">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <!-- <el-button type="text" @click="del(scope.row)">
                            <i class="el-icon-delete"></i>
                        </el-button> -->
                    </template>
                </el-table-column>
                <el-table-column prop="bas_indx" label="岗位ID"></el-table-column>
                <el-table-column prop="bas_name" label="岗位名称"></el-table-column>
                <el-table-column prop="mr_name" label="控制群组"></el-table-column>
                <el-table-column prop="fcd_name" label="检查APB"></el-table-column>
                <el-table-column prop="mcd_name" label="卡片类型"></el-table-column>
                <el-table-column prop="use_cdat" label="启用证卡有效日期"></el-table-column>
                <el-table-column prop="dev_chan" label="设备ID"></el-table-column>
            </el-table>

            <div class="block ">
                <el-pagination @current-change="handleCurrentChange " :current-page="currentPage " :page-size="10 " layout="total, prev, pager, next, jumper " :total="total ">
                </el-pagination>
            </div>
        </el-card>

        <el-dialog title="岗位授权" :visible.sync="editDialog" width="70%">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div style="margin-bottom:20px">区域设备通道树</div>
                    <el-tree :data="devTreeData" :props="devTreeProp" :expand-on-click-node="false" highlight-current style="max-height:400px;overflow:scroll">
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
                <el-col :span="16">
                    <el-form>
                        <el-form-item :label-width="formLabelWidth" label="应用群组:">
                            <el-select v-model="editData.tmr_indx">
                                <el-option v-for="opt in tmr_list" :label="opt.tmr_name" :value="opt.tmr_indx" :key="opt.tmr_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item :label-width="formLabelWidth" label="检查APB:">
                            <el-select v-model="editData.fcd_indx">
                                <el-option v-for="opt in fcd_list" :label="opt.fcd_name" :value="opt.fcd_indx" :key="opt.fcd_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item :label-width="formLabelWidth" label="卡片类型:">
                            <el-select v-model="editData.mcd_indx">
                                <el-option v-for="opt in mcd_list" :label="opt.mcd_name" :value="opt.mcd_indx" :key="opt.mcd_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>
                </el-col>
            </el-row>

            <span slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="save">确 定</el-button>
                <el-button @click="editDialog = false">取 消</el-button>
            </span>
        </el-dialog>
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
      editDialog: false,
      devTreeData: [],
      devTreeProp: {
        label: "label",
        children: "children"
      },
      formLabelWidth: "80px",
      editData: {},
      devList: [],
      chnList: [],
      mcd_list: [],
      grp_list: [],
      tmr_list: [],
      fcd_list: [],
      bas_indx: ""
    };
  },
  methods: {
    handleNodeClick(node, data) {
      console.info(node, data);
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
    getTree() {
      axios.get("/authorlist/authorlist_channel_tree").then(data => {
        if (data.data.success) {
          console.info(data.data);
          let temp = data.data.data;
          function getChildren(arr) {
            arr.forEach(item => {
              item.label = item.are_name || item.emp_name;
              if (item.children) {
                if (item.dev_list) {
                  item.children = item.children.concat(item.dev_list);
                }
                getChildren(item.children);
              } else {
                item.label = item.are_name || item.dev_name;
                item.children = item.dev_list.map(item => {
                  item.label = item.emp_name || item.dev_name;
                  return item;
                });
              }
            });
          }
          getChildren(temp);
          this.devTreeData = temp;
        }
      });
    },
    getDialog(bas_indx) {
      axios
        .get("/authorlist/auth_job_edit", { params: { bas_indx: bas_indx } })
        .then(data => {
          if (data.data.success) {
            console.info(data.data);
            const temp = data.data;
            this.editData = temp.data[0];
            this.mcd_list = temp.mcd_list;
            this.grp_list = temp.grp_list;
            this.tmr_list = temp.tmr_list;
            this.fcd_list = temp.fcd_list;
          }
        });
    },
    getList() {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      this.list = [];

      axios
        .get("/authorlist/auth_job_list")
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              console.info(data.data);
              this.list = data.data.data.map(item => {
                item.use_cdat = item.use_cdat == 1 ? "是" : "否";
                return item;
              });
              //   this.list = data.data.data;
            } else {
              alert(data.data.msg);
            }
          },
          data => loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    },
    handleNodeClick(node, data) {
      console.info(node, data);
    },
    edit(record) {
      console.info(record);
      this.getTree();
      this.getDialog(record.bas_indx);
      this.editDialog = true;
    },
    save() {
      const param = this.editData;
      delete param.ROW_NUMBER;
      param.user_list = this.userList;
      param.dev_list = this.devList;
      param.chn_list = this.chnList;
      console.info(param);
      axios.post("/authorlist/auth_job_save", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          this.editDialog = false;
        }
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
  activated() {
    this.getList();
  }
};
</script>

<style>
.el-dialog__footer {
  text-align: center;
}
</style>


