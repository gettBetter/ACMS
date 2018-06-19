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
    // confMenus(data) {
    //   return data.map(item => {
    //     let menu = Object.assign({}, item);
    //     return {
    //       name: menu.name,
    //       path: menu.path,
    //       // component: () => import(item.component),
    //       component: lazyLoading(menu.path, true),
    //       children: menu.chilren.map(val => {
    //         return {
    //           name: val.name,
    //           path: val.path,
    //           // component: () => import(val.component)
    //           // component: resolve => require([val.component], resolve)
    //           component: lazyLoading(val.path)
    //         };
    //       })
    //     };
    //   });
    // },
    onSubmit() {
      const that = this;
      if (this.username && this.password) {
        this.$post("/login/Login_chk", {
          username: this.username,
          password: this.password
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
                // const menu = this.confMenus(data.menu);

                that.$parent.$store.commit("setMenus", data.menu);
                // console.info(this.$parent.$store.getters.getMenus);

                sessionStorage.setItem("userMenus", JSON.stringify(data.menu));

                setTimeout(() => {
                  that.$router.push({ path: "/" });
                }, 1000);
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
    // ...mapActions(["addMenu", "loadRoutes"])
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
    // ...mapGetters([
    //   "menuitems",
    //   "isLoadRoutes"
    //   // ...
    // ])
  },
  mounted() {
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



