import { api } from 'api'
import { Message } from 'element-ui'

export default {
	state: {
		actor:{}//这里会拿来存放用户信息。可以在其他组件中this.$store.state.login.actor获取到。这里我在header里面用到了，可以查看
	},
	actions: {
		login_check() {//这里传了个当前vue实例过来方便调用element集成的消息提示
			return api.login_check().then((data) => {
				if(!data.success){
					Message.info(data.information)
					setTimeout(()=>{
						sessionStorage.setItem('menu_index','1')
						location.href='/login'//跳转登录页面只能这样跳
					},1000)
				}
			})
		},
		login_out(){
			sessionStorage.setItem('menu_index','1')
			return api.login_out().then(()=>{
				location.href='/login'
			})
		},
		login_getUser({commit},session){
			return api.login_getUser(session).then((data)=>{
				commit('login_setUser',data.actor)
				commit('emp_setEmp',data.employee)
			})
		},
		login_getUserByPassport({commit}){
			return api.login_getUserByPassport().then((data)=>{
				commit('login_setUser',data)
			})
		},
	},
	mutations: {
		login_setUser(state,data){
			state.actor=data
		}
	}
}