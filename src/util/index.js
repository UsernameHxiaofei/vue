import industryList from '../constant/industry'
/**
 * 根据地址代码输出select级联框的选项数组
 * @param {*数据库地址代码} addressCode 
 */
export const getSelectArray=function(addressCode){
    if(!addressCode||addressCode.length!=6){
        return ['','',''];
    }
    addressCode+='';
    let array=[];
    array.push(addressCode.slice(0,2)+'0000');
    array.push(addressCode.slice(0,4)+'00');
    array.push(addressCode.slice(0,6));
    return array;
}

export const getIndustryByArray=function(array){
    let industryCode=0;
    let i=0;
    for (let item in array) {
        if (array.hasOwnProperty(item)) {
            let element = array[item];
            if(element){
                industryCode+=industryList[i].value;
            }
            i++;
        }
    }
    return industryCode;
}

export const getIndustryArrayByCode=function(industry){
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
}