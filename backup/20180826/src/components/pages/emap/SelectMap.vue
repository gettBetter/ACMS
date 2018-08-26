<template>
  <div>
    <el-dialog width="550px" style="min-height:400px" title="关联门" :visible.sync="dialogVisible" append-to-body center>

      <el-transfer v-model="map_devchann" :props="{key: 'dev_chan',label: 'dev_chan'}" :data="no_user_devchan" @change="handleChange" :titles="['待选', '已选']">
      </el-transfer>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      dialogVisible: false,
      data: {},
      map_devchann: [],
      no_user_devchan: []
    };
  },
  computed: {
    ...mapState(["mapId"])
  },
  watch: {},
  methods: {
    ...mapMutations(["changeDevs"]),
    handleChange(val1, val2) {
      console.info(val1, val2);
      console.info(this.map_devchann.length, this.map_devchann);
    },
    reset() {
      this.data = {};
    },
    open() {
      this.dialogVisible = true;
      if (this.mapId) this.getData(this.mapId);
    },
    getData(param) {
      this.data = {};
      axios.get(`/mapdevchan/map_selectbox/map_indx/${param}`).then(data => {
        console.info("select", data.data);
        this.map_devchann = data.data.map_devchann.map(item => {
          return item.dev_chan;
        });
        this.no_user_devchan = data.data.no_user_devchan.concat(
          data.data.map_devchann
        );
      });
    },
    save() {
      const param = {
        map_indx: this.mapId,
        dev_chan_list: this.map_devchann
      };

      console.info("param", param);

      axios.post("/mapdevchan/map_selectbox_save", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "关联门成功!"
          });
          // this.$emit("slectDev", true);
          this.changeDevs(new Date().getTime());
          this.dialogVisible = false;
        }
      });
    }
  },
  watch: {
    mapId(newVal, oldVal) {
      console.info("mapId2", newVal, oldVal);
    }
  },
  mounted() {}
};
</script>

<style>
</style>

