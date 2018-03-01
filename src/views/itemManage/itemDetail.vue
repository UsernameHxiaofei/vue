<style>
	/*步骤条*/

	#step-bar {
		background: #fcfcfc;
		padding: 15px 30px;
	}

	#step-bar .el-step__icon {
		line-height: 24px;
	}

	#step-bar .el-step:last-child {
		width: auto!important;
	}

	/*项目信息*/

	.item-info {
		display: flex;
		flex-flow: row nowrap;
		padding: 30px;
		border-top: 1px solid #eeeeee;
		border-bottom: 1px solid #eeeeee;
		overflow: hidden;
	}

	.com-img {
		float: left;
		margin-right: 20px;
		width: 26%;
		min-width: 300px;
		height: 230px;
	}

	.item-con {
		float: left;
		width: 70%;
		align-self: flex-start;
	}

	.item-title {
		font-weight: bold;
		font-size: 18px;
		line-height: 40px;
		margin: 0;
	}

	.item-channel {
		float: right;
		font-weight: bold;
		line-height: 40px;
		font-size: 16px;
	}

	.item-channelMark {
		position: relative;
        height:40px;
        left:20px;
	}

	.item-list-info .grid-content {
		color: #666666;
		line-height: 29px;
	}

	.btn-team {
		margin-top: 20px;
	}

	#btnt-l {
		float: left;
	}

	#btnt-r {
		float: right;
	}

	#btnt-l .el-button {
		background: #06ccb6;
		border-color: #06ccb6;
		color: white;
		min-width: 100px;
	}

	#btnt-l .el-button:first-child {
		margin-left: 0px;
	}

	#btnt-l .el-button:hover {
		background: #fff;
		border-color: #06ccb6;
		color: #06ccb6;
		min-width: 100px;
	}

	#btnt-r .el-button {
		border-color: #06ccb6;
		color: #06ccb6;
		min-width: 100px;
		margin-left: 10px;
	}

	#btnt-r .el-button:hover {
		border-color: #06ccb6;
		background: #06ccb6;
		color: #fff;
		min-width: 100px;
		margin-left: 10px;
	}

	#btnt-r .reCreate {
		background-color: #fbc937;
		color: white;
		border: 1px solid #fbc937
	}

	#btnt-r .reCreate:hover {
		background-color: white;
		color: #fbc937;
		border: 1px solid #fbc937
	}

	/*tabber*/

	#tabber .el-tabs__header {
		background: #fcfcfc;
		padding: 10px 30px 10px 30px;
		margin: 0;
		border-color: #eeeeee;
	}

	#tabber .el-tabs__item {
		height: 30px;
		line-height: 30px;
		padding: 0 13px;
		background: #e2e6ef;
		color: #a3abbe;
		border-radius: 15px;
		margin-right: 10px;
		font-size: 12px;
	}

	#tabber .el-tabs__item.is-active {
		color: #06ccb6;
	}

	#tabber .el-tabs__active-bar {
		display: none!important;
	}

	#tabber .el-tabs__content {
		margin: 0 30px;
		border-left: 1px solid #eeeeee;
		border-right: 1px solid #eeeeee;
	}

	.cur-step {
		color: #fbc937;
	}

	.time-input .el-date-editor.el-input {
		width: 92%;
	}

	.time-input .el-form-item__label {
		width: 135px!important;
	}

	.time-input .el-input {
		width: 80%;
	}

	.time-input .el-form-item__content {
		margin-left: 135px!important;
	}

	/*有限合伙弹窗*/

	.refuse-form .el-form-item__label {
		width: 135px!important;
	}

	.refuse-form .el-input {
		width: 80%;
	}

	.refuse-form .el-form-item__content {
		margin-left: 135px!important;
	}
</style>

