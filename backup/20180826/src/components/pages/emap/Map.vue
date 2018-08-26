<template>
  <div class="map">
    <img v-if="!!this.mapId" :src="emapSrc" :style="imgStyle" />

    <div :class="'dBox'+index" v-for="(item,index) in devList" :key="index" v-dragx="item" @bindUpdate="bindUpdate" @bindChange="bindChange" :style="{left: item.left + 'px',top: item.top + 'px',width: item.width +'px',height: item.height + 'px',lineHeight:item.height+'px' }">
      <span>{{item.dev_chan}}
      </span><br/>
      <div :class="'drag'+index"></div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import baseURL from "@/utils/baseURL";
import url from "@/assets/Untitled.jpg";
import "@/directive/dragx";
export default {
  // props: ["changedev"],
  data() {
    return {
      // emapSrc: "url",
      baseURL,
      imgStyle: {
        width: "100%"
      },
      width: 100,
      height: 100,
      marginLeft: 0,
      marginTop: 0,
      devList: [],
      data: {}
    };
  },
  computed: {
    emapSrc() {
      return `${this.baseURL}/index/map_showimg/map_indx/${this.mapId}`;
    },
    ...mapState(["mapId", "changeDev"])
  },
  methods: {
    reset() {},
    getDevList(param) {
      this.devList = [];
      axios.get(`/mapdevchan/map_devchan/map_indx/${param}`).then(data => {
        console.info("devlist", data.data);
        this.devList = data.data.data.map((item, index) => {
          item.dirctDom = false;
          item.dragBarClass = "drag" + index;
          item.left = item.map_locx || 0;
          item.top = item.map_locy || 0;
          item.width = item.map_wide || 75;
          item.height = item.map_high || 23;
          return item;
        });
        console.info("devlist", this.devList);
      });
    },
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
    },
    saveLoc() {
      const param = {
        dev_chan_list: this.devList.map(item => {
          item.map_wide = parseInt(item.width);
          item.map_high = parseInt(item.height);
          item.map_locx = parseInt(item.left);
          item.map_locy = parseInt(item.top);
          delete item.ROW_NUMBER;
          delete item.width;
          delete item.height;
          delete item.left;
          delete item.top;
          delete item.dragBarClass;
          delete item.dirctDom;
          return item;
        })
      };
      console.info("post", param);
      axios.post("/mapdevchan/map_devchan_save", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "坐标已保存!"
          });
          this.devList = param.dev_chan_list.map((item, index) => {
            item.dirctDom = false;
            item.dragBarClass = "drag" + index;
            item.left = item.map_locx || 0;
            item.top = item.map_locy || 0;
            item.width = item.map_wide || 75;
            item.height = item.map_high || 23;
            return item;
          });
          // this.$emit("saveLocSucc", true);
          console.info("post", param);
          this.getDevList(this.mapId);
        }
      });
    },
    bindUpdate(event) {
      // console.info(event);
      let data = event.detail.data;
      let original = event.detail.original;

      if (data.width <= 75) data.width = 75;
      if (data.height <= 23) data.height = 23;
      if (data.top <= 0) data.top = 0;
      if (data.left <= 0) data.left = 0;

      original.top = data.top;
      original.left = data.left;
      original.width = data.width;
      original.height = data.height;

      console.info(this.devList);
    },
    bindChange(event) {
      // this.$emit("showSaveLocBtn", true);
    }
  },
  watch: {
    mapId(newVal, oldVal) {
      console.info("mapId2", newVal, "22222", oldVal);
      if (newVal) {
        this.getDevList(newVal);
      }
    },
    changeDev(newVal, oldVal) {
      console.info("changeDev", newVal);
      this.getDevList(this.mapId);
    }
  },
  mounted() {
    console.info("changedev", this.changedev, this.mapId);
  }
};
</script>

<style>
.map {
  width: 100%;
  min-height: 400px;
  max-height: 600px;
  box-sizing: border-box;
  border: 2px solid #ddd;
  overflow: scroll;
  position: relative;
}
[class*="dBox"] {
  border: solid 1px rgba(33, 61, 223, 0.5);
  position: absolute;
  background-color: #ccc;
  text-align: center;
}
[class*="drag"] {
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  right: 2px;
}
.bindBox {
  clear: both;
  margin-top: 5px;
}
</style>

