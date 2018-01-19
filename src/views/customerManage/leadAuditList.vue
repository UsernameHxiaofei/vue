<style>
.elli-btn .el-table .cell {
    overflow: initial;
}
</style>
<template>
    <div id="main">
        <div class="my-col">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund5.png" />
                        <div class="num-box">
                            <span class="color-green">未认证</span>
                            <p>{{customerStatistics.UnCertifiCount}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund4.png" />
                        <div class="num-box">
                            <span class="color-blue">融资人</span>
                            <p>{{customerStatistics.projectPartyCount}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund3.png" />
                        <div class="num-box">
                            <span class="color-green">行家</span>
                            <p>{{customerStatistics.expertCount}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund2.png" />
                        <div class="num-box">
                            <span class="color-deepgreen">领投</span>
                            <p>{{customerStatistics.leadInvestorCount}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund1.png" />
                        <div class="num-box">
                            <span class="color-orange">合格投资人</span>
                            <p>{{customerStatistics.investorCount}}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div style=" padding-right: 30px;float: right;font-size: 16px;font-weight: 600;">
                <span>合计：{{customerStatistics.allCount}}</span>
            </div>
        </div>
    
        <!--搜索-->
        <div class="search-box">
            <div class="date-box">
                <el-input v-model.trim="keyword" placeholder="姓名 | 手机号 | 身份证" icon="search" @keyup.enter.native="keywordChange" :on-icon-click="keywordChange">
                </el-input>
            </div>
    
        </div>
        <!--表格-->
        <div class="my-table  elli-btn">
            <el-table :data="leadAuditList.list" stripe border style="width: 100%">
                <el-table-column prop="kong" width="20">
                </el-table-column>
                <el-table-column type="index" width="55" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="institution" label="领投类型">
                    <template  slot-scope="scope">
                        {{scope.row.institution==1?'机构':'个人'}}
                    </template>
                </el-table-column>
                <el-table-column prop="mobileNumber" label="手机号" width="115px">
                </el-table-column>
                <el-table-column prop="identNumber" label="身份证号" width="165px">
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间" width="160px">
                </el-table-column>
                <el-table-column prop="lastAlterTime" label="最后更新时间" width="160px">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template  slot-scope="scope">
                        <span v-if="scope.row.status==0">无效</span>
                        <span v-else-if="scope.row.status==1">正常</span>
                        <span v-else>已封禁</span>
                    </template>
                </el-table-column>
                <el-table-column prop="audit" label="认证" width="140px">
                    <template  slot-scope="scope">
                        <span class="btn-small" :class="scope.row.projectParty==1 ? active : ''">项</span>
                        <span class="btn-small" :class="scope.row.expert==2 ? active : ''">行</span>
                        <span class="btn-small" :class="scope.row.leadInvestor==2 ? active : ''">领</span>
                        <span class="btn-small" :class="scope.row.investor==1 ? active : ''">投</span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template  slot-scope="scope">
                        <router-link :to="{path: '/leadAuditDetail/'+scope.row.actorId+'/'+scope.row.customerId}">
                            <el-button class="btn-style">审核</el-button>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="kong" width="20">
                </el-table-column>
            </el-table>
        </div>
        <div class="page-box clearfix">
            <div class="page-wrap">
                <pagination :total="leadAuditList.totalRecords" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
    
        </div>
    
    </div>
</template>

<script>
import pagination from '../../components/common/pagination'

export default {
	name: 'leadAuditList',
	components: {
		pagination
	},
	computed: {
		leadAuditList: function () {
			return this.$store.state.customer.leadAuditList
		},
		customerStatistics: function () {
			return this.$store.state.customer.customerStatistics
		},
	},
	data() {
		return {
			active: 'border-orange',
			dialogFormVisible: false,
			formLabelWidth: '120px',
			keyword: '',
			param: {},
		}
	},
	beforeMount() {
		this.$store.dispatch('customer_statistics').then(() => {
			if (this.customerStatistics) {
				this.customerStatistics.allCount = this.customerStatistics.UnCertifiCount + this.customerStatistics.expertCount + this.customerStatistics.investorCount + this.customerStatistics.leadInvestorCount + this.customerStatistics.projectPartyCount
			}
		})
		this.param = {
			keyword: this.keyword,
			pageSize: 10,
			pageNum: 1
		}
		this.$store.dispatch('leadAudit_getList', this.param)
	},
	methods: {
		handleSizeChange(val) {
			this.param.pageSize = val
			this.param.pageNum = 1
			this.$store.dispatch('leadAudit_getList', this.param)
		},
		handleCurrentChange(val) {
			this.param.pageNum = val
			this.$store.dispatch('leadAudit_getList', this.param)
		},
		keywordChange() {
			this.param.keyword = this.keyword
			this.param.pageNum = 1
			this.$store.dispatch('leadAudit_getList', this.param)
		},


	}
}

</script>
