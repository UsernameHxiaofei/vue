/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
  module.exports=function client(Vue){
    return {
        emp_selectEmployee: (param) => {
          return Vue.http.post('emp_selectEmployee',param).then(response => {
            return response.body;
          });
        },
        updateEmployeeInfo: (param) => {
          return Vue.http.post('updateEmployeeInfo',param).then(response => {
            return response.body;
          });
        }
    } 
}