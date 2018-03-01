/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
module.exports = function client(Vue) {
	return {
		showAtiProjectInfoList: (param) => {
			return Vue.http.post('showAtiProjectInfoList', param).then(response => {
				return response.body
			})
		},
		addAtiProjectInfo: (param) => {
			return Vue.http.post('addAtiProjectInfo', param).then(response => {
				return response.body
			})
		},
		addProjectRightsInfo: (param) => {
			return Vue.http.post('addProjectRightsInfo', param).then(response => {
				return response.body
			})
		},
		addProjectRightsInfoExestis: (param) => {
			return Vue.http.post('addProjectRightsInfoExestis', param).then(response => {
				return response.body
			})
		},
		ProjectRightsInfoGets: (param) => {
			return Vue.http.post('ProjectRightsInfoGets', param).then(response => {
				return response.body
			})
		},
		ProjectRightsInfoDelete: (param) => {
			return Vue.http.post('ProjectRightsInfoDelete', param).then(response => {
				return response.body
			})
		},
		ProjectRightsInfoUpdate: (param) => {
			return Vue.http.post('ProjectRightsInfoUpdate', param).then(response => {
				return response.body
			})
		},
		AtiProjectInfoGet: (param) => {
			return Vue.http.post('AtiProjectInfoGet', param).then(response => {
				return response.body
			})
		},
		AtiProjectStatusUpdate:(param)=>{
			return Vue.http.post('AtiProjectStatusUpdate', param).then(response => {
				return response.body
			})
		}
	}
}

