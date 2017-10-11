<template>
    <div id='enterpriseDetail'>
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back()">返回上一级</el-button>
        </div>
        <el-row style="background:#fcfcfc;">
            <el-col :span="20" :offset="2" style="margin-top:20px">
                <el-dropdown class="el-dropdown-link" >
                        <span class="menu-mdzz" style="margin-left:0px;" :style="{'color':selectButton.menu1}">
                            <span>财务分析</span>
                            <span v-html="currentTable"></span>
                            <i class="iconfont icon-jiantou"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="menuclick(1,'综合财务分析')">综合财务分析</el-dropdown-item>
                        <el-dropdown-item @click.native="menuclick(2,'核心财务指标')">核心财务指标</el-dropdown-item>
                        <el-dropdown-item @click.native="menuclick(3,'利润表')">利润表</el-dropdown-item>
                        <el-dropdown-item @click.native="menuclick(4,'资产负债表')">资产负债表</el-dropdown-item>
                        <el-dropdown-item @click.native="menuclick(5,'现金流量表')">现金流量表</el-dropdown-item>
                        <el-dropdown-item @click.native="menuclick(6,'经营简报')">经营简报</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span class="menu-mdzz" :style="{'color':selectButton.menu2}" >
                    <el-dropdown class="el-dropdown-link" >
                            <span class="menu-mdzz" style="margin-left:0px;" :style="{'color':selectButton.menu2}">
                                <span>资金流查询</span>
                                <span v-html="currentTable1"></span>
                                <i class="iconfont icon-jiantou"></i>
                            </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="menuclick(7,'银账资金流')">银账资金流</el-dropdown-item>
                            <el-dropdown-item @click.native="menuclick(9,'哆啦宝资金流')">哆啦宝资金流</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
                <span class="menu-mdzz" :style="{'color':selectButton.menu3}" @click="menuclick(8)">经营管理团队</span>
                
            </el-col>
        </el-row>
        <div class="enterprise-basicinfo">企业名称&emsp;{{enterpriseInfo.name}}&emsp;社会信用代码&emsp;{{enterpriseInfo.creditCode}}&emsp;所在地&emsp;{{enterpriseInfo.addressCode|address}}</div>
        <el-row>
            <el-col :span="20" :offset="2">
                <enterprise-team :enterprise="enterpriseInfo" v-if="show==8"></enterprise-team>
                <enterprise-funflow :enterprise="enterpriseInfo" v-if="show==7"></enterprise-funflow>
                <enterprise-funflow-DLB :enterprise="enterpriseInfo" v-if="show==9"></enterprise-funflow-DLB>
                <synthetic-financial-analysis :enterprise="enterpriseInfo" v-if="show==1"></synthetic-financial-analysis>
                <core-financial-index :enterprise="enterpriseInfo" v-if="show==2"></core-financial-index>
                <profit :enterprise="enterpriseInfo" v-if="show==3"></profit>
                <debts :enterprise="enterpriseInfo" v-if="show==4"></debts>
                <cashflow :enterprise="enterpriseInfo" v-if="show==5"></cashflow>
                <manage-briefing :enterprise="enterpriseInfo" v-if="show==6"></manage-briefing>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import enterpriseTeam from './enterpriseInfo/enterpriseTeam'
    import enterpriseFunflow from './enterpriseInfo/enterpriseFunflow'
    import syntheticFinancialAnalysis from './enterpriseInfo/syntheticFinancialAnalysis'
    import coreFinancialIndex from './enterpriseInfo/coreFinancialIndex'
    import profit from './enterpriseInfo/profit'
    import debts from './enterpriseInfo/debt'
    import cashflow from './enterpriseInfo/cashflow'
    import manageBriefing from './enterpriseInfo/manageBriefing'
    import enterpriseFunflowDLB from './enterpriseInfo/enterpriseFunflowDLB'

    export default {
        name: 'enterpriseDetail',
        components: {
          'enterprise-team': enterpriseTeam,
          'enterprise-funflow': enterpriseFunflow,
          'enterprise-funflow-DLB': enterpriseFunflowDLB,
          'synthetic-financial-analysis':syntheticFinancialAnalysis,
          'core-financial-index':coreFinancialIndex,
          'profit':profit,
          'debts':debts,
          'cashflow':cashflow,
          'manage-briefing':manageBriefing
        },
        data() {
            return {
                activeName: 'one',
                selectButton:{
                    menu1: '#06ccb6',
                    menu2: '#a3abbe',
                    menu3: '#a3abbe'
                },
                currentTable:'',
                currentTable1:'',
                show:1
            }
        },
        asyncData ({ store,session,router }) {
            return store.dispatch('enterprise_enterpriseInfo',{session,id:router.params.id});
        },
        computed: {
           enterpriseInfo:function(){
               return this.$store.state.enterprise.enterpriseInfo;
           }  
        },
        mounted () {
           if(!this.enterpriseInfo.name){
               this.$message.warning('查询企业信息出现故障，请联系管理员')
           }
           this.$store.dispatch('item_getAuthInfo',{id:this.enterpriseInfo.id});
           this.menuclick(1,'综合财务分析');
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            menuclick(n,name) {
                this.show=n;
                this.currentTable='';
                switch (n) {
                    case 7:
                        this.currentTable1=`(${name})`;
                        this.selectButton.menu2 = '#06ccb6';
                        this.selectButton.menu3 = this.selectButton.menu1= '#a3abbe';
                        break;
                    case 8:
                        this.selectButton.menu3 = '#06ccb6';
                        this.selectButton.menu1 = this.selectButton.menu2 = '#a3abbe';
                        break;
                    case 9:
                        this.currentTable1=`(${name})`;
                        this.selectButton.menu2 = '#06ccb6';
                        this.selectButton.menu3 = this.selectButton.menu1= '#a3abbe';
                        break;
                    default:
                        this.currentTable=`(${name})`;
                        this.selectButton.menu1 = '#06ccb6';
                        this.selectButton.menu2 = this.selectButton.menu3 = '#a3abbe';
                        break;
                }
            }
        }
    }
</script>

<style>
.menu-mdzz-1{
    color: #06ccb6;
}

.menu-mdzz{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 13px;
    background: #e2e6ef;
    color: #a3abbe;
    border-radius: 15px;
    margin-right: 10px;
    margin-left:20px;
    font-size: 13px;
    cursor: pointer;
}
.menu-mdzz:hover{
    color: #06ccb6;
}
#enterpriseDetail .el-dropdown-menu__item{
    list-style: none;
    line-height: 36px;
    padding: 0 10px;
    margin: 0;
    cursor: pointer;
    background: #e2e6ef;
    color: #a3abbe;
}
#enterpriseDetail .enterprise-basicinfo{
    width:100%;
    background: #fcfcfc;
    color: #a3abbe;
    line-height: 30px;
    height: 30px;
    vertical-align: bottom;
    text-indent: 150px;
}
</style>