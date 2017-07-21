import { api } from 'api';

export const riskModule = {
    state: {
        listData: [],//风险项目列表对象
        riskIndexList:{},//项目风险指标列表
        projectInfo:{},//风险项目信息
        riskIndex:{},//风险指标信息
        historyList:[],//项目风险指标处理历史列表
        historyDetail:{},//项目历史回顾对象
        projectPerson:{},//项目人，领投，行家信息
        riskOperateId:'',//保存返回id
        
        riskFactors:[],
        riskSettingData:{},//风险设置首页数据
        riskIndexInfo:{}//查询风险指标数据
    },
    actions: {
        risk_getList({ commit },param) {
            return api.risk_getList(param).then((data) => {
                console.log(data,"==>返回数据")
                commit("risk_historyDetail",{});//清空历史详情
                commit("risk_changeList",data);
            });
        },
        risk_getHistoryList({commit},param) {
            return api.risk_getHistoryList(param).then((data)=> {
                console.log(data,"==>返回数据")
                commit("risk_historyList",data);
            })
        },
        risk_historyDetail({commit},param){
            return api.risk_historyDetail(param).then((data)=> {
                console.log(data,"==>返回项目历史回顾对象数据")
                commit("risk_historyDetail",data);
            })
        },
        risk_getRiskIndexList({commit},param){
            return api.risk_getRiskIndexList(param).then((data)=> {
                console.log(data,"==>返回数据")
                commit("risk_riskIndexList",data);
            })
        },
        risk_getPerson({commit},param) {
            return api.risk_getPerson(param).then((data)=> {
                console.log(data,"==>返回数据")
                commit("risk_person",data);
            })
        },
        risk_saveHandle({commit},{param,vue}) {
            return api.risk_saveHandle(param).then((data)=> {
                if(data.head.success){
                    vue.$message.success(data.head.information);
                    commit('risk_riskId',data.object);
                }else{
                    vue.$message.warning(data.head.information);
                }
            })
        },
        risk_saveFinalHandle({commit,state},{param,vue}){
            return api.risk_saveFinalHandle(param).then((data)=> {
                if(data.success){
                    vue.$message.success('操作成功');
                    vue.$router.push('/riskIndex/'+state.projectInfo.projectId);
                }else{
                    vue.$message.warning(data.information);
                }
               
            })
        },
        risk_getFactors({commit}){
            return api.risk_getFactors().then((data)=> {
                console.log('获取的因子单位',data)
                commit('risk_setFactors',data);
            })
        },
        risk_addRiskIndex({commit,state},{param,vue}){
            return api.risk_addRiskIndex(param).then((data)=>{
                if(data.success){
                    vue.$message.success('添加成功');
                    if(state.projectInfo.projectId&&state.projectInfo.projectId.length>0){
                        vue.$router.push('/riskSetting/'+state.projectInfo.projectId);
                    }else{
                        vue.$router.push('/riskSetting');
                    }
                }else{
                    vue.$message.warning(data.informatiom);
                }
            })
        },
        risk_selectRiskCategory({commit},param){
            return api.risk_selectRiskCategory(param).then((data)=>{
                commit('risk_setRiskSettingData',data);
            })
        },
        risk_selectRiskInfo({commit},param){
            return api.risk_selectRiskInfo(param).then((data)=>{
                commit('risk_setRiskIndexInfo',data);
            })
        },
        risk_updateRiskInfo({commit},{param,vue}){
            return api.risk_updateRiskInfo(param).then((data)=>{
                if(data.success){
                    vue.$message.success('操作成功')
                }else{
                    vue.$message.warning(data.informatiom);
                }
            })
        },
        risk_addRiskRuleGroup({commit},{param,vue}){
            return api.risk_addRiskRuleGroup(param).then((data)=>{
                if(data.success){
                    vue.$message.success('操作成功')
                }else{
                    vue.$message.warning(data.informatiom);
                }
            })
        },
        risk_addRiskRuleInfo({commit},{param,vue}){
            return api.risk_addRiskRuleInfo(param).then((data)=>{
                if(data.success){
                    vue.$message.success('操作成功')
                }else{
                    vue.$message.warning(data.informatiom);
                }
            })
        },
        risk_updateRiskRuleInfo({commit},{param,vue}){
            return api.risk_updateRiskRuleInfo(param).then((data)=>{
                if(data.success){
                    vue.$message.success('操作成功')
                }else{
                    vue.$message.warning(data.informatiom);
                }
            })
        },
        risk_deleteRiskRuleInfo({commit},{param,vue}){
            return api.risk_deleteRiskRuleInfo(param).then((data)=>{
                if(data.success){
                    vue.$message.success('操作成功')
                }else{
                    vue.$message.warning(data.informatiom);
                }
            })
        },
        risk_getOne({commit},param){
            return api.risk_getOne(param).then((data)=>{
                commit('risk_projectInfo',data);
            })
        },
        risk_selectRiskWarningById({commit},param){
            return api.risk_selectRiskWarningById(param).then((data)=>{
                commit('risk_riskIndex',data)
            })
        }
    },
    mutations: {
        risk_setRiskWarning(state,data){
            state.riskIndexInfo=data;
        },
        risk_setRiskIndexInfo(state,data){
            state.riskIndexInfo=data;
        },
        risk_setRiskSettingData(state,data){
            state.riskSettingData=data;
        },
        risk_setFactors(state,data){
            state.riskFactors=data;
        },
        risk_riskId(state,data){
            state.riskId=data;
        },
        risk_historyDetail(state,data){
            state.historyDetail=data;
        },
        risk_person(state,data){
            state.projectPerson=data;
        },
        risk_riskIndexList(state,data){
            state.riskIndexList=data;
        },
        risk_changeList(state, data) {
            state.listData = data;
        },
        risk_projectInfo(state,data){
            state.projectInfo = data;
        },
        risk_riskIndex(state,data){
            state.riskIndex = data;
        },
        risk_historyList(state,data){
            state.historyList = data;
        }
    }
}