<template>
    <div class="adminpage">
        <el-container>
          <el-main>
              <keep-alive>
                  <router-view/>
              </keep-alive>
          </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  computed: {},
  mounted() {}
};
</script>


