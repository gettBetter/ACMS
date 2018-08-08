<template>
    <div id="emap">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>电子地图</span>
            </div>
            <el-button-group>
                <el-button type="primary" @click="enlarge">放大</el-button>
                <el-button type="primary" @click="narrow">缩小</el-button>
                <el-button type="primary">新增</el-button>
                <el-button type="primary">修改</el-button>
                <el-button type="primary">关联门</el-button>
                <el-button type="primary">出库</el-button>
                <el-button type="primary">入库</el-button>
            </el-button-group>
            <div id="map">
                <img :src="emapSrc" :style="imgStyle" />
            </div>
        </el-card>
    </div>
</template>

<script>
import url from "@/assets/Untitled.jpg";

export default {
  data() {
    return {
      emapSrc: url,
      imgStyle: {
        width: "100%"
      },
      width: 100,
      height: 100,
      marginLeft: 0,
      marginTop: 0
    };
  },
  methods: {
    enlarge() {
      this.width += 5;
      this.height += 5;
      this.marginLeft -= 2.5;
      this.marginTop -= 2.5;
      this.imgStyle.width = this.width + "%";
      this.imgStyle.height = this.height + "%";
      this.imgStyle.marginLeft = this.marginLeft + "%";
      this.imgStyle.marginTop = this.marginTop + "%";
    },
    narrow() {
      this.width -= 5;
      this.height -= 5;
      this.marginLeft += 2.5;
      this.marginTop += 2.5;
      this.imgStyle.width = this.width + "%";
      this.imgStyle.height = this.height + "%";
      this.imgStyle.marginLeft = this.marginLeft + "%";
      this.imgStyle.marginTop = this.marginTop + "%";
    }
  }
};
</script>

<style>
#map {
  width: 100%;
  min-height: 400px;
  max-height: 600px;
  box-sizing: border-box;
  border: 2px solid #ddd;
  overflow: hidden;
  position: relative;
}
</style>
