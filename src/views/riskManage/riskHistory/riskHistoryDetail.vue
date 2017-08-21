<template>
    <div id='riskHistoryDetail'>
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button>
        </div>
        <el-row style="margin-top:20px">
              <risk-info></risk-info>
        </el-row>
        <el-row>
                        <div style="margin:20px auto;width:885px;background:#ffffff;padding:30px 80px;">
                            <el-row style="padding:30px 80px;border:1px solid #dedede;background:#fafafa">
                                <el-col>
                                    <el-row>
                                        <el-col :span="3"> <label>指标名</label> </el-col> 
                                        <el-col :span="11" class="indexInfo"> {{riskIndex.riskName||' '}} </el-col> 
                                        <el-col :span="8" > <label>触发异常</label> </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3"> <label>风险域</label> </el-col> 
                                        <el-col :span="11" class="indexInfo"> {{riskIndex.riskCategory|riskRegion}} </el-col> 
                                        <el-col :span="8" class="indexInfo"> {{riskIndexRule}} </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3"> <label>等级</label></el-col>
                                        <el-col :span="11" class="indexInfo"> {{level[riskIndex.riskLevel]}} </el-col>
                                        <el-col :span="8"> <label></label> </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3"> <label>触发时间</label> </el-col>
                                        <el-col :span="11" class="indexInfo"> {{riskIndex.createTime}} </el-col>
                                        <el-col :span="8"> <label></label> </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3"> <label>状态</label> </el-col>
                                        <el-col :span="11" class="indexInfo"> {{status[riskIndex.status]}} </el-col>
                                        <el-col :span="8"> <label></label> </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-form  style="padding:30px 80px;border:1px solid #dedede;margin-top:20px;background:#fafafa" ref="form" :model="form" label-width="80px">
                                <el-form-item required label="情况说明" prop="situationExplan">
                                    <el-input resize="none" disabled
                                            type="textarea"
                                            :rows="8" 
                                            placeholder="请输入内容"
                                            class="description-text"
                                            v-model="form.situationExplan">
                                    </el-input>
                                </el-form-item>
                                <el-form-item required label="处理意见" prop="status">
                                    <el-radio-group v-model="form.status">
                                        <el-radio disabled :label="1">可以缓释</el-radio>
                                        <el-radio disabled :label="2">需要追踪</el-radio>
                                        <el-radio disabled :label="3">立即介入</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item v-show="form.status!=1">
                                    <el-button type="primary" style="float:right;width:120px;" size="large" @click="addrisk">发布风险</el-button>
                                </el-form-item>
                                <el-form-item required label="跟踪说明" prop="followSituation" v-show="form.status!=1">
                                    <el-input disabled resize="none" type="textarea" :rows="8" placeholder="请输入内容" class="description-text" v-model="form.followSituation">
                                    </el-input>
                                </el-form-item>
                                <el-form-item required label="最终意见" prop="finalSuggestion" v-show="form.status!=1">
                                    <el-radio-group v-model="form.finalSuggestion">
                                            <el-radio disabled :label="1">可以缓释</el-radio>
                                            <el-radio disabled :label="2">无法缓释</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                            <el-dialog title="风险发布" :visible.sync="riskflag" >
                                <div>
                                    <el-row >
                                        <el-col style="border:1px solid #dedede;padding:20px 40px">
                                            <el-form :model="form" label-width="85px">
                                                <el-form-item label="接收人" prop="exper">
                                                    <el-checkbox disabled v-show="persons.resp1&&persons.resp1.expertInfo" v-model="form.expert">{{'行家-'+(persons.resp1&&persons.resp1.expertInfo?persons.resp1.expertInfo.name:'')}}</el-checkbox>
                                                    <el-checkbox disabled v-show="persons.resp1&&persons.resp1.leadInfo" v-model="form.lead">{{'领投-'+(persons.resp1&&persons.resp1.leadInfo?persons.resp1.leadInfo.name:'')}}</el-checkbox>
                                                    <br><label>更多投资人</label>
                                                    <el-select v-model="form.follows" disabled clearable multiple placeholder="请选择">
                                                        <el-option v-for="v in persons.resp2" key="v.id" label="v.name" :value="v"> </el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="推送内容" prop="sendContent">
                                                    <el-input disabled resize="none" type="textarea" :rows="8" placeholder="请输入内容" v-model="form.sendContent">
                                                    </el-input>
                                                </el-form-item>
                                            </el-form>
                                        </el-col>   
                                    </el-row>
                                </div>
                                <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" style="width:120px" @click="submitForm">确认</el-button>
                                </div>
                            </el-dialog>
                        </div>
        </el-row>
    </div>
