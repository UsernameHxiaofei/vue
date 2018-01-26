<template>
	<div id='enterpriseFunflowDLB'>
		<el-row style="margin:20px auto 20px auto;">
			<el-col :span="24">
				<div class="titleField">
					<span>代理商编号：</span>
					<span>{{listData.list&&listData.list[0].agent_num}}</span> &emsp;&emsp;&emsp;&emsp;
					<span>商户编号：</span>
					<span>{{listData.list&&listData.list[0].customer_num}}</span> &emsp;&emsp;&emsp;&emsp;
					<span>商户简称：</span>
					<span>{{listData.list&&listData.list[0].short_name}}</span>
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
				<div class="actionbar">
					<button class="typebutton" type="button" :class="{'noeffect':!showChart}" @click="changeChart(1)"> 图表 </button>
					<button class="typebutton" type="button" :class="{'noeffect':showChart}" @click="changeChart(0)"> 明细 </button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col style="margin:60px auto 40px auto;">
				<table class="enterpriseTotalData">
					<thead>
						<tr>
							<th>收入金额(元)</th>
							<th>订单数</th>
							<th>最高客单价(元)</th>
							<th>最低客单价(元)</th>
							<th>客单均价（元）</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{{total.pay_amount||0}}
							</td>
							<td>
								{{total.dayNum||0}}
							</td>
							<td>
								{{total.maxAmount||0}}
							</td>
							<td>
								{{total.minAount||0}}
							</td>
							<td>
								{{total.dayAmount||0}}
							</td>
						</tr>
					</tbody>
				</table>
			</el-col>
		</el-row>
		<el-row v-show="showChart">
			<el-col :span="24" style="margin :15px auto 20px 0">
				<div id="enterpriseOrderCountchart"></div>
			</el-col>
		</el-row>
		<el-row v-show="showChart">
			<el-col :span="24" style="margin :25px auto 20px 0">
				<div id="enterpriseDLBchart"></div>
			</el-col>
		</el-row>

		<el-row v-show="!showChart">
			<el-col :span="24">
				<el-table border :data="listData.list" stripe style="width: 100%">
					<el-table-column prop="order_num" width="120" label="订单号" align="center"> </el-table-column>
					<el-table-column prop="order_amount" label="订单金额" width="100" align="center"> </el-table-column>
					<el-table-column prop="pay_amount" label="实付金额" width="100" align="center"> </el-table-column>
					<el-table-column prop="audit" label="支付渠道" width="100">
						<template slot-scope="scope">
							<span>{{scope.row.channel|channel}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="dlb_discount" label="哆啦宝补贴" width="110" align="center"> </el-table-column>
					<el-table-column prop="merchant_discount" label="商家补贴" width="100" align="center"> </el-table-column>
					<el-table-column prop="balance_account_time" width="110" label="入账时间" align="center"> </el-table-column>
					<el-table-column prop="complete_time" width="100" label="完成时间" align="center"> </el-table-column>
					<el-table-column prop="refund_time" width="100" label="退款时间" align="center"> </el-table-column>
					<el-table-column prop="fee" width="100" label="交易费率" align="center"> </el-table-column>
					<el-table-column prop="fee_value" width="80" label="手续费" align="center"> </el-table-column>
					<el-table-column prop="status" label="订单状态" width="100" align="center"> </el-table-column>
					<el-table-column prop="batch_num" width="90" label="批次号" align="center"> </el-table-column>
					<el-table-column prop="machine_num" width="90" label="机具号" align="center"> </el-table-column>
					<el-table-column prop="shop_name" width="110" label="店铺名称" align="center"> </el-table-column>
					<el-table-column prop="shop_num" width="100" label="店铺编号" align="center"> </el-table-column>
					<el-table-column prop="isInclude" width="100" label="是否计入营业额" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.isInclude==0?'不计入':scope.row.isInclude==1?'计入':'计入'}}</span>
						</template>
					</el-table-column>
				</el-table>
				<pagination style="float:right;margin:10px 50px" :total="listData.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from '../../../../node_modules/echarts/dist/echarts.min.js'
	import pagination from '../../../components/common/pagination.vue'
	import moment from 'moment'
	import theme from '../../../assets/js/echarts.theme.js'
	import { formatDate } from '../../../util/index'
	theme(echarts)

	export default {
		name: 'enterpriseFunflow',
		props: ['enterprise'],
		computed: {
			dataList: function () {
				return this.$store.state.enterprise.enterpriseAccountDetailDBL || {}
			},
			listDayAmount: function () {
				return this.$store.state.enterprise.listDayAmount || {}
			},
			total: function () {
				return this.$store.state.enterprise.JHAmountByTime || {}
			},
			merchant: function () {
				return this.$store.state.item.merchant || {}
			},
		},
		components: {
			pagination
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
			getImageData() {
				let bIn = [], bNum = []
				let param = {
					type: 1,
					enterpriseId: this.param.id,
					beginTime: this.param.beginTime.toLocaleString(),
					endTime: this.param.endTime.toLocaleString()
				}
				this.$store.dispatch('enterprise_selectListDayAmount', param).then(() => {
					Object.keys(this.listDayAmount).forEach((key) => {
						let pay_amount = 0, dayNum = 0
						this.listDayAmount[key].forEach((item) => {
							pay_amount += item.pay_amount || 0
							dayNum += item.dayNum || 0
						})
						bIn.push([new Date(key).getTime(), pay_amount || 0])
						bNum.push([new Date(key).getTime(), dayNum || 0])
					})
					this.imageData = { bIn, bNum }
					this.buildEcharts()
				})
			},
			getTotalData() {
				let param = {
					enterpriseId: this.param.id,
					beginTime: this.param.beginTime.toLocaleString(),
					endTime: this.param.endTime.toLocaleString()
				}
				this.$store.dispatch('enterprise_DLBAmountByTime', param)
			},
			startChange(v) {
				this.param.beginTime = v
				this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(() => {
					this.listData = JSON.parse(JSON.stringify(this.dataList))
					this.getTotalData()
					this.getImageData()
				})
			},
			endChange(v) {
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
				let orderNumberChart = echarts.init(document.getElementById('enterpriseOrderCountchart'), 'customed')
				let myChart = echarts.init(document.getElementById('enterpriseDLBchart'), 'customed')
				// 指定图表的配置项和数据
				let orderNumberOption = {
					title: { text: '店铺日订单数量', left: '300' },
					tooltip: {
						trigger: 'axis', formatter: function (params) {
							let content = []
							for (let i = 0; i < params.length; i++) {
								const item = params[i]
								content.push('<span  style="background:' + item.color + ';"  class="echart-dot"></span>' + item.seriesName + '：' + Number(item.value[1] || 0))
							}
							return content.join('</br>')
						}
					},
					legend: { data: ['订单数'], right: 100, orient: 'vertical' },
					xAxis: {
						type: 'time', position: 'bottom', axisPointer: {
							label: {
								formatter: function (params) {
									return moment(new Date(params.value)).format('YYYY-MM-DD')
								}
							}
						}
					},
					yAxis: { name: '数量', nameLocation: 'end' },
					series: [{
						name: '日订单量', type: 'line',
						data: this.imageData.bNum,
						lineStyle: { normal: { width: 3 } }
					}],
					dataZoom: [{
						type: 'inside'
					}]
				}
				let option = {
					title: { text: '店铺日收入', left: '300' },
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
					legend: { data: ['收入'], right: 100, orient: 'vertical' },
					xAxis: {
						type: 'time', position: 'bottom', axisPointer: {
							label: {
								formatter: function (params) {
									return moment(new Date(params.value)).format('YYYY-MM-DD')
								}
							}
						}
					},
					yAxis: { name: '金额(元)', nameLocation: 'end' },
					series: [{
						name: '收入', type: 'line',
						data: this.imageData.bIn,
						lineStyle: { normal: { width: 3 } }
					}],
					dataZoom: [{
						type: 'inside'
					}]
				}
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option)
				orderNumberChart.setOption(orderNumberOption)
			}
		},
		beforeMount() {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3)
			this.startTime = start
			this.endTime = end
			this.param = {
				beginTime: formatDate(start, 'yyyy-MM-dd HH:mm:ss'),
				endTime: formatDate(end, 'yyyy-MM-dd HH:mm:ss'),
				id: this.enterprise.id,
				// id: '02b2cb2a-a22f-47a8-a992-aac6a6edee6f',
				pageSize: 10,
				pageNo: 1
			}
			this.$store.dispatch('item_getMerchant', { enterpriseId: this.enterprise.id })
			this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(() => {
				this.listData = JSON.parse(JSON.stringify(this.dataList))
				this.getTotalData()
				this.getImageData()
			})
		},
		data() {
			return {
				startTime: '',
				endTime: '',
				param: {},
				imageData: [],
				listData: [],
				showChart: true
			}
		}
	}

