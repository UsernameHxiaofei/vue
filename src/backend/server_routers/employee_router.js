/**
   * 本方法仅在/backend/process文件中调用，传入外部环境参数
   * 
   * @param router node路由器
   * @param sc 协议发送端
   */
  module.exports=function client(router,sc,passport){
    //获取员工头像
    router.all('/emp_selectEmployee', function (req, res, next) {//分页方法
        let param=req.body;
        const stuff = sc.instanceRequest("EmployeeInfoTask", "selectEmployee", "customerManage");
        stuff.auxiliary = {[passport]: req.session.passport};
        stuff.items = [
            param.id
        ];
        sc.send(stuff).then((resp) =>{res.json(resp.object)});
    });
    //修改员工头像
    router.all('/updateEmployeeInfo', function (req, res, next) {//分页方法
        let param=req.body;
        const stuff = sc.instanceRequest("EmployeeInfoTask", "updateEmployeeInfo", "customerManage");
        stuff.auxiliary = {[passport]: req.session.passport};
        stuff.items = [
            param
        ];
        sc.send(stuff).then((resp) =>{res.json(resp.object)});
    });
}