<template>
    <div class="adminpage">
        <el-container style="margin-top:2px;">
            <el-aside width="200px">
                <!-- <sidebar :menus="menus"></sidebar>  -->
            </el-aside>
        </el-container>
        <el-container>
          <el-main>
              <!-- <keep-alive>
                  <router-view/>
              </keep-alive> -->
              <p>card</p>    
          </el-main>
        </el-container>
    </div>
</template>

<script>
import sidebar from "./sidebar";
export default {
  components: {
    // sidebar
  },
  computed: {
    menus() {
      //   this.$parent.$store.commit("getChildren", "/card");
      //   return this.$parent.$store.getters.children;
    }
  }
};
</script>