<template>
	<div id="item">
		<!--步骤条-->
		<el-row>
			<el-col id="step-bar">
				<el-steps :space="'7.0%'" :active="itemManageDetail.phase-1">
					<el-step v-for="(item , index) in projectList" :title="item.label" :key="item.value"></el-step>
				</el-steps>
			</el-col>
		</el-row>
		<!--项目信息-->
		<div class="item-info">
			<img class="com-img" :src="itemManageDetail.imageURL||''" alt="项目展示图" />
			<div class="item-con">
				<span class="item-title">{{itemManageDetail.name}}
						<img class="item-channelMark" v-if="projectChannel.channelMark" :src="projectChannel.channelMark" :title="projectChannel.channelDesc"
						:alt="projectChannel.channelDesc">
				</span>
				<div class="item-list-info">
					<el-row>
						<el-col :span="6">
							<div class="grid-content">发&nbsp;起&nbsp;人：{{itemManageDetail.initiatorName}}</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">目标融资额：{{itemManageDetail.financingAmount|moneyFormat}}万</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">融资时间：{{itemManageDetail.financingDays}}天</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">项目编号：{{itemManageDetail.code}}</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<div class="grid-content">所属行业：{{itemManageDetail.industry|industry}}</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">出让股份：{{((itemManageDetail.transferringSharesRatio||0)*100).toFixed(2)}}%</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">项目发起：{{itemManageDetail.createTime}}</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">行&emsp;&emsp;家：{{itemManageDetail.expertName}}</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<div class="grid-content">所属地区：{{itemManageDetail.regionCode|address}}</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">已投入额：{{itemManageDetail.investedAmount|moneyFormat}}万</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">发起次数：{{itemManageDetail.ordinal}}</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">领&emsp;&emsp;投：{{itemManageDetail.leadInvestorName}}</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<div class="grid-content">总投资额：{{itemManageDetail.overallInvestment|moneyFormat}}万</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">承诺出资：{{itemManageDetail.commitmentAmount|moneyFormat}}万</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">阶&emsp;&emsp;段：
								<span class="cur-step">{{itemManageDetail.phase|projectPhase}}</span>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content">状&emsp;&emsp;态：{{itemManageDetail.status|projectStatus}}</div>
						</el-col>
					</el-row>
				</div>
				<div class="btn-team">
					<div id="btnt-l" v-if="itemManageDetail.status!=12">
						<el-button @click="pass" v-if="itemManageDetail.phase==4||itemManageDetail.phase==5">通过</el-button>
						<el-button v-if="itemManageDetail.phase==4||itemManageDetail.phase==5" @click="dialogStopVisible = true">拒绝</el-button>
						<el-button @click="editProject" :disabled="isEdit" v-if="itemManageDetail.phase==6">{{isEdit?'项目已编辑':'编辑项目'}}</el-button>
						<el-button @click="setTimeInfo" :disabled="isSetTime" v-if="itemManageDetail.phase==7">{{isSetTime?'已设置上线时间':'设置上线时间'}}</el-button>
						<el-button @click="dialogPartnerVisible = true" :disabled="isPartner" v-if="itemManageDetail.phase==10">{{isPartner?'已关联有限合伙':'关联有限合伙'}}</el-button>
						<el-button @click="dialogAuthVisible = true" :disabled="isAuth" v-if="itemManageDetail.phase==10">银账信息审核</el-button>
						<el-button @click="dialogMerchantVisible = true" v-if="itemManageDetail.phase==10">{{'关联聚合支付商户信息'}}</el-button>
						<el-button @click="fangkuan" :disabled="isFun" v-if="itemManageDetail.phase==11">{{isFun?'放款申请中':'放款申请'}}</el-button>
						<el-button @click="continueEdit" v-if="itemManageDetail.phase==1">继续申请</el-button>
						<el-button @click="deleteItem" v-if="itemManageDetail.phase==1">删除项目</el-button>
					</div>
					<div id="btnt-r">
						<el-button class="reCreate" v-if="operator.id=='02a58390-037a-4d52-8e43-5cd8dbc31e3e'" :disabled="itemManageDetail.status==12" @click="open2">{{itemManageDetail.status==12?'已重新发起':'重新发起'}}</el-button>
						<router-link v-if="itemManageDetail.phase>1" :to="{path: '/enterpriseDetail/'+enterpriseInfo.id}">
							<el-button v-if="enterpriseInfo.id">企业详情</el-button>
						</router-link>
						<router-link v-if="itemManageDetail.phase>1" :to="{path: '/displayItem/'+projectId}">
							<el-button>项目展示</el-button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<!--tabber-->
		<div id="tabber">
			<el-tabs v-model="activeName">
				<el-tab-pane label="行家建议" name="1" v-if="itemManageDetail.phase>=3">
					<expertTab v-show="activeName=='1'"></expertTab>
				</el-tab-pane>
				<el-tab-pane label="领投意向" name="2" v-if="itemManageDetail.leadInvestorIntentionId||itemManageDetail.phase>=4">
					<collarTab v-show="activeName=='2'"></collarTab>
				</el-tab-pane>
				<el-tab-pane label="工商信息" name="3" v-if="itemManageDetail.phase>=5">
					<industryTab v-if="activeName=='3'"></industryTab>
				</el-tab-pane>
				<el-tab-pane label="司法涉诉" name="4" v-if="itemManageDetail.phase>=5">
					<riskTab v-if="activeName=='4'"></riskTab>
				</el-tab-pane>
				<!-- <el-tab-pane label="企业关系图谱" name="5" v-if="itemManageDetail.phase>=5">
					<enterpriseRelationship></enterpriseRelationship>
				</el-tab-pane> -->
				<el-tab-pane label="第三方征信报告" name="6" v-if="itemManageDetail.phase>=5">
					<thirdAuth  v-if="activeName=='8'"></thirdAuth>
				</el-tab-pane>
				<el-tab-pane label="审核结论" name="7" v-if="itemManageDetail.phase>=4">
					<resultTab v-if="activeName=='7'"></resultTab>
				</el-tab-pane>
				<el-tab-pane label="时间信息" name="8" v-if="itemManageDetail.phase>=7">
					<timeTab  v-if="activeName=='8'"></timeTab>
				</el-tab-pane>
				<el-tab-pane label="有限合伙信息" v-if="itemManageDetail.phase>=10" name="9">
					<partnerTab v-show="activeName=='9'"></partnerTab>
				</el-tab-pane>
				<el-tab-pane label="银账授权信息" v-if="itemManageDetail.phase>=10" name="10">
					<resisAuthTab :item="itemManageDetail" v-if="activeName=='10'"></resisAuthTab>
				</el-tab-pane>
				<el-tab-pane label="聚合支付商户信息" v-if="itemManageDetail.phase>=10" name="11">
					<merchant :item="itemManageDetail" v-if="activeName=='11'"></merchant>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!--拒绝理由弹窗-->
		<div class="p-form">
			<dialogComponent :title="'拒绝理由'" :dialogFormVisible="dialogStopVisible" @dialog-confirm-callback="refuse" @dialog-cancel-callback="cancel">
				<el-form :model="reject" :rules="rule2" ref="reject">
					<el-form-item label="拒绝理由" prop="desc">
						<el-input class="inputing" type="textarea" v-model="reject.desc" placeholder="请输入拒绝理由..."></el-input>
					</el-form-item>
				</el-form>
			</dialogComponent>
		</div>

		<!--关联有限合伙弹窗-->
		<div class="p-form  refuse-form">
			<dialogComponent :title="'关联有限合伙'" :dialogFormVisible="dialogPartnerVisible" @dialog-confirm-callback="partner" @dialog-cancel-callback="quit">
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
					<el-form-item prop="bankProvince" label="开户行省名" :label-width="formLabelWidth">
						<el-input v-model="limitform.bankProvince" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="bankCity" label="开户行市名" :label-width="formLabelWidth">
						<el-input v-model="limitform.bankCity" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="bankOrgnizationName" label="开户行机构名" :label-width="formLabelWidth">
						<el-input v-model="limitform.bankOrgnizationName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="bankAccount" label="银行账户" :label-width="formLabelWidth">
						<el-input v-model="limitform.bankAccount" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="protocol" label="有限合伙协议模板" :label-width="formLabelWidth">
						<el-upload ref="partnerContractDemo" :multiple="false" action="/ajax/fileupload" :auto-upload="true" :on-remove="protocol_remove"
						 :before-upload="beforeUpload" :on-success="protocolUpload" :data="{fileType:2}">
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
					</el-form-item>
				</el-form>
			</dialogComponent>
		</div>
		<!--关联聚合支付商户信息-->
		<div class="p-form  refuse-form">
			<dialogComponent :title="'关联聚合支付商户信息'" :dialogFormVisible="dialogMerchantVisible" @dialog-confirm-callback="merchantSubmit"
			 @dialog-cancel-callback="merchantQuit">
				<el-form :model="merchantForm" ref="merchantForm" :rules="merchantFormRules" :label-width="'200px'" style="width:80%">
					<el-form-item prop="customer_num" label="商户编号">
						<el-input v-model="merchantForm.customer_num" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="short_name" label="商户简称">
						<el-input v-model="merchantForm.short_name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="shop_num" label="店铺编号">
						<el-input v-model="merchantForm.shop_num" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="shop_name" label="店铺名称">
						<el-input v-model="merchantForm.shop_name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="shop_name" label="机具号">
						<el-input v-model="merchantForm.machine_num" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="tradeType" label="交易类型">
						<el-radio v-model="merchantForm.tradeType" :label="1">聚合支付</el-radio>
						<el-radio v-model="merchantForm.tradeType" :label="2">POS刷卡</el-radio>
					</el-form-item>
					<el-form-item prop="channel" label="渠道类型">
						<el-radio v-for="item in channelOptions" :key="item.value" v-model="merchantForm.channel" :label="item.value">{{item.label}}</el-radio>
					</el-form-item>
				</el-form>
			</dialogComponent>
		</div>
		<div class="p-form  refuse-form">
			<el-dialog :title="'银账信息审核'" :visible.sync="dialogAuthVisible" :close-on-click-modal="false">
				<el-row>
					<el-button type="default" style="margin-left:10px ;" @click="auth(1)">通过</el-button>
					<el-button type="primary" style="margin-left:2em;" @click="auth(2)">拒绝</el-button>
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
		<div class="p-form time-input">
			<dialogComponent title="设置时间信息" :dialogFormVisible="dialogTimeVisible" @dialog-confirm-callback="time" @dialog-cancel-callback="cancelTime">
				<el-form :model="dateform" :rules="daterule" ref="dateform">
					<el-form-item prop="reserveBegin" label="预约开始" required :label-width="formLabelWidth">
						<el-date-picker v-model="dateform.reserveBegin" type="datetime">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="reserveEnd" label="预约结束" required :label-width="formLabelWidth">
						<el-date-picker v-model="dateform.reserveEnd" type="datetime">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="subscriptionStartTime" required label="专享认购开始" :label-width="formLabelWidth">
						<el-date-picker v-model="dateform.subscriptionStartTime" type="datetime">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="subscriptionEndTime" required label="专享认购结束" :label-width="formLabelWidth">
						<el-date-picker v-model="dateform.subscriptionEndTime" type="datetime">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="crowdFundingBegin" required label="众投开始" :label-width="formLabelWidth">
						<el-date-picker v-model="dateform.crowdFundingBegin" type="datetime">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="crowdFundingEnd" required label="众投结束" :label-width="formLabelWidth">
						<el-date-picker v-model="dateform.crowdFundingEnd" type="datetime">
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
	// import enterpriseRelationship from './itemDetail/enterpriseRelationship.vue'
	import thirdAuth from './itemDetail/thirdAuth.vue'
	import merchant from './itemDetail/merchant.vue'

	import dialogComponent from '../../components/common/dialog'
	import projectList from '../../constant/projectPhase.js'
	import channels from '../../constant/payChannels.js'
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
			// enterpriseRelationship,
			thirdAuth,
			dialogComponent,
			merchant
		},
		computed: {
			itemManageDetail: function () {
				return this.$store.state.item.itemManageDetail || {}
			},
			enterpriseInfo: function () {
				return this.$store.state.enterprise.enterpriseInfo || {}
			},
			timeInfo: function () {
				return this.$store.state.item.timeInfo || {}
			},
			partnerInfo: function () {
				return this.$store.state.item.partnerInfo || {}
			},
			isPartner: function () {
				return !!this.partnerInfo.name
			},
			isAuth: function () {
				return !!this.$store.state.item.isAuth
			},
			operator: function () {
				return this.$store.state.login.actor
			},
			merchant: function () {
				return this.$store.state.item.merchant || {}
			},
			projectChannel: function () {
				return this.$store.state.item.projectChannel || {}
			}
		},
		beforeMount() {
			this.$store.dispatch('item_getProjectChannel', { id: this.projectId })
			this.$store.dispatch('item_getManageDetail', { id: this.projectId }).then(() => {
				if (this.itemManageDetail.enterpriseId) {
					this.$store.dispatch('enterprise_getInfo', { id: this.itemManageDetail.enterpriseId })
				}
				if (this.itemManageDetail.leadInvestorIntentionId) {
					this.$store.dispatch('item_getLeadAd', { id: this.itemManageDetail.leadInvestorIntentionId })
				}
				if (this.itemManageDetail.phase == 11) {
					this.$store.dispatch('item_getIsFun', { id: this.projectId, size: 10, num: 1 }).then(() => {
						if (!!this.$store.state.item.isFun && !!this.$store.state.item.isFun.content && this.$store.state.item.isFun.content.length > 0) {
							this.isFun = true
						}
					})
				}
				if (this.itemManageDetail.auxiliary && this.itemManageDetail.auxiliary.currentNodeId == 'contentEdit') {
					this.isEdit = false
				} else if (this.itemManageDetail.auxiliary && this.itemManageDetail.auxiliary.currentNodeId == 'contentAffirm') {
					this.isEdit = true
				}
				this.$store.dispatch('item_getTimeInfo', { id: this.projectId }).then(() => {
					if (this.itemManageDetail.phase >= 7) {
						if (this.$store.state.item.timeInfo.reserveBegin) {
							this.isSetTime = true
						}
					}
				})
				if (this.itemManageDetail.phase >= 2) {
					this.$store.dispatch('item_getExpertAd', { id: this.projectId })
				}
				if (this.itemManageDetail.phase >= 4) {
					this.$store.dispatch('item_getResultInfo', { id: this.projectId })
				}
				if (this.itemManageDetail.phase >= 5) {
					this.$store.dispatch('item_getThirdReport', { id: this.projectId })
				}
			})
		},
		data() {
			return {
				isSetTime: false,
				isFun: false,
				isEdit: false,
				channelOptions: channels,
				projectId: this.$route.params.projectId,
				projectList: projectList,
				dialogStopVisible: false,
				dialogApplyVisible: false,
				dialogPartnerVisible: false,
				dialogMerchantVisible: false,
				dialogAuthVisible: false,
				dialogTimeVisible: false,
				activeName: '1',
				formLabelWidth: '130px',
				auth_refuseReason: '',
				merchantForm: {
					projectId: '',
					customer_num: '',
					short_name: '',
					shop_num: '',
					shop_name: '',
					machine_num: '',
					tradeType: 1,
					channel: 1
				},
				merchantFormRules: {
					customer_num: [{ required: true, message: '请输入商户编号', trigger: 'blur' }]
				},
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
					protocol: ''
				},
				limitrule: {
					name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
					code: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
					licence: [{ required: true, message: '请输入开户许可核准号', trigger: 'blur' }],
					bankName: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
					bankOrgnizationName: [{ required: true, message: '请输入开户银行机构', trigger: 'blur' }],
					bankProvince: [{ required: true, message: '请输入开户行省名', trigger: 'blur' }],
					bankCity: [{ required: true, message: '请输入开户行市名', trigger: 'blur' }],
					bankAccount: [{ required: true, message: '请输入银行账户', trigger: 'blur' }],
					protocol: [{ required: true, message: '请上传有限合伙协议模板', trigger: 'change' }]
				},
				dateform: {
					reserveBegin: '',
					reserveEnd: '',
					subscriptionStartTime: '',
					subscriptionEndTime: '',
					crowdFundingBegin: '',
					crowdFundingEnd: ''
				},
				daterule: {
					reserveBegin: [
						{
							trigger: 'change', validator: (rule, value, callback) => {
								if (value == '') {
									callback(new Error('请选择预约开始时间!'))
								} else if (!moment(value).isAfter(new Date())) {
									callback(new Error('请选择当前时间之后!'))
								} else {
									callback()
								}
							}
						}
					],
					reserveEnd: [
						{
							trigger: 'change', validator: (rule, value, callback) => {
								if (value == '') {
									callback(new Error('请选择预约结束时间!'))
								} else if (!moment(value).isAfter(this.dateform.reserveBegin)) {
									callback(new Error('预约结束时间必须在预约开始时间之后!'))
								} else {
									callback()
								}
							}
						}
					],
					subscriptionStartTime: [
						{
							trigger: 'change', validator: (rule, value, callback) => {
								if (value == '') {
									callback(new Error('请选择专享认购开始时间!'))
								} else if (!moment(value).isAfter(this.dateform.reserveEnd)) {
									callback(new Error('专享认购开始时间必须在预约结束时间之后!'))
								} else {
									callback()
								}
							}
						}
					],
					subscriptionEndTime: [
						{
							trigger: 'change', validator: (rule, value, callback) => {
								if (value == '') {
									callback(new Error('请选择专享认购结束时间!'))
								} else if (!moment(value).isAfter(this.dateform.subscriptionStartTime)) {
									callback(new Error('专享认购结束时间必须在专享认购开始时间之后!'))
								} else {
									callback()
								}
							}
						}
					],
					crowdFundingBegin: [
						{
							trigger: 'change', validator: (rule, value, callback) => {
								if (value == '') {
									callback(new Error('请选择众投开始时间!'))
								} else if (!moment(value).isAfter(this.dateform.subscriptionEndTime)) {
									callback(new Error('众投开始时间必须在专享认购结束时间之后!'))
								} else {
									callback()
								}
							}
						}
					],
					crowdFundingEnd: [
						{
							trigger: 'change', validator: (rule, value, callback) => {
								if (value == '') {
									callback(new Error('请选择众投结束时间!'))
								} else if (!moment(value).isAfter(this.dateform.crowdFundingBegin)) {
									callback(new Error('众投结束时间必须在众投开始时间之后!'))
								} else {
									callback()
								}
							}
						}
					],
				}
			}
		},
		methods: {
			continueEdit() {
				this.$router.push('/itemStep1/' + this.projectId)
			},
			deleteItem() {
				this.$store.dispatch('item_deleteItem', { param: { id: this.projectId }, vue: this })
			},
			merchantQuit() {
				this.dialogMerchantVisible = false
				this.$refs['merchantForm'].resetFields()
			},
			merchantSubmit() {
				this.$refs['merchantForm'].validate((valid) => {
					if (valid) {
						this.merchantForm.projectId = this.projectId
						this.merchantForm.enterpriseId = this.itemManageDetail.enterpriseId
						this.$store.dispatch('item_addMerchant', { param: this.merchantForm, vue: this })
						this.$refs['merchantForm'].resetFields()
						this.dialogMerchantVisible = false
					} else {
						return false
					}
				})
			},
			open2() {
				this.$confirm('重新发起项目将终止当前项目流程，在保留相关信息的基础上回到起点，再完整经历一遍项目周期。（请谨慎使用该功能）', '重新发起', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					this.$store.dispatch('item_reset', { param: { id: this.projectId }, vue: this })
				}).catch(() => {
					this.$message({ type: 'info', message: '已取消操作' })
				})
			},
			back() {
				this.$router.go(-1)
			},
			protocol_remove(file, fileList) {
				if (fileList.length > 0) {
					this.limitform.protocol = JSON.parse(fileList[0].response.objectLiteral)
				} else {
					this.limitform.protocol = ''
				}
			},
			protocolUpload(response) {
				this.limitform.protocol = JSON.parse(response.objectLiteral)
			},
			beforeUpload(file) {
				if (this.limitform.protocol.length > 0) {
					this.$message.warning('有限合伙人模板只能上传一个！')
					return false
				}
				if (file.size >= 1024 * 1024 * 10) {
					this.$message.warning('不能上传大于10MB的文件！')
					return false
				}
				if (file.type != 'application/pdf') {
					this.$message.warning('协议模板必须是pdf文件！')
					return false
				}
				return true
			},
			time() {
				this.$refs['dateform'].validate((valid) => {
					if (valid) {
						let param = {}
						for (var attr in this.dateform) {
							if (this.dateform.hasOwnProperty(attr)) {
								var element = this.dateform[attr]
								param[attr] = moment(element).format('YYYY-MM-DD HH:mm:ss')
							}
						}
						param.id = this.$route.params.projectId
						this.$store.dispatch('item_updateTimeInfo', { param, vue: this }).then(() => {
							this.dialogTimeVisible = false
							this.$refs['dateform'].resetFields()
						})
					} else {
						return false
					}
				})
			},
			cancelTime() {
				this.$refs['dateform'].resetFields()
				this.dialogTimeVisible = false
			},
			setTimeInfo() {
				//设置时间信息
				this.$store.dispatch('item_checkDeposit', { projectId: this.projectId }).then((data) => {
					if (!data) {
						this.$message.warning('项目方或领投的保证金未缴纳！请确认保证金缴纳之后再设置时间信息')
						return
					} else {
						this.dialogTimeVisible = true
						for (let key in this.dateform) {
							if (this.dateform.hasOwnProperty(key)) {
								this.dateform[key] = this.timeInfo[key]
							}
						}
					}
				})

			},
			editProject() {
				this.$router.push('/itemEdit/' + this.$route.params.projectId)
			},
			auth(status) {
				this.$store.dispatch('item_isAuthInfo', { projectId: this.$route.params.projectId }).then(() => {
					if (!this.$store.state.item.isAuthInfo) {
						this.$message.warning('投资人签约之前，还不能进行银账审核')
						return
					}
					if (status == 2 && this.auth_refuseReason.length == 0) {
						this.$message.warning('请输入拒绝理由')
						return
					}
					let param = {
						status,
						refuseReason: this.auth_refuseReason,
						enterpriseId: this.enterpriseInfo.id,
						id: this.itemManageDetail.id
					}
					this.$store.dispatch('item_authInfo', { param, vue: this })
					this.dialogAuthVisible = false
				})
			},
			pass() {
				if (this.itemManageDetail.status == 21 && this.itemManageDetail.status == 31) {
					this.$message.info('审核未通过')
					return
				}
				if (this.itemManageDetail.status == 2 && this.itemManageDetail.phase == 4 || this.itemManageDetail.status == 3 && this.itemManageDetail.phase == 5) {
					let param = {
						id: this.$route.params.projectId,
						flag: this.itemManageDetail.phase == 4 ? 'first' : 'recheck',
						pass: 'yes',
						rejection: ''
					}
					this.$store.dispatch('item_setResultInfo', { param, vue: this }).then(() => {
						this.$store.dispatch('item_getThirdReport', { id: this.projectId })
					})

				} else {
					this.$message.warning('项目状态异常，无法审核')
				}
			},
			fangkuan() {
				this.$confirm('项目方、领投两笔资金均已到位，现在申请将跟投有限合伙人全部投资款注入项目企业基本存款账户。', '放款申请', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let param = {
						id: this.$route.params.projectId,
						initiatorId: this.itemManageDetail.initiatorId
					}
					this.$store.dispatch('item_lend', { param, vue: this })
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					})
				})
			},
			refuse() {
				if (this.itemManageDetail.status == 21 && this.itemManageDetail.status == 31) {
					this.$message.info('审核未通过')
					return
				}
				if (this.itemManageDetail.status == 2 && this.itemManageDetail.phase == 4 || this.itemManageDetail.status == 3 && this.itemManageDetail.phase == 5) {
					this.$refs['reject'].validate((valid) => {
						if (valid) {
							let param = {
								id: this.$route.params.projectId,
								flag: this.itemManageDetail.phase == 4 ? 'first' : 'recheck',
								pass: 'no',
								rejection: this.reject.desc
							}
							this.$store.dispatch('item_setResultInfo', { param, vue: this })
							this.dialogStopVisible = false
						} else {
							return false
						}
					})
				} else {
					this.$message.warning('项目状态异常，无法审核')
				}
			},
			cancel() {
				this.$refs['reject'].resetFields()
				this.dialogStopVisible = false
			},
			partner() {
				this.$refs['limitform'].validate((valid) => {
					if (valid) {
						this.dialogPartnerVisible = false
						let param = this.limitform
						param.id = this.$route.params.projectId
						this.$store.dispatch('item_createPartnerInfo', { param, vue: this })
						this.$refs['limitform'].resetFields()
					} else {
						return false
					}
				})
			},
			quit() {
				this.$refs['limitform'].resetFields()
				this.dialogPartnerVisible = false
			}
		}
	}
</script>