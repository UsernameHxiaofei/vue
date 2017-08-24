 /**
   * 本方法仅在/api-for-server文件中调用，传入协议发送端
   * 
   * @param sc 协议发送端
   */
module.exports=function server(sc,passport){
    return {
      customer_getList:(session)=>{
        const stuff = sc.instanceRequest("CustomerCountTask", "selectCustomerCount", "customerManage");
        stuff.auxiliary = {[passport]: session.passport};
        stuff.items = [session.passport];
        return sc.send(stuff).then((resp)=>{
            return resp.object
        });
      }
    }
  }
