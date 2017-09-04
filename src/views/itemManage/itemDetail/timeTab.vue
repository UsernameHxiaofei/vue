<style>
/*时间信息*/
.set-time{margin-bottom: 0;}
.set-time li{color: #333333;margin-top: 10px;}
.set-time li span{display: inline-block;width: 100px;margin-right: 20px;color: #666666;text-align: right;}
.again{float:right;margin-right:50%}
.set-box{width: 80%;;min-width: 300px;margin: 0 auto;padding: 30px 0;position: relative;}
/*设置上线时间弹窗*/
.time-input .el-date-editor.el-input{width: 92%;}
.time-input .el-form-item__label{width: 135px!important;}
.time-input .el-input{width: 80%;}
.time-input .el-form-item__content{margin-left: 135px!important;}

.set-box  .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: black;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
}
 .set-box  .el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 14px;
}
 .set-box  .el-form-item {
    margin-bottom: 0px;
}
</style>
<template>
  <div class="nineth">
      <!--时间信息-->
      <div class="set-box">
            <el-form :label-width="'150px'">
                <el-form-item label="项目发起">
                    {{timeInfo.createTime}}
                </el-form-item>
                <el-form-item label="预约开始">
                    {{timeInfo.reserveBegin||'未设置'}}
                </el-form-item>
                <el-form-item label="预约结束">
                    {{timeInfo.reserveEnd||'未设置'}}
                </el-form-item>
                <el-form-item label="专享认购开始">
                    {{timeInfo.subscriptionStartTime||'未设置'}}
                </el-form-item>
                <el-form-item label="专享认购结束">
                    {{timeInfo.subscriptionEndTime||'未设置'}}
                </el-form-item>
                <el-form-item label="众投开始">
                    {{timeInfo.crowdFundingBegin||'未设置'}}
                </el-form-item>
                <el-form-item label="众投结束">
                    {{timeInfo.crowdFundingEnd||'未设置'}}
                </el-form-item>
                <el-form-item>
                    <el-button  class="again" v-if="operator.category==2"  type="success" @click="edit">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--设置上线时间弹窗-->
        <div  class="p-form time-input">
            <dialogComponent :title="title" 
            :dialogFormVisible="dialogTimeVisible" 
            @dialog-confirm-callback="time"
            @dialog-cancel-callback="cancel">
                    <el-form  :model="dateform" :rules="daterule" ref="dateform">
                        <el-form-item prop="reserveBegin" label="预约开始" required :label-width="formLabelWidth">
                            <el-date-picker 
                            v-model="dateform.reserveBegin" 
                            type="datetime">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="reserveEnd" label="预约结束" required :label-width="formLabelWidth">
                            <el-date-picker
                            v-model="dateform.reserveEnd"
                            type="datetime">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="subscriptionStartTime" required label="专享认购开始" :label-width="formLabelWidth">
                            <el-date-picker
                            v-model="dateform.subscriptionStartTime"
                            type="datetime">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="subscriptionEndTime" required label="专享认购结束" :label-width="formLabelWidth">
                            <el-date-picker
                            v-model="dateform.subscriptionEndTime"
                            type="datetime">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="crowdFundingBegin" required label="众投开始" :label-width="formLabelWidth">
                            <el-date-picker
                            v-model="dateform.crowdFundingBegin"
                            type="datetime">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="crowdFundingEnd" required label="众投结束" :label-width="formLabelWidth">
                            <el-date-picker
                            v-model="dateform.crowdFundingEnd"
                            type="datetime">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
            </dialogComponent>
        </div>
  </div>
