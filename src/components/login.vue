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
// import qs from "qs";
// import { confMenus, confRoutes } from "@/utils/tool";
// import tool from "@/utils/tool";

// import { confMenus, confRoutes } from "@/utils/tool";
// import { post, get } from "@/utils/tool";
// console.info(confMenus, confRoutes);
// console.info(tool.confMenus, tool.confRoutes);
// import Vue from "vue";
// import Router from "vue-router";
// import store from "@/store/store";
export default {
  data() {
    return {
      username: "",
      password: "",
      loginErrorMsg: "用户名或密码错误，请重新输入",
      loginError: false
    };
  },
  // methods: {
  //   confMenus(data) {
  //     return data.map(item => {
  //       return {
  //         name: item.name,
  //         path: item.path,
  //         // component: () => import(item.component),
  //         children: item.chilren.map(val => {
  //           return {
  //             name: val.name,
  //             path: val.path
  //             // ,
  //             // component: () => import(val.component)
  //           };
  //         })
  //       };
  //     });
  //   },

  //   confRoutes(data) {
  //     data.forEach(item => {
  //       this.$router.options.routes.push({
  //         name: item.name,
  //         path: item.path,
  //         component: () => import(item.component),
  //         children: item.chilren.map(val => {
  //           return {
  //             name: val.name,
  //             path: val.path,
  //             component: () => import(val.component)
  //           };
  //         })
  //       });
  //     });
  //   },
  //   onSubmit() {
  //     // console.info(confMenus, confRoutes);
  //     // if (this.username && this.password) {
  //     console.info("this", this);
  //     this.$post("/login/Login_chk", {
  //       // username: this.username,
  //       // password: this.password

  //       username: "admin",
  //       password: "admin"
  //     })
  //       .then(
  //         data => {
  //           sessionStorage.setItem(
  //             "userToken",
  //             JSON.stringify({
  //               username: data.username,
  //               token: data.token
  //               // menus
  //             })
  //           );

  //           this.loginError = false;
  //           this.$get("/index/left").then(data => {
  //             const menus = this.confMenus(data.menu);
  //             this.$store.commit("setMenus", menus);

  //             this.confRoutes(data.menu);
  //             console.info(menus);
  //             console.info("$router", this.$router.options.routes);
  //             sessionStorage.setItem("userRoutes", JSON.stringify(data.menu));

  //             this.$router.push({ path: "/first" });
  //           });
  //         },
  //         data => {
  //           this.loginError = true;
  //           console.info("133", data);
  //         }
  //       )
  //       .catch(err => console.info(err));
  //     // } else {
  //     //   alert("error");
  //     // }
  //   }
  // },
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



