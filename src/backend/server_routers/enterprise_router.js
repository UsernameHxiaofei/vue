/**
   * 本方法仅在/backend/process文件中调用，传入外部环境参数
   * 
   * @param router node路由器
   * @param sc 协议发送端
   */
  module.exports=function client(router,sc,passport){
        router.all('/enterprise_getManageList', function (req, res, next) {//分页方法
            let param=req.body;
            const stuff = sc.instanceRequest("EnterpriseTask", "selectPageByCondition", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [
                param.beginTime,
                param.endTime,
                param.addressCode,
                param.keyword,
                param.pageSize,
                param.pageNo
            ];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/enterprise_getInfo', function (req, res, next) {//获取企业详情
            let param=req.body;
            const stuff = sc.instanceRequest("EnterpriseTask", "selectEnterpriseById", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.id];
            sc.send(stuff).then((resp) =>{
                res.json(resp.object);
            });
        });
        router.all('/enterprise_getMemberInfo', function (req, res, next) {//获取企业成员信息
            let param=req.body;
            const stuff = sc.instanceRequest("EnterpriseMemberTask", "selectByEnterpriseId", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.id];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/enterprise_getAccountDetail', function (req, res, next) {//获取企业账户信息
            let param=req.body;
            const stuff = sc.instanceRequest("EnterpriseAccountDetailTask", "selectAccountDetailByEnterprisetId", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.id,param.beginTime,param.endTime,param.pageNo,param.pageSize];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/enterprise_selectListDayAmount', function (req, res, next) {//获取账户流水
            let param=req.body;
            const stuff = sc.instanceRequest("EnterpriseAccountDetailTask", "selectListDayAmount", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [
                param.type,
                param.enterpriseId,
                param.beginTime||'',
                param.endTime||''
            ]
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/enterprise_profit', function (req, res, next) {//获取利润表数据
            let param=req.body;
            const stuff = sc.instanceRequest("ProfitStatementTask", "selectProfitList", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.type,param.enterpriseId,param.num];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/enterprise_cash', function (req, res, next) {//获取现金流量表数据
            let param=req.body;
            const stuff = sc.instanceRequest("CashStatementTask", "selectCashList", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.type,param.enterpriseId,param.num];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/enterprise_debt', function (req, res, next) {//获取资产负债表数据
            console.log(JSON.stringify(req.body)+'=>client data')
            let param=req.body;
            const stuff = sc.instanceRequest("AssetsStatementTask", "selectAssetsList", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.type,param.enterpriseId,param.num];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        router.all('/enterprise_coreFinance', function (req, res, next) {//获取核心财务指标数据
            let param=req.body;
            const stuff = sc.instanceRequest("CoreFinancialStatementTask", "selectCoreFinancialList", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.type,param.enterpriseId,param.num];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //综合财务报表查询
        router.all('/enterprise_sf', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("FinancialAnalysisTask", "selectFinancialAnalysis", "enterpriseManger");//财报分析-净利润及增长率
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.type,param.enterpriseId,param.beginTime,param.endTime];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //哆啦宝资金线查询
        router.all('/enterprise_getAccountDetailDLB', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("EnterpriseAccountDetailTask", "selectDLBAccountDetail", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [
                param.id,
                param.beginTime,
                param.endTime,
                param.pageNo,
                param.pageSize
            ];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //查询经营简报
        router.all('/enterprise_getStatementBrief', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("StatementTask", "selectStatementBrief", "enterpriseManger");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [
                param.type,
                param.year,
                param.month,
                param.quarter,
                param.enterpriseId
            ];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
    }
