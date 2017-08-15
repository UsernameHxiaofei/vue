import { api } from 'api';

export const itemModule = {
    state: {
        itemManageList: [],//项目管理首页列表
        itemManageHeadData: {},//项目管理首页头部信息
        itemManageDetail: {},//项目详情信息
        financingPlanData: {},//项目融资方案信息
        partnerInfo: {},//有限合伙人信息
        expertAd: {},//行家建议
        leadAd:{},//领投意向
        timeInfo:{},//时间信息
        authInfo:{},//登记授信信息
        resultInfo:{},//审核结果
        isAuthInfo:false,//
        isFun:{},
        isAuth:false,
        thirdReport:{},
        show:{},//项目展示数据
        customerInfo4ShowForSimulationList:{},//获取模拟投资行家领投列表
        customerInfoForSimulationList:{},//获取模拟投资发起人列表

        customerList:{},//创建项目选择发起人列表

        createProjectId:'',//创建项目id
        financingPlanId:'',//创建融资方案id
        enterpriseId:'',//创建enterpriseId
        investorConditionId:'',//创建投资人条件Id
        detailedIntroductionId:'',//创建详细介绍id
        enterpriseMemberId:'',
        exportList:{},//行家列表
        leadList:{},//领投列表
        exportList1:{},//行家列表for模拟投资
        leadList1:{},//领投列表for模拟投资
        

        detailedIntroduction:{},//详细介绍
        materials:[],//获取所有参考资料
        investedEvidence:[],//获取投资凭证
        investorCondition:{},//获取投资人条件
        rewardPlan:{},//回报计划
        invertUserInfo:{},//投资人信息
        salesQuota:{},//销售份额
        businessInfo:{},//工商信息
        credit:{}//反欺诈信息
    },
    actions: {
        //项目首页列表
        item_getManageList({ commit }, param) {
            return api.item_getManageList(param).then((data) => {
                console.log('项目列表返回数据', data);
                commit("item_setManageList", data);
            });
        },
        //获取项目头部信息       
        item_getHeadData({ commit }, param) {
            return api.item_getHeadData(param).then((data) => {
                console.log('项目头信息返回数据', data);
                commit("item_setHeadData", data);
            });
        },
        //获取项目详情       
        item_getManageDetail({ commit }, param) {
            return api.item_getManageDetail(param).then((data) => {
                console.log('项目详情返回数据', data);
                commit("item_setManageDetail", data);
            });
        },
        //获取项目展示
        item_getProjectShow({commit},param){
             return api.item_getProjectShow(param).then((data) => {
                console.log('获取项目展示信息', data);
                commit("item_setProjectShow", data);
            });
        },
        //根据id获取融资方案
        item_getFinancingPlan({ commit }, param) {
            return api.item_getFinancingPlan(param).then((data) => {
                console.log('融资方案', data);
                commit("item_setFinancingPlan", data);
            });
        },
        //获取有限合伙人信息
        item_getPartnerInfo({ commit }, param) {
            return api.item_getPartnerInfo(param).then((data) => {
                console.log('有限合伙人信息', data);
                commit("item_setPartnerInfo", data);
            });
        },
        //编辑有限合伙人信息
        item_updatePartnerInfo({commit,dispatch},{param,vue}){
            return api.item_updatePartnerInfo(param).then((data)=>{
                console.log('编辑独立合伙人信息', data);
                if(data.success){
                    vue.$message.success(data.information);
                    dispatch('item_getPartnerInfo',param)
                }else{
                    vue.$message.warning(data.information)
                }
            })
        },
        //关联有限合伙人
        item_createPartnerInfo({commit,dispatch},{param,vue}){
            return api.item_createPartnerInfo(param).then((data)=>{
                console.log('关联独立合伙人', data);
                if(data.success){
                    vue.$message.success(data.information);
                    dispatch('item_getPartnerInfo',param);
                }else{
                    vue.$message.warning(data.information)
                }
            })
        },
        //获取专家意见
        item_getExpertAd({ commit }, param) {
            return api.item_getExpertAd(param).then((data) => {
                console.log('获取行家意见', data);
                commit("item_setExpertAd", data);
            });
        },
        //获取领投建议
        item_getLeadAd({ commit }, param) {
            return api.item_getLeadAd(param).then((data) => {
                console.log('领投意向', data);
                commit("item_setLeadAd", data);
            });
        },
        //获取时间信息
        item_getTimeInfo({ commit }, param) {
            return api.item_getTimeInfo(param).then((data) => {
                console.log('时间信息', data);
                commit("item_setTimeInfo", data);
            });
        },
        //编辑时间信息
        item_updateTimeInfo({commit,dispatch},{param,vue}){
            return api.item_updateTimeInfo(param).then((data) => {
                console.log('编辑时间信息', data);
                if(data.success){
                   vue.$message.success(data.information);
                   dispatch('item_getTimeInfo',{id:param.id});
                }else{
                   vue.$message.warning(data.information);
                }
            });
        },
        //获取登记认证信息
        item_getAuthInfo({ commit }, param) {
            return api.item_getAuthInfo(param).then((data) => {
                console.log('登记授信信息', data);
                commit("item_setAuthInfo", data);
            });
        },
        //更新登记认证信息
        item_updateAuthInfo({ commit,dispatch}, {param,vue}) {
            return api.item_updateAuthInfo(param).then((data) => {
                console.log('编辑登记授信信息', data);
                if(data.success){
                    vue.$message.success(data.information);
                    dispatch('item_getAuthInfo',{id:param.enterpriseId});
                }else{
                    vue.$message.warning(data.information);
                }
            });
        },
        //获取审核结果
        item_getResultInfo({commit},param){
            return api.item_getResultInfo(param).then((data) => {
                console.log('审核结果', data);
                commit("item_setResultInfo", data);
            });
        },
        //审核项目
        item_setResultInfo({ commit,dispatch }, {param,vue}) {
            return api.item_setResultInfo(param).then((data) => {
                console.log('项目审核（初审，复审）', data);
                if(data.success){
                    vue.$message.success(data.information);
                    dispatch('item_getResultInfo',{id:param.id});
                    dispatch('item_getManageDetail',{id:param.id});
                }else{
                    vue.$message.warning(data.information);
                }
            });
        },
        //重新发起项目
        item_reset({ commit,dispatch }, {param,vue}){
            return api.item_reset(param).then((data) => {
                console.log('重新发起申请', data);
                if(data.success){
                    vue.$message.success(data.information);
                    dispatch('item_getManageDetail',{id:param.id});
                }else{
                    vue.$message.warning(data.information);
                }
            });
        },
        //放款申请
        item_lend({ commit,dispatch }, {param,vue}){
            return api.item_lend(param).then((data) => {
                console.log('放款申请', data);
                if(data.success){
                    vue.$message.success(data.information+'请在资金管理的资金划拨审批处对该项目进行注资审批');
                    dispatch('item_getManageDetail',{id:param.id});
                }else{
                    vue.$message.warning(data.information);
                }
            });
        },
        //银账信息审核
        item_authInfo({ commit,dispatch }, {param,vue}){
            return api.item_authInfo(param).then((data) => {
                console.log('银账信息审核', data);
                if(data.success){
                    vue.$message.success(data.information);
                    commit('item_isAuth',true);
                    dispatch('item_getManageDetail',{id:param.id});
                }else{
                    vue.$message.warning(data.information);
                }
            });
        },
        //项目创建返回id
        item_createProject1({ commit,dispatch },param){
            return api.item_createProject(param).then((data) => {
                console.log('项目创建返回id',data);
                commit('item_createProject',data);
            });
        },
        //创建融资方案
        item_createFinancingPlan({ commit,dispatch },{param,vue}){
            return api.item_createFinancingPlan(param).then((data) => {
                console.log('创建融资方案',data);
                commit('item_createFinancingPlan',data);
            });
        },
        //更新融资方案
        item_updateFinancingPlan({ commit,dispatch },{param,vue}){
            return api.item_updateFinancingPlan(param).then((data) => {
                console.log('更新融资方案',data);
                if(!data.success){
                    vue.$message.warning(data.information);
                }
            });
        },
        //添加凭证
        item_createInvestedEvidence({ commit,dispatch },{param,vue}){
            return api.item_createInvestedEvidence(param).then((data) => {
                console.log('创建凭证',data);
            });
        },
        //获取投资凭证
        item_getInvestedEvidence({ commit,dispatch },param){
            return api.item_getInvestedEvidence(param).then((data) => {
                console.log('获取凭证',data);
                commit('item_setInvestedEvidence',data);
            });
        },
        //删除融资凭证
        item_deleteInvestedEvidence({ commit,dispatch },param){
            return api.item_deleteInvestedEvidence(param).then((data) => {
                console.log('删除融资凭证',data);
            });
        },
        //创建投资人条件
        item_createInvestorCondition({ commit,dispatch },{param,vue}){
            return api.item_createInvestorCondition(param).then((data) => {
                console.log('创建投资人条件',data);
                commit('item_investorConditionId',data);
            });
        },
        //更新投资人条件
        item_updateInvestorCondition({ commit,dispatch },{param,vue}){
            return api.item_updateInvestorCondition(param).then((data) => {
                console.log('更新投资人条件',data);
                commit('item_investorConditionId',data);
            });
        },
        //获取投资人条件
        item_selectInvestorConditionByFinId({ commit,dispatch },param){
            return api.item_selectInvestorConditionByFinId(param).then((data) => {
                console.log('获取投资人条件',data);
                commit('item_investorCondition',data);
            });
        },
        //保存创建第一步
        item_updateProject({ commit,dispatch },{param,vue}){
            return api.item_updateProject(param).then((data) => {
                if(!data.success){
                    vue.$message.warning(data.information);
                }else if(data.success&&param.initiatorId){
                    vue.$message.info('开启项目创建进程')
                }else if(data.success&&param.leadInvestorId){
                    vue.$message.info('项目保存成功')
                }
                console.log('项目保存信息',data);
            });
        },
        //添加融资企业
        item_createEnterprise({ commit,dispatch },{param,vue}){
            return api.item_createEnterprise(param).then((data) => {
                console.log('添加融资企业',data);
                if(data&&data.length>0){
                    commit('item_createEnterprise',data);
                }else{
                    commit('item_createEnterprise','');
                }
            });
        },
        //修改融资企业
        item_updateEnterprise({ commit,dispatch },{param,vue}){
            return api.item_updateEnterprise(param).then((data) => {
                console.log('修改融资企业',data);
                if(data.success){
                    dispatch('enterprise_getInfo',{id:param.enterpriseId})
                }else{
                    vue.$message.warning(data.information);
                }
            });
        },
        //添加融资企业成员
        item_createEnterpriseMember({ commit,dispatch,state },{param,vue}){
            return api.item_createEnterpriseMember(param).then((data) => {
                console.log('添加融资企业成员',data);
                if(data.head.success){
                    vue.$message.success('添加成功')
                    commit('item_enterpriseMemberId',data.objectLiteral);
                }else{
                    vue.$message.warning(data.information)
                    commit('item_enterpriseMemberId','');
                }
                dispatch('enterprise_getMemberInfo',{id:param.enterpriseId});
            });
        },
        //更新融资企业成员
        item_updateEnterpriseMember({ commit,dispatch,state },{param,vue}){
            return api.item_updateEnterpriseMember(param).then((data) => {
                console.log('更新融资企业成员',data);
                if(!data.success){
                    vue.$message.warning(data.information)
                }
                dispatch('enterprise_getMemberInfo',{id:param.enterpriseId});
            });
        },
        //设置无效成员信息
        item_updateEnterpriseMemberStatusById({ commit,dispatch,state },{param,vue}){
            //成员状态（0无效   1有效 2禁用)
            return api.item_updateEnterpriseMemberStatusById(param).then((data) => {
                console.log('更新融资企业成员状态',data);
                dispatch('enterprise_getMemberInfo',{id:param.enterpriseId});
            });
        },
        //创建项目详情介绍
        item_createDetailedIntroduction({ commit,dispatch,state },{param,vue}){
            return api.item_createDetailedIntroduction(param).then((data) => {
                console.log('创建项目详细介绍',data);
                commit('item_detailedIntroductionId',data);
            });
        },
        //修改项目详情介绍
        item_updateDetailedIntroduction({ commit,dispatch,state },{param,vue}){
            return api.item_updateDetailedIntroduction(param).then((data) => {
                console.log('修改项目详细介绍',data);
            });
        },
        //创建参考资料
        item_createMaterial({ commit,dispatch,state },{param,vue}){
            return api.item_createMaterial(param).then((data) => {
                console.log('创建参考资料',data);
            });  
        },
        //删除参考资料
        item_deleteMaterialByFinId({ commit,dispatch,state },{param,vue}){
            return api.item_deleteMaterialByFinId(param).then((data) => {
                console.log('删除参考资料',data);
            });  
        },
        //查询参考资料
        item_selectMaterialByProjectId({ commit,dispatch,state },param){
            return api.item_selectMaterialByProjectId(param).then((data) => {
                console.log('查询参考资料',data);
                commit('item_setMaterials',data);
            });  
        },
        //获取领投行家
        item_getPersons({ commit,dispatch,state },{param,vue}){
            return api.item_getPersons(param).then((data) => {
                if(param.type=='A'){
                    commit('item_setExportList',data);
                }else{
                    commit('item_setLeadList',data);
                }
            });
        },
        //获取客户列表
        item_getCustomerList({ commit,dispatch,state },param){
            return api.item_getCustomerList(param).then((data) => {
                console.log('客户管理',data)
                commit('item_setCustomerList',data);
            });
        },
        //获取详细介绍
        item_getDetailedIntroduction({ commit,dispatch,state },param){
            return api.item_getDetailedIntroduction(param).then((data) => {
                console.log('获取项目详细介绍',data)
                commit('item_setDetailedIntroduction',data);
            });
        },
        //获取回报计划
        item_getRewardPlan({ commit,dispatch,state },param){
            return api.item_getRewardPlan(param).then((data) => {
                console.log('获取项目回报计划',data)
                commit('item_setRewardPlan',data);
            });
        },
        //获取项目展示投资人信息
        item_getInvestUserInfo({ commit,dispatch,state },param){
            return api.item_getInvestUserInfo(param).then((data) => {
                console.log('获取项目展示投资人信息',data)
                commit('item_setInvestUserInfo',data);
            });
        },
        //获取获取销售份额
        item_getSalesQuota({ commit,dispatch,state },param){
            return api.item_getSalesQuota(param).then((data) => {
                console.log('获取项目销售份额',data)
                commit('item_setSalesQuota',data);
            });
        },
        item_contentConfirm({ commit,dispatch,state },{param,vue}){
            return api.item_contentConfirm(param).then((data)=>{
                if(!data.success){
                    vue.$message.warning(data.information)
                }else{
                    vue.$message.success(data.information)
                }
            })
        },
        //保存项目内容确定专用
        item_updateProjectForAffrim({ commit,dispatch },{param,vue}){
            return api.item_updateProjectForAffrim(param).then((data) => {
                console.log('项目保存信息forAffrim ',data);
            });
        },
        //通过企业名称
        item_getBusinessInfo({ commit,dispatch },param){
            return api.item_getBusinessInfo(param).then((data) => {
                console.log('获取工商信息',data);
                commit('item_setBusinessInfo',data);
            });
        },
        //获取反欺诈信息
        item_getCreditAntiFraud({ commit,dispatch },param){
            return api.item_getCreditAntiFraud(param).then((data) => {
                console.log('获取欺诈信息',data);
                commit('item_setCredit',data);
            });
        },
        item_isAuthInfo({ commit,dispatch },param){
            return api.item_isAuthInfo(param).then((data) => {
                console.log('银账信息审核确定判断 返回false,还未签约。',data);
                commit('item_isAuthInfo',data);
            });
        },
        //获取是否注资申请
        item_getIsFun({commit},param){
            return api.item_getIsFun(param).then((data)=>{
                commit('item_setIsFun',data);
            })
        },
        //获取这个第三方报告
        item_getThirdReport({commit},param){
            return api.item_getThirdReport(param).then((data)=>{
                commit('item_setThirdReport',data);
            })
        },
        //获取模拟投资项目发起人
        item_getCustomerInfoForSimulation({commit},param){
            return api.item_getCustomerInfoForSimulation(param).then((data)=>{
                commit('item_setCustomerInfoForSimulation',data);
            })
        },
        //获取模投资项目行家和领投
        item_getCustomerInfo4ShowForSimulation({commit},param){
            return api.item_getCustomerInfo4ShowForSimulation(param).then((data)=>{
                if(param.type=='A'){
                    commit('item_setExportListForSimulation',data)
                }else{
                    commit('item_setLeadListForSimulation',data);
                }
            })
        }
    },
    mutations: {
        item_setExportListForSimulation(state,data){
            state.exportList={};
            state.exportList1=data;
        },
        item_setLeadListForSimulation(state,data){
            state.leadList={};
            state.leadList1=data;
        },
        item_setCustomerInfoForSimulation(state,data){
            state.customerList={};
            state.customerInfoForSimulationList=data;
        },
        item_isAuth(state,data){
            state.isAuth=data;
        },
        item_setThirdReport(state,data){
            state.thirdReport=data;
        },
        item_setIsFun(state,data){
            state.isFun=data;
        },
        item_isAuthInfo(state,data){
            state.isAuthInfo=data;
        },
        item_clear(state){
            state.show={};
            state.itemManageDetail = {};
            state.invertUserInfo=[];
            state.rewardPlan={};
            state.detailedIntroduction={};
            state.createProjectId='';//创建项目id
            state.financingPlanId='';//创建融资方案id
            state.enterpriseId='';//创建enterpriseId
            state.investorConditionId='';//创建投资人条件Id
            state.detailedIntroductionId='';//创建详细介绍id
            state.materials=[];
            state.leadAd = {};
            state.itemManageList={};
            state.investorCondition={};
            state.investedEvidence={};
            state.expertAd={};
            state.rewardPlan={};
            state.salesQuota={};
            state.businessInfo={};
            state.credit={};
            state.partnerInfo={};
            state.authInfo={};
            state.timeInfo={};
            state.financingPlanData={};
            state.resultInfo={};
        },
        item_setCredit(state,data){
            state.credit=data;
        },
        item_setBusinessInfo(state,data){
            state.businessInfo=data;
        },
        item_enterpriseMemberId(state,data){
            state.enterpriseMemberId=data;
        },
        item_setSalesQuota(state,data){
            state.salesQuota=data;
        },
        item_setClearCreateItemData(state){
            state.createProjectId=''//创建项目id
            state.financingPlanId=''//创建融资方案id
            state.enterpriseId=''//创建enterpriseId
            state.investorConditionId=''//创建投资人条件Id
            state.detailedIntroductionId=''//创建详细介绍id
        },
        item_setInvestUserInfo(state,data){
            state.invertUserInfo=data;
        },
        item_setRewardPlan(state,data){
            state.rewardPlan=data;
        },
        item_setProjectShow(state,data){
            state.show=data;
        },
        item_investorCondition(state,data){
            state.investorCondition=data;
        },
        item_setInvestedEvidence(state,data){
            state.investedEvidence=data;
        },
        item_setMaterials(state,data){
            state.materials=data;
        },
        item_setDetailedIntroduction(state,data){
            state.detailedIntroduction=data;
        },
        item_setCustomerList(state,data){
            state.customerList=data;
        },
        item_setExportList(state,data){
            state.exportList=data;
        },
        item_setLeadList(state,data){
            state.leadList=data;
        },
        item_detailedIntroductionId(state,data){
            state.detailedIntroductionId=data;
        },
        item_investorConditionId(state,data){
            state.investorConditionId=data;
        },
        item_setEnterpriseMembers(state,data){
            state.enterpriseMembers=data;
        },
        item_createEnterprise(state,data){
            state.enterpriseId=data;
        },  
        item_createFinancingPlan(state,data){
            state.financingPlanId=data;
        },
        item_createProject(state,data){
            state.createProjectId=data;
        },
        item_setResultInfo(state, data){
            state.resultInfo = data;
        },
        item_setAuthInfo(state, data){
            state.authInfo = data;
        },
        item_setTimeInfo(state, data){
            state.timeInfo = data;
        },
        item_setLeadAd(state, data){
            state.leadAd = data;
        },
        item_setExpertAd(state, data){
            state.expertAd = data;
        },
        item_setPartnerInfo(state, data) {
            state.partnerInfo = data;
        },
        item_setManageList(state, data) {
            state.itemManageList = data;
        },
        item_setHeadData(state, data) {
            state.itemManageHeadData = data;
        },
        item_setManageDetail(state, data) {
            state.itemManageDetail = data;
        },
        item_setFinancingPlan(state, data) {
            state.financingPlanData = data;
        },
    }
}