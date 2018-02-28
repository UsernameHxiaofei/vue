<style>
	.step1 {
		padding: 30px 50px;
		background: white;
		margin: 0 auto;
		min-width: 720px;
		width: 80%
	}

	.hang-divider {
		margin-top: 7px;
		float: left;
	}

	.hang-divider span {
		margin-left: 5px;
		color: #333333;
		font-size: 18px;
		font-weight: bold;
		vertical-align: middle;
	}

	.hang-divider img {
		vertical-align: middle;
	}

	.hang-box {
		overflow: hidden;
		margin-bottom: 10px;
	}

	.hang-box .hang-select {
		float: right;
		width: 35%;
	}

	.hang-box .hang-input {
		float: right;
		width: 25%;
		margin-right: 20px;
	}

	.footer-button {
		margin-top: 20px;
		background: white;
		overflow: hidden;
		padding-bottom: 30px;
	}

	.choose-list .el-col-12 {
		margin-top: 20px;
	}

	.choose-list .grid-content {
		border: 1px solid #dedede;
		overflow: hidden;
		background: #fafafa;
		height: 120px;
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
	}

	.choose-list .grid-content img {
		float: left;
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}

	.choose-list .grid-content .info-content {
		background: white;
		padding: 10px;
		display: block;
		height: 120px;
		margin-left: 0px;
		width: 100%;
	}

	.choose-list .grid-content .info-content p {
		color: #999;
		margin-top: 5px;
		text-indent: 0px;
		overflow: none;
		text-overflow: ellipsis;
	}

	.choose-list .el-col-12 .grid-content:hover {
		border-color: #06ccb7;
	}

	.choose-list .choosed {
		border-color: #06ccb7;
		background: #06ccb7;
	}
</style>
<template>
	<div class="content" style="background:#f5f5f5;">
		<div class="back-button">
			<el-button type="text" icon="arrow-left" @click="back()">返回上一级</el-button>
		</div>
		<div class="step1">
			<div style="overflow:hidden;margin-bottom:30px;">
				<div class="hang-box">
					<div class="hang-divider">
						<img src="../../../assets/images/linear.png" />
						<span>选择行家</span>
					</div>
					<el-input class="hang-select" placeholder="请输入行家" icon="search" v-if="this.itemManageDetail.type=='A'" v-model="expert" :on-icon-click="handleExpertClick">
					</el-input>
					<el-select v-model="industry1" @change="expertIndustryChange" v-if="this.itemManageDetail.type=='A'" clearable placeholder="所属行业"
					 class="hang-input">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="choose-list">
					<el-row :gutter="20" >
						<el-col :span="12" v-for="(item,index) in expertList.list||expertList1.list" :key="index">
							<div class="grid-content" :class="{'choosed':experter==item.actorId}" :title="item.profile" @click="chooseExport(item)">
								<img :src="item.headFigureURL" />
								<div class="info-content">
									<label>{{item.name}}&emsp;{{item.industry|industry}}</label>
									<p>{{item.profile}}</p>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
				<!--分页-->
				<div class="page-box clearfix">
					<div class="page-wrap">
						<pagination :total="expertList.totalRecords||expertList1.totalRecords" @size-change="expertSizeChange" @current-change="expertCurrentChange"></pagination>
					</div>
				</div>
			</div>
			<div style="overflow:hidden;margin-bottom:30px;">
				<div class="hang-box">
					<div class="hang-divider">
						<img src="../../../assets/images/linear.png" />
						<span>选择领投</span>
					</div>
					<el-input class="hang-select" v-if="this.itemManageDetail.type=='A'" placeholder="请输入领投名称" icon="search" v-model="lead" :on-icon-click="handleLeadClick">
					</el-input>
					<el-select v-model="industry2" @change="leadIndustryChange" v-if="this.itemManageDetail.type=='A'" clearable placeholder="所属行业"
					 class="hang-input">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="choose-list">
					<el-row :gutter="20" >
						<el-col :span="12" v-for="(item,index) in leadList.list||leadList1.list" :key="index">
							<div class="grid-content" :class="{'choosed':leader==item.actorId}" :title="item.profile" @click="chooseLead(item)">
								<img :src="item.imgUrl" />
								<div class="info-content">
									<label>{{item.type==2||isSimulation?(item.tname||item.name):item.name}}&emsp;{{item.industry|industry}}</label>
									<p>{{item.profile}}</p>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
				<!--分页-->
				<div class="page-box clearfix">
					<div class="page-wrap">
						<pagination :total="leadList.totalRecords||leadList1.totalRecords" @size-change="leadSizeChange" @current-change="leadCurrentChange"></pagination>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-button">
			<div class="step1">
				<el-button style="float: right;width: 130px;" type="primary" @click="onSubmit">完成</el-button>
				<el-button style="float: right;width: 130px;margin-right:10px;" type="primary" @click="prevstep">上一步</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import pagination from '../../../components/common/pagination'
import industryData from '../../../constant/industry.js'

