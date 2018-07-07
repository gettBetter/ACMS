<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>编辑门禁终端参数</span>
            </div>

            <el-form :model="editData">
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="终端序号：">
                            <span>{{editData.rm_indx}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="设备序号：">
                            <span>{{editData.dev_indx}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="终端名称：">
                            <el-input v-model="editData.trm_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="启用密码开门：">
                            <el-select v-model="editData.pkb_isok">
                                <el-option v-for="opt in editData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="密码组一：">
                            <el-input v-model="editData.pkb_key1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="密码组二：">
                            <el-input v-model="editData.pkb_key2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="密码组三：">
                            <el-input v-model="editData.pkb_key3"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="密码组四：">
                            <el-input v-model="editData.pkb_key4"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="考勤扩展：">
                            <el-select v-model="editData.att_isok">
                                <el-option v-for="opt in editData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="次计就餐：">
                            <el-select v-model="editData.con_isok">
                                <el-option v-for="opt in editData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="在线巡逻：">
                            <el-select v-model="editData.oep_isok">
                                <el-option v-for="opt in editData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="会议签到：">
                            <el-select v-model="editData.met_isok">
                                <el-option v-for="opt in editData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="关联通道：">
                            <el-select v-model="editData.chn_indx">
                                <el-option v-for="opt in editData.pkb_isok_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
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
      editData: {}
    };
  },
  methods: {
    getEditData() {
      const param = {
        trmindx: this.$route.params.id
      };

      axios.get("/devtermina/devtermina_edit_data", { params: param }).then(
        data => {
          if (data.data.success === true) {
            console.info(data.data);
            this.editData = data.data.data[0];
            // this.areaTree = data.data.devicearea_tree;
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
      //   delete param.ctl_name;

      console.info(param);
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
</style>


