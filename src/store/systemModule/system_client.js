/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
module.exports=function client(Vue){
	return {
		////////////账户维护
		system_getManageList: (param) => {
			return Vue.http.post('system_getManageList',param).then(response => {
				return response.body
			})
		},
		system_roleInfo: () => {
			return Vue.http.get('system_roleInfo').then(response => {
				return response.body
			})
		},
		system_createUser: (param) => {
			return Vue.http.post('system_createUser',param).then(response => {
				return response.body
			})
		},
		system_updateUser: (param) => {
			return Vue.http.post('system_updateUser',param).then(response => {
				return response.body
			})
		},
		system_closureUser: (param) => {
			return Vue.http.post('system_closureUser',param).then(response => {
				return response.body
			})
		},

		////////////角色维护
		system_roleList: (param) => {
			return Vue.http.post('system_roleList',param).then(response => {
				return response.body
			})
		},
		system_authRoleList: () => {
			return Vue.http.get('system_authRoleList').then(response => {
				return response.body
			})
		},
		system_addRoleInfo: (param) => {
			return Vue.http.post('system_addRoleInfo',param).then(response => {
				return response.body
			})
		},
		system_forbidden: (param) => {
			return Vue.http.post('system_forbidden',param).then(response => {
				return response.body
			})
		},
		system_updateRole: (param) => {
			return Vue.http.post('system_updateRole',param).then(response => {
				return response.body
			})
		},

		////////////泛角色维护
		system_panRoleList: (param) => {
			return Vue.http.post('system_panRoleList',param).then(response => {
				return response.body
			})
		},
		system_addPanRole: (param) => {
			return Vue.http.post('system_addPanRole',param).then(response => {
				return response.body
			})
		},
		system_ban: (param) => {
			return Vue.http.post('system_ban',param).then(response => {
				return response.body
			})
		},
		system_updatePanRole: (param) => {
			return Vue.http.post('system_updatePanRole',param).then(response => {
				return response.body
			})
		},

		//////////////////日志
		system_logList: (param) => {
			return Vue.http.post('system_logList',param).then(response => {
				return response.body
			})
		},

		//////////////////权限分配
		system_getPermissionList: () => {
			return Vue.http.get('system_getPermissionList').then(response => {
				return response.body
			})
		},
		system_inquiryList: (param) => {
			return Vue.http.post('system_inquiryList',param).then(response => {
				return response.body
			})
		},
		system_updatePermissionList: (param) => {
			return Vue.http.post('system_updatePermissionList',param).then(response => {
				return response.body
			})
		},
		updateActor: (param) => {
			return Vue.http.post('updateActor',param).then(response => {
				return response.body
			})
		},
		showServiceIp: () => {
			return Vue.http.get('showServiceIp').then(response => {
				return response.body
			})
		},
		showServiceInfoByIp: (param) => {
			return Vue.http.post('showServiceInfoByIp',param).then(response => {
				return response.body
			})
		},
	} 
}

