<template>
    <div>
       <el-row>
          <el-col :span="2" style="text-align: center ">
            <img :src="logoUrl" width="30px" style="margin-top:16px" />
          </el-col>
          <el-col :span="18" :offset="1">
        <el-menu :default-active="menus[0].path" 
        mode="horizontal" 
        @select="handleSelect"
        background-color="#409EFF"
        router
        >
          <el-menu-item  
          v-for="menu in menus" 
          :key="menu.path" 
          :index="menu.path" 
          >
            <!-- <i class="el-icon-document" ></i> -->
            {{menu.name}}       
        </el-menu-item>
        </el-menu>
         </el-col>
    </el-row>
    </div>
</template>

<script>
import logoUrl from "@/assets/logo.png";
export default {
  data() {
    return {
      logoUrl
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.info(key, keyPath);
    }
  },
  computed: {
    menus() {
      console.info(this.$parent.$store.getters.menus);
      return this.$parent.$store.getters.menus;
    }
  }
};
</script>

<style>
.el-menu {
  width: 100%;
  overflow: hidden;
  background-color: #545c64;
}
.el-menu--horizontal > .el-menu-item {
  width: 120px;
  float: left;
  margin: auto 10px;
  color: white;
  background-color: #545c64;
}
</style>
