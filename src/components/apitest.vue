<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加门禁通道</span>
            </div>
            <el-form>
                <el-form-item label-width="100px" label="API：">
                    <el-input v-model="api" placeholder="/devicmanage/authorlist"></el-input>
                </el-form-item>
                <el-button class="submit-btn" type="primary" @click="save">发送请求</el-button>
            </el-form>
            <el-form>
                <el-form-item label-width="100px" label="API：">
                    <el-input type="textarea" :rows="20" v-model="response">
                    </el-input>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
</script>

<style lang="">
.submit-btn,
.cancel-btn {
  width: 160px;
}
</style>