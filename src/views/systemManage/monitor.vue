<style>
	#monitor .search-info {
		width: 100%;
		padding: 30px 50px;

	}

	#monitor .content-box {
		width: 100%;
		border-top: 1px solid #ccc;
		padding: 50px;
	}

	#monitor .echart {
		margin-top: 50px;
		width: 100%;
		height: 400px;
	}
</style>
<template>
	<div id="monitor">
		<div class="search-info">
			<label for="">选择主机ip:&emsp;</label>
			<el-select @change="ipChange" v-model="ipAddr" placeholder="选择主机ip">
				<el-option v-for="(item,index) in ipList" :key="index" :label="item" :value="item">
				</el-option>
			</el-select>
			<span style="margin-left:50px;">
				<el-date-picker :clearable="true" v-model="startTime" align="right" :editable="false" type="datetime" @change="startChange"
				 placeholder="选择开始日期"></el-date-picker>
				至
				<el-date-picker :clearable="true" v-model="endTime" align="right" :editable="false" type="datetime" @change="endChange" placeholder="选择结束日期"></el-date-picker>
			</span>
		</div>
		<div class="content-box">
			<div class="echart" style="margin-top:0;" id="echartsOne"></div>
			<div class="echart" id="echartsMem"></div>
			<div class="echart" id="echartsDisk"></div>
			<div class="echart" id="echartsNet"></div>
		</div>
	</div>
</template>
<script>
import echarts from '../../../node_modules/echarts/dist/echarts.min.js'
import theme from '../../assets/js/echarts.theme.js'
import { formateDate } from '../../util/index'
theme(echarts)


