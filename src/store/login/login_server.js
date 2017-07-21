 /**
   * 本方法仅在/api-for-server文件中调用，传入协议发送端
   * 
   * @param sc 协议发送端
   */
module.exports=function server(sc,passport){
    return {
      login_getUser:(session)=>{
        const stuff = sc.instanceRequest("LoginTask", "selectActorByPassport", "securityCenter");
        stuff.auxiliary = {[passport]: session.passport};
        stuff.items = [session.passport];
        return sc.send(stuff).then((resp)=>{
            return resp.object
        });
      },
      login_check:(session)=>{
        const stuff = sc.instanceRequest("LoginTask", "isLogin", "securityCenter");//从左到右分别是接口名，方法标志，部件码
        stuff.items = [session.passport];//请求参数以数组形式传递 按照接口规定顺序传递，只需要按照规定顺序传入就好。不用传字段名。
        return sc.send(stuff).then((resp) => {
               return resp.head;
        });
      }

    }
  }
