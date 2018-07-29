<template>
  <div>
    <el-dialog width="40%" style="min-height:400px" :title="type" :visible.sync="dialogVisible" append-to-body center>
      <el-form :model="data" label-width="80px">
        <el-form-item label="设备组别:">
          <span>{{grpIndx}}</span>
        </el-form-item>

        <el-form-item label="时段编号:">
          <el-select v-model="data.tmr_indx">
            <el-option v-for="opt in tmr_list" :label="opt.tmr_name" :value="opt.tmr_indx" :key="opt.tmr_indx">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="起始时间:">
          <el-time-picker value-format="HH:mm" v-model="data.bgn_time"></el-time-picker>
        </el-form-item>

        <el-form-item label="终止时间:">
          <el-time-picker value-format="HH:mm" v-model="data.end_time"></el-time-picker>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    grpIndx: {
      type: String,
      default: "1"
    },
    type: {
      type: String,
      default: ""
    },
    tmrIndx: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialogVisible: false,
      data: {},
      tmr_list: []
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
      this.getTree();
      this.getData();
    },
    getTree() {
      axios
        .get("/card/card_area_config_data")
        .then(data => {
          console.info("tree", data.data);
          this.treeData = data.data.data[0].children;
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    getData() {
      if (this.type === "添加时段时钟") {
        axios
          .get("/timerparam/prmtmrclck_add_data")
          .then(data => {
            console.info("添加", data.data);
            this.tmr_list = data.data.data;
          })
          .catch(data => {
            alert(data.data.msg);
          });
      } else if (this.type === "编辑时段时钟") {
        axios
          .get("/timerparam/prmtmrclck_add_data", {
            params: {
              grp_indx: this.grpIndx,
              tmr_indx: this.tmrIndx
            }
          })
          .then(data => {
            console.info("编辑", data.data);
            // this.tmr_list = data.data.data;
          })
          .catch(data => {
            alert(data.data.msg);
          });
      }
    },
    save() {
      const param = this.data;
      param.grp_indx = this.grpIndx;
      console.info(param);
      if (this.type === "添加时段时钟") {
        axios.post("/timerparam/prmtmrclck_add", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "添加时段时钟成功!"
            });
            this.dialogVisible = false;
            this.$emit("addClockSucc", true);
          }
        });
      } else if (this.type === "编辑时段时钟") {
        axios.post("/timerparam/prmtmrclck_edit_save", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "编辑时段时钟成功!"
            });
            this.dialogVisible = false;
            this.$emit("addClockSucc", true);
          }
        });
      }
    }
  }
};
</script>

