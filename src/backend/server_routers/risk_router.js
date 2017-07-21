/**
   * 本方法仅在/backend/process文件中调用，传入外部环境参数
   * 
   * @param passport 通行证key
   * @param router node路由器
   * @param sc 协议发送端
   */
  module.exports=function client(router,sc,passport){
        router.all('/risk_getList', function (req, res, next) {
            console.log(req.body+'=>client data');
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "selectRiskProjectList", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [
                param.industry,
                param.regionCode,
                param.keyword,
                param.level,
                param.projectId,
                param.pageNo,
                param.pageSize
            ];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/risk_getOne', function (req, res, next) {
            console.log(req.body+'=>client data');
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "selectRiskProjectList", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [
                param.industry,
                param.regionCode,
                param.keyword,
                param.level,
                param.projectId,
                1,
                1
            ];
            sc.send(stuff).then((resp) =>{
                if(resp.object&&resp.object.list){
                    res.json(resp.object.list[0])
                }else{
                    res.json(null);
                }
            });
        });
        router.all('/risk_getHistoryList', function (req, res, next) {
            console.log(req.body+'=>client data');
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "selectRiskWarningByProjectId", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [
                param.projectId,
                'B',
                param.pageNo, 
                param.pageSize
            ];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/risk_historyDetail', function (req, res, next) {
            console.log(req.body+'=>client data');
            let param=req.body;
            const stuff = sc.instanceRequest("RiskOperateTask", "selectRiskOperateList", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [
                param.riskProjectId
            ];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/risk_getRiskIndexList', function (req, res, next) {
            console.log(req.body+'=>client data');
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "selectRiskWarningByProjectId", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [
                param.projectId,
                'A', 
                param.pageNo, 
                param.pageSize
            ];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        
        router.all('/risk_saveHandle', function (req, res, next) {
            console.log(JSON.stringify(req.body)+'=>client data');
            let param=req.body;
            const stuff = sc.instanceRequest("RiskOperateTask", "addRiskOperate", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[
                param.riskId,
                param.operateId,
                param.situationExplan,
                param.status,
                param.sendContent,
                param.sendPerson
            ]
            sc.send(stuff).then((resp) =>{
                console.log(JSON.stringify(resp));
                res.json(resp)
            });
        });
        router.all('/risk_saveFinalHandle', function (req, res, next) {
            console.log(req.body+'=>client data');
            let param=req.body;
            const stuff = sc.instanceRequest("RiskOperateTask", "updateRiskOperate", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[
                param.id,
                param.operateId,
                param.followSituation,
                param.finalSuggestion
            ]
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        
        router.all('/risk_getPerson', function (req, res, next) {
            console.log(req.body+'=>client data');
            let param=req.body;
            let resp1={},resp2={};
            let task1=false,task2=false;
            const stuff = sc.instanceRequest("ProjectExposeTask", "selectActorInfoByProId", "projectManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.projectId];
            sc.send(stuff).then((resp) =>{
                resp1=resp.object;
                task1=true;
                if(task2){
                    res.json({resp1:resp1,resp2:resp2});
                };
            })
            const stuff2 = sc.instanceRequest("DealManageTask", "getInvestUserInfo", "dealManage");
            stuff2.auxiliary = {[passport]: req.session.passport};
            stuff2.items = [param.projectId];
            sc.send(stuff2).then((resp) =>{
                resp2=resp.object;
                task2=true;
                if(task1){
                    res.json({resp1:resp1,resp2:resp2});
                };
            });
        });
        //获取创建风险指标的因子
        router.all('/risk_getFactors', function (req, res, next) {
            const stuff = sc.instanceRequest("RiskTask", "selectListRiskFactorInfo", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[]
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //添加风险指标
        router.all('/risk_addRiskIndex',function(req, res, next){
            let param=req.body;
            if(param.projectId){
                const stuff2=sc.instanceRequest("RiskTask", "addRiskInfoForProject", "riskManage");
                stuff2.auxiliary = {[passport]: req.session.passport};
                stuff2.items=[param.projectId,param.risk,param.riskRuleGroup];
                sc.send(stuff2).then((resp)=>{
                    res.json(resp.head);
                })
            }else{
                const stuff1 = sc.instanceRequest("RiskTask", "addRiskInfo", "riskManage");
                stuff1.items=[param.risk,param.riskRuleGroup];
                stuff1.auxiliary = {[passport]: req.session.passport};
                sc.send(stuff1).then((resp)=>{
                    res.json(resp.head);
                })
            }
        });
        //根据项目id查询风险域指标信息
        router.all('/risk_selectRiskCategory',function(req, res, next){
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "selectRiskCategory", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[param.id||''];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //根据风险指标查询指标详细信息
        router.all('/risk_selectRiskInfo',function(req, res, next){
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "selectRiskInfo", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[param.id];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //修改风险
        router.all('/risk_updateRiskInfo',function(req, res, next){
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "updateRiskInfo", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[param];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        //新增规则组及其所包含规则
        router.all('/risk_addRiskRuleGroup',function(req, res, next){
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "addRiskRuleGroup", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[param.riskId,param.riskRuleGroupList];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        //规则组下新增规则
        router.all('/risk_addRiskRuleInfo',function(req, res, next){
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "addRiskRuleInfo", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[param.groupId,param.riskRuleInfoList];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        //修改规则
        router.all('/risk_updateRiskRuleInfo',function(req, res, next){
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "updateRiskRuleInfo", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[param];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        //删除规则
        router.all('/risk_deleteRiskRuleInfo',function(req, res, next){
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "deleteRiskRuleInfo", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[param.id];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        //查看预警信息详情
        router.all('/risk_selectRiskWarningById',function(req, res, next){
            let param=req.body;
            const stuff = sc.instanceRequest("RiskTask", "selectRiskWarningById", "riskManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items=[param.id];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
    }
