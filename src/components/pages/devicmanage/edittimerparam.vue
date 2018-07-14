<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑门禁时段</span>
      </div>

      <el-form :model="editData">
        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="时段名称:">
              <el-input v-model="editData.tmr_name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="下一时段:">
              <el-input v-model="editData.mr_next"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="开始日期:">
              <el-date-picker v-model="editData.bgn_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="结束日期:">
              <el-date-picker v-model="editData.end_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="开始时段一:">
              <el-time-picker v-model="editData.bgn_tmr1" placeholder="选择时间">
              </el-time-picker>
            </el-form-item>

          </el-col>

          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="结束时段一:">
              <el-time-picker v-model="editData.end_tmr1" placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="开始时段二:">
              <el-time-picker v-model="editData.bgn_tmr2" placeholder="选择时间">
              </el-time-picker>
            </el-form-item>

          </el-col>

          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="结束时段二:">
              <el-time-picker v-model="editData.end_tmr2" placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="开始时段三:">
              <el-time-picker v-model="editData.bgn_tmr3" placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item :label-width="formLabelWidth" label="结束时段三:">
              <el-time-picker v-model="editData.end_tmr3" placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" :offset="1">
            <div>
              <div class="itemclass">
                <el-checkbox @change="checkWeek" v-model="weekCtr">星期控制</el-checkbox>
              </div>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedWeek" @change="checkWeek2">
                <el-checkbox v-for="item in week" :label="item.id" :key="item.name" :disabled="!weekCtr">{{item.name}} </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="text-align:center;margin-top:40px;margin-bottom:20px">
        <el-button class="submit-btn" type="primary" @click="save">确定</el-button>
        <el-button class="cancel-btn" @click="cancel">取消</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formLabelWidth: "20%",
      editData: {},
      weekCtr: false,
      checkedWeek: [],
      week: [
        {
          id: 1,
          name: "星期一"
        },
        {
          id: 2,
          name: "星期二"
        },
        {
          id: 3,
          name: "星期三"
        },
        {
          id: 4,
          name: "星期四"
        },
        {
          id: 5,
          name: "星期五"
        },
        {
          id: 6,
          name: "星期六"
        },
        {
          id: 7,
          name: "星期天"
        }
      ],
      tmrWeek: ""
    };
  },
  methods: {
    checkWeek(val) {},
    checkWeek2(node) {
      console.info("2", node);
    },
    getEditData() {
      const param = {
        tmr_indx: this.$route.params.id
      };

      axios.get("/timerparam/timerparam_edit_data", { params: param }).then(
        data => {
          if (data.data.success === true) {
            console.info(data.data);
            this.editData = data.data.data[0];
            let weeks = [...data.data.data[0].tmr_week];

            this.weekCtr = weeks.includes("1");
            if (weeks.length === 8) {
              if (weeks.pop() == 1) {
                this.weekCtr = false;
              }
            }
            this.checkedWeek = weeks.map((item, key) => {
              if (item == 1) {
                return key + 1;
              }
            });
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    save() {
      this.tmrWeek = "";
      const param = this.editData;
      delete param.ROW_NUMBER;

      let len = 7;
      for (let i = 1; i <= len; i++) {
        if (this.checkedWeek.includes(i)) {
          this.tmrWeek += "1";
        } else {
          this.tmrWeek += "0";
        }
      }
      if (this.weekCtr) {
        this.tmrWeek += "0";
      } else {
        this.tmrWeek += "1";
      }
      param.tmr_week = this.tmrWeek;
      console.info(param, this.tmrWeek);
      axios.post("/timerparam/timerparam_edit_save", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          this.$router.go(-1);
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  computed: {},
  activated() {
    this.editData = {};
    this.weekCtr = false;
    this.checkedWeek = [];
    this.getEditData();
  }
};
</script>

<style >
.block {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.submit-btn,
.cancel-btn {
  width: 160px;
}
.el-select,
.el-date-editor.el-input,
.el-date-editor.el-input__inne {
  width: 100%;
}
.itemclass {
  background-color: #f3f3f3;
  padding-left: 10px;
  margin-top: 10px;
  width: 80%;
}

.el-form-item__content {
  text-align: left;
  /* float: left; */
}
.el-form-item__label {
  text-align: left;
}
</style>


