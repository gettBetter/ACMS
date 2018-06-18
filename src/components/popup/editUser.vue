<template>
    <div>
        <span>{{userData.emp_index}}</span>
        <inpit type="text" v-model="userData.emp_index"></inpit>

    </div>
</template>

<script>
export default {
  props: ["userData"],
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>


<style>
</style>



