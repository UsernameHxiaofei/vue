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