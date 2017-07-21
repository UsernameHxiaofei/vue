/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
module.exports=function client(Vue){
    return {
      login_check: () => {
        return Vue.http.post('login_check').then(response => {
          return response.body;
        });
      },
      login_out:() => {
         return Vue.http.post('login_out').then(response => {
          return response.body;
         });
      },
      login_getUser:()=>{
        return Vue.http.post('login_getUser').then(response => {
          return response.body;
         });
      }
    } 
}