<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                :default-active="currentPath.match(/\/\w+/g).length>1 ? currentPath : children[0].path"
                background-color="white"
                router
                >
                <el-menu-item :index="child.path"  v-for="child in children" 
                    :key="child.path" 
                    :class="child.path"
                    >{{child.name}}</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  props: ["children"],
  mounted() {
    // console.info(this.$router.options);
  },
  methods: {},
  computed: {
    currentPath() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
</style>
