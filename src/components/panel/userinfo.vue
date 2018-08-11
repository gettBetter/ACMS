<template>
  <div id="useri">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑用户</span>
      </div>
      <el-form :model="userInfo">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="用户ID：">
                  <span>{{userInfo.emp_indx}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="用户编号：">
                  <span>{{userInfo.emp_code}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="用户姓名：">
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
                <el-form-item :label-width="formLabelWidth" label="性别：">
                  <el-select v-model="userInfo.gdr_indx">
                    <el-option v-for="opt in userEditData.gender_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="所属部门：">
                  <el-row>
                    <el-col :span="17">
                      <el-input v-model="userInfo.dep_indx" v-if="false"></el-input>
                      <span>{{userInfo.dep_name}}
                      </span>
                    </el-col>
                    <el-col :span="6" ::offset="1">
                      <el-button type="text" @click="openDepTree">选择部门</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="证件类型：">
                  <el-select v-model="userInfo.crt_indx">
                    <el-option v-for="opt in userEditData.cardbit_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
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
                <el-form-item :label-width="formLabelWidth" label="婚姻状况：">
                  <el-select v-model="userInfo.mrg_indx">
                    <el-option v-for="opt in userEditData.marry_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="最高学历：">
                  <el-select v-model="userInfo.dgr_indx">
                    <el-option v-for="opt in userEditData.degree_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
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
                <el-form-item :label-width="formLabelWidth" label="政治面貌：">

                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="籍贯：">
                  <el-select v-model="userInfo.ntv_indx">
                    <el-option v-for="opt in userEditData.native_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="民族：">
                  <el-select v-model="userInfo.ntn_indx">
                    <el-option v-for="opt in userEditData.nation_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
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
                <el-form-item :label-width="formLabelWidth" label="语言能力：">
                  <el-select v-model="userInfo.lgg_indx">
                    <el-option v-for="opt in userEditData.language_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="23" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="联系地址：">
                  <el-input v-model="userInfo.tel_code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="职务类别：">
                  <el-select v-model="userInfo.rnk_indx">
                    <el-option v-for="opt in userEditData.rank_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="职位等级：">
                  <el-select v-model="userInfo.dty_indx">
                    <el-option v-for="opt in userEditData.duty_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
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
                    <el-option v-for="opt in userEditData.empstat_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="用户角色：">
                  <el-select v-model="userInfo.role_name">
                    <el-option v-for="opt in userEditData.role_list" :label="opt.bas_name" :value="opt.bas_indx" :key="opt.bas_indx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="用户密码：">
                  <el-input v-model="userInfo.emp_pswd" type="password"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- <el-row>
              <el-col :span="11" :offset="1">
                <el-form-item :label-width="formLabelWidth" label="注册时间：">
                  <span>{{userInfo.reg_time}}</span>
                </el-form-item>
              </el-col>
            </el-row> -->
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
        <el-button class="submit-btn" type="primary" @click="submit">确定</el-button>
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
export default {
  data() {
    return {
      treeProp: {
        label: "dep_name",
        children: "children"
      },
      depCn: "",
      // imageUrls: "",
      imageUrl: "",
      formLabelWidth: "120px",
      treeVisible: false,
      userEditData: {},
      depTreeData: [],
      userInfo: {},
      originalData: {},
      userId: "",
      imgStyle: {
        width: "178px",
        height: "178px",
        border: "1px solid #ccc",
        overflow: "hidden"
      },
      emp_phot: ""
    };
  },
  methods: {
    getUserEditData(param) {
      return new Promise(resolve => {
        this.$get("/user/user_edit_data", param).then(
          data => {
            if (data.success == true) {
              resolve(data);
            } else {
              alert(data.msg);
            }
          },
          data => alert("System Error")
        );
      });
    },
    getDepTree() {
      return new Promise(resolve => {
        this.$get("/index/dept_tree").then(
          data => {
            if (data.success == true) {
              resolve(data);
            } else {
              alert(data.msg);
            }
          },
          data => alert("System Error")
        );
      });
    },
    handleNodeClick(node) {
      console.info(node);
      this.userInfo.dep_name = node.dep_name;
      this.userInfo.dep_indx = node.dep_indx;
      console.info(this.userInfo);
      this.treeVisible = false;
    },
    getDiffer(newData, oldData) {
      const differ = {};
      for (let p in newData) {
        if (newData[p] != oldData[p]) {
          differ[p] = newData[p];
        }
      }
      return differ;
    },
    openDepTree() {
      this.getDepTree().then(data => {
        this.depTreeData = data.deptree;
      });
      this.treeVisible = true;
    },
    submit() {
      const param = this.userInfo;
      delete param.ROW_NUMBER;
      delete param.role_id;
      let url = this.url;
      let oMyForm = new FormData();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      console.info(param);
      for (let p in param) {
        if (!p.includes("name")) {
          if (param[p] === null) {
            param[p] = "";
          }
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
            message: "编辑成功!"
          });
          this.$router.go(-1);
        })
        .catch(err => alert(err));
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
      return `http://203.195.236.217:9000/admin/user/user_edit_save/token/${
        this.token
      }/username/${this.username}`;
    }
  },
  activated() {
    this.userId = this.$route.params.userId;
    this.userInfo = {};
    this.imageUrl = `http://203.195.236.217:9000/admin/index/show_image/emp_indx/${
      this.userId
    }`;
    this.userEditData = [];
    this.getUserEditData({ emp_indx: this.userId }).then(data => {
      this.userInfo = data.user_info[0];
      this.userEditData = data;
      this.originalData = JSON.parse(JSON.stringify(data.user_info[0]));
    });
  }
};
</script>