export default {
	beforeMount() {
		// TODO
		const end = new Date('2017-01-16 00:00:00')
		const start = new Date()
		start.setTime(end.getTime() - 3600 * 1000 * 24)
		this.startTime = start
		this.endTime = end
		this.$store.dispatch('showServiceIp').then((data) => {
			this.ipList = data
			this.ipAddr = data[0] || ''
			this.param = {
				ipAddr: this.ipAddr,
				startTime: formateDate(start, 'yyyy-MM-dd HH:mm:ss'),
				endTime: formateDate(end, 'yyyy-MM-dd HH:mm:ss')
			}
			this.ready = true
			this.getInfo()
		})

	},
	data() {
		return {
			ready: false,
			ipList: [],
			startTime: '',
			endTime: '',
			ipAddr: '',
			param: {},
			imageData: {}

		}
	},
	methods: {
		buildEcharts() {
			this.buildEchartsOne()
			this.buildEchartsMem()
			this.buildEchartsDisk()
			this.buildEchartsNet()
		},
		buildEchartsNet() {
			let echartsNet = echarts.init(document.getElementById('echartsNet'), 'roma')
			let echartsNetOption = {
				title: { text: '网络情况', x: 'center' },
				tooltip: {
					trigger: 'axis', formatter: function (params) {
						let content = []
						for (let i = 0; i < params.length; i++) {
							const item = params[i]
							if (item.seriesName != '当前宽带使用率') {
								content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + item.seriesName + '：' + Number((item.value[1] / 8).toFixed(4)) + 'Mb/s')
							} else {
								content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + item.seriesName + '：' + Number((item.value[1] * 100).toFixed(5)) + '%')
							}
						}
						return content.join('</br>')
					}
				},
				legend: { data: ['当前网口速率', '当前宽带使用率'], top: -90, padding: 120 },
				yAxis: [
					{
						name: '大小', nameLocation: 'end', axisLabel: {
							formatter: function (value) {
								return Number((value / 8).toFixed(2)) + 'Mb/s'
							}
						}
					},
					{
						name: '使用率', nameLocation: 'end', position: 'right', axisLabel: {
							formatter: function (value) {
								return Number((value * 100).toFixed(5)) + '%'
							}
						}
					},
				],
				xAxis: [
					{
						type: 'time', position: 'bottom', axisPointer: {
							label: {
								formatter: function (params) {
									return formateDate(new Date(params.value), 'yyyy-MM-dd HH:mm:ss')
								}
							}
						}
					}
				],
				series: [
					{
						name: '当前网口速率', type: 'line',
						symbolSize: 2,
						data: this.imageData.curRate,

					}, {
						name: '当前宽带使用率', type: 'line',
						symbolSize: 2,
						yAxisIndex: 1,
						data: this.imageData.netUsage,
					}],
				dataZoom: [{
					show: true,
					realtime: true,
					startValue: this.param.endTime ? new Date(this.param.endTime).getTime() - 1000 * 60 * 60 : new Date().getTime() - 1000 * 60 * 60,
					endValue: this.param.endTime ? new Date(this.param.endTime).getTime() : new Date().getTime()
				}]
			}
			echartsNet.setOption(echartsNetOption)
		},
		buildEchartsDisk() {
			let echartsDisk = echarts.init(document.getElementById('echartsDisk'), 'roma')
			let echartsDiskOption = {
				title: { text: '磁盘情况', x: 'center' },
				tooltip: {
					trigger: 'axis', formatter: function (params) {
						let content = []
						for (let i = 0; i < params.length; i++) {
							const item = params[i]
							if (item.seriesName != '磁盘使用率') {
								content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + item.seriesName + '：' + Number((item.value[1] / 1024 / 1024).toFixed(2)) + 'Gb')
							} else {
								content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + item.seriesName + '：' + Number((item.value[1] * 100).toFixed(5)) + '%')
							}
						}
						return content.join('</br>')
					}
				},
				legend: { data: ['磁盘已用', '磁盘可用', '磁盘使用率'], top: -90, padding: 120 },
				yAxis: [
					{
						name: '大小', nameLocation: 'end', axisLabel: {
							formatter: function (value) {
								return Number((value / 1024 / 1024).toFixed(2)) + 'Gb'
							}
						}
					},
					{
						name: '使用率', nameLocation: 'end', position: 'right', axisLabel: {
							formatter: function (value) {
								return Number((value * 100).toFixed(5)) + '%'
							}
						}
					},
				],
				xAxis: [
					{
						type: 'time', position: 'bottom', axisPointer: {
							label: {
								formatter: function (params) {
									return formateDate(new Date(params.value), 'yyyy-MM-dd HH:mm:ss')
								}
							}
						}
					}
				],
				series: [
					{
						name: '磁盘已用', type: 'line',
						symbolSize: 1,
						data: this.imageData.diskUsed,

					}, {
						name: '磁盘可用', type: 'line',
						symbolSize: 1,
						data: this.imageData.diskAvailable,
					}, {
						yAxisIndex: 1,
						name: '磁盘使用率', type: 'line',
						symbolSize: 1,
						smooth: true,
						data: this.imageData.disk,
					}],
				dataZoom: [{
					show: true,
					realtime: true,
					startValue: this.param.endTime ? new Date(this.param.endTime).getTime() - 1000 * 60 * 60 : new Date().getTime() - 1000 * 60 * 60,
					endValue: this.param.endTime ? new Date(this.param.endTime).getTime() : new Date().getTime()
				}]
			}
			echartsDisk.setOption(echartsDiskOption)
		},
		buildEchartsMem() {
			let echartsMem = echarts.init(document.getElementById('echartsMem'), 'roma')
			let echartsMemOption = {
				title: { text: '内存情况', x: 'center' },
				tooltip: {
					trigger: 'axis', formatter: function (params) {
						let content = []
						for (let i = 0; i < params.length; i++) {
							const item = params[i]
							if (item.seriesName != '内存使用率') {
								content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + item.seriesName + '：' + Number((item.value[1] / 1024 / 1024).toFixed(2)) + 'Gb')
							} else {
								content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + item.seriesName + '：' + Number((item.value[1] * 100).toFixed(5)) + '%')
							}
						}
						return content.join('</br>')
					}
				},
				legend: { data: ['总内存', '空闲内存', '内存使用率'], top: -90, padding: 120 },
				yAxis: [
					{
						name: '大小', nameLocation: 'end', axisLabel: {
							formatter: function (value) {
								return Number((value / 1024 / 1024).toFixed(2)) + 'Gb'
							}
						}
					},
					{
						name: '使用率', nameLocation: 'end', position: 'right', axisLabel: {
							formatter: function (value) {
								return Number((value * 100).toFixed(5)) + '%'
							}
						}
					},
				],
				xAxis: [
					{
						type: 'time', position: 'bottom', axisPointer: {
							label: {
								formatter: function (params) {
									return formateDate(new Date(params.value), 'yyyy-MM-dd HH:mm:ss')
								}
							}
						}
					}
				],
				series: [
					{
						name: '总内存', type: 'line',
						symbolSize: 1,
						data: this.imageData.totalMem,

					}, {
						name: '空闲内存', type: 'line',
						symbolSize: 1,
						data: this.imageData.freeMem,
					}, {
						yAxisIndex: 1,
						name: '内存使用率', type: 'line',
						symbolSize: 1,
						smooth: true,
						data: this.imageData.mem,
					}
				],
				dataZoom: [{
					show: true,
					realtime: true,
					startValue: this.param.endTime ? new Date(this.param.endTime).getTime() - 1000 * 60 * 60 : new Date().getTime() - 1000 * 60 * 60,
					endValue: this.param.endTime ? new Date(this.param.endTime).getTime() : new Date().getTime()
				}]
			}
			echartsMem.setOption(echartsMemOption)
		},
		buildEchartsOne() {
			let Ratio = echarts.init(document.getElementById('echartsOne'), 'walden')
			let RatioOption = {
				title: { text: 'cpu内存磁盘网络使用率概况', x: 'center' },
				tooltip: {
					trigger: 'axis', formatter: function (params) {
						let content = []
						for (let i = 0; i < params.length; i++) {
							const item = params[i]
							content.push('<span style="background:' + item.color + ';" class="echart-dot"></span>' + item.seriesName + '：' + Number((item.value[1] * 100).toFixed(5)) + '%')
						}
						return content.join('</br>')
					}
				},
				legend: { data: ['cpu', '内存', '磁盘'], top: -90, padding: 120 },
				xAxis: [
					{
						type: 'time', position: 'bottom', axisPointer: {
							label: {
								formatter: function (params) {
									return formateDate(new Date(params.value), 'yyyy-MM-dd HH:mm:ss')
								}
							}
						}
					}
				],
				yAxis: [
					{
						name: '使用率', nameLocation: 'end', gridIndex: 0, axisLabel: {
							formatter: function (value) {
								return Number((value * 100).toFixed(5)) + '%'
							}
						}
					},
				],
				series: [{
					name: 'cpu', type: 'line',
					symbolSize: 1,
					smooth: true,
					data: this.imageData.cpu,

				},
				{
					name: '内存', type: 'line',
					symbolSize: 1,
					smooth: true,
					data: this.imageData.mem,
				},
				{
					name: '磁盘', type: 'line',
					symbolSize: 1,
					smooth: true,
					data: this.imageData.disk,

				}
				],
				dataZoom: [{
					show: true,
					realtime: true,
					startValue: this.param.endTime ? new Date(this.param.endTime).getTime() - 1000 * 60 * 60 : new Date().getTime() - 1000 * 60 * 60,
					endValue: this.param.endTime ? new Date(this.param.endTime).getTime() : new Date().getTime()
				}]
			}
			Ratio.setOption(RatioOption)
		},
		startChange(start) {
			this.param.startTime = start
			this.getInfo()
		},
		endChange(end) {
			this.param.endTime = end
			this.getInfo()
		},
		ipChange(ip) {
			this.param.ipAddr = ip
			this.getInfo()
		},
		getInfo() {
			if (!this.ready) {
				return
			}
			this.$store.dispatch('showServiceInfoByIp', this.param).then((data) => {
				let cpu = [], disk = [], mem = [], totalMem = [], freeMem = [], diskAvailable = [], diskUsed = [], curRate = [], netUsage = []
				for (let i = 0; i < data.length; i++) {
					let item = data[i]
					cpu.push([new Date(item.time).getTime(), item.cpuUsage])
					disk.push([new Date(item.time).getTime(), item.diskRatio])
					mem.push([new Date(item.time).getTime(), Number(parseFloat(item.memUsage).toFixed(7))])
					totalMem.push([new Date(item.time).getTime(), item.totalMem])
					freeMem.push([new Date(item.time).getTime(), item.freeMem])
					diskAvailable.push([new Date(item.time).getTime(), item.diskAvailable])
					diskUsed.push([new Date(item.time).getTime(), item.diskUsed])
					curRate.push([new Date(item.time).getTime(), item.curRate])
					netUsage.push([new Date(item.time).getTime(), item.netUsage])
				}
				this.imageData = { cpu, disk, mem, freeMem, totalMem, diskAvailable, diskUsed, curRate, netUsage }
				this.buildEcharts()
			})
		}
	}
}
</script>