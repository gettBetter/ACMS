<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加门禁通道</span>
      </div>

      <el-form :model="addData" :rules="rules" ref="addDevchannel">
        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="通道编号：" prop="chn_indx">
              <!-- <span>{{chn_indx}}</span> -->
              <el-select v-model="addData.chn_indx" :disabled="!hasDev">
                <el-option v-for="item in chn_list" :label="item" :value="item" :key="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="打开延时：">
              <el-input v-model="addData.dly_time" :disabled="!hasDev"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="通道名称：">
              <el-input v-model="addData.chn_name" :disabled="!hasDev"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="控制方式：">
              <el-select v-model="addData.ctl_indx" :disabled="!hasDev">
                <el-option v-for="opt in ctl_list" :label="opt.ctl_name" :value="opt.ctl_indx" :key="opt.ctl_indx">
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
      ctl_list: [],
      chn_list: [],
      dev_indx: this.$route.params.id
      // rules: {
      //   dev_indx: [
      //     { required: true, message: "请输入设备序号", trigger: "blur" }
      //   ]
      // }
    };
  },
  methods: {
    getAddData() {
      axios
        .get("/devchannel/devchannel_add_data", {
          params: { dev_indx: this.dev_indx }
        })
        .then(
          data => {
            if (data.data.success === true) {
              console.info(data.data);
              this.ctl_list = data.data.ctl_list;
              this.chn_list = data.data.chn_indx;
              console.info(this.ctl_list, this.chn_list);
            } else {
              alert(data.data.msg);
            }
          },
          data => alert("System Error")
        );
    },
    save() {
      // this.$refs.addDevchannel.validate(valid => {
      //   if (valid) {
      const param = this.addData;
      delete param.ROW_NUMBER;
      delete param.ctl_name;
      param.dev_indx = this.dev_indx;
      console.info(param);
      axios.post("/devchannel/devchannel_add", param).then(data => {
        if (data.data.success) {
          this.$refs.addDevchannel.resetFields();
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          this.$router.go(-1);
        }
      });
      // }
      // });
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
    this.getAddData();
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


