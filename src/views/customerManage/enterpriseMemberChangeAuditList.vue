<style>
</style>
<template>
    <div id="enterpriseMember">
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
            <div class="output" style="width:320px">
                <el-input placeholder="统一社会信用代码|企业名称|代理人手机号" icon="search" v-model.trim="keyword" @keyup.enter.native="keywordChange" :on-icon-click="keywordChange">
                </el-input>
            </div>
            <div class="date-box">
                <el-select v-model="status" @change="statusChange" clearable placeholder="审核状态">
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!--表格-->
        <div class="my-table  elli-btn">
            <el-table :data="enterperiseAuditList.list" stripe border style="width: 100%">
                <el-table-column prop="kong" width="20">
                </el-table-column>
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="identNumber" label="统一社会信用代码">
                </el-table-column>
                <el-table-column prop="name" label="企业名称">
                </el-table-column>
                <el-table-column prop="mobileNumber" label="代理人手机号">
                </el-table-column>
                <el-table-column prop="createTime" label="变更时间">
                </el-table-column>
                <el-table-column prop="status" label="审核状态" width="110px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">待审核</span>
                        <span v-if="scope.row.status==1">通过</span>
                        <span v-else-if="scope.row.status==2">未通过</span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <router-link :to="{path: '/enterpriseChangeAudit/'+scope.row.id+'/'+scope.row.actorId}">
                            <el-button class="btn-style">审核</el-button>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="kong" width="20">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box clearfix">
            <div class="page-wrap">
                <pagination :total="enterperiseAuditList.totalRecords" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import pagination from '../../components/common/pagination'
    export default {
        name: 'enterpriseChangeAuditList',
        components: {
            pagination
        },
        computed: {
            enterperiseAuditList: function () {
                return this.$store.state.customer.enterperiseAuditList
            },
            customerStatistics: function () {
                return this.$store.state.customer.customerStatistics
            }
        },
        data() {
            return {
                statusOptions: [{ value: 1, label: '待审核' }, { value: 2, label: '未通过' }],
                keyword: '',
                status: '',
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
                status: this.status,
                pageSize: 10,
                pageNum: 1
            }
            this.$store.dispatch('enterperiseAuditList', this.param)
        },
        methods: {
            handleSizeChange(val) {
                this.param.pageSize = val
                this.param.pageNum = 1
                this.$store.dispatch('enterperiseAuditList', this.param)
            },
            handleCurrentChange(val) {
                this.param.pageNum = val
                this.$store.dispatch('enterperiseAuditList', this.param)
            },
            statusChange() {
                this.param.pageNum = 1
                this.param.status = this.status
                this.$store.dispatch('enterperiseAuditList', this.param)
            },
            keywordChange() {
                this.param.keyword = this.keyword
                this.param.pageNum = 1
                this.$store.dispatch('enterperiseAuditList', this.param)
            }
        }
    }

</script>