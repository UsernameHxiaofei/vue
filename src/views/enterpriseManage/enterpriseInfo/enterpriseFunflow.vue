<style>
	#enterpriseFunflow #funflowIn {
		width: 100%;
		height: 600px;
	}

	#enterpriseFunflow .choosed {
		background: #06ccb6;
		color: white;
	}

	#enterpriseFunflow #balance {
		width: 100%;
		height: 500px;
	}

	#enterpriseFunflow .titleField {
		font-size: 18px;
		font-weight: 600;
		color: rgb(51, 51, 51);
	}

	#enterpriseFunflow .datepp {
		margin-left: 20px;
	}

	#enterpriseFunflow .el-table .cell {
		text-align: center;
	}

	#enterpriseFunflow .el-table__body .cell {
		color: #535455;
		font-size: 12px;
	}

	#enterpriseFunflow .head-action {
		width: 500px;
		height: 130px;
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
		border: 1px solid #b1b1b1;
		padding: 20px;
		float: left;
		margin: 0px;
	}

	#enterpriseFunflow .info .info-item {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
		width: 300px;
	}

	#enterpriseFunflow .info .info-item label {
		width: 110px;
		text-align: right;
		margin-right: 10px;
	}

	#enterpriseFunflow .banlance {
		width: 200px;
	}

	#enterpriseFunflow .banlance label {
		margin: 20px auto 10px 30px;
		font-size: 14px;
		display: block;

	}

	#enterpriseFunflow .banlance span {
		font-size: 16px;
		margin-left: 30px;
		color: rgb(6, 204, 182);
		font-weight: bold;
	}

	#enterpriseFunflow .typebutton {
		width: 75px;
		color: rgb(6, 204, 182);
		border-radius: 5px;
		height: 34px;
		background: white;
		outline: none;

		border: 1px solid rgb(6, 204, 182);
	}

	#enterpriseFunflow .typebutton:nth-child(1) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;

	}

	#enterpriseFunflow .typebutton:nth-child(2) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;

	}

	#enterpriseFunflow .noeffect {
		color: #999;
		background: rgb(205, 214, 214);
		border: none;
	}

	#enterpriseFunflow .actionbar {
		width: 200px;
		float: right;
		margin-right: 150px;
	}
</style>
<template>
	<div id='enterpriseFunflow'>
		<el-row style="margin:10px auto 10px auto;">
			<div class="head-action" v-for="(item,index) in account" :key="index" v-show="item.type==0">
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
						<label>基本存款账账户</label>
						<span>{{item.basicDepositAccountNumber}}</span>
					</div>
					<div class="info-item">
						<label>账号名称</label>
						<span>{{item.accountName}}</span>
					</div>
				</div>
				<div class="banlance">
					<label>账户余额</label>
					<span>{{item.balance||0}}元</span>
				</div>
			</div>
			
		</el-row>
		<el-row>
			<el-col :span="24" style="margin:10px auto">
				<label class="titleField">日期</label>&emsp;
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
		<el-row>
			<el-col style="margin:10px auto" :span="24">
				<label class="titleField" for="dateRange">快捷查询</label>&emsp;
				<el-button size="small" :class="{'choosed':timeQuick==1}" @click="setTimeQuick(1)">近一天</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==2}" @click="setTimeQuick(2)">近三天</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==3}" @click="setTimeQuick(3)">近一周</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==4}" @click="setTimeQuick(4)">近一月</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==5}" @click="setTimeQuick(5)">近三月</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==6}" @click="setTimeQuick(6)">近六月</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==7}" @click="setTimeQuick(7)">近一年</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==8}" @click="setTimeQuick(8)">近两年</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==9}" @click="setTimeQuick(9)">近三年</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col style="margin:10px auto" :span="24">
				<label class="titleField" for="dateRange">单位</label>&emsp;
				<el-button size="small" :class="{'choosed':unit==1}" @click="chooseUnit(1)">元</el-button>
				<el-button size="small" :class="{'choosed':unit==10000}" @click="chooseUnit(10000)">万元</el-button>
			</el-col>
		</el-row>
		<el-row v-show="showChart">
			<el-col :span="24" style="margin-top:15px">
				<div id="balance">

				</div>
			</el-col>
		</el-row>
		<el-row v-show="showChart">
			<el-col :span="24" style="margin-top:45px">
				<div id="funflowIn">

				</div>
			</el-col>
		</el-row>
		<el-row v-show="!showChart">
			<el-col>
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
					<el-table-column prop="transactionTime" width="180" label="交易时间" align="center"> </el-table-column>
					<el-table-column prop="summary" width="180" label="摘要" align="center"> </el-table-column>
					<el-table-column prop="debitAmount" :label="`借方发生额(${unitName})`" align="center"> </el-table-column>
					<el-table-column prop="creditAmount" :label="`贷方发生额(${unitName})`" align="center"> </el-table-column>
					<el-table-column prop="balance" :label="`余额(${unitName})`" align="center"> </el-table-column>
					<el-table-column prop="recAccountNumber" label="对方账户" align="center"> </el-table-column>
					<el-table-column prop="recAccountName" width="180" label="对方账户名称" align="center"> </el-table-column>
				</el-table>
				<pagination style="float:right;margin:10px 50px" :total="listData.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
			</el-col>
		</el-row>
		<importFile :visible="isImport" @result="getFile" @close="isImport=false"></importFile>
	</div>
