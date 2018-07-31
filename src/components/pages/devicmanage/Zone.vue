<template>
    <div>
        <el-dialog width="40%" style="min-height:400px" :title="zoneType" :visible.sync="dialogVisible" append-to-body center>
            <el-form :model="data" label-width="80px">
                <el-form-item label="设备组别:">
                    <span>{{grpIndx}}</span>
                </el-form-item>

                <el-form-item label="时区编号:">
                    <el-select v-model="data.tzn_indx">
                        <el-option v-for="opt in tzn_list" :label="opt.tzn_name" :value="opt.tzn_indx" :key="opt.tzn_indx">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="段一关联:">
                    <el-select v-model="data.inx_tmr1">
                        <el-option v-for="opt in tmr_list" :label="opt.tmr_name" :value="opt.tmr_indx" :key="opt.tmr_indx">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="段二关联:">
                    <el-select v-model="data.inx_tmr2">
                        <el-option v-for="opt in tmr_list" :label="opt.tmr_name" :value="opt.tmr_indx" :key="opt.tmr_indx">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="段三关联:">
                    <el-select v-model="data.inx_tmr3">
                        <el-option v-for="opt in tmr_list" :label="opt.tmr_name" :value="opt.tmr_indx" :key="opt.tmr_indx">
                        </el-option>
                    </el-select>
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
      tzn_list: [],
      tmr_list: []
    };
  },
  computed: {
    grpIndx() {
      return this.$parent.$data.grpIndx;
    },
    zoneType() {
      return this.$parent.$data.zoneType;
    },
    tznIndx() {
      return this.$parent.$data.tznIndx;
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
      // if (this.type === "添加时段时钟") {
      console.info("zoneType", this.zoneType, this.grpIndx);
      axios
        .get("/timerparam/prmtmrzone_add_data")
        .then(data => {
          console.info("添加", data.data);
          this.tzn_list = data.data.data.prmtmrzone_list;
          this.tmr_list = data.data.data.prmtmrclck_list;
          //   this.data.tzn_indx = data.data.data.tzn_indx;
        })
        .catch(data => {
          alert(data.data.msg);
        });

      if (this.zoneType === "编辑时段时区") {
        axios
          .get("/timerparam/prmtmrzone_edit_data", {
            params: {
              grp_indx: this.grpIndx,
              tzn_indx: this.tznIndx
            }
          })
          .then(data => {
            console.info("编辑", data.data);
            // this.tmr_list = data.data.data;
            this.data = data.data.data[0];
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
      delete param.tmr1_name;
      delete param.tmr2_name;
      delete param.tmr3_name;
      delete param.tzn_name;
      delete param.ROW_NUMBER;
      console.info(param);
      if (this.zoneType === "添加时段时区") {
        axios.post("/timerparam/prmtmrzone_add", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "添加时段时区成功!"
            });
            this.dialogVisible = false;
            this.$emit("addZoneSucc", true);
          }
        });
      } else if (this.zoneType === "编辑时段时区") {
        axios.post("/timerparam/prmtmrzone_edit_save", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "编辑时段时区成功!"
            });
            this.dialogVisible = false;
            this.$emit("addZoneSucc", true);
          }
        });
      }
    }
  }
};
</script>

