<template>
	<div id='enterpriseFunflowDLB'>
		<el-row style="margin:20px auto 20px auto;">
			<el-col :span="24">
				<div class="titleField">
					<span>商户编号&emsp;</span>
					<span style="color:#06ccb6">{{merchant[0]&&merchant[0].customer_num}}</span> &emsp;&emsp;&emsp;&emsp;
					<span>商户名称&emsp;</span>
					<span style="color:#06ccb6">{{merchant[0]&&merchant[0].shop_name}}</span> &emsp;&emsp;&emsp;&emsp;
					<span @click="isUpload=!isUpload">支付渠道&emsp;</span>
					<span style="color:#06ccb6">{{merchant[0]&&merchant[0].channel|channel}}</span> &emsp;&emsp;&emsp;&emsp;
					<el-button v-if="isUpload" size="small" type="primary" @click="uploadVisible=true">
						上传哆啦宝商户账单
					</el-button>
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
		<el-row >
			<el-col style="margin:10px auto" :span="24">
				 <label class="titleField" for="dateRange">快捷查询</label>&emsp;
				<el-button size="small" :class="{'choosed':timeQuick==1}" @click="setTimeQuick(1)">近一天</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==2}"  @click="setTimeQuick(2)">近三天</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==3}" @click="setTimeQuick(2)">近一周</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==4}" @click="setTimeQuick(3)">近一月</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==5}" @click="setTimeQuick(4)">近六月</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==6}" @click="setTimeQuick(5)">近一年</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==7}" @click="setTimeQuick(6)">近两年</el-button>
				<el-button size="small" :class="{'choosed':timeQuick==8}"  @click="setTimeQuick(7)">近三年</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col style="margin:10px auto" :span="24">
				<label class="titleField" for="dateRange">单位</label>&emsp;
				<el-button size="small" class="{'choosed':unit==0}" @click="chooseUnit(0)">元</el-button>
				<el-button size="small" class="{'choosed':unit==10000}" @click="chooseUnit(10000)">万元</el-button>
			</el-col>
		</el-row>
		<el-row v-show="showChart" style="margin :15px auto 20px 0;display:flex;align-items:center">
			<div id="enterpriseOrderChannelCount"></div>
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
		</el-row>
		<el-row v-show="showChart" style="margin :15px auto 20px 0">
			<div id="enterpriseOrderCountchart"></div>
		</el-row>
		<el-row v-show="showChart">
			<el-col :span="24" style="margin :25px auto 20px 0">
				<div id="enterpriseDLBchart"></div>
			</el-col>
		</el-row>

		<el-row v-show="!showChart">
			<el-col :span="24">
				<el-table border :data="listData.list" stripe style="width: 100%">
					<el-table-column prop="order_num" label="订单号" align="center"> </el-table-column>
					<el-table-column prop="order_amount" label="订单金额(元)" align="center"> </el-table-column>
					<el-table-column prop="pay_amount" label="实付金额(元)" align="center"> </el-table-column>
					<el-table-column prop="merchant_discount" label="商家补贴(元)" align="center"> </el-table-column>
					<el-table-column prop="balance_account_time" label="开单时间" align="center"> </el-table-column>
				</el-table>
				<pagination style="float:right;margin:10px 50px" :total="listData.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
			</el-col>
		</el-row>
		<importFile :importFile="{title: '哆啦宝账单上传',label:'上传账单'}" @result="importFileClick" :visible.sync="uploadVisible" @close="uploadVisible=false"></importFile>
	</div>
</template>

<script>
	import echarts from '../../../../node_modules/echarts/dist/echarts.min.js'
	import pagination from '../../../components/common/pagination.vue'
	import moment from 'moment'
	import theme from '../../../assets/js/echarts.theme.js'
	import { formatDate } from '../../../util/index'
	import importFile from '../../../components/common/importFile'
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
			fire2PayKind: function () {
				return this.$store.state.enterprise.selectDfire2PayKind || {}
			}
		},
		components: {
			pagination,
			importFile
		},
		methods: {
			setTimeQuick(n){
				if(n===1){
					
				}else if(n===2){

				}else 
				this.timeQuick=n
			},
			chooseUnit(n){
				this.unit=n
				
			},
			importFileClick(item) {
				if (this.merchant.length > 0 && this.merchant[0].id) {
					this.$store.dispatch('enterprise_saveDLBData', {
						accountId: this.merchant.length > 0 ? this.merchant[0].id : '',
						path: item.path
					}).then((data) => {
						if (data.success) {
							this.$message.success('导入成功')
							this.$store.dispatch('enterprise_getAccountDetail', this.param).then(() => {
								this.listData = JSON.parse(JSON.stringify(this.dataList))
								this.getTotalData()
								this.getImageData()
							})
						} else {
							this.$message.warning(data.information)
						}
					})
				}
			},
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
								content.push('<span  style="background:' + item.color + ';"  class="echart-dot"></span>' + item.seriesName + '：' + Number.parseInt(item.value[1] || 0))
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
			},
			buildChannelMap() {
				let chart = echarts.init(document.getElementById('enterpriseOrderChannelCount'), 'customed')
				let data = []
				for (let i = 0; i < this.fire2PayKind.length; i++) {
					const element = this.fire2PayKind[i];
					data.push({ name: element.kindPayName, value: parseInt(element.orderCount) || 0 })
				}
				let option = {
					title: {
						text: '订单付款方式',
						left: 'center',
						top: 20,
						textStyle: {
							color: '#111'
						}
					},

					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					series: [
						{
							name: '支付渠道',
							type: 'pie',
							radius: '60%',
							center: ['50%', '50%'],
							data: data.sort(function (a, b) { return b.value - a.value; }),
							label: {
								normal: {
									textStyle: {
										color: 'rgba(11, 11, 11, 0.7)'
									}
								}
							},
							labelLine: {
								normal: {
									lineStyle: {
										color: 'rgba(11, 11,11, 0.7)'
									},
									smooth: 0.2,
									length: 10,
									length2: 20
								}
							},
							animationType: 'scale',
							animationEasing: 'elasticOut',
							animationDelay: function (idx) {
								return Math.random() * 200;
							}
						}
					]
				};
				chart.setOption(option)
			}
		},
		beforeMount() {
			window.moment=moment
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

			this.$store.dispatch('selectDfire2PayKind', {
				enterpriseId: '02b2cb2a-a22f-47a8-a992-aac6a6edee6f',
				beginTime: '2018-01-28 00:00:00',
				endTime: '2018-01-28 00:00:00'
			}).then(() => {
				this.buildChannelMap()
			})
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
				showChart: true,
				isUpload: false,
				uploadVisible: false,
				unit:1,
				timeQuick:1
			}
		}
	}

</script>

<style scoped>
	#enterpriseFunflowDLB .choosed{
		background: #06ccb6;
		color: white;
	}
	#enterpriseDLBchart,
	#enterpriseOrderCountchart {
		width: 100%;
		height: 400px;
	}

	#enterpriseOrderChannelCount {
		float: left;
		width: 400px;
		height: 400px;
	}

	.enterpriseTotalData {
		float: left;
		margin: auto auto;
		line-height: 1.2em;
		vertical-align: middle;
	}

	.enterpriseTotalData td,
	th {
		height: 30px;
		width: 160px;
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