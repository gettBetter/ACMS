<template>
    <div>
        <el-form :model="userInfo">

        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // userInfo: {}
    };
  },
  methods: {
    getDepTree() {
      this.$parent.$store.dispatch("getDepTree");
      this.depData = this.$parent.$store.getters.depTree;
      console.info("this.depData", this.depData);
    },
    getUserEditData(param) {
      this.$parent.$store.dispatch("getUserEditData", param);
      this.userEditData = this.$parent.$store.getters.userEditData;
    }
  },
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    userInfo() {}
  },
  mounted() {
    // this.userId = console.info(this.userId);
    console.info(this.userId);
    // this.getDepTree();
    this.$parent.$store.dispatch("getDepTree");
    this.$parent.$store.dispatch("getUserEditData", param);
  }
};
</script>
