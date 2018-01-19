<template>
    <div id='enterpriseDetail'>
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back()">返回上一级</el-button>
        </div>
        <el-row style="background:#fcfcfc;">
            <el-col class="enterpriseDetail-navbar">
                <el-dropdown class="el-dropdown-link">
                    <span class="menu-mdzz" :style="{'color':selectButton.menu1}">
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
                    </el-dropdown-menu>
                </el-dropdown>
                <span class="menu-mdzz" :style="{'color':selectButton.menu2}" @click="menuclick(6)">银行账户资金</span>
                <span class="menu-mdzz" :style="{'color':selectButton.menu3}" @click="menuclick(7)">收银收单</span>
                <span class="menu-mdzz" :style="{'color':selectButton.menu4}" @click="menuclick(8)">经营简报</span>
                <span class="menu-mdzz" :style="{'color':selectButton.menu5}" @click="menuclick(9)">核心团队成员</span>
            </el-col>
        </el-row>
        <div class="enterprise-basicinfo">企业名称&emsp;
            <span style="color:#06ccb6">{{enterpriseInfo.name}}</span>&emsp;社会信用代码&emsp;
            <span style="color:#06ccb6">{{enterpriseInfo.creditCode}}</span>&emsp;所在地&emsp;
            <span style="color:#06ccb6">{{enterpriseInfo.addressCode|address}}</span>
        </div>
        <div style="padding-left:40px;padding-right:40px;box-sizing:content-box;">
            <synthetic-financial-analysis :enterprise="enterpriseInfo" v-if="show==1"></synthetic-financial-analysis>
            <core-financial-index :enterprise="enterpriseInfo" v-if="show==2"></core-financial-index>
            <profit :enterprise="enterpriseInfo" v-if="show==3"></profit>
            <debts :enterprise="enterpriseInfo" v-if="show==4"></debts>
            <cashflow :enterprise="enterpriseInfo" v-if="show==5"></cashflow>
            <enterprise-funflow :enterprise="enterpriseInfo" v-if="show==6"></enterprise-funflow>
            <enterprise-funflow-DLB :enterprise="enterpriseInfo" v-if="show==7"></enterprise-funflow-DLB>
            <manage-briefing :enterprise="enterpriseInfo" v-if="show==8"></manage-briefing>
            <enterprise-team :enterprise="enterpriseInfo" v-if="show==9"></enterprise-team>
        </div>
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
		'synthetic-financial-analysis': syntheticFinancialAnalysis,
		'core-financial-index': coreFinancialIndex,
		'profit': profit,
		'debts': debts,
		'cashflow': cashflow,
		'manage-briefing': manageBriefing
	},
	data() {
		return {
			activeName: 'one',
			selectButton: {
				menu1: '#06ccb6',
				menu2: '#a3abbe',
				menu3: '#a3abbe',
				menu4: '#a3abbe',
				menu5: '#a3abbe',
			},
			currentTable: '',
			currentTable1: '',
			show: 1
		}
	},
	asyncData({ store, session, router }) {
		return store.dispatch('enterprise_enterpriseInfo', { session, id: router.params.id })
	},
	computed: {
		enterpriseInfo: function () {
			return this.$store.state.enterprise.enterpriseInfo
		}
	},
	beforeMount() {
		if (!this.enterpriseInfo.name) {
			this.$message.warning('查询企业信息出现故障，请联系管理员')
		}
		this.$store.dispatch('item_getAuthInfo', { id: this.enterpriseInfo.id })
		this.menuclick(1, '综合财务分析')
	},
	methods: {
		back() {
			this.$router.go(-1)
		},
		menuclick(n, name) {
			this.show = n
            this.currentTable = ''
            this.selectButton={
				menu1: '#a3abbe',
				menu2: '#a3abbe',
				menu3: '#a3abbe',
				menu4: '#a3abbe',
				menu5: '#a3abbe',
			}
			switch (n) {
			case 6:
				this.selectButton.menu2 = '#06ccb6'
				break
			case 7:
				this.selectButton.menu3 = '#06ccb6'
				break
			case 8:
				this.selectButton.menu4 = '#06ccb6'
				break
			case 9:
				this.selectButton.menu5 = '#06ccb6'
				break
			default:
				this.currentTable = `(${name})`
				this.selectButton.menu1 = '#06ccb6'
				break
			}
		}
	}
}
</script>

<style>
    .menu-mdzz-1 {
        color: #06ccb6;
    }

    .menu-mdzz {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 13px;
        background: #e2e6ef;
        color: #a3abbe;
        border-radius: 15px;
        margin-right: 10px;
        font-size: 13px;
        cursor: pointer;
    }

    .menu-mdzz:hover {
        color: #06ccb6;
    }

    #enterpriseDetail .enterpriseDetail-navbar {
        padding-top: 20px;
        padding-left: 40px;
    }

    #enterpriseDetail .el-dropdown-menu__item {
        list-style: none;
        line-height: 36px;
        padding: 0 10px;
        margin: 0;
        cursor: pointer;
        background: #e2e6ef;
        color: #a3abbe;
    }

    #enterpriseDetail .enterprise-basicinfo {
        width: 100%;
        background: #fcfcfc;
        color: #a3abbe;
        line-height: 40px;
        height: 40px;
        vertical-align: bottom;
        text-indent: 40px;
    }
</style>