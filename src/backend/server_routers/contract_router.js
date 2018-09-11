/**
   * 本方法仅在/backend/process文件中调用，传入外部环境参数
   * 
   * @param router node路由器
   * @param sc 协议发送端
   */

  const multer = require('multer')

  module.exports = function client(router, sc, passport) {
    router.all('/item_createContract',multer().single('file'),function(req,res){
        let param = req.body
        const stuff = sc.instanceRequest('ContractTask', 'createContract', 'contractManagement')
        stuff.auxiliary = {
            [passport]: req.session.passport
        }
        stuff.essences = [sc.instanceEssence(null, req.file.buffer)];
        stuff.items = [param.contractName,param.projectId,param.signatureKeyword]
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        })
    })
    router.all('/obtainContract',function(req,res){
        let param = req.query
        const stuff = sc.instanceRequest('ContractTask', 'obtainContract', 'contractManagement')
        stuff.auxiliary = {
            [passport]: req.session.passport
        }
        stuff.items = [param.id]
        let disPosition='inline'
        if(param.tab){
            disPosition='attachment'
        }
        sc.send(stuff).then((resp) => {
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition':disPosition+'; filename=' + encodeURIComponent(resp.essences[0].mark.name)+'.pdf',
                'Content-Length': resp.essences[0].byteBuffer.length,
            });
            res.send(resp.essences[0].byteBuffer);
        })
    })
    router.all('/obtainContracts',function(req,res){
        let param = req.body
        const stuff = sc.instanceRequest('ContractTask', 'obtainContracts', 'contractManagement')
        stuff.auxiliary = {
            [passport]: req.session.passport
        }
        stuff.items = [param.projectId]
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        })
    })
    router.all('/modifyContractInformation',function(req,res){
        let param = req.body
        const stuff = sc.instanceRequest('ContractTask', 'modifyContractInformation', 'contractManagement')
        stuff.auxiliary = {
            [passport]: req.session.passport
        }
        stuff.items =param.items
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        })
    })
    router.all('/removeContract',function(req,res){
        let param = req.body
        const stuff = sc.instanceRequest('ContractTask', 'removeContract', 'contractManagement')
        stuff.auxiliary = {
            [passport]: req.session.passport
        }
        stuff.items =[param.id]
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        })
    })
    router.all('/modifyContractFile',multer().single('file'),function(req,res){
        let param = req.body
        const stuff = sc.instanceRequest('ContractTask', 'modifyContractFile', 'contractManagement')
        stuff.auxiliary = {
            [passport]: req.session.passport
        }
        stuff.items = [param.id]
        stuff.essences = [sc.instanceEssence(null, req.file.buffer)];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        })
    })
  }