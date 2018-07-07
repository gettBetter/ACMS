<template>
    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>编辑门禁通道</span>
            </div>

            <el-form :model="editData">
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="通道序号：">
                            <span>{{editData.chn_indx}}</span>
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
                        <el-form-item :label-width="formLabelWidth" label="通道名称：">
                            <el-input v-model="editData.chn_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="控制方式：">
                            <el-select v-model="editData.ctl_indx">
                                <el-option v-for="opt in editData.ctl_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="打开延时：">
                            <el-input v-model="editData.dly_time"></el-input>
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
        chn_indx: this.$route.params.id
      };

      axios.get("/devchannel/devchannel_edit_data", { params: param }).then(
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
      delete param.ctl_name;

      console.info(param);
      axios.post("/devchannel/devchannel_edit_save", param).then(data => {
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


