<template>
  <div>
    <el-dialog width="35%" style="min-height:400px" title="手工输入物理卡号" :visible.sync="dialogVisible" append-to-body center>
      <el-form :model="cardInfo" :label-width="formLabelWidth">
        <el-form-item v-for="(item,index) in userList" :key="index" :label="item.emp_name+':'">
          <el-input v-model="cardInfo[item.emp_indx]" placeholder="请输入十位数十进制物理卡号"></el-input>
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
import {mapGetters} from 'vuex'
export default {
  name: "ManulInput",
  props: {
    userList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: "80px",
      cardInfo: {},
      user_list:[],
      param:{}
    };
  },
  computed:{
    ...mapGetters(['cardParam'])
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    save() {
      console.info(this.cardInfo,this.cardInfo.length)
      let ret = false
      let count = 0
      for(let p in this.cardInfo){
        console.info(p)
        count ++
        if(this.cardInfo[p].length !== 10){
          ret = false
          break
        }
        console.info(count)
        if(count == this.userList.length){
          ret = true
        }
      }
      if(ret){
        this.user_list = this.userList.map(item=>{
          return {
            emp_indx: item.emp_indx,
            crd_code: this.cardInfo[item.emp_indx]
          }
        })
        
        this.param = this.cardParam
        this.param.user_list = this.user_list
        //  
        this.param.card_tag = 1
        this.$parent.$parent.send(this.param)
        this.dialogVisible = false;
        // this.$emit('setCardId',this.user_list)
      }else{
        alert('请检查物理卡号是否为10位十进制')
      }
    }
  },
  mounted(){
    console.info(this.$parent.$parent)
  }
};
</script>

<style>
</style>
