<template>
    <div>
        <el-row class="tac">
            <el-col :span="24" >
                <el-menu
                default-active="/admin/user"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                unique-opened
                >
                    <el-submenu :index="menu.index" 
                    v-for="menu in menus" 
                    :key="menu.index" 
                    :class="menu.index">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{menu.name}}</span>
                        </template>
                        <el-menu-item  
                        v-for="clildMenu in menu.children" 
                        :index="clildMenu.index" 
                        :key="clildMenu.index"
                        >{{clildMenu.name}}</el-menu-item> 
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  //   data() {
  //     return {};
  //   },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {},
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
.card .el-icon-arrow-down {
  display: none;
}
</style>

