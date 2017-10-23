<template>
    <div>
        <div class="back-button">
            <router-link class="pull-left" :to="{path: '/msgWebsite'}">
                <el-button type="text" icon="arrow-left">返回上一级</el-button>
            </router-link>
        </div>
        <div class="msg-detail-box">
            <div class="msg-content">
                <el-tabs type="border-card">
                    <el-tab-pane label="收到的信息">
                        <el-collapse accordion>
                            <el-collapse-item v-for="value in webMessageByActorid.list" :key="value.messageId">
                                <template slot="title">
                                    <span v-on:click="showContent(value.messageId,value.isRead)">{{value.title}}</span>
                                    <i style="margin-left:5px;" class="header-icon" :class="{'el-icon-information':!value.isRead}"></i>
                                    <span class="fr" style="padding-right:20px;">{{value.createTime}}</span>
                                </template>
                                <div style="color:#ccc; margin-bottom:5px;">消息来自:
                                    <span v-text="value.nickname?value.nickname:'匿名'"></span>
                                </div>
                                <div>
                                    <span v-text="value.content"></span>
                                </div>
                                <el-button type="text" @click="forbiden(value.messageId)" :disabled="value.forbidStatus==1">{{value.forbidStatus==1?'已屏蔽':'屏蔽'}}</el-button>
                                <span style="color:#06ccb6" v-if="value.forbidStatus==1">&emsp;屏蔽理由：{{value.forbidReason}}</span>
                            </el-collapse-item>
                        </el-collapse>
                        <div class="page-box clearfix">
                            <div class="page-wrap">
                                <div class="block">
                                    <pagination :total="webMessageByActorid.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="发出的信息">
                        <el-collapse accordion>
                            <el-collapse-item v-for="value in webMessageBySenderid.list" :key="value.messageId">
                                <template slot="title">
                                    <span>{{value.title}}</span>
                                    <i style="margin-left:5px;" class="header-icon" :class="{'el-icon-information':!value.isRead}"></i>
                                    <span class="fr" style="padding-right:20px;" v-text="value.createTime"></span>
                                </template>
                                <div style="color:#ccc; margin-bottom:5px;">
                                    消息发送至:
                                    <span v-text="value.nickname?value.nickname:'匿名'"></span>
                                </div>
                                <div>
                                    <span v-text="value.content"></span>
                                </div>
                                <span style="color:#06ccb6" v-if="value.forbidStatus==1">&emsp;屏蔽理由：{{value.forbidReason}}</span>
                            </el-collapse-item>
                        </el-collapse>
                        <div class="page-box clearfix">
                            <div class="page-wrap">
                                <div class="block">
                                    <pagination :total="webMessageBySenderid.count" @size-change="handleSizeChange1" @current-change="handleCurrentChange1"></pagination>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import pagination from '../../components/common/pagination.vue'
export default {
    components: {
        'pagination': pagination
    },
    computed: {
        //根据id获取收到的信息
        webMessageByActorid: function () {
            return this.$store.state.content.webMessageByActorid;
        },
        //根据id获取发送的信息
        webMessageBySenderid: function () {
            return this.$store.state.content.webMessageBySenderid;
        },
        //改变阅读状态
        updateIsRead: function () {
            return this.$store.state.content.updateIsRead;
        }
    },
    mounted() {
        this.actorParams = {
            receiver: this.$route.params.id,
            msgType:4,
            pageNo: 1,
            pageSize: 10,
        };
        this.actorParams1 = {
            senderId: this.$route.params.id,
            msgType:4,
            pageNo: 1,
            pageSize: 10,
        },
        //根据id获取收到的信息
        this.$store.dispatch('select_webMessageByActorid', this.actorParams);
        //根据id获取发送的信息
        this.$store.dispatch('select_webMessageBySenderid', this.actorParams1);
    },
    data() {
        return {
            // 表格
            tableData: [],
            dialogFormVisible: false,
            formLabelWidth: '120px',
            actorParams: {},
            actorParams1: {},
            form: {},
        }
    },
    methods: {
        forbiden(id){
            this.$prompt('请输入屏蔽该信息理由', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                let param={
                    messageId:id,
                    reason:value
                }
                this.$store.dispatch('forBidMessageById',param).then(()=>{
                    if(this.$store.state.content.fobidStatus.success){
                        this.$message.warning(this.$store.state.content.fobidStatus.information)
                        this.$store.dispatch('select_webMessageByActorid', this.actorParams);
                    }else{
                        this.$message.success(this.$store.state.content.fobidStatus.information)
                    }
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
        },
        handleSizeChange(val) {
            this.actorParams.pageSize = val;
            this.actorParams.pageNo = 1;
            this.$store.dispatch('select_webMessageByActorid', this.actorParams);
        },
        handleCurrentChange(val) {
            this.actorParams.pageNo = val;
            this.$store.dispatch('select_webMessageByActorid', this.actorParams);
        },
        handleSizeChange1(val) {
            this.actorParams1.pageSize = val;
            this.actorParams1.pageNo = 1;
            this.$store.dispatch('select_webMessageBySenderid', this.actorParams1);
        },
        handleCurrentChange1(val) {
            this.actorParams1.pageNo = val;
            this.$store.dispatch('select_webMessageBySenderid', this.actorParams1);
        },
        showContent(index, isRead) {
            if (!isRead) {
                this.actorParams.messageId = index;
                this.$store.dispatch('update_isReadByMessageId', this.actorParams);
            }
        },
    },
}
</script>

<style scope>
body {
    background-color: #fcfcfc
}

.content {
    background-color: #fcfcfc
}
/*返回按钮*/

.back-button1 {
    position: absolute;
    left: 20px !important;
    top: 16px !important;
}

.msg-detail-box .el-tabs {
    margin-top: 16px
}

.icon-leave {
    margin-left: 2px
}

.readed-all-btn {
    border: 1px solid #06ccb6;
    color: #06ccb6;
    background-color: #fff;
    padding: 2px 5px;
    border-radius: 10px;
    outline: none;
}

.msg-content {
    width: 60%;
    min-width: 750px;
    margin: 0 auto;
    background: white;
    padding-bottom: 40px;
}
/* 导航和添加 */

.add-message-btn {
    color: #aaa;
    margin-right: 2%;
}

.add-message-btn img {
    margin-top: -2px;
}

.page {
    margin-left: 2%
}

.msg-detail-box .page-box {
    padding: 20px 10px;
    margin: 0 !important;
}

.page-wrap {
    float: left;
}

.page-wrap .el-pagination__total {
    margin-left: 0;
}

.btn-box {
    float: right;
}
/*实现固定长度，多的以省略号显示[class*=" el-icon-"], [class^=el-icon-] { position:relative; top:-16px;}*/

.text-check {
    display: inline-block;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>