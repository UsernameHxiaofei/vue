<style>
.promise-box {
    margin: 0 30px 20px 30px;
}

.promise-list p {
    margin: 0;
    margin-top: 8px;
    color: #7f868a;
}

.promise-list p span {
    display: inline-block;
}

.promise-list p span:first-child {
    width: 110px;
    text-align: right;
    margin-right: 20px;
}

.jin-box {
    border: 1px solid #e1e1e1;
    height: 42px;
    line-height: 42px;
    margin: 15px 0;
    overflow: hidden;
}

.pro-ok {
    display: inline-block;
    background: #fafafa;
    height: 40px;
    width: 118px;
    border-right: 1px solid #e1e1e1;
    text-align: center;
}

.pro-money {
    display: inline-block;
    margin-left: 20px;
    color: #000000;
}

.cui-btn {
    text-align: right;
    margin: 0;
}

.cui-btn .el-button--success.is-plain {
    background: #06ccb6;
    color: white;
    border-color: #06ccb6;
}





/*.limit-width .el-dialog--small {
    top: 5%!important;
}*/

#look .el-dialog__footer {
    display: none;
    padding: 0;
}
</style>
<template>
    <div id="wrap">
        <!--栅格-->
        <div class="my-col">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund4.png" />
                        <div class="num-box">
                            <span class="color-blue">全部项目</span>
                            <p>{{moneyGetHeadInfo.count}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" style="width:25%;">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund5.png" />
                        <div class="num-box">
                            <span class="color-yellow">已收保证金</span>
                            <p>
                                <sup>￥</sup>
                                <span>{{moneyGetHeadInfo.paidDepositAmount}}</span>
                            </p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" style="width:25%;">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund6.png" />
                        <div class="num-box">
                            <span class="color-green">待收保证金</span>
                            <p>
                                <sup>￥</sup>
                                <span>{{moneyGetHeadInfo.unPaidDepositAmount}}</span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--搜索-->
        <div class="search-box">
            <div class="output">
                <el-input placeholder="项目名称" icon="search" v-model.trim="keyword" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="date-box">
                <el-select v-model="projectStatu" clearable placeholder="项目状态" @change="itemStatus">
                    <el-option v-for="item in projectStatus" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!--表格-->
        <div class="my-table">
            <el-table :data="moneyPromiseList.records" stripe border style="width: 100%">
                <el-table-column prop="kong" width="30">
                </el-table-column>
                <el-table-column type='index' width="60" label="序号">
                </el-table-column>
                <el-table-column prop="projectName" label="项目名称">
                </el-table-column>
                <el-table-column prop="initiatorName" label="发起方">
                </el-table-column>
                <el-table-column prop="leadInvestorName" label="领投">
                </el-table-column>
                <el-table-column prop="statusName" label="状态">
                </el-table-column>
                <el-table-column prop="overallInvestment" label="总投资额(元)">
                </el-table-column>
                <el-table-column prop="financingAmount" label="目标融资额(元)">
                </el-table-column>
                <el-table-column prop="proDepositRate" label="保证金比例">
                </el-table-column>
                <el-table-column>
                    <template scope="scope">
                        <el-button class="btn-style" @click="openLook(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="kong" width="30">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box fr clearfix">
            <div class="page-wrap">
                <pagination :total="moneyPromiseList.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <div class="limit-width p-form" id="look">
            <el-dialog title="保证金详情" :visible.sync="dialogLookVisible">
                <el-form :model="lookForm">
                    <div class="promise-box">
                        <div class="promise-list">
                            <p>
                                <span>项目方</span>
                                <span>{{lookForm.initiatorName}}</span>
                            </p>
                            <p>
                                <span>保证金比例</span>
                                <span>{{lookForm.proDepositRate}}</span>
                            </p>
                            <p>
                                <span>缴纳状态</span>
                                <span>{{lookForm.initDepositStatus}}</span>
                            </p>
                            <p>
                                <span>缴纳时间</span>
                                <span>{{lookForm.initDepositTime}}</span>
                            </p>
                        </div>
                        <div class="jin-box">
                            <span class="pro-ok">保证金</span>
                            <span class="pro-money">{{lookForm.proDepositAmount}}元</span>
                        </div>
                        <p class="cui-btn">
                            <el-button v-if="lookForm.initDepositStatusCode==0" :plain="true" type="success" @click="initCollect">催收</el-button>
                            <el-button v-if="lookForm.initRefundStatusCode==0&&lookForm.initDepositStatusCode==2&&lookForm.status!=8&&lookForm.status!=9" :plain="true" type="success"  @click="initDrawback">退款</el-button>
                            <el-button v-if="lookForm.initRefundStatusCode==1&&lookForm.initDepositStatusCode==2&&lookForm.status!=8&&lookForm.status!=9" :plain="true" type="success" @click="initDrawback">重新申请退款</el-button>
                            <span v-if="lookForm.initRefundStatusCode==2">退款处理中</span>
                            <span v-if="lookForm.initRefundStatusCode==3">已退款</span>
                        </p>
                    </div>
                    <div class="promise-box">
                        <div class="promise-list">
                            <p>
                                <span>领投人</span>
                                <span>{{lookForm.leadInvestorName}}</span>
                            </p>
                            <p>
                                <span>领投比例</span>
                                <span>{{lookForm.leadRate}}</span>
                            </p>
                            <p>
                                <span>缴纳状态</span>
                                <span>{{lookForm.leadDepositStatus}}</span>
                            </p>
                            <p>
                                <span>保证金比例</span>
                                <span>{{lookForm.leadDepositRate}}</span>
                            </p>
                            <p>
                                <span>缴纳时间</span>
                                <span>{{lookForm.leadDepositTime}}</span>
                            </p>
                        </div>
                        <div class="jin-box">
                            <span class="pro-ok">保证金</span>
                            <span class="pro-money">{{lookForm.leadDepositAmount}}元</span>
                        </div>
                        <p class="cui-btn">
                            <el-button v-if="lookForm.leadDepositStatusCode==0" :plain="true" type="success" @click="leadCollect">催收</el-button>
                            <el-button v-if="lookForm.leadRefundStatusCode==0&&lookForm.leadDepositStatusCode==2&&lookForm.status!=8&&lookForm.status!=9" :plain="true" type="success" @click="drawback">退款</el-button>
                            <el-button v-if="lookForm.leadRefundStatusCode==1&&lookForm.leadDepositStatusCode==2&&lookForm.status!=8&&lookForm.status!=9" :plain="true" type="success" @click="drawback">重新申请退款</el-button>
                            <span v-if="lookForm.leadRefundStatusCode==2">退款处理中</span>
                            <span v-if="lookForm.leadRefundStatusCode==3">已退款</span>
                        </p>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import pagination from '../../components/common/pagination'
import dialogComponent from '../../components/common/dialog'
export default {
    components: {
        pagination,
        dialogComponent
    },
    computed: {
        moneyPromiseList: function () {
            return this.$store.state.money.moneyPromiseList;
        },
        moneyGetHeadInfo: function () {
            return this.$store.state.money.moneyGetHeadInfo;
        },
        bailRefund: function () {
            return this.$store.state.money.bailRefund;
        },
        leaderCollect: function () {
            return this.$store.state.money.leaderCollect;
        },
        itemCollect: function () {
            return this.$store.state.money.itemCollect;
        },
        actor: function () {
            return this.$store.state.login.actor;
        },
    },
    mounted() {
        this.param = {
            status: this.projectStatu,
            keyword: this.keyword,
            pageNo: 1,
            pageSize: 10
        }
        this.$store.dispatch('money_promiseList', this.param);
        this.$store.dispatch('money_getHeadInfo');
    },
    data() {
        return {
            finished: false,
            param: {},
            leadTransactionId: '',
            initTransactionId: '',
            projectId: '',
            dialogLookVisible: false,
            projectStatu: '',
            projectStatus: [
                { value: 4, label: '待上线' },
                { value: 5, label: '预热中' },
                { value: 6, label: '专享期' },
                { value: 7, label: '众投中' },
                { value: 8, label: '已成功' },
                { value: 9, label: '已分红' },
                { value: 10, label: '募资失败' },
            ],
            keyword: '',
            lookForm: {
                initiatorName: '',
                proDepositRate: '',
                initDepositStatus: '',
                initDepositTime: '',
                proDepositAmount: '',
                leadInvestorName: '',
                leadRate: '',
                leadDepositStatus: '',
                leadDepositRate: '',
                leadDepositTime: '',
                leadDepositAmount: '',
            }
        }
    },
    methods: {
        // 搜索
        handleIconClick() {
            this.param.keyword = this.keyword;
            this.param.pageNo = 1;
            this.$store.dispatch('money_promiseList', this.param);
        },
        // 分页
        handleSizeChange(size) {
            this.param.pageSize = size;
            this.param.pageNo = 1;
            this.$store.dispatch('money_promiseList', this.param);
        },
        handleCurrentChange(page) {
            this.param.pageNo = page;
            this.$store.dispatch('money_promiseList', this.param);
        },
        // 选择项目状态
        itemStatus(lv) {
            this.param.status = lv;
            this.$store.dispatch('money_promiseList', this.param);
        },
        openLook(data) {
            this.lookForm = data;
            this.projectId = data.projectId;
            this.leadTransactionId = data.leadTransactionId;
            this.initTransactionId = data.initTransactionId;
            this.dialogLookVisible = true;
        },
        //领投的退款
        drawback() {
            this.$confirm('您确定申请退款吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let drawParam = {
                    projectId: this.projectId,
                    operaterId: this.actor.id,
                    oldTransactionId: this.leadTransactionId
                }
                this.$store.dispatch('bail_refund', drawParam).then(() => {
                    if (this.bailRefund) {
                        if (this.bailRefund.status == 5) {
                            this.$message({
                                type: 'warning',
                                message: '退款失败！'+this.bailRefund.mesg
                            });
                        } else {
                            this.$message({
                                type: 'success',
                                message: '退款申请成功!'
                            });
                        }
                        this.dialogLookVisible = false;
                        this.$store.dispatch('money_promiseList', this.param);
                    } else {
                        this.$message({
                            type: 'info',
                            message: '退款失败!'
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //项目方的退款
        initDrawback() {
            this.$confirm('您确定申请退款吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let drawbackParam = {
                    projectId: this.projectId,
                    operaterId: this.actor.id,
                    oldTransactionId: this.initTransactionId
                }
                this.$store.dispatch('bail_refund', drawbackParam).then(() => {
                    if (this.bailRefund) {
                        if (this.bailRefund.status == 5) {
                            this.$message({
                                type: 'warning',
                                message: '退款失败！'+this.bailRefund.mesg
                            });
                        } else {
                            this.$message({
                                type: 'success',
                                message: '退款申请成功!'
                            });
                        }
                        this.dialogLookVisible = false;
                        this.$store.dispatch('money_promiseList', this.param);
                    } else {
                        this.$message({
                            type: 'info',
                            message: '退款失败!'
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //领投的催收
        leadCollect() {
            this.$confirm('您确定催收吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let leadParam = {
                    projectId: this.projectId
                }
                this.$store.dispatch('leader_collect', leadParam).then(() => {
                    if (this.leaderCollect.flag) {
                        this.$message({
                            type: 'success',
                            message: '催收成功!'
                        });
                        this.dialogLookVisible = false;
                        this.$store.dispatch('money_promiseList', this.param);
                    } else {
                        this.$message({
                            type: 'info',
                            message: this.leaderCollect.message
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //项目方的催收
        initCollect() {
            this.$confirm('您确定催收吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let initParam = {
                    projectId: this.projectId
                }
                this.$store.dispatch('item_collect', initParam).then(() => {
                    if (this.itemCollect.flag) {
                        this.$message({
                            type: 'success',
                            message: '催收成功!'
                        });
                        this.dialogLookVisible = false;
                        this.$store.dispatch('money_promiseList', this.param);
                    } else {
                        this.$message({
                            type: 'info',
                            message: this.itemCollect.message
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        }
    }
}
</script>