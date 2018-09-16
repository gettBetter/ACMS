<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>区域列表</span>
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
        <el-table-column prop="are_indx" label="序号" sortable></el-table-column>
        <el-table-column prop="are_name" label="区域名称"></el-table-column>
        <el-table-column prop="p_are_name" label="上级区域"></el-table-column>
        <el-table-column prop="are_rank" label="区域层级"></el-table-column>
        <el-table-column prop="are_type" label="区域类型"></el-table-column>

      </el-table>

      <!-- <div class="block">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->

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
      //   currentPage: 1,
      //   pageCurSize: 10,
      //   dialogTableVisible: false,
      //   dialogFormVisible: false,
      //   userInfo: {},
      //   innerVisible: false,
      //   depData: [],
      //   defaultProps: {
      //     children: "children",
      //     label: "label"
      //   },
      //   userEditData: {},
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
      axios
        .get("/devicearea/devicearea_list")
        .then(
          data => {
            loadingInstance.close();
            if (data.data.success === true) {
              this.list = data.data.data;
            } else {
              alert(data.data.msg);
            }
          },
          data=>loadingInstance.close()
        )
        .catch(err => loadingInstance.close());
    },
    edit(record) {
      //  
      this.$parent.$router.push({
        name: "editarea",
        params: { id: record.are_indx }
      });
    },
    add() {
      this.$parent.$router.push({
        name: "addarea"
      });
    },
    del(recored) {
      let param = {
        are_indx: recored.are_indx
      };

      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/devicearea/devicearea_del", param)
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
    }
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.currentPage = val;
    // }
  },
  computed: {
    // total() {
    //   return this.allListData.length;
    // },
    // chunkList() {
    //   return _.chunk(this.allListData, this.pageCurSize);
    // },
    // pageData() {
    //   return this.chunkList[this.currentPage - 1];
    // }
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


