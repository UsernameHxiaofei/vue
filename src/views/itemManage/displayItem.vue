<style>
    .project {
        overflow: hidden;
        margin: 65px 30px 30px 30px;
        padding: 20px;
        background: white;
    }

    .img-left {
        width: 100%;
        height: 300px;
    }
    .charactor{
        height:50px;
    }
    .charactor img {
        position:relative;
        left:0;top:0;
        width: 47px;
        height: 47px;
        border-radius: 50%;
    }

    .charactor p {
        position:relative;
        left:47px;top:-47px;
        word-break:keep-all;/* 不换行 */
        white-space:nowrap;/* 不换行 */
        overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow:ellipsis;
    }

    .charactor span {
        position:relative;
        color: #c0c0c0;
        left:47px;top:-70px;
    }

    .cur-box {
        margin: 20px 0 40px 0;
    }

    .curlocal p {
        margin-bottom: 0;
    }

    .pro-intro {
        margin-top: 20px;
    }
    .pro-mon{
        color: #c0c0c0;
        margin-top:70px;
    }
    .pro-mon span {
        margin-right: 15px;
    }

    .progress-box {
        margin-top: 10px;
    }

    .progress-box p {
        margin-top: 10px;
    }

    .left-img {
        position: relative;
    }

    .flag {
        width: 110px;
        height: 110px;
        background: url(../../assets/images/flag.png);
        position: absolute;
        left: -10px;
        top: -20px;
    }

    .flag span {
        font-size: 16px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        display: inline-block;
        margin: 29px 0 0 21px;
        color: white;
    }
    /*tab*/

    .my-tab .el-tabs__header {
        background: white;
        padding-left: 15%;
    }

    .my-tab .el-tabs__content {
        width: 80%;
        min-width: 965px;
        margin: 30px auto 0 auto;
    }

    .my-tab .el-row {
        margin: 0!important;
    }

    .my-tab .el-col {
        padding: 0!important;
    }

    .tab-left {
        margin-right: 30px;
    }

    .tab-left,
    .tab-right {
        background: white;
    }

    .tab-left .enterprisePerson {
        width: 80%;
        min-width: 610px!important;
        margin: 40px auto 10px auto!important;
    }

    .tab-right {
        border: 1px solid #efefef;
    }
