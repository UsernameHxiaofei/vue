/**
   * 本方法仅在/backend/process文件中调用，传入外部环境参数
   * 
   * @param router node路由器
   * @param sc 协议发送端
   */
  module.exports=function client(router,sc,passport){
	
	//增加投后项目
	router.all('/addAtiProjectInfo', function (req, res) {
		let param=req.body
		const stuff = sc.instanceRequest('AtiProjectInfoTask', 'addAtiProjectInfo', 'projectManage')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.summary,
			parseInt(param.industry)||0,
			param.regionCode,
			param.businessArea,
			param.totalInvestAmount,
			param.imgUrl,
			param.enterpriseName,
			param.creditCode
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	//投后项目列表
	router.all('/showAtiProjectInfoList', function (req, res) {
		let param=req.body
		const stuff = sc.instanceRequest('AtiProjectInfoTask', 'showAtiProjectInfoList', 'projectManage')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			parseInt(param.industry)||null,
			param.regionCode,
			param.keyWord,
			parseInt(param.pageStart),
			parseInt(param.limit)
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	//投后项目详情
	router.all('/AtiProjectInfoGet', function (req, res) {
		let param=req.body
		const stuff = sc.instanceRequest('AtiProjectInfoTask', 'AtiProjectInfoGet', 'projectManage')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.id
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	//添加新建权益人
	router.all('/addProjectRightsInfo', function (req, res) {
		let param=req.body
		const stuff = sc.instanceRequest('ProjectRightsInfoTask', 'addProjectRightsInfo', 'projectManage')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.imgUrl,
			param.cardNo,
			param.mobileNo,
			param.projectId,
			Number(param.rightsRatio),
			parseInt(param.projectRole)
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	//选择已有会员添加权益人
	router.all('/addProjectRightsInfoExestis', function (req, res) {
		let param=req.body
		const stuff = sc.instanceRequest('ProjectRightsInfoTask', 'addProjectRightsInfoExestis', 'projectManage')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.actorId,
			param.projectId,
			Number(param.rightsRatio),
			parseInt(param.projectRole)
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	//获取权益人列表
	router.all('/ProjectRightsInfoGets', function (req, res) {
		let param=req.body
		const stuff = sc.instanceRequest('ProjectRightsInfoTask', 'ProjectRightsInfoForShow', 'projectManage')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.projectId
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	//删除权益人
	router.all('/ProjectRightsInfoDelete', function (req, res) {
		let param=req.body
		const stuff = sc.instanceRequest('ProjectRightsInfoTask', 'ProjectRightsInfoDelete', 'projectManage')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.id
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	//修改权益人信息
	router.all('/ProjectRightsInfoUpdate', function (req, res) {
		let param=req.body
		const stuff = sc.instanceRequest('ProjectRightsInfoTask', 'ProjectRightsInfoUpdate', 'projectManage')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.rightsRatio,
			param.projectRole,
			param.id,
			param.projectId
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
}