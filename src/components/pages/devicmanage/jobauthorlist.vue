<template>
    <div>
        <el-card class="box-card">
            <div style="margin-bottom:20px">岗位授权</div>
            <el-table :data="pageData" border>
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

                <el-table-column prop="bas_indx" label="岗位ID"></el-table-column>
                <el-table-column prop="bas_name" label="岗位名称"></el-table-column>
                <el-table-column prop="mr_name" label="控制群组"></el-table-column>
                <el-table-column prop="fcd_name" label="检查APB"></el-table-column>
                <el-table-column prop="mcd_name" label="卡片类型"></el-table-column>
                <el-table-column prop="use_cdat" label="启用证卡有效日期"></el-table-column>
                <el-table-column prop="dev_chan" label="设备ID"></el-table-column>
                <!-- <el-table-column prop="grp_name" label="设备组别"></el-table-column>
                <el-table-column prop="fcd_name" label="检查APB"></el-table-column>
                <el-table-column prop="aut_flag" label="是否授权"></el-table-column> -->
            </el-table>

            <div class="block ">
                <el-pagination @current-change="handleCurrentChange " :current-page="currentPage " :page-size="10 " layout="total, prev, pager, next, jumper " :total="total ">
                </el-pagination>
            </div>
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
    };
  },
  methods: {

    getList(param) {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      this.list = [];
      axios
        .get("/authorlist/auth_job_list", { params: param })
        .then(
          data => {
            if (data.data.success === true) {
              loadingInstance.close();
              console.info(data.data);
            //   this.list = data.data.data.map(item => {
            //     item.aut_flag = item.aut_flag == 1 ? "授权" : "未授权";
            //     return item;
            //   });
            // this.list
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
      this.$parent.$router.push({
        name: "editauthorlist",
        params: { dev: record.dev_indx, emp: record.emp_indx }
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

<style scoped>
</style>


