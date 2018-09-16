<template>
  <el-dialog width="70%" style="min-height:400px" title="发卡" :visible.sync="dialogVisible" append-to-body center>
    <el-row :gutter="20">
      <el-col :span="8">
        <div style="margin-bottom:20px">区域</div>
        <el-tree :data="treeData" :props="treeProp" ref="areaTree" :expand-on-click-node="false" @check-change="handleCheckChange" highlight-current style="max-height:600px;overflow:scroll" show-checkbox node-key="are_indx">
        </el-tree>
      </el-col>
      <el-col :span="14" :offset="1">
        <el-form :model="data">
          <el-form-item :label-width="formLabelWidth" label="证卡类型:">
            <el-select v-model="data.typ_indx">
              <el-option v-for="opt in type_list" :label="opt.typ_name" :value="opt.typ_indx" :key="opt.typ_indx">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="收工本费:">
            <el-input type="number" v-model="data.inc_cost">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="退工本费:">
            <el-input type="number" v-model="data.exp_cost">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="到期时间:">
            <el-date-picker value-format="yyyy-MM-dd" v-model="data.end_date" type="date">
            </el-date-picker>
          </el-form-item>

          <el-form-item :label-width="formLabelWidth" label="">
            <el-checkbox v-model="manualInput">手工输入物理卡号</el-checkbox>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
    <!-- @setCardId="setCardId" -->
    <ManulInput ref="cardInput" :userList="user_list"></ManulInput>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import _ from "lodash";
import "../../../assets/iconfont/iconfont.css";
import ManulInput from "./ManulInput";
import { mapMutations } from "vuex";

let card_id = -1;
export default {
  components: { ManulInput },
  data() {
    return {
      dialogVisible: false,
      treeData: [],
      treeProp: {
        label: "are_name",
        children: "children"
      },
      data: {
        typ_indx: "1",
        inc_cost: 0,
        exp_cost: 0,
        end_date: "2099-12-31"
      },
      formLabelWidth: "80px",
      type_list: [],
      are_list: [],
      manualInput: false,
      // manulSucc: false,
      user_lists: [],
      openSucess: false
    };
  },
  computed: {
    user_list() {
      return this.$parent.$data.user_list;
    },
    dev_param() {
      return this.$parent.$data.dev_param;
    }
  },
  methods: {
    ...mapMutations(["setCardParam"]),
    openConfig() {
      this.dialogVisible = true;
      this.getTree();
      this.openDev();
    },
    openDev() {
      card_id = WSPCPP.PORT_Open(this.dev_param);

      if (card_id < 0) {
        alert("打开失败，请检测设备连接是否正常");
      } else {
        this.$message({
          type: "success",
          message: "打开端口成功!"
        });
        this.openSucess = true;
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      this.areaList = this.$refs.areaTree
        .getCheckedKeys()
        .filter(item => !!item);
      console.info(this.areaList);
    },
    getTree() {
      axios
        .get("/card/card_area_config_data")
        .then(data => {
          console.info("tree", data.data);
          this.treeData = data.data.data[0].children;
          this.type_list = data.data.type_list;
        })
        .catch(err => {
          console.info(err);
          // alert(data.data.msg);
        });
    },
    // param.user_list[i].crd_code = resCardId;
    // setCardId(val){
    //   this.user_lists = val
    //   this.manulSucc = true
    // },
    save() {
      if (!this.openSucess) {
        alert("端口打开失败，请重新打开端口");
        return;
      }

      const param = this.data;

      param.are_list = this.are_list;

      const count = this.user_list.length;
      if (this.manualInput) {
        // this.manulSucc = false
        this.$confirm(`发卡人数：${count}，确定发卡？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.setCardParam(param);
          this.$refs.cardInput.open();
        });
      } else {
        const users = this.user_list.map(item => {
          // delete item.emp_name;
          return {
            emp_indx: item.emp_indx,
            crd_code: item.crd_code
          };
        });
        param.user_list = users;
        param.card_tag = 1;
        this.$confirm(`发卡人数：${count}，确定发卡？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            for (let i = 0; i < count; i++) {
              if (
                confirm(`请放入卡片，点击【确定】进行发卡，点击【取消】退出`)
              ) {
                console.info(i);
                const resCardId = WSPCPP.Access_CommandBLX(
                  card_id,
                  65535,
                  0x000601,
                  ""
                );
                param.user_list[i].crd_code = resCardId;
                WSPCPP.Access_CommandBLX(card_id, 65535, 0x000608, "1,100");
              }
            }
            return Promise.resolve();
          })
          .then(() => {
            console.info("send1");
            this.send(param);
          });
      }
    },
    send(param) {
      console.info("send2");
      axios
        .post("/card/card_add", param)
        .then(data => {
          this.dialogVisible = false;
          if (data.data.success) {
            if (data.data.msg == "ok") {
              this.$message({
                type: "success",
                message: "发卡成功!"
              });
              // if (!this.manualInput){
              WSPCPP.Port_Close(card_id);
              // }

              this.$emit("config", true);
            } else {
              this.$message.error(data.data.msg);
            }
          } else {
            this.$message.error(data.data.msg);
          }
        })
        .catch(err => {
          this.dialogVisible = false;
        });
    }
  },
  created() {},
  watch: {
    dev_param(val1, val2) {
      console.info("dev_param watched", val1, val2);
    }
  }
};
</script>
