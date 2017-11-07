<style scoped>
.top-box {
    width: 100%;
    padding: 20px 0 20px 30px;
    background-color: #fcfcfc;
}

.my-grid .el-row {
    background-color: #fff !important;
}
</style>
<template>
    <div id="wrap">
        <div class="top-box">
            <el-button-group>
                <router-link :to="{path: '/refundApproval'}">
                    <el-button type="primary">退款审批</el-button>
                </router-link>
                <router-link :to="{path: '/marginApproval'}">
                    <el-button>保证金审批</el-button>
                </router-link>
                <router-link :to="{path: '/capitalApproval'}">
                    <el-button>注资审批</el-button>
                </router-link>
            </el-button-group>
        </div>
        <!--栅格-->
        <div class="my-col my-grid">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund8.png" />
                        <div class="num-box">
                            <span class="color-blue">退款(笔)</span>
                            <p>{{this.drawbackHeadInfo.count}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" style="width:25%;">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund6.png" />
                        <div class="num-box">
                            <span class="color-green">总金额</span>
                            <p>
                                <sup>￥</sup>{{this.drawbackHeadInfo.refundAmountSum}}</p>
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
            <el-table :data="drawbackGetList.records" stripe border style="width: 100%">
                <el-table-column prop="kong" width="30">
                </el-table-column>
                <el-table-column type='index' prop="th1" width="60" label="序号">
                </el-table-column>
                <el-table-column prop="userName" label="投资人姓名">
                </el-table-column>
                <el-table-column prop="mobileNumber" label="手机号">
                </el-table-column>
                <el-table-column prop="oldTransactionAmount" label="投资金额(元)">
                </el-table-column>
                <el-table-column prop="applyRefundAmount" label="退款金额(元)">
                </el-table-column>
                <el-table-column prop="projectName" label="所投项目">
                </el-table-column>
                <el-table-column prop="projectStatus" label="项目状态">
                </el-table-column>
                <el-table-column prop="investTime" label="认投时间">
                </el-table-column>
                <el-table-column prop="refundStatus" label="退款状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.refundStatus==0">审核中</span>
                        <span v-if="scope.row.refundStatus==2">拒绝退款</span>
                        <span v-if="scope.row.refundStatus==3">退款中</span>
                        <span v-if="scope.row.refundStatus==4">成功</span>
                        <span v-if="scope.row.refundStatus==5">失败</span>
                    </template>
                </el-table-column>
                <el-table-column width="160">
                    <template slot-scope="scope">
                        <el-button class="btn-style btn-margin" @click="success(scope.row)" :disabled="scope.row.refundStatus!=0">通过</el-button>
                        <el-button class="btn-style" @click="fail(scope.row)" :disabled="scope.row.refundStatus!=0">拒绝</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="kong" width="30">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box fr clearfix">
            <div class="page-wrap">
                <pagination :total="drawbackGetList.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>
    
    </div>
</template>
<script>
import pagination from '../../components/common/pagination'
import pStatus from '../../constant/projectStatus.js'
export default {
    components: {
        pagination
    },
    computed: {
        drawbackHeadInfo: function () {
            return this.$store.state.money.drawbackHeadInfo;
        },
        drawbackGetList: function () {
            if (!this.$store.state.money.drawbackGetList) {
                return{
                    userName:'',mobileNumber:'',oldTransactionAmount:'',applyRefundAmount:'',
                    projectName:'',projectStatus:'',investTime:'',refundStatus:''

                }
            }else{
                return this.$store.state.money.drawbackGetList;
            }
        },
        passOperate: function () {
            return this.$store.state.money.passOperate;
        },
        failOperate: function () {
            return this.$store.state.money.failOperate;
        },
        actor: function () {
            return this.$store.state.login.actor;
        },
    },
    beforeMount() {
        this.$store.dispatch('drawback_headInfo');
        this.param = {
            keyword: this.keyword,
            status: this.projectStatu,
            pageNo: 1,
            pageSize: 10
        }
        this.$store.dispatch('drawback_getList', this.param);
    },
    data() {
        return {
            btnStatus: false,
            param: {},
            projectStatu: '',
            projectStatus: pStatus,
            keyword: '',
        }
    },
    methods: {
        //通过
        success(data) {
            this.$confirm('您确定通过吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let agreeParam = {
                    transactionId: data.transactionId,
                    checkerId: this.actor.id
                }
                this.$store.dispatch("pass_operate", agreeParam).then(() => {
                    if (this.passOperate.result == 'success') {
                        this.$message({
                            type: 'success',
                            message: '已成功通过!'
                        });
                        this.$store.dispatch('drawback_getList', this.param);

                    } else {
                        this.$message({
                            type: 'warning',
                            message: '通过失败!'
                        });
                    }
                }, 300);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //拒绝
        fail(data) {
            this.$confirm('您确定拒绝吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let failParam = {
                    transactionId: data.transactionId,
                    checkerId: this.actor.id
                }
                this.$store.dispatch("fail_operate", failParam).then(() => {
                    if (this.failOperate.result == 'success') {
                        this.$message({
                            type: 'success',
                            message: '已拒绝!'
                        });
                        this.$store.dispatch('drawback_getList', this.param);
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '拒绝失败!'
                        });
                    }
                }, 300);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 搜索
        handleIconClick() {
            this.param.keyword = this.keyword;
            this.param.pageNo = 1;
            this.$store.dispatch('drawback_getList', this.param);
        },
        // 分页
        handleSizeChange(size) {
            this.param.pageSize = size;
            this.param.pageNo = 1;
            this.$store.dispatch('drawback_getList', this.param);
        },
        handleCurrentChange(page) {
            this.param.pageNo = page;
            this.$store.dispatch('drawback_getList', this.param);
        },
        // 选择项目状态
        itemStatus(lv) {
            this.param.status = lv;
            this.$store.dispatch('drawback_getList', this.param);
        },
    }
}
</script>