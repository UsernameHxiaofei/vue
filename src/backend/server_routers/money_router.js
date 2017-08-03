/**
   * 本方法仅在/backend/process文件中调用，传入外部环境参数
   * 
   * @param router node路由器
   * @param sc 协议发送端
   */
module.exports = function client(router, sc, passport) {
    //////////////////充值记录查询列表
    router.all('/find_topupByCondition', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("transactionInquiry.TopupInquiry", "findTopupByCondition", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [param.fuzzy, param.startDate, param.endDate, param.statusCode, param.page, param.number];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    ////////////充值记录状态
    router.all('/getAll_transactionStatus', function (req, res, next) {
        const stuff = sc.instanceRequest("LtGetOptionsTask", "getTopupStatus", "ltSystemManagement");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    ////////////充值记录头部信息
    router.all('/get_topupStatResult', function (req, res, next) {
        const stuff = sc.instanceRequest("transactionInquiry.TopupInquiry", "getTopupStatResult", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    router.all('/moneySelect_getData', function (req, res, next) {
        const stuff = sc.instanceRequest("LtGetOptionsTask", "getTransactionStatus", "ltSystemManagement");//从左到右分别是接口名，方法标志，部件码
        stuff.auxiliary = { [passport]: req.session.passport };
        // stuff.items = ["12356485489",11];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    router.all('/dealTop_getData', function (req, res, next) {
        const stuff = sc.instanceRequest("DealManageTask", "getHeadDataInfo", "dealManage");//从左到右分别是接口名，方法标志，部件码
        stuff.auxiliary = { [passport]: req.session.passport };
        // stuff.items = ["12356485489",11];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    
    //居间费头部统计信息
    router.all('/getHeadBrokerageFee', function (req, res, next) {
        const stuff = sc.instanceRequest("FundManageTask", "getHeadDataInfoForIntermediaryFee", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    //居间费管理画面-项目列表查询
    router.all('/getBrokerageFeeList', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FundManageTask", "selectProjectListForIntermediaryFee", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectName,
            param.transactionStatus,
            param.projectStatus,
            param.page,
            param.number,
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    
    //居间费管理画面-催收
    router.all('/is_collection', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("DealManageIntermediaryFeeTask", "callIntermediaryFeeToInitiator", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectId
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    /////////////保证金管理头部统计信息
    router.all('/money_getHeadInfo', function (req, res, next) {
        const stuff = sc.instanceRequest("FundManageTask", "findDepositHead", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    /////////////保证金管理页面数据展示
    router.all('/money_promiseList', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FundManageTask", "findProjectList", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.status,
            param.keyword,
            param.pageNo,
            param.pageSize
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    /////////////投资款管理查询列表
    router.all('/investmentFund_getList', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FundManageTask", "selectProjectListForInvest", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectName,
            param.projectStatus,
            param.page,
            param.number
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    /////////////投资款管理头部信息
    router.all('/invest_getHeadInfo', function (req, res, next) {
        const stuff = sc.instanceRequest("FundManageTask", "getHeadDataInfoForInvest", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    ////////////////投资款管理画面-查询认投交易流水
    router.all('/getSubscription', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FundManageTask", "selectSubscriptionByLimit", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectId,
            param.page,
            param.number,
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    ///////////////费率设置画面-项目列表查询
    router.all('/rate_getList', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FundManageTask", "selectProjectListForSetFundsRule", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectName,
            param.projectStatus,
            param.page,
            param.number
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    //todo
    
    ///////////费率设置-按所属ID查询资金规则
    router.all('/id_fundRule', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("LtFundsRuleTask", "findLtFundsRule", "ltSystemManagement");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.ownId
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    ///////////费率设置-按所属ID查询资金规则
    router.all('/id_fundRule2', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("LtFundsRuleTask", "findLtFundsRuleByOwnId", "ltSystemManagement");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.ownId
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    ///////////费率设置-查询全局资金规则
    router.all('/overall_fundRule', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("LtFundsRuleTask", "findOverallLtFundsRule", "ltSystemManagement");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    ///////////费率设置-新增或修改资金规则
    router.all('/modify_fundRule', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("LtFundsRuleTask", "createOrUpdateLtFundsRule", "ltSystemManagement");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.ltFundsRule
        ];
        sc.send(stuff).then((resp) => { res.json(resp.head) });
    });


    // 查询每个项目的注资信息
    router.all('/get_capitalInjectionList', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("transactionInquiry.PayplanInquiry", "getPayplanByCondition", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectName,
            param.page,
            param.number
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    // 查询某个项目的具体注资交易流水
    router.all('/get_capitalInjectionDetail', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("transactionInquiry.PayplanInquiry", "getPayplanByProjectId", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectId,
            param.page,
            param.number
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    //////////注资审批-拒绝
     router.all('/refuse_capitalInjection', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("transactionProcess.PayPlanProcess", "doPayPlanRefuse", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectId,
            param.checkerId,
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    //////////注资审批-注资通过
     router.all('/agree_capitalInjection', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("transactionProcess.PayPlanProcess", "doPayPlanAgree", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.transactionId,
            param.checkerId,
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    //////////注资审批-重新申请
     router.all('/renew_capitalInjection', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("transactionProcess.PayPlanProcess", "doPayPlanReprocess", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.transactionId,
            param.checkerId,
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

     //////////保证金管理-查看详情-领投、项目方退款
     router.all('/bail_refund', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("DealManageAppropriationTask", "approRefund", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectId,
            param.operaterId,
            param.oldTransactionId
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

     //////////退款审批-头部数据
     router.all('/drawback_headInfo', function (req, res, next) {
        const stuff = sc.instanceRequest("FundManageTask", "findAproRefundHeadInfo", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

     //////////退款审批-查询列表
     router.all('/drawback_getList', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FundManageTask", "findAproRefundList", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.keyword,
            param.status,
            param.pageNo,
            param.pageSize
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    //////////保证金审批-查询列表
     router.all('/margin_approvalGetList', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FundManageTask", "findAproDepositList", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.keyword,
            param.status,
            param.pageNo,
            param.pageSize
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    ///////////退款审批、保证金审批-通过
    router.all('/pass_operate', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("transactionProcess.RefundProcess", "doRefundAgree", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.transactionId,
            param.checkerId,
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
    
    ///////////退款审批、保证金审批-拒绝  
     router.all('/fail_operate', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("transactionProcess.RefundProcess", "doRefundRefuse", "dealManage");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.transactionId,
            param.checkerId,
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    }); 

     //////////保证金管理-查看详情-领投催收
     router.all('/leader_collect', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("Settlement", "callDepositToLeader", "finance");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectId
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    //////////保证金管理-查看详情-项目方催收
     router.all('/item_collect', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("Settlement", "callDepositToInitiator", "finance");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectId
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });

    //////////居间费管理-行家分润
     router.all('/share_profit', function (req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("Settlement", "doShareProfit", "finance");
        stuff.auxiliary = { [passport]: req.session.passport };
        stuff.items = [
            param.projectId,
            param.operator
        ];
        sc.send(stuff).then((resp) => { res.json(resp.object) });
    });
}
