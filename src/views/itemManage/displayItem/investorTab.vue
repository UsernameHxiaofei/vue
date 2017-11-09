<style>
.sul-list{margin-top: 26px;}
.sulpture{width: 47px;height: 47px;border-radius: 50%;}
.support{color: #666666;}
.sdate{color: #cccccc;}
</style>
<template>
  <div>
        <div style="padding:30px;">
            <el-row>
                <div v-for="(item,index) in investUserInfo" :key="index" class="investor" v-show="index<max">
                    <el-col :span="12" class="sul-list" >
                        <el-row>
                            <el-col :span="5"><img class="sulpture" :src="item.investUserHeadFigureURL||'../../../assets/images/headimg.png'" /></el-col>
                            <el-col :span="11" ><span>{{item.investUserNickname}}</span><br/><span class="support">支持了{{item.investAmount}}元</span></el-col>
                            <el-col :span="6"><span class="sdate">{{item.investTime}}</span></el-col>
                        </el-row>
                    </el-col>
                </div>
            </el-row>
        </div>
        <p style="text-align:center;">
            <el-button @click="more" :disabled="flag">{{flag?'没有更多':'更多'}}</el-button>
        </p>
  </div>
</template>
<script>
export default {
	name: 'investor',
	computed: {
		investUserInfo:function(){
			return this.$store.state.item.invertUserInfo||[]
		},
		flag:function(){
			return this.max>=(this.investUserInfo.length||0)
		}
	},
	data () {
		return {
			max:10      
		}
	},
	methods: {
		more(){
			this.max=this.investUserInfo.length
		}
	}
}
</script>
