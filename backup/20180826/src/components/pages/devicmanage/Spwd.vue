<template>
  <div>
    <el-dialog width="40%" style="min-height:400px" :title="type" :visible.sync="dialogVisible" append-to-body center>
      <el-form :model="data" label-width="100px">
        <el-form-item label="设备组别:">
          <span>{{grpIndx}}</span>
        </el-form-item>
        <el-form-item label="通道编号:">
          <el-select v-model="data.chn_indx">
            <el-option v-for="opt in chn_list" :label="opt.chn_name" :value="opt.chn_indx" :key="opt.chn_indx">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通道名称:">
          <el-input v-model="data.chn_name"></el-input>
        </el-form-item>

        <!-- <el-form-item label="门卫状态:">
                    <el-select v-model="data.chn_stat">
                        <el-option v-for="opt in stat_list" :label="opt.chn_stat_name" :value="opt.chn_stat" :key="opt.chn_stat">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="控制方式:">
                    <el-select v-model="data.ctl_indx">
                        <el-option v-for="opt in ctl_list" :label="opt.ctl_name" :value="opt.ctl_indx" :key="opt.ctl_indx">
                        </el-option>
                    </el-select>
                </el-form-item> -->

        <!-- <el-form-item label="反潜回:">
                    <el-select v-model="data.apb_indx">
                        <el-option v-for="opt in apb_list" :label="opt.apb_name" :value="opt.apb_indx" :key="opt.apb_indx">
                        </el-option>
                    </el-select>
                </el-form-item> -->

        <!-- <el-form-item label="打开延时(s):">
                    <el-input v-model="data.dly_time"></el-input>
                </el-form-item> -->

        <el-form-item label="安全密码:">
          <el-input v-model="data.pin_spwd"></el-input>
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
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false,
      data: {},
      chn_list: [],
      stat_list: [],
      ctl_list: [],
      apb_list: []
    };
  },
  computed: {
    grpIndx() {
      return this.$parent.$data.grpIndx;
    },
    type() {
      return this.$parent.$data.type;
    },
    chn_indx() {
      return this.$parent.$data.chn_indx;
    }
  },
  methods: {
    reset() {
      this.data = {};
    },
    open() {
      this.dialogVisible = true;
      this.reset();
      this.getData();
    },
    getData() {
      if (this.type === "添加安全密码") {
        console.info("type", this.type, this.chn_indx, this.grpIndx);
        axios
          .get("/devchannel/devchannel_add_data", {
            params: {
              grp_indx: this.grpIndx
            }
          })
          .then(data => {
            console.info("添加", data.data);
            this.chn_list = data.data.chn_list;
            this.stat_list = data.data.stat_list;
            this.ctl_list = data.data.ctl_list;
            this.apb_list = data.data.apbctrl_list;
            this.data.chn_indx = data.data.data.chn_indx;
          })
          .catch(data => {
            alert(data.data.msg);
          });
      } else if (this.type === "编辑安全密码") {
        axios
          .get("/devchannel/devchannel_edit_data", {
            params: {
              grp_indx: this.grpIndx,
              chn_indx: this.chn_indx
            }
          })
          .then(data => {
            console.info("编辑", data.data);
            this.data = data.data.data[0];
            this.chn_list = data.data.chn_list;
            this.stat_list = data.data.stat_list;
            this.ctl_list = data.data.ctl_list;
            this.apb_list = data.data.apbctrl_list;
          })
          .catch(data => {
            alert(data.data.msg);
          });
        // }
      }
    },
    save() {
      const param = this.data;
      param.grp_indx = this.grpIndx;
      // delete param.chn_name;
      delete param.chn_stat_name;
      delete param.ctl_name;
      delete param.apb_name;
      delete param.ROW_NUMBER;
      console.info(param);
      console.info("type", this.type);
      if (this.type === "添加安全密码") {
        axios.post("/devchannel/devchannel_add", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "添加安全密码成功!"
            });
            this.dialogVisible = false;
            this.$emit("channelSucc", true);
          }
        });
      } else if (this.type === "编辑安全密码") {
        axios.post("/devchannel/devchannel_edit_save", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "编辑安全密码成功!"
            });
            this.dialogVisible = false;
            this.$emit("channelSucc", true);
          }
        });
      }
    }
  }
};
</script>

