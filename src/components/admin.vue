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
// import sidebar from "./sidebar";
export default {
  //   components: {
  //     sidebar
  //   },
  computed: {
    menus() {
      this.$parent.$store.commit("getChildren", "/admin");
      return this.$parent.$store.getters.children;
    }
  },
  mounted() {
    console.info(this.menus);
  }
};
</script>


