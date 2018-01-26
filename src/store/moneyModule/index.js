import { api } from 'api'

export default {
	state: {
		investmentFundData: {},//投资款管理页面数据展示
		investGetHeadInfo: {},//投资款头部统计信息
		subscriptionData: {},//投资款管理画面-查询认投交易流水

		topupByCondition: {},//充值记录查询列表
		transactionStatus: [],//充值记录状态
		topupStatResult: {},//充值记录头部信息

		moneySelectData: [],

		headBrokerageFeeData: {},//居间费头部信息
		brokerageFeeList: {},//居间费管理查询列表
		isCollection: '',//居间费-催收
		shareProfit: '',//居间费-行家分润        

		moneyPromiseList: {},//保证金管理页面数据展示
		moneyGetHeadInfo: {},//保证金头部统计信息
		bailRefund:{},//保证金详情-退款
		leaderCollect:{},//保证金管理-查看详情-领投催收
		itemCollect:{},//保证金管理-查看详情-项目方催收      

		rateGetList: {},//费率设置查询列表
		idFundRule: {},//按所属ID查询资金规则
		overallFundRule: {},//查询全局资金规则
		modifyFundRule: {},//新增或修改资金规则

		getCapitalInjectionList: {},//查询每个项目的注资信息
		getCapitalInjectionDetail: {},//查询某个项目的具体注资交易流水
		refuseCapitalInjection: {},//注资-拒绝
		agreeCapitalInjection: {},//注资-通过
		renewCapitalInjection: {},//注资-重新申请

		drawbackHeadInfo:{},//退款审批-头部信息
		drawbackGetList:{},//退款审批-查询列表
		marginApprovalGetList:{},//保证金审批-查询列表
		passOperate:{},//退款审批、保证金审批-通过
		failOperate:{},//退款审批、保证金审批-拒绝

		investedServiceFeeList:{},//投后融资服务费项目列表
		investedServiceFeeHeadData:{},//投后融资服务费管理头信息
		shareProfitHis:{},//项目投后服务管理列表
		selectLeadShareProfit:{}
	},
	actions: {
		share_profit({ commit }, param) {
			return api.share_profit(param).then((data) => {
				commit('setShareProfit', data)
			})
		},
		leader_collect({ commit }, param) {
			return api.leader_collect(param).then((data) => {
				commit('setLeaderCollect', data)
			})
		},
		item_collect({ commit }, param) {
			return api.item_collect(param).then((data) => {
				commit('setItemCollect', data)
			})
		},
		pass_operate({ commit }, param) {
			return api.pass_operate(param).then((data) => {
				commit('setPassOperate', data)
			})
		},
		fail_operate({ commit }, param) {
			return api.fail_operate(param).then((data) => {
				commit('setFailOperate', data)
			})
		},
		margin_approvalGetList({ commit }, param) {
			return api.margin_approvalGetList(param).then((data) => {
				commit('setMarginApprovalGetList', data)
			})
		},
		drawback_headInfo({ commit }, param) {
			return api.drawback_headInfo(param).then((data) => {
				commit('setDrawbackHeadInfo', data)
			})
		},
		drawback_getList({ commit }, param) {
			return api.drawback_getList(param).then((data) => {
				commit('setDrawbackGetList', data)
			})
		},
		bail_refund({ commit }, param) {
			return api.bail_refund(param).then((data) => {
				commit('setBailRefund', data)
			})
		},
		refuse_capitalInjection({ commit }, param) {
			return api.refuse_capitalInjection(param).then((data) => {
				commit('setRefuse', data)
			})
		},
		agree_capitalInjection({ commit }, param) {
			return api.agree_capitalInjection(param).then((data) => {
				commit('setAgree', data)
			})
		},
		renew_capitalInjection({ commit }, param) {
			return api.renew_capitalInjection(param).then((data) => {
				commit('setRenew', data)
			})
		},
		investmentFund_getList({ commit }, param) {
			return api.investmentFund_getList(param).then((data) => {
				commit('money_setList', data)
			})
		},
		invest_getHeadInfo({ commit }) {
			return api.invest_getHeadInfo().then((data) => {
				commit('money_setinvestHeadInfo', data)
			})
		},
		moneySelect_getData({ commit }, param) {
			return api.moneySelect_getData(param).then((data) => {
				commit('moneySelect_setData', data)
			})
		},
		find_topupByCondition({ commit }, param) {
			return api.find_topupByCondition(param).then((data) => {
				commit('find_topup', data)
			})
		},
		getAll_transactionStatus({ commit }, param) {
			return api.getAll_transactionStatus(param).then((data) => {
				commit('getAll_status', data)
			})
		},
		get_topupStatResult({ commit }, param) {
			return api.get_topupStatResult(param).then((data) => {
				commit('getAll_result', data)
			})
		},
		getSubscription({ commit }, param) {
			return api.getSubscription(param).then((data) => {
				commit('setSubscription', data)
			})
		},
		getHeadBrokerageFee({ commit }, param) {
			return api.getHeadBrokerageFee(param).then((data) => {
				commit('setHeadBrokerageFee', data)
			})
		},
		getBrokerageFeeList({ commit }, param) {
			return api.getBrokerageFeeList(param).then((data) => {
				commit('setBrokerageFeeList', data)
			})
		},
		is_collection({ commit }, param) {
			return api.is_collection(param).then((data) => {
				commit('setIsCollection', data)
			})
		},

		money_promiseList({ commit }, param) {
			return api.money_promiseList(param).then((data) => {
				commit('setPromise', data)
			})
		},
		money_getHeadInfo({ commit }, param) {
			return api.money_getHeadInfo(param).then((data) => {
				commit('setgetHeadInfo', data)
			})
		},
		rate_getList({ commit }, param) {
			return api.rate_getList(param).then((data) => {
				commit('setRateGetList', data)
			})
		},
		id_fundRule({ commit }, param) {
			return api.id_fundRule(param).then((data) => {
				commit('setIdFundRule', data)
			})
		},
		//查看费率  阶段之后查看费率
		id_fundRule2({ commit }, param) {
			return api.id_fundRule2(param).then((data) => {
				commit('setIdFundRule', data)
			})
		},
		overall_fundRule({ commit }, param) {
			return api.overall_fundRule(param).then((data) => {
				commit('setOverallFundRule', data)
			})
		},
		modify_fundRule({ commit }, param) {
			return api.modify_fundRule(param).then((data) => {
				commit('setModifyFundRule', data)
			})
		},
		get_capitalInjectionList({ commit }, param) {
			return api.get_capitalInjectionList(param).then((data) => {
				commit('setCapitalInjectionList', data)
			})
		},
		get_capitalInjectionDetail({ commit }, param) {
			return api.get_capitalInjectionDetail(param).then((data) => {
				commit('setCapitalInjectionDetail', data)
			})
		},
		selectProjectNotIncludeAll({commit},param) {
			return api.selectProjectNotIncludeAll(param).then((data) => {
				commit('selectProjectNotIncludeAll', data)
			})
		},
		LeadShareProfitHead({commit},param){
			return api.LeadShareProfitHead(param).then((data) => {
				commit('LeadShareProfitHead', data)
			})
		},
		ShareProfitHis({commit},param){
			return api.ShareProfitHis(param).then((data) => {
				commit('ShareProfitHis', data)
			})
		},
		selectLeadShareProfit({commit},param){
			return api.selectLeadShareProfit(param).then((data) => {
				commit('selectLeadShareProfit',data)
			})
		},
		executeLeadShareProfit(undefined,param){
			return api.executeLeadShareProfit(param)
		}
	}, 
	mutations: {
		selectLeadShareProfit(state,data){
			state.selectLeadShareProfit=data
		},
		ShareProfitHis(state,data){
			state.shareProfitHis=data
		},
		LeadShareProfitHead(state,data){
			state.investedServiceFeeHeadData=data
		},
		selectProjectNotIncludeAll(state,data){
			state.investedServiceFeeList=data
		},
		setShareProfit(state, data) {
			state.shareProfit = data
		},
		setLeaderCollect(state, data) {
			state.leaderCollect = data
		},
		setItemCollect(state, data) {
			state.itemCollect = data
		},
		setPassOperate(state, data) {
			state.passOperate = data
		},
		setFailOperate(state, data) {
			state.failOperate = data
		},
		setMarginApprovalGetList(state, data) {
			state.marginApprovalGetList = data
		},
		setDrawbackHeadInfo(state, data) {
			state.drawbackHeadInfo = data
		},
		setDrawbackGetList(state, data) {
			state.drawbackGetList = data
		},
		setBailRefund(state, data) {
			state.bailRefund = data
		},
		setRefuse(state, data) {
			state.refuseCapitalInjection = data
		},
		setAgree(state, data) {
			state.agreeCapitalInjection = data
		},
		setRenew(state, data) {
			state.renewCapitalInjection = data
		},
		money_setList(state, data) {
			state.investmentFundData = data
		},
		money_setinvestHeadInfo(state, data) {
			state.investGetHeadInfo = data
		},
		find_topup(state, data) {
			state.topupByCondition = data
		},
		moneySelect_setData(state, data) {
			for (let a in data) {
				let obj = {}
				obj.code = a
				obj.name = data[a]
				state.moneySelectData.push(obj)
			}
		},
		getAll_status(state, data) {
			state.transactionStatus.length = 0
			// state.transactionStatus.push({ code: '', name: '全部' });
			for (let a in data) {
				let obj = {}
				obj.code = a
				obj.name = data[a]
				state.transactionStatus.push(obj)
			}
		},
		getAll_result(state, data) {
			state.topupStatResult = data
		},
		setSubscription(state, data) {
			state.subscriptionData = data
		},
		setHeadBrokerageFee(state, data) {
			state.headBrokerageFeeData = data
		},

		setIsCollection(state, data) {
			state.isCollection = data
		},

		setBrokerageFeeList(state, data) {
			state.brokerageFeeList = data
		},

		setPromise(state, data) {
			state.moneyPromiseList = data
		},
		setgetHeadInfo(state, data) {
			state.moneyGetHeadInfo = data
		},
		setRateGetList(state, data) {
			state.rateGetList = data
		},
		setIdFundRule(state, data) {
			state.idFundRule = data
		},
		setOverallFundRule(state, data) {
			state.overallFundRule = data
		},
		setModifyFundRule(state, data) {
			state.modifyFundRule = data
		},
		setCapitalInjectionList(state, data) {
			state.getCapitalInjectionList = data
		},

		setCapitalInjectionDetail(state, data) {
			state.getCapitalInjectionDetail = data
		},
	}
}