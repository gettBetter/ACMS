<template>
    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>编辑设备信息</span>
            </div>

            <el-form :model="editData">
                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="设备名称:">
                            <el-input v-model="editData.dev_name"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="设备地址:">
                            <el-input v-model="editData.com_addr"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="设备类型:">
                            <el-select v-model="editData.typ_indx">
                                <el-option v-for="opt in optionData.devtype_list" :label="opt.bas_name" :value="opt.typ_indx" :key="opt.typ_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="通讯类型:">
                            <el-select v-model="editData.com_indx">
                                <el-option v-for="opt in optionData.comtype_list" :label="opt.bas_name" :value="opt.com_indx" :key="opt.com_indx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="所属区域:">
                            <el-row>
                                <el-col :span="17">
                                    <el-input v-model="editData.are_indx" v-if="false"></el-input>
                                    <span>{{editData.are_name}}
                                    </span>
                                </el-col>
                                <el-col :span="6" ::offset="1">
                                    <el-button type="text" @click="openTree">选择区域</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="是否启用:">
                            <el-select v-model="editData.use_isok">
                                <el-option label="启用" value="1">
                                </el-option>
                                <el-option label="未启用" value="0">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="本地地址:">
                            <el-input v-model="editData.dev_addr"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="MAC地址:">
                            <el-input v-model="editData.dat_maca"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="通信端口:">
                            <el-input v-model="editData.bps_port"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="掩码地址:">
                            <el-input v-model="editData.chk_mask"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="网关地址:">
                            <el-input v-model="editData.end_gate"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="目的地址:">
                            <el-input v-model="editData.ism_adst"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11" :offset="1">
                        <el-form-item :label-width="formLabelWidth" label="源地址:">
                            <el-input v-model="editData.ism_asrc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>

            <el-row style="text-align:center;margin-top:40px;margin-bottom:20px">
                <el-button class="submit-btn" type="primary" @click="save">确定</el-button>
                <el-button class="cancel-btn" @click="cancel">取消</el-button>
            </el-row>
        </el-card>

        <el-dialog width="40%" min-height="200px" title="选择区域" :visible.sync="treeVisible" append-to-body>
            <el-tree :data="treeData" :props="treeProp" accordion @node-click="handleNodeClick">
            </el-tree>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formLabelWidth: "20%",
      editData: {},
      treeData: [],
      optionData: {},
      treeVisible: false,
      //   treeDialog: false,
      treeProp: {
        label: "are_name",
        children: "children"
      }
    };
  },
  methods: {
    getEditData() {
      const param = {
        dev_indx: this.$route.params.id
      };

      axios.get("/deviceinfo/deviceinfo_edit_data", { params: param }).then(
        data => {
          if (data.data.success === true) {
            console.info(data.data);
            this.editData = data.data.data;
            this.optionData = data.data;
            this.treeData = data.data.devicearea_tree;
          } else {
            alert(data.data.msg);
          }
        },
        data => alert("System Error")
      );
    },
    openTree() {
      console.info(this.areaTree);
      this.treeVisible = true;
    },
    handleNodeClick(node) {
      this.editData.are_indx = node.are_indx;
      this.editData.are_name = node.are_name;
      this.treeVisible = false;
    },
    save() {
      const param = this.editData;
      delete param.ROW_NUMBER;
      delete param.p_are_name;
      delete param.typ_name;
      delete param.com_name;
      delete param.are_name;

      console.info(param);
      axios.post("/deviceinfo/deviceinfo_edit_save", param).then(data => {
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
    this.optionData = {};
    this.treeData = [];
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
</style>


