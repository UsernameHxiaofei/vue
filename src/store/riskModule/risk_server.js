/**
   * 本方法仅在/api-for-server文件中调用，传入协议发送端
   * 
   * @param sc 协议发送端
   */
module.exports=function server(sc,passport){
	return {
		risk_getList:(param)=>{
			const req = sc.instanceRequest('RiskTask', 'selectRiskProjectList', 'riskManage')
			req.items = [null,'','','',1,10]
			req.auxiliary = {[passport]: param.passport}
			return sc.send(req).then((resp)=>{
				return resp.object
			})
		}
	}
}
