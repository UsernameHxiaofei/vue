/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
module.exports = function client(Vue) {
	return {
		investmentFund_getList: (param) => {
			return Vue.http.post('investmentFund_getList', param).then(response => {
				return response.body
			})
		},
		invest_getHeadInfo: () => {
			return Vue.http.get('invest_getHeadInfo').then(response => {
				return response.body
			})
		},
		moneySelect_getData: () => {
			return Vue.http.get('moneySelect_getData').then(response => {
				return response.body
			})
		},
		find_topupByCondition: (param) => {
			return Vue.http.post('find_topupByCondition', param).then(response => {
				return response.body
			})
		},
		getAll_transactionStatus: () => {
			return Vue.http.get('getAll_transactionStatus').then(response => {
				return response.body
			})
		},
		get_topupStatResult: (param) => {
			return Vue.http.post('get_topupStatResult',param).then(response => {
				return response.body
			})
		},
		dealTop_getData: (param) => {
			return Vue.http.post('dealTop_getData', param).then(response => {
				return response.body
			})
		},
		getSubscription: (param) => {
			return Vue.http.post('getSubscription', param).then(response => {
				return response.body
			})
		},
		getHeadBrokerageFee: () => {
			return Vue.http.get('getHeadBrokerageFee').then(response => {
				return response.body
			})
		},
		getBrokerageFeeList: (param) => {
			return Vue.http.post('getBrokerageFeeList', param).then(response => {
				return response.body
			})
		},
		money_promiseList: (param) => {
			return Vue.http.post('money_promiseList', param).then(response => {
				return response.body
			})
		},
		money_getHeadInfo: () => {
			return Vue.http.get('money_getHeadInfo').then(response => {
				return response.body
			})
		},
		rate_getList: (param) => {
			return Vue.http.post('rate_getList', param).then(response => {
				return response.body
			})
		},
		id_fundRule: (param) => {
			return Vue.http.post('id_fundRule', param).then(response => {
				return response.body
			})
		},
		id_fundRule2: (param) => {
			return Vue.http.post('id_fundRule2', param).then(response => {
				return response.body
			})
		},
		overall_fundRule: (param) => {
			return Vue.http.post('overall_fundRule', param).then(response => {
				return response.body
			})
		},
		modify_fundRule: (param) => {
			return Vue.http.post('modify_fundRule', param).then(response => {
				return response.body
			})
		},
		get_capitalInjectionList: (param) => {
			return Vue.http.post('get_capitalInjectionList', param).then(response => {
				return response.body
			})
		},
		is_collection: (param) => {
			return Vue.http.post('is_collection', param).then(response => {
				return response.body
			})
		},
		get_capitalInjectionDetail: (param) => {
			return Vue.http.post('get_capitalInjectionDetail', param).then(response => {
				return response.body
			})
		},
		refuse_capitalInjection: (param) => {
			return Vue.http.post('refuse_capitalInjection', param).then(response => {
				return response.body
			})
		},
		agree_capitalInjection: (param) => {
			return Vue.http.post('agree_capitalInjection', param).then(response => {
				return response.body
			})
		},
		renew_capitalInjection: (param) => {
			return Vue.http.post('renew_capitalInjection', param).then(response => {
				return response.body
			})
		},
		bail_refund: (param) => {
			return Vue.http.post('bail_refund', param).then(response => {
				return response.body
			})
		},
		drawback_headInfo: () => {
			return Vue.http.get('drawback_headInfo').then(response => {
				return response.body
			})
		},
		drawback_getList: (param) => {
			return Vue.http.post('drawback_getList', param).then(response => {
				return response.body
			})
		},
		margin_approvalGetList: (param) => {
			return Vue.http.post('margin_approvalGetList', param).then(response => {
				return response.body
			})
		},
		pass_operate: (param) => {
			return Vue.http.post('pass_operate', param).then(response => {
				return response.body
			})
		},
		fail_operate: (param) => {
			return Vue.http.post('fail_operate', param).then(response => {
				return response.body
			})
		},
		leader_collect: (param) => {
			return Vue.http.post('leader_collect', param).then(response => {
				return response.body
			})
		},
		item_collect: (param) => {
			return Vue.http.post('item_collect', param).then(response => {
				return response.body
			})
		},
		share_profit: (param) => {
			return Vue.http.post('share_profit', param).then(response => {
				return response.body
			})
		},
		selectProjectNotIncludeAll: (param) => {
			return Vue.http.post('selectProjectNotIncludeAll', param).then(response => {
				return response.body
			})
		},
		LeadShareProfitHead: (param) => {
			return Vue.http.post('LeadShareProfitHead', param).then(response => {
				return response.body
			})
		},
		ShareProfitHis: (param) => {
			return Vue.http.post('ShareProfitHis', param).then(response => {
				return response.body
			})
		},
		executeLeadShareProfit: (param) => {
			return Vue.http.post('executeLeadShareProfit', param).then(response => {
				return response.body
			})
		},
		selectLeadShareProfit: (param) => {
			return Vue.http.post('selectLeadShareProfit', param).then(response => {
				return response.body
			})
		}
	}
}

