<template>
	<div style="width:100%;height: 100%;background: #fff;margin: auto;">

		<div class="hangjiashenhe" style="position: relative;" v-if="status">
			<el-button type="primary" style="position: absolute; right: 60px;top: 30px;" @click="changeState">编辑</el-button>
			<ul>
				<li>
					<label>所在地</label>
					<span>{{customer.actorEnter&&customer.actorEnter.addressCode}}</span>
				</li>
				<li>
					<label>法定代表人姓名</label>
					<span>{{customer.actorEnter&&customer.actorEnter.repName}}</span>
				</li>
				<li>
					<label>法定代表人手机号</label>
					<span>{{customer.actorEnter&&customer.actorEnter.repMobile}}</span>
				</li>
				<li>
					<label>法定代表人身份证号</label>
					<span>{{customer.actorEnter&&customer.actorEnter.repIdcard}}</span>
				</li>
				<li>
					<label>代理人姓名</label>
					<span>{{customer.actorEnter&&customer.actorEnter.gentName}}</span>
				</li>
				<li>
					<label>代理人身份证号</label>
					<span>{{customer.actorEnter&&customer.actorEnter.gentIdcard}}</span>
				</li>
				<li>
					<label>企业简称</label>
					<span>{{customer.actorEnter&&customer.actorEnter.enterShortName}}</span>
				</li>
				<li>
					<label>企业简介</label>
					<span>{{customer.actorEnter&&customer.actorEnter.brief}}</span>
				</li>
				<li>
					<label>投资过的项目</label>
					<span>{{customer.actorEnter&&customer.actorEnter.investment}}</span>
				</li>
				<li>
					<label>关注行业</label>
					<span>{{customer.actorEnter&&customer.actorEnter.industry|industry}}</span>
				</li>
			</ul>
		</div>

		<el-form v-if="!status" ref="actorEnter" class="my-form" :model="actorEnter" label-width="140px" style="width: 90%;margin:auto;padding: 20px 0;">
			<el-form-item label="所在地">
				<el-cascader expand-trigger="click" style="width:280px;" change-on-select clearable :options="options" v-model="selectedOptions">
				</el-cascader>
			</el-form-item>
			<el-form-item label="法定代表人姓名">
				<el-input v-model="actorEnter.repName"></el-input>
			</el-form-item>
			<el-form-item label="法定代表人手机号">
				<el-input v-model="actorEnter.repMobile"></el-input>
			</el-form-item>
			<el-form-item label="法定代表人身份证号">
				<el-input v-model="actorEnter.repIdcard"></el-input>
				<br>
				<el-button style="margin:10px 0" type="success" @click="updateApply">更新申请</el-button>
			</el-form-item>
			<hr style="height:2px;background:rgb(191, 217, 217);;margin:10px 0;">
			<el-form-item label="代理人姓名">
				{{customer.actorEnter&&customer.actorEnter.gentName}}
			</el-form-item>
			<el-form-item label="代理人身份证号">
				{{customer.actorEnter&&customer.actorEnter.gentIdcard}}
			</el-form-item>
			<el-form-item label="企业简称" prop="enterShortName">
				<el-input v-model="actorEnter.enterShortName"></el-input>
			</el-form-item>
			<el-form-item label="企业简介" prop="brief">
				<el-input type="textarea" :rows="6" v-model="actorEnter.brief"></el-input>
			</el-form-item>
			<el-form-item label="投资过的项目" prop="investment">
				<el-input type="textarea" :rows="6" v-model="actorEnter.investment"></el-input>
			</el-form-item>
			<el-form-item label="关注行业" prop="industry">
				<el-checkbox-group v-model="industry">
					<el-checkbox v-for="item in industryList" :label="item.value" :key="item.label">{{item.label}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item>
				<el-button style="width: 120px;" @click="cancel">取消</el-button>
				<el-button style="width: 120px;" type="primary" @click="onSubmit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { regionData } from 'element-china-area-data'
	import { getSelectArray } from '../../../util/index.js'
	import industryList from '../../../constant/industry'
	import _ from 'lodash'
	export default {
		beforeMount() {
			this.checkAccountChange()
			this.enterpriseInit()
		},
		computed: {
			customer: function () {
				return this.$store.state.customer.customerIndividualInfoByActorId
			},
			actor: function () {
				return this.$store.state.customer.customerInfoByActorId
			}
		},
		data() {
			return {
				status: true,
				options: regionData,
				industryList,
				industry: [],
				selectedOptions: [],
				actorEnter: {
					actorId: this.$route.params.actorId,
					enterShortName: '',
					brief: '',
					investment: '',
					industry: '',
					addressCode: '',
					repName: '',
					repMobile: '',
					repIdcard: ''
				},
				auditeWaitByActorId: {}
			}
		},
		methods: {
			checkAccountChange() {
				this.$store.dispatch('auditeWaitByActorId', { type: 3, id: this.$route.params.actorId }).then((data) => {
					this.auditeWaitByActorId = data;
				})
			},
			enterpriseInit() {
				this.$store.dispatch('customerIndividualInfoByActorId', { id: this.$route.params.actorId }).then(() => {
					this.actorEnter = this.customer.actorEnter || {
						actorId: this.$route.params.actorId,
						enterShortName: '',
						brief: '',
						investment: '',
						industry: '',
						addressCode: '',
						repName: '',
						repMobile: '',
						repIdcard: ''
					}
					this.selectedOptions=getSelectArray(this.actorEnter.addressCode)
				})
			},
			changeState() {
				this.status = false
				if (this.customer.actorEnter) {
					this.selectedOptions = getSelectArray(this.customer.actorEnter.addressCode)
				}
				this.checkAccountChange()
			},
			updateApply() {
				if (this.auditeWaitByActorId && this.auditeWaitByActorId.id) {
					this.$message.warning('已经存在一个法人代表人变更申请')
					return false
				}
				let apply = {
					addressCode: this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : '',
					repName: this.actorEnter.repName,
					repMobile: this.actorEnter.repMobile,
					repIdcard: this.actorEnter.repIdcard,
					actorId: this.$route.params.actorId
				}
				this.$store.dispatch('updateActorEnterRepInfo', apply).then((data) => {
					if (data) {
						this.$message.success('申请成功,正在审核中！')
						this.checkAccountChange()
					} else {
						this.$message.warning('申请失败！')
					}
				})
			},
			onSubmit() {
				this.actorEnter.industry = _.sum(this.industry)
				this.$store.dispatch('updateActorEnterBasic', this.actorEnter).then((data) => {
					if (data) {
						this.enterpriseInit()
						this.status = true
					}
				})
			},
			cancel() {
				this.status = true
			},
		}
	}    
</script>
<style scoped>
	.hangjiashenhe {
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		font-size: 14px;
	}

	.hangjiashenhe ul {
		margin: 0 auto;
		padding: 16px 0;
		list-style: none;
	}

	.hangjiashenhe li {
		margin-top: 10px;
		line-height: 25px;
		font-size: 14px;
	}

	.hangjiashenhe label {

		width: 130px;
		font-weight: 400;
		color: #999;
		text-align: right;
		margin-right: 20px;
		float: left;
		display: block;
	}

	.hangjiashenhe li>span {
		display: inline-block;
		width: 75%;
		color: #333;
	}
</style>