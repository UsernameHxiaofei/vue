import addressData from '../constant/addressData.json'
import industryData from '../constant/industry'
import projectStatusData from '../constant/projectStatus'
import projectPhaseData from '../constant/projectPhase'
import certificateData from '../constant/certification'
import personalData from '../constant/personal'
import investorPersonalData from '../constant/investorPersonal'

import enterpriseData from '../constant/enterprise'
import educations from '../constant/education'
import riskData from '../constant/riskRegion'
import funFlowTypes from '../constant/funFlowType'

export function funFlowType(value){
    let type=parseInt(value)
    if(!type){
        return '';
    }
    try {
        return funFlowTypes[type]
    } catch (error) {
        return '';
    }
}

export function riskRegion(value){
    let name='';
    for (var i = 0; i < riskData.length; i++) {
        var item = riskData[i];
        if(item.id===value){
            name=item.name;
            break;
        }
    }
    if(name==''){
        return '未填写';
    }
    return name;
}

export function education(value) {
    let code = parseInt(value);
    if (!code) {
        return '无学历信息';
    }
    for (var i = 0; i < educations.length; i++) {
        var item = educations[i];
        if (code == item.value) {
            return item.lable;
        }
    }
}

export function industry(value) { //行业代码过滤器
    let label = '';
    if (!parseInt(value)) {
        return '未填写';
    }
    let codes = parseInt(value).toString(2).split('').reverse();
    for (let index = 0; index < codes.length; index++) {
        let element = codes[index];
        if (element == '1') {
            for (let i = 0; i < industryData.length; i++) {
                let item = industryData[i];
                if (item.value == Math.pow(2, index)) {
                    label += item.label + ' ';
                }
            }
        }
    }
    return label;
}

export function address(code) { //区域代码过滤器
    const rootCode = '86';
    code = code + '';
    if (code.length != 6) return '未填写';
    let province = code.slice(0, 2) + '0000';
    if(!addressData[province]){
        return addressData[rootCode][province];
    }
    let state = code.slice(0, 4) + '00';
    let result;
    try {
        result = (addressData[rootCode][province] || '') + (addressData[province][state] || '') + (addressData[state][code] || '');
    } catch (error) {
        return '未识别地区';
    }
    return result;
}

export function addressCondition(code) { //区域代码过滤器
    const rootCode = '86';
    code = code + '';
    if (code.length != 6) return '无限制';
    let province = code.slice(0, 2) + '0000';
    let state = code.slice(0, 4) + '00';
    let result;
    try {
        result = (addressData[rootCode][province] || '') + (addressData[province][state] || '') + (addressData[state][code] || '');
    } catch (error) {
        return '未识别地区';
    }
    return result;
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
    let code = parseInt(value);
    if (!code) {
        return '暂无数据';
    }
    for (let index = 0; index < projectStatusData.length; index++) {
        let element = projectStatusData[index];
        if (element.value == code) {
            return element.label;
        }
    }
}
export function projectPhase(value) { //项目阶段过滤器
    let code = parseInt(value);
    if (!code) {
        return '暂无数据';
    }
    for (let index = 0; index < projectPhaseData.length; index++) {
        let element = projectPhaseData[index];
        if (element.value == code) {
            return element.label;
        }
    }
}
export function certificate(value) { //认证类型
    let code = parseInt(value);
    if (!code) {
        return '未认证';
    }
    for (let index = 0; index < certificateData.length; index++) {
        let element = certificateData[index];
        if (element.value == code) {
            return element.label;
        }
    }
}
export function industryLevel(value) { //个人情况
    let code = parseInt(value);
    if (!code) {
        return '暂无数据';
    }
    for (let index = 0; index < personalData.length; index++) {
        let element = personalData[index];
        if (element.value == code) {
            return element.label;
        }
    }
}
export function industryLevelforInvestor(value) { //个人情况
    let code = parseInt(value);
    if (!code) {
        return '暂无数据';
    }
    for (let index = 0; index < investorPersonalData.length; index++) {
        let element = investorPersonalData[index];
        if (element.value == code) {
            return element.label;
        }
    }
}
export function enterpriseIndustryLevel(value) { //企业情况
    let code = parseInt(value);
    if (!code) {
        return '暂无数据';
    }
    for (let index = 0; index < enterpriseData.length; index++) {
        let element = enterpriseData[index];
        if (element.value == code) {
            return element.label;
        }
    }
}
//日期格式化
export function getNowFormatDate(x) {
    //if(x)
    var date = new Date(x);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    var currentdate = " " + date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + h + seperator2 + m +
        seperator2 + s;

    return currentdate || "";

}
//金额
export function currency(number) {
    number = number || 0;
    var places = !isNaN(places = Math.abs(places)) ? places : 2;
    var symbol = symbol !== undefined ? symbol : "";
    var thousand = thousand || ",";
    var decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}