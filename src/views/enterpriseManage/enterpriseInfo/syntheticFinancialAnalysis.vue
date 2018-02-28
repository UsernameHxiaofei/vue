<template>
	<div id='SyntheticFinancialAnalysis' style="background:#ffffff">
		<el-row style="margin-top:10px;">
			<label class="text-label">快捷查询</label>
			<el-button class="sbtn" size="small" @click="select(1)" :class="{'selectb':M3}">3个月内</el-button>
			<el-button class="sbtn" size="small" @click="select(2)" :class="{'selectb':M6}">6个月内</el-button>
			<el-button class="sbtn" size="small" @click="select(3)" :class="{'selectb':J4}">4个季度内</el-button>
			<el-button class="sbtn" size="small" @click="select(4)" :class="{'selectb':Y3}">3年内</el-button>
		</el-row>
		<el-row style="margin-top:10px">
			<el-row>
				<label class="text-label">时间范围</label>
				<el-button class="sbtn" size="small" @click="choose(3)" :class="{'selectb':Y}">年</el-button>
				<el-button class="sbtn" size="small" @click="choose(2)" :class="{'selectb':J}">季</el-button>
				<el-button class="sbtn" size="small" @click="choose(1)" :class="{'selectb':M}">月</el-button>
			</el-row>
			<el-row>
				<label class="text-label">&emsp;&emsp;&emsp;&emsp;</label>
				<el-select style="margin:10px auto auto 20px" class="selectstyle" v-model="start_year" @change="search">
					<el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				</el-select>
				<el-select class="selectstyle" v-if="J" v-model="start_quarter" @change="search">
					<el-option v-for="n in 4" :key="n" :label="'第'+n+'季'" :value="n"> </el-option>
				</el-select>
				<el-select class="selectstyle" v-if="M" v-model="start_month" @change="search">
					<el-option v-for="n in 12" :key="n" :label="n+'月'" :value="n"> </el-option>
				</el-select>
				<span style="font-weight:500;margin:auto 10px auto 10px">到</span>
				<el-select class="selectstyle" v-model="end_year" @change="search">
					<el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				</el-select>
				<el-select class="selectstyle" v-if="J" v-model="end_quarter" @change="search">
					<el-option v-for="n in 4" :key="n" :label="'第'+n+'季'" :value="n"> </el-option>
				</el-select>
				<el-select class="selectstyle" v-if="M" v-model="end_month" @change="search">
					<el-option v-for="n in 12" :key="n" :label="n+'月'" :value="n"> </el-option>
				</el-select>
			</el-row>
		</el-row>
		<el-row style="margin-top:10px">
			<label class="text-label">单&emsp;&emsp;位</label>
			<el-button class="sbtn" size="small" @click="select(7)" :class="{'selectb':unit1}">元</el-button>
			<el-button class="sbtn" size="small" @click="select(8)" :class="{'selectb':unit2}">万元</el-button>
		</el-row>
		<el-row style="margin-top:40px">
			<div class="lay-table">
				<div id="IncomeScaleAndRate" style="height:400px;">
					<!--收入规模与增长率-->
				</div>
			</div>
			<div class="lay-table">
				<div id="RetainedProfitsAndRate" style="height:400px;">
					<!--净利润与增长率-->
				</div>
			</div>
			<div class="lay-table">
				<div id="IncomeScaleAndTrend" style="height:400px;">
					<!--收入规模与增长趋势-->
				</div>
			</div>
			<div class="lay-table">
				<div id="RetainedProfitsAndTrend" style="height:400px;">
					<!--净利润与增长趋势-->
				</div>
			</div>
			<div class="lay-table">
				<div id="GrossRateAndNetRate" style="height:400px;">
					<!--毛利率与净利率-->
				</div>
			</div>
			<div class="lay-table">
				<div id="roe-and-roa" style="height:400px;">
					<!--roe与roa-->
				</div>
			</div>
			<div class="lay-table">
				<div id="receive" style="height:400px;">
					<!--销售商品(提供劳务)收到的现金占比-->
				</div>
			</div>
			<div class="lay-table">
				<div id="pay" style="height:400px;">
					<!--固有资产支付现金-->
				</div>
			</div>
			<div class="lay-table">
				<div id="debts" style="height:400px;">
					<!--资产负债状况-->
				</div>
			</div>
			<div class="lay-table">
				<div id="flow" style="height:400px;">
					<!--流动性分析-->
				</div>
			</div>

		</el-row>
	</div>
</template>

