<template>
  <div>
    <el-dialog v-if="type" width="60%" style="min-height:400px" :title="type" :visible.sync="dialogVisible" append-to-body center>
      <el-form :model="data" label-width="100px">
        <el-row>
          <el-col :span="7" :offset="1">
            <el-form-item label="设备组别:">
              <span>{{grpIndx}}</span>
            </el-form-item>
            <el-form-item label="模组编码:">
              <el-select v-model="data.mod_indx">
                <el-option v-for="opt in mod_list" :label="opt.mod_name" :value="opt.mod_indx" :key="opt.mod_indx">
                </el-option>
              </el-select>
            </el-form-item>

          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="接点状态">
            </el-form-item>
            <el-form-item :label=" n <10 ?'信道0'+n+':' : '信道'+n+':'" v-for="n in 16" :key="n">
              <el-select v-model="rly_code['data'+n]">
                <el-option v-for="opt in rlystat_list" :label="opt.rly_name" :value="opt.rly_code" :key="opt.rly_code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7" :offset="1">
            <el-form-item label="动作状态">
            </el-form-item>
            <el-form-item :label=" n <10 ?'信道0'+n+':' : '信道'+n+':'" v-for="n in 16" :key="n">
              <el-select v-model="act_code['data'+n]">
                <el-option v-for="opt in actstat_list" :label="opt.act_name" :value="opt.act_code" :key="opt.act_code">
                </el-option>
              </el-select>
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
      actstat_list: [],
      mod_list: [],
      rlystat_list: [],
      rly_code: {},
      act_code: {}
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
  methods: {
    reset() {
      this.data = {};
    },
    open() {
      this.dialogVisible = true;
      this.reset();
      this.getData();
    },
    revertGet(data) {
      let ret = {};
      let tempArr = data.split("");
      tempArr.forEach((item, idx) => {
        ret["data" + (idx + 1)] = item + "";
      });
      return ret;
    },
    revertPost(data) {
      let ret = "";
      for (let p in data) {
        ret += data[p];
      }
      console.info(ret);
      return ret;
    },
    getData() {
      if (this.type === "添加模组端口") {
        console.info("type", this.type);
        axios
          .get("/devtermina/prmtrmmods_add_data", {
            params: {
              grp_indx: this.grpIndx
            }
          })
          .then(data => {
            console.info("添加", data.data);
            this.data = data.data.data;
            this.actstat_list = data.data.actstat_list;
            this.mod_list = data.data.mod_list;
            this.rlystat_list = data.data.rlystat_list;
            this.rly_code = this.revertGet("0000000000000000");
            this.act_code = this.revertGet("0000000000000000");
          })
          .catch(err => {
            console.error(err);
          });
      } else if (this.type === "编辑模组端口") {
        axios
          .get("/devtermina/prmtrmmods_edit_data", {
            params: {
              grp_indx: this.grpIndx,
              mod_indx: this.mod_indx
            }
          })
          .then(data => {
            console.info("编辑", data.data);
            let temp = data.data.data[0];
            this.data = temp;
            this.actstat_list = data.data.actstat_list;
            this.mod_list = data.data.mod_list;
            this.rlystat_list = data.data.rlystat_list;
            this.rly_code = this.revertGet(temp.rly_code);
            this.act_code = this.revertGet(temp.act_code);
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
      param.rly_code = this.revertPost(this.rly_code);
      param.act_code = this.revertPost(this.act_code);
      delete param.mod_indx_name;
      delete param.ROW_NUMBER;
      console.info(param);
      console.info("type", this.type);
      if (this.type === "添加模组端口") {
        axios.post("/devtermina/prmtrmmods_add", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "添加模组端口成功!"
            });
            this.dialogVisible = false;
            this.$emit("modelsSucc", true);
          }
        });
      } else if (this.type === "编辑模组端口") {
        axios.post("/devtermina/prmtrmmods_edit_save", param).then(data => {
          if (data.data.success) {
            this.$message({
              type: "success",
              message: "编辑模组端口成功!"
            });
            this.dialogVisible = false;
            this.$emit("modelsSucc", true);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
</style>

