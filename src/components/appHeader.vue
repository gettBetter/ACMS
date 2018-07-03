<template>
  <div>
    <el-row>
      <el-col :span="2" style="text-align: center ">
        <!-- <img :src="logoUrl" width="30px" style="margin-top:16px" /> -->
        <p></p>
      </el-col>
      <el-col :span="18" :offset="1">
        <el-menu :default-active="currentPath.match(/\/\w+/g) ? currentPath.match(/\/\w+/g)[0] : ''" mode="horizontal" @select="handleSelect" background-color="#262626" router>
          <el-menu-item v-for="menu in menus" :key="menu.path" :index="menu.path">
            <!-- <i class="el-icon-document" ></i> -->
            {{menu.name}}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="2" :offset="1" v-if="menus.length>0">
        <el-row style="font-size:14px">
          <el-col :span="14" style=“color:white>{{username}}</el-col>
          <el-col :span="10">
            <el-button type="text" style="color:white;font-weight:400" @click="logout" class="logout">退出</el-button>
          </el-col>

        </el-row>
        <!-- <span style=" font-size:14px " :span="14 ">{{username}}</span> -->

      </el-col>
    </el-row>

  </div>
</template>

<script>
import logoUrl from "@/assets/logo.png";
export default {
  data() {
    return {
      logoUrl
    };
  },
  props: ["menus"],
  methods: {
    handleSelect(key, keyPath) {
      //
    },
    logout() {
      this.$router.replace("/login");
    }
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    username() {
      if (sessionStorage.userToken) {
        return JSON.parse(sessionStorage.userToken).username;
      }
    },
    islogin() {
      return !!sessionStorage.userToken;
    }
  }
};
</script>

<style>
.el-menu {
  width: 100%;
  overflow: hidden;
  background-color: #ebeff2;
  color: #333;
}
.el-menu--horizontal > .el-menu-item {
  width: 120px;
  float: left;
  margin: auto 10px;
  color: white;
  /* background-color: #f9f9f9; */
}
.el-menu-item {
  color: #333;
}
.el-menu-item:hover {
  background-color: #fff;
}
.logout:hover {
  color: black;
}
</style>
