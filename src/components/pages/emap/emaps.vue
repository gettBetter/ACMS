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
          <el-button type="primary" @click="openAddDialog">新增</el-button>
          <el-button type="primary" @click="openEditDialog">修改</el-button>
          <el-button type="primary" @click="selectMap">关联门</el-button>
          <el-button type="primary" @click="del">删除</el-button>
          <!-- <el-button type="primary">入库</el-button> -->
        </el-button-group>
      </div>

      <el-tabs v-model="curMap" type="card" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in list" :label="item.map_name" :name="item.map_indx" :key="item.map_indx">

        </el-tab-pane>

      </el-tabs>
      <Map></Map>
      <ConfMap ref="confMap"></ConfMap>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import Map from "./Map";
import ConfMap from "./ConfMap";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Map,
    ConfMap
  },
  data() {
    return {
      curMap: "",
      list: [],
      type: ""
    };
  },
  computed: {
    ...mapState(["mapId"])
  },
  methods: {
    ...mapMutations(["setMapId"]),
    handleTabClick(tab, e) {
      this.setMapId(tab.name);
      console.info("mapId", this.mapId);
    },
    selectMap() {},
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
