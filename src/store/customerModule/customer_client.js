/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
module.exports=function client(Vue){
    return {
      customer_getList: (param) => {
        return Vue.http.post('customer_getList',param).then(response => {
          return response.body;
        });
      },
      expertAudit_getList: (param) => {
        return Vue.http.post('expertAudit_getList',param).then(response => {
          return response.body;
        });
      },
      expertAudit_adopt: (param) => {
        return Vue.http.post('expertAudit_adopt',param).then(response => {
          return response.body;
        });
      },
      expertAudit_refuse: (param) => {
        return Vue.http.post('expertAudit_refuse',param).then(response => {
          return response.body;
        });
      },
      leadAudit_getList: (param) => {
        return Vue.http.post('leadAudit_getList',param).then(response => {
          return response.body;
        });
      },
      leadAudit_adopt: (param) => {
        return Vue.http.post('leadAudit_adopt',param).then(response => {
          return response.body;
        });
      },
      leadAudit_refuse: (param) => {
        return Vue.http.post('leadAudit_refuse',param).then(response => {
          return response.body;
        });
      },
      add_actor: (param) => {
        return Vue.http.post('add_actor',param).then(response => {
          return response.body;
        });
      },
      add_customer: (param) => {
        return Vue.http.post('add_customer',param).then(response => {
          return response.body;
        });
      },
      update_customer: (param) => {
        return Vue.http.post('update_customer',param).then(response => {
          return response.body;
        });
      },
      customer_statistics: (param) => {
        return Vue.http.post('customer_statistics',param).then(response => {
          return response.body;
        });
      },
      customerInfoByCustomerId: (param) => {
        return Vue.http.post('customerInfoByCustomerId',param).then(response => {
          return response.body;
        });
      },
      customerInfoByActorId: (param) => {
        return Vue.http.post('customerInfoByActorId',param).then(response => {
          return response.body;
        });
      },
      enterpriseInfoByActorId: (param) => {
        return Vue.http.post('enterpriseInfoByActorId',param).then(response => {
          return response.body;
        });
      },
      add_enterpriseInfo: (param) => {
        return Vue.http.post('add_enterpriseInfo',param).then(response => {
          return response.body;
        });
      },
      update_enterpriseInfo: (param) => {
        return Vue.http.post('update_enterpriseInfo',param).then(response => {
          return response.body;
        });
      },
      postalAddressByActorId: (param) => {
        return Vue.http.post('postalAddressByActorId',param).then(response => {
          return response.body;
        });
      },
      add_postalAddress: (param) => {
        return Vue.http.post('add_postalAddress',param).then(response => {
          return response.body;
        });
      },
      update_postalAddress: (param) => {
        return Vue.http.post('update_postalAddress',param).then(response => {
          return response.body;
        });
      },
      delete_postalAddress: (param) => {
        return Vue.http.post('delete_postalAddress',param).then(response => {
          return response.body;
        });
      },
      updateLoginPassword: (param) => {
        return Vue.http.post('updateLoginPassword',param).then(response => {
          return response.body;
        });
      },
      resetLoginPwById: (param) => {
        return Vue.http.post('resetLoginPwById',param).then(response => {
          return response.body;
        });
      },
      updateMobileAndEmailById: (param) => {
        return Vue.http.post('updateMobileAndEmailById',param).then(response => {
          return response.body;
        });
      },
      updatePayPassword: (param) => {
        return Vue.http.post('updatePayPassword',param).then(response => {
          return response.body;
        });
      },
      realNameVaildate: (param) => {
        return Vue.http.post('realNameVaildate',param).then(response => {
          return response.body;
        });
      },
      expertVaildate: (param) => {
        return Vue.http.post('expertVaildate',param).then(response => {
          return response.body;
        });
      },
      updateExpert: (param) => {
        return Vue.http.post('updateExpert',param).then(response => {
          return response.body;
        });
      },
      personalLeadVaildate: (param) => {
        return Vue.http.post('personalLeadVaildate',param).then(response => {
          return response.body;
        });
      },
      updatePersonalLead: (param) => {
        return Vue.http.post('updatePersonalLead',param).then(response => {
          return response.body;
        });
      },
      organizationLeadVaildate: (param) => {
        return Vue.http.post('organizationLeadVaildate',param).then(response => {
          return response.body;
        });
      },
      updateOrganizationLead: (param) => {
        return Vue.http.post('updateOrganizationLead',param).then(response => {
          return response.body;
        });
      },
      investorVaildate: (param) => {
        return Vue.http.post('investorVaildate',param).then(response => {
          return response.body;
        });
      },
      investorByActorId: (param) => {
        return Vue.http.post('investorByActorId',param).then(response => {
          return response.body;
        });
      },
      expertByActorId: (param) => {
        return Vue.http.post('expertByActorId',param).then(response => {
          return response.body;
        });
      },
      leadByActorId: (param) => {
        return Vue.http.post('leadByActorId',param).then(response => {
          return response.body;
        });
      },
      getQuestionnaire: (param) => {
        return Vue.http.post('getQuestionnaire',param).then(response => {
          return response.body;
        });
      },

    } 
}