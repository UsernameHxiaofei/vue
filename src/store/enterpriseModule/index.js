import { api } from 'api'


export const enterpriseModule = {
	state: {
		enterpriseManageList: [], //融资企业管理列表
		enterpriseInfo:{}, //融资企业详情
		enterpriseMember:[], //融资企业团队
		enterpriseAccountDetail:[],  //融资企业资金流查看列表
		enterpriseAccountDetailDBL:{},//哆啦宝企业资金流查看列表
		profit:[],   //利润表
		cash:[],    //现金流量表
		debt:[],      //资产负债表
		coreFinance:[], //核心财务指标
		sf:{},   //综合
		statementBrief:{},
		listDayAmount:{},//每日流水数据
		items:[]//融资企业项目信息
	},
	actions: {
		enterprise_getManageList({ commit },param) {
			return api.enterprise_getManageList(param).then((data) => {
				commit('enterprise_setManageList',data)
			})
		},
		enterprise_getInfo({ commit },param){
			return  api.enterprise_getInfo(param).then((data) => {
				commit('enterprise_setInfo',data)
			})
		},
		enterprise_getMemberInfo({ commit },param){
			return api.enterprise_getMemberInfo(param).then((data) => {
				commit('enterprise_setMemberInfo',data)
			})
		},
		enterprise_getAccountDetail({ commit },param){
			return api.enterprise_getAccountDetail(param).then((data) => {
				commit('enterprise_setAccountDetail',data)
			})
		},
		enterprise_profit({ commit },param){
			return api.enterprise_profit(param).then((data) => {
				commit('enterprise_setprofit',data)
			})
		},
		enterprise_cash({ commit },param){
			return api.enterprise_cash(param).then((data) => {
				commit('enterprise_setcash',data)
			})
		},
		enterprise_debt({ commit },param){
			return api.enterprise_debt(param).then((data) => {
				commit('enterprise_setdebt',data)
			})
		},
		enterprise_coreFinance({ commit },param){
			return api.enterprise_coreFinance(param).then((data) => {
				commit('enterprise_coreFinance',data)
			})
		},
		enterprise_sf({ commit },param){
			return api.enterprise_sf(param).then((data) => {
				commit('enterprise_sf',data)
			})
		},
		enterprise_enterpriseInfo({ commit },param){
			return api.enterprise_enterpriseInfo(param).then((data)=>{
				commit('enterprise_setInfo',data)
			})
		},
		enterprise_getAccountDetailDLB({ commit },param){
			return api.enterprise_getAccountDetailDLB(param).then((data)=>{
				commit('enterprise_setAccountDetailDLB',data)
			})
		},
		enterprise_getStatementBrief({ commit },param){
			return api.enterprise_getStatementBrief(param).then((data)=>{
				commit('enterprise_setStatementBrief',data)
			})
		},
		enterprise_selectListDayAmount({commit},param){
			return api.enterprise_selectListDayAmount(param).then((data)=>{
				commit('enterprise_setListDayAmount',data)
			})
		},
		enterprise_getItems({commit},param){
			return api.enterprise_getItems(param).then((data)=>{
				commit('enterprise_setItems',data)
			})
		},
		enterprise_savePOSData(undefined,param){
			return api.enterprise_savePOSData(param).then((data)=>data)
		},
		enterprise_saveDataEnterCMBC(undefined,param){
			return api.enterprise_saveDataEnterCMBC(param).then((data)=>data)
		}
	},
	mutations: {
		enterprise_setItems(state,data){
			state.items=data
		},
		enterprise_setListDayAmount(state,data){
			state.listDayAmount=data
		},
		enterprise_setStatementBrief(state,data){
			state.statementBrief=data
		},
		enterprise_clear(state){
			state.enterpriseMember=[]
			state.enterpriseInfo={}
			state.enterpriseAccountDetail=[]
			state.enterpriseAccountDetailDBL=[]
			state.profit=[]
			state.cash=[]
			state.debt=[]
			state.coreFinance=[]
			state.sf=[]
			state.statementBrief=[]
			state.listDayAmount=[]
			state.items=[]
		},
		enterprise_setAccountDetailDLB(state,data){
			state.enterpriseAccountDetailDBL=data
		},
		enterprise_sf(state, data){
			state.sf = data
		},
		enterprise_coreFinance(state, data){
			state.coreFinance = data
		},
		enterprise_setdebt(state, data) {
			state.debt = data
		},
		enterprise_setcash(state, data) {
			state.cash = data
		},
		enterprise_setprofit(state, data) {
			state.profit = data
		},
		enterprise_setManageList(state, data) {
			state.enterpriseManageList = data
		},
		enterprise_setInfo(state,data){
			state.enterpriseInfo=data
		},
		enterprise_setMemberInfo(state,data){
			state.enterpriseMember=data
		},
		enterprise_setAccountDetail(state,data){
			state.enterpriseAccountDetail=data
		}
	}
}