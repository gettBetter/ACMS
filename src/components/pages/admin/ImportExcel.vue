<template>
  <div>
    <el-dialog width="40%" style="min-height:400px" title="导入" :visible.sync="dialogVisible" append-to-body center>
      <!-- <el-button type="text" @click="downloadTemplate">下载模板</el-button> -->
      <a href="/static/template.xlsx" download="template">下载模板</a>
      <el-form :model="data" label-width="80px" style="max-height:450px;overflow-y:scroll">

        <el-form-item label="上传文件:">
          <input type="file" name="user_excel" id="file" @change="uploadChange">
          <!-- <div>只能上传jpg/png文件，且不超过5M</div> -->
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
// import { mapState, mapMutations } from "vuex";
import axios from "axios";
import baseURL from "@/utils/baseURL";

export default {
  data() {
    return {
      baseURL,
      url,
      dialogVisible: false,
      data: {},
      fileList: [],
      user_excel: ""
    };
  },
  computed: {
    token() {
      return JSON.parse(localStorage.userToken);
    },
    actionUrl() {
      return `${this.baseURL}/user/user_importexecl/token/${
        this.token.token
      }/username/${this.token.username}`;
    }
    // ...mapState(["mapId"])
  },
  methods: {
    reset() {},

    open() {
      this.dialogVisible = true;
    },

    save() {
      console.info(typeof this.user_excel);
      const url = this.actionUrl;
      let oMyForm = new FormData();

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      if ("lastModified" in this.user_excel) {
        oMyForm.append("user_excel", this.user_excel);
      } else {
        alert("请选择文件");
        return;
      }

      axios
        .post(url, oMyForm, config)
        .then(data => {
          if (data.data.success) {
            if (data.data.msg != "ok") {
              this.$message({
                type: "error",
                message: data.data.msg
              });
            } else {
              this.$message({
                type: "sucess",
                message: "导入成功"
              });
              this.dialogVisible = false;
            }

            this.$emit("importSuccess", true);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    uploadChange(e) {
      console.info("e", e.target.files, e.target.value);
      const file = e.target.files[0];
      this.user_excel = file;
    }
  },
  mounted() {
    console.info("baseURL", baseURL, this.templateURL);
  }
};
</script>