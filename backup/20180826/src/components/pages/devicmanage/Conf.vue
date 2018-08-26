<template>
  <div>
    <el-dialog v-if="type" width="40%" style="min-height:400px" :title="type" :visible.sync="dialogVisible" append-to-body center>
      <el-form :model="data" label-width="100px" style="max-height:450px;overflow-y:scroll">

        <el-form-item label="设备组别:">
          <span>{{grpIndx}}</span>
        </el-form-item>

        <el-form-item label="模组编号:">
          <el-select v-model="data.mod_indx">
            <el-option v-for="opt in prmmodecfg_list " :label="opt.mod_name" :value="opt.mod_indx" :key="opt.mod_indx">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="模式类型:">
          <el-select v-model="data.typ_code">
            <el-option v-for="opt in modetyp_list" :label="opt.typ_name" :value="opt.typ_code" :key="opt.typ_code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="模式编号:">
          <el-select v-model="data.typ_indx">
            <el-option v-for="opt in modetyp_val" :label="opt.typ_name" :value="opt.typ_indx" :key="opt.typ_indx" placeholder="请先选择模式类型">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="终端编号:">
          <el-select v-model="data.trm_indx">
            <el-option v-for="opt in trm_list" :label="opt.trm_name" :value="opt.trm_indx" :key="opt.trm_indx">
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
      modetyp_list: [],
      modetyp_val_list: [],
      prmmodecfg_list: [],
      trm_list: [],
      modetyp_val: []
    };
  },
  computed: {
    grpIndx() {
      return this.$parent.$data.grpIndx;
    },
    type() {
      return this.$parent.$data.type;
    },
    mod_indx() {
      return this.$parent.$data.mod_indx;
    }
  },
  watch: {
    "data.typ_code": {
      handler(newVal, oldVal) {
        // if (this.type === "添加模组配置") {
        this.modetyp_val = this.modetyp_val_list[newVal];
        // }
      },
      immediate: true
    }
  },
  methods: {
    reset() {
      this.data = {};
      this.modetyp_val = [];
    },
    open() {
      this.dialogVisible = true;
      this.reset();
      this.getData();
    },

    getData() {
      if (this.type === "添加模组配置") {
        console.info("type", this.type);
        axios
          .get("/devtermina/prmmodecfg_add_data", {
            params: {
              grp_indx: this.grpIndx
            }
          })
          .then(data => {
            console.info("添加", data.data);
            this.data.mod_indx = data.data.data.mod_indx;
            this.modetyp_list = data.data.modetyp_list;
            this.modetyp_val_list = data.data.modetyp_val_list;
            this.prmmodecfg_list = data.data.prmmodecfg_list;
            this.trm_list = data.data.trm_list;
          })
          .catch(err => {
            console.error(err);
          });
      } else if (this.type === "编辑模组配置") {
        axios
          .get("/devtermina/prmmodecfg_edit_data", {
            params: {
              grp_indx: this.grpIndx,
              mod_indx: this.mod_indx
            }
          })
          .then(data => {
            console.info("编辑", data.data);
            this.data = data.data.data[0];
            this.modetyp_list = data.data.modetyp_list;
            // this.modetyp_val = data.data.modetyp_val_list;
            this.modetyp_val_list = data.data.modetyp_val_list;
            this.prmmodecfg_list = data.data.prmmodecfg_list;
            this.trm_list = data.data.trm_list;
          })
          .catch(data => {
            // alert(data.data.msg);
          });
        // }
      }
    },
    save() {
      const param = this.data;
      param.grp_indx = this.grpIndx;
      delete param.ctr_name;
      delete param.ROW_NUMBER;

      console.info(param);
      console.info("type", this.type);

      if (this.type === "添加模组配置") {
        axios.post("/devtermina/prmmodecfg_add", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "添加模组配置成功!"
            });
            this.dialogVisible = false;
            this.$emit("confSucc", true);
          }
        });
      } else if (this.type === "编辑模组配置") {
        axios.post("/devtermina/prmmodecfg_edit_save", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "编辑模组配置成功!"
            });
            this.dialogVisible = false;
            this.$emit("confSucc", true);
          }
        });
      }
    }
  }
};
</script>
