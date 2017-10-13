<template>
    <div id='leftMenu'>
        <div class="logo">
            <img src="../../assets/images/logo.png" alt="链投">
        </div>
        <aside>
            <div id="menu" >
                <el-menu unique-opened :default-active="index" class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="go(menus[0].value,menus[0].index)"><i class="iconfont icon-xingyuanxiangmu"></i>&emsp;项目管理</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="iconfont icon-kehudongtai"></i>&emsp;客户管理</template>
                        <el-menu-item index="2-1" @click="go(menus[1].value,menus[1].index)">&emsp;客户信息维护</el-menu-item>
                        <el-menu-item index="2-2" @click="go(menus[2].value,menus[2].index)">&emsp;行家审核列表</el-menu-item>
                        <el-menu-item index="2-3" @click="go(menus[3].value,menus[3].index)">&emsp;领投审核列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="iconfont icon-neirong"></i>&emsp;内容管理</template>
                        <el-menu-item index="3-1" @click="go(menus[4].value,menus[4].index)">&emsp;图片管理</el-menu-item>
                        <el-menu-item index="3-2" @click="go(menus[5].value,menus[5].index)">&emsp;消息模版管理</el-menu-item>
                        <el-menu-item index="3-3" @click="go(menus[6].value,menus[6].index)">&emsp;短信通知管理</el-menu-item>
                        <el-menu-item index="3-4" @click="go(menus[7].value,menus[7].index)">&emsp;站内消息管理</el-menu-item>
                        <el-menu-item index="3-5" @click="go(menus[22].value,menus[22].index)">&emsp;谈话交流管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="iconfont icon-dongchanrongzi"></i>&emsp;资金管理</template>
                        <el-menu-item index="4-1" @click="go(menus[8].value,menus[8].index)" >&emsp;投资款管理</el-menu-item>
                        <el-menu-item index="4-2" @click="go(menus[9].value,menus[9].index)">&emsp;保证金管理</el-menu-item>
                        <el-menu-item index="4-3" @click="go(menus[10].value,menus[10].index)">&emsp;居间费管理</el-menu-item>
                        <el-menu-item index="4-4" @click="go(menus[11].value,menus[11].index)">&emsp;充值记录</el-menu-item>
                        <el-menu-item index="4-5" @click="go(menus[12].value,menus[12].index)">&emsp;资金规则参数设置</el-menu-item>
                        <el-menu-item index="4-6" @click="go(menus[13].value,menus[13].index)">&emsp;资金划拨审批</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="5" @click="go(menus[14].value,menus[14].index)">
                        <i class="iconfont icon-zijindongtai"></i>
                        <span style="display: inline-block;text-indent: 11px;">融资企业管理</span>
                    </el-menu-item>
                    <el-submenu index="6">
                        <template slot="title"><i class="iconfont icon-huanjingfengxian"></i>&emsp;风险管理</template>
                        <el-menu-item index="6-1" @click="go(menus[15].value,menus[15].index)" >&emsp;风险地图</el-menu-item>
                        <el-menu-item index="6-2" @click="go(menus[16].value,menus[16].index)" >&emsp;风险设置</el-menu-item>
                    </el-submenu>
                    <!--<el-menu-item index="7" @click="go('/23','7')"><i class="iconfont icon-jinrongpingtai"></i>&emsp;行业管理</el-menu-item>-->
                    <el-submenu index="8">
                        <template slot="title"><i class="iconfont icon-shezhi"></i>&emsp;系统管理</template>
                        <el-menu-item index="8-1" @click="go(menus[17].value,menus[17].index)">&emsp;账号维护</el-menu-item>
                        <el-menu-item index="8-2" @click="go(menus[18].value,menus[18].index)">&emsp;权限分配</el-menu-item>
                        <el-menu-item index="8-3" @click="go(menus[19].value,menus[19].index)">&emsp;角色维护</el-menu-item>
                        <el-menu-item index="8-4" @click="go(menus[20].value,menus[20].index)">&emsp;泛角色维护</el-menu-item>
                        <el-menu-item index="8-5" @click="go(menus[21].value,menus[21].index)">&emsp;日志</el-menu-item>
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
               index:'1',
               menus:[
                   {value:'/main',index:'1'},
                   {value:'/customerInforMaintain',index:'2-1'},
                   {value:'/expertAuditList',index:'2-2'},
                   {value:'/leadAuditList',index:'2-3'},
                   {value:'/msgImages',index:'3-1'},
                   {value:'/msgModel',index:'3-2'},
                   {value:'/msgShort',index:'3-3'},
                   {value:'/msgWebsite',index:'3-4'},
                   {value:'/investmentFund',index:'4-1'},
                   {value:'/depositManage',index:'4-2'},
                   {value:'/brokerageManage',index:'4-3'},
                   {value:'/rechargeManage',index:'4-4'},
                   {value:'/rateSetting',index:'4-5'},
                   {value:'/refundApproval',index:'4-6'},
                   {value:'/enterprise',index:'5'},
                   {value:'/risk',index:'6-1'},
                   {value:'/riskSetting',index:'6-2'},
                   {value:'/userMaintain',index:'8-1'},
                   {value:'/permission',index:'8-2'},
                   {value:'/roleMaintain',index:'8-3'},
                   {value:'/universalRole',index:'8-4'},
                   {value:'/log',index:'8-5'},
                   {value:'/msgTalk',index:'3-5'},
               ]
            }
        },
        methods: {
            go(path,index){
                sessionStorage.setItem('menu_index',JSON.stringify({path,index}));
                this.$store.commit('risk_projectInfo',{});
                this.$store.commit('enterprise_clear');
                this.$store.commit('item_clear');
                sessionStorage.setItem('risk_projectInfo','{}');
                this.$router.push(path);
            }
        },
        beforeMount () {
            let remeber=JSON.parse(sessionStorage.getItem('menu_index'))||{};
            this.index=remeber.index||'1';
            let pushFlag=false;
            for (let i = 0; i < this.menus.length; i++) {
                let item = this.menus[i];
                if(item.value==this.$route.path){
                    pushFlag=true;
                    break;
                }
            }
            if(pushFlag){
               this.$router.push(remeber&&remeber.path||'/main');
            }
            
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
        z-index:2;
        bottom:0;
        overflow:auto;
        user-select: none;
        background-color: #111118 !important;
    }

</style>