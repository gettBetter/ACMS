<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                router
                >
                <el-menu-item :index="menu.index"  v-for="menu in menus" 
                    :key="menu.index" 
                    :class="menu.index">{{menu.name}}</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  props: ["menus"],
  mounted() {
    // console.info("menus", menus);
  }
};
</script>

<style>
</style>
