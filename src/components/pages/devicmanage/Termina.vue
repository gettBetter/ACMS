<template>
  <div>
    <el-dialog v-if="type" width="60%" style="min-height:400px" :title="type" :visible.sync="dialogVisible" append-to-body center>
      <el-form :model="data" label-width="100px">
        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item label="设备组别:">
              <span>{{grpIndx}}</span>
            </el-form-item>
            <el-form-item label="终端编号:">
              <el-select v-model="data.trm_indx">
                <el-option v-for="opt in termina_list" :label="opt.trm_name" :value="opt.trm_indx" :key="opt.trm_indx" @>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="终端名称:">
              <el-input v-model="data.trm_name"></el-input>
            </el-form-item>

            <el-form-item label="关联通道:">
              <el-select v-model="data.chn_indx">
                <el-option v-for="opt in channel_list" :label="opt.chn_name" :value="opt.chn_indx" :key="opt.chn_indx">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="扩展功能:">
              <el-checkbox v-for="item in extList" :key="item.key" v-model="item.val">{{item.label}}</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="启用密码开门">
              <el-checkbox v-model="data.pkb_isok"></el-checkbox>
            </el-form-item>

            <el-form-item v-for="n in 4" :key="n" :label="'密码组'+n">
              <el-input v-model="data['pkb_key'+n]" :disabled="enableIsok"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
      termina_list: [],
      channel_list: [],
      extList: [
        {
          key: "att_isok",
          val: false,
          label: "是否考勤"
        },
        {
          key: "con_isok",
          val: false,
          label: "次计就餐"
        },
        {
          key: "oep_isok",
          val: false,
          label: "在线巡逻"
        },
        {
          key: "met_isok",
          val: false,
          label: "会议签到"
        }
      ],
      revertFields: [
        "pkb_isok",
        "att_isok",
        "con_isok",
        "oep_isok",
        "met_isok"
        // "pkb_key1",
        // "pkb_key2",
        // "pkb_key3",
        // "pkb_key4"
      ]
    };
  },
  computed: {
    grpIndx() {
      console.info("111", this.$parent.$data);
      return this.$parent.$data.grpIndx;
    },
    type() {
      return this.$parent.$data.type;
    },
    trm_indx() {
      return this.$parent.$data.trm_indx;
    },
    enableIsok() {
      return !Number(this.data.pkb_isok);
    }
    // chn_indx() {
    //   return this.$parent.$data.chn_indx;
    // }
  },
  methods: {
    reset() {
      this.data = {};
      //   this.enableIsok = false;
      this.extList = [
        {
          key: "att_isok",
          val: false,
          label: "是否考勤"
        },
        {
          key: "con_isok",
          val: false,
          label: "次计就餐"
        },
        {
          key: "oep_isok",
          val: false,
          label: "在线巡逻"
        },
        {
          key: "met_isok",
          val: false,
          label: "会议签到"
        }
      ];
    },
    open() {
      this.dialogVisible = true;
      this.reset();
      this.getData();
    },
    getData() {
      //   if (this.type === "添加终端卡机") {
      console.info("type", this.type, this.trm_indx, this.grpIndx);
      axios
        .get("/devtermina/devtermina_add_data", {
          params: {
            grp_indx: this.grpIndx
          }
        })
        .then(data => {
          console.info("添加", data.data);
          this.data.trm_indx = data.data.data.tmr_indx;
          this.termina_list = data.data.termina_list;
          this.channel_list = data.data.channel_list;
        })
        .catch(data => {
          alert(data.data.msg);
        });
      //   } else
      if (this.type === "编辑终端卡机") {
        console.info("编辑终端卡机");
        axios
          .get("/devtermina/devtermina_edit_data", {
            params: {
              grp_indx: this.grpIndx,
              trm_indx: this.trm_indx
            }
          })
          .then(data => {
            console.info("编辑", data.data);
            // this.data = data.data.data
            let temp = data.data.data[0];

            // temp.forEach(item => {
            for (let p in temp) {
              if (this.revertFields.includes(p)) {
                temp[p] = this.revertData(temp[p]);
              }
            }
            // pkb_key1
            this.data = temp;
            console.info("temp", this.data);
            // });
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

      console.info("checkbox", this.extList);
      this.extList.forEach(item => {
        param[item.key] = item.val ? "1" : "0";
      });

      delete param.trm_indx_name;
      delete param.chn_name;
      delete param.ROW_NUMBER;
      console.info(param);
      console.info("type", this.type);
      if (this.type === "添加终端卡机") {
        axios.post("/devtermina/devtermina_add", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "添加终端卡机成功!"
            });
            this.dialogVisible = false;
            this.$emit("terminaSucc", true);
          }
        });
      } else if (this.type === "编辑终端卡机") {
        axios.post("/devtermina/devtermina_edit_save", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "编辑终端卡机成功!"
            });
            this.dialogVisible = false;
            this.$emit("terminaSucc", true);
          }
        });
      }
    },
    revertData(input) {
      if (input === "1") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

