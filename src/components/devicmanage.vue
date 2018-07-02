<template>
    <div class="devicepage">
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
export default {};
</script>
<style>
.devicepage {
  height: 100%;
}
</style>


