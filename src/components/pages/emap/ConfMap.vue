<template>
  <div>
    <el-dialog width="40%" style="min-height:400px" :title="type" :visible.sync="dialogVisible" append-to-body center>
      <!-- <div class="file">
        <form :action="actionUrl" enctype="multipart/form-data" method="post">
          <input type="text" name="map_name">
          <input type="file" name="map_file">
          <button class="btn btn-primary" type="submit">上传</button>
        </form>
      </div> -->

      <el-form :model="data" label-width="100px" style="max-height:450px;overflow-y:scroll">
        <el-form-item label="地图编号:" v-if="type === '编辑电子地图'">
          <span>{{mapId}}</span>
        </el-form-item>
        <el-form-item label="地图名称:">
          <el-input v-model="data.map_name"></el-input>
        </el-form-item>

        <el-form-item label="上传地图:">
          <input type="file" name="map_file" id="file" @change="uploudChange">
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
import $ from "jQuery";
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
      return this.$parent.$data.type;
    },
    actionUrl() {
      const token = JSON.parse(localStorage.userToken);
      //   if (this.type === "新增电子地图") {
      //     return `http://203.195.236.217:9000/admin/mapdevchan/map_add/token/${
      //       token.token
      //     }/username/${token.username}`;
      //   }
      //   return `http://203.195.236.217:9000/admin/mapdevchan/map_edit_save/token/${
      //     token.token
      //   }/username/${token.username}`;

      return `http://203.195.236.217:9000/admin/mapdevchan/map_add/token/${
        token.token
      }/username/${token.username}`;
    },
    ...mapState(["mapId"])
  },
  watch: {},
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    reset() {
      // this.data = {};
    },
    open() {
      this.dialogVisible = true;
      console.info("123123", this.type);
      //   this.reset();
      //   this.getData();
    },
    getData() {
      if (this.type == "编辑电子地图") {
        axios
          .get("/index/map_edit_data", { params: { map_indx: this.mapId } })
          .then(data => {
            console.info(data.data);
            // this.data = data.data.data;
            // this.devList = data.data.
          });
      }
    },
    save() {
      // console.info("fileList", this.fileList);
      // this.data.map_file = this.fileList[0];
      // // this.$refs.upload.submit();

      console.info(typeof this.map_file);

      // const url = this.actionUrl;
      // console.info("param", param);

      const url = this.actionUrl;

      var oMyForm = new FormData();
      const map_file = this.map_file;
      const map_name = this.data.map_name;
      // debugger;
      oMyForm.set("map_file", this.map_file);
      oMyForm.set("map_name", this.data.map_name);
      console.info("fd", map_name, oMyForm.get("map_name"));

      // multipart/from-data
      // multipart/form-data

      const param = {
        map_name: this.data.map_name,
        map_file: this.map_file
      };

      console.info(param);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      axios
        .post(url, oMyForm, config)
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });

      // this.$refs.upload.submit();
      // $.post(url, param, data => {
      //   conosle.info(data);
      // });

      // $.ajax({
      //   type: "post",
      //   url,
      //   data: param,
      //   // dataType: "json",
      //   // contenType: "multipart/form-data",
      //   success: function(data) {}
      // });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload(file1, file2) {
      console.info("this.file", file1, file2);
      // this.map_file = file;
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    uploudChange(e) {
      console.info("uploudChange", e.target.files[0]);
      console.info();
      this.map_file = e.target.files[0];
    }
  },
  watch: {
    mapId(newVal, oldVal) {
      console.info("mapId2", newVal, oldVal);
    }
  },
  mounted() {
    console.info("data", this.$parent.$data);
    // $.get();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

