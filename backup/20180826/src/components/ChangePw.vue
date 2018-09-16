<template>
    <div>
        <el-dialog width="40%" style="min-height:400px" title="修改密码" :visible.sync="dialogVisible" append-to-body center>
            <el-form :model="data" label-width="100px" style="max-height:450px;overflow-y:scroll" :rules="rules" ref="ruleForm">

                <el-form-item label="旧密码:" prop="oldpasswd">
                    <el-input v-model="data.oldpasswd" type="password"></el-input>
                </el-form-item>

                <el-form-item label="新密码:" prop="pass">
                    <el-input v-model="data.newpasswd" type="password"></el-input>
                </el-form-item>

                <el-form-item label="重复新密码:" prop="check">
                    <el-input v-model="data.newpasswd1" type="password"></el-input>
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
  data() {
    let checkPass1 = (rule, value, callback) => {
      console.info("pass", this.data.newpasswd);
      if (this.data.newpasswd == "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.data.newpasswd != "") {
          this.$refs.ruleForm.validateField("check");
        }
        callback();
      }
    };
    let checkPass2 = (rule, value, callback) => {
      console.info("check", this.data.newpasswd1);
       ;
      if (this.data.newpasswd1 == "") {
        callback(new Error("请再次输入密码"));
      } else if (this.data.newpasswd1 != this.data.newpasswd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      data: {},
      rules: {
        oldpasswd: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        check: [{ validator: checkPass2, trigger: "blur" }],
        pass: [{ validator: checkPass1, trigger: "blur" }]
      }
    };
  },
  methods: {
    reset() {
      this.$refs.ruleForm.resetFields();
      this.data = {};
    },
    open() {
      this.dialogVisible = true;
      this.reset();
    },
    save() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const param = this.data;
          delete param.newpasswd1;
          console.info(param);
          axios.post("/index/change_passwd", param).then(
            data => {
              if (data.data.success) {
                this.$message({
                  type: "success",
                  message: "修改密码成功!"
                });
                this.dialogVisible = false;
              }
            },
            data => {
              this.$message.error("修改密码失败!");
              //   this.dialogVisible = false;
            }
          );
        }
      });
    }
  }
};
</script>
