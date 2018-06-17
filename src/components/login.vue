<template>
    <div class="login">
        <el-container>
          <el-main width="200px">
              <!-- <el-row>
                  <el-col :span="6" :offset="9"> -->
                    <el-form  label-width="80px" :span="6" offset="9" >
                        <el-form-item label="用户名">
                            <el-input 
                            v-model="username"
                            placeholder="请输入用户名" 
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="password"
                            placeholder="请输入密码"
                            type="password"></el-input>
                        </el-form-item>
                        <!-- <span v-hide="loginError" class="error-class">{{loginErrorMsg}}</span> -->
                        <!-- v-hide="loginError" -->
                        <el-alert
                            v-if="loginError"
                            :title="loginErrorMsg"
                            type="error">
                        </el-alert>
                        <el-form-item>
                        <el-button type="primary" @click="onSubmit">登录</el-button>
                        <!-- <el-button>取消</el-button> -->
                        </el-form-item>
                    </el-form>    
                <!-- </el-col> -->
          </el-main>
            <!-- </el-row> -->
        </el-container>
    </div>
</template>

<script>
// import MenuUtils from "@/utils/MenuUtils";
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
    confMenus(data) {
      return data.map(item => {
        return {
          name: item.name,
          path: item.path,
          children: item.chilren.map(val => {
            return {
              name: val.name,
              path: val.path
            };
          })
        };
      });
    },
    onSubmit() {
      if (this.username && this.password) {
        this.$post("/login/Login_chk", {
          username: this.username,
          password: this.password
          // username: "admin",
          // password: "admin"
        })
          .then(
            data => {
              // if (!data.success) {
              //   // alert("用户登录认证失败，请重新登录");
              // }
              sessionStorage.setItem(
                "userToken",
                JSON.stringify({
                  username: data.username,
                  token: data.token
                })
              );

              this.loginError = false;
              this.$get("/index/left").then(data => {
                const menu = this.confMenus(data.menu);

                console.info(menu);
                this.$router.addRoutes(menu);
                this.$parent.$store.commit("setMenus", menu);
                sessionStorage.setItem("userMenus", JSON.stringify(menu));

                // debugger;
                // console.info("$router2", this.$router.options.routes);
                this.$router.push({ path: "/main" });
                // this.$router.push({ path: "/first" });
              });
            },
            data => {
              this.loginError = true;
              // console.info("133", data);
              alert(data.msg);
            }
          )
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
    sessionStorage.clear();
    // console.info(this.$parent.$http);
  }
};
</script>

<style scoped>
.el-form {
  width: 400px;
  margin: 0 auto;
  margin-top: 80px;
}
.el-button {
  width: 320px;
  margin-top: 8px;
}
.el-alert--error {
  margin-left: 80px;
  width: 320px;
  height: 30px;
  line-height: 30px;
  margin-top: -20px;
}
/* .error-class {
} */
</style>



