import { api } from 'api'


export const employeeModule = {
	state: {
		employee:{}
	},
	actions: {
		emp_selectEmployee({ commit },param) {
			return api.emp_selectEmployee(param).then((data) => {
				commit('emp_setEmp',data)
			})
		},
		updateEmployeeInfo({dispatch },param) {
			return api.updateEmployeeInfo(param).then(() => {
				dispatch('emp_selectEmployee',{id:param.actorId})
			})
		}
	},
	mutations: {
		emp_setEmp(state,data){
			state.employee=data
		}
	}
}