</style>
<template>
    <div style="background:#f5f5f5;">
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back()">返回上一级</el-button>
        </div>
        <div class="project">
            <el-row :gutter="20">
                <el-col :span="10" class="left-img">
                    <img class="img-left" :src="itemManageDetail.imageURL" :alt="itemManageDetail.name" />
                    <div class="flag"><span>{{show.status|projectStatus}}</span></div>
                </el-col>
                <el-col :span="14">
                    <h3 style="font-weight: bold;margin-bottom: 20px;font-size: 20px;">{{show.name}}</h3>
                    <p class="pro-intro">{{show.summary}}</p>
                    <el-row class="cur-box">
                        <el-col :span="6" class="curlocal">
                            <p><img src="../../assets/images/local.png" /> {{show.regionCode|address}}</p>
                            <p><img src="../../assets/images/tag.png" /> {{show.industry|industry}}</p>
                        </el-col>
                        <el-col :span="6" class="charactor">
                            <img :src="show.initiatorImg" :alt="show.initiatorName" />
                            <p>{{show.initiatorName}}</p><br>
                            <span>发起</span>
                        </el-col>
                        <el-col :span="6" class="charactor">
                            <img :src="show.leadInvestorImg" :alt="show.leadInvestorName" />
                            <p>{{show.leadInvestorName}}</p><br>
                            <span>领投</span>
                        </el-col>
                        <el-col :span="6" class="charactor">
                            <img :src="show.expertImg" :alt="show.expertName" />
                            <p>{{show.expertName}}</p><br>
                            <span>行家</span>
                        </el-col>
                    </el-row>
                    <el-row class="pro-mon">
                        <el-col :span="8">
                            <span>出让股权</span>{{(show.transferringSharesRatio*100||0)+'%'}}
                        </el-col>
                        <el-col :span="8">
                            <span>起投金额</span>{{show.unitPrice/10000||0}}万元
                        </el-col>
                        <el-col :span="8">
                            <span>目标金额</span>{{show.financingAmount/10000||0}}万元
                        </el-col>
                    </el-row>
                    <div class="progress-box">
                        <el-progress :percentage="(show.raisedAmount/show.financingAmount)*100||0"></el-progress>
                        <p>剩余{{show.lastDay}}天</p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="my-tab">
            <el-tabs v-model="activeName">
                <el-tab-pane label="项目介绍" :name="'1'">
                    <el-row :gutter="30">
                        <el-col :span="17" class="tab-left">
                            <detailIntroduction></detailIntroduction>
                        </el-col>
                        <el-col :span="6" class="tab-right">
                            <rightTab></rightTab>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="团队介绍" :name="'2'">
                    <el-row :gutter="30">
                        <el-col :span="17" class="tab-left">
                            <enterpriseTeam v-if="activeName=='2'"></enterpriseTeam>
                        </el-col>
                        <el-col :span="6" class="tab-right">
                            <rightTab></rightTab>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="融资方案" :name="'3'">
                    <el-row :gutter="30">
                        <el-col :span="17" class="tab-left">
                            <planTab></planTab>
                        </el-col>
                        <el-col :span="6" class="tab-right">
                            <rightTab></rightTab>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="行家建议" :name="'4'">
                    <el-row :gutter="30">
                        <el-col :span="17" class="tab-left">
                            <expertTab></expertTab>
                        </el-col>
                        <el-col :span="6" class="tab-right">
                            <rightTab></rightTab>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="领投情况" :name="'5'">
                    <div style="background:white">
                        <collarTab v-if="activeName=='5'"></collarTab>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="'投资人('+invertUserNum+')'" :name="'6'">
                    <el-row :gutter="30">
                        <el-col :span="17" class="tab-left">
                            <investorTab></investorTab>
                        </el-col>
                        <el-col :span="6" class="tab-right">
                            <rightTab></rightTab>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!-- <el-tab-pane :label="'讨论('+subjectCount+')'" :name="'7'">
                    <el-row :gutter="30">
                        <el-col :span="17" class="tab-left">
                            <discussTab @countDiscussNum="countDiscussNum"></discussTab>
                        </el-col>
                        <el-col :span="6" class="tab-right">
                            <rightTab></rightTab>
                        </el-col>
                    </el-row>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import expertTab from './itemDetail/expertTab'
    import collarTab from './itemDetail/collarTab'
    import investorTab from './displayItem/investorTab'
    import planTab from './displayItem/planTab'
    import discussTab from './displayItem/discussTab'
    import rightTab from './displayItem/rightTab'
    import detailIntroduction from './displayItem/detailIntroduction'

    import enterpriseTeam from '../enterpriseManage/enterpriseInfo/enterpriseTeam'

    export default {
        mounted () {
            this.$store.dispatch('item_getManageDetail', { id: this.$route.params.projectId }).then(() => {
                if(this.itemManageDetail.leadInvestorIntentionId){
                    this.$store.dispatch('item_getLeadAd',{id:this.itemManageDetail.leadInvestorIntentionId});
                }
                if(this.itemManageDetail.enterpriseId ){
                    this.$store.dispatch('enterprise_getInfo', { id: this.itemManageDetail.enterpriseId });
                }
                if(this.itemManageDetail.detailedIntroductionId ){
                    this.$store.dispatch('item_getDetailedIntroduction', { id: this.itemManageDetail.detailedIntroductionId })
                }
                if(this.itemManageDetail.financingPlanId){
                    return this.$store.dispatch('item_getFinancingPlan', { id: this.itemManageDetail.financingPlanId })
                }else{
                    return false;
                }
            }).then(()=>{
                if(this.financingPlanData.id){
                    this.$store.dispatch('item_getInvestedEvidence', { id: this.financingPlanData.id });
                }
                if(this.financingPlanData.salesQuotaId){
                    this.$store.dispatch('item_getSalesQuota',{id:this.financingPlanData.salesQuotaId});
                }
                if(this.$route.params.projectId){
                    this.$store.dispatch('item_selectInvestorConditionByFinId', { id: this.$route.params.projectId });
                }
                if(this.financingPlanData.rewardPlanId){
                    this.$store.dispatch('item_getRewardPlan',{ id: this.financingPlanData.rewardPlanId});
                }
            })
            this.$store.dispatch('item_getInvestUserInfo',{id:this.$route.params.projectId}).then(()=>{
                this.invertUserNum=this.$store.state.item.invertUserInfo&&this.$store.state.item.invertUserInfo.length||0;
            })
            this.$store.dispatch('item_getProjectShow', { id: this.$route.params.projectId })
            this.$store.dispatch('item_getCreditAntiFraud',{id:this.$route.params.projectId});
            this.$store.dispatch('item_getExpertAd',{id:this.$route.params.projectId});
            this.$store.dispatch('item_selectMaterialByProjectId',{id:this.$route.params.projectId});
        },
        components: {
            expertTab,
            collarTab,
            enterpriseTeam,
            investorTab,
            planTab,
            discussTab,
            rightTab,
            detailIntroduction
        },
        computed: {
            show: function () {
                return this.$store.state.item.show;
            },
            itemManageDetail: function () {
                return this.$store.state.item.itemManageDetail || {};
            },
            financingPlanData: function () {
                return this.$store.state.item.financingPlanData || {};
            },
            enterpriseInfo: function () {
                return this.$store.state.enterprise.enterpriseInfo || {};
            },
            projectItem:function(){
                return this.$store.state.item.show;
            }    
        },
        data() {
            return {
                activeName: '1',
                invertUserNum:0,
                subjectCount:0,
            };
        },
        methods: {
            countDiscussNum(count){
                 this.subjectCount=count;
            },
            back() {
                this.$router.go(-1);
            }
        }
    };

</script>