</template>

<script>
    import riskColumn from '../riskInfo/riskColumn'
    
    export default {
        name: 'riskHistoryDetail',
        components: {
          'risk-info':riskColumn
        },
        mounted() {
                this.$store.dispatch('risk_selectRiskWarningById',{ id: this.$route.params.id})
                this.$store.dispatch('risk_getPerson', { projectId: this.$store.state.risk.projectInfo.projectId }).then(() => {
                    this.form.situationExplan = this.historyDetail.situationExplan;
                    this.form.status = this.historyDetail.status;
                    this.form.followSituation = this.historyDetail.followSituation;
                    this.form.finalSuggestion = this.historyDetail.finalSuggestion;
                    let messageList = this.historyDetail.riskOperateMessages;
                    let follows = [];
                    if (messageList && messageList.length > 0) {
                        this.form.sendContent = messageList[0].sendContent;
                        for (let i = 0; i < messageList.length; i++) {
                            let item = messageList[i];
                            if (item.receiveType === 1) {
                                this.form.expert = true;
                            } else if (item.receiveType === 2) {
                                this.form.lead = true;
                            } else {
                                for (let m = 0; m < this.persons.resp2.length; m++) {
                                    let element = this.persons.resp2[m];
                                    if (item.receiveId == element.id) {
                                        follows.push({ id: item.receiveId, mobileNumber: element.mobileNumber, name: element.name })
                                    }
                                }
                            }
                        }
                    }
                    this.form.follows = follows;
                })
            },
        computed: {
            persons:function(){
                return this.$store.state.risk.projectPerson;
            },
            riskIndex:function(){
                return this.$store.state.risk.riskIndex||{};
            },
            historyDetail:function(){
                return this.$store.state.risk.historyDetail[0];
            },
            riskIndexRule:function(){
                if(this.riskIndex.riskRuleInfo){
                    return this.riskIndex.riskRuleInfo.factorName+this.riskIndex.riskRuleInfo.relationName+this.riskIndex.riskRuleInfo.value+this.riskIndex.riskRuleInfo.unit;
                }else{
                    return '';
                }
            }
        },
        data() {
            return {
                level:{
                   3:'高',
                   2:'中',
                   1:'低'
                },
                status:{
                   0:'待处理',
                   1:'人工缓释',
                   2:'无法缓释',
                   3:'处理中',
                   4:'自动缓释'
                },
                riskflag:false,
                form:{  
                    situationExplan:'',
                    status:1,
                    followSituation:'',
                    finalSuggestion:1,
                    follows:[],
                    expert:false,
                    lead:false,
                    sendContent:''
                }
            }
        },
        methods: {
            submitForm(){
                this.riskflag=false;
            },
            back(){
                this.$router.go(-1);
            },
            addrisk(){
                this.riskflag=true;
            }
            
        }
    }

</script>

<style>
  #riskHistoryDetail .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #7f868a;
  }
  #riskHistoryDetail  .el-dialog--small{
      width:725px;
  }
  #riskHistoryDetail .indexInfo{
      color: #c0c5d2;
      min-width: 50px;
      height:25px;
  }
  
  #riskHistoryDetail .riskform-content{
      color:#7f868a;
      height:188px;
      padding:2px;
      font-size:16px;
  }
  #riskHistoryDetail .description{
      text-align: center;
      background: #fafafa;
      border-right:1px solid #dedede;
      height:188px;
      color:#7f868a;
      font-size:17px;
      line-height: 188px;
   }
  #riskHistoryDetail .description-text{
      color:#7f868a;
      font-size:17px;
      height:188px;
      padding:2px;
      max-height: 188px;
   }
   
   #riskHistoryDetail .el-radio__label {
        font-size: 15px;
        padding-left: 5px;
        color: #797272;
    }
    
</style>