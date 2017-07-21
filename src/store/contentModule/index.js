import { api } from 'api';


export const contentModule = {
    state: {
        showImageList: [],     //banner列表 172.19.83.73
        uploadBanner:'',       //返回文件路径
        deleteBanner:'',       //返回boolean
        msgModelGetList: [],   //消息模板列表
        deleteNum: {},         //删除消息模板操作
        selectMsgModel: {},    //根据id 查询消息模板
        updateNum: {},         //修改消息模板操作
        insertNum: {},         //新增消息模板操作
        ltMessageList: [],     //短信息按条件查询分页
        postLtMessage: {},     //发送短信息结果
        selectWebMessage: [],  //站内信息按条件查询分页
        postWebMessage: {},    //发送站内信息结果
        webMessageByActorid:[], //根据用户id查询个人站内消息
        webMessageBySenderid:[],  //根据用户id查询个人发送的站内消息
        updateIsRead:'',          //改变阅读状态
        allActorList:[],          //所有站内用户信息
    },
    actions: {
        //banner列表
        show_imageList({ commit }, param) {
            return api.show_imageList(param).then((data) => {
                commit("show_banner", data);
            });
        },
        //banner删除
        delete_bannerById({ commit }, param) {
            return api.delete_bannerById(param).then((data) => {
                commit("delete_banner", data);
            });
        },
        //banner上传
        banner_uploadByFile({ commit }, param) {
            return api.banner_uploadByFile(param).then((data) => {
                commit("upload_banner", data);
            });
        },
        //消息模板列表
        msgModel_getList({ commit }, param) {
            return api.msgModel_getList(param).then((data) => {
                commit("show_setMsgModelList", data);
            });
        },
        //删除消息模板操作
        msgModel_delete({ commit }, param) {
            return api.msgModel_delete(param).then((data) => {
                commit("delete_msgModel", data);
            });
        },
        //根据id 查询消息模板
        msgModel_select({ commit }, param) {
            return api.msgModel_select(param).then((data) => {
                commit("select_msgModel", data);
            });
        },
        //修改消息模板操作
        msgModel_update({ commit }, param) {
            return api.msgModel_delete(param).then((data) => {
                commit("update_msgModel", data);
            });
        },
        //新增消息模板操作
        msgModel_insert_update({ commit }, param) {
            return api.msgModel_insert_update(param).then((data) => {
                commit("insert_msgModel", data);
            });
        },
        //短信息按条件查询分页
        find_ltMessageByCondition({ commit }, param) {
            return api.find_ltMessageByCondition(param).then((data) => {
                commit("find_ltMessage", data);
            });
        },
        //发送短信息sendSmsByReceiver
        sendSms_byReceiver({ commit }, param) {
            return api.sendSms_byReceiver(param).then((data) => {
                commit("post_ltMessage", data);
            });
        },
        //站内信息按条件查询分页
        selectPage_byCondition({ commit }, param) {
            return api.selectPage_byCondition(param).then((data) => {
                commit("select_webMessage", data);
            });
        },
        //查询所有站内用户信息
        select_allActor({ commit }, param) {
            return api.select_allActor(param).then((data) => {
                commit("select_actorList", data);
            });
        },
        //发送站内消息
        send_webMessage({ commit }, param) {
            return api.send_webMessage(param).then((data) => {
                commit("post_webMessage", data);
            });
        },
        //根据id查询个人站内消息
        select_webMessageByActorid({ commit }, param) {
            return api.select_webMessageByActorid(param).then((data) => {
                commit("get_webMessageByActorid", data);
            });
        },
        //根据id查询个人站内消息
        select_webMessageBySenderid({ commit }, param) {
            return api.select_webMessageBySenderid(param).then((data) => {
                commit("get_webMessageBySenderid", data);
            });
        },
        //改变阅读状态
        update_isReadByMessageId({ commit }, param) {
            return api.update_isReadByMessageId(param).then((data) => {
                commit("update_isRead", data);
            });
        },
    },
    //获取返回值( 突变，变化 )
    mutations: {
        show_banner(state, data) {
            state.showImageList = data;
        },
        delete_banner(state, data) {
            state.deleteBanner = data;
        },
        upload_banner(state, data) {
            state.uploadBanner = data;
        },
        show_setMsgModelList(state, data) {
            state.msgModelGetList = data;
        },
        delete_msgModel(state, data) {
            state.deleteNum = data;
        },
        select_msgModel(state, data) {
            state.selectMsgModel = data;
        },
        update_msgModel(state, data) {
            state.updateNum = data;
        },
        insert_msgModel(state, data) {
            state.insertNum = data;
        },
        find_ltMessage(state, data) {
            state.ltMessageList = data;
        },
        post_ltMessage(state, data) {
            state.postLtMessage = data;
        },
        select_webMessage(state, data) {
            state.selectWebMessage = data;
        },
        select_actorList(state, data) {
            state.allActorList = data;
        },
        post_webMessage(state, data) {
            state.postWebMessage = data;
        },
        get_webMessageByActorid(state, data) {
            state.webMessageByActorid = data;
        },
        get_webMessageBySenderid(state, data) {
            state.webMessageBySenderid = data;
        },
        update_isRead(state, data) {
            state.updateIsRead = data;
        },
    }
}