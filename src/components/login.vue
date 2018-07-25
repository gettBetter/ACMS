<template>
  <div class="login">
    <!-- <el-row> -->
    <!-- <el-col :span="6" :offset="9"> -->
    <el-card ref="loginBox" id="login-box" style="padding-right:20px;padding-top:20px;padding-bottom:20px;height:300px">
      <div slot="header" class="clearfix" style="text-align:center">
        <span>登录</span>
      </div>
      <el-form label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="请输入用户名" autofocus="true"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" placeholder="请输入密码" type="password" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-alert v-if="loginError" :title="loginErrorMsg" type="error">
        </el-alert>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
    <!-- </el-col>
    </el-row> -->
  </div>
</template>

<script>
import axios from "axios";

sessionStorage.clear();
export default {
  data() {
    return {
      username: "",
      password: "",
      loginErrorMsg: "用户名或密码错误，请重新输入",
      loginError: false
    };
  },
  methods: {
    onSubmit() {
      const that = this;
      if (this.username && this.password) {
        axios
          .post("/login/Login_chk", {
            username: this.username,
            password: this.password
          })
          .then(data => {
            if (!data.data.success) {
              alert("用户登录认证失败，请重新登录");
              this.loginError = true;
              return;
            }
            sessionStorage.setItem(
              "userToken",
              JSON.stringify({
                username: data.data.username,
                token: data.data.token
              })
            );
            this.loginError = false;
            axios.get("/index/left").then(data => {
              // data.data.menu[0].chilren.push({
              //   component: "/devicmanage/devchannel",
              //   name: "门禁通道",
              //   path: "/devicmanage/devchannel"
              // });
              // data.data.menu[0].chilren.push({
              //   component: "/devicmanage/devtermina",
              //   name: "门禁终端参数设置",
              //   path: "/devicmanage/devtermina"
              // });
              that.$parent.$store.commit("setMenus", data.data.menu);
              sessionStorage.setItem(
                "userMenus",
                JSON.stringify(data.data.menu)
              );
              setTimeout(() => {
                const query = that.$router.query;
                if (query) {
                  that.$router.push({ path: query });
                } else {
                  that.$router.push({ path: "/" });
                }
              }, 1000);
            });
          })
          .catch(err => console.info(err));
      } else {
        alert("error");
      }
    }
  },
  computed: {
    menus() {
      return [];
    },
    loginApi() {
      return getApi("login");
    },
    param() {
      return JSON.stringify({
        username: this.username,
        password: this.password
      });
    }
  },
  mounted() {
    console.info(this.$refs);
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  background-color: #f9f9f9;
  position: relative;
}

#login-box {
  width: 400px;
  height: 400px;
  margin: auto;
  position: absolute; /*设定水平和垂直偏移父元素的50%，再根据实际长度将子元素上左挪回一半大小*/
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -240px;
}

.el-button {
  width: 100%;
  margin-top: 8px;
}
.el-alert--error {
  margin-left: 80px;
  width: 320px;
  height: 30px;
  line-height: 30px;
  margin-top: -20px;
}
</style>



