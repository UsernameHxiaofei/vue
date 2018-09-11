<template>
    <div id='riskFunflow'>
        <el-row style="padding:50px;">
            <el-row style="margin:30px auto 30px auto;">
                <el-col :span="24">
					
                    <div class="titleField">
							<span>商户编号：</span>
							<span>{{merchant[0]&&merchant[0].customer_num}}</span> &emsp;&emsp;&emsp;&emsp;
							<span>商户名称：</span>
							<span>{{merchant[0]&&merchant[0].shop_name}}</span> &emsp;&emsp;&emsp;&emsp;
							<span >支付渠道：</span>
							<span>{{merchant[0]&&merchant[0].channel|channel}}</span> &emsp;&emsp;&emsp;&emsp;
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <label class="titleField" for="dateRange">日期</label>&emsp;
                    <span>
                        <el-date-picker v-model="startTime" :clearable="false" align="right" :editable="false" type="date" @change="startChange"
                            placeholder="选择开始日期"></el-date-picker>
                        至
                        <el-date-picker v-model="endTime" :clearable="false" align="right" :editable="false" type="date" @change="endChange" placeholder="选择结束日期"></el-date-picker>
                    </span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" style="margin :45px auto 50px 0">
                    <div id="riskFunflowchart"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="margin-top:-40px">
                    <div style="float:right;font-size: 18px;color: rgb(6, 204, 182);font-weight:600">
                        <span>合计：入账</span>
                        <span>{{totalData.totalb}}</span>
                        <span>笔</span>&nbsp;
                        <span>{{totalData.totalbNum}}</span>
                        <span>元</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table border :data="listData.list" stripe style="width: 100%">
							<el-table-column prop="order_num"label="订单号" align="center"> </el-table-column>
							<el-table-column prop="order_amount" label="订单金额(元)"  align="center"> </el-table-column>
							<el-table-column prop="pay_amount" label="实付金额(元)" align="center"> </el-table-column>
							<el-table-column prop="merchant_discount" label="商家补贴(元)"  align="center"> </el-table-column>
							<el-table-column prop="balance_account_time" label="开单时间" align="center"> </el-table-column>
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
import {formatDate} from '../../../util/index'
theme(echarts)

