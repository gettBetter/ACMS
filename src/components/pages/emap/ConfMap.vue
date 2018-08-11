<template>
  <div>
    <el-dialog width="40%" style="min-height:400px" :title="type" :visible.sync="dialogVisible" append-to-body center>
      <el-form :model="data" label-width="100px" style="max-height:450px;overflow-y:scroll">
        <el-form-item label="地图编号:" v-if="type === '编辑电子地图'">
          <span>{{mapId}}</span>
        </el-form-item>
        <el-form-item label="地图名称:">
          <el-input v-model="data.map_name"></el-input>
        </el-form-item>

        <el-form-item label="上传地图:">
          <input type="file" name="map_file" id="file" @change="uploadChange">
          <div>只能上传jpg/png文件，且不超过5M</div>
        </el-form-item>

      </el-form>

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
import url from "@/assets/Untitled.jpg";
import "@/directive/dragx";

export default {
  data() {
    return {
      dialogVisible: false,
      data: {},
      fileList: [],
      imageUrl: "",
      map_file: {}
    };
  },
  computed: {
    type() {
      console.info(this.$parent.$data);
      return this.$parent.$parent.type;
    },
    actionUrl() {
      const token = JSON.parse(localStorage.userToken);
      if (this.type === "新增电子地图") {
        return `http://203.195.236.217:9000/admin/mapdevchan/map_add/token/${
          token.token
        }/username/${token.username}`;
      }
      return `http://203.195.236.217:9000/admin/mapdevchan/map_edit_save/token/${
        token.token
      }/username/${token.username}`;
    },
    ...mapState(["mapId"])
  },
  watch: {},
  methods: {
    reset() {},
    open() {
      this.dialogVisible = true;
      console.info("123123", this.type);
      this.getData();
    },
    getData() {
      if (this.type == "编辑电子地图") {
        axios
          .get("/mapdevchan/map_edit_data", {
            params: { map_indx: this.mapId }
          })
          .then(data => {
            console.info(data.data);
            this.data = data.data.data[0];
          });
      }
    },
    save() {
      console.info(typeof this.map_file);
      const url = this.actionUrl;
      let oMyForm = new FormData();

      oMyForm.set("map_name", this.data.map_name);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      let msg = "";

      console.info(this.type, "this.type");
      if (this.type === "新增电子地图") {
        msg = "新增电子地图成功！";
        if ("lastModified" in this.map_file) {
          oMyForm.set("map_file", this.map_file);
        } else {
          alert("请上传地图");
          return;
        }
      } else if (this.type === "编辑电子地图") {
        if ("lastModified" in this.map_file) {
          oMyForm.set("map_file", this.map_file);
          // oMyForm.set("map_indx", this.map_indx);
        }
        oMyForm.set("map_indx", this.mapId);
        console.info("map_indx", oMyForm.get("map_indx"));
        msg = "编辑电子地图成功！";
      }
      axios
        .post(url, oMyForm, config)
        .then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: msg
            });
            this.$emit("configSucc", true);
            this.dialogVisible = false;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    uploadChange(e) {
      console.info("e", e.target.files, e.target.value);
      // C:\fakepath\xiaocai.jpg
      // e.target.value
      const file = e.target.files[0];
      this.map_file = file;
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    }
  },
  watch: {
    // mapId(newVal, oldVal) {
    //   console.info("mapId2", newVal, oldVal);
    // }
  },
  mounted() {}
};
</script>