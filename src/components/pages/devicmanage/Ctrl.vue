<template>
    <div>
        <el-dialog width="80%" :title="ctrlType" :visible.sync="dialogVisible" append-to-body center>
            <el-form :model="data" label-width="80px" style="max-height:500px;overflow-y:scroll">
                <el-row>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="设备组别:">
                            <span>{{grpIndx}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="群控编号:">
                            <el-select v-model="data.ctr_indx">
                                <el-option v-for="opt in ctrinfo_list" :label="opt.ctr_name" :value="opt.ctr_indx" :key="opt.ctr_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="5" :offset="1">
                        <span>假日前一天时控与位控</span>
                        <el-row style="margin-top:5px;" v-for="n in 8" :key="n">
                            <el-col :span="18">
                                <el-select v-model="phd_hdtz['data'+n]">
                                    <el-option v-for="opt in zninf_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" :offset="1" style="margin-top: 10px">
                                <el-checkbox v-model="phd_ctrl['data'+n]">{{n}}</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col :span="5" :offset="1">
                        <span>假日当天时控与位控</span>
                        <el-row style="margin-top:5px;" v-for="n in 8" :key="n">
                            <el-col :span="18">
                                <el-select v-model="thd_hdtz['data'+n]">
                                    <el-option v-for="opt in zninf_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" :offset="1" style="margin-top: 10px">
                                <el-checkbox v-model="thd_ctrl['data'+n]">{{n}}</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col :span="5" :offset="1">
                        <span>假日后一天时控与位控</span>
                        <el-row style="margin-top:5px;" v-for="n in 8" :key="n">
                            <el-col :span="18">
                                <el-select v-model="nhd_hdtz['data'+n]">
                                    <el-option v-for="opt in zninf_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" :offset="1" style="margin-top: 10px">
                                <el-checkbox v-model="nhd_ctrl['data'+n]">{{n}}</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col :span="5" :offset="1">
                        <span>周计划时控与位控</span>
                        <el-row style="margin-top:5px;" v-for="n in 7" :key="n">
                            <el-col :span="18">
                                <el-select v-model="wek_wktz['data'+n]">
                                    <el-option v-for="opt in zninf_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" :offset="1" style="margin-top: 10px">
                                <el-checkbox v-model="wek_ctrl['data'+n]">{{n}}</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row style="margin-top:20px">
                    <el-col :span="5" :offset="1">
                        <span>终端位控</span>
                        <el-row style="margin-top:5px;" v-for="n in 8" :key="n">
                            <el-col :span="5" :offset="1" style="margin-top: 10px">
                                <el-checkbox v-model="trm_ctrl['data'+n]">{{n}}</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <span>通道位控</span>
                        <el-row style="margin-top:5px;" v-for="n in 4" :key="n">
                            <el-col :span="5" :offset="1" style="margin-top: 10px">
                                <el-checkbox v-model="chn_ctrl['data'+n]">{{n}}</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col :span="5" :offset="1">
                        <span>个人密码时控</span>
                        <el-row style="margin-top:5px;" v-for="n in 8" :key="n">
                            <el-col :span="18">
                                <el-select v-model="chn_pptz['data'+n]">
                                    <el-option v-for="opt in zninf_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col :span="5" :offset="1">
                        <span>安全密码通道时控</span>
                        <el-row style="margin-top:5px;" v-for="n in 8" :key="n">
                            <el-col :span="18">
                                <el-select v-model="chn_sptz['data'+n]">
                                    <el-option v-for="opt in zninf_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
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
      ctrinfo_list: [],
      zninf_list: [],
      phd_hdtz: {},
      phd_ctrl: {},
      thd_hdtz: {},
      thd_ctrl: {},
      nhd_hdtz: {},
      nhd_ctrl: {},
      wek_wktz: {},
      wek_ctrl: {},
      trm_ctrl: {},
      chn_ctrl: {},
      chn_sptz: {},
      chn_pptz: {}
    };
  },
  computed: {
    grpIndx() {
      return this.$parent.$data.grpIndx;
    },
    ctrlType() {
      return this.$parent.$data.ctrlType;
    },
    ctrIndx() {
      return this.$parent.$data.ctrIndx;
    }
  },
  methods: {
    open() {
      this.dialogVisible = true;
      this.reset();
      this.getData();
    },
    reset() {
      this.phd_hdtz = {};
      this.phd_ctrl = {};
      this.thd_hdtz = {};
      this.thd_ctrl = {};
      this.nhd_hdtz = {};
      this.nhd_ctrl = {};
      this.wek_wktz = {};
      this.wek_ctrl = {};
      this.trm_ctrl = {};
      this.chn_ctrl = {};
      this.chn_sptz = {};
      this.chn_pptz = {};
    },
    getData() {
      // if (this.type === "添加时段时钟") {
      console.info("ctrlType", this.ctrlType, this.grpIndx);
      axios
        .get("/timerparam/prmtmrctrl_add_data")
        .then(data => {
          console.info("添加", data.data);
          this.ctrinfo_list = data.data.data.ctrinfo_list;
          this.zninf_list = data.data.data.zninf_list;
        })
        .catch(data => {
          alert(data.data.msg);
        });
      if (this.ctrlType === "编辑应用群控") {
        axios
          .get("/timerparam/prmtmrctrl_edit_data", {
            params: {
              grp_indx: this.grpIndx,
              ctr_indx: this.ctrIndx
            }
          })
          .then(data => {
            console.info("编辑", data.data);
            const temp = data.data.data;
            this.phd_hdtz = this.revertSelectDataGet(temp.phd_hdtz, 8);
            this.thd_hdtz = this.revertSelectDataGet(temp.thd_hdtz, 8);
            this.nhd_hdtz = this.revertSelectDataGet(temp.nhd_hdtz, 8);
            this.wek_wktz = this.revertSelectDataGet(temp.wek_wktz, 7);

            this.chn_sptz = this.revertSelectDataGet(temp.chn_sptz, 4);
            this.chn_pptz = this.revertSelectDataGet(temp.chn_pptz, 4);

            this.phd_ctrl = this.revertCheckDataGet(temp.phd_ctrl, 8);
            this.thd_ctrl = this.revertCheckDataGet(temp.thd_ctrl, 8);
            this.nhd_ctrl = this.revertCheckDataGet(temp.nhd_ctrl, 8);
            this.wek_ctrl = this.revertCheckDataGet(
              this.revertWeekGet(temp.wek_ctrl),
              7
            );
            this.trm_ctrl = this.revertCheckDataGet(temp.trm_ctrl, 8);
            this.chn_ctrl = this.revertCheckDataGet(temp.chn_ctrl, 4);

            // this.tmr_list = data.data.data;
            // this.data = data.data.data;
          })
          .catch(data => {
            alert(data.data.msg);
          });
        // }
      }
    },
    revertSelectDataPost(selectData = {}, count = 8) {
      let ret = "";
      for (let i = 1; i <= count; i++) {
        if (selectData["data" + i]) {
          ret += selectData["data" + i];
        } else {
          ret += "00";
        }
      }
      return ret;
    },
    revertCheckDataPost(checkData, count) {
      let ret = "";
      for (let i = 1; i <= count; i++) {
        if (checkData["data" + i]) {
          ret += "1";
        } else {
          ret += "0";
        }
      }
      return ret
        .split("")
        .reverse()
        .join("");
    },
    revertSelectDataGet(selectData, count) {
      let ret = {};
      let arr = selectData.split("");

      for (let i = 0; i < count; i + 1) {
        ret["data" + (i + 1)] = false;
        if (arr[i * 2] != "0" && arr[i * 2 + 1] != "0") {
          ret["data" + i] = true;
        }
      }
      return ret;
    },
    revertCheckDataGet(checkData, count) {
      let ret = {};
      //   wek_ctrl
      let arr = checkData.split("").reverse();
      for (let i = 0; i < count; i++) {
        ret["data" + (i + 1)] = false;
        if (arr[i] == "1") {
          ret["data" + (i + 1)] = true;
        }
      }
      return ret;
    },
    revertWeekGet(checkData) {
      let arr = checkData.split("").reverse();
      return arr.unshift(arr.pop()).join("");
    },
    revertWeekPost(checkData) {
      let arr = checkData.split("");
      let [a, ...rest] = arr;
      arr = [...rest, a];
      return arr.join("");
    },
    save() {
      const param = this.data;
      param.grp_indx = this.grpIndx;
      delete param.ctr_name;
      delete param.ROW_NUMBER;

      param.phd_hdtz = this.revertSelectDataPost(this.phd_hdtz, 8);
      param.thd_hdtz = this.revertSelectDataPost(this.thd_hdtz, 8);
      param.nhd_hdtz = this.revertSelectDataPost(this.nhd_hdtz, 8);
      param.wek_wktz = this.revertSelectDataPost(this.wek_wktz, 7);
      param.chn_sptz = this.revertSelectDataPost(this.chn_sptz, 4);
      param.chn_pptz = this.revertSelectDataPost(this.chn_pptz, 4);
      param.phd_ctrl = this.revertCheckDataPost(this.phd_ctrl, 8);
      param.thd_ctrl = this.revertCheckDataPost(this.thd_ctrl, 8);
      param.nhd_ctrl = this.revertCheckDataPost(this.nhd_ctrl, 8);
      param.wek_ctrl = this.revertWeekPost(
        this.revertCheckDataPost(this.wek_ctrl, 7)
      );
      param.trm_ctrl = this.revertCheckDataPost(this.trm_ctrl, 8);
      param.chn_ctrl = this.revertCheckDataPost(this.chn_ctrl, 4);
      console.info(param);
      if (this.ctrlType === "添加应用群控") {
        axios.post("/timerparam/prmtmrctrl_add", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "添加应用群控成功!"
            });
            this.dialogVisible = false;
            this.$emit("addCtrlSucc", true);
          }
        });
      } else if (this.ctrlType === "编辑应用群控") {
        axios.post("/timerparam/prmtmrctrl_edit_save", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "编辑应用群控成功!"
            });
            this.dialogVisible = false;
            this.$emit("addCtrlSucc", true);
          }
        });
      }
    }
  }
};
</script>

<style>
/* .checkbox_style {
  margin-top: 10px !important;
} */
</style>

