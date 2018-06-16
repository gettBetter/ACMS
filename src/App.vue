<template>
  <div id="app">
    <el-container>
      <!-- 页眉 -->
      <el-header>
        <app-header></app-header>
      </el-header>
      <!-- 主体 -->
      <el-container style="margin-top:2px;">
        <!-- 左侧菜单栏 -->
        <el-aside width="200px"  v-if="hasCHildren">
          <sidebar :menus="menus"></sidebar> 
        </el-aside>
        <!-- 主体视图区 -->
        <el-container>
          <el-main>
            <keep-alive>
              <router-view/> 
            </keep-alive>
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
    menus() {
      let path = this.$route.path;

      if (path == "/") {
        path = "/admin";
      }

      path = path.match(/\/\w+/g)[0];
      this.$parent.$store.commit("getChildren", path);

      this.$parent.$store.getters.children;

      return this.$parent.$store.getters.children;
    },
    hasCHildren() {
      let path = this.$route.path;

      console.info(path);
      if (path == "/") {
        path = "/admin";
      }

      path = path.match(/\/\w+/g)[0];

      console.info(path);
      this.$parent.$store.commit("getChildren", path);
      return !!this.$parent.$store.getters.children.length;
    }
  },
  mounted() {
    // console.info(this.$route.path);
    
    // this.$get("/index/left").then(data => {
    //   console.info("a", data);
    // });
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #409eff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  line-height: 200px;
  /* border-right: 1px solid #ccc; */
}

.el-main {
  background-color: #f3f3f3;
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
/* .el-header {
  background-color: #545c64;
} */
</style>
