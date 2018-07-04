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
                        <!-- <el-form-item :label-width="formLabelWidth" label="菜单权限："> -->
                        <div>
                            <div class="itemclass">

                                <el-checkbox @change="checed=>checkWeek(checed,checkedWeek)" v-model="checkedWeek">星期控制</el-checkbox>
                            </div>

                            <div style="margin: 15px 0;"></div>

                            <el-checkbox-group v-model="checkedWeek2" @change="checkWeek2">
                                <el-checkbox v-for="item in week" :label="item.id" :key="item.name">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <!-- </el-form-item> -->
                    </el-col>
                </el-row>
            </el-form>
            <el-row style="text-align:center;margin-top:40px;margin-bottom:20px">
                <el-button class="submit-btn" type="primary" @click="save">确定</el-button>
                <el-button class="cancel-btn" @click="cancel">取消</el-button>
            </el-row>
            <!-- <el-table :data="list" border>
                <el-table-column prop="tmr_week" label="星期设置"></el-table-column>
                <el-table-column prop="tmr_week2" label="星期设置"></el-table-column>
            </el-table> -->
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
      checkedWeek: false,
      checkedWeek2: [],
      week: [],
      tmrWeek2: ""
    };
  },
  methods: {
    checkWeek(val1, val2) {
      console.info("1", val1, val2);
    },
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
            let week2 = [...data.data.data[0].tmr_week2];
            if (week2.length < 8) {
              if (week2.length < 7) {
                while (week2.length < 7) {
                  week2.push("0");
                }
              }
              //   this.week = week2;
              this.week = week2.map((val, key) => {
                return {
                  id: key + 1,
                  name: [
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六",
                    "星期天"
                  ][key]
                };
              });
              this.checkedWeek2 = week2
                .map((item, key) => {
                  if (!!parseInt(item)) {
                    return key + 1;
                  }
                })
                .filter(item => !!item);
            } else if (week2.length === 8) {
              this.checkedWeek = true;
              week2.pop();
              this.week = week2.map((val, key) => {
                return {
                  id: key + 1,
                  name: [
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六",
                    "星期天"
                  ][key]
                };
              });
              this.checkedWeek2 = week2
                .map((item, key) => {
                  if (!!parseInt(item)) {
                    return key + 1;
                  }
                })
                .filter(item => !!item);
            }
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    save() {
      this.tmrWeek2 = "";
      const param = this.editData;
      delete param.ROW_NUMBER;
      //   delete param.p_are_name;

      let len = this.checkedWeek2.sort((a, b) => a - b)[
        this.checkedWeek2.length - 1
      ];
      if (this.checkedWeek) {
        len = 8;
      }
      for (let i = 1; i <= len; i++) {
        if (this.checkedWeek2.includes(i)) {
          this.tmrWeek2 += "1";
        } else {
          this.tmrWeek2 += "0";
        }
      }
      param.tmr_week2 = this.tmrWeek2;
      console.info(param);
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
    this.checkedWeek = false;
    this.checkedWeek2 = [];
    this.week = [];
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


