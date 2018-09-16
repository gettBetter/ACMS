<template>
  <div id="emap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>电子地图</span>
      </div>
      <div style="margin-bottom:10px;margin-top:-10px">
        <el-button-group>
          <el-button type="primary" @click="enlarge">放大</el-button>
          <el-button type="primary" @click="narrow">缩小</el-button>
          <el-button type="primary" @click="openAddDialog">新增</el-button>
          <el-button type="primary" @click="openEditDialog">修改</el-button>
          <el-button type="primary" @click="selectMap">关联门</el-button>
          <el-button type="primary" @click="del">删除</el-button>
          <!-- <el-button type="primary">入库</el-button> -->
        </el-button-group>
        <!-- v-if="btnShow" -->
        <el-button type="primary" @click="saveLoc">保存坐标</el-button>
      </div>

      <el-tabs v-model="curMap" type="card" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in list" :label="item.map_name" :name="item.map_indx" :key="item.map_indx">
        </el-tab-pane>
      </el-tabs>

      <Map ref="map"></Map>
      <ConfMap ref="confMap" @configSucc="configSucc"></ConfMap>
      <SelectMap ref="selectMap"></SelectMap>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import Map from "./Map";
import ConfMap from "./ConfMap";
import SelectMap from "./SelectMap";

import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Map,
    ConfMap,
    SelectMap
  },
  data() {
    return {
      curMap: "",
      list: [],
      type: ""
      // changedev: ""
    };
  },
  computed: {
    ...mapState(["mapId"])
  },
  methods: {
    reset() {
      this.curMap = "";
      this.list = [];
      this.type = "";
      this.setMapId("");
    },
    ...mapMutations(["setMapId"]),
    handleTabClick(tab, e) {
      this.setMapId(tab.name);
      console.info("mapId", this.mapId);
    },
    configSucc(val) {
      if (val) {
        this.getList;
      }
    },
    saveLoc() {
      this.$refs.map.saveLoc();
    },
    selectMap() {
      this.$nextTick(() => {
        this.$refs.selectMap.open();
      });
    },
    openAddDialog() {
      this.type = "新增电子地图";
      console.info("this.type", this.type);
      this.$nextTick(() => {
        this.$refs.confMap.open();
      });
    },
    openEditDialog() {
      this.type = "编辑电子地图";
      console.info("this.type", this.type);
      this.$nextTick(() => {
        this.$refs.confMap.open();
      });
    },
    del() {
      const param = {
        map_indx: this.mapId
      };
      axios.post("/mapdevchan/map_del", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
          // this.$router.go(-1);
        }
      });
    },
    getList() {
      axios
        .get("/mapdevchan/map_list")
        .then(data => {
          console.info(data.data);
          this.list = data.data.data;
          this.curMap = this.list[0] && this.list[0].map_indx;
          console.info("curmap", this.curMap);
          this.setMapId(this.curMap);
        })
        .catch(err => console.error(err));
    },
    enlarge() {
      this.$refs.map.enlarge();
    },
    narrow() {
      this.$refs.map.narrow();
    },
    slectDev(val) {
      if (val === true) {
        console.info("change");
        this.changeDev = "1" + new Date().getTime();
        console.info(this.changeDev);
      }
    }
  },
  activated() {
    this.reset();
    this.getList();
  }
};
</script>

<style>
</style>
