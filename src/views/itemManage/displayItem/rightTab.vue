<style>
.credit{height: 200px;background: #f2efe9}
.credit-title{color: white;background: #06ccb7;width: 130px;height: 35px;line-height: 35px;
margin-left: -10px;margin-top: 15px;display: inline-block;text-align: center;}
.down{overflow: hidden;padding: 15px;margin-bottom: 0px;}
.downpage a{padding-bottom: 3px;margin-bottom: 8px;display: inline-block;cursor: pointer;}
.downpage a:hover{border-color: #65d7c7;color: #65d7c7;}
.downpage a:active{border-color: #65d7c7;color: #65d7c7;}
.credit-bottom{height:10px;background: #f2efe9}
.credit-message{
    padding:15px 30px 0 30px;
    display: block;
    color: #65d7c7;
}
</style>
<template>
  <div>
      <div class="credit">
            <span class="credit-title">项目征信评级</span>
            <span class="credit-message">企业等级：{{credit.grade||'未分级'}}</span>
            <span class="credit-message">项目评分：{{credit.score&&parseFloat(credit.score)&&parseFloat(credit.score).toFixed(2)||'未评分'}}</span>
      </div>
      <div class="down">
          <div v-for="item in materials" class="downpage">
            <el-col>
                <a :href="'/ajax/filedownload?url='+encodeURIComponent(item.materialURL)+'&name='+encodeURIComponent(item.name)">{{item.name}}</a>
            </el-col>
        </div>
      </div>
      <div class="credit-bottom">

      </div>
  </div>
</template>
<script>
export default {
	name: 'downpage',
	computed: {
		materials:function(){
			return this.$store.state.item.materials
		},
		credit:function(){
			return this.$store.state.item.credit
		}  
	},
	beforeMount () {
        
	}
}
</script>
