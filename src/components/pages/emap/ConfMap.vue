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

        <el-form-item label="">
          <!--  -->
          <!-- :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" -->
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          <!-- before-upload -->
          <!-- :auto-upload="false" -->
          <!-- action="zheshiyigejiadeurl" -->
          <el-upload class="upload-demo" ref="upload" :data="data"  :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :limit="1" name="file_name" :before-upload="beforeAvatarUpload" :http-request="uploadImg">

            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
          </el-upload>

          <!-- <el-upload class="avatar-uploader" :data="data" :action="actionUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :auto-upload="false" @on-change="uploudChange">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
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
// import $ from "jquery"
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
      // this.$refs.upload.submit();
      // console.info('this.map_file',this.map_file)
      const param = {
        map_name: this.data.map_name,
        map_file: this.map_file
      };
      // axios.post("/mapdevchan/map_add", param).then(data => console.info(data));
      // var fd = new FormData();
      // const mapName = this.data.map_name
      // const mapFile = this.map_file
      // fd.append('map_name', mapName)
      // fd.append('map_file', mapFile)
      // let config = {
      //     headers: {
      //         'Content-Type': 'multipart/form-data'
      //     }
      // }
      // console.info('param',fd)
      console.info('paramssss',param)
      const url = this.actionUrl
      $.post(url,param).done(data=>{})
      // const url = this.actionUrl
      // var xhr = new XMLHttpRequest();
      // xhr.open("post", url, true);
      // // xhr.upload.addEventListener("progress", vm.progressFunction, false); //监听上传进度
      // xhr.onload = function (data) {
      //   console.info(data)
      //     // vm.Form.playUrl = xhr.response; //接收上传到阿里云的文件地址
      //     // vm.$message({
      //     //     message: '恭喜你，上传成功!',
      //     //     type: 'success'
      //     // });
      // };
      // xhr.send(fd);

      // axios.post("/mapdevchan/map_add", fd,config).then(data => console.info(data));
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
    beforeAvatarUpload(file) {
      console.info("this.file", file);
      this.map_file = file;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploudChange(file, fileList) {
      console.info(file, fileList);
    },
    uploadImg(param) { //自定义文件上传
      // var fileObj = param.file;
      this.map_file = param.file
      
      // const params = {
      //   map_name: ,
      //   map_file: this.map_file
      // };
      
      
      // 接收上传文件的后台地址
      // var FileController = "/file/item/upload";
      // // FormData 对象
      // var form = new FormData();
      // // 文件对象
      // form.append("file", fileObj);
      // // 其他参数
      // form.append("xxx", xxx);
      // XMLHttpRequest 对象
      // var xhr = new XMLHttpRequest();
      // xhr.open("post", FileController, true);
      // xhr.upload.addEventListener("progress", vm.progressFunction, false); //监听上传进度
      // xhr.onload = function () {
      //     vm.Form.playUrl = xhr.response; //接收上传到阿里云的文件地址
      //     vm.$message({
      //         message: '恭喜你，上传成功!',
      //         type: 'success'
      //     });
      // };
      // xhr.send(form);
  },
  },
  watch: {
    mapId(newVal, oldVal) {
      console.info("mapId2", newVal, oldVal);
    }
  },
  mounted() {
    console.info("data", this.$parent.$data);
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

