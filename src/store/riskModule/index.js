import { api } from 'api'

export const riskModule = {
	state: {
		listData: [],//风险项目列表对象
		riskIndexList:{},//项目风险指标列表
		projectInfo:{},//风险项目信息
		riskIndex:{},//风险指标信息
		historyList:[],//项目风险指标处理历史列表
		historyDetail:{},//项目历史回顾对象
		projectPerson:{},//项目人，领投，行家信息
		riskOperateId:'',//保存返回id
        
		riskFactors:[],
		riskSettingData:{},//风险设置首页数据
		riskIndexInfo:{},//查询风险指标数据
		projectRiskRule:[],
		pageRiskCategory:{},//查询分页
		pageRiskMemberChange:{}
	},
	actions: {
		risk_getList({ commit },param) {
			return api.risk_getList(param).then((data) => {
				commit('risk_historyDetail',{})//清空历史详情
				commit('risk_changeList',data)
			})
		},
		risk_getHistoryList({commit},param) {
			return api.risk_getHistoryList(param).then((data)=> {
				commit('risk_historyList',data)
			})
		},
		risk_historyDetail({commit},param){
			return api.risk_historyDetail(param).then((data)=> {
				commit('risk_historyDetail',data)
			})
		},
		risk_getRiskIndexList({commit},param){
			return api.risk_getRiskIndexList(param).then((data)=> {
				commit('risk_riskIndexList',data)
			})
		},
		risk_getPerson({commit},param) {
			return api.risk_getPerson(param).then((data)=> {
				commit('risk_person',data)
			})
		},
		risk_saveHandle({commit},{param,vue}) {
			return api.risk_saveHandle(param).then((data)=> {
				if(data.head.success){
					vue.$message.success(data.head.information)
					commit('risk_riskId',JSON.parse(data.objectLiteral))
				}else{
					vue.$message.warning(data.head.information)
				}
			})
		},
		risk_saveFinalHandle({state},{param,vue}){
			return api.risk_saveFinalHandle(param).then((data)=> {
				if(data.success){
					vue.$message.success('操作成功')
					vue.$router.push('/riskIndex/'+state.projectInfo.projectId)
				}else{
					vue.$message.warning(data.information)
				}
               
			})
		},
		risk_getFactors({commit},param){
			return api.risk_getFactors(param).then((data)=> {
				commit('risk_setFactors',data)
			})
		},
		risk_addRiskIndex({state},{param,vue}){
			return api.risk_addRiskIndex(param).then((data)=>{
				if(data.success){
					vue.$message.success('添加成功')
					if(state.projectInfo.projectId&&state.projectInfo.projectId.length>0){
						vue.$router.push('/riskSetting/'+state.projectInfo.projectId)
					}else{
						vue.$router.push('/riskSetting')
					}
				}else{
					vue.$message.warning(data.informatiom)
				}
			})
		},
		risk_selectRiskInfo({commit},param){
			return api.risk_selectRiskInfo(param).then((data)=>{
				commit('risk_setRiskIndexInfo',data)
			})
		},
		risk_updateRiskInfo(undefined,{param,vue}){
			return api.risk_updateRiskInfo(param).then((data)=>{
				if(data.success){
					vue.$message.success('操作成功')
				}else{
					vue.$message.warning(data.informatiom)
				}
			})
		},
		risk_addRiskRuleGroup(undefined,{param,vue}){
			return api.risk_addRiskRuleGroup(param).then((data)=>{
				if(data.success){
					vue.$message.success('操作成功')
				}else{
					vue.$message.warning(data.informatiom)
				}
			})
		},
		risk_addRiskRuleInfo(undefined,{param,vue}){
			return api.risk_addRiskRuleInfo(param).then((data)=>{
				if(data.success){
					vue.$message.success('操作成功')
				}else{
					vue.$message.warning(data.informatiom)
				}
			})
		},
		risk_updateRiskRuleInfo(undefined,{param,vue}){
			return api.risk_updateRiskRuleInfo(param).then((data)=>{
				if(data.success){
					vue.$message.success('操作成功')
				}else{
					vue.$message.warning(data.informatiom)
				}
			})
		},
		risk_deleteRiskRuleInfo(undefined,{param,vue}){
			return api.risk_deleteRiskRuleInfo(param).then((data)=>{
				if(data.success){
					vue.$message.success('操作成功')
				}else{
					vue.$message.warning(data.informatiom)
				}
			})
		},
		risk_getOne({commit},param){
			return api.risk_getOne(param).then((data)=>{
				commit('risk_projectInfo',data)
			})
		},
		risk_selectRiskWarningById({commit},param){
			return api.risk_selectRiskWarningById(param).then((data)=>{
				commit('risk_riskIndex',data)
			})
		},
		risk_deleteRiskInfo(undefined,{param,vue}){
			return api.risk_deleteRiskInfo(param).then((data)=>{
				if(data.success){
					vue.$message.success('操作成功')
				}else{
					vue.$message.warning(data.informatiom)
				}
			})
		},
		risk_addGlobRiskForProject(undefined,param){
			return api.risk_addGlobRiskForProject(param)
		},
		risk_selectProjectRiskRule({commit},param){
			return api.risk_selectProjectRiskRule(param).then((data)=>{
				commit('risk_setProjectRiskRule',data)
			})
		},
		risk_selectPageRiskCategory({commit},param){
			return api.risk_selectPageRiskCategory(param).then((data)=>{
				commit('risk_selectPageRiskCategory',data)
			})
		},
		addWarningForEnterpriseMemberChange(undefined,param){
			return api.addWarningForEnterpriseMemberChange(param)
		},
		selectPageRiskMemberChange({commit},param){
			return api.selectPageRiskMemberChange(param).then((data)=>{
				commit('risk_selectPageRiskMemberChange',data)
			})
		}
	},
	mutations: {
		risk_selectPageRiskMemberChange(state,data){
			state.pageRiskMemberChange=data
		},
		risk_selectPageRiskCategory(state,data){
			state.pageRiskCategory=data
		},
		risk_setProjectRiskRule(state,data){
			state.projectRiskRule=data
		},
		risk_setRiskWarning(state,data){
			state.riskIndexInfo=data
		},
		risk_setRiskIndexInfo(state,data){
			state.riskIndexInfo=data
		},
		risk_setFactors(state,data){
			state.riskFactors=data
		},
		risk_riskId(state,data){
			state.riskOperateId=data
		},
		risk_historyDetail(state,data){
			state.historyDetail=data
		},
		risk_person(state,data){
			state.projectPerson=data
		},
		risk_riskIndexList(state,data){
			state.riskIndexList=data
		},
		risk_changeList(state, data) {
			state.listData = data
		},
		risk_projectInfo(state,data){
			state.projectInfo = data
		},
		risk_riskIndex(state,data){
			state.riskIndex = data
		},
		risk_historyList(state,data){
			state.historyList = data
		}
	}
}