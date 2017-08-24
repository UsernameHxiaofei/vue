import { api } from 'api';
import { Message } from 'element-ui';

export const loginModule = {
    state: {
        actor:{}//这里会拿来存放用户信息。可以在其他组件中this.$store.state.login.actor获取到。这里我在header里面用到了，可以查看
    },
    actions: {
        login_check({commit,rootState}) {//这里传了个当前vue实例过来方便调用element集成的消息提示
           return api.login_check().then((data) => {
                if(!data.success){
                    Message.info(data.information);
                    setTimeout(()=>{
                         sessionStorage.setItem('menu_index','1');
                         location.href='/login';//跳转登录页面只能这样跳
                    },1000)
                }
            });
        },
        login_out({commit},vue){
             sessionStorage.setItem('menu_index','1');
             return api.login_out().then((data)=>{
                location.href='/login';
            })
        },
        login_getUser({state,commit},session){
           return api.login_getUser(session).then((data)=>{
             commit('login_setUser',data.actor);
             commit("customer_setHeadImage",data.headimage);
            })
        }
    },
    mutations: {
        login_setUser(state,data){
            state.actor=data;
        }
    }
}