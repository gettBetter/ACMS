<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加用户</span>
      </div>
      <el-form :model="userInfo" ref="userInfo" :rules="rules">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="用户编号：" prop="emp_code">
                  <el-input v-model="userInfo.emp_code"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="所属部门：" prop="dep_indx">
                  <el-row>
                    <el-col :span="17">
                      <el-input v-model="userInfo.dep_indx" v-if="false"></el-input>
                      <span>{{userInfo.dep_name}}
                      </span>
                    </el-col>
                    <el-col :span="6" ::offset="1">
                      <el-button type="text" @click="getDepTree">选择部门</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="用户姓名：" prop="emp_name">
                  <el-input v-model="userInfo.emp_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="人员昵称：">
                  <el-input v-model="userInfo.emp_nick"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="性别：" prop="gdr_indx">
                  <el-select v-model="userInfo.gdr_indx">
                    <el-option v-for="opt in userData.gender_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="婚姻状况：">
                  <el-select v-model="userInfo.mrg_indx">
                    <el-option v-for="opt in userData.marry_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="证件类型：">
                  <el-select v-model="userInfo.crt_indx">
                    <el-option v-for="opt in userData.cardbit_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="证件号码：">
                  <el-input v-model="userInfo.crt_code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="政治面貌：">
                  <el-select v-model="userInfo.prt_indx">
                    <el-option v-for="opt in userData.party_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="最高学历：">
                  <el-select v-model="userInfo.dgr_indx">
                    <el-option v-for="opt in userData.degree_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="出生日期：">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="userInfo.brt_date" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="籍贯：">
                  <el-select v-model="userInfo.ntv_indx">
                    <el-option v-for="opt in userData.native_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>

              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="民族：">
                  <el-select v-model="userInfo.ntn_indx">
                    <el-option v-for="opt in userData.nation_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="语言能力：">
                  <el-select v-model="userInfo.lgg_indx">
                    <el-option v-for="opt in userData.language_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="联系电话：">
                  <el-input v-model="userInfo.tel_code" type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="联系地址：">
                  <el-input v-model="userInfo.tel_code"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="职务类别：">
                  <el-select v-model="userInfo.rnk_indx">
                    <el-option v-for="opt in userData.rank_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="职位等级：">
                  <el-select v-model="userInfo.dty_indx">
                    <el-option v-for="opt in userData.duty_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="合同开始时间：">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="userInfo.beg_date" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="合同结束时间：">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="userInfo.end_date" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="试用到期：">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="userInfo.try_date" type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="在职状态：">
                  <el-select v-model="userInfo.est_indx">
                    <el-option v-for="opt in userData.empstat_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="是否管理员：">
                  <el-select v-model="userInfo.usr_isok ">
                    <el-option value="1" label="是">
                    </el-option>
                    <el-option value="0" label="否">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="用户密码：" prop="emp_pswd">
                  <el-input v-model="userInfo.emp_pswd" type="password"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-col>

          <el-col :span="5" :offset="1">
            <div style="margin-left:50px;margin-bottom:10px">用户头像</div>
            <div>
              <img :src="imageUrl" :style="imgStyle" />
            </div>
            <input type="file" name="map_file" id="file" @change="uploadChange">
          </el-col>
        </el-row>
      </el-form>

      <el-row style="text-align: center; padding: 30px 0">
        <el-button class="submit-btn" type="primary" @click="submit('userInfo')">确定</el-button>
        <el-button class="cancel-btn" @click="cancel">取消</el-button>
      </el-row>

      <el-dialog width="40%" min-height="200px" title="选择部门" :visible.sync="treeVisible" append-to-body>
        <el-tree :data="depTreeData" :props="treeProp" highlight-current accordion @node-click="handleNodeClick">
        </el-tree>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
// import _ from "lodash";

export default {
  data() {
    return {
      treeProp: {
        label: "dep_name",
        children: "children"
      },
      formLabelWidth: "120px",
      treeVisible: false,
      userData: {},
      userInfo: {},
      depTreeData: [],
      imageUrl: "",
      imgStyle: {
        width: "178px",
        height: "178px",
        border: "1px solid #ccc",
        overflow: "hidden"
      },
      emp_phot: "",
      rules: {
        emp_code: [
          { required: true, message: "用户编码不得为空", trigger: "blur" }
        ],
        emp_name: [
          { required: true, message: "用户姓名不得为空", trigger: "blur" }
        ],
        emp_pswd: [
          { required: true, message: "用户密码不得为空", trigger: "blur" }
        ],
        dep_indx: [
          { required: true, message: "所属部门不得为空", trigger: "blur" }
        ],
        gdr_indx: [{ required: true, message: "性别不得为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    getUserData() {
      axios
        .get("/user/user_add_data")
        .then(data => {
          if (data.data.success == true) {
            this.userData = data.data;
            // this.userInfo = data.data.
            this.userInfo.est_indx = this.userInfo.est_indx
              ? this.userInfo.est_indx
              : this.userData.empstat_list[0].bas_indx;
          }
        })
        .catch(err => alert(err));
    },
    getDepTree() {
      axios.get("/index/dept_tree").then(
        data => {
          if (data.data.success == true) {
            // resolve(data);
            this.depTreeData = data.data.deptree;
            this.treeVisible = true;
          }
        },
        data => alert("System Error")
      );
    },
    handleNodeClick(node) {
      // console.info(node);
      this.userInfo.dep_indx = node.dep_indx;
      this.userInfo.dep_name = node.dep_name;
      this.treeVisible = false;
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = this.userInfo;
          delete param.ROW_NUMBER;
          let url = this.url;
          let oMyForm = new FormData();
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          for (let p in param) {
            if (!p.includes("name")) {
              oMyForm.set(p, param[p]);
            }
          }

          oMyForm.set("emp_name", param.emp_name);
          oMyForm.set("emp_phot", this.emp_phot);
          console.info("oMyForm", oMyForm, param, oMyForm.get("emp_name"));
          axios
            .post(url, oMyForm, config)
            .then(data => {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$router.go(-1);
            })
            .catch(err => alert(err));
          // axios
          //   .post("/user/user_add", params)
          //   .then(data => {
          //     if (data.data.success) {
          //       this.$message({
          //         type: "success",
          //         message: "添加成功!"
          //       });
          //       this.$router.go(-1);
          //     }
          //   })
          //   .catch(err => alert(err));
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    uploadChange(e) {
      const file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.emp_phot = file;
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
  computed: {
    token() {
      return JSON.parse(localStorage.userToken).token;
    },
    username() {
      return JSON.parse(localStorage.userToken).username;
    },
    url() {
      return `http://203.195.236.217:9000/admin/user/user_add/token/${
        this.token
      }/username/${this.token}`;
    }
  },
  activated() {
    this.userData = {};
    this.userInfo = {};
    this.$refs.userInfo.resetFields();
    this.getUserData();
  }
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.container {
  height: 100%;
}
.el-card__header span {
  line-height: 27px;
}
.box-card {
  width: 100%;
}

.el-card__header span {
  line-height: 27px;
}
.el-form-item__content {
  text-align: left;
  /* float: left; */
}
.el-dialog {
  min-height: 280px;
  /* max-height: 680px; */
}
.el-main {
  line-height: 0;
}
.el-select,
.el-date-editor.el-input,
.el-date-editor.el-input__inne {
  width: 100%;
}
.el-form-item__label {
  text-align: left;
}
.submit-btn,
.cancel-btn {
  width: 160px;
}
</style>

