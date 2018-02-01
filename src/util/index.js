import industryList from '../constant/industry';

//最多保留几位位小数的方法(num初始值，n小数位数默认2，m除以倍数默认1)
export const moneyFormat = function(num,n,m) {
	let tempN = parseInt(n)||2,tempM = parseInt(m)||1
	let temp = parseFloat(num/tempM)
	try {
		if (!temp) {
			return 0
		}
	} catch (error) {
		return 0
	}
	if (temp.toString().indexOf('.') == -1) {
		return temp
	} else {
		if (temp.toString().split('.')[1] && temp.toString().split('.')[1].length <=tempN) {
			return Number(temp)
		}
		return Number(temp.toFixed(tempN))
	}
}

/**
 * 根据地址代码输出select级联框的选项数组
 * @param {*数据库地址代码} addressCode 
 */
export const getSelectArray = function (addressCode) {
	if (!addressCode || addressCode.length != 6) {
		return ['', '', ''];
	}
	addressCode += '';
	let array = [];
	array.push(addressCode.slice(0, 2) + '0000');
	array.push(addressCode.slice(0, 4) + '00');
	array.push(addressCode.slice(0, 6));
	return array;
};
/**
 * 根据行业数组，累加出行业代码。
 * @param {*行业数组} array 
 */
export const getIndustryByArray = function (array) {
	let industryCode = 0;
	let i = 0;
	for (let item in array) {
		if (array.hasOwnProperty(item)) {
			let element = array[item];
			if (element) {
				industryCode += industryList[i].value;
			}
			i++;
		}
	}
	return industryCode;
};

/**
 * 根据行业累加代码，输出行业组合名称
 * @param {*行业数组} array 
 */
export const getIndustryArrayByCode = function (industry) {
	let result = [];
	if (!parseInt(industry)) {
		return result;
	}
	let codes = parseInt(industry).toString(2).split('').reverse();
	for (let index = 0; index < codes.length; index++) {
		let element = codes[index];
		if (element == '1') {
			for (let i = 0; i < industryList.length; i++) {
				let item = industryList[i];
				if (item.value == Math.pow(2, index)) {
					result.push(item.value);
				}
			}
		}
	}
	return result;
};

export const formatDate = function (obj,fmt) {
	if(!obj){
		return '';
	}
	let o = {
		'M+': obj.getMonth() + 1, //月份 
		'd+': obj.getDate(), //日 
		'H+': obj.getHours(), //小时 
		'h+': obj.getHours(), //小时 
		'm+': obj.getMinutes(), //分 
		's+': obj.getSeconds(), //秒 
		'q+': Math.floor((obj.getMonth() + 3) / 3), //季度 
		'S': obj.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		}
	}
	return fmt;
};
