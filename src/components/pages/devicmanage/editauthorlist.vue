<template>
    <div class="editdevtermina">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>编辑门禁权限</span>
            </div>
            <el-form :model="editData">
                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="人员编号:" prop="trm_indx">
                            <span>{{emp_indx}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="设备编号:">
                            <span>{{dev_indx}}</span>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="通道编号:">
                            <el-select v-model="editData.chn_indx">
                                <el-option v-for="item in [1,2,3,4]" :label="item" :value="item" :key="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="设备组别:">
                            <el-select v-model="editData.mcd_indx">
                                <el-option v-for="opt in mcd_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="应用群组:">
                            <el-select v-model="editData.tmr_indx">
                                <el-option v-for="opt in timerparam_list" :label="opt.tmr_name" :value="opt.tmr_indx" :key="opt.tmr_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="检查APB
:">
                            <!-- <el-select v-model="editData.fcd_indx">
                                <el-option v-for="opt in mcd_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select> -->
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10" :offset="1">

                        <el-form-item :label-width="formLabelWidth" label="起始日期：">
                            <el-date-picker value-format="yyyy-MM-dd" v-model="editData.bgn_date" type="date">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="截止日期
:">
                            <el-date-picker value-format="yyyy-MM-dd" v-model="editData.end_date" type="date">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10" :offset="1">

                        <el-form-item :label-width="formLabelWidth" label="门禁密码:">
                            <el-input v-model="editData.acc_pswd"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

            </el-form>

            <el-row style="text-align:center;margin-top:40px;margin-bottom:20px">
                <el-button class="submit-btn" type="primary" @click="save">确定</el-button>
                <el-button class="cancel-btn" @click="cancel">取消</el-button>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formLabelWidth: "25%",
      editData: {},
      mcd_list: [],
      timerparam_list: [],
      dev_indx: this.$route.params.dev,
      emp_indx: this.$route.params.emp
      //   revertFields: ["pkb_isok", "att_isok", "con_isok", "oep_isok", "met_isok"]
    };
  },
  methods: {
    getEditData() {
      const param = {
        emp_indx: this.emp_indx,
        dev_indx: this.dev_indx
      };
      //   this.editData = []
      axios.get("/authorlist/authorlist_edit_data", { params: param }).then(
        data => {
          if (data.data.success === true) {
            console.info(data.data);
            // this.editData = data.data.data[0];
            let temp = data.data;
            this.mcd_list = temp.mcd_list;
            this.timerparam_list = temp.timerparam_list;
            console.info(this.timerparam_list);

            // this.revertFields.forEach(item => {
            //   if (temp[item] == "1") {
            //     temp[item] = true;
            //   } else {
            //     temp[item] = false;
            //   }
            // });
            // this.trm_list = temp
            this.editData = temp.data[0];
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    save() {
      const param = this.editData;
      delete param.ROW_NUMBER;
      console.info(param);
      this.revertFields.forEach(item => {
        if (param[item] === true) {
          param[item] = "1";
        } else {
          param[item] = "0";
        }
      });
      axios.post("/devtermina/devtermina_edit_save", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          this.$router.go(-1);
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  computed: {},
  activated() {
    this.editData = {};
    // this.areaTree = [];
    this.getEditData();
  }
};
</script>

<style >
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}

.submit-btn,
.cancel-btn {
  width: 160px;
}
.el-select,
.el-date-editor.el-input,
.el-date-editor.el-input__inne {
  width: 100%;
}

.editdevtermina .container {
  /* background-color: #ebebeb; */
  /* padding: 20px; */
  /* box-sizing: content-box; */
  border: 1px solid #ebebeb;
}
</style>


