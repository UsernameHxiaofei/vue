

/**
  * 本方法仅在/api-for-server文件中调用，传入协议发送端
  * 
  * @param sc 协议发送端
  */
module.exports=function server(sc,passport){

	return {
		enterpqweqweInfo:(param)=>{
			const stuff = sc.instanceRequest('EnterpriseTask', 'selectEnterpriseById', 'enterpriseManger')
			stuff.auxiliary = {[passport]: param.session.passport}
			stuff.items = [param.id]
			return sc.send(stuff).then((resp)=>{
				return resp.object
			})
		}
	}
}