</script>

<style scoped>
	#enterpriseDLBchart,
	#enterpriseOrderCountchart {
		width: 100%;
		height: 400px;
	}

	.enterpriseTotalData {
		margin: 0 auto;
		width: 100%;
	}

	.enterpriseTotalData td,
	th {
		height: 30px;
		text-align: center;
		border: 1px solid #535455;
	}

	#enterpriseFunflowDLB .typebutton {
		width: 75px;
		color: rgb(6, 204, 182);
		border-radius: 5px;
		height: 34px;
		background: white;
		outline: none;

		border: 1px solid rgb(6, 204, 182);
	}

	#enterpriseFunflowDLB .typebutton:nth-child(1) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;

	}

	#enterpriseFunflowDLB .typebutton:nth-child(2) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;

	}

	#enterpriseFunflowDLB .actionbar {
		width: 200px;
		float: right;
		margin-right: 150px;
	}

	#enterpriseFunflowDLB .noeffect {
		color: #999;
		background: rgb(205, 214, 214);
		border: none;
	}

	#enterpriseFunflowDLB .titleField {
		font-size: 18px;
		font-weight: 600;
		color: rgb(51, 51, 51);
	}

	.datepp {
		margin-left: 20px;
	}



	#enterpriseFunflowDLB .el-table__body .cell {
		color: #535455;
		font-size: 12px;
	}
</style>