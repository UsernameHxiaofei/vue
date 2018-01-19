import { api } from 'api'

export default  {
	state: {
		////////////账户维护
		systemManageList: [],//查询用户维护列表
		systemRole: [],//查询角色列表
		systemCreateUser: '',//创建用户
		systemUpdateUser: '',//更新用户
		systemClosureUser: '',//激活/封禁用户

		////////////////角色维护
		systemRoleList: [],//查询角色列表
		systemAuthRoleList: [],//查询角色泛角色权限列表
		systemAddRoleInfo: '',//添加角色
		systemForbidden: '',//激活/封禁角色
		systemUpdateRole: '',//更新角色信息

		////////////////泛角色维护
		systemPanRoleList: [],//查询泛角色列表
		systemAddPanRole: '',//添加泛角色
		systemBan: '',//激活/封禁泛角色
		systemUpdatePanRole: '',//更新泛角色信息

		//////////////////日志
		systemLogList: [],//查询日志列表

		//////////////////权限分配
		systemGetPermissionList: [],//查询角色泛角色权限列表
		systemInquiryList: {},//根据角色id查询拥有的和未拥有的权限
		systemUpdatePermissionList: '',//角色配置权限
		updateActorStatus: '',//更新状态
	},
	actions: {
		////////////账户维护
		system_getManageList({ commit }, param) {
			return api.system_getManageList(param).then((data) => {
				commit('system_setManageList', data)
			})
		},
		system_roleInfo({ commit }, param) {
			return api.system_roleInfo(param).then((data) => {
				commit('system_roleList', data)
			})
		},
		system_createUser({ commit }, param) {
			return api.system_createUser(param).then((data) => {
				commit('system_insertUser', data)
			})
		},
		system_updateUser({ commit }, param) {
			return api.system_updateUser(param).then((data) => {
				commit('system_renewUser', data)
			})
		},
		system_closureUser({ commit }, param) {
			return api.system_closureUser(param).then((data) => {
				commit('system_blockUser', data)
			})
		},

		////////////////角色维护
		system_roleList({ commit }, param) {
			return api.system_roleList(param).then((data) => {
				commit('system_partUser', data)
			})
		},
		system_authRoleList({ commit }, param) {
			return api.system_authRoleList(param).then((data) => {
				commit('system_setAuth', data)
			})
		},
		system_addRoleInfo({ commit }, param) {
			return api.system_addRoleInfo(param).then((data) => {
				commit('system_setRoleInfo', data)
			})
		},
		system_forbidden({ commit }, param) {
			return api.system_forbidden(param).then((data) => {
				commit('system_disable', data)
			})
		},
		system_updateRole({ commit }, param) {
			return api.system_updateRole(param).then((data) => {
				commit('system_updateRoleData', data)
			})
		},


		////////////////泛角色维护
		system_panRoleList({ commit }, param) {
			return api.system_panRoleList(param).then((data) => {
				commit('system_panRoleData', data)
			})
		},
		system_addPanRole({ commit }, param) {
			return api.system_addPanRole(param).then((data) => {
				commit('system_setPanRole', data)
			})
		},
		system_ban({ commit }, param) {
			return api.system_ban(param).then((data) => {
				commit('system_setBanRole', data)
			})
		},
		system_updatePanRole({ commit }, param) {
			return api.system_updatePanRole(param).then((data) => {
				commit('system_renewBanRole', data)
			})
		},

		//////////////////日志
		system_logList({ commit }, param) {
			return api.system_logList(param).then((data) => {
				commit('system_setLog', data)
			})
		},

		//////////////////权限分配
		system_getPermissionList({ commit }, param) {
			return api.system_getPermissionList(param).then((data) => {
				commit('system_setPermissionList', data)
			})
		},

		system_inquiryList({ commit }, param) {
			return api.system_inquiryList(param).then((data) => {
				commit('system_setInquiryList', data)
			})
		},

		system_updatePermissionList({ commit }, param) {
			return api.system_updatePermissionList(param).then((data) => {
				commit('system_updateInquiryList', data)
			})
		},
		updateActor({ commit, dispatch }, param) {
			return api.updateActor(param).then((data) => {
				commit('updateActor_setStatus', data)
				if (data.success) {
					dispatch('login_getUserByPassport')
				}
			})
		},
		showServiceIp(undefined, param) {
			return api.showServiceIp(param)
		},
		showServiceInfoByIp(undefined, param) {
			return api.showServiceInfoByIp(param)
		},
		showCostInfo(undefined, param) {
			return api.showCostInfo(param)
		},
		showExtraCostInfo(undefined, param) {
			return api.showExtraCostInfo(param)
		},
	},
	mutations: {
		////////////账户维护
		system_setManageList(state, data) {
			state.systemManageList = data
		},
		system_roleList(state, data) {
			state.systemRole = data
		},
		system_insertUser(state, data) {
			state.systemCreateUser = data
		},
		system_renewUser(state, data) {
			state.systemUpdateUser = data
		},
		system_blockUser(state, data) {
			state.systemClosureUser = data
		},
		////////////////角色维护
		system_partUser(state, data) {
			state.systemRoleList = data
		},
		system_setAuth(state, data) {
			state.systemAuthRoleList = data
		},
		system_setRoleInfo(state, data) {
			state.systemAddRoleInfo = data
		},
		system_disable(state, data) {
			state.systemForbidden = data
		},
		system_updateRoleData(state, data) {
			state.systemUpdateRole = data
		},

		////////////////泛角色维护
		system_panRoleData(state, data) {
			state.systemPanRoleList = data
		},
		system_setPanRole(state, data) {
			state.systemAddPanRole = data
		},
		system_setBanRole(state, data) {
			state.systemBan = data
		},
		system_renewBanRole(state, data) {
			state.systemUpdatePanRole = data
		},

		//////////////////日志
		system_setLog(state, data) {
			state.systemLogList = data
		},

		//////////////////权限分配
		system_setPermissionList(state, data) {
			state.systemGetPermissionList = data
		},
		system_setInquiryList(state, data) {
			state.systemInquiryList = data
		},
		system_updateInquiryList(state, data) {
			state.systemUpdatePermissionList = data
		},
		updateActor_setStatus(state, data) {
			state.updateActorStatus = data
		},
	}
}