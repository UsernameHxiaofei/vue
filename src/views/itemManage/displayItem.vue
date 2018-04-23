<style>
    .project {
        overflow: hidden;
        margin: 65px 30px 30px 30px;
        padding: 20px;
        background: white;
    }

    .img-left {
        width: 100%;
        height: 350px;
    }
    .item-channel {
		float: right;
		font-weight: bold;
		line-height: 40px;
		font-size: 16px;
	}

	.item-channelMark {
		float: right;
		height: 40px;
	}
    .charactor {
        height: 50px;
    }

    .charactor img {
        position: relative;
        left: 0;
        top: 0;
        width: 47px;
        height: 47px;
    }

    .charactor p {
        position: relative;
        left: 57px;
        top: -47px;
        word-break: keep-all;
        /* 不换行 */
        white-space: nowrap;
        /* 不换行 */
        overflow: hidden;
        /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;
    }

    .charactor span {
        position: relative;
        color: #c0c0c0;
        left: 57px;
        top: -70px;
    }

    .cur-box {
        margin: 10px 0;
    }

    .curlocal span {
        margin-right: 20px;
    }

    .pro-intro {
        margin-top: 10px;
        color: rgb(102, 102, 102);
    }

    .pro-mon {
        color: #c0c0c0;
    }

    .pro-mon span {
        margin-right: 15px;
    }

    .progress-box {
        margin-top: 10px;
        border-top: 1px solid rgb(153, 153, 153);
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        height: 40px;
    }

    .progress-box .progress-body {
        width: 75%;
        background: #e7e6e6;
        border-radius: 20px;
        height: 10px;
        padding: 15px;
        margin: 10px 0;
    }

    .progress-box .progress-line {
        background: #4a4a4a;
        height: 2px;
    }

    .progress-box .progress-number {

        position: relative;
        top: -4px;
        border-radius: 10px;
        width: 20%;
        height: 10px;
        background: #ff7200;
    }

    .progress-box .progress-number1 {
        margin-top: -5px;
        float: left;
        display: block;
        border-radius: 10px;
        width: 20%;
        height: 10px;
    }

    .progress-box .init {
        background: #fff100;
    }

    .progress-box .lead {
        background: #ff7200;
    }

    .progress-box .invest {
        background: #e43838;
    }

    .progress-box .progress-text {
        line-height: 50px;
        flex-basis: 200px;
        vertical-align: middle;
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
                    <div class="flag">
                        <span>{{show.status|projectStatus}}</span>
                    </div>
                </el-col>
                <el-col :span="14">
                    <span style="font-weight: bold;margin-bottom: 10px;font-size: 20px;color: rgb(51, 51, 51);">{{show.name}}</span>
                    <img class="item-channelMark" v-if="projectChannel.channelMark" :src="projectChannel.channelMark" :title="projectChannel.channelDesc" :alt="projectChannel.channelDesc">
				    <span class="item-channel">引入渠道：{{projectChannel.channelDesc}}</span>
                    <p class="pro-intro">{{show.summary}}</p>
                    <el-row>
                        <div :span="6" class="curlocal">
                            <span>
                                <img src="../../assets/images/local.png" /> {{show.regionCode|address}}</span>
                            <span>
                                <img src="../../assets/images/tag.png" /> {{show.industry|industry}}</span>
                        </div>
                    </el-row>
                    <el-row class="cur-box">

                        <el-col :span="8" class="charactor">
                            <img :src="show.initiatorImg" :alt="show.initiatorName" />
                            <p>{{show.initiatorName}}</p>
                            <br>
                            <span>发起</span>
                        </el-col>
                        <el-col :span="8" class="charactor">
                            <img :src="show.leadInvestorImg" :alt="show.leadInvestorName" />
                            <p>{{show.leadInvestorName}}</p>
                            <br>
                            <span>领投</span>
                        </el-col>
                        <el-col :span="8" class="charactor">
                            <img :src="show.expertImg" :alt="show.expertName" />
                            <p>{{show.expertName}}</p>
                            <br>
                            <span>行家</span>
                        </el-col>
                    </el-row>
                    <div class="progress-box">
                        <div class="progress-body">
                            <div class="progress-line">
                                <div class="progress-number" :style="{width:caculateRate(show.reserveRatio)>=100?'100%':caculateRate(show.reserveRatio)+'%'}"></div>
                            </div>
                        </div>
                        <div class="progress-text">
                            <span>&emsp;已预约
                                <b>{{caculateRate(show.reserveRatio)}}</b>%&emsp;
                                <span v-if="show.remainingdays&&show.remainingdays>0&&show.phase==8">
                                    剩
                                    <b>{{show.remainingdays|getProjectEndTime}}</b>天
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="progress-box">
                        <div class="progress-body">
                            <div class="progress-line">
                                <div class="progress-number1 init" :style="{width:caculateRate(show.initiatorRatio)+'%'}"></div>
                                <div class="progress-number1 lead" :style="{width:caculateRate(show.leadRatio)+'%'}"></div>
                                <div class="progress-number1 invest" :style="{width:caculateRate(show.raiseRatio-show.leadRatio-show.initiatorRatio)+'%'}"></div>
                            </div>
                        </div>
                        <div class="progress-text">
                            <span>&emsp;已筹
                                <b>{{caculateRate(show.raisedRatio)}}</b>%&emsp;
                                <span v-if="show.projectEndDys&&show.projectEndDys>0&&show.phase==8">剩
                                    <b>{{show.projectEndDys|getProjectEndTime}}</b>
                                </span>
                                <span v-if="show.remainingdays&&show.remainingdays>0&&show.phase>8&&show.phase<10">剩
                                    <b>{{show.remainingdays|getProjectEndTime}}</b>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="progress-box">
                        <div>
                            <span style="font-size:12px;" class="init">&emsp;</span>
                            &nbsp;项目方出资&nbsp;
                            <b>{{moneyF(show.commitmentAmount)+moneyF(show.investedAmount)}}</b>万元&emsp;
                            <span style="font-size:12px;" class="lead">&emsp;</span>
                            &nbsp;领投额&nbsp;
                            <b>{{show.investmentAmount|moneyFormat}}</b>万元&emsp;
                            <span style="font-size:12px;" class="invest">&emsp;</span>
                            &nbsp;已募&nbsp;
                            <b>{{show.raisedAmount|moneyFormat}}</b>万元&emsp;
                        </div>
                    </div>
                    <div>
                        <span>总投资额(万元)
                            <b>{{show.overallInvestment|moneyFormat}}</b>
                        </span>&emsp;&emsp;
                        <span>起投额(元)
                            <b>{{show.unitPrice||0}}</b>
                        </span>
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
                            <enterpriseTeam :showDisplay="true" style="margin:10px auto" v-if="activeName=='2'"></enterpriseTeam>
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
                <el-tab-pane label="行家点评" :name="'4'">
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
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import expertTab from './itemDetail/expertTab'
    import collarTab from './itemDetail/collarTab'
    import investorTab from './displayItem/investorTab'
    import planTab from './displayItem/planTab'
    import rightTab from './displayItem/rightTab'
    import detailIntroduction from './displayItem/detailIntroduction'
    import enterpriseTeam from '../enterpriseManage/enterpriseInfo/enterpriseTeam'
    import { moneyFormat } from '../../filters/index.js'

    export default {
        beforeMount() {
            this.$store.dispatch('item_getManageDetail', { id: this.$route.params.projectId }).then(() => {
                if (this.itemManageDetail.leadInvestorIntentionId) {
                    this.$store.dispatch('item_getLeadAd', { id: this.itemManageDetail.leadInvestorIntentionId })
                }
                if (this.itemManageDetail.enterpriseId) {
                    this.$store.dispatch('enterprise_getInfo', { id: this.itemManageDetail.enterpriseId })
                }
                if (this.itemManageDetail.detailedIntroductionId) {
                    this.$store.dispatch('item_getDetailedIntroduction', { id: this.itemManageDetail.detailedIntroductionId })
                }
                if (this.itemManageDetail.financingPlanId) {
                    return this.$store.dispatch('item_getFinancingPlan', { id: this.itemManageDetail.financingPlanId })
                } else {
                    return false
                }
            }).then(() => {
                if (this.financingPlanData.id) {
                    this.$store.dispatch('item_getInvestedEvidence', { id: this.financingPlanData.id })
                }
                if (this.financingPlanData.salesQuotaId) {
                    this.$store.dispatch('item_getSalesQuota', { id: this.financingPlanData.salesQuotaId })
                }
                if (this.$route.params.projectId) {
                    this.$store.dispatch('item_selectInvestorConditionByFinId', { id: this.$route.params.projectId })
                }
                if (this.financingPlanData.rewardPlanId) {
                    this.$store.dispatch('item_getRewardPlan', { id: this.financingPlanData.rewardPlanId })
                }
            })
            this.$store.dispatch('item_getInvestUserInfo', { id: this.$route.params.projectId }).then(() => {
                this.invertUserNum = this.$store.state.item.invertUserInfo && this.$store.state.item.invertUserInfo.length || 0
            })
            this.$store.dispatch('item_getProjectChannel',{ id: this.$route.params.projectId })
            this.$store.dispatch('item_getProjectShow', { id: this.$route.params.projectId })
            this.$store.dispatch('item_getCreditAntiFraud', { id: this.$route.params.projectId })
            this.$store.dispatch('item_getExpertAd', { id: this.$route.params.projectId })
            this.$store.dispatch('item_selectMaterialByProjectId', { id: this.$route.params.projectId })
        },
        components: {
            expertTab,
            collarTab,
            enterpriseTeam,
            investorTab,
            planTab,
            rightTab,
            detailIntroduction
        },
        computed: {
            show: function () {
                return this.$store.state.item.show
            },
            itemManageDetail: function () {
                return this.$store.state.item.itemManageDetail || {}
            },
            financingPlanData: function () {
                return this.$store.state.item.financingPlanData || {}
            },
            enterpriseInfo: function () {
                return this.$store.state.enterprise.enterpriseInfo || {}
            },
            projectItem: function () {
                return this.$store.state.item.show
            },
            leadAd: function () {
                return this.$store.state.item.leadAd || {}
            },
            projectChannel: function () {
                return this.$store.state.item.projectChannel || {}
            }
        },
        data() {
            return {
                activeName: '1',
                invertUserNum: 0,
                moneyF: moneyFormat
            }
        },
        methods: {
            caculateRate(num) {
                try {
                    if (!parseFloat(num)) {
                        return 0;
                    }
                } catch (error) {
                    return 0;
                }
                let temp = parseFloat(num * 100);
                if (temp.toString().indexOf('.') == -1) {
                    return temp;
                } else {
                    if (temp.toString().split('.')[1] && temp.toString().split('.')[1].length <= 2) {
                        return Number(temp);
                    }
                    return Number(temp.toFixed(2));
                }
            },
            back() {
                this.$router.go(-1)
            }
        }
    }

</script>