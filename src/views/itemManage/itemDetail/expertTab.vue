<style>
/*tab1*/
.tab-first{width:80%;min-width: 520px;margin: 0 auto;}
.give-mark{padding: 30px 10px 10px 10px;}
.give-mark .el-rate__icon{font-size: 20px;}
.give-mark .el-rate__text{opacity: 0}
.expert-con{padding: 50px 10px;border-top: 1px solid #EEEEEE;border-bottom: 1px solid #EEEEEE;word-wrap:break-word;white-space:pre-wrap}
.remind{padding: 20px 0 30px 0;}
.remind span{color: #a3abbe;margin: 0 0 5px 10px;display: inline-block;}
.remind p{color: #ffc322;padding: 0 10px;}
</style>

<template>
   <!--tab1-->
    <div class="tab-first">
        <div class="give-mark">
            <el-rate
            v-model="expert.stars"
            disabled
            show-text
            text-color="#ff9900"
            text-template="{value}">
            </el-rate>
        </div>
        <div class="expert-con" v-html="expert.content">
            
        </div>
        <div class="remind">
            <span>免责声明及风险提醒：</span>
            <p>投资行为是一种较高风险的金融活动，本建议仅代表“行家”的看法，仅供参考，不构成个人投资决策意见。</p>
        </div>
    </div>
    <!--tab1-->
</template>
<script>
export default {
	name:'exportTab',
	computed: {
		expert:function(){
			return this.$store.state.item.expertAd||{}
        }
	},
	data() {
		return {
			star: 0,
			content:''
      }
    }
  }
</script>