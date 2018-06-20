<template>
    <div>
        dep
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
      depList(){
          return this.$store.getters.depList;
      }
  },
  mounted() {
    this.$store.dispatch("getDepList");
  }
};
</script>

<style>
</style>


