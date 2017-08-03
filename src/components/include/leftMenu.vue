<template>
    <div id='leftMenu'>
        <div class="logo">
            <img src="../../assets/images/logo.png" alt="链投">
        </div>
        <aside>
            <div id="menu" >
                <el-menu unique-opened :default-active="index" class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="go('/main','1')"><i class="iconfont icon-xingyuanxiangmu"></i>&emsp;项目管理</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="iconfont icon-kehudongtai"></i>&emsp;客户管理</template>
                        <el-menu-item index="2-1" @click="go('/customerInforMaintain','2-1')">&emsp;客户信息维护</el-menu-item>
                        <el-menu-item index="2-2" @click="go('/expertAuditList','2-2')">&emsp;行家审核列表</el-menu-item>
                        <el-menu-item index="2-3" @click="go('/leadAuditList','2-3')">&emsp;领投审核列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="iconfont icon-neirong"></i>&emsp;内容管理</template>
                        <el-menu-item index="3-1" @click="go('/msgImages','3-1')">&emsp;图片管理</el-menu-item>
                        <el-menu-item index="3-2" @click="go('/msgModel','3-2')">&emsp;消息模版管理</el-menu-item>
                        <el-menu-item index="3-3" @click="go('/msgShort','3-3')">&emsp;短信通知管理</el-menu-item>
                        <el-menu-item index="3-4" @click="go('/msgWebsite','3-4')">&emsp;站内消息管理</el-menu-item>
                        <!--<el-menu-item index="3-5" @click="go('/msgProjectList','3-5')">&emsp;项目内容列表</el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="iconfont icon-dongchanrongzi"></i>&emsp;资金管理</template>
                        <el-menu-item index="4-1" @click="go('/investmentFund','4-1')" >&emsp;投资款管理</el-menu-item>
                        <el-menu-item index="4-2" @click="go('/depositManage','4-2')">&emsp;保证金管理</el-menu-item>
                        <el-menu-item index="4-3" @click="go('/brokerageManage','4-3')">&emsp;居间费管理</el-menu-item>
                        <el-menu-item index="4-4" @click="go('/rechargeManage','4-4')">&emsp;充值记录</el-menu-item>
                        <el-menu-item index="4-5" @click="go('/rateSetting','4-5')">&emsp;费率设置</el-menu-item>
                        <el-menu-item index="4-6" @click="go('/refundApproval','4-6')">&emsp;资金划拨审批</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="5" @click="go('/enterprise','5')">
                        <i class="iconfont icon-zijindongtai"></i>
                        <span style="display: inline-block;text-indent: 11px;">融资企业管理</span>
                    </el-menu-item>
                    <el-submenu index="6">
                        <template slot="title"><i class="iconfont icon-huanjingfengxian"></i>&emsp;风险管理</template>
                        <el-menu-item index="6-1" @click="go('/risk','6-1')" >&emsp;风险地图</el-menu-item>
                        <el-menu-item index="6-2" @click="go('/riskSetting','6-2')" >&emsp;风险设置</el-menu-item>
                    </el-submenu>
                    <!--<el-menu-item index="7" @click="go('/23','7')"><i class="iconfont icon-jinrongpingtai"></i>&emsp;行业管理</el-menu-item>-->
                    <el-submenu index="8">
                        <template slot="title"><i class="iconfont icon-shezhi"></i>&emsp;系统管理</template>
                        <el-menu-item index="8-1" @click="go('/userMaintain','8-1')">&emsp;账户维护</el-menu-item>
                        <el-menu-item index="8-2" @click="go('/permission','8-2')">&emsp;权限分配</el-menu-item>
                        <el-menu-item index="8-3" @click="go('/roleMaintain','8-3')">&emsp;角色维护</el-menu-item>
                        <el-menu-item index="8-4" @click="go('/universalRole','8-4')">&emsp;泛角色维护</el-menu-item>
                        <el-menu-item index="8-5" @click="go('/log','8-5')">&emsp;日志</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </aside>
    </div>
</template>

<script>
    export default {
        name: 'leftMenu',
        data() {
            return {
               index:'1'
            }
        },
        methods: {
            go(path,index){
                sessionStorage.setItem('menu_index',JSON.stringify({path,index}));
                this.$store.commit('risk_projectInfo',{});
                this.$store.commit('risk_setRiskSettingData',{});
                this.$store.commit('enterprise_clear');
                this.$store.commit('item_clear');
                sessionStorage.setItem('risk_projectInfo','{}');
                this.$router.push(path);
            }
        },
        beforeMount () {
            let remeber=JSON.parse(sessionStorage.getItem('menu_index'))||{}
            this.index=remeber.index||'1';
        }
    }

</script>

<style >
    #menu .el-menu{
        border-radius: 2px;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        color:#78909C;
        background-color: #111118 !important;
    }
    #menu .el-submenu__title{
        color:#78909C;
    } 
    #menu  .el-menu-item.is-active {
        color:#ffffff;
        background: #06ccb7;
    }
    #menu .el-submenu__title:hover {
        color:#ffffff;
        background: #06ccb7;
    }
    #menu .el-menu-item:hover {
        color:#ffffff;
        background: #06ccb7;
    }
    #menu .el-menu-item{
       color:#78909C;
    }
    .logo {
        vertical-align: middle;
        line-height: 64px;
        height: 64px;
        text-align: center;
    }

    .logo img {
        width: 60%;
    }

   
    #leftMenu {
        position: fixed;
        top: 0;
        left: 0;
        width: 230px;
        bottom:0;
        overflow:auto;
        user-select: none;
        background-color: #111118 !important;
    }

</style>