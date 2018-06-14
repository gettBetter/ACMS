<template>
    <div>
        <tpl :menus="menus"></tpl>
    </div>
</template>

<script>
import tpl from "./tpl";
export default {
  components: {
    tpl
  },
  computed: {
    menus() {
      this.$parent.$store.commit("getChildren", "/personnel");
      return this.$parent.$store.getters.children;
    }
    // onRoutes() {
    //   this.$route.path.replace(/\/.+/g, "");
    // }
  }
};
</script>
