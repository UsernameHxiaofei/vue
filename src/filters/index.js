import addressData from '../constant/addressData.json'
import industryData from '../constant/industry'
import projectStatusData from '../constant/projectStatus'
import projectPhaseData from '../constant/projectPhase'
import certificateData from '../constant/certification'
import personalData from '../constant/personal'
import investorPersonalData from '../constant/investorPersonal'
import marriageData from '../constant/marriage'
import enterpriseData from '../constant/enterprise'
import educations from '../constant/education'
import riskData from '../constant/riskRegion'
import riskTypeData from '../constant/riskType'
import tradeTypes from '../constant/tradeTypes'
import channels from '../constant/payChannels'
import actorCategorys from '../constant/actorCategory'
import projectRoles from '../constant/projectRoles'
import shareProfitStatusData from '../constant/shareProfitStatus'
import investedItemStatusData from '../constant/investedItemStatus'
import articleStatusData from '../constant/articleStatus'

//文稿状态
export function articleStatus(value){
	for (let i = 0; i < articleStatusData.length; i++) {
		const item = articleStatusData[i]
		if(item.value==value){
			return item.label
		}
	}
}

//投后项目状态
export function investedItemStatus(value){
	for (let i = 0; i < investedItemStatusData.length; i++) {
		const item = investedItemStatusData[i]
		if(item.value==value){
			return item.label
		}
	}
}

//分红状态
export function shareProfitStatus(value){
	for (let i = 0; i < shareProfitStatusData.length; i++) {
		const item = shareProfitStatusData[i]
		if(item.value==value){
			return item.label
		}
	}
}
//投后项目角色
export function projectRole(value){
	for (let i = 0; i < projectRoles.length; i++) {
		const item = projectRoles[i]
		if(item.value==value){
			return item.label
		}
	}
}
//项目剩余时间
export function getProjectEndTime(x) {
	if (x > 60 * 60 * 24) {
		return Math.ceil(x / (60 * 60 * 24)) + '天'
	} else if (x > 60 * 60) {
		return Math.ceil(x / (60 * 60)) + '小时'
	} else {
		return Math.ceil(x / 60) + '分钟'
	}
}
//账户类型
export function actorCategory(value) {
	for (let i = 0; i < actorCategorys.length; i++) {
		const item = actorCategorys[i]
		if (item.value == value) {
			return item.label
		}
	}
}
//交易类型
export function tradeType(value) {
	for (let i = 0; i < tradeTypes.length; i++) {
		const item = tradeTypes[i]
		if (item.value == value) {
			return item.label
		}
	}
}
//收银收单支付渠道
export function channel(value) {
	for (let i = 0; i < channels.length; i++) {
		const item = channels[i]
		if (item.value == value) {
			return item.label
		}
	}
}
//风险等级
export function riskLv(value) {
	return value === 2 ? '中' : value === 3 ? '高' : '未知'
}
//风险展示类型
export function riskType(value) {
	let name = ''
	for (let i = 0; i < riskTypeData.length; i++) {
		let item = riskTypeData[i]
		if (item.value === value) {
			name = item.name
			break
		}
	}
	if (name == '') {
		return '其他'
	}
	return name

}

//最多保留6位的算万元过滤器
export function moneyFormat(num) {
	try {
		if (!parseFloat(num)) {
			return 0
		}
	} catch (error) {
		return 0
	}
	let temp = parseFloat(num / 10000)
	if (temp.toString().indexOf('.') == -1) {
		return temp
	} else {
		if (temp.toString().split('.')[1] && temp.toString().split('.')[1].length <= 6) {
			return Number(temp)
		}
		return Number(temp.toFixed(6))
	}
}



//婚姻情况
export function marriage(value) {
	let name = ''
	for (let i = 0; i < marriageData.length; i++) {
		let item = marriageData[i]
		if (item.value === value) {
			name = item.label
			break
		}
	}
	if (name == '') {
		return '其他'
	}
	return name

}

export function riskRegion(value) {
	let name = ''
	for (let i = 0; i < riskData.length; i++) {
		let item = riskData[i]
		if (item.id === value) {
			name = item.name
			break
		}
	}
	if (name == '') {
		return '未填写'
	}
	return name
}

export function education(value) {
	let code = parseInt(value)
	if (!code) {
		return '无学历信息'
	}
	for (let i = 0; i < educations.length; i++) {
		let item = educations[i]
		if (code == item.value) {
			return item.lable
		}
	}
}