<script>
import echarts from '../../../../node_modules/echarts/dist/echarts.min.js'
import theme from '../../../assets/js/echarts.theme.js'
import {moneyFormat} from '../../../util/index'

theme(echarts)

export default {
	name: 'SyntheticFinancialAnalysis',
	data() {
		return {
			M3: false, M6: false, J4: false, Y3: true, unit1: false, unit2: true,
			M: false, J: false, Y: true,
			start_year: 1, start_quarter: 1, start_month: 1,
			end_year: 1, end_quarter: 1, end_month: 1,
			years: [],
			listdata: {},
			xAxis: [],
			unitText: '万元',
			param: {},
			ready: false
		}
	},
	props: ['enterprise'],
	computed: {
		totalData: function () {
			return this.$store.state.enterprise.sf
		}
	},
	beforeMount() {
		let now = new Date()
		this.getYears()
		this.param = {
			type: 'year',
			enterpriseId: this.enterprise.id,
			beginTime: now.getFullYear() - 3,
			endTime: now.getFullYear()
		}
		this.select(4)
		this.search()
	},
	methods: {
		search() {
			if (!this.ready) {
				return
			}
			let beginTime = this.start_year, endTime = this.end_year
			if (this.M) {
				if (this.end_month <= 9) {
					endTime = this.end_year + '0' + this.end_month
				} else {
					endTime = this.end_year + '' + this.end_month
				}
				if (this.start_month <= 9) {
					beginTime = beginTime + '0' + this.start_month
				} else {
					beginTime = beginTime + '' + this.start_month
				}
			} else if (this.J) {
				endTime = this.end_year + '' + this.end_quarter
				beginTime = this.start_year + '' + this.start_quarter
			}
			this.param.beginTime = parseInt(beginTime)
			this.param.endTime = parseInt(endTime)
			if (parseInt(beginTime) >= parseInt(endTime)) {
				this.end_year = this.start_year
				this.end_month = this.start_month
				this.end_quarter = this.start_quarter
			}
			this.$store.dispatch('enterprise_sf', this.param).then(() => {
				this.formatData()
				this.buildAll()
			})

		},
		buildAll() {
			this.build1(this.xAxis, this.listdata)
			this.build2(this.xAxis, this.listdata)
			this.build3(this.xAxis, this.listdata)
			this.build4(this.xAxis, this.listdata)
			this.build5(this.xAxis, this.listdata)
			this.build6(this.xAxis, this.listdata)
			this.build7(this.xAxis, this.listdata)
			this.build8(this.xAxis, this.listdata)
			this.build9(this.xAxis, this.listdata)
			this.build10(this.xAxis, this.listdata)
		},
		formatData() {
			let xAxis = []
			let data = {
				businessIncome: [],
				incomeRate: [],
				netProfit: [],
				netProfitRate: [],
				saleRate: [],
				netSaleRate: [],
				roe: [],
				roa: [],
				salesIncome: [],
				saleIncomeRate: [],
				paymentsAssetsCash: [],
				assetsTotal: [],
				equityTotal: [],
				liabilitiesTotal: [],
				assetsRate: [],
				currentLiabilitiesTotal: [],
				currentRatio: [],
				quickRatio: [],
				currentAssetsTotal: [],
				monetaryFund: [],
				billsReceivable: [],
				accountsReceivable: [],
				otherReceivable: []
			}
			for (let i = 0; i < this.totalData.length; i++) {
				let item = this.totalData[i]
				let time = item.year + '年'
				if (this.M) {
					time = time + item.month + '月'
				} else if (this.J) {
					time = time + item.quarter + '季度'
				}
				xAxis.push(time)
				if (this.unit2) {
					data.businessIncome.push(moneyFormat(item.businessIncome,6,10000))
					data.netProfit.push(moneyFormat(item.netProfit,6,10000))
					data.salesIncome.push(moneyFormat(item.salesIncome,6,10000))
					data.paymentsAssetsCash.push(moneyFormat(item.paymentsAssetsCash,6,10000) )
					data.assetsTotal.push(moneyFormat(item.assetsTotal,6,10000))
					data.equityTotal.push(moneyFormat(item.equityTotal,6,10000))
					data.liabilitiesTotal.push(moneyFormat(item.liabilitiesTotal,6,10000))
					data.currentLiabilitiesTotal.push(moneyFormat(item.currentLiabilitiesTotal,6,10000))
					data.currentAssetsTotal.push(moneyFormat(item.currentAssetsTotal,6,10000))
					data.monetaryFund.push(moneyFormat(item.monetaryFund,6,10000))
				} else {
					data.businessIncome.push(moneyFormat(item.businessIncome))
					data.netProfit.push(moneyFormat(item.netProfit))
					data.salesIncome.push(moneyFormat(item.salesIncome))
					data.paymentsAssetsCash.push(moneyFormat(item.paymentsAssetsCash))
					data.assetsTotal.push(moneyFormat(item.assetsTotal))
					data.equityTotal.push(moneyFormat(item.equityTotal))
					data.liabilitiesTotal.push(moneyFormat(item.liabilitiesTotal))
					data.currentLiabilitiesTotal.push(moneyFormat(item.currentLiabilitiesTotal))
					data.currentAssetsTotal.push(moneyFormat(item.currentAssetsTotal))
					data.monetaryFund.push(moneyFormat(item.monetaryFund))
				}
				data.incomeRate.push(item.incomeRate&&parseFloat(item.incomeRate.replace('%', '')) || 0)
				data.netProfitRate.push(item.netProfitRate&&parseFloat(item.netProfitRate.replace('%', '')) || 0)
				data.saleRate.push(item.saleRate&&parseFloat(item.saleRate.replace('%', '')) || 0)
				data.netSaleRate.push(item.netSaleRate&&parseFloat(item.netSaleRate.replace('%', '')) || 0)
				data.roe.push(item.roe&&parseFloat(item.roe.replace('%', '')) || 0)
				data.roa.push(item.roa&&parseFloat(item.roa.replace('%', '')) || 0)
				data.saleIncomeRate.push(item.saleIncomeRate&&parseFloat(item.saleIncomeRate.replace('%', '')) || 0)
				data.assetsRate.push(item.assetsRate&&parseFloat(item.assetsRate.replace('%', '')) || 0)
				data.currentRatio.push(item.currentRatio&&parseFloat(item.currentRatio) || 0)
				data.quickRatio.push(item.quickRatio&&parseFloat(item.quickRatio) || 0)
			}
			this.listdata = data
			this.xAxis = xAxis
		},
		getYears() {
			let now = new Date().getFullYear(), startYear = 2010
			while (now - startYear > 0) {
				this.years.push({ value: now, label: now + '年' })
				now--
			}
			this.years.push({ value: startYear, label: startYear + '年' })
		},
		choose(n) {
			this.M = this.J = this.Y = false
			this.M3 = this.M6 = this.J4 = this.Y3 = false
			switch (n) {
			case 1:
				this.M = true
				this.param.type = 'month'
				this.search()
				break
			case 2:
				this.J = true
				this.param.type = 'quarter'
				this.search()
				break
			case 3:
				this.Y = true
				this.param.type = 'year'
				this.search()
				break
			default:
				
				break
			}
			
		},
		select(n) {
			let now = new Date()
			let beginTime = '', endTime = ''
			if (n <= 6) {
				this.M3 = this.M6 = this.J4 = this.Y3 = false
			} else {
				this.unit1 = this.unit2 = false
			}
			if (n == 1) {
				this.choose(1)
				let year1 = now.getFullYear()
				let month1 = now.getMonth() - 2
				if (month1 < 1) {
					year1--
					month1 += 12
				}
				this.start_year = year1
				this.start_month = month1
				this.end_month = now.getMonth() + 1
				this.end_year = now.getFullYear()
				if (this.end_month <= 9) {
					endTime = this.end_year + '0' + this.end_month
				} else {
					endTime = this.end_year + '' + this.end_month
				}
				if (this.start_month <= 9) {
					beginTime = this.start_year + '0' + this.start_month
				} else {
					beginTime = this.start_year + '' + this.start_month
				}
				this.param.beginTime = parseInt(beginTime)
				this.param.endTime = parseInt(endTime)
				this.M3 = true
			} else if (n == 2) {
				this.choose(1)
				let year2 = now.getFullYear()
				let month2 = now.getMonth() - 5
				if (month2 < 1) {
					year2--
					month2 += 12
				}
				this.start_year = year2
				this.start_month = month2
				this.end_month = now.getMonth() + 1
				this.end_year = now.getFullYear()
				if (this.end_month <= 9) {
					endTime = this.end_year + '0' + this.end_month
				} else {
					endTime = this.end_year + '' + this.end_month
				}
				if (this.start_month <= 9) {
					beginTime = this.start_year + '0' + this.start_month
				} else {
					beginTime = this.start_year + '' + this.start_month
				}
				this.param.beginTime = parseInt(beginTime)
				this.param.endTime = parseInt(endTime)
				this.M6 = true
			} else if (n == 3) {
				this.choose(2)
				let month3 = now.getMonth() + 1
				this.start_year = now.getFullYear() - 1
				this.end_year = now.getFullYear()
				if (month3 < 4) {
					this.start_quarter = this.end_quarter = 1
				} else if (month3 > 3 && month3 < 7) {
					this.start_quarter = this.end_quarter = 2
				} else if (month3 > 6 && month3 < 10) {
					this.start_quarter = this.end_quarter = 3
				} else if (month3 > 9 && month3 < 13) {
					this.start_quarter = this.end_quarter = 4
				}
				endTime = this.end_year + '' + this.end_quarter
				beginTime = this.start_year + '' + this.start_quarter
				this.param.beginTime = parseInt(beginTime)
				this.param.endTime = parseInt(endTime)
				this.J4 = true
			} else if (n == 4) {
				this.choose(3)
				this.start_year = now.getFullYear() - 3
				this.end_year = now.getFullYear()
				endTime = this.end_year
				beginTime = this.start_year
				this.param.beginTime = beginTime
				this.param.endTime = endTime
				this.Y3 = true
				this.ready = true
			} else if (n == 7) {
				this.unit1 = true
				this.unitText = '元'
				this.formatData()
				this.buildAll()
			} else if (n == 8) {
				this.unit2 = true
				this.unitText = '万元'
				this.formatData()
				this.buildAll()
			}
			
		},
		build10(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('flow'), 'customed')
			let option = {
				title: { text: '流动性分析', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['流动负债', '流动比率', '速动比率'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '金额(' + this.unitText + ')', nameLocation: 'end' }, { name: '比例', nameLocation: 'end' }],
				series: [{
					name: '流动负债', type: 'bar',
					data: listData.currentLiabilitiesTotal,
					barMaxWidth: 60,
					barCategoryGap: '50%',
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '流动比率', type: 'line',
					data: listData.currentRatio,
					yAxisIndex: 1,
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '速动比率', type: 'line',
					data: listData.quickRatio,
					yAxisIndex: 1,
					lineStyle: { normal: { width: 3 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		build9(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('debts'), 'customed')
			let option = {
				title: { text: '资产负债状况', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['股东权益合计', '负债合计', '资产负债率'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '金额(' + this.unitText + ')', nameLocation: 'end' }, { name: '百分比(%)', nameLocation: 'end' }],
				series: [{
					name: '股东权益合计', type: 'bar',
					data: listData.equityTotal,
					barMaxWidth: 60,
					barCategoryGap: '50%',
					stack: '合计',
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '负债合计', type: 'bar',
					data: listData.liabilitiesTotal,
					barMaxWidth: 60,
					barCategoryGap: '50%',
					stack: '合计',
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '资产负债率', type: 'line',
					data: listData.assetsRate,
					yAxisIndex: 1,
					lineStyle: { normal: { width: 3 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		build8(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('pay'), 'customed')
			let option = {
				title: { text: '固有资产等支付的现金', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['固有资产等支付的现金'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '金额(' + this.unitText + ')', nameLocation: 'end' }],
				series: [{
					name: '固有资产等支付的现金', type: 'bar',
					data: listData.paymentsAssetsCash,
					barMaxWidth: 60,
					barCategoryGap: '50%',
					lineStyle: { normal: { width: 1 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		build7(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('receive'), 'customed')
			let option = {
				title: { text: '销售商品(提供劳务)收到的现金占比', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['销售商品(提供劳务)收到的现金', '收到的现金', '现金流占比'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '金额(' + this.unitText + ')', nameLocation: 'end' }, { name: '百分比(%)', nameLocation: 'end' }],
				series: [{
					name: '销售商品(提供劳务)收到的现金', type: 'bar',
					barMaxWidth: 60,
					barCategoryGap: '50%',
					data: listData.salesIncome,
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '收到的现金', type: 'bar',
					data: listData.businessIncome,
					barMaxWidth: 60,
					barCategoryGap: '50%',
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '现金流占比', type: 'line',
					data: listData.saleIncomeRate,
					yAxisIndex: 1,
					lineStyle: { normal: { width: 3 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		build6(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('roe-and-roa'), 'customed')
			let option = {
				title: { text: 'ROE(净资产收益率)和ROA(资产回报率)', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['ROE(净资产收益率)', 'ROA(资产回报率)'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '百分比(%)', nameLocation: 'end' }],
				series: [{
					name: 'ROE(净资产收益率)', type: 'line',
					data: listData.roe,
					lineStyle: { normal: { width: 3 } }
				}, {
					name: 'ROA(资产回报率)', type: 'line',
					data: listData.roa,
					lineStyle: { normal: { width: 3 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		build5(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('GrossRateAndNetRate'), 'customed')
			let option = {
				title: { text: '毛利率和净利率', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['毛利率', '净利率'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '百分比(%)', nameLocation: 'end' }],
				series: [{
					name: '毛利率', type: 'line',
					data: listData.saleRate,
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '净利率', type: 'line',
					data: listData.netSaleRate,
					lineStyle: { normal: { width: 3 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		build4(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('RetainedProfitsAndTrend'), 'customed')
			let option = {
				title: { text: '净利润与增长趋势', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['净利润', '线性(净利润)'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '金额(' + this.unitText + ')', nameLocation: 'end' }],
				series: [{
					name: '净利润', type: 'bar',
					data: listData.netProfit,
					barMaxWidth: 60,
					barCategoryGap: '50%',
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '线性(净利润)', type: 'line',
					data: listData.netProfit,
					smooth: true,
					smoothMonotone: 'y',
					sampling: 'average',
					lineStyle: { normal: { width: 3 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		build3(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('IncomeScaleAndTrend'), 'customed')
			let option = {
				title: { text: '收入规模与增长趋势', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['销售收入', '线性(销售收入)'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '金额(' + this.unitText + ')', nameLocation: 'end' }],
				series: [{
					name: '销售收入', type: 'bar',
					data: listData.businessIncome,
					barMaxWidth: 60,
					barCategoryGap: '50%',
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '线性(销售收入)', type: 'line',
					data: listData.businessIncome,
					z: 12,
					smooth: true,
					smoothMonotone: 'y',
					sampling: 'average',
					lineStyle: { normal: { width: 3 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		build2(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('RetainedProfitsAndRate'), 'customed')
			let option = {
				title: { text: '净利润与增长率', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['净利润', '增长率'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '金额(' + this.unitText + ')', nameLocation: 'end' }, { name: '增长率(%)', nameLocation: 'end' }],
				series: [{
					name: '净利润', type: 'bar',
					yAxisIndex: 0,
					barMaxWidth: 60,
					barCategoryGap: '50%',
					data: listData.netProfit,
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '增长率', type: 'line',
					yAxisIndex: 1,
					data: listData.netProfitRate,
					lineStyle: { normal: { width: 3 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		},
		build1(xAxis, listData) {
			let myChart = echarts.init(document.getElementById('IncomeScaleAndRate'), 'customed')
			let option = {
				title: { text: '收入规模和增长率', x: 'center' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['销售收入', '增长率'], bottom: 0, orient: 'horizontal' },
				xAxis: { data: xAxis },
				yAxis: [{ name: '金额(' + this.unitText + ')', nameLocation: 'end' }, { name: '增长率(%)', nameLocation: 'end' }],
				series: [{
					name: '销售收入', type: 'bar',
					yAxisIndex: 0,
					data: listData.businessIncome,
					barMaxWidth: 60,
					barCategoryGap: '50%',
					lineStyle: { normal: { width: 3 } }
				}, {
					name: '增长率', type: 'line',
					yAxisIndex: 1,
					data: listData.incomeRate,
					lineStyle: { normal: { width: 3 } }
				}]
			}
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
		}

	}

}
</script>

<style>
	#SyntheticFinancialAnalysis {
		background: #fcfcfc
	}

	#SyntheticFinancialAnalysis .spickss {
		margin-left: 20px;
		margin-right: 10px;
	}

	#SyntheticFinancialAnalysis .spickss1 {
		margin-left: 10px;
	}

	#SyntheticFinancialAnalysis .sbtn {
		margin-left: 20px;
		padding-left: 15px;
		padding-right: 15px;
	}

	#SyntheticFinancialAnalysis .text-label {
		font-weight: 550;
		font-size: 20px;
	}

	#SyntheticFinancialAnalysis .selectb {
		background: #06CCB7;
		color: white;
	}

	#SyntheticFinancialAnalysis .selectstyle {
		width: 100px;
	}

	#SyntheticFinancialAnalysis .lay-table {
		margin-right: 50px;
		padding-bottom: 50px;
		min-width: 380px;
		width: 42%;
		float: left;
	}
</style>