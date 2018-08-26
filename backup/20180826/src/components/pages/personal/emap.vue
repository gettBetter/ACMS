<template>
  <div id="emap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>电子地图</span>
      </div>
      <div style="margin-bottom:10px;margin-top:-20px">
        <el-button-group>
          <!-- <el-button type="primary" @click="enlarge">放大</el-button>
          <el-button type="primary" @click="narrow">缩小</el-button> -->
          <el-button type="primary">新增</el-button>
          <el-button type="primary">修改</el-button>
          <el-button type="primary">关联门</el-button>
          <el-button type="primary">出库</el-button>
          <el-button type="primary">入库</el-button>
        </el-button-group>
      </div>

      <el-tabs v-model="curMap" type="card" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in list" :label="item.map_name" :name="item.map_indx" :key="item.map_indx">

        </el-tab-pane>

      </el-tabs>
      <Map></Map>
      <!-- <div class="map">
        <img :src="emapSrc" :style="imgStyle" />
        <div id="box2" v-dragx="dragBox2" @bindUpdate="bindUpdate" :style="{left:dragBox2.left+'px',top:dragBox2.top+'px',width:dragBox2.width+'px',height:dragBox2.height+'px'}">
          <span>通过绑定值实现拖到</span><br/>
          <div class="drag1"></div>
        </div>
      </div> -->

    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import Map from "./Map";

export default {
  components: {
    Map
  },
  data() {
    return {
      curMap: "map1",
      list: [],
      curId: ""
    };
  },
  methods: {
    handleTabClick() {},
    getList() {
      axios
        .get("/mapdevchan/map_list")
        .then(data => {
          console.info(data.data);
          this.list = data.data.data;
        })
        .catch(err => console.error(err));
    },
    enlarge() {
      // this.
    }
  },
  activated() {
    this.getList();
  }
};
</script>

<style>
</style>
