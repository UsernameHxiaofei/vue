/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
module.exports=function client(Vue){
    return {
      item_getManageList: (param) => {
        return Vue.http.post('item_getManageList',param).then(response => {
          return response.body;
        });
      },
      item_getHeadData: () => {
        return Vue.http.get('item_getHeadData').then(response => {
          return response.body;
        });
      },
      item_getManageDetail: (param) => {
        return Vue.http.post('item_getManageDetail',param).then(response => {
          return response.body;
        });
      },
      item_getProjectShow:(param) =>{
        return Vue.http.post('item_getProjectShow',param).then(response => {
          return response.body;
        });
      },
      item_getFinancingPlan: (param) => {
        return Vue.http.post('item_getFinancingPlan',param).then(response => {
          return response.body;
        });
      },
      item_getPartnerInfo:(param) => {
        return Vue.http.post('item_getPartnerInfo',param).then(response => {
          return response.body;
        });
      },
      item_getExpertAd:(param) => {
        return Vue.http.post('item_getExpertAd',param).then(response => {
          return response.body;
        });
      },
      item_getLeadAd:(param) => {
        return Vue.http.post('item_getLeadAd',param).then(response => {
          return response.body;
        });
      },
      item_getTimeInfo:(param) => {
        return Vue.http.post('item_getTimeInfo',param).then(response => {
          return response.body;
        });
      },
      item_getAuthInfo:(param) => {
        return Vue.http.post('item_getAuthInfo',param).then(response => {
          return response.body;
        });
      },
      item_getResultInfo:(param) => {
        return Vue.http.post('item_getResultInfo',param).then(response => {
          return response.body;
        });
      },
      item_updateTimeInfo:(param) => {
        return Vue.http.post('item_updateTimeInfo',param).then(response => {
          return response.body;
        });
      },
      item_updatePartnerInfo:(param) => {
        return Vue.http.post('item_updatePartnerInfo',param).then(response => {
          return response.body;
        });
      },
      item_createPartnerInfo:(param) => {
        return Vue.http.post('item_createPartnerInfo',param).then(response => {
          return response.body;
        });
      },
      item_updateAuthInfo:(param) => {
        return Vue.http.post('item_updateAuthInfo',param).then(response => {
          return response.body;
        });
      },
      item_setResultInfo:(param) => {
        return Vue.http.post('item_setResultInfo',param).then(response => {
          return response.body;
        });
      },
      item_reset:(param) => {
        return Vue.http.post('item_reset',param).then(response => {
          return response.body;
        });
      },
      item_lend:(param) => {
        return Vue.http.post('item_lend',param).then(response => {
          return response.body;
        })
      },
      item_authInfo:(param) => {
        return Vue.http.post('item_authInfo',param).then(response => {
          return response.body;
        })
      },
      item_createProject:(param) => {
        return Vue.http.post('item_createProject',param).then(response => {
          return response.body;
        })
      },
      item_updateProject:(param) => {
        return Vue.http.post('item_updateProject',param).then(response => {
          return response.body;
        })
      },
      item_createFinancingPlan:(param) => {
        return Vue.http.post('item_createFinancingPlan',param).then(response => {
          return response.body;
        })
      },
      item_createInvestedEvidence:(param)=>{
        return Vue.http.post('item_createInvestedEvidence',param).then(response => {
          return response.body;
        })
      },
      item_createEnterprise:(param)=>{
        return Vue.http.post('item_createEnterprise',param).then(response => {
          return response.body;
        })
      },
      item_updateEnterprise:(param)=>{
        return Vue.http.post('item_updateEnterprise',param).then(response => {
          return response.body;
        })
      },
      item_createEnterpriseMember:(param)=>{
        return Vue.http.post('item_createEnterpriseMember',param).then(response => {
          return response.body;
        })
      },
      item_updateEnterpriseMember:(param)=>{
        return Vue.http.post('item_updateEnterpriseMember',param).then(response => {
          return response.body;
        })
      },
      item_updateEnterpriseMemberStatusById:(param)=>{
        return Vue.http.post('item_updateEnterpriseMemberStatusById',param).then(response => {
          return response.body;
        })
      },
      item_updateFinancingPlan:(param)=>{
        return Vue.http.post('item_updateFinancingPlan',param).then(response => {
          return response.body;
        })
      },
      item_createInvestorCondition:(param)=>{
        return Vue.http.post('item_createInvestorCondition',param).then(response => {
          return response.body;
        })
      },
      item_selectInvestorConditionByFinId:(param)=>{
        return Vue.http.post('item_selectInvestorConditionByFinId',param).then(response => {
          return response.body;
        })
      },
      item_updateInvestorCondition:(param)=>{
        return Vue.http.post('item_updateInvestorCondition',param).then(response => {
          return response.body;
        })
      },
      item_deleteInvestedEvidence:(param)=>{
        return Vue.http.post('item_deleteInvestedEvidence',param).then(response => {
          return response.body;
        })
      },
      item_createDetailedIntroduction:(param)=>{
        return Vue.http.post('item_createDetailedIntroduction',param).then(response => {
          return response.body;
        })
      },
      item_updateDetailedIntroduction:(param)=>{
        return Vue.http.post('item_updateDetailedIntroduction',param).then(response => {
          return response.body;
        })
      },
      item_getPersons:(param)=>{
        return Vue.http.post('item_getPersons',param).then(response => {
          return response.body;
        })
      },
      item_createMaterial:(param)=>{
        return Vue.http.post('item_createMaterial',param).then(response => {
          return response.body;
        })
      },
      item_deleteMaterialByFinId:(param)=>{
        return Vue.http.post('item_deleteMaterialByFinId',param).then(response => {
          return response.body;
        })
      },
      item_selectMaterialByProjectId:(param)=>{
        return Vue.http.post('item_selectMaterialByProjectId',param).then(response => {
          return response.body;
        })
      },
      item_getInvestedEvidence(param){
        return Vue.http.post('item_getInvestedEvidence',param).then(response => {
          return response.body;
        })
      },
      item_getCustomerList:(param)=>{
        return Vue.http.post('item_getCustomerList',param).then(response => {
          return response.body;
        })
      },
      item_getDetailedIntroduction:(param)=>{
        return Vue.http.post('item_getDetailedIntroduction',param).then(response => {
          return response.body;
        })
      },
      item_getRewardPlan:(param)=>{
        return Vue.http.post('item_getRewardPlan',param).then(response => {
          return response.body;
        })
      },
      item_getInvestUserInfo:(param)=>{
        return Vue.http.post('item_getInvestUserInfo',param).then(response =>{
          return response.body;
        })
      },
      item_getSalesQuota:(param)=>{
        return Vue.http.post('item_getSalesQuota',param).then(response =>{
          return response.body;
        })
      },
      item_contentConfirm:(param)=>{
        return Vue.http.post('item_contentConfirm',param).then(response =>{
          return response.body;
        })
      },
      item_updateProjectForAffrim:(param)=>{
        return Vue.http.post('item_updateProjectForAffrim',param).then(response =>{
          return response.body;
        })
      },
      item_getBusinessInfo:(param)=>{
        return Vue.http.post('item_getBusinessInfo',param).then(response =>{
          return response.body;
        })
      },
      item_getCreditAntiFraud:(param)=>{
        return Vue.http.post('item_getCreditAntiFraud',param).then(response =>{
          return response.body;
        })
      },
      item_isAuthInfo:(param)=>{
        return Vue.http.post('item_isAuthInfo',param).then(response =>{
          return response.body;
        })
      },
      item_getIsFun:(param)=>{
        return Vue.http.post('item_getIsFun',param).then(response =>{
          return response.body;
        })
      },
      item_getThirdReport:(param)=>{
        return Vue.http.post('item_getThirdReport',param).then(response =>{
          return response.body;
        })
      },
      item_getCustomerInfoForSimulation:(param)=>{
        return Vue.http.post('item_getCustomerInfoForSimulation',param).then(response =>{
          return response.body;
        })
      },
      item_getCustomerInfo4ShowForSimulation:(param)=>{
        return Vue.http.post('item_getCustomerInfo4ShowForSimulation',param).then(response =>{
          return response.body;
        })
      },
      item_updateEnterpriseRepresentative:(param)=>{
        return Vue.http.post('item_updateEnterpriseRepresentative',param).then(response=>{
          return response.body;
        })
      },
      item_updateTimeInfoNew:(param)=>{
        return Vue.http.post('item_updateTimeInfoNew',param).then(response=>{
          return response.body;
        })
      },
      item_getMerchant:(param)=>{
        return Vue.http.post('item_getMerchant',param).then(response=>{
          return response.body;
        })
      },
      item_addMerchant:(param)=>{
        return Vue.http.post('item_addMerchant',param).then(response=>{
          return response.body;
        })
      },
      item_editMerchant:(param)=>{
        return Vue.http.post('item_editMerchant',param).then(response=>{
          return response.body;
        })
      },
      item_deleteItem:(param)=>{
        return Vue.http.post('item_deleteItem',param).then(response=>{
          return response.body;
        })
      },
      item_checkDeposit:(param)=>{
        return Vue.http.post('item_checkDeposit',param).then(response=>{
          return response.body;
        })
      },
    } 
}

