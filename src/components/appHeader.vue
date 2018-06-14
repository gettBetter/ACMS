<template>
    <div>
        <el-menu :default-active="activeIndex" 
        class="el-menu-demo" 
        mode="horizontal" 
        @select="handleSelect"
        background-color="#b3c0d1"
        router
        >
        
            <el-menu-item  v-for="menu in menus" 
            :key="menu.index" 
            :index="menu.index" 
            :class="menu.index"
            >{{menu.name}} 
            <!-- {menu.name}} 
            <router-link tag="span" :to="menu.index">
          {{menu.name}} 
        </router-link> -->
        
        </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "admin"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.info(key, keyPath);
    }
  },
  computed: {
    menus() {
      return this.$parent.$store.getters.menus;
    }
    // onRoutes() {
    //   this.$route.path.replace(/\/.+/g, "");
    // }
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
