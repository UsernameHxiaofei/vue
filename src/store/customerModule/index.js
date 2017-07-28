import { api } from 'api';

export const customerModule = {
    state: {
        customerListData: [],
        expertAuditList: [],
        expertAuditAdoptData:'',
        expertAuditRefuseData:'',
        leadAuditAdoptData:'',
        leadAuditRefuseData:'',
        leadAuditList: [],
        customerStatistics: {},
        customerInfoByCustomerId:{},
        customerInfoByActorId:{},
        enterpriseInfoByActorId:{},
        actorData:{},
        customerData:{},
        customerUpdate:'',
        postalAddressList:[],
        loginPasswordStatus:'',
        resetLoginPasswordStatus:'',
        updateMobileAndEmailByIdStatus:'',
        enterpriseInfoAdd:'',
        enterpriseInfoUpdate:'',
        postalAddressAdd:'',
        postalAddressUpdate:'',
        postalAddressDelete:'',
        payPasswordUpdate:'',
        nameVaildate:'',
        expertVaildateStatus:'',
        updateExpertStatus:'',
        personalLeadVaildateStatus:'',
        updatePersonalLeadStatus:'',
        organizationLeadVaildateStatus:'',
        updateOrganizationLeadStatus:'',
        investorVaildateStatus:'',
        investorData:'',
        expertData:'',
        leadData:'',
        questionnaire:{},
    },
    actions: {
        //客户信息维护列表
        customer_getList({ commit },param) {
          return  api.customer_getList(param).then((data) => {
                commit("customer_setList",data);
            });
        },
        //新增客户账号信息      
        add_actor({ commit },param) {
           return api.add_actor(param).then((data) => {
                commit("customer_setActorData",data);
            });
        },
        //新增客户信息      
        add_customer({ commit },param) {
           return api.add_customer(param).then((data) => {
                commit("customer_setData",data);
            });
        },
        //更新客户信息      
        update_customer({ commit },param) {
           return api.update_customer(param).then((data) => {
                commit("customer_update",data);
            });
        },
        //查询客户企业信息
        enterpriseInfoByActorId({ commit },param) {
           return api.enterpriseInfoByActorId(param).then((data) => {
                commit("enterpriseInfo_getData",data);
            });
        },
        //新增企业信息
        add_enterpriseInfo({ commit },param) {
           return api.add_enterpriseInfo(param).then((data) => {
                commit("enterpriseInfo_add",data);
            });
        },
        //编辑企业信息
        update_enterpriseInfo({ commit },param) {
           return api.update_enterpriseInfo(param).then((data) => {
                commit("enterpriseInfo_update",data);
            });
        },
        
        //查询客户邮政地址信息
        postalAddressByActorId({ commit },param) {
           return api.postalAddressByActorId(param).then((data) => {
                commit("postalAddress_getData",data);
            });
        },
        //添加客户邮政地址信息
        add_postalAddress({ commit },param) {
           return api.add_postalAddress(param).then((data) => {
                commit("postalAddress_add",data);
            });
        },
        //修改客户邮政地址信息
        update_postalAddress({ commit },param) {
           return api.update_postalAddress(param).then((data) => {
                commit("postalAddress_update",data);
            });
        },
        //删除客户邮政地址信息
        delete_postalAddress({ commit },param) {
           return api.delete_postalAddress(param).then((data) => {
                commit("postalAddress_delete",data);
            });
        },
                //修改客户登录密码
        updateLoginPassword({ commit },param) {
           return api.updateLoginPassword(param).then((data) => {
                commit("updateLoginPassword_getStatus",data);
            });
        },
        //重置客户登录密码
        resetLoginPwById({ commit },param) {
           return api.resetLoginPwById(param).then((data) => {
                commit("resetLoginPwById_getStatus",data);
            });
        },
        //修改客户手机和email
        updateMobileAndEmailById({ commit },param) {
           return api.updateMobileAndEmailById(param).then((data) => {
                commit("updateMobileAndEmailById_getStatus",data);
            });
        },
        //修改客户支付密码
        updatePayPassword({ commit },param) {
           return api.updatePayPassword(param).then((data) => {
                commit("payPassword_update",data);
            });
        },
        //实名认证
        realNameVaildate({ commit },param) {
           return api.realNameVaildate(param).then((data) => {
                commit("realName_vaildate",data);
            });
        },
        //行家认证
        expertVaildate({ commit },param) {
           return api.expertVaildate(param).then((data) => {
                commit("expert_vaildate",data);
            });
        },
        //行家认证修改
        updateExpert({ commit },param) {
           return api.updateExpert(param).then((data) => {
                commit("update_expert",data);
            });
        },
        //个人领投认证
        personalLeadVaildate({ commit },param) {
           return api.personalLeadVaildate(param).then((data) => {
                commit("personalLead_vaildate",data);
            });
        },
        //个人领投认证修改
        updatePersonalLead({ commit },param) {
           return api.updatePersonalLead(param).then((data) => {
                commit("update_personalLead",data);
            });
        },
        //机构领投认证
        organizationLeadVaildate({ commit },param) {
           return api.organizationLeadVaildate(param).then((data) => {
                commit("organizationLead_vaildate",data);
            });
        },
        //机构领投认证修改
        updateOrganizationLead({ commit },param) {
           return api.updateOrganizationLead(param).then((data) => {
                commit("update_organizationLead",data);
           });
        },
        //投资人认证
        investorVaildate({ commit },param) {
           return api.investorVaildate(param).then((data) => {
                commit("investor_vaildate",data);
            });
        },


        //行家审核列表
        expertAudit_getList({ commit },param) {
           return api.expertAudit_getList(param).then((data) => {
                commit("expertAudit_setList",data);
            });
        },
        //行家审核 通过
        expertAudit_adopt({ commit },param) {
           return api.expertAudit_adopt(param).then((data) => {
                commit("expertAudit_adoptData",data);
            });
        },
        //行家审核 拒绝
        expertAudit_refuse({ commit },param) {
           return api.expertAudit_refuse(param).then((data) => {
                commit("expertAudit_refuseData",data);
            });
        },
        //领投审核列表
        leadAudit_getList({ commit },param) {
           return api.leadAudit_getList(param).then((data) => {
                commit("leadAudit_setList",data);
            });
        },
        //领投审核通过
        leadAudit_adopt({ commit },param) {
           return api.leadAudit_adopt(param).then((data) => {
                commit("leadAudit_adoptData",data);
            });
        },
        //领投审核拒绝
        leadAudit_refuse({ commit },param) {
           return api.leadAudit_refuse(param).then((data) => {
                commit("leadAudit_refuseData",data);
            });
        },
        //首页客户统计
        customer_statistics({ commit },param) {
          return  api.customer_statistics(param).then((data) => {
                commit("customer_statistics_setData",data);
            });
        },
        //客户信息customerId查询
        customerInfoByCustomerId({ commit },param) {
          return  api.customerInfoByCustomerId(param).then((data) => {
                commit("customerInfoByCustomerId_setData",data);
            });
        },
         //客户信息actorId查询
        customerInfoByActorId({ commit },param) {
          return  api.customerInfoByActorId(param).then((data) => {
                commit("customerInfoByActorId_setData",data);
            });
        },
        //actorId 投资人查询
        investorByActorId({ commit },param) {
          return  api.investorByActorId(param).then((data) => {
                commit("investorByActorId_setData",data);
            });
        },
        //actorId 行家查询
        expertByActorId({ commit },param) {
          return  api.expertByActorId(param).then((data) => {
                commit("expertByActorId_setData",data);
            });
        },
        //actorId 领投人查询
        leadByActorId({ commit },param) {
          return  api.leadByActorId(param).then((data) => {
                commit("leadByActorId_setData",data);
            });
        },
        //actorId 领投人查询
        getQuestionnaire({ commit },param) {
          return  api.getQuestionnaire(param).then((data) => {
                commit("customer_setQuestionnaire",data);
            });
        },
    },
    mutations: {
        customer_setList(state, data) {
            state.customerListData = data;
        },
        expertAudit_setList(state, data) {
            state.expertAuditList = data;
        },
        expertAudit_adoptData(state, data) {
            state.expertAuditAdoptData = data;
        },
        expertAudit_refuseData(state, data) {
            state.expertAuditRefuseData = data;
        },
        leadAudit_setList(state, data) {
            state.leadAuditList = data;
        },
        leadAudit_adoptData(state, data) {
            state.leadAuditAdoptData = data;
        },
        leadAudit_refuseData(state, data) {
            state.leadAuditRefuseData = data;
        },
        customer_setActorData(state,data){
            state.actorData = data;
        },
        customer_setData(state,data){
            state.customerData = data;
        },
        customer_update(state,data){
            state.customerUpdate = data;
        },
        enterpriseInfo_getData(state,data){
            state.enterpriseInfoByActorId = data;
        },
        enterpriseInfo_add(state,data){
            state.enterpriseInfoAdd = data;
        },
        enterpriseInfo_update(state,data){
            state.enterpriseInfoUpdate = data;
        },
        postalAddress_getData(state,data){
            state.postalAddressList = data;
        },
        postalAddress_add(state,data){
            state.postalAddressAdd = data;
        },
        postalAddress_update(state,data){
            state.postalAddressUpdate = data;
        },
        postalAddress_delete(state,data){
            state.postalAddressDelete = data;
        },
        updateLoginPassword_getStatus(state,data){
            state.loginPasswordStatus = data;
        },
        resetLoginPwById_getStatus(state,data){
            state.resetLoginPasswordStatus = data;
        },
        updateMobileAndEmailById_getStatus(state,data){
            state.updateMobileAndEmailByIdStatus = data;
        },
        payPassword_update(state,data){
            state.payPasswordUpdate = data;
        },
        realName_vaildate(state,data){
            state.nameVaildate = data;
        },
        expert_vaildate(state,data){
            state.expertVaildateStatus = data;
        },
        update_expert(state,data){
            state.updateExpertStatus = data;
        },
        personalLead_vaildate(state,data){
            state.personalLeadVaildateStatus = data;
        },
        update_personalLead(state,data){
            state.updatePersonalLeadStatus = data;
        },
        organizationLead_vaildate(state,data){
            state.organizationLeadVaildateStatus = data;
        },
        update_organizationLead(state,data){
            state.updateOrganizationLeadStatus = data;
        },
        investor_vaildate(state,data){
            state.investorVaildateStatus = data;
        },
        customer_statistics_setData(state,data){
            state.customerStatistics = data;
        },
        customerInfoByCustomerId_setData(state,data){
            state.customerInfoByCustomerId = data;
        },
        customerInfoByActorId_setData(state,data){
            state.customerInfoByActorId = data;
        },
        investorByActorId_setData(state,data){
            state.investorData = data;
        },
        expertByActorId_setData(state,data){
            state.expertData = data;
        },
        leadByActorId_setData(state,data){
            state.leadData = data;
        },
        customer_setQuestionnaire(state,data){
            state.questionnaire = data;
        },
    }
}