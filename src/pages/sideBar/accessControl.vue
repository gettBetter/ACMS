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
      this.$parent.$store.commit("getChildren", "/accesscontrol");
      return this.$parent.$store.getters.children;
    },
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>
