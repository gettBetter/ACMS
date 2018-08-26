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
      //   Promise.reovle()
      console.info(a);
      for (let i = 0; i < 5; i++) {
        // (() => {
        //   this.$confirm(
        //     `请放入卡片，点击【确定】进行发卡，点击【取消】退出`,
        //     "提示",
        //     {
        //       confirmButtonText: "确定",
        //       cancelButtonText: "取消",
        //       type: "warning"
        //     }
        //   ).then(() => {
        //     console.info("i", i);
        //   });
        // })();
        // this.$confirm(
        //   `请放入卡片，点击【确定】进行发卡，点击【取消】退出`,
        //   "提示",
        //   {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     type: "warning",
        //     callback(action, instance) {
        //       console.info(action, i);
        //       if (action) {
        //         console.info(action, i);
        //       }
        //     }
        //   }
        // );
        if (confirm(`请放入卡片，点击【确定】进行发卡，点击【取消】退出`)) {
          console.info(i);
        }
      }
    },
    send() {}
  }
};
</script>
