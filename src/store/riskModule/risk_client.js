/**
   * 本方法仅在/api-for-client文件中调用，传入外部vue对象
   * 
   * @param Vue 实例
   */
module.exports=function client(Vue){
    return {
      risk_getList: (param) => {
        return Vue.http.post('risk_getList',param).then(response => {
          return response.body;
        });
      },
      risk_getHistoryList:(param)=>{
        return Vue.http.post('risk_getHistoryList',param).then(response => {
          return response.body;
        });
      },
      risk_historyDetail:(param)=>{
        return Vue.http.post('risk_historyDetail',param).then(response => {
          return response.body;
        });
      },
      risk_saveHandle:(param)=>{
        return Vue.http.post('risk_saveHandle',param).then(response => {
          return response.body;
        });
      },
      risk_getPerson:(param)=>{
        return Vue.http.post('risk_getPerson',param).then(response => {
          return response.body;
        });
      },
      risk_getRiskIndexList:(param)=>{
        return Vue.http.post('risk_getRiskIndexList',param).then(response => {
          return response.body;
        });
      },
      risk_saveFinalHandle:(param)=>{
        return Vue.http.post('risk_saveFinalHandle',param).then(response => {
          return response.body;
        });
      },
      risk_getFactors:(param)=>{
        return Vue.http.post('risk_getFactors',param).then(response=>{
          return response.body;
        })
      },
      risk_getRelations:(param)=>{
        return Vue.http.post('risk_getRelations',param).then(response=>{
          return response.body;
        })
      },
      risk_addRiskIndex:(param)=>{
        return Vue.http.post('risk_addRiskIndex',param).then(response=>{
          return response.body;
        })
      },
      risk_selectRiskCategory:(param)=>{
        return Vue.http.post('risk_selectRiskCategory',param).then(response=>{
          return response.body;
        })
      },
      risk_selectRiskInfo:(param)=>{
        return Vue.http.post('risk_selectRiskInfo',param).then(response=>{
          return response.body;
        })
      },
      risk_updateRiskInfo:(param)=>{
        return Vue.http.post('risk_updateRiskInfo',param).then(response=>{
          return response.body;
        })
      },
      risk_addRiskRuleGroup:(param)=>{
        return Vue.http.post('risk_addRiskRuleGroup',param).then(response=>{
          return response.body;
        })
      },
      risk_addRiskRuleInfo:(param)=>{
        return Vue.http.post('risk_addRiskRuleInfo',param).then(response=>{
          return response.body;
        })
      },
      risk_updateRiskRuleInfo:(param)=>{
        return Vue.http.post('risk_updateRiskRuleInfo',param).then(response=>{
          return response.body;
        })
      },
      risk_deleteRiskRuleInfo:(param)=>{
        return Vue.http.post('risk_deleteRiskRuleInfo',param).then(response=>{
          return response.body;
        })
      },
      risk_getOne:(param)=>{
        return Vue.http.post('risk_getOne',param).then(response=>{
          return response.body;
        })
      },
      risk_selectRiskWarningById:(param)=>{
        return Vue.http.post('risk_selectRiskWarningById',param).then(response=>{
          return response.body;
        })
      },
      risk_deleteRiskInfo:(param)=>{
        return Vue.http.post('risk_deleteRiskInfo',param).then(response=>{
          return response.body;
        })
      },
      risk_addGlobRiskForProject:(param)=>{
        return Vue.http.post('risk_addGlobRiskForProject',param).then(response=>{
          return response.body;
        })
      },
      risk_selectProjectRiskRule:(param)=>{
        return Vue.http.post('risk_selectProjectRiskRule',param).then(response=>{
          return response.body;
        })
      },
      risk_selectPageRiskCategory:(param)=>{
        return Vue.http.post('risk_selectPageRiskCategory',param).then(response=>{
          return response.body;
        })
      },
      addWarningForEnterpriseMemberChange:(param)=>{
        return Vue.http.post('addWarningForEnterpriseMemberChange',param).then(response=>{
          return response.body;
        })
      },
      selectPageRiskMemberChange:(param)=>{
        return Vue.http.post('selectPageRiskMemberChange',param).then(response=>{
          return response.body;
        })
      }
    } 
}