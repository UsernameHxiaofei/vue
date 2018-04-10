<style>
/*tab2*/
.collar-box{margin: 0 auto;padding-top: 30px;width:80%;min-width: 890px;overflow: hidden;}
.expert-advice{width: 520px;float: left;}
.collar{padding: 0 10px;color: #666666;font-size: 18px;font-weight: bold}
.collar em{font-style: normal;color: #06ccb6;margin: 0 100px 0 20px;font-size: 16px;}
.expert-con{padding: 50px 10px;border-top: 1px solid #EEEEEE;border-bottom: 1px solid #EEEEEE;word-wrap:break-word;white-space:pre-wrap}
.expert-con p{color: #666666;margin-bottom: 20px;text-align: justify;padding: 0 10px;}
.expert-con p:last-child{margin-bottom: 0;}
.remind{padding: 20px 0 30px 0;}
.remind span{color: #a3abbe;margin: 0 0 5px 10px;display: inline-block;}
.remind p{color: #ffc322;padding: 0 10px;}
.main-pic{margin: 5px 0 0 70px;float: left;}
</style>
<template>
   <!--tab2-->
    <div class="tab-second">
        <div class="collar-box">
            <div class="expert-advice">
                <p class="collar"><span>领投金额<em>{{leadAd.investmentAmount|moneyFormat}}万</em></span><span>领投比例<em>{{(leadAd.investmentRatio||0)*100+'%'}}</em></span></p>
                <div class="expert-con" v-html="leadAd.opinion"></div>
                <div class="remind">
                    <span>免责声明及风险提醒：</span>
                    <p>投资行为是一种较高风险的金融活动，本建议仅代表“领投”的看法，仅供参考，不构成个人投资决策意见。</p>
                </div>
            </div>
            <div class="main-pic" v-show="leadAd.surveyReportURL&&leadAd.surveyReportURL.length>0">
                <a v-if="leadAd.surveyReportURL" :href="'/ajax/filedownload?url='+encodeURIComponent(leadAd.surveyReportURL)">领投资料({{leadAd.surveyReportURL}})</a>
            </div>
        </div>
    </div>
    <!--tab2-->
</template>
<script>
export default {
	name:'collarTab',
	computed: {
		leadAd:function(){
			return this.$store.state.item.leadAd||{}
		},
		itemManageDetail: function () {
			return this.$store.state.item.itemManageDetail||{}
		}
	}
}
</script>

