/**
   * 本方法仅在/backend/process文件中调用，传入外部环境参数
   * 
   * @param router node路由器
   * @param sc 协议发送端
   */
const multer = require('multer')
module.exports = function client(router, sc, passport) {
	router.all('/customer_getList', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerInfoTask', 'selectCustomerInfo', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.category,param.beginTime,param.endTime,param.status, param.certifi, param.keyword, param.pageNum, param.pageSize]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	router.all('/expertAudit_getList', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerInfoTask', 'selectCustomerExpertAuditInfo', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.keyword, param.pageNum, param.pageSize]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	router.all('/expertAudit_adopt', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ExpertCertificationTask', 'verificationLeadExpert', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	router.all('/expertAudit_refuse', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ExpertCertificationTask', 'verificationLeadExpertNo', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.actorId,param.rejection]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	
	router.all('/leadAudit_adopt', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('IndividualLeadInvestorTask', 'verificationleadInvestor', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	router.all('/leadAudit_refuse', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('IndividualLeadInvestorTask', 'verificationLeadInvestorNo', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.actorId,param.rejection]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	router.all('/customer_statistics', function (req, res) {
		const stuff = sc.instanceRequest('CustomerCountTask', 'selectCustomerCount', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	router.all('/customerIndividualInfoByActorId', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerIndividualInfoTask', 'selectCustomerIndividualInfoByActorId', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	router.all('/customerInfoByActorId', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorTask', 'selectActorById', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	//合格投资人信息获取
	router.all('/investorByActorId', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('InvestorCertificationTask', 'selectInvestorCertificationByActorId', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	router.all('/add_actor', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorTask', 'addActorForWeb', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param]
		sc.send(stuff).then((resp) => {
			res.json(resp)
		})
	})
	router.all('/add_customer', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerIndividualInfoTask', 'createCustomerIndividualInfo', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	router.all('/update_customer', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerIndividualInfoTask', 'updateCustomerIndividualInfo', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//邮政地址查询
	router.all('/postalAddressByActorId', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('PostalAddressTask', 'selectPostalAddressByActorId', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	//新增邮政地址
	router.all('/add_postalAddress', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('PostalAddressTask', 'createPostalAddress', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//修改邮政地址
	router.all('/update_postalAddress', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('PostalAddressTask', 'updatePostalAddress', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//删除邮政地址
	router.all('/delete_postalAddress', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('PostalAddressTask', 'deletePostalAddress', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//登录密码修改
	router.all('/updateLoginPassword', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorTask', 'updateLoginPwById', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.oldPassword,param.password, param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//重置登录密码
	router.all('/resetLoginPwById', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorTask', 'resetLoginPwForWeb', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp)
		})
	})
	//修改手机及email
	router.all('/updateMobileAndEmailById', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('EmailTask', 'updateMobileAndEmailById', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.mobileNumber, param.email, param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//支付密码修改
	router.all('/updatePayPassword', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorTask', 'resetPayPwById', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//实名认证
	router.all('/realNameVaildate', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerExposeTask', 'validateCustomer', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.tel,
			param.customerName,
			param.identNumber,
			param.actorId,
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//行家认证
	router.all('/expertVaildate', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ExpertCertificationTask', 'createExpertCertification', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//行家认证修改（重新申请）
	router.all('/updateExpert', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ExpertCertificationTask', 'updateExpertCertification', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.expertObject,
			param.actorId
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//个人领投认证
	router.all('/personalLeadVaildate', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('IndividualLeadInvestorTask', 'createIndividualLeadInvestor', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.actorId,
			param.leadObject,
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//修改个人领投认证
	router.all('/updatePersonalLead', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('IndividualLeadInvestorTask', 'changeToIndividualLeadInvestor', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.actorId,
			param.leadObject,
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//机构领投认证
	router.all('/organizationLeadVaildate', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('InstitutionLeadInvestorTask', 'createInstitutionLeadInvestor', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.actorId,
			param.leadObject,
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//修改机构领投认证
	router.all('/updateOrganizationLead', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('InstitutionLeadInvestorTask', 'changeToInstitutionLeadInvestor', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.actorId,
			param.leadObject,
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//合格投资人认证
	router.all('/investorVaildate', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('InvestorCertificationTask', 'createInvestorCertification', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//行家信息by actorId
	router.all('/expertByActorId', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ExpertCertificationTask', 'selectExpertCertificationByActorId', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.id
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	//个人领投的信息byActorId
	router.all('/leadByActorId', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('LeadInvestorCertificationTask', 'selectLeadInvestorAllInfoByActorId', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.id
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	//上传图片
	router.all('/image_uploadByFile', multer().single('file'), function (req, res) {
		let param = req.body
		//从左到右分别是接口名，方法标志，部件码
		const stuff = sc.instanceRequest('FileManage', 'fileUpload', 'fileManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		// 请求参数以数组形式传递 按照接口规定顺序传递，只需要按照规定顺序传入就好。不用传字段名。
		stuff.items = [param.fileName, param.fileType,'N']
		stuff.essences = [sc.instanceEssence(null, req.file.buffer)]
		sc.send(stuff).then((resp) => { res.json(resp.object) })
	})
	//获取问券
	router.all('/getQuestionnaire',function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('QuestionnaireTask', 'selectQuestionnaireByActorId', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => { res.json(resp.object) })
	})
	//员工头像查询
	router.all('/cusHeadPortrait',function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerIndividualInfoTask', 'cusHeadPortrait', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id]
		sc.send(stuff).then((resp) => { res.json(resp.object) })
	})
	//员工头像修改
	router.all('/alterHeadPortrait',function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerIndividualInfoTask', 'alterHeadPortrait', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.id,param.url]
		sc.send(stuff).then((resp) => { res.json(resp.object) })
	})
	//企业变更审核列表
	router.all('/enterperiseAuditList', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorAuditeTask', 'selectPageActorAuditeForEnter', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.status,
			param.keyword,
			param.pageNum,
			param.pageSize
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	//查询变更审核详情
	router.all('/selectActorAuditeById', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorAuditeTask', 'selectActorAuditeById', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.id
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	//人员变更审核状态
	router.all('/updateActorAuditeStatus', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorAuditeTask', 'updateActorAuditeStatus', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.id,
			param.status,
			param.rejection
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//会员变更审核实名认证
	router.all('/verifyIdcardForAudite', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('VerifyTask', 'verifyIdcardForAudite', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.name,
			param.identNumber,
			param.mobileNumber,
			param.id
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//会员头像变更
	router.all('/customer_updateHeadFigureURL', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerIndividualInfoTask', 'updateHeadFigureURL', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.id,
			param.headFigureURL
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.head)
		})
	})
	//查询会员账号变更申请（type:1注册2修改手机号3法人）
	router.all('/auditeWaitByActorId', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorAuditeTask', 'selectActorAuditeWaitByActorId', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			param.type,
			param.id
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	
	//更新企业账户法定代表人信息提交申请
	router.all('/updateActorEnterRepInfo', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorEnterTask', 'updateActorEnterRepInfo', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			{
				addressCode: param.addressCode,
				repName: param.repName,
				repMobile: param.repMobile,
				repIdcard: param.repIdcard,
				actorId: param.actorId
			}
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	//更新企业信息
	router.all('/updateActorEnterBasic', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('ActorEnterTask', 'updateActorEnterBasic', 'securityCenter')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [
			{
				actorId:param.actorId,
				enterShortName:param.enterShortName,
				brief:param.brief,
				investment:param.investment,
				industry:parseInt(param.industry)
			}
		]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	//获取个人领投审核列表
	router.all('/leadAudit_getPersonList', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerInfoTask', 'selectCustomerLeadInvestorAuditInfo', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.keyword, param.pageNum, param.pageSize]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})
	//获取企业审核列表
	router.all('/leadAudit_getEnterpriseList', function (req, res) {
		let param = req.body
		const stuff = sc.instanceRequest('CustomerInfoTask', 'selectInstitutionLeadInvestorAuditInfo', 'customerManage')
		stuff.auxiliary = { [passport]: req.session.passport }
		stuff.items = [param.keyword, param.pageNum, param.pageSize]
		sc.send(stuff).then((resp) => {
			res.json(resp.object)
		})
	})

}
