/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */


let api=[
	'item_getManageList',
	'item_getHeadData',
	'item_getManageDetail',
	'item_getProjectShow',
	'item_getFinancingPlan',
	'item_getPartnerInfo',
	'item_getExpertAd',
	'item_getLeadAd',
	'item_getTimeInfo',
	'item_getAuthInfo',
	'item_getResultInfo',
	'item_updateTimeInfo',
	'item_updatePartnerInfo',
	'item_createPartnerInfo',
	'item_updateAuthInfo',
	'item_setResultInfo',
	'item_reset',
	'item_lend',
	'item_authInfo',
	'item_createProject',
	'item_updateProject',
	'item_createFinancingPlan',
	'item_createInvestedEvidence',
	'item_createEnterprise',
	'item_updateEnterprise',
	'item_createEnterpriseMember',
	'item_updateEnterpriseMember',
	'item_updateEnterpriseMemberStatusById',
	'item_updateFinancingPlan',
	'item_createInvestorCondition',
	'item_selectInvestorConditionByFinId',
	'item_updateInvestorCondition',
	'item_deleteInvestedEvidence',
	'item_createDetailedIntroduction',
	'item_getPersons',
	'item_createMaterial',
	'item_deleteMaterialByFinId',
	'item_selectMaterialByProjectId',
	'item_getInvestedEvidence',
	'item_getCustomerList',
	'item_getDetailedIntroduction',
	'item_getRewardPlan',
	'item_getInvestUserInfo',
	'item_getSalesQuota',
	'item_contentConfirm',
	'item_getBusinessInfo',
	'item_getCreditAntiFraud',
	'item_isAuthInfo',
	'item_getIsFun',
	'item_getThirdReport',
	'item_getCustomerInfoForSimulation',
	'item_updateEnterpriseRepresentative',
	'item_updateTimeInfoNew',
	'item_getMerchant',
	'item_addMerchant',
	'item_editMerchant',
	'item_deleteMerchant',
	'item_deleteItem',
	'item_checkDeposit',
	'item_addProjectChannel',
	'item_getProjectChannel',
	'item_updateDetailedIntroduction',
	'item_updateProjectForAffrim',
	'obtainContracts',
	'modifyContractInformation',
	'removeContract',
	'item_getCustomerInfo4ShowForSimulation'
]

function getPostResponse(vue,apiName,param){
	if(!param){
		return vue.http.get(apiName).then(response => response.body)
	}else{
		return vue.http.post(apiName,param).then(response => response.body)
	}
}

module.exports=function client(Vue){
	let clientApi={};
	for (let i = 0; i < api.length; i++) {
		const element = api[i];
		clientApi[element]=(param)=>getPostResponse(Vue,element,param)
	}
	return clientApi;
}

