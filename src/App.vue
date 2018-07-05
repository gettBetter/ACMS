<template>
  <div id="app">
    <el-container>
      <!-- 页眉 -->
      <el-header>
        <app-header :menus="menus"></app-header>
      </el-header>
      <!-- 主体 -->
      <el-container>
        <!-- 左侧菜单栏 -->
        <el-aside width="200px" v-if="hasCHildren">
          <sidebar :children="children"></sidebar>
        </el-aside>
        <!-- 主体视图区 -->
        <el-container>
          <el-main>
            <keep-alive>
              <router-view/>
            </keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import appHeader from "@/components/appHeader";
import sidebar from "@/components/sidebar";

export default {
  components: {
    appHeader,
    sidebar
  },
  data() {
    return {};
  },
  computed: {
    children() {
      let path = this.$route.path;
      if (path == "/") {
        path = "/second";
      }
      path = path.match(/\/\w+/g)[0];
      this.$parent.$store.commit("getChildren", path);
      return this.$parent.$store.getters.children;
    },
    menus() {
      return this.$parent.$store.getters.menus;
    },
    hasCHildren() {
      let path = this.$route.path;

      if (path == "/") {
        path = "/second";
      }
      path = path.match(/\/\w+/g)[0];
      this.$parent.$store.commit("getChildren", path);
      return !!this.$parent.$store.getters.children.length;
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.container {
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}
#app {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #262626;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  line-height: 200px;
  overflow: hidden;
  background-color: #ebeff2;
  /* border-right: 1px solid #ccc; */
}

.el-main {
  background-color: #fff;
  color: #333;
  /* line-height: 160px; */
  height: 100%;
  padding: 0px;
}
.el-menu {
  width: 200px;
}
.el-menu-item.is-active {
  background-color: #fff;
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

.el-table th,
.el-table td {
  text-align: center;
  line-height: 40px;
  padding: 0;
}
.el-card,
.el-card__header {
  border: none;
}
.el-container {
  height: 100%;
}

.el-menu--horizontal > .el-menu-item {
  color: white;
  font-size: 15px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: white !important;
  border-bottom: 2px solid white;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover {
  color: white;
}
</style>
