<template>
    <div class="adddevtermina">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加门禁终端参数</span>
            </div>

            <el-form :model="addData">
                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="设备编号：">
                            <span>{{dev_indx}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="终端编号：" prop="trm_indx">
                            <el-select v-model="addData.trm_indx">
                                <el-option v-for="item in trm_list" :label="item" :value="item" :key="item">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="终端名称：">
                            <el-input v-model="addData.trm_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="关联通道：">
                            <!-- <el-input v-model="addData.chn_indx"></el-input> -->
                            <el-select v-model="addData.chn_indx">
                                <el-option v-for="item in [1,2,3,4]" :label="item" :value="item" :key="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>

                <div class="container">
                    <el-row>
                        <el-col :span="10" :offset="1">
                            <el-form-item :label-width="formLabelWidth" label="启用密码开门：">
                                <el-checkbox v-model="addData.pkb_isok"></el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10" :offset="1">
                            <el-form-item :label-width="formLabelWidth" label="密码组一：">
                                <el-input v-model="addData.pkb_key1" :disabled="!addData.pkb_isok"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item :label-width="formLabelWidth" label="密码组二：">
                                <el-input v-model="addData.pkb_key2" :disabled="!addData.pkb_isok"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item :label-width="formLabelWidth" label="密码组三：">
                                <el-input v-model="addData.pkb_key3" :disabled="!addData.pkb_isok"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item :label-width="formLabelWidth" label="密码组四：">
                                <el-input v-model="addData.pkb_key4" :disabled="!addData.pkb_isok"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <el-row style="margin-top:20px">
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="考勤扩展：">
                            <el-checkbox v-model="addData.att_isok"></el-checkbox>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="次计就餐：">
                            <el-checkbox v-model="addData.con_isok"></el-checkbox>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="在线巡逻：">
                            <el-checkbox v-model="addData.oep_isok"></el-checkbox>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="会议签到：">
                            <el-checkbox v-model="addData.met_isok"></el-checkbox>
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
      addData: {},
      trm_list: [],
      dev_indx: this.$route.params.id,
      revertFields: ["pkb_isok", "att_isok", "con_isok", "oep_isok", "met_isok"]
    };
  },
  methods: {
    getEditData() {
      const param = {
        dev_indx: this.dev_indx
      };

      axios.get("/devtermina/devtermina_add_data", { params: param }).then(
        data => {
          if (data.data.success === true) {
            console.info(data.data);
            this.trm_list = data.data.data;
            // this.areaTree = data.data.devicearea_tree;
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    save() {
      const param = this.addData;
      delete param.ROW_NUMBER;
      this.revertFields.forEach(item => {
        if (param[item]) {
          param[item] = "1";
        } else {
          param[item] = "0";
        }
      });
      param.dev_indx = this.dev_indx;
      console.info(param);
      axios.post("/devtermina/devtermina_add", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "添加成功!"
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
    this.addData = {};
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

.adddevtermina .container {
  /* background-color: #ebebeb; */
  /* padding: 20px; */
  /* box-sizing: content-box; */
  border: 1px solid #ebebeb;
}
</style>


