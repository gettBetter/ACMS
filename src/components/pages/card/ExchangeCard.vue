<template>
  <div id="exchange-card">
    <el-dialog width="50%" style="min-height:400px" title="换卡" :visible.sync="dialogVisible" append-to-body center>
      <el-row>
        <!-- <el-col :span="8">
          <el-tree :data="treeData" :props="treeProp" ref="areaTree" :expand-on-click-node="false" @check-change="handleCheckChange" highlight-current style="max-height:600px;overflow:scroll" show-checkbox node-key="are_indx">
          </el-tree>
        </el-col> -->
        <!-- <el-col :span="14" :offset="1"> -->
        <el-form :model="data">
          <el-form-item :label-width="formLabelWidth" label="人员编号:">
            <span v-text="data.emp_code"></span>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="人员姓名:">
            <span v-text="data.emp_name"></span>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="所属部门:">
            <span v-text="data.dep_name"></span>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="人员类别:">
            <span v-text="data.rnk_name"></span>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="证件号码:">
            <span v-text="data.crt_code"></span>
          </el-form-item>

          <el-form-item :label-width="formLabelWidth" label="卡序号:">
            <el-input v-model="data.crd_indx"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="卡物理号:">
            <el-input v-model="data.crd_code"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="证卡状态:">
            <el-select v-model="data.sta_indx">
              <el-option v-for="opt in sta_list" :label="opt.sta_name" :value="opt.sta_indx" :key="opt.sta_indx">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="证卡类型:">
            <el-select v-model="data.typ_indx">
              <el-option v-for="opt in type_list" :label="opt.typ_name" :value="opt.typ_indx" :key="opt.typ_indx">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog width="35%" style="min-height:400px" title="手工输入物理卡号" :visible.sync="innerdialogVisible" append-to-body center>>

      <el-form :label-width="formLabelWidth">
        <el-form-item label="物理卡号">
          <el-input v-model="new_crd_code" placeholder="请输入十位数十进制物理卡号"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innersave">确 定</el-button>
        <el-button @click="innerdialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

let card_id = -1;
export default {
  data() {
    return {
      dialogVisible: false,
      innerdialogVisible: false,
      formLabelWidth: "80px",
      // treeData: [],
      // treeProp: {
      //   label: "are_name",
      //   children: "children"
      // },
      data: {},
      exchangeData: {},
      type_list: [],
      sta_list: [],
      areaList: [],
      new_crd_code: "",
      openSucess: false
    };
  },
  methods: {
    openExchange() {
      this.dialogVisible = true;
      this.isExchanged = false;
      // this.getTree();
      const param = {
        crd_indx: this.crdIndx
      };
      this.getData(param);

      console.info("param", param);
    },
    openDev() {
      card_id = WSPCPP.PORT_Open(this.dev_param);

      if (card_id < 0) {
        alert("打开失败，请检测设备连接是否正常");
        return false;
      } else {
        this.$message({
          type: "success",
          message: "打开端口成功!"
        });
        this.openSucess = true;
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      console.info(
        data,
        checked,
        indeterminate,
        this.$refs.areaTree.getCheckedKeys()
      );
      this.areaList = this.$refs.areaTree
        .getCheckedKeys()
        .filter(item => !!item);
    },
    // getTree() {
    //   axios
    //     .get("/card/card_area_config_data")
    //     .then(data => {
    //       console.info("tree", data.data);
    //       this.treeData = data.data.data[0].children;
    //     })
    //     .catch(data => {
    //       alert(data.data.msg);
    //     });
    // },
    getData(param) {
      axios
        .get("/card/card_exchange", { params: param })
        .then(data => {
          console.info("card_exchange", data.data);
          this.data = data.data.data[0];
          this.type_list = data.data.card_type;
          this.sta_list = data.data.card_sta;
          console.info("this.data", this.data);
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    save() {
      //...

      // if (!this.openSucess) {
      //   alert("端口打开失败，请重新打开端口");
      //   return;
      // }
      // let crd_code = "";
      if (this.manualInput) {
        this.$confirm(
          "卡片一经补还，原卡号在系统中将不可用，是否继续？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          this.innerdialogVisible = true;
          this.new_crd_code = "";
        });
      } else {
        // Promise.resolve(this.openDev).then
        if (this.openDev()) {
          this.$confirm(
            "卡片一经补还，原卡号在系统中将不可用，是否继续？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              if (
                confirm(`请放入卡片，点击【确定】进行发卡，点击【取消】退出`)
              ) {
                const resCardId = WSPCPP.Access_CommandBLX(
                  card_id,
                  65535,
                  0x000601,
                  ""
                );
                let crd_code = resCardId;
                WSPCPP.Access_CommandBLX(card_id, 65535, 0x000608, "1,100");
              }
              return Promise.resolve(crd_code);
            })
            .then(crd_code => {
              this.send(crd_code, 0);
            });
        }
      }

      console.info(param);
    },
    innersave() {
      let code = this.new_crd_code;
      if (code.length == 10) {
        this.send(code, 1);
        this.innerdialogVisible = false;
        this.dialogVisible = false;
      } else {
        alert("请检查物理卡号是否为10位十进制");
      }
    },
    send(code, type) {
      const param = this.data;
      delete param.ROW_NUMBER;
      delete param.emp_code;
      delete param.emp_name;
      delete param.dep_name;
      delete param.dep_indx;
      delete param.rnk_name;
      delete param.rnk_indx;
      delete param.dep_indx;
      delete param.crt_code;
      delete param.emp_pswd;
      delete param.sta_name;
      delete param.typ_name;
      param.new_crd_code = code;
      param.card_tag = type;
      axios.post("/card/card_exchange_save", param).then(data => {
        if (data.data.success) {
          this.$message({
            type: "success",
            message: "换卡成功!"
          });
          //   this.$router.go(-1);
          // this.dialogVisible = false;
          this.$emit("exchanged", true);
        }
      });
    }
  },
  computed: {
    crdIndx() {
      return this.$parent.$data.crdIndx;
    },
    dev_param() {
      return this.$parent.$data.dev_param;
    }
  },
  created() {},
  mounted() {
    // console.info("dev_param", this.$parent.$data.dev_param);
  },
  watch: {}
};
</script>

<style>
</style>
