<template>
  <div>
    <el-dialog v-if="type" width="50%" style="min-height:400px" :title="type" :visible.sync="dialogVisible" append-to-body center>
      <el-form :model="data" label-width="100px" style="max-height:450px;overflow-y:scroll">
        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item label="设备组别:">
              <span>{{grpIndx}}</span>
            </el-form-item>

            <el-form-item label="群控编号:">
              <el-select v-model="data.ctr_indx">
                <el-option v-for="opt in prmtrmoutp_list " :label="opt.ctr_name" :value="opt.ctr_indx" :key="opt.ctr_indx">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="动作类型:">
              <el-select v-model="data.sta_code">
                <el-option v-for="opt in sta_list" :label="opt.sta_name" :value="opt.sta_indx" :key="opt.sta_indx">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="周计划时控"></el-form-item>
            <el-form-item v-for="(opt,index) in weeks" :key="index" :label="opt+':'">
              <el-select v-model="week['data'+(index+1)]">
                <el-option v-for="opt in zone_list" :label="opt.tzn_name" :value="opt.tzn_indx" :key="opt.tzn_indx">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="11" :offset="1">
            <el-form-item label="假日前中后三天时控" label-width="140px"></el-form-item>
            <el-form-item label="前一天">
              <el-select v-model="htz['data'+n]" v-for="n in 8" :key="n" style="margin-top:5px">
                <el-option v-for="opt in zone_list" :label="opt.tzn_name" :value="opt.tzn_indx" :key="opt.tzn_indx">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="假日当天">
              <el-select v-model="htz['data'+(n+8)]" v-for="n in 8" :key="n" style="margin-top:5px">
                <el-option v-for="opt in zone_list" :label="opt.tzn_name" :value="opt.tzn_indx" :key="opt.tzn_indx">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="后一天">
              <el-select v-model="htz['data'+(n+16)]" v-for="n in 8" :key="n" style="margin-top:5px">
                <el-option v-for="opt in zone_list" :label="opt.tzn_name" :value="opt.tzn_indx" :key="opt.tzn_indx">
                </el-option>
              </el-select>
            </el-form-item>

          </el-col>
        </el-row>
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
  data() {
    return {
      dialogVisible: false,
      data: {},
      //   mod_list: [],
      sta_list: [],
      prmtrmoutp_list: [],
      zone_list: [],
      weeks: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      week: {},
      //   act: {},
      //   mod: {},
      //   chn: {},
      htz: {}
    };
  },
  computed: {
    grpIndx() {
      return this.$parent.$data.grpIndx;
    },
    type() {
      return this.$parent.$data.type;
    },
    ctr_indx() {
      return this.$parent.$data.ctr_indx;
    }
  },
  methods: {
    reset() {
      this.data = {};
      this.week = {};
      //   this.act = {};
      //   this.mod = {};
      //   this.chn = {};
      this.htz = {};
    },
    open() {
      this.dialogVisible = true;
      this.reset();
      this.getData();
    },
    // setSatCode() {
    //   let satCode = "";

    //   for (let i = 1; i <= 4; i++) {
    //     this.act["data" + i]
    //       ? (satCode += this.act["data" + i])
    //       : (satCode += "0");

    //     this.mod["data" + i]
    //       ? (satCode += this.mod["data" + i])
    //       : (satCode += "0");

    //     this.chn["data" + i]
    //       ? (satCode += this.chn["data" + i])
    //       : (satCode += "00");
    //   }

    //   return satCode;
    // },
    setWtzCode() {
      let wtzCode = "";

      for (let i = 1; i <= 7; i++) {
        if (this.week["data" + i]) {
          if (Number(this.week["data" + i]) < 10) {
            wtzCode += "0" + this.week["data" + i];
          } else {
            wtzCode += this.week["data" + i];
          }
        } else {
          wtzCode += "00";
        }
      }

      return wtzCode;
    },
    setHtzCode() {
      let htzCode = "";
      // this.htz
      for (let i = 1; i <= 24; i++) {
        if (this.htz["data" + i]) {
          if (Number(this.htz["data" + i]) < 10) {
            htzCode += "0" + this.htz["data" + i];
          } else {
            htzCode += this.htz["data" + i];
          }
        } else {
          htzCode += "00";
        }
      }

      return htzCode;
    },
    getCode() {
      this.getWeek();
      //   this.getSta();
      this.getHtz();
    },
    getWeek() {
      let wtz = this.data.wtz_code.split("");
      for (let i = 0; i < 7; i++) {
        let w1 = wtz[i * 2],
          w2 = wtz[i * 2 + 1];

        if (w1 == "0" && w2 != "0") {
          this.week["data" + (i + 1)] = w2;
        } else if (w1 != "0") {
          this.week["data" + (i + 1)] = w1 + w2;
        }
      }
      console.info("week", this.week);
    },
    // getSta() {
    //   let sta = this.data.sta_code.split("");
    //   // 0001 1103 0202 2000
    //   for (let i = 0; i < 4; i++) {
    //     this.act["data" + (i + 1)] = sta[i * 4];
    //     this.mod["data" + (i + 1)] = sta[i * 4 + 1];
    //     let tempChn = sta[i * 4 + 2] + sta[i * 4 + 3];
    //     if (tempChn !== "00") {
    //       this.chn["data" + (i + 1)] = tempChn;
    //     }
    //   }
    // },
    getHtz() {
      let htz = this.data.htz_code.split("");
      for (let i = 0; i < 24; i++) {
        let w1 = htz[i * 2],
          w2 = htz[i * 2 + 1];

        if (w1 == "0" && w2 != "0") {
          this.htz["data" + (i + 1)] = w2;
        } else if (w1 != "0") {
          this.htz["data" + (i + 1)] = w1 + w2;
        }
      }
    },
    getData() {
      if (this.type === "添加端口输出") {
        console.info("type", this.type);
        axios
          .get("/devtermina/prmtrmoutp_add_data", {
            params: {
              grp_indx: this.grpIndx
            }
          })
          .then(data => {
            console.info("添加", data.data);
            this.data = data.data.data;
            // this.mod_list = data.data.mod_list;
            this.sta_list = data.data.sta_list;
            this.prmtrmoutp_list = data.data.prmtrmoutp_list;
            this.zone_list = data.data.zone_list;
          })
          .catch(err => {
            console.error(err);
          });
      } else if (this.type === "编辑端口输出") {
        axios
          .get("/devtermina/prmtrmoutp_edit_data", {
            params: {
              grp_indx: this.grpIndx,
              ctr_indx: this.ctr_indx
            }
          })
          .then(data => {
            console.info("编辑", data.data);

            this.data = data.data.data[0];
            // this.mod_list = data.data.mod_list;
            this.sta_list = data.data.sta_list;
            this.prmtrmoutp_list = data.data.prmtrmoutp_list;
            this.zone_list = data.data.zone_list;
            this.getCode();
          })
          .catch(data => {
            // alert(data.data.msg);
          });
        // }
      }
    },
    save() {
      const param = this.data;
      param.grp_indx = this.grpIndx;
      param.wtz_code = this.setWtzCode();
      param.htz_code = this.setHtzCode();
      delete param.ctr_indx_name;
      delete param.ctr_name;
      delete param.sta_name;
      delete param.ROW_NUMBER;
      console.info(param);
      console.info("type", this.type);

      if (this.type === "添加端口输出") {
        axios.post("/devtermina/prmtrmoutp_add", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "添加端口输出成功!"
            });
            this.dialogVisible = false;
            this.$emit("outputSucc", true);
          }
        });
      } else if (this.type === "编辑端口输出") {
        axios.post("/devtermina/prmtrmoutp_edit_save", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "编辑端口输出成功!"
            });
            this.dialogVisible = false;
            this.$emit("outputSucc", true);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
</style>

