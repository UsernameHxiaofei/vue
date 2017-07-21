<style>
/*步骤条*/
#step-bar{background: #fcfcfc;padding: 30px;}
#step-bar .el-step__icon{line-height: 24px;}
#step-bar .el-step:last-child{width: auto!important;}

/*项目信息*/
.item-info{padding:30px;border-top: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;overflow: hidden; }
.com-img{float: left;margin-right: 20px;width: 26%;height: 230px;}
.item-con{float: left;width: 70%;}
.item-title{font-weight: bold;margin-bottom: 20px;font-size: 20px;}
.item-list-info .grid-content{color: #666666;line-height: 29px;}
.btn-team{overflow: hidden;margin-top: 20px;}
#btnt-l{float: left;}
#btnt-r{float: right;}
#btnt-l .el-button{background: #06ccb6;border-color: #06ccb6;color: white;min-width: 100px;}
#btnt-l .el-button:hover{background: #fff;border-color: #06ccb6;color: #06ccb6;min-width: 100px;}
#btnt-r .el-button{border-color: #06ccb6;color: #06ccb6;min-width: 100px;margin-left: 10px;}
#btnt-r .el-button:hover{border-color: #06ccb6;background: #06ccb6;color: #fff;min-width: 100px;margin-left: 10px;}
/*tabber*/
#tabber .el-tabs__header{background: #fcfcfc;padding: 20px 30px 10px 30px;margin: 0;border-color: #eeeeee;}
#tabber .el-tabs__item{height: 30px;line-height: 30px;padding: 0 13px;background: #e2e6ef;color: #a3abbe;
border-radius: 15px;margin-right: 10px;font-size: 12px;}
#tabber .el-tabs__item.is-active{color: #06ccb6;}
#tabber .el-tabs__active-bar{display: none!important;}
#tabber .el-tabs__content{margin: 0 30px;border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;}
.cur-step{color: #fbc937;}

.time-input .el-date-editor.el-input{width: 92%;}
.time-input .el-form-item__label{width: 135px!important;}
.time-input .el-input{width: 80%;}
.time-input .el-form-item__content{margin-left: 135px!important;}
/*有限合伙弹窗*/
.refuse-form .el-form-item__label{width: 135px!important;}
.refuse-form .el-input{width: 80%;}
.refuse-form .el-form-item__content{margin-left: 135px!important;}
</style>

<template scope="scope">
<div id="item">
    <div class="back-button">
            <el-button type="text" icon="arrow-left" style="margin-top:90px" @click="back()">返回上一级</el-button>
        </div>
    <!--步骤条-->
    <el-row>    
        <el-col id="step-bar">
            <el-steps :space="'7.0%'"  :active="itemManageDetail.phase-1">
                <el-step v-for="(item , index) in projectList" :title="item.label" :key="item.value"></el-step>
            </el-steps>
        </el-col>
    </el-row>
    <!--项目信息-->
    <div class="item-info">
        <img class="com-img" :src="itemManageDetail.imageURL||''"  alt="项目展示图"/>
        <div class="item-con">
            <h4 class="item-title">{{itemManageDetail.name}}</h4>
            <div class="item-list-info">
                <el-row>
                    <el-col :span="6"><div class="grid-content">发&nbsp;起&nbsp;人：{{itemManageDetail.initiatorName}}</div></el-col>
                    <el-col :span="6"><div class="grid-content">目标融资额：{{(((itemManageDetail.financingAmount||0)/10000).toFixed(2))}}万</div></el-col>
                    <el-col :span="6"><div class="grid-content">融资时间：{{itemManageDetail.financingDays}}天</div></el-col>
                    <el-col :span="6"><div class="grid-content">项目编号：{{itemManageDetail.code}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"><div class="grid-content">所属行业：{{itemManageDetail.industry|industry}}</div></el-col>
                    <el-col :span="6"><div class="grid-content">出让股份：{{((itemManageDetail.transferringSharesRatio||0)*100).toFixed(2)}}%</div></el-col>
                    <el-col :span="6"><div class="grid-content">项目发起：{{itemManageDetail.createTime}}</div></el-col>
                    <el-col :span="6"><div class="grid-content">行家：{{itemManageDetail.expertName}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"><div class="grid-content">所属地区：{{itemManageDetail.regionCode|address}}</div></el-col>
                    <el-col :span="6"><div class="grid-content">已投入额：{{((itemManageDetail.raisedAmount||0)/10000).toFixed(2)}}万</div></el-col>
                    <el-col :span="6"><div class="grid-content">发起次数：{{itemManageDetail.ordinal}}</div></el-col>
                    <el-col :span="6"><div class="grid-content">领投：{{itemManageDetail.leadInvestorName}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"><div class="grid-content">总投资额：{{((itemManageDetail.overallInvestment||0)/10000).toFixed(2)}}万</div></el-col>
                    <el-col :span="6"><div class="grid-content">承诺出资：{{((itemManageDetail.commitmentAmount||0)/10000).toFixed(2)}}万</div></el-col>
                    <el-col :span="6"><div class="grid-content">阶&emsp;&emsp;段：<span class="cur-step">{{itemManageDetail.phase|projectPhase}}</span></div></el-col>
                    <el-col :span="6"><div class="grid-content">状态：{{itemManageDetail.status|projectStatus}}</div></el-col>
                </el-row>
            </div>
            <div class="btn-team">
                <div id="btnt-l" v-if="itemManageDetail.status!=11">
                    <el-button @click="pass"  v-show="itemManageDetail.phase==4||itemManageDetail.phase==5">通过</el-button>
                    <el-button v-show="itemManageDetail.phase==4||itemManageDetail.phase==5" @click="dialogStopVisible = true">拒绝</el-button>
                    <el-button @click="editProject" :disabled="isEdit" v-show="itemManageDetail.phase==6">{{isEdit?'项目已编辑':'编辑项目'}}</el-button>
                    <el-button @click="setTimeInfo" v-show="itemManageDetail.phase==7">设置上线时间</el-button>
                    <el-button @click="dialogPartnerVisible = true" :disabled="isPartner" v-show="itemManageDetail.phase==10">{{isPartner?'已关联有限合伙':'关联有限合伙'}}</el-button>
                    <el-button @click="dialogAuthVisible = true" v-show="itemManageDetail.phase==10">银账信息审核</el-button>
                    <el-button @click="fangkuan" :disabled="isFun" v-show="itemManageDetail.phase==11">{{isFun?'放款申请中':'放款申请'}}</el-button>
                </div>
                <div id="btnt-r">
                    <router-link :to="{path: '/enterpriseDetail/'+enterpriseInfo.id}" >
                        <el-button v-show="enterpriseInfo.id" >企业详情</el-button>
                    </router-link>
                    <router-link :to="{path: '/displayItem/'+projectId}" >
                        <el-button >项目展示</el-button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <!--tabber-->
    <div id="tabber">
        <el-tabs v-model="activeName">
            <el-tab-pane label="行家建议" name="1"  v-if="itemManageDetail.phase>=4">
               <expertTab v-show="activeName=='1'"></expertTab>
            </el-tab-pane>
            <el-tab-pane label="领投意向" name="2"  v-if="itemManageDetail.leadInvestorIntentionId||itemManageDetail.phase>=4">
               <collarTab v-show="activeName=='2'"></collarTab>
            </el-tab-pane>
            <el-tab-pane label="工商信息" name="3" v-if="itemManageDetail.phase>=5">
                <industryTab v-show="activeName=='3'"></industryTab>
            </el-tab-pane>
            <el-tab-pane label="风险疑似信息" name="4" v-if="itemManageDetail.phase>=5">
                <riskTab v-show="activeName=='4'"></riskTab>
            </el-tab-pane>
            <el-tab-pane label="企业关系图谱" name="5" v-if="itemManageDetail.phase>=5">
                <enterpriseRelationship></enterpriseRelationship>
            </el-tab-pane>
            <el-tab-pane label="第三方征信报告" name="6" v-if="itemManageDetail.phase>=5">
                <thirdAuth></thirdAuth>
            </el-tab-pane>
            <el-tab-pane label="审核结论" name="7" v-if="itemManageDetail.phase>=4">
                <resultTab v-if="activeName=='7'"></resultTab>
            </el-tab-pane>
            <el-tab-pane label="时间信息" name="8" v-if="itemManageDetail.phase>=7">
                <timeTab ></timeTab>
            </el-tab-pane>
            <el-tab-pane label="银账授权信息" v-if="itemManageDetail.phase>=10" name="9" >
                <resisAuthTab  v-if="activeName=='9'"></resisAuthTab>
            </el-tab-pane> 
            <el-tab-pane label="有限合伙信息" v-if="itemManageDetail.phase>=10" name="10" > 
                <partnerTab ></partnerTab>
            </el-tab-pane>
        </el-tabs>
    </div>
    <!--拒绝理由弹窗-->
    <div class="p-form">
        <dialogComponent :title="'拒绝理由'" :dialogFormVisible="dialogStopVisible" @dialog-confirm-callback="refuse" @dialog-cancel-callback="cancel">
            <el-form  :model="reject" :rules="rule2" ref="reject">
                <el-form-item label="拒绝理由" prop="desc">
                    <el-input class="inputing" type="textarea" v-model="reject.desc" placeholder="请输入拒绝理由..." ></el-input>
                </el-form-item>
            </el-form>
        </dialogComponent>
    </div>

     <!--关联有限合伙弹窗-->
    <div class="p-form  refuse-form">
        <dialogComponent :title="'关联有限合伙'"  :dialogFormVisible="dialogPartnerVisible" @dialog-confirm-callback="partner" @dialog-cancel-callback="quit">
            <el-form :model="limitform" :rules="limitrule" ref="limitform">
                <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
                    <el-input v-model="limitform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="统一社会信用代码" :label-width="formLabelWidth">
                    <el-input v-model="limitform.code" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="licence" label="开户许可核准号" :label-width="formLabelWidth">
                    <el-input v-model="limitform.licence" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankName" label="开户银行" :label-width="formLabelWidth">
                    <el-input v-model="limitform.bankName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankOrgnizationName" label="开户行机构名" :label-width="formLabelWidth">
                    <el-input v-model="limitform.bankOrgnizationName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankProvince" label="开户行省名" :label-width="formLabelWidth">
                    <el-input v-model="limitform.bankProvince" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankCity" label="开户行市名" :label-width="formLabelWidth">
                    <el-input v-model="limitform.bankCity" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankAccount" label="银行账户" :label-width="formLabelWidth">
                    <el-input v-model="limitform.bankAccount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="protocol" label="有限合伙协议模板" :label-width="formLabelWidth">
                    <el-upload  :multiple="false" action="/ajax/fileupload" :auto-upload="true"  
                            :on-remove="protocol_remove" :before-upload="beforeUpload"   :on-success="protocolUpload" :data="{fileType:2}" 
                            :disabled="limitform.protocol.length>0" >
                            <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                
            </el-form>
        </dialogComponent>
    </div>
    <div class="p-form  refuse-form">
        <el-dialog :title="'银账信息审核'"  :visible.sync="dialogAuthVisible" >
            <el-row>
                <el-button type="default" style="margin-left:10px ;"   @click="auth(1)">通过</el-button>
                <el-button type="primary"  style="margin-left:2em;" @click="auth(2)">拒绝</el-button>
            </el-row>
            <el-row>
                <label for="auth_refuseReason" style="padding:20px 10px 0px 10px;">拒绝理由：</label>
                <el-input style="padding:10px 10px 20px 10px;" type="textarea" :rows="5" v-model="auth_refuseReason"></el-input>
            </el-row>
            <div slot="footer" class="dialog-footer">
                   
            </div>
        </el-dialog>
    </div>
    <!--设置上线时间弹窗-->
    <div  class="p-form time-input">
        <dialogComponent title="设置时间信息" 
        :dialogFormVisible="dialogTimeVisible" 
        @dialog-confirm-callback="time"
        @dialog-cancel-callback="cancelTime">
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
    import expertTab from './itemDetail/expertTab'
    import collarTab from './itemDetail/collarTab'
    import resultTab from './itemDetail/resultTab'
    import timeTab from './itemDetail/timeTab'
    import resisAuthTab from './itemDetail/resisAuthTab'
    import partnerTab from './itemDetail/partnerTab'
    import industryTab from './itemDetail/industryTab'
    import riskTab from './itemDetail/riskTab'
    import enterpriseRelationship from './itemDetail/enterpriseRelationship.vue'
    import thirdAuth from './itemDetail/thirdAuth.vue'

    import dialogComponent from '../../components/common/dialog'
    import projectList from '../../constant/projectPhase.js'
    import moment from 'moment'
    export default {
        name: 'itemDetail',
        components: {
            expertTab,
            collarTab,
            resultTab,
            timeTab,
            resisAuthTab,
            partnerTab,
            industryTab,
            riskTab,
            enterpriseRelationship,
            thirdAuth,
            dialogComponent
        },
        computed: {
            itemManageDetail: function () {
                return this.$store.state.item.itemManageDetail || {};
            },
            enterpriseInfo: function () {
                return this.$store.state.enterprise.enterpriseInfo || {};
            },
            timeInfo:function(){
                return this.$store.state.item.timeInfo||{};
            },
            partnerInfo: function () {
                return this.$store.state.item.partnerInfo || {};
            },
            isPartner:function () {
                return !!this.partnerInfo.name;
            }
        },
        mounted() {
            this.$store.dispatch('item_getThirdReport',{id:this.projectId})
            this.$store.dispatch('item_getManageDetail',  {id:this.projectId}).then(()=>{
                this.$store.dispatch('enterprise_getInfo',{id:this.itemManageDetail.enterpriseId})
                this.$store.dispatch('item_getLeadAd',{id:this.itemManageDetail.leadInvestorIntentionId});
                if(this.itemManageDetail.phase==11){
                    this.$store.dispatch('item_getIsFun',{id:this.projectId,size:10,num:1}).then(()=>{
                        if(!!this.$store.state.item.isFun&&!!this.$store.state.item.isFun.content&&this.$store.state.item.isFun.content.length>0){
                            this.isFun=true;
                        }
                    })
                }
                if(this.itemManageDetail.auxiliary&&this.itemManageDetail.auxiliary.currentNodeId=='contentEdit'){
                    this.isEdit=false;
                }else if(this.itemManageDetail.auxiliary&&this.itemManageDetail.auxiliary.currentNodeId=='contentAffirm'){
                    this.isEdit=true;
                }
            })
            this.$store.dispatch('item_getTimeInfo',{id:this.projectId});
            this.$store.dispatch('item_getResultInfo',{id:this.projectId});
            this.$store.dispatch('item_getExpertAd',{id:this.projectId});
        },
        data() {
            return {
                isFun:false,
                isEdit:false,
                projectId:this.$route.params.projectId,
                projectList: projectList,
                dialogStopVisible: false,
                dialogApplyVisible: false,
                dialogPartnerVisible: false,
                dialogAuthVisible:false,
                dialogTimeVisible:false,
                activeName: '1',
                formLabelWidth: '130px',
                auth_refuseReason:'',
                reject: {
                    desc: ''
                },
                rule2: {
                    desc: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                },
                limitform: {
                    name: '',
                    code: '',
                    licence: '',
                    bankName: '',
                    bankOrgnizationName: '',
                    bankProvince: '',
                    bankCity: '',
                    bankAccount: '',
                    protocol:''
                },
                limitrule: {
                    name: [{ required: true, message: '请输入企业名称', trigger: 'change' }],
                    code: [{ required: true, message: '请输入统一社会信用代码', trigger: 'change' }],
                    licence: [{ required: true, message: '请输入开户许可核准号', trigger: 'change' }],
                    bankName: [{ required: true, message: '请输入开户银行', trigger: 'change' }],
                    bankOrgnizationName: [{ required: true, message: '请输入开户银行机构', trigger: 'change' }],
                    bankProvince: [{ required: true, message: '请输入开户行省名', trigger: 'change' }],
                    bankCity: [{ required: true, message: '请输入开户行市名', trigger: 'change' }],
                    bankAccount: [{ required: true, message: '请输入银行账户', trigger: 'change' }],
                    protocol: [{ required: true, message: '请上传有限合伙协议模板', trigger: 'change' }]
                },
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
                }
            };
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
            protocol_remove(){
                this.limitform.protocol='';
            },
            protocolUpload(response,file,fileList){
                this.limitform.protocol=JSON.parse(response.objectLiteral);
            },
            beforeUpload(file){
                if(file.size>=1024*1024*10){
                    this.$message.warning('不能上传大于10MB的文件！');
                    return false;
                }
                if(file.type!='application/pdf'){
                    this.$message.warning('协议模板必须是pdf文件！');
                    return false;
                }
                return true;
            },
            time(){
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
                        this.$store.dispatch('item_updateTimeInfo',{param,vue:this}).then(()=>{
                            this.dialogTimeVisible = false;
                            this.$refs['dateform'].resetFields();
                        })
                    } else {
                        return false;
                    }
                });
            },
            cancelTime(){
                this.$refs['dateform'].resetFields();
                this.dialogTimeVisible = false;   
            },
            setTimeInfo(){
                //设置时间信息
                this.dialogTimeVisible=true;
                for (let key in this.dateform) {
                    if (this.dateform.hasOwnProperty(key)) {
                        this.dateform[key]=this.timeInfo[key];
                    }
                }
            },
            editProject(){
                this.$router.push('/itemEdit/'+this.$route.params.projectId)
            },
            auth(status){
                this.$store.dispatch('item_isAuthInfo',{projectId:this.$route.params.projectId}).then(()=>{
                    if(!this.$store.state.item.isAuthInfo){
                        this.$message.warning('投资人签约之前，还不能进行银账审核');
                        return;
                    }
                    if(status==2&&this.auth_refuseReason.length==0){
                        this.$message.warning('请输入拒绝理由')
                        return;
                    }
                    let param={
                        status,
                        refuseReason:this.auth_refuseReason,
                        enterpriseId:this.enterpriseInfo.id,
                        id:this.itemManageDetail.id
                    }
                    this.$store.dispatch('item_authInfo',{param,vue:this});
                    this.dialogAuthVisible=false;
                })
            },
            pass(){
                if(this.itemManageDetail.status!=2||this.itemManageDetail.status!=3){
                    this.$message.info('项目已审核！');
                    return;
                }
                let param={
                    id:this.$route.params.projectId,
                    flag:this.itemManageDetail.phase==4?'first':'recheck',
                    pass:'yes',
                    rejection:''
                }
                this.$store.dispatch('item_setResultInfo',{param,vue:this});
            },
            fangkuan() {
                this.$confirm('项目方、领投两笔资金均已到位，现在申请将跟投有限合伙人全部投资款注入项目企业基本存款账户。', '放款申请', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param={
                        id:this.$route.params.projectId,
                        initiatorId:this.itemManageDetail.initiatorId
                    }
                    this.$store.dispatch('item_lend',{param,vue:this})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            refuse(reject) {
                if(this.itemManageDetail.status!=2||this.itemManageDetail.status!=3){
                    this.$message.info('项目已审核！');
                    return;
                }
                this.$refs['reject'].validate((valid) => {
                    if (valid) {
                        let param={
                            id:this.$route.params.projectId,
                            flag:this.itemManageDetail.phase==4?'first':'recheck',
                            pass:'no',
                            rejection:this.reject.desc
                        }
                        this.$store.dispatch('item_setResultInfo',{param,vue:this});
                        this.dialogStopVisible = false;
                    } else {
                        return false;
                    }
                });
                
            },
            cancel(reject) {
                this.$refs['reject'].resetFields();
                this.dialogStopVisible = false;
            },
            partner(limitform) {
                this.$refs['limitform'].validate((valid) => {
                    if (valid) {
                        this.dialogPartnerVisible = false;
                        let param=this.limitform;
                        param.id=this.$route.params.projectId;
                        this.$store.dispatch('item_createPartnerInfo',{param,vue:this})
                        this.$refs['limitform'].resetFields();
                    } else {
                        return false;
                    }
                });
            },
            quit(limitform) {
                this.$refs['limitform'].resetFields();
                this.dialogPartnerVisible = false;
            }
        }
    };
</script>
