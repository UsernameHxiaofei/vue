/**
   * 本方法仅在/backend/process文件中调用，传入外部环境参数
   * 
   * @param router node路由器
   * @param sc 协议发送端
   */

  const multer  = require('multer');

  module.exports=function client(router,sc,passport){
        //banner图列表
        router.all('/show_imageList', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("BannerManage", "pageBannerQuery", "contentManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.pageNo, param.pageSize];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //删除banner图
        router.all('/delete_bannerById', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("BannerManage", "deleteBannerById", "contentManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.id,param.deletor];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //上传banner图
        // router.all('/banner_uploadByFile', function (req, res, next) {
        //     console.log(req+'=>client data')
        //     console.log(req.method)
        //     console.log(req.query)
        //     console.log('run from broswer to node server')
        //     let param=req.body;
        //     //从左到右分别是接口名，方法标志，部件码
        //     const stuff = sc.instanceRequest("BannerManage", "bannerUploadByFile", "contentManage");
        //     stuff.auxiliary = {[passport]: req.session.passport};
        //     // 请求参数以数组形式传递 按照接口规定顺序传递，只需要按照规定顺序传入就好。不用传字段名。
        //     stuff.items = [param];
        //     sc.send(stuff).then((resp) =>{res.json(resp.object)});
        // });
        //上传banner图2
        router.all('/banner_uploadByFile',multer().single('file'),function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("BannerManage", "bannerUpload", "contentManage");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.bannerName,param.bannerType,param.uploadUseId,param.bannerSize];
            stuff.essences=[sc.instanceEssence(null,req.file.buffer)];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //消息模板管理列表
        router.all('/msgModel_getList', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtInfoTemplatTask", "selectLtInfoTemplatByCondition", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.templatName,param.pageNo, param.pageSize];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //消息模板删除操作
        router.all('/msgModel_delete', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtInfoTemplatTask", "removeLtInfoTemplatByTemplatId", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.templatId, param.deletor];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        //根据id查询相应的消息模板
        router.all('/msgModel_select', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtInfoTemplatTask", "findLtInfoTemplatByTemplatId", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.templatId];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //修改消息模板
        router.all('/msgModel_update', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtInfoTemplatTask", "updateLtInfoTemplatByTemplatId", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.ltInfoTemplat];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //新增或者修改消息模板
        router.all('/msgModel_insert_update', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtInfoTemplatTask", "createOrUpdateLtInfoTemplat", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        //短信息按条件查询分页
        router.all('/find_ltMessageByCondition', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtMessageTask", "findLtMessageByCondition", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.sendStatus,param.content,param.beginDate,param.endDate,param.pageNo,param.pageSize];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //发送短信息sendSmsByReceiver
        router.all('/sendSms_byReceiver', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("SmsSendTask", "sendSms", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.receiver,param.senderId,param.content];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //站内用户信息按条件查询分页
        router.all('/selectPage_byCondition', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("ActorTask", "selectPageByCondition", "securityCenter");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.keyword,param.indentType,param.status,param.pageNo,param.pageSize];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //所有用户信息不分页
        router.all('/select_allActor', function (req, res, next) {
            //let param=req.body;
            const stuff = sc.instanceRequest("ActorTask", "selectAllValidActorList", "securityCenter");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //发送站内消息
        router.all('/send_webMessage', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtMessageTask", "sendWebMessage", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.receiver,param.content,param.senderId];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        //发送的站内消息详情
        router.all('/select_webMessageBySenderid', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtMessageTask", "findLtMessageBySenderId", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};  
            
            stuff.items = [param.senderId,param.msgType,param.pageNo,param.pageSize];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //收到的站内消息详情
        router.all('/select_webMessageByActorid', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtMessageTask", "findLtMessageByReceiver", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.receiver,param.msgType,param.pageNo,param.pageSize];
            sc.send(stuff).then((resp) =>{res.json(resp.object)});
        });
        //改变阅读状态
        router.all('/update_isReadByMessageId', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtMessageTask", "updateIsRead", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.messageId];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        
        //屏蔽谈话交流
        router.all('/forBidMessageById', function (req, res, next) {
            let param=req.body;
            const stuff = sc.instanceRequest("LtMessageTask", "forBidMessageById", "ltMessageManagement");
            stuff.auxiliary = {[passport]: req.session.passport};
            stuff.items = [param.messageId,param.reason];
            sc.send(stuff).then((resp) =>{res.json(resp.head)});
        });
        
    }