</template>
<script>
import dialogComponent from '../../../components/common/dialog'
import moment from 'moment'

  export default {
    name:'timeTab',
    components:{
        dialogComponent
    },
    computed: {
      timeInfo:function(){
          return this.$store.state.item.timeInfo||{};
      },
      operator:function(){
          return this.$store.state.login.actor;
      },
      itemManageDetail: function () {
                return this.$store.state.item.itemManageDetail || {};
      }
    },
    data() {
      return {
        dialogTimeVisible: false,
        title:"设置上线时间",
        formLabelWidth:'120px',
        dateform:{
            reserveBegin:'',
            reserveEnd:'',
            subscriptionStartTime:'',
            subscriptionEndTime:'',
            crowdFundingBegin:'',
            crowdFundingEnd:''
        },
        daterule:{
            reserveBegin:[
                {trigger: 'change',validator:(rule, value, callback) => {
                    if (value =='') {
                        callback(new Error('请选择预约开始时间!'));
                    }else{
                        callback();
                    }
                }}
            ],
            reserveEnd:[
                {trigger: 'change',validator:(rule, value, callback) => {
                            if (value =='') {
                             callback(new Error('请选择预约结束时间!'));
                            }else if(!moment(value).isAfter(this.dateform.reserveBegin)){
                                callback(new Error('预约结束时间必须在预约开始时间之后!'));
                            }else{
                                callback();
                            }
                    }} 
            ],
            subscriptionStartTime:[
                {trigger: 'change',validator:(rule, value, callback) => {
                            if (value =='') {
                                callback(new Error('请选择专享认购开始时间!'));
                            }else if(!moment(value).isAfter(this.dateform.reserveEnd)){
                                callback(new Error('专享认购开始时间必须在预约结束时间之后!'));
                            }else{
                                callback();
                            }
                    }} 
            ],
            subscriptionEndTime:[
                {trigger: 'change',validator:(rule, value, callback) => {
                            if (value =='') {
                                callback(new Error('请选择专享认购结束时间!'));
                            }else if(!moment(value).isAfter(this.dateform.subscriptionStartTime)){
                                callback(new Error('专享认购结束时间必须在专享认购开始时间之后!'));
                            }else{
                                callback();
                            }
                    }}
            ],
            crowdFundingBegin:[
                {trigger: 'change',validator:(rule, value, callback) => {
                            if (value =='') {
                                callback(new Error('请选择众投开始时间!'));
                            }else if(!moment(value).isAfter(this.dateform.subscriptionEndTime)){
                                callback(new Error('众投开始时间必须在专享认购结束时间之后!'));
                            }else{
                                callback();
                            }
                    }}
            ],
            crowdFundingEnd:[
                {trigger: 'change',validator:(rule, value, callback) => {
                            if (value =='') {
                                callback(new Error('请选择众投结束时间!'));
                            }else if(!moment(value).isAfter(this.dateform.crowdFundingBegin)){
                                callback(new Error('众投结束时间必须在众投开始时间之后!'));
                            }else{
                                callback();
                            }
                    }}
            ],
        },
      };
    },
     methods: {
       edit(){
            if(this.itemManageDetail.phase>=10){
                this.$message.warning('时间信息在认购成功之后无法修改！')
                return;
            }
            this.timeInfo.reserveBegin
            this.dialogTimeVisible = true;
            for (var key in this.dateform) {
                if (this.dateform.hasOwnProperty(key)) {
                    this.dateform[key]=this.timeInfo[key];
                }
            }
       },
       time(dateform){
            console.log(`设置上线时间`);
            this.$refs['dateform'].validate((valid) => {
                if (valid) {
                    let param={};
                    for (var attr in this.dateform) {
                        if (this.dateform.hasOwnProperty(attr)) {
                            var element = this.dateform[attr];
                            param[attr]=moment(element).format('YYYY-MM-DD HH:mm:ss');
                        }
                    }
                    param.id=this.$route.params.projectId;
                    param.status=this.itemManageDetail.status;
                    param.phase=this.itemManageDetail.phase;
                    this.$store.dispatch('item_updateTimeInfoNew',{param,vue:this}).then(()=>{
                        this.dialogTimeVisible = false;
                    })
                } else {
                    return false;
                }
            });
        },
        cancel(dateform){
            this.$refs['dateform'].resetFields();
            this.dialogTimeVisible = false;              
        }
    }
  };
</script>
