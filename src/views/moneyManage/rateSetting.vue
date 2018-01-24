<style>
	.inputgroup .el-form-item__label {
		width: 150px!important;
	}

	.inputgroup .el-input {
		width: 90%!important;
	}

	.inputgroup .el-form-item__content {
		margin-left: 150px!important;
	}

	.inputgroup .el-dialog--small {
		top: 5%!important;
	}
</style>
<template>
	<div id="wrap">
		<!--搜索-->
		<el-row class="search-box">
			<div class="output">
				<el-select v-model="isInvested">
					<el-option label="融资项目" :value="0"></el-option>
					<el-option label="投后项目" :value="1"></el-option>
				</el-select>
			</div>
			<div class="btn-box">
				<el-button :plain="true" type="success" @click="openOverall">全局资金规则参数设置</el-button>
			</div>
		</el-row>
		<investedItemTable v-if="isInvested==1" @buttonClick="investedItemSetRate" :button="{label:'设置规则参数'}"></investedItemTable>
		<div class="search-box" v-if="isInvested==0">
			<div class="output">
				<el-input placeholder="项目名称" icon="search" v-model.trim="keyword" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
				</el-input>
			</div>
			<div class="date-box">

				<el-select v-model="itemStatu" clearable placeholder="项目状态" @change="changeItemStatus">
					<el-option v-for="item in itemStatus" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		<!--表格-->
		<div class="my-table" v-if="isInvested==0">
			<el-table :data="rateGetList.records" stripe border style="width: 100%">
				<el-table-column prop="kong" width="30">
				</el-table-column>
				<el-table-column type='index' width="55" label="序号">
				</el-table-column>
				<el-table-column prop="projectName" label="项目名称">
				</el-table-column>
				<el-table-column prop="enterpriseName" label="发起方">
				</el-table-column>
				<el-table-column prop="carryPercent" width="160" label="投资投后服务费比例">
				</el-table-column>
				<el-table-column prop="projectStatus" label="状态">
					<template slot-scope="scope">
						<span>{{scope.row.projectStatus|projectStatus}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="allAmount" label="总投资额(元)">
				</el-table-column>
				<el-table-column prop="financingAmount" width="120" label="目标融资额(元)">
				</el-table-column>
				<el-table-column prop="serviceChargeRate" label="融资服务费率">
				</el-table-column>
				<el-table-column width="120">
					<template slot-scope="scope">
						<el-button class="btn-style" @click="openRate(scope.row)">设置规则参数</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="kong" width="30">
				</el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<div class="page-box clearfix" v-if="isInvested==0">
			<div class="page-wrap">
				<pagination :total="rateGetList.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
			</div>

		</div>
		<!--所属ID设置资金规则参数弹窗-->
		<div class="p-form inputgroup">
			<el-dialog title="资金规则参数设置" :visible.sync="dialogRateVisible" @close="cancel" :close-on-click-modal="false">
				<el-form :model="rateForm" :rules="rules" ref="rateForm">
					<el-form-item v-if="isInvested==0" label="融资服务费率" prop="serviceChargeRate">
						<el-input v-model.number="rateForm.serviceChargeRate">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="isInvested==0" label="交易手续费率" prop="feeRate">
						<el-input v-model.number="rateForm.feeRate">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="isInvested==0" label="行家分成比例" prop="expertSharePercent">
						<el-input v-model.number="rateForm.expertSharePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="isInvested==0" label="投资投后服务费比例" prop="carryPercent">
						<el-input v-model.number="rateForm.carryPercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="isInvested==0" label="领投分成比例" prop="leadInvestSharePercent">
						<el-input v-model.number="rateForm.leadInvestSharePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="isInvested==0" label="最低领投比例" prop="leadInvestPercent">
						<el-input v-model.number="rateForm.leadInvestPercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="isInvested==0" label="项目方保证金比例" prop="financingEnsurePercent">
						<el-input v-model.number="rateForm.financingEnsurePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="isInvested==0" label="领投保证金比例" prop="quotaUnder">
						<el-row>
							<el-col :span="12">
								<el-input v-model.number="rateForm.quotaUnder">
									<template slot="append">万元及以下</template>
								</el-input>
							</el-col>
							<el-col :span="11">
								<el-input v-model.number="rateForm.underEnsurePercent">
									<template slot="append">%</template>
								</el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-input v-model.number="rateForm.quotaAbove">
									<template slot="append">万元以上</template>
								</el-input>
							</el-col>
							<el-col :span="11">
								<el-input v-model.number="rateForm.aboveEnsurePercent">
									<template slot="append">%</template>
								</el-input>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item v-if="isInvested==0" label="投资人保证金比例" prop="investEnsurePercent">
						<el-input v-model.number="rateForm.investEnsurePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="isInvested==0" label="投资人违约金比例" prop="minInvestPenaltyPercent">
						<el-row>
							<el-input v-model.number="rateForm.minInvestPenaltyPercent">
								<template slot="prepend">低值</template>
								<template slot="append">%</template>
							</el-input>
						</el-row>
						<el-row>
							<el-input v-model.number="rateForm.maxInvestPenaltyPercent">
								<template slot="prepend">高值</template>
								<template slot="append">%</template>
							</el-input>
						</el-row>
					</el-form-item>
					<el-form-item label="模拟投资项目投资人分成比例" prop="simulatePercent" v-if="editProjectType=='B'&&isInvested==0">
						<el-input v-model.number="rateForm.simulatePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item v-if="isInvested==1" label="投后服务费率" prop="afterFinancingRatio">
						<el-input v-model.number="rateForm.afterFinancingRatio">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel">取 消</el-button>
					<el-button type="primary" @click="setRate">保 存</el-button>
				</div>
			</el-dialog>
		</div>
		<!--全局设置资金规则参数弹窗-->
		<div class="p-form inputgroup">
			<el-dialog title="全局资金规则参数设置" :visible.sync="dialogOverallVisible" @close="quit" :close-on-click-modal="false">
				<el-form :model="overallForm" :rules="overrule" ref="overallForm">
					<el-form-item label="融资服务费率" prop="serviceChargeRate">
						<el-input v-model.number="overallForm.serviceChargeRate">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="交易手续费率" prop="feeRate">
						<el-input v-model.number="overallForm.feeRate">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="行家分成比例" prop="expertSharePercent">
						<el-input v-model.number="overallForm.expertSharePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="投资投后服务费比例" prop="carryPercent">
						<el-input v-model.number="overallForm.carryPercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="领投分成比例" prop="leadInvestSharePercent">
						<el-input v-model.number="overallForm.leadInvestSharePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="最低领投比例" prop="leadInvestPercent">
						<el-input v-model.number="overallForm.leadInvestPercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="项目方保证金比例" prop="financingEnsurePercent">
						<el-input v-model.number="overallForm.financingEnsurePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="领投保证金比例" prop="quotaUnder">
						<el-row>
							<el-col :span="12">
								<el-input v-model.number="overallForm.quotaUnder">
									<template slot="append">万元及以下</template>
								</el-input>
							</el-col>
							<el-col :span="11">
								<el-input v-model.number="overallForm.underEnsurePercent">
									<template slot="append">%</template>
								</el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-input v-model.number="overallForm.quotaAbove">
									<template slot="append">万元以上</template>
								</el-input>
							</el-col>
							<el-col :span="11">
								<el-input v-model.number="overallForm.aboveEnsurePercent">
									<template slot="append">%</template>
								</el-input>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="投资人保证金比例" prop="investEnsurePercent">
						<el-input v-model.number="overallForm.investEnsurePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="投资人违约金比例" prop="minInvestPenaltyPercent">
						<el-row>
							<el-input v-model.number="overallForm.minInvestPenaltyPercent">
								<template slot="prepend">低值</template>
								<template slot="append">%</template>
							</el-input>
						</el-row>
						<el-row>
							<el-input v-model.number="overallForm.maxInvestPenaltyPercent">
								<template slot="prepend">高值</template>
								<template slot="append">%</template>
							</el-input>
						</el-row>
					</el-form-item>
					<el-form-item label="模拟投资项目投资人分成比例" prop="simulatePercent">
						<el-input v-model.number="overallForm.simulatePercent">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="投后服务费率" prop="afterFinancingRatio">
						<el-input v-model.number="overallForm.afterFinancingRatio">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="quit">取 消</el-button>
					<el-button type="primary" @click="setOverallRate">保 存</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import pagination from '../../components/common/pagination'
	import projectStatus from '../../constant/projectStatus.js'
	import investedItemTable from '../../components/common/investedItemTable'

	export default {
		components: {
			pagination,
			investedItemTable
		},
		computed: {
			actor: function () {
				return this.$store.state.login.actor
			},
			idFundRule: function () {
				if (!this.$store.state.money.idFundRule) {
					return {
						createUserId: '',
						updateUserId: '',
						ruleId: '',
						serviceChargeRate: '',
						feeRate: '',
						expertSharePercent: '',
						carryPercent: '',
						leadInvestSharePercent: '',
						leadInvestPercent: '',
						financingEnsurePercent: '',
						quotaUnder: '',
						underEnsurePercent: '',
						quotaAbove: '',
						aboveEnsurePercent: '',
						investEnsurePercent: '',
						minInvestPenaltyPercent: '',
						maxInvestPenaltyPercent: '',
						simulatePercent: '',
						afterFinancingRatio: ''
					}
				} else {
					return this.$store.state.money.idFundRule
				}
			},
			overallFundRule: function () {
				if (!this.$store.state.money.overallFundRule) {
					return {
						createUserId: '',
						updateUserId: '',
						ruleId: '',
						serviceChargeRate: '',
						feeRate: '',
						expertSharePercent: '',
						carryPercent: '',
						leadInvestSharePercent: '',
						leadInvestPercent: '',
						financingEnsurePercent: '',
						quotaUnder: '',
						underEnsurePercent: '',
						quotaAbove: '',
						aboveEnsurePercent: '',
						investEnsurePercent: '',
						minInvestPenaltyPercent: '',
						maxInvestPenaltyPercent: '',
						simulatePercent: '',
						afterFinancingRatio: ''
					}
				} else {
					return this.$store.state.money.overallFundRule
				}
			},
			modifyFundRule: function () {
				return this.$store.state.money.modifyFundRule
			},
			rateGetList: function () {
				return this.$store.state.money.rateGetList
			}
		},
		beforeMount() {
			this.param = {
				projectName: this.keyword,
				projectStatus: this.itemStatu,
				page: 1,
				number: 10
			}
			this.$store.dispatch('rate_getList', this.param)
		},
		data() {
			return {
				isInvested: 0,
				param: {},
				editProjectType: 'A',
				projectId: '',
				dialogOverallVisible: false,
				dialogRateVisible: false,
				rateForm: {},
				overallForm: {},
				formLabelWidth: '120px',
				overrule: {
					serviceChargeRate: [
						{ required: true, type: 'number', message: '请输入融资服务费率', trigger: 'blur' },

					],
					feeRate: [
						{ required: true, type: 'number', message: '请输入交易手续费率', trigger: 'blur' },

					],
					expertSharePercent: [
						{ required: true, type: 'number', message: '请输入行家分成比例', trigger: 'blur' },

					],
					carryPercent: [
						{ required: true, type: 'number', message: '请输入投资投后服务费比例', trigger: 'blur' },

					],
					leadInvestSharePercent: [
						{ required: true, type: 'number', message: '请输入领投分成比例', trigger: 'blur' },

					],
					leadInvestPercent: [
						{ required: true, type: 'number', message: '请输入最低领投比例', trigger: 'blur' },
					],
					financingEnsurePercent: [
						{ required: true, type: 'number', message: '请输入项目方保证金比例', trigger: 'blur' },

					],
					quotaUnder: [
						{ required: true, type: 'number', message: '请输入领投保证金', trigger: 'blur' },

					],
					investEnsurePercent: [
						{ required: true, type: 'number', message: '请输入投资人保证金比例', trigger: 'blur' },

					],
					minInvestPenaltyPercent: [
						{ required: true, type: 'number', message: '请输入投资人违约金比例', trigger: 'blur' },

					],
					afterFinancingRatio: [
						{ required: true, type: 'number', message: '请输入投后服务费率', trigger: 'blur' },
					]
				},
				rules: {
					serviceChargeRate: [
						{ required: true, type: 'number', message: '请输入融资服务费率', trigger: 'blur' },

					],
					feeRate: [
						{ required: true, type: 'number', message: '请输入交易手续费率', trigger: 'blur' },

					],
					expertSharePercent: [
						{ required: true, type: 'number', message: '请输入行家分成比例', trigger: 'blur' },

					],
					carryPercent: [
						{ required: true, type: 'number', message: '请输入投资投后服务费比例', trigger: 'blur' },

					],
					leadInvestSharePercent: [
						{ required: true, type: 'number', message: '请输入领投分成比例', trigger: 'blur' },

					],
					leadInvestPercent: [
						{ required: true, type: 'number', message: '请输入最低领投比例', trigger: 'blur' },
					],
					financingEnsurePercent: [
						{ required: true, type: 'number', message: '请输入项目方保证金比例', trigger: 'blur' },
					],
					quotaUnder: [
						{ required: true, type: 'number', message: '请输入领投保证金', trigger: 'blur' },

					],
					investEnsurePercent: [
						{ required: true, type: 'number', message: '请输入投资人保证金比例', trigger: 'blur' },

					],
					minInvestPenaltyPercent: [
						{ required: true, type: 'number', message: '请输入投资人最小违约金比例', trigger: 'blur' }
					],
					afterFinancingRatio: [
						{ required: true, type: 'number', message: '请输入投后服务费率', trigger: 'blur' },
					]
				},
				keyword: '',
				itemStatu: '',
				itemStatus: projectStatus,
			}
		},
		methods: {
			investedItemSetRate(data) {
				let idParam = {
					ownId: data.id
				}
				this.projectId = data.id
				this.$store.dispatch('id_fundRule2', idParam).then(() => {
					this.rateForm = {}
					this.rateForm = this.idFundRule
					this.dialogRateVisible = true
				})
			},
			//取消
			cancel() {
				this.$refs['rateForm'].resetFields()
				this.rateForm = {
					createUserId: '',
					updateUserId: '',
					ruleId: '',
					serviceChargeRate: '',
					feeRate: '',
					expertSharePercent: '',
					carryPercent: '',
					leadInvestSharePercent: '',
					leadInvestPercent: '',
					financingEnsurePercent: '',
					quotaUnder: '',
					underEnsurePercent: '',
					quotaAbove: '',
					aboveEnsurePercent: '',
					investEnsurePercent: '',
					minInvestPenaltyPercent: '',
					maxInvestPenaltyPercent: '',
					simulatePercent: ''
				}
				this.dialogRateVisible = false
				this.$store.dispatch('rate_getList', this.param)
			},
			//取消
			quit() {
				this.$refs['overallForm'].resetFields()
				this.overallForm = {
					createUserId: '',
					updateUserId: '',
					ruleId: '',
					serviceChargeRate: '',
					feeRate: '',
					expertSharePercent: '',
					carryPercent: '',
					leadInvestSharePercent: '',
					leadInvestPercent: '',
					financingEnsurePercent: '',
					quotaUnder: '',
					underEnsurePercent: '',
					quotaAbove: '',
					aboveEnsurePercent: '',
					investEnsurePercent: '',
					minInvestPenaltyPercent: '',
					maxInvestPenaltyPercent: '',
					simulatePercent: ''
				}
				this.dialogOverallVisible = false
				this.$store.dispatch('rate_getList', this.param)
			},
			// 搜索
			handleIconClick() {
				this.param.projectName = this.keyword
				this.param.page = 1
				this.$store.dispatch('rate_getList', this.param)
			},
			//分页
			handleSizeChange(val) {
				this.param.number = val
				this.param.page = 1
				this.$store.dispatch('rate_getList', this.param)
			},
			handleCurrentChange(val) {
				this.param.page = val
				this.$store.dispatch('rate_getList', this.param)
			},
			// 选择项目状态
			changeItemStatus(lv) {
				this.param.projectStatus = lv
				this.$store.dispatch('rate_getList', this.param)
			},
			//点击设置参数规则
			openRate(data) {
				let idParam = {
					ownId: data.projectId
				}
				this.editProjectType = data.type
				this.projectId = data.projectId
				this.$store.dispatch('id_fundRule2', idParam).then(() => {
					this.rateForm = {}
					this.rateForm = this.idFundRule
					this.dialogRateVisible = true
				})
			},
			//保存已设置好或修改好的参数规则
			setRate() {
				this.rateForm.ownId = this.projectId

				this.editProjectType = 'A'
				let formParam = {
					ltFundsRule: this.rateForm
				}
				this.$refs['rateForm'].validate((valid) => {
					if (valid) {
						this.rateForm = Object.assign(this.rateForm, {
							serviceChargeRate: 0,
							feeRate: 0,
							expertSharePercent: 0,
							carryPercent: 0,
							leadInvestSharePercent: 0,
							leadInvestPercent: 0,
							financingEnsurePercent: 0,
							quotaUnder: 0,
							underEnsurePercent: 0,
							quotaAbove: 0,
							aboveEnsurePercent: 0,
							investEnsurePercent: 0,
							minInvestPenaltyPercent: 0,
							maxInvestPenaltyPercent: 0,
							simulatePercent: 0
						})
						if (this.rateForm.ruleId) {
							this.rateForm.updateUserId = this.actor.id
							this.$store.dispatch('modify_fundRule', formParam).then(() => {
								if (this.modifyFundRule.success) {
									this.$message({
										message: '修改规则参数成功！',
										type: 'success'
									})
									this.$store.dispatch('rate_getList', this.param)
									this.dialogRateVisible = false
								} else {
									this.$message('修改失败')
								}
							}, 300)
						} else {
							this.rateForm.createUserId = this.actor.id
							this.$store.dispatch('modify_fundRule', formParam).then(() => {
								if (this.modifyFundRule.success) {
									this.$message({
										message: '规则参数设置成功！',
										type: 'success'
									})
									this.$store.dispatch('rate_getList', this.param)
									this.dialogRateVisible = false
								} else {
									this.$message('设置失败')
								}
							}, 300)
						}
					} else {
						return false
					}
				})
			},
			//点击设置全局参数规则
			openOverall() {
				this.$store.dispatch('overall_fundRule').then(() => {
					this.overallForm = this.overallFundRule
					this.dialogOverallVisible = true
				})
			},
			//保存已设置好或修改好的全局参数规则
			setOverallRate() {
				let formParam = {
					ltFundsRule: this.overallForm
				}
				this.$refs['overallForm'].validate((valid) => {
					if (valid) {
						if (this.overallForm.ruleId) {
							this.overallForm.updateUserId = this.actor.id
							this.$store.dispatch('modify_fundRule', formParam).then(() => {
								if (this.modifyFundRule.success) {
									this.$message({
										message: '修改全局资金规则参数成功！',
										type: 'success'
									})
									this.$store.dispatch('rate_getList', this.param)
									this.dialogOverallVisible = false
								} else {
									this.$message('修改失败')
								}
							}, 300)
						} else {
							this.overallForm.createUserId = this.actor.id
							this.$store.dispatch('modify_fundRule', formParam).then(() => {
								if (this.modifyFundRule.success) {
									this.$message({
										message: '全局资金规则参数设置成功！',
										type: 'success'
									})
									this.$store.dispatch('rate_getList', this.param)
									this.dialogOverallVisible = false
								} else {
									this.$message('设置失败')
								}
							}, 300)
						}

					} else {
						return false
					}
				})
			},

		}
	}
</script>