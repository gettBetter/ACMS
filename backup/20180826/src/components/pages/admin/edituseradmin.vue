<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>编辑管理员</span>
            </div>
            <el-form :model="data">
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="用户ID:">
                            <el-input v-model="data.emp_indx" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="用户编号:">
                            <el-input v-model="data.emp_code" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="用户姓名:">
                            <el-input v-model="data.emp_name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="是否停用:">
                            <el-select v-model="data.stp_isok">
                                <el-option v-for="opt in yseOrNot" :label="opt.label" :value="opt.value" :key="opt.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="角色名称:">
                            <el-select v-model="data.role_id">
                                <el-option v-for="opt in role_list" :label="opt.role_name" :value="opt.r_id" :key="opt.r_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="角色说明:">
                            <el-input v-model="data.usr_role"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="密码:">
                            <el-input v-model="data.usr_pswd" type="password"></el-input>
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
  props: ["emp"],
  data() {
    return {
      formLabelWidth: "20%",
      data: {},
      yseOrNot: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      role_list: []
    };
  },
  methods: {
    getData() {
      const param = {
        emp_indx: this.emp
      };
      console.info("param", param);
      axios
        .get("/useradmin/useradmin_edit_data", { params: param })
        .then(data => {
          if (data.data.success) {
            console.info(data.data);
            this.data = data.data.data[0];
            this.role_list = data.data.role_list;
          }
        })
        .catch(err => alert(err));
    },
    save() {
      const param = this.data;
      delete param.ROW_NUMBER;

      axios.post("/useradmin/useradmin_edit_save", param).then(data => {
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
  activated() {
    this.getData();
  }
};
</script>
