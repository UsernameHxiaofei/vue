/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
module.exports = function client(Vue) {
	return {
		show_imageList: (param) => {
			return Vue.http.post('show_imageList', param).then(response => {
				return response.body
			})
		},
		delete_bannerById: (param) => {
			return Vue.http.post('delete_bannerById', param).then(response => {
				return response.body
			})
		},
		banner_uploadByFile: (param) => {
			return Vue.http.post('banner_uploadByFile', param).then(response => {
				return response.body
			})
		},
		msgModel_getList: (param) => {
			return Vue.http.post('msgModel_getList', param).then(response => {
				return response.body
			})
		},
		msgModel_delete: (param) => {
			return Vue.http.post('msgModel_delete', param).then(response => {
				return response.body
			})
		},
		msgModel_select: (param) => {
			return Vue.http.post('msgModel_select', param).then(response => {
				return response.body
			})
		},
		msgModel_update: (param) => {
			return Vue.http.post('msgModel_update', param).then(response => {
				return response.body
			})
		},
		msgModel_insert_update: (param) => {
			return Vue.http.post('msgModel_insert_update', param).then(response => {
				return response.body
			})
		},
		find_ltMessageByCondition: (param) => {
			return Vue.http.post('find_ltMessageByCondition', param).then(response => {

				return response.body
			})
		},
		sendSms_byReceiver: (param) => {
			return Vue.http.post('sendSms_byReceiver', param).then(response => {

				return response.body
			})
		},
		//站内信息按条件查询分页
		selectPage_byCondition: (param) => {
			return Vue.http.post('selectPage_byCondition', param).then(response => {

				return response.body
			})
		},
		//查询站内所有用户信息
		select_allActor: (param) => {
			return Vue.http.post('select_allActor', param).then(response => {

				return response.body
			})
		},
		//发送站内消息
		send_webMessage: (param) => {
			return Vue.http.post('send_webMessage', param).then(response => {

				return response.body
			})
		},
		//根据id 查询用户发出的站内消息
		select_webMessageByActorid: (param) => {
			return Vue.http.post('select_webMessageByActorid', param).then(response => {

				return response.body
			})
		},
		//根据id 查询用户发出的站内消息
		select_webMessageBySenderid: (param) => {
			return Vue.http.post('select_webMessageBySenderid', param).then(response => {

				return response.body
			})
		},
		//根据id 修改阅读状态
		update_isReadByMessageId: (param) => {
			return Vue.http.post('update_isReadByMessageId', param).then(response => {

				return response.body
			})
		},
		//屏蔽
		forBidMessageById: (param) => {
			return Vue.http.post('forBidMessageById', param).then(response => {
				return response.body
			})
		},
		//添加文稿
		addDynamic: (param) => {
			return Vue.http.post('addDynamic', param).then(response => {
				return response.body
			})
		},
		//更新状态
		dynamicUpdate: (param) => {
			return Vue.http.post('dynamicUpdate', param).then(response => {
				return response.body
			})
		},
		// 查询列表 分页
		selectDynamicForShow: (param) => {
			return Vue.http.post('selectDynamicForShow', param).then(response => {
				return response.body
			})
		},
		//详情信息
		selectDynamicForDetail: (param) => {
			return Vue.http.post('selectDynamicForDetail', param).then(response => {
				return response.body
			})
		}
	}
}