/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
module.exports=function client(Vue){
	return {
		enterprise_getManageList: (param) => {
			return Vue.http.post('enterprise_getManageList',param).then(response => {
				return response.body
			})
		},
		enterprise_getInfo: (param) => {
			return Vue.http.post('enterprise_getInfo',param).then(response => {
				return response.body
			})
		},
		enterprise_getMemberInfo: (param) => {
			return Vue.http.post('enterprise_getMemberInfo',param).then(response => {
				return response.body
			})
		},
		enterprise_getAccountDetail: (param) => {
			return Vue.http.post('enterprise_getAccountDetail',param).then(response => {
				return response.body
			})
		},
		enterprise_profit: (param) => {
			return Vue.http.post('enterprise_profit',param).then(response => {
				return response.body
			})
		},
		enterprise_cash: (param) => {
			return Vue.http.post('enterprise_cash',param).then(response => {
				return response.body
			})
		},
		enterprise_debt: (param) => {
			return Vue.http.post('enterprise_debt',param).then(response => {
				return response.body
			})
		},
		enterprise_coreFinance:(param) => {
			return Vue.http.post('enterprise_coreFinance',param).then(response => {
				return response.body
			})
		},
		enterprise_sf:(param) => {
			return Vue.http.post('enterprise_sf',param).then(response => {
				return response.body
			})
		},
		enterprise_getAccountDetailDLB:(param)=>{
			return Vue.http.post('enterprise_getAccountDetailDLB',param).then(response => {
				return response.body
			})
		},
		enterprise_getStatementBrief:(param)=>{
			return Vue.http.post('enterprise_getStatementBrief',param).then(response => {
				return response.body
			})
		},
		enterprise_selectListDayAmount:(param)=>{
			return Vue.http.post('enterprise_selectListDayAmount',param).then(response => {
				return response.body
			})
		},
		enterprise_getItems:(param)=>{
			return Vue.http.post('enterprise_getItems',param).then(response => {
				return response.body
			})
		},
		enterprise_saveDataEnterCMBC:(param)=>{
			return Vue.http.post('enterprise_saveDataEnterCMBC',param).then(response =>{
				return response.body
			})
		},
		enterprise_DLBAmountByTime:(param)=>{
			return Vue.http.post('enterprise_DLBAmountByTime',param).then(response =>{
				return response.body
			})
		},
		enterprise_saveDLBData:(param)=>{
			return Vue.http.post('enterprise_saveDLBData',param).then(response =>{
				return response.body
			})
		}
	} 
}