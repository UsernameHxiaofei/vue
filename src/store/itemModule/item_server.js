/**
   * 本方法仅在/api-for-server文件中调用，传入协议发送端
   * 
   * @param sc 协议发送端
   */
module.exports=function server(sc,passport){
	return {
		item_getHeadData:(param)=>{
			const req = sc.instanceRequest('ProjectManageTask', 'seletProjectManageTaskTatol', 'projectManage')
			req.items = []
			req.auxiliary = {
				[passport]: param.passport
			}
			return sc.send(req).then((resp)=>{
				return resp.object
			})
		},
		item_getManageList:(param)=>{
			const req = sc.instanceRequest('FinancingProjectInfoTask', 'selectFinancingProjectInfo', 'projectManage')
			req.auxiliary = {
				[passport]: param.passport
			}
			req.items = [
				'',
				'',
				'',
				'',
				1,
				10,
				0
			]
			return sc.send(req).then((resp)=>{
				return resp.object
			})
		},
	}
}
