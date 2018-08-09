<template>
  <div class="map">
    <img :src="emapSrc" :style="imgStyle" />

    <div class="box" v-dragx="dragBox" @bindUpdate="bindUpdate" :style="{left: dragBox.left + 'px',top: dragBox.top + 'px',width: dragBox.width +'px',height: dragBox.height + 'px'}">
      <span>dragBox1</span><br/>
      <div class="drag1"></div>
    </div>

    <!-- <div class="box" v-dragx="dragBox" @bindUpdate="bindUpdate" :style="dragStyle">
      <span>dragBox1</span><br/>
      <div class="drag1"></div>
    </div> -->
    <!-- <div class="box" v-dragx="dragBox" @bindUpdate="bindUpdate" :style="{left:dragBox.left+'px',top:dragBox.top+'px',width:dragBox.width+'px',height:dragBox.height+'px'}">
      <span>dragBox2</span><br/>
      <div class="drag1"></div>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import url from "@/assets/Untitled.jpg";
import "@/directive/dragx";
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
      marginTop: 0,
      drag: [],
      dragBox: {
        dragBarClass: "drag1",
        left: 0,
        top: 0,
        width: 75,
        height: 23,
        dirctDom: false
      },
      // dragStyle: {
      //   left: this.dragBox.left + "px",
      //   top: this.dragBox.top + "px",
      //   width: this.dragBox.width + "px",
      //   height: this.dragBox.height + "px"
      // },
      devList: [],
      data: {}
    };
  },
  computed: {
    ...mapState(["mapId"])
  },
  watch: {},
  methods: {
    reset() {
      // this.data = {};
    },
    // open() {
    //   this.reset();
    //   this.getData();
    // },
    getMap() {
      axios.get(`/index/map_showimg/map_indx/${mapId}`).then(data => {
        confirm.info(data.data);
        // this.data = data.data.data;
        // this.devList = data.data.
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
    bindUpdate(event) {
      let data = event.detail;
      this.dragBox.top = data.top;
      this.dragBox.left = data.left;
      if (data.width <= 100) data.width = 100;
      if (data.height <= 50) data.height = 50;
      this.dragBox.width = data.width;
      this.dragBox.height = data.height;
    }
  },
  watch: {
    mapId(newVal, oldVal) {
      console.info("mapId2", newVal, oldVal);
    }
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
  overflow: hidden;
  position: relative;
}
.box {
  border: solid 1px rgba(33, 61, 223, 0.5);
  position: absolute;
}
[class*="drag"] {
  /* background-color: #ccc; */
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  right: 2px;
  /* border-top: solid 1px rgba(33, 61, 223, 0.541);
  border-bottom: solid 1px rgba(33, 61, 223, 0.541); */
}
.bindBox {
  clear: both;
  margin-top: 5px;
}
</style>

