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