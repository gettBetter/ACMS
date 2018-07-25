<template>
    <div class="cardpage">
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
.cardpage {
  height: 100%;
}
</style>


