 /**
   * 本方法仅在/api-for-server文件中调用，传入协议发送端
   * 
   * @param sc 协议发送端
   */
module.exports=function server(sc){
    return {
      money_getList:(param)=>{
        console.log(JSON.stringify(param)+'=>server data')
        console.log('run in the server');
        const req = sc.instanceRequest("LinktouTask", "takeActor", "securityCenter");
        req.items = ["12356485489",null];
        return sc.send(req).then((resp)=>{
            return resp.object
        });
      }
    }
  }
