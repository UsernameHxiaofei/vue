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

#look .el-dialog__footer {
    display: none;
    padding: 0;
}

.advices {
    margin-top: 20px;
}

.advices .el-textarea__inner {
    min-height: 180px;
    resize: none;
    color: #7f868a;
}

.limit-width .el-dialog--small {
    top: 5%!important;
}
#finished{background: #dddddd;border-color:#dddddd;}
#finished:hover{color:white;}
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
                            <p>{{headBrokerageFeeData.projectNum}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" style="width:23%;">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund5.png" />
                        <div class="num-box">
                            <span class="color-yellow">已收居间费</span>
                            <p>
                                <sup>￥</sup><span>{{headBrokerageFeeData.collectedIntermediaryFee}}</span></p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" style="width:23%;">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund6.png" />
                        <div class="num-box">
                            <span class="color-green">待收居间费</span>
                            <p>
                                <sup>￥</sup><span>{{headBrokerageFeeData.uncollectIntermediaryFee}}</span></p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" style="width:23%;">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund7.png" />
                        <div class="num-box">
                            <span class="color-orange">行家已分润</span>
                            <p>
                                <sup>￥</sup><span>{{headBrokerageFeeData.shareAmount}}</span></p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--搜索-->
        <div class="search-box">
            <div class="output">
                <el-input placeholder="项目名称" icon="search" v-model.trim="search_value" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="date-box">
                <el-select v-model="moneySelectOption" clearable placeholder="收费状态" @change="feeStatus">
                    <el-option v-for="item in moneySelectOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="itemStatusOption" clearable placeholder="项目状态" @change="itemStatus">
                    <el-option v-for="item in itemStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!--表格-->
        <div class="my-table">
            <el-table :data="brokerageFeeList.records" stripe border style="width: 100%">
                <el-table-column prop="kong" width="30">
                </el-table-column>
                <el-table-column type='index' width="60" label="序号">
                </el-table-column>
                <el-table-column prop="projectName"  width="220"  label="项目名称">
                </el-table-column>
                <el-table-column prop="projectStatus"  width="100" label="状态">
                    <template scope="scope">
                        <span>{{scope.row.projectStatus|projectStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="financingAmount" width="160" label="目标融资额(元)">
                </el-table-column>
                <el-table-column prop="serviceChargeRate"  width="130" label="融资服务费率">
                </el-table-column>
                <el-table-column prop="serviceCharge" width="150" label="融资服务费(元)">
                </el-table-column>
                <el-table-column prop="feeRate"  width="130" label="交易手续费率">
                </el-table-column>
                <el-table-column prop="fee"  width="120" label="交易费(元)">
                </el-table-column>
                <el-table-column prop="payTime" label="收取时间">
                </el-table-column>
                <el-table-column prop="payStatus" label="收费状态">
                </el-table-column>
                <el-table-column>
                    <template scope="scope">
                        <el-button v-if="scope.row.payStatusCode==0&&scope.row.projectStatus==9" class="btn-style" @click="collection(scope.row)">催收</el-button>
                        <el-button v-if="scope.row.payStatusCode==2" class="btn-style" @click="openLook(scope.row)">分成</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="kong" width="30">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box fr clearfix">
            <div class="page-wrap">
                <pagination :total="brokerageFeeList.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <div class="p-form limit-width" id="look">
            <el-dialog title="行家分成" :visible.sync="dialogLookVisible">
                <el-form :model="form">
                    <div class="promise-box">
                        <div class="promise-list">
                            <p>
                                <span>项目名称</span>
                                <span>{{form.projectName}}</span>
                            </p>
                            <p>
                                <span>目标融资金额</span>
                                <span>{{form.financingAmount}}元</span>
                            </p>
                            <p>
                                <span>融资服务费率</span>
                                <span>{{form.serviceChargeRate}}</span>
                            </p>
                            <p>
                                <span>融资服务费(元)</span>
                                <span>{{form.serviceCharge}}元</span>
                            </p>
                            <p>
                                <span>交易手续费率</span>
                                <span>{{form.feeRate}}</span>
                            </p>
                            <p>
                                <span>交易费(元)</span>
                                <span>{{form.fee}}元</span>
                            </p>
                            <p>
                                <span>推荐行家</span>
                                <span>{{form.expertNmae}}</span>
                            </p>
                            <p>
                                <span>分成比例</span>
                                <span>{{form.expertSharePercent}}</span>
                            </p>
                            <p>
                                <span>行家电话</span>
                                <span>{{form.expertMobileNumber}}</span>
                            </p>
                            <p>
                                <span>推荐收益</span>
                                <span>{{form.expertAmount}}元</span>
                            </p>
                            <p>
                                <span>分润状态</span>
                                <span>{{form.shareStatus?'已分润':'未分润'}}</span>
                            </p>
    
                        </div>
                        <el-form-item label="行家建议" label-width="80px" class="advices">
                            <el-input type="textarea" readonly v-model="form.expertAdvice">
                            </el-input>
                        </el-form-item>
                        <p class="cui-btn">
                            <el-button v-if="form.shareStatus==true" disabled :plain="true" type="success" id="finished">确定分红</el-button>
                            <el-button v-if="form.shareStatus==false" :plain="true" type="success"  @click="bonus">确定分红</el-button>
                        </p>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import pagination from '../../components/common/pagination'
import pstatus from '../../constant/projectStatus.js'
export default {
    components: {
        pagination
    },
    data() {
        return {
            // btnStatus: false,
            dialogLookVisible: false,
            form: {},
            moneySelectOption: '',
            moneySelectOptions: [
                { value: 0, label: '未收取' },
                { value: 1, label: '处理中' },
                { value: 2, label: '成功' },
                { value: 3, label: '失败' },
                { value: 4, label: '部分成功' }
            ],
            itemStatusOption: '',
            itemStatusOptions: pstatus,
            search_value: '',
            projectId:''
        }
    },
    computed: {
        moneySelectData: function () {
            return this.$store.state.money.moneySelectData;
        },
        headBrokerageFeeData: function () {
            if(this.$store.state.money.headBrokerageFeeData)return this.$store.state.money.headBrokerageFeeData;
            else return {}
        },
        brokerageFeeList: function () {
            return this.$store.state.money.brokerageFeeList;
        },
        isCollection: function () {
            return this.$store.state.money.isCollection;
        },
        shareProfit: function () {
            return this.$store.state.money.shareProfit;
        },
        actor: function () {
            return this.$store.state.login.actor;
        },
    },
    mounted() {
        this.$store.dispatch('getHeadBrokerageFee');
        this.$store.dispatch('moneySelect_getData');
        this.param = {
            projectName: this.search_value,
            transactionStatus: this.moneySelectOption,
            projectStatus: this.itemStatusOption,
            page: 1,
            number: 10,
        }
        this.$store.dispatch('getBrokerageFeeList', this.param);
    },
    methods: {
        // 搜索
        handleIconClick() {
            this.param.projectName = this.search_value;
            this.param.page = 1;
            this.$store.dispatch('getBrokerageFeeList', this.param);
        },
        // 分页
        handleSizeChange(size) {
            this.param.number = size;
            this.param.page = 1;
            this.$store.dispatch('getBrokerageFeeList', this.param);
        },
        handleCurrentChange(page) {
            this.param.page = page;
            this.$store.dispatch('getBrokerageFeeList', this.param);
        },
        // 点击分成
        openLook(data) {
            this.form = data;
            this.projectId=data.projectId;
            this.dialogLookVisible = true;
        },
        bonus(){
            let shareParam = {
                    projectId: this.projectId,
                    operator:this.actor.id
                }
                this.$store.dispatch('share_profit', shareParam).then(() => {
                    if (this.shareProfit.flag) {
                        this.$message({
                            type: 'success',
                            message: '分红成功!'
                        });
                        this.dialogLookVisible = false;
                        this.$store.dispatch('getBrokerageFeeList', this.param);
                    } else {
                        this.$message({
                            type: 'info',
                            message: this.shareProfit.message
                        });
                    }
                }, 300);
        },
        // 选择收费状态
        feeStatus(ind) {
            this.param.transactionStatus = ind;
            this.$store.dispatch('getBrokerageFeeList', this.param);
        },
        // 选择项目状态
        itemStatus(lv) {
            this.param.projectStatus = lv;
            this.$store.dispatch('getBrokerageFeeList', this.param);
        },
        //点击催收按钮
        collection(data) {
            this.$confirm('此操作将进行催收操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let coParam = {
                    projectId: data.projectId
                }
                this.$store.dispatch('is_collection', coParam).then(() => {
                    if (this.isCollection.flag) {
                        this.$message({
                            type: 'success',
                            message: '催收成功!'
                        });
                    } else {
                        this.$message({
                            type: 'info',
                            message: this.isCollection.message
                        });
                    }
                }, 300);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消催收'
                });
            });
        }
    }
}
</script>