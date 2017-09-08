<style>
.plan-box{width: 600px;margin: 10px auto 30px auto;}
.basic-divider{margin: 20px 0;}
.basic-divider span{margin-left: 5px;color: #333333;font-size: 18px;font-weight: bold;vertical-align: middle;}
.borders{padding: 25px 0;border-top: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;}
.basic-list{margin-bottom: 40px;}
.span-label{color: #666666;}
.span-con{color: #333333;font-weight: bold;}

.rewardLable{
    height:50px
}
</style>
<template>
  <div>
      <div class="plan-box">
           <div class="basic-divider">
                <img src="../../../assets/images/linear.png" /> <span>融资基本情况</span>
            </div>
            <div class="borders">
                <div class="basic-list">
                    <el-row>
                        <el-col :span="5">
                            <span class="span-label">总投资额</span><br/><span class="span-con">{{financingPlanData.overallInvestment/10000||0}}万</span>
                        </el-col>
                        <el-col :span="5">
                            <span class="span-label">目标融资额</span><br/><span class="span-con">{{financingPlanData.financingAmount/10000||0}}万</span>
                        </el-col>
                        <el-col :span="5">
                            <span class="span-label">已投入额</span><br/><span class="span-con">{{financingPlanData.investedAmount/10000||0}}万</span>
                        </el-col>
                        <el-col :span="5">
                            <span class="span-label">承诺出资</span><br/><span class="span-con">{{financingPlanData.commitmentAmount/10000||0}}万</span>
                        </el-col>
                        <el-col :span="4">
                            <span class="span-label">出让股权</span><br/><span class="span-con">{{financingPlanData.transferringSharesRatio*100}}%</span>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col :span="10">已投入额凭据</el-col>
                    <el-col :span="14">
                         <el-button v-for="(item,index) in investedEvidence" :key="item.index">
                             <a :href="'/ajax/filedownload?url='+encodeURIComponent(item.evidenceURL)+'&name='+encodeURIComponent(item.name)" >{{item.name}}</a>
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="basic-divider">
                <img src="../../../assets/images/linear.png" /> <span>投资人条件</span>
            </div>
            <div class="borders">
                <el-row>
                    <el-col :span="7">
                        <span class="span-label">籍贯</span><br/><span class="span-con">{{investorCondition.permanent|addressCondition}}</span>
                    </el-col>
                    <el-col :span="7">
                        <span class="span-label">常驻地区</span><br/><span class="span-con">{{investorCondition.investorNativePlace|addressCondition}}</span>
                    </el-col>
                </el-row>
            </div>
             <div class="basic-divider">
                <img src="../../../assets/images/linear.png" /> <span>股权/消费权拆分</span>
            </div>
            <div class="borders">
                <el-row>
                    <el-col :span="5">
                        <span class="span-label">目标融资额</span><br/><span class="span-con">{{financingPlanData.financingAmount/10000||0}}万</span>
                    </el-col>
                    <el-col :span="5">
                        <span class="span-label">领投额</span><br/><span class="span-con">{{leadAd.investmentAmount?((leadAd.investmentAmount||0)/10000).toFixed(2)+'万':'确定中'}}</span>
                    </el-col>
                    <el-col :span="5">
                        <span class="span-label">待上线融资额</span><br/><span class="span-con">{{salesQuota.salesAmount?salesQuota.salesAmount/10000+'万':'未设置'}}</span>
                    </el-col>
                    <el-col :span="5">
                        <span class="span-label">拆为</span><br/><span class="span-con">{{salesQuota.quantity?salesQuota.quantity+'份':'未设置'}}</span>
                    </el-col>
                    <el-col :span="4">
                        <span class="span-label">每份购买价</span><br/><span class="span-con">{{salesQuota.unitPrice?salesQuota.unitPrice+'元':'未设置'}}</span>
                    </el-col>
                </el-row>
            </div>
             <div class="basic-divider">
                <img src="../../../assets/images/linear.png" /> <span>回报设置</span>
            </div>
            <div class="borders">
                <el-row>
                    <el-col :span="8" class="rewardLable">
                        <span class="span-label">回报方式</span><br/>
                        <span class="span-con">{{rewardPlan.consumable ==0 ? '股权' : '消费权'}}</span>
                    </el-col>
                    <el-col :span="8" class="rewardLable">
                        <span class="span-label">股权回购期限</span><br/><span class="span-con">{{rewardPlan.repurchaseYearsFrom ||'--'}}年到{{rewardPlan.repurchaseYearsTo || '--'}}年</span>
                    </el-col>
                    <el-col :span="8" class="rewardLable">
                        <span class="span-label">股权回购费率买价</span><br/><span class="span-con">{{rewardPlan.repurchaseRateFrom*100 || '--'}}%至{{rewardPlan.repurchaseRateTo*100 || '--'}}%</span>
                    </el-col>
                    <el-col :span="24" class="rewardLable">
                        <span class="span-label">详细说明</span><br/><span class="span-con">{{rewardPlan.consumableDescription&&rewardPlan.consumableDescription.length==0?'无':rewardPlan.consumableDescription}}</span>
                    </el-col>
                </el-row>
            </div>
      </div>
  </div>
</template>
<script>
    export default {
        name: 'displayPlan',
        computed: {
            financingPlanData: function () {
                return this.$store.state.item.financingPlanData || {};
            },
            investedEvidence: function () {
                return this.$store.state.item.investedEvidence || {};
            },
            investorCondition: function () {
                return this.$store.state.item.investorCondition || {};
            },
            rewardPlan:function(){
                return this.$store.state.item.rewardPlan || {};
            },
            salesQuota:function(){
                return this.$store.state.item.salesQuota || {};
            },
            leadAd:function(){
                return this.$store.state.item.leadAd||{};
            }
        },
        mounted () {
            
        }
    }
</script>