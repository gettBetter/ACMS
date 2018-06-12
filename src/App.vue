<template>
  <div id="app">
    <el-container>
      <!-- 页眉 -->
      <!-- <el-header>
        <app-header></app-header>
      </el-header> -->
      <!-- 主体 -->
      <el-container>
        <!-- 左侧菜单栏 -->
        <el-aside width="200px">
          <left-menu></left-menu>
        </el-aside>
        <!-- 主体视图区 -->
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <!-- 页脚 -->
          <!-- <el-footer>
            <app-footer></app-footer>
          </el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import Vuex from "vuex";
// import Vue from "vue";

import appHeader from "@/components/appHeader";
import leftMenu from "@/components/leftMenu";
import appFooter from "@/components/appFooter";
// import store from "@/store/store";
// Vue.use(Vuex);
export default {
  components: {
    appHeader,
    leftMenu,
    appFooter
  }
  // ,
  // computed: {
  //   menus() {
  //     return this.$stro.menus;
  //   }
  // },
  // mounted() {
  //   console.info(this.$stroe);

  // }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-menu {
  width: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-col-24 {
  width: 100%;
}
[class*="el-col-"] {
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
user agent stylesheet div {
  display: block;
}
</style>