export default {
	name: 'riskFunflow',
	computed: {
		projectRiskRule: function () {
			return this.$store.state.risk.projectRiskRule || []
		},
		dataList: function () {
			return this.$store.state.enterprise.enterpriseAccountDetailDBL || {}
		},
		enterprise: function () {
			return this.$store.state.enterprise.enterpriseInfo || {}
		},
		listDayAmount: function () {
			return this.$store.state.enterprise.listDayAmount || {}
		},
		merchant: function () {
				return this.$store.state.item.merchant || {}
		},
	},
	components: {
		'pagination': pagination
	},
	methods: {
		back() {
			this.$router.go(-1)
		},
		getImageData() {
			let bIn = []
			let param = {
				type:2,
				enterpriseId: this.enterprise.id,
				beginTime: this.param.beginTime,
				endTime: this.param.endTime
			}
			this.$store.dispatch('enterprise_selectListDayAmount', param).then(() => {
				Object.keys(this.listDayAmount).forEach((key) => {
					let pay_amount = 0
					this.listDayAmount[key].forEach((item) => {
						pay_amount += item.pay_amount || 0
					})
					bIn.push([new Date(key).getTime(), pay_amount || 0])
				})
				this.imageData = { bIn }
				this.buildEcharts()
			})
		},

		getTotalData() {
			let totalLean = 0, totalb = 0, totalLeanNum = 0, totalbNum = 0
			for (let i = 0; this.dataList.list && i < this.dataList.list.length; i++) {
				let item = this.dataList.list[i]
				totalb++
				totalbNum += item.pay_amount
			}
			this.totalData = { totalLean, totalb, totalLeanNum, totalbNum }
		},
		startChange(v) {
			if (!this.ready) {
				return
			}
			this.param.beginTime = v
			this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(() => {
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
			this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(() => {
				this.listData = JSON.parse(JSON.stringify(this.dataList))
				this.getTotalData()
				this.getImageData()
			})
		},
		handleSizeChange(size) {
			this.param.pageSize = size
			this.param.pageNo = 1
			this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(() => {
				this.listData = JSON.parse(JSON.stringify(this.dataList))
				this.getTotalData()
			})
		},
		handleCurrentChange(page) {
			this.param.pageNo = page
			this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(() => {
				this.listData = JSON.parse(JSON.stringify(this.dataList))
				this.getTotalData()
			})
		},
		buildEcharts() {
			let myChart = echarts.init(document.getElementById('riskFunflowchart'), 'customed')
			// 指定图表的配置项和数据
			let option = {
				title: { text: '店铺订单收入', x: 'center' }, tooltip: { trigger: 'axis' },
				legend: { data: ['收入'], right: 100, orient: 'vertical' },
				xAxis: {
					type: 'time'
				},
				yAxis: { name: '金额(元)', nameLocation: 'end' },
				series: [{
					name: '收入', type: 'line',
					data: this.imageData.bIn,
					markLine: {
						lineStyle: {
							normal: {
								type: 'dashed'
							}
						},
						data: [
							{ yAxis: this.riskLine.DLB_IN_HIGH, lineStyle: { normal: { color: 'rgb(255, 135, 97)' } }, label: { normal: { position: 'end', formatter: '高风险' } } },
							{ yAxis: this.riskLine.DLB_IN_MIDDLE, lineStyle: { normal: { color: 'rgb(251, 201, 55)' } }, label: { normal: { position: 'end', formatter: '中风险' } } }
						]
					},
					lineStyle: { normal: { width: 3 } }
				}],
				dataZoom: [{
					startValue: this.param.beginTime ? new Date(this.param.beginTime).getTime() : new Date().getTime(),
					endValue: this.param.endTime ? new Date(this.param.endTime).getTime() : new Date().getTime() - 1000 * 60 * 60 * 24 * 30
				}, {
					type: 'inside'
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
					case 'DLB_IN_HIGH':
						this.riskLine.DLB_IN_HIGH = parseInt(item.riskRuleGroup[0].riskRuleInfo[0].value)
						break
					case 'DLB_IN_MIDDLE':
						for (let i = 0; i < item.riskRuleGroup[0].riskRuleInfo.length; i++) {
							let it = item.riskRuleGroup[0].riskRuleInfo[i]
							if (it.relationName == '<=') {
								this.riskLine.DLB_IN_MIDDLE = parseInt(it.value)
							}
						}
						break
					default:
						break
					}
				}
			}
		},
	},
	beforeMount() {
		const end = new Date()
		const start = new Date()
		start.setTime(start.getTime() - 3600 * 1000 * 24 * 30*3)
		this.startTime = start
		this.endTime = end
		this.param = {
			beginTime: formatDate(start, 'yyyy-MM-dd HH:mm:ss'),
			endTime: formatDate(end, 'yyyy-MM-dd HH:mm:ss'),
			id: this.$route.params.enterpriseId,
			pageSize: 10,
			pageNo: 1
		}
		this.$store.dispatch('item_getMerchant', { enterpriseId: this.enterprise.id })
		this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(() => {
			this.listData = JSON.parse(JSON.stringify(this.dataList))
			this.ready = true
			this.$store.dispatch('risk_selectProjectRiskRule', { id: this.$route.params.projectId, category: 1 }).then(() => {
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
			ready: false,
			param: {},
			totalData: {},
			imageData: [],
			listData: [],
			riskLine: {}
		}
	}
}

</script>

<style>
    #riskFunflowchart {
        width: 95%;
        height: 400px;
    }

    #riskFunflow .titleField {
        font-size: 18px;
        font-weight: 600;
        color: rgb(51, 51, 51);
    }

    .datepp {
        margin-left: 20px;
    }

    #riskFunflow .el-table .cell {
        text-align: center;
    }

    #riskFunflow .el-table__body .cell {
        color: #535455;
        font-size: 12px;
    }
</style>