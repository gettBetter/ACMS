<template>
    <div>
        <el-row class="tac">
            <el-col :span="24" v-for="menu in menus" :key="menu.index" :class="'leftmenu'+menu.index">
                <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
               
                <el-submenu :index="menu.index" >
                    <template slot="title">
                        <i class="el-icon-location"></i>
                    <span>{{menu.name}}</span>
                    </template>
                    <el-menu-item  v-for="clildMenu in menu.children" :index="clildMenu.index" :key="clildMenu.index">{{clildMenu.name}}</el-menu-item> 
                </el-submenu>
                </el-menu>
            </el-col>
        </el-row>

        <!-- {{menus}} -->
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
  mounted() {
    // this.init();
  },
  computed: {
    menus() {
      return this.$parent.$store.getters.menus;
    }
  }
};
</script>

<style scoped>
.leftmenu3 .el-icon-arrow-down {
  display: none;
}
</style>

