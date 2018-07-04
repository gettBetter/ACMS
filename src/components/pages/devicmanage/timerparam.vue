<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>门禁时段列表</span>
      </div>

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
        <el-table-column prop="tmr_indx" label="序号" sortable></el-table-column>
        <el-table-column prop="tmr_name" label="时段名称"></el-table-column>
        <el-table-column prop="tmr_week" label="星期设置"></el-table-column>
        <el-table-column prop="mr_next" label="下一时段"></el-table-column>
        <el-table-column prop="bgn_date" label="开始日期"></el-table-column>
        <el-table-column prop="end_date" label="结束日期"></el-table-column>

        <el-table-column prop="bgn_tmr1" label="开始时段一"></el-table-column>
        <el-table-column prop="end_tmr1" label="结束时段一"></el-table-column>

        <el-table-column prop="bgn_tmr2" label="开始时段二"></el-table-column>
        <el-table-column prop="end_tmr2" label="结束时段二"></el-table-column>

        <el-table-column prop="bgn_tmr3" label="开始时段三"></el-table-column>
        <el-table-column prop="end_tmr3" label="结束时段三"></el-table-column>

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

export default {
  data() {
    return {
      currentPage: 1,
      pageCurSize: 10,
      list: []
    };
  },
  methods: {
    getList() {
      let loadingInstance = Loading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector(".adminpage")
      });
      axios.get("/timerparam/timerparam_list").then(
        data => {
          if (data.data.success === true) {
            loadingInstance.close();
            console.info(data.data);

            let d = data.data.data;
            d.forEach(item => {
              if (item.use_isok === "1") {
                item.use_isok = "启用";
              } else if (item.use_isok === "0") {
                item.use_isok = "未启用";
              }
            });
            this.list = d;
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    edit(record) {
      // debugger
      this.$parent.$router.push({
        name: "edittimerparam",
        params: { id: record.tmr_indx }
      });
    },
    add() {
      this.$parent.$router.push({
        name: "addtimerparam"
      });
    },
    del(recored) {
      let param = {
        tmr_indx: recored.tmr_indx
      };

      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/timerparam/timerparam_del", param)
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

<style >
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>


