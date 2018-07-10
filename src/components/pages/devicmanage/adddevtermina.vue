<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加门禁终端参数</span>
            </div>

            <el-form :model="addData">
                <el-row>
                    <!-- trm_list -->
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="终端编号：" prop="trm_indx">
                            <!-- <span>{{chn_indx}}</span> -->
                            <el-select v-model="addData.chn_indx" :disabled="!hasDev">
                                <el-option v-for="item in trm_list" :label="item" :value="item" :key="item">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="关联通道：">
                            <el-input v-model="addData.chn_indx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="终端名称：">
                            <el-input v-model="addData.trm_name" :disabled="!hasDev"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="启用密码开门：">
                            <el-select v-model="addData.pkb_isok" :disabled="!hasDev">
                                <el-option v-for="opt in addData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="密码组一：">
                            <el-input v-model="addData.pkb_key1" :disabled="!hasDev"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="密码组二：">
                            <el-input v-model="addData.pkb_key2" :disabled="!hasDev"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="密码组三：">
                            <el-input v-model="addData.pkb_key3" :disabled="!hasDev"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="密码组四：">
                            <el-input v-model="addData.pkb_key4" :disabled="!hasDev"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="考勤扩展：">
                            <el-select v-model="addData.att_isok" :disabled="!hasDev">
                                <el-option v-for="opt in addData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="次计就餐：">
                            <el-select v-model="addData.con_isok" :disabled="!hasDev">
                                <el-option v-for="opt in addData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="在线巡逻：">
                            <el-select v-model="addData.oep_isok" :disabled="!hasDev">
                                <el-option v-for="opt in addData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="会议签到：">
                            <el-select v-model="addData.met_isok" :disabled="!hasDev">
                                <el-option v-for="opt in addData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
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
      formLabelWidth: "20%",
      addData: {},
      trm_list: [],
      dev_indx: this.$route.params.id
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
      //   delete param.ctl_name;

      console.info(param);
      axios.post("/devchannel/devchannel_add", param).then(data => {
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
  computed: {
    hasDev() {
      return !!this.dev_indx;
    }
  },
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
</style>


