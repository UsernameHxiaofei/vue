<template>
    <div style="width:100%;height: 100%;background: #fff;margin: auto;">
        <div class="hangjiashenhe">
            <div class="look-btn" v-show="actor.category==5">
                <el-button type="warning" @click="lookAssessment">{{look?"查看合格投资人认证记录":"查看个人投资者风险承受能力评估问卷"}}</el-button>
            </div>
            <assessment v-if="look"></assessment>
            <ul v-if="!look">
                <h3 v-show="actor.category==4">代理人</h3>
                <li>
                    <label>手机号</label>
                    <span>{{actor.mobileNumber}}</span>
                </li>
                <li>
                    <label>真实姓名</label>
                    <span  v-if="actor.category==5">{{investorData.realName}}</span>
                    <span  v-if="actor.category==4">{{customer.actorEnter&&customer.actorEnter.gentName}}</span>
                </li>
                <li>
                    <label>身份证号</label>
                    <span v-if="actor.category==5">{{investorData.identNumber}}</span>
                    <span v-if="actor.category==4">{{customer.actorEnter&&customer.actorEnter.gentIdcard}}</span>
                </li>
                <h3 v-show="actor.category==4">企业</h3>
                <li  v-if="actor.category==4">
                    <label>企业名称</label>
                    <span>{{actor.name}}</span>
                </li>
                <li  v-if="actor.category==4">
                    <label>统一社会信用代码</label>
                    <span>{{actor.identNumber}}</span>
                </li>
                <li  v-if="actor.category==4">
                    <label>所在地</label>
                    <span>{{customer.actorEnter&&customer.actorEnter.addressCode|address}}</span>
                </li>
                <li  v-if="actor.category==4">
                    <label>企业情况</label>
                    <span>{{investorData.industryLevel|enterpriseIndustryLevel}}</span>
                </li>
                <li>
                    <label>关注行业</label>
                    <span class="zhuanzhuhangye">
                        <span>{{investorData.industry|industry}}</span>
                    </span>
                </li>
                <li  v-if="actor.category==5">
                    <label>所属单位</label>
                    <span>{{investorData.organization}}</span>
                </li>
                <li v-if="actor.category==5">
                    <label>职位</label>
                    <span>{{investorData.position}}</span>
                </li>
                <li v-if="actor.category==5">
                    <label>籍贯</label>
                    <span>{{investorData.birthplace|address}}</span>
                </li>
                <li v-if="actor.category==5">
                    <label>常驻地区</label>
                    <span>{{investorData.usualPlace|address}}</span>
                </li>
                <li v-if="actor.category==5">
                    <label>个人情况</label>
                    <span class="zhuanzhuhangye">
                         <span>{{investorData.industryLevel|industryLevelforInvestor}}</span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import assessment from './assessment.vue'
export default {
	components: {
		assessment,
	},
	computed: {
        customer: function () {
			return this.$store.state.customer.customerIndividualInfoByActorId
		},
		actor: function () {
			return this.$store.state.customer.customerInfoByActorId
		},
		investorData: function () {
			if (!this.$store.state.customer.investorData) {
				return {
					tel: '',
					realName: '',
					industryLevel: '',
					usualPlace: '',
					regionCode: '',
					organization: '',
					position: '',
					industry: '',
					identNumber: '',
				}
			} else {
				return this.$store.state.customer.investorData

			}
		},
	},
	data() {
		return {
			look: false
		}
	},
	beforeMount() {
		this.investorInit()
	},
	methods: {
		investorInit() {
			let param = {
				id: this.$route.params.actorId,
			}
			this.$store.dispatch('investorByActorId', param)
		},
		lookAssessment() {
			this.look = !this.look
		}

	},
	// this.$on('id-selected', function (id) {
	//     // ...
	// })
}
</script>
<style scoped>
body {
    background-color: #fcfcfc;
}

.content {
    background-color: #fcfcfc;
}

.hangjiashenhe {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    font-size: 14px;
}

.look-btn {
    overflow: hidden;
}

.look-btn button {
    float: right;
    margin-top: 20px;
}

.hangjiashenhe ul {
    margin-left: 100px;
    padding-top: 16px;
    list-style: none;
}

.hangjiashenhe li {
    margin-top: 10px;
}

.hangjiashenhe label {
    width: 100px;
    font-weight: 400;
    color: #999;
    text-align: right;
    margin-right: 20px;
}

.hangjiashenhe li>span {
    display: inline-block;
    width: 300px;
    color: #333;
}

.hangjiashenhe .zhuanzhuhangye {
    padding: 10px;
    border: 1px solid #ccc;
}

.zhuanzhuhangye span {
    display: inline-block;
    font-size: 13px;
    margin-right: 10px;
}

.hangjiashenhe .btn-box-c {
    padding: 15px;
    text-align: center
}
</style>

<style>

</style>
