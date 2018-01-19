import { api } from 'api'


export default {
	state: {
		projectList:{},
		projectRightsList:{},
		project:{}
	},
	actions: {
		//投后项目首页列表
		showAtiProjectInfoList({ commit }, param) {
			return api.showAtiProjectInfoList(param).then((data) => {
				commit('showAtiProjectInfoList', data)
			})
		},
		//添加投后项目
		addAtiProjectInfo(undefined, param) {
			return api.addAtiProjectInfo(param)
		},
		//添加权益人
		addProjectRightsInfo(undefined, param) {
			return api.addProjectRightsInfo(param)
		},
		//添加选择会员权益人
		addProjectRightsInfoExestis(undefined, param) {
			return api.addProjectRightsInfoExestis(param)
		},
		//权益人列表
		ProjectRightsInfoGets({commit}, param) {
			return api.ProjectRightsInfoGets(param).then((data) => {
				commit('ProjectRightsInfoGets', data)
			})
		},
		//权益人删除
		ProjectRightsInfoDelete(undefined, param) {
			return api.ProjectRightsInfoDelete(param)
		},
		//权益人更新
		ProjectRightsInfoUpdate(undefined, param) {
			return api.ProjectRightsInfoUpdate(param)
		},
		//投后项目详情
		AtiProjectInfoGet({commit}, param) {
			return api.AtiProjectInfoGet(param).then((data)=>{
				commit('AtiProjectInfoGet',data)
			})
		},
	},
	mutations: {
		AtiProjectInfoGet(state,data){
			state.project=data
		},
		showAtiProjectInfoList(state,data){
			state.projectList=data
		},
		ProjectRightsInfoGets(state,data){
			state.projectRightsList=data
		}
	}
}