<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                :default-active="currentPath.match(/\/\w+/g).length>1 ? currentPath : menus[0].path"
                background-color="white"
                router
                >
                <el-menu-item :index="menu.path"  v-for="menu in menus" 
                    :key="menu.path" 
                    :class="menu.path"
                    >{{menu.name}}</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  props: ["menus"],
  mounted() {
    // console.info(this.$router.options);
  },
  methods: {

  },
  computed: {
    currentPath() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
</style>