export function industry(value) { //行业代码过滤器
	let label = ''
	if (!parseInt(value)) {
		return '未填写'
	}
	let codes = parseInt(value).toString(2).split('').reverse()
	for (let index = 0; index < codes.length; index++) {
		let element = codes[index]
		if (element == '1') {
			for (let i = 0; i < industryData.length; i++) {
				let item = industryData[i]
				if (item.value == Math.pow(2, index)) {
					label += item.label + ' '
				}
			}
		}
	}
	return label
}

export function address(code) { //区域代码过滤器
	const rootCode = '86'
	code = code + ''
	if (code.length != 6) return '未填写'
	let province = code.slice(0, 2) + '0000'
	if (!addressData[province]) {
		return addressData[rootCode][province]
	}
	let state = code.slice(0, 4) + '00'
	let result
	try {
		result = (addressData[rootCode][province] || '') + (addressData[province][state] || '') + (addressData[state][code] || '')
	} catch (error) {
		return '未识别地区'
	}
	return result
}

export function addressCondition(code) { //区域代码过滤器
	const rootCode = '86'
	code = code + ''
	if (code.length != 6) return '无限制'
	let province = code.slice(0, 2) + '0000'
	let state = code.slice(0, 4) + '00'
	let result
	try {
		result = (addressData[rootCode][province] || '') + (addressData[province][state] || '') + (addressData[state][code] || '')
	} catch (error) {
		return '未识别地区'
	}
	return result
}


export function host(url) {
	const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
	const parts = host.split('.').slice(-3)
	if (parts[0] === 'www') parts.shift()
	return parts.join('.')
}

export function timeAgo(time) {
	const between = Date.now() / 1000 - Number(time)
	if (between < 3600) {
		return pluralize(~~(between / 60), ' minute')
	} else if (between < 86400) {
		return pluralize(~~(between / 3600), ' hour')
	} else {
		return pluralize(~~(between / 86400), ' day')
	}
}

function pluralize(time, label) {
	if (time === 1) {
		return time + label
	}
	return time + label + 's'
}

export function projectStatus(value) { //项目状态过滤器
	let code = parseInt(value)
	if (!code) {
		return '暂无数据'
	}
	for (let index = 0; index < projectStatusData.length; index++) {
		let element = projectStatusData[index]
		if (element.value == code) {
			return element.label
		}
	}
}
export function projectPhase(value) { //项目阶段过滤器
	let code = parseInt(value)
	if (!code) {
		return '暂无数据'
	}
	for (let index = 0; index < projectPhaseData.length; index++) {
		let element = projectPhaseData[index]
		if (element.value == code) {
			return element.label
		}
	}
}
export function certificate(value) { //认证类型
	let code = parseInt(value)
	if (!code) {
		return '未认证'
	}
	for (let index = 0; index < certificateData.length; index++) {
		let element = certificateData[index]
		if (element.value == code) {
			return element.label
		}
	}
}
export function industryLevel(value) { //个人情况
	let code = parseInt(value)
	if (!code) {
		return '暂无数据'
	}
	for (let index = 0; index < personalData.length; index++) {
		let element = personalData[index]
		if (element.value == code) {
			return element.label
		}
	}
}
export function industryLevelforInvestor(value) { //个人情况
	let code = parseInt(value)
	if (!code) {
		return '暂无数据'
	}
	for (let index = 0; index < investorPersonalData.length; index++) {
		let element = investorPersonalData[index]
		if (element.value == code) {
			return element.label
		}
	}
}
export function enterpriseIndustryLevel(value) { //企业情况
	let code = parseInt(value)
	if (!code) {
		return '暂无数据'
	}
	for (let index = 0; index < enterpriseData.length; index++) {
		let element = enterpriseData[index]
		if (element.value == code) {
			return element.label
		}
	}
}
//日期格式化
export function getNowFormatDate(x) {
	//if(x)
	let date = new Date(x)
	let seperator1 = '-'
	let seperator2 = ':'
	let month = date.getMonth() + 1
	let strDate = date.getDate()
	if (month >= 1 && month <= 9) {
		month = '0' + month
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = '0' + strDate
	}
	let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

	let currentdate = ' ' + date.getFullYear() + seperator1 + month + seperator1 + strDate +
		' ' + h + seperator2 + m +
		seperator2 + s

	return currentdate || ''

}
//金额
export function currency(number) {
	number = number || 0
	let places = !isNaN(places = Math.abs(places)) ? places : 2
	let symbol = symbol !== undefined ? symbol : ''
	let thousand = thousand || ','
	let decimal = decimal || '.'
	let negative = number < 0 ? '-' : '',
		i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '',
		j = (j = i.length) > 3 ? j % 3 : 0
	return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}