<template>
    <div class="adminpage">
        <el-container>
          <el-main>
              <keep-alive>
                  <router-view/>
              </keep-alive>
          </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  computed: {
    // path() {
    //   return this.$route.path;
    // },
    // menus() {
    //   console.info(this.path);
    //   this.$parent.$store.commit("getChildren", this.path);
    //   return this.$parent.$store.getters.children;
    // }
  }
  // mounted() {
  // console.info(this.menus);
  // }
};
</script>


