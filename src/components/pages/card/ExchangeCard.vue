<template>
    <div id="exchange-card">
        <el-dialog width="70%" style="min-height:400px" title="换卡" :visible.sync="dialogVisible" append-to-body center>
            <el-row>
                <el-col :span="8">
                    <!-- <div style="font-size:16px;margin-bottom:10px">区域树</div> -->
                    <el-tree :data="treeData" :props="treeProp" ref="areaTree" :expand-on-click-node="false" @check-change="handleCheckChange" highlight-current style="max-height:600px;overflow:scroll" show-checkbox node-key="are_indx">
                    </el-tree>
                </el-col>
                <el-col :span="14" :offset="1">
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
                            <!-- <span v-model="data.sta_indx"></span> -->
                            <!-- <el-select v-model="editMenuData.parent_id">
                                <el-option v-for="opt in firstMenu" :label="opt.name" :value="opt.a_id" :key="opt.a_id">
                                </el-option>
                            </el-select> -->
                        </el-form-item> 
                        <el-form-item :label-width="formLabelWidth" label="证卡类型:">
                            <span v-model="data.typ_nam"></span>
                        </el-form-item> 
                        
                    </el-form>     
                </el-col>
            </el-row>

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
  props: {
      crdIndx: {
          require: true
      }
  },
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: "80px",
      treeData: [],
      treeProp: {
        label: "are_name",
        children: "children"
      },
      data: {},
      areaList: []
    };
  },
  methods: {
    openExchange() {
      this.dialogVisible = true;
      this.getTree();
    //   console.info(this.crdIndx)
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
    getTree() {
      axios
        .get("/card/card_area_config_data")
        .then(data => {
          console.info("tree", data.data);
          this.treeData = data.data.data[0].children;
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    getData(param) {
        axios
        .get("/card/card_exchange",{params:param})
        .then(data => {
          console.info("card_exchange", data.data);
          this.data = data.data.data[0]
          console.info('this.data',this.data)
        })
        .catch(data => {
          alert(data.data.msg);
        });
    },
    save() {}
  },
  computed: {},
  created() {},
  mounted() {},
  watch:{
      crdIndx(newVal,oldVal){
        const param = {
            crd_indx: newVal
        }
        this.getData(param)
        console.info('param',param)
      }
  }
};
</script>

<style>
</style>
