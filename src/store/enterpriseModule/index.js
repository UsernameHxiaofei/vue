import { api } from 'api';


export const enterpriseModule = {
    state: {
        enterpriseManageList: [], //融资企业管理列表
        enterpriseInfo:{}, //融资企业详情
        enterpriseMember:[], //融资企业团队
        enterpriseAccountDetail:[],  //融资企业资金流查看列表
        enterpriseAccountDetailDBL:{},//哆啦宝企业资金流查看列表
        profit:[],   //利润表
        cash:[],    //现金流量表
        debt:[],      //资产负债表
        coreFinance:[], //核心财务指标
        sf:{},   //综合
        statementBrief:{}
    },
    actions: {
        enterprise_getManageList({ commit },param) {
            return api.enterprise_getManageList(param).then((data) => {
                commit("enterprise_setManageList",data);
            });
        },
        enterprise_getInfo({ state,commit },param){
            return  api.enterprise_getInfo(param).then((data) => {
                commit('enterprise_setInfo',data);
            })
        },
        enterprise_getMemberInfo({ commit },param){
            return api.enterprise_getMemberInfo(param).then((data) => {
                console.log('查询企业成员信息',data);
                commit('enterprise_setMemberInfo',data);
            })
        },
        enterprise_getAccountDetail({ state,commit },param){
            return api.enterprise_getAccountDetail(param).then((data) => {
                commit('enterprise_setAccountDetail',data);
            })
        },
        enterprise_profit({ commit },param){
            return api.enterprise_profit(param).then((data) => {
                commit('enterprise_setprofit',data);
            })
        },
        enterprise_cash({ commit },param){
            return api.enterprise_cash(param).then((data) => {
                commit('enterprise_setcash',data);
            })
        },
        enterprise_debt({ commit },param){
            return api.enterprise_debt(param).then((data) => {
                console.log('返回数据',data);
                commit('enterprise_setdebt',data);
            })
        },
        enterprise_coreFinance({ commit },param){
            return api.enterprise_coreFinance(param).then((data) => {
                console.log('返回数据',data);
                commit('enterprise_coreFinance',data);
            })
        },
        enterprise_sf({ commit },param){
            return api.enterprise_sf(param).then((data) => {
                console.log('返回数据',data);
                commit('enterprise_sf',data);
            })
        },
        enterprise_enterpriseInfo({ commit },param){
            return api.enterprise_enterpriseInfo(param).then((data)=>{
                commit('enterprise_setInfo',data);
            })
        },
        enterprise_getAccountDetailDLB({ commit },param){
            return api.enterprise_getAccountDetailDLB(param).then((data)=>{
                commit('enterprise_setAccountDetailDLB',data);
            })
        },
        enterprise_getStatementBrief({ commit },param){
            return api.enterprise_getStatementBrief(param).then((data)=>{
                commit('enterprise_setStatementBrief',data);
            })
        }
    },
    mutations: {
        enterprise_setStatementBrief(state,data){
            state.statementBrief=data;
        },
        enterprise_clear(state){
            state.enterpriseMember=[];
            state.enterpriseInfo={};
        },
        enterprise_setAccountDetailDLB(state,data){
            state.enterpriseAccountDetailDBL=data;
        },
        enterprise_sf(state, data){
            state.sf = data;
        },
        enterprise_coreFinance(state, data){
            state.coreFinance = data;
        },
        enterprise_setdebt(state, data) {
            state.debt = data;
        },
        enterprise_setcash(state, data) {
            state.cash = data;
        },
        enterprise_setprofit(state, data) {
            state.profit = data;
        },
        enterprise_setManageList(state, data) {
            state.enterpriseManageList = data;
        },
        enterprise_setInfo(state,data){
            state.enterpriseInfo=data;
        },
        enterprise_setMemberInfo(state,data){
            state.enterpriseMember=data;
        },
        enterprise_setAccountDetail(state,data){
            state.enterpriseAccountDetail=data;
        }
    }
}