export default {
	components: {
		pagination
	},
	computed: {
		leadList: function () {
			return this.$store.state.item.leadList || {}
		},
		expertList: function () {
			return this.$store.state.item.exportList || {}
		},
		leadList1: function () {
			return this.$store.state.item.leadList1 || {}
		},
		expertList1: function () {
			return this.$store.state.item.exportList1 || {}
		},
		itemManageDetail: function () {
			return this.$store.state.item.itemManageDetail || {}
		},
		actor: function () {
			return this.$store.state.login.actor
		}
	},
	beforeMount() {
		this.$store.dispatch('item_getManageDetail', { id: this.$route.params.id }).then(() => {
			if (this.itemManageDetail.expertId && this.itemManageDetail.leadInvestorId) {
				this.flag = true
				this.leader = this.itemManageDetail.leadInvestorId
				this.experter = this.itemManageDetail.expertId
			}
			if (this.itemManageDetail.type == 'B') {
				this.isSimulation = true
			}
			if (this.isSimulation) {
				this.leadParam1 = {
					type: 'A',
					pageSize: 10,
					pageNo: 1,
				}
				this.exportParam1 = {
					type: 'B',
					pageSize: 10,
					pageNo: 1,
				}
				this.$store.dispatch('item_getCustomerInfo4ShowForSimulation', this.leadParam1)
				this.$store.dispatch('item_getCustomerInfo4ShowForSimulation', this.exportParam1)
			} else {
				this.leadParam = {
					type: 'D',
					pageSize: 10,
					pageNo: 1,
					industry: 0
				}
				this.exportParam = {
					type: 'A',
					pageSize: 10,
					pageNo: 1,
					industry: 0
				}
				this.$store.dispatch('item_getPersons', { param: this.leadParam, vue: this })
				this.$store.dispatch('item_getPersons', { param: this.exportParam, vue: this })
			}
		})
	},
	data() {
		return {
			isSimulation: false,
			expert: '',
			industry1: '',
			lead: '',
			industry2: '',
			options: industryData,
			leadParam: {},
			exportParam: {},
			leadParam1: {},
			exportParam1: {},
			leader: '',
			experter: '',
			flag: false,
		}
	},
	methods: {
		chooseLead(item) {
			this.leader = item.actorId
		},
		chooseExport(item) {
			this.experter = item.actorId
		},
		handleExpertClick() {
			this.exportParam.keyWord = this.expert
			this.$store.dispatch('item_getPersons', { param: this.exportParam, vue: this })
		},
		handleLeadClick() {
			this.leadParam.keyWord = this.lead
			this.$store.dispatch('item_getPersons', { param: this.leadParam, vue: this })
		},
		leadIndustryChange(ev) {
			this.leadParam.industry = ev > 0 ? ev : 0
			this.leadParam.pageNo = 1
			this.$store.dispatch('item_getPersons', { param: this.leadParam, vue: this })
		},
		expertIndustryChange(ev) {
			this.exportParam.industry = ev > 0 ? ev : 0
			this.exportParam.pageNo = 1
			this.$store.dispatch('item_getPersons', { param: this.exportParam, vue: this })
		},
		expertSizeChange(val) {
			if (this.isSimulation) {
				this.exportParam1.pageSize = val
				this.exportParam1.pageNo = 1
				this.$store.dispatch('item_getCustomerInfo4ShowForSimulation', this.exportParam1)
			} else {
				this.exportParam.pageSize = val
				this.exportParam.pageNo = 1
				this.$store.dispatch('item_getPersons', { param: this.exportParam, vue: this })
			}
		},
		leadSizeChange(val) {
			if (this.isSimulation) {
				this.leadParam1.pageSize = val
				this.leadParam1.pageNo = 1
				this.$store.dispatch('item_getCustomerInfo4ShowForSimulation', this.leadParam1)
			} else {
				this.leadParam.pageSize = val
				this.leadParam.pageNo = 1
				this.$store.dispatch('item_getPersons', { param: this.leadParam, vue: this })
			}
		},
		expertCurrentChange(val) {
			if (this.isSimulation) {
				this.exportParam1.pageNo = val
				this.$store.dispatch('item_getCustomerInfo4ShowForSimulation', this.exportParam1)
			} else {
				this.exportParam.pageNo = val
				this.$store.dispatch('item_getPersons', { param: this.exportParam, vue: this })
			}

		},
		leadCurrentChange(val) {
			if (this.isSimulation) {
				this.leadParam1.pageNo = val
				this.$store.dispatch('item_getCustomerInfo4ShowForSimulation', this.leadParam1)
			} else {
				this.leadParam.pageNo = val
				this.$store.dispatch('item_getPersons', { param: this.leadParam, vue: this })
			}
			this.leadParam.pageNo = val
			this.$store.dispatch('item_getPersons', { param: this.leadParam, vue: this })
		},
		prevstep() {
			this.$router.go(-1)
		},
		onSubmit() {
			if (this.experter && this.experter.length == 0 && this.leader && this.leader.length == 0) {
				this.$message.warning('只有选择行家和领投之后才能完成融资申请')
				return
			}
			if (this.experter == this.itemManageDetail.initiatorId || this.leader == this.itemManageDetail.initiatorId || this.leader == this.experter) {
				this.$message.warning('项目方、领投和行家不能是同一人')
				return
			}
			let projectParam = {
				expertId: this.experter,
				leadInvestorId: this.leader,
				id: this.$route.params.id
			}
			if (this.flag) {
				this.$store.dispatch('item_updateProjectForAffrim', { param: projectParam, vue: this })
			} else {
				this.$store.dispatch('item_updateProject', { param: projectParam, vue: this })
			}

			this.$router.push('/main')
		},
		back() {
			this.$router.go(-1)
		}
	}
}    
</script>