</template>

<script>
	import echarts from '../../../../node_modules/echarts/dist/echarts.min.js'
	import pagination from '../../../components/common/pagination.vue'
	import importFile from '../../../components/common/importFile.vue'
	import moment from 'moment'
	import theme from '../../../assets/js/echarts.theme.js'
	import { formatDate,moneyFormat } from '../../../util/index'

	theme(echarts)

	export default {
		name: 'enterpriseFunflow',
		props: ['enterprise'],
		computed: {
			dataList: function () {
				return this.$store.state.enterprise.enterpriseAccountDetail || {}
			},
			listDayAmount: function () {
				return this.$store.state.enterprise.listDayAmount || {}
			},
			account: function () {
				return this.$store.state.item.authInfo && this.$store.state.item.authInfo || []
			},
			unitName: function () {
				return this.unit == 1 ? '元' : '万元'
			}
		},
		components: {
			'pagination': pagination,
			importFile
		},
		methods: {
			setTimeQuick(n) {
				this.timeQuick = n
				this.isTimeQuick = true
				this.endTime = moment().format('YYYY-MM-DD 00:00:00')
				switch (n) {
					case 1:
						this.startTime = moment().subtract(1, 'day').format('YYYY-MM-DD 00:00:00')
						break;
					case 2:
						this.startTime = moment().subtract(3, 'day').format('YYYY-MM-DD 00:00:00')
						break;
					case 3:
						this.startTime = moment().subtract(1, 'week').format('YYYY-MM-DD 00:00:00')
						break;
					case 4:
						this.startTime = moment().subtract(1, 'month').format('YYYY-MM-DD 00:00:00')
						break;
					case 5:
						this.startTime = moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00')
						break;
					case 6:
						this.startTime = moment().subtract(6, 'month').format('YYYY-MM-DD 00:00:00')
						break;
					case 7:
						this.startTime = moment().subtract(1, 'year').format('YYYY-MM-DD 00:00:00')
						break;
					case 8:
						this.startTime = moment().subtract(2, 'year').format('YYYY-MM-DD 00:00:00')
						break;
					case 9:
						this.startTime = moment().subtract(3, 'year').format('YYYY-MM-DD 00:00:00')
						break;
					default:
						break;
				}
				this.param = {
					beginTime: this.startTime,
					endTime: this.endTime,
					id: this.enterprise.id,
					pageSize: 10,
					pageNo: 1,
					type: 1//1：银行
				}
				
				Promise.all([this.$store.dispatch('enterprise_getAccountDetail', this.param), this.getImageData(), this.getTotalData()]).then((data) => {
					this.formatListData()
					this.isTimeQuick = false
				})
			},
			chooseUnit(n) {
				this.unit = n
				this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
					this.formatListData()
					this.getTotalData()
					this.getImageData()
				})
			},
			formatListData() {
				let listData = JSON.parse(JSON.stringify(this.dataList))
				for (let i = 0; listData.list&&i < listData.list.length; i++) {
					let item = listData.list[i]
					item.debitAmount = item.debitAmount / this.unit
					item.creditAmount = item.creditAmount / this.unit
					item.balance = item.balance / this.unit
				}
				this.listData = listData
			},
			changeChart(a) {
				if (a) {
					this.showChart = true
				} else {
					this.showChart = false
				}
				this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
					this.formatListData()
					this.getTotalData()
					this.getImageData()
				})
			},
			getTotalData() {
				let totalLean = 0, totalb = 0, totalLeanNum = 0, totalbNum = 0
				for (let i = 0; this.dataList.list && i < this.dataList.list.length; i++) {
					let item = this.dataList.list[i]
					let flag = item.debitAmount > item.creditAmount//true就是借,就是流出
					if (flag) {
						totalLean++
						totalLeanNum += item.debitAmount/this.unit
					} else {
						totalb++
						totalbNum += item.creditAmount/this.unit || 0
					}
				}
				return this.totalData = { totalLean, totalb, totalLeanNum: totalLeanNum.toFixed(2), totalbNum: totalbNum.toFixed(2) }
			},
			getImageData() {
				let param = {
					type: 0,
					enterpriseId: this.enterprise.id,
					beginTime: this.param.beginTime.toLocaleString(),
					endTime: this.param.endTime.toLocaleString()
				}
				let leanOut = [], bIn = [], balance = []
				return this.$store.dispatch('enterprise_selectListDayAmount', param).then(() => {
					Object.keys(this.listDayAmount).forEach((key) => {
						let creditAmount = 0, debitAmount = 0, balan = 0
						this.listDayAmount[key].forEach((item) => {
							creditAmount += item.creditAmount/this.unit || 0
							debitAmount += item.debitAmount/this.unit || 0
							balan += item.balance/this.unit || 0
						})
						leanOut.push([new Date(key).getTime(), debitAmount || 0])
						bIn.push([new Date(key).getTime(), creditAmount || 0])
						balance.push([new Date(key).getTime(), balan || 0])
					})
					this.imageData = { leanOut, bIn, balance }
					this.buildEcharts()
				})
			},
			startChange(v) {
				if (this.isTimeQuick) {
					return
				}
				this.param.beginTime = moment(v).format('YYYY-MM-DD 00:00:00')
				this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
					this.formatListData()
					this.getTotalData()
					this.getImageData()
				})
			},
			endChange(v) {
				if (this.isTimeQuick) {
					return
				}
				this.param.endTime = moment(v).format('YYYY-MM-DD 00:00:00')
				this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
					this.formatListData()
					this.getTotalData()
					this.getImageData()
				})
			},
			handleSizeChange(size) {
				this.param.pageSize = size
				this.param.pageNo = 1
				this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
					this.getTotalData()
					this.formatListData()
				})
			},
			handleCurrentChange(page) {
				this.param.pageNo = page
				this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
					this.formatListData()
					this.getTotalData()
				})
			},
			buildEcharts() {
				let funflow = echarts.init(document.getElementById('funflowIn'), 'customed')
				let balance = echarts.init(document.getElementById('balance'), 'customed')
				// 指定图表的配置项和数据
				let funflowOption = {
					title: { text: '银账资金账户流水', x: 'center' },
					tooltip: {
						trigger: 'axis', formatter: function (params) {
							let content = []
							for (let i = 0; i < params.length; i++) {
								const item = params[i]
								content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + moment(item.value[0]).format('YYYY-MM-DD') + '&emsp;' + item.seriesName + '：' + Number(item.value[1].toFixed(2)) + '元')
							}
							return content.join('</br>')
						}
					},
					legend: { data: ['流入', '流出'], right: 200, orient: 'vertical' },
					grid: [{
						height: '35%'
					}, {
						top: '50%'
					}],
					xAxis: [
						{
							type: 'time', position: 'top', axisPointer: {
								label: {
									formatter: function (params) {
										return moment(new Date(params.value)).format('YYYY-MM-DD')
									}
								}
							}
						},
						{
							type: 'time', gridIndex: 1, axisPointer: {
								label: {
									formatter: function (params) {
										return moment(new Date(params.value)).format('YYYY-MM-DD')
									}
								}
							}
						}
					],
					axisPointer: {
						link: { xAxisIndex: 'all' }
					},
					yAxis: [
						{ name: `金额(${this.unitName})`, nameLocation: 'start', gridIndex: 0 },
						{ name: `金额(${this.unitName})`, nameLocation: 'start', inverse: true, gridIndex: 1 }
					],
					series: [{
						name: '流入', type: 'bar',
						data: this.imageData.bIn,
						barMaxWidth: 40,
						barCategoryGap: '60%',
						lineStyle: { normal: { width: 3 } }
					},
					{
						name: '流出', type: 'bar',
						barMaxWidth: 40,
						barCategoryGap: '60%',
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: this.imageData.leanOut,
						lineStyle: { normal: { width: 3 } }
					}],
					dataZoom: [{
						show: true,
						realtime: true,
						startValue: this.startTime,
						endValue: this.endTime,
						xAxisIndex: [0, 1]
					}, {
						realtime: true,
						startValue: this.startTime,
						endValue: this.endTime,
						xAxisIndex: [0, 1],
						type: 'inside'
					}]
				}
				let balanceOption = {
					title: { text: '银账资金账户余额情况', x: 'center' }, tooltip: { trigger: 'axis' },
					legend: { data: ['余额'], right: 100, orient: 'vertical' },
					xAxis: {
						type: 'time', position: 'bottom',
						axisPointer: {
							label: { formatter: function (params) { return moment(new Date(params.value)).format('YYYY-MM-DD') } },
							axisTick: { length: 1 }
						}
					},
					yAxis: { name: `金额(${this.unitName})`, nameLocation: 'end' },
					series: [{
						name: '余额', type: 'line',
						data: this.imageData.balance,
						lineStyle: { normal: { width: 3 } }
					}],
					dataZoom: [{
						startValue: this.startTime,
						endValue: this.endTime
					}, {
						type: 'inside'
					}]
				}
				// 使用刚指定的配置项和数据显示图表。
				balance.setOption(balanceOption)
				funflow.setOption(funflowOption)
			}
		},
		beforeMount() {
			
			this.setTimeQuick(4)
		},
		data() {
			return {
				startTime: '',
				endTime: '',
				showChart: true,
				listData: {},
				param: {},
				imageData: {},
				totalData: {},
				unit: 1,
				timeQuick: 1,
				isTimeQuick: true,
			}
		}
	}

</script>