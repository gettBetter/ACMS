<template>
    <div>
        <el-menu :default-active="activeIndex" 
        class="el-menu-demo" 
        mode="horizontal" @select="handleSelect"
        background-color="#b3c0d1"
        router
        >
            <el-menu-item :index="menu.index"  v-for="menu in menus" 
            :key="menu.index" 
            :class="menu.index"
            >{{menu.name}}</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "admin",
      key: ""
      //   activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("1", key, keyPath);
      this.key = key;
    }
  },
  computed: {
    menus() {
      return this.$parent.$store.getters.menus;
    },
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style>
.el-menu {
  width: 100%;
  overflow: hidden;
  background-color: #545c64;
}
.el-menu--horizontal > .el-menu-item {
  width: 160px;
  float: left;
  margin: auto 20px;
  color: white;
  background-color: #545c64;
}
</style>
