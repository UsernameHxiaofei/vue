<style>
	#riskFunflow .titleField {
		font-size: 18px;
		font-weight: 600;
		color: rgb(51, 51, 51);
	}

	#riskFunflow .head-action {
		width: 500px;
		height: 130px;
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
		border: 1px solid #b1b1b1;
		padding: 20px;
		float: left;
		margin: 20px;
	}

	#riskFunflow .info .info-item {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
		width: 300px;
	}

	#riskFunflow .info .info-item label {
		width: 140px;
		text-align: right;
		margin-right: 10px;
	}

	#riskFunflow .el-table .cell {
		text-align: center;
	}

	#riskFunflow .el-table__body .cell {
		color: #535455;
		font-size: 12px;
	}

	#riskFunflow .typebutton {
		width: 75px;
		color: rgb(6, 204, 182);
		border-radius: 5px;
		height: 34px;
		background: white;
		outline: none;

		border: 1px solid rgb(6, 204, 182);
	}

	#riskFunflow .typebutton:nth-child(1) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;

	}

	#riskFunflow .typebutton:nth-child(2) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;

	}

	#riskFunflow .banlance {
		width: 200px;
	}

	#riskFunflow .banlance label {
		margin: 20px auto 10px 30px;
		font-size: 14px;
		display: block;

	}

	#riskFunflow .banlance span {
		font-size: 16px;
		margin-left: 30px;
		color: rgb(6, 204, 182);
		font-weight: bold;
	}

	#riskFunflow .noeffect {
		color: #999;
		background: rgb(205, 214, 214);
		border: none;
	}

	#riskFunflow .actionbar {
		width: 200px;
		float: right;
		margin-right: 150px;
	}
</style>
<template>
	<div id='riskFunflow'>
		<el-row style="padding:50px;">
			<el-row style="margin:10px auto 10px auto;">
				<div class="head-action" v-for="(item,index) in account" :key="index">
					<div class="info">
						<div class="info-item">
							<label>开户许可核准号</label>
							<span>{{item.accountApprovalNumber}}</span>
						</div>
						<div class="info-item">
							<label>开户银行</label>
							<span>{{item.depositBank}}</span>
						</div>
						<div class="info-item">
							<label>基本存款账账户账号</label>
							<span>{{item.basicDepositAccountNumber}}</span>
						</div>
						<div class="info-item">
							<label>账号名称</label>
							<span>{{item.accountName}}</span>
						</div>
					</div>
					<div class="banlance">
						<label>账户余额</label>
						<span>{{item.lastBalance||0}}元</span>
					</div>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<label class="titleField" for="dateRange">日期</label>&emsp;
					<span>
						<el-date-picker :clearable="false" v-model="startTime" align="right" :editable="false" type="date" @change="startChange"
						 placeholder="选择开始日期"></el-date-picker>
						至
						<el-date-picker :clearable="false" v-model="endTime" align="right" :editable="false" type="date" @change="endChange" placeholder="选择结束日期"></el-date-picker>
					</span>
					<div class="actionbar">
						<button class="typebutton" type="button" :class="{'noeffect':!showChart}" @click="changeChart(1)"> 图表 </button>
						<button class="typebutton" type="button" :class="{'noeffect':showChart}" @click="changeChart(0)"> 明细 </button>
					</div>
				</el-col>
			</el-row>
			<el-row v-show="showChart">
				<el-col :span="10" style="margin-top:45px">
					<div id="funflowIn" style="height:500px">

					</div>
				</el-col>
				<el-col :span="10" :offset="2" style="margin-top:45px">
					<div id="funflowOut" style="height:500px">

					</div>
				</el-col>
			</el-row>
			<el-row v-show="!showChart">
				<el-col style="margin-top:40px">
					<div style="float:right;font-size: 18px;color: rgb(6, 204, 182);font-weight:600">
						<span>合计：贷</span>
						<span>{{totalData.totalb}}</span>
						<span>笔</span>&nbsp;
						<span>{{totalData.totalbNum}}</span>
						<span>元，借</span>
						<span>{{totalData.totalLean}}</span>
						<span>笔</span>&nbsp;
						<span>{{totalData.totalLeanNum}}</span>
						<span>元</span>
					</div>
				</el-col>
			</el-row>
			<el-row v-show="!showChart">
				<el-col :span="24">
					<el-table border :data="listData.list" stripe style="width: 100%">
						<el-table-column prop="transactionTime" width="170" label="交易时间" align="center"> </el-table-column>
						<el-table-column prop="summary" width="150" label="摘要" align="center"> </el-table-column>
						<el-table-column prop="debitAmount" label="借方发生额" align="center"> </el-table-column>
						<el-table-column prop="creditAmount" label="贷方发生额" align="center"> </el-table-column>
						<el-table-column prop="balance" label="余额" align="center"> </el-table-column>
						<el-table-column prop="recAccountNumber" label="对方账户" align="center"> </el-table-column>
						<el-table-column prop="recAccountName" width="140" label="对方账户名称" align="center"> </el-table-column>
						<el-table-column prop="voucherKind" label="凭证种类" align="center"> </el-table-column>
						<el-table-column prop="voucherNumber" label="凭证号码" align="center"> </el-table-column>
						<el-table-column prop="businessNumber" width="140" label="企业业务编号" align="center"> </el-table-column>
						<el-table-column prop="cardNumber" label="卡号" align="center"> </el-table-column>
					</el-table>
					<pagination style="float:right;margin:10px 50px" :total="listData.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
				</el-col>
			</el-row>
		</el-row>
	</div>
