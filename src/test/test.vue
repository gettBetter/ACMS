<template>
  <div>
    <el-button @click="test">test</el-button>
  </div>
</template>

<script>
let a = "111";

export default {
  data() {
    return {};
  },
  methods: {
    test() {
      let s = "1-2-3-4-5";
      let r1 = "-";
      let r2 = "/";

      console.info(this.replaceAll(s, r1, r2));
    },
    replaceAll(s, r1, r2) {
      if (s.includes(r1)) {
        s = s.replace(r1, r2);
        return this.replaceAll(s, r1, r2);
      } else {
        return s;
      }
    },
    send() {}
  },
  mounted() {
    this.test();
  }
};
</script>
