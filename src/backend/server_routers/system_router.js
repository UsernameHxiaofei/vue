/**
   * 本方法仅在/backend/process文件中调用，传入外部环境参数
   * 
   * @param router node路由器
   * @param sc 协议发送端
   */
module.exports=function client(router,sc,passport){

	////////////账户维护
	router.all('/system_getManageList*', function (req, res) {//查询所有用户列表
		let param=req.body
		const stuff = sc.instanceRequest('ActorTask', 'selectAll', 'securityCenter')//从左到右分别是接口名，方法标志，部件码
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.pageNo,
			param.pageSize
		]//请求参数以数组形式传递 按照接口规定顺序传递，只需要按照规定顺序传入就好。不用传字段名。
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	router.all('/system_roleInfo*', function (req, res) {//查询所有角色有效信息
		const stuff = sc.instanceRequest('RoleTask', 'selectAllValidList', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = []
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	router.all('/system_createUser*', function (req, res) {//超级管理员-创建用户
		let param=req.body
		const stuff = sc.instanceRequest('ActorTask', 'addActorForAdmin', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.mobileNumber,
			param.name,
			param.email,
			param.roles,
			param.loginPassword,
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})
	router.all('/system_updateUser*', function (req, res) {//根据用户ID更新账户信息
		let param=req.body
		const stuff = sc.instanceRequest('ActorTask', 'updateActorById', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.email,
			param.mobileNumber,
			param.roles,
			param.loginPassword,
			param.id,
			param.type
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})
	router.all('/system_closureUser*', function (req, res) {//激活/禁用账号
		let param=req.body
		const stuff = sc.instanceRequest('ActorTask', 'updateStatus', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.status,
			param.rejection,
			param.actorId,
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})

	////////////////角色维护
	router.all('/system_roleList*', function (req, res) {//查询所有角色列表
		let param=req.body
		const stuff = sc.instanceRequest('RoleTask', 'selectAllList', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.pageNo,
			param.pageSize
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	router.all('/system_authRoleList*', function (req, res) {//查询所有泛角色有效列表
		const stuff = sc.instanceRequest('GeneralRoleTask', 'selectAllValidList', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = []
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	router.all('/system_addRoleInfo*', function (req, res) {//添加角色信息
		let param=req.body
		const stuff = sc.instanceRequest('RoleTask', 'createRole', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.generalRoleId,
			''
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})
	router.all('/system_forbidden*', function (req, res) {//激活/禁用账号
		let param=req.body
		const stuff = sc.instanceRequest('RoleTask', 'updateStatus', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.status,
			param.rejection,
			param.id,
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})
	router.all('/system_updateRole*', function (req, res) {//修改角色基本信息
		let param=req.body
		const stuff = sc.instanceRequest('RoleTask', 'updateRole', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.generalRoleId,
			param.id
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})

	////////////泛角色维护
	router.all('/system_panRoleList*', function (req, res) {//查询所有泛角色列表
		let param=req.body
		const stuff = sc.instanceRequest('GeneralRoleTask', 'selectPageList', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.pageNo,
			param.pageSize
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	router.all('/system_addPanRole*', function (req, res) {//添加泛角色
		let param=req.body
		const stuff = sc.instanceRequest('GeneralRoleTask', 'createGeneralRole', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.category 
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})
	router.all('/system_ban*', function (req, res) {//激活/禁用账号
		let param=req.body
		const stuff = sc.instanceRequest('GeneralRoleTask', 'updateStatus', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.status,
			param.id,
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})
	router.all('/system_updatePanRole*', function (req, res) {//更新泛角色信息
		let param=req.body
		const stuff = sc.instanceRequest('GeneralRoleTask', 'updateGeneralRole', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.category,
			param.id,
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})

	//////////////////日志
	router.all('/system_logList*', function (req, res) {//根据时间查询操作日志列表
		let param=req.body
		const stuff = sc.instanceRequest('OperateLogTask', 'selectListByCondition', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.beginTime,
			param.endTime,
			param.operatorName,
			param.componentCode,
			param.inputAndOutData,
			param.pageNo,
			param.pageSize
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})

	//////////////////权限分配
	router.all('/system_getPermissionList*', function (req, res) {//查询角色泛角色权限列表
		const stuff = sc.instanceRequest('RoleTask', 'selectForPrivilege', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = []
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})

	router.all('/system_inquiryList*', function (req, res) {//根据角色id查询拥有的和未拥有的权限
		let param=req.body
		const stuff = sc.instanceRequest('PrivilegeTask', 'selectPrivilegeForOperate', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [param.roleId]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})

	router.all('/system_updatePermissionList*', function (req, res) {//角色配置权限
		let param=req.body
		const stuff = sc.instanceRequest('PrivilegeTask', 'operateRolePrivilege', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.roleId,
			param.forAdd,
			param.forDelete
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})
	router.all('/updateActor*', function (req, res) {//根据用户id更新姓名手机号身份证号
		let param=req.body
		const stuff = sc.instanceRequest('ActorTask', 'updateActorIdentById', 'securityCenter')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.name,
			param.identNumber,
			param.mobileNumber,
			param.id,
		]
		sc.send(stuff).then((resp) =>{res.json(resp.head)})
	})
	router.all('/showServiceIp*', function (req, res) {
		const stuff = sc.instanceRequest('LtSystemInfoTask', 'showServiceIp', 'ltSystemManagement')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = []
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
	router.all('/showServiceInfoByIp*', function (req, res) {
		let param=req.body
		const stuff = sc.instanceRequest('LtSystemInfoTask', 'showServiceInfoByIp', 'ltSystemManagement')
		stuff.auxiliary = {[passport]: req.session.passport}
		stuff.items = [
			param.ipAddr,
			param.startTime,
			param.endTime
		]
		sc.send(stuff).then((resp) =>{res.json(resp.object)})
	})
}