</template>

<script>
import echarts from '../../../../node_modules/echarts/dist/echarts.min.js'
import pagination from '../../../components/common/pagination.vue'
import theme from '../../../assets/js/echarts.theme.js'
import { formatDate } from '../../../util/index'

theme(echarts)

export default {
	name: 'riskFunflow',
	computed: {
		projectRiskRule: function () {
			return this.$store.state.risk.projectRiskRule || []
		},
		dataList: function () {
			return this.$store.state.enterprise.enterpriseAccountDetail || {}
		},
		enterprise: function () {
			return this.$store.state.enterprise.enterpriseInfo || {}
		},
		itemManageDetail: function () {
			return this.$store.state.item.itemManageDetail || {}
		},
		listDayAmount: function () {
			return this.$store.state.enterprise.listDayAmount || {}
		},
		account: function () {
			return this.$store.state.item.authInfo && this.$store.state.item.authInfo[0] || {}
		}
	},
	components: {
		'pagination': pagination
	},
	methods: {
		changeChart(a) {
			if (a) {
				this.showChart = true
			} else {
				this.showChart = false
			}
			this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
				this.listData = JSON.parse(JSON.stringify(this.dataList))
				this.getTotalData()
				this.getImageData()
			})
		},
		back() {
			this.$router.go(-1)
		},
		getImageData() {
			let leanOut = [], bIn = []
			let param = {
				type: 0,
				enterpriseId: this.enterprise.id,
				beginTime: this.param.beginTime,
				endTime: this.param.endTime
			}
			this.$store.dispatch('enterprise_selectListDayAmount', param).then(() => {
				Object.keys(this.listDayAmount).forEach((key) => {
					let creditAmount = 0, debitAmount = 0
					this.listDayAmount[key].forEach((item) => {
						creditAmount += item.creditAmount || 0
						debitAmount += item.debitAmount || 0
					})
					leanOut.push([new Date(key).getTime(), creditAmount || 0])
					bIn.push([new Date(key).getTime(), debitAmount || 0])
				})
				this.imageData = { leanOut, bIn }
				this.buildEcharts()
				this.buildEchartsOut()
			})

		},
		getTotalData() {
			let totalLean = 0, totalb = 0, totalLeanNum = 0, totalbNum = 0
			for (let i = 0; this.dataList.list && i < this.dataList.list.length; i++) {
				let item = this.dataList.list[i]
				let flag = item.debitAmount > item.creditAmount//true就是借,就是流出
				if (flag) {
					totalLean++
					totalLeanNum += item.debitAmount
				} else {
					totalb++
					item.creditAmount = item.creditAmount || 0
					totalbNum += item.creditAmount
				}
			}
			this.totalData = { totalLean, totalb, totalLeanNum: totalLeanNum.toFixed(2), totalbNum: totalbNum.toFixed(2) }
		},
		startChange(v) {
			if (!this.ready) {
				return
			}
			this.param.beginTime = v
			this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
				this.listData = JSON.parse(JSON.stringify(this.dataList))
				this.getTotalData()
				this.getImageData()
			})
		},
		endChange(v) {
			if (!this.ready) {
				return
			}
			this.param.endTime = v
			this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
				this.listData = JSON.parse(JSON.stringify(this.dataList))
				this.getTotalData()
				this.getImageData()
			})
		},
		handleSizeChange(size) {
			this.param.pageSize = size
			this.param.pageNo = 1
			this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
				this.listData = JSON.parse(JSON.stringify(this.dataList))
				this.getTotalData()
			})
		},
		handleCurrentChange(page) {
			this.param.pageNo = page
			this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
				this.listData = JSON.parse(JSON.stringify(this.dataList))
				this.getTotalData()
			})
		},
		buildEcharts() {
			let myChart = echarts.init(document.getElementById('funflowIn'), 'customed')
			// 指定图表的配置项和数据
			let option = {
				title: { text: '银账资金账户流入', x: 'center' },
				tooltip: {
					trigger: 'axis', formatter: function (params) {
						let content = []
						for (let i = 0; i < params.length; i++) {
							const item = params[i]
							content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + item.seriesName + '：' + Number(item.value[1].toFixed(2)) + '元')
						}
						return content.join('</br>')
					}
				},
				legend: { data: ['流入'], right: 50, orient: 'vertical' },
				xAxis: { type: 'time' },
				yAxis: {
					name: '金额(元)',
					nameRotate: 90,
					nameLocation: 'middle'
				},
				visualMap: {
					top: 0,
					left: 20,
					pieces: [{
						gte: 0,
						lte: this.riskLine.FLOWS_INTO__HIGH,
						color: 'rgb(255, 135, 97)',
						label: '高风险'
					}, {
						gt: this.riskLine.FLOWS_INTO__HIGH,
						lte: this.riskLine.FLOWS_INTO_MEDIUM,
						color: 'rgb(251, 201, 55)',
						label: '中风险'
					}],
					outOfRange: {
						color: '#2c5775'
					}
				},
				series: [{
					name: '流入', type: 'line',
					data: this.imageData.bIn,
					sampling: 'max',
					smoothMonotone: 'x',
					stack: '流入',
					markLine: {
						lineStyle: {
							normal: {
								type: 'dashed'
							}
						},
						data: [
							{ yAxis: this.riskLine.FLOWS_INTO__HIGH, lineStyle: { normal: { color: 'rgb(255, 135, 97)' } }, label: { normal: { position: 'end' } } },
							{ yAxis: this.riskLine.FLOWS_INTO_MEDIUM, lineStyle: { normal: { color: 'rgb(251, 201, 55)' } }, label: { normal: { position: 'end' } } }
						]
					},
					lineStyle: { normal: { width: 3 } }
				}],
				dataZoom: [{
					startValue: this.param.beginTime ? new Date(this.param.beginTime).getTime() : new Date().getTime(),
					endValue: this.param.endTime ? new Date(this.param.endTime).getTime() : new Date().getTime() - 1000 * 60 * 60 * 24 * 30,
					filterMode: 'empty'
				}, {
					filterMode: 'empty',
					type: 'inside'
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		buildEchartsOut() {
			let myChart = echarts.init(document.getElementById('funflowOut'), 'customed')
			// 指定图表的配置项和数据
			let option = {
				title: { text: '银账资金账户流出', x: 'center' },
				tooltip: {
					trigger: 'axis', formatter: function (params) {
						let content = []
						for (let i = 0; i < params.length; i++) {
							const item = params[i]
							content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + item.seriesName + '：' + Number(item.value[1].toFixed(2)) + '元')
						}
						return content.join('</br>')
					}
				},
				legend: { data: ['流出'], right: 50, orient: 'vertical' },
				xAxis: {
					type: 'time'
				},
				yAxis: {
					name: '金额(元)',
					nameRotate: 90,
					nameLocation: 'middle'
				},
				visualMap: {
					top: 0,
					left: 20,
					pieces: [{
						gt: this.riskLine.FLOWS_OUT_MEDIUM,
						lte: this.riskLine.FLOWS_OUT_HIGH,
						color: 'rgb(251, 201, 55)',
						label: '中风险'
					}, {
						gt: this.riskLine.FLOWS_OUT_HIGH,
						color: 'rgb(255, 135, 97)',
						label: '高风险'
					}],
					outOfRange: {
						color: '#2c5775'
					}
				},
				series: [{
					markLine: {
						lineStyle: {
							normal: {
								type: 'dashed'
							}
						},
						silent: true,
						data: [
							{ yAxis: this.riskLine.FLOWS_OUT_HIGH, lineStyle: { normal: { color: 'rgb(255, 135, 97)' } }, label: { normal: { position: 'end' } } },
							{ yAxis: this.riskLine.FLOWS_OUT_MEDIUM, lineStyle: { normal: { color: 'rgb(251, 201, 55)' } }, label: { normal: { position: 'end' } } }
						]
					},
					sampling: 'max',
					smoothMonotone: 'x',
					stack: '流出',
					name: '流出', type: 'line',
					data: this.imageData.leanOut,
					lineStyle: { normal: { width: 3 } }
				}],
				dataZoom: [{
					startValue: this.param.beginTime ? new Date(this.param.beginTime).getTime() : new Date().getTime(),
					endValue: this.param.endTime ? new Date(this.param.endTime).getTime() : new Date().getTime() - 1000 * 60 * 60 * 24 * 30,
					filterMode: 'empty'
				}, {
					type: 'inside',
					filterMode: 'empty'
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		getRiskLine() {
			for (var i = 0; i < this.projectRiskRule.length; i++) {
				var item = this.projectRiskRule[i]
				if (item.code && item.code.length > 0) {
					switch (item.code) {
					case 'CASH_FLOWS_INTO_HIGH':
						this.riskLine.FLOWS_INTO__HIGH = parseInt(item.riskRuleGroup[0].riskRuleInfo[0].value)
						break
					case 'CASH_FLOWS_INTO_MEDIUM':
						for (let i = 0; i < item.riskRuleGroup[0].riskRuleInfo.length; i++) {
							let it = item.riskRuleGroup[0].riskRuleInfo[i]
							if (it.relationName == '<=') {
								this.riskLine.FLOWS_INTO_MEDIUM = parseInt(it.value)
							}
						}
						break
					case 'CASH_FLOWS_OUT_HIGH':
						this.riskLine.FLOWS_OUT_HIGH = parseInt(item.riskRuleGroup[0].riskRuleInfo[0].value)
						break
					case 'CASH_FLOWS_OUT_MEDIUM':
						for (let i = 0; i < item.riskRuleGroup[0].riskRuleInfo.length; i++) {
							let it = item.riskRuleGroup[0].riskRuleInfo[i]
							if (it.relationName == '>=') {
								this.riskLine.FLOWS_OUT_MEDIUM = parseInt(it.value)
							}
						}
						break
					default:
						break
					}
				}
			}
		}
	},
	beforeMount() {
		const end = new Date()
		const start = new Date()
		start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)

		this.startTime = start
		this.endTime = end

		this.param = {
			beginTime: formatDate(start, 'yyyy-MM-dd HH:mm:ss'),
			endTime: formatDate(end, 'yyyy-MM-dd HH:mm:ss'),
			id: this.itemManageDetail.enterpriseId,
			pageSize: 10,
			pageNo: 1
		}
		this.$store.dispatch('item_getAuthInfo', { id: this.itemManageDetail.id })
		this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
			this.listData = JSON.parse(JSON.stringify(this.dataList))
			this.ready = true
			this.$store.dispatch('risk_selectProjectRiskRule', { id: this.itemManageDetail.id, category: 1 }).then(() => {
				this.getTotalData()
				this.getRiskLine()
				this.getImageData()
			})
		})

	},
	data() {
		return {
			startTime: '',
			endTime: '',
			lastBalance: 0,
			showChart: true,
			ready: false,
			listData: {},
			daterange: [],
			param: {},
			imageData: {},
			totalData: {},
			riskLine: {}
		}
	}
}
</script>