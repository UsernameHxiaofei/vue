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
                            <p>{{investedServiceFeeList.resutl&&investedServiceFeeList.resutl.count||0}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" style="width:23%;">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund5.png" />
                        <div class="num-box">
                            <span class="color-yellow">已收投资投后服务费</span>
                            <p>
                                <sup>￥</sup>
                                <span>{{investedServiceFeeHeadData.resutl&&investedServiceFeeHeadData.resutl.fee}}</span>
                            </p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" style="width:23%;">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund7.png" />
                        <div class="num-box">
                            <span class="color-green">领投人已分润</span>
                            <p>
                                <sup>￥</sup>
                                <span>{{investedServiceFeeHeadData.resutl&&investedServiceFeeHeadData.resutl.leadGet}}</span>
                            </p>
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
            <!-- <div class="date-box">
                    <el-select v-model="moneySelectOption" clearable placeholder="收费状态" @change="feeStatus">
                        <el-option v-for="item in moneySelectOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="itemStatusOption" clearable placeholder="项目状态" @change="itemStatus">
                        <el-option v-for="item in itemStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div> -->
        </div>
        <!--表格-->
        <div class="my-table">
            <el-table :data="investedServiceFeeList.resutl&&investedServiceFeeList.resutl.list" stripe border style="width: 100%">
                <el-table-column prop="kong" width="30">
                </el-table-column>
                <el-table-column type="index" width="60" label="序号">
                </el-table-column>
                <el-table-column prop="code" width="120" label="项目编号">
                </el-table-column>
                <el-table-column prop="name" label="项目名称">
                </el-table-column>
                <el-table-column prop="initiatorName" width="150" label="融资人">
                </el-table-column>
                <el-table-column prop="industry" width="150" label="所属行业">
                    <template slot-scope="scope">
                        {{scope.row.industry|industry}}
                    </template>
                </el-table-column>
                <el-table-column prop="totalInvestAmount" width="150" label="总投资额（元）">
                </el-table-column>
                <el-table-column prop="regionCode" width="150" label="所在地">
                    <template slot-scope="scope">
                        {{scope.row.regionCode|address}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" width="150" label="创建时间">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button class="btn-style" @click="getShareProfitList(scope.row)">项目投后服务费管理</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="kong" width="30">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box fr clearfix">
            <div class="page-wrap">
                <pagination :total="investedServiceFeeList.resutl&&investedServiceFeeList.resutl.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog title="项目投资投后服务费管理" size="large" :visible.sync="shareProfitListVisible" :close-on-click-modal="false" top='5%'>
            <div class="search-box" style="margin:0px 1px 20px 10px;float:left">
                <h3>项目编号&emsp;
                    <span style="color:#06ccb7">{{item.code}}</span>&emsp;项目名称&emsp;
                    <span style="color:#06ccb7">{{item.name}}</span>&emsp;发起人&emsp;
                    <span style="color:#06ccb7">{{item.initiatorName}}</span>
                </h3>
                <div style="margin-bottom:20px">
                    <img style="width:350px;height:200px" :src="item.imgUrl" />
                </div>
                <el-date-picker v-model="beginTime" type="datetime" @change="beginTimeChange" placeholder="开始时段">
                </el-date-picker>
                至
                <el-date-picker v-model="endTime" type="datetime" @change="endTimeChange" placeholder="截止时段">
                </el-date-picker>
            </div>
            <div class="my-table">
                <el-table :data="shareProfitHis.resutl&&shareProfitHis.resutl.list" stripe border style="width: 100%">
                    <el-table-column prop="kong" width="30">
                    </el-table-column>
                    <el-table-column type='index' width="60" label="序号">
                    </el-table-column>
                    <el-table-column prop="executeTime" label="执行时间">
                    </el-table-column>
                    <el-table-column prop="period" label="期数">
                    </el-table-column>
                    <el-table-column label="服务费比例(%)">
                        <template slot-scope="scope">
                            {{scope.row.feeRatio*100+'%'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="bounsValue" label="分红金额(元)">
                    </el-table-column>
                    <el-table-column prop="bounsRatio" label="分红占比(%)">
                        <template slot-scope="scope">
                            {{scope.row.bounsRatio*100+'%'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="分红状态">
                        <template slot-scope="scope">
                            {{scope.row.status|shareProfitStatus}}
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button class="btn-style" v-if="scope.row.status==2" @click="shareProfitDetail(scope.row)">分成</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kong" width="30">
                    </el-table-column>
                </el-table>
            </div>
            <div style="margin:10px 10px 30px 10px;">
                <pagination :total="shareProfitHis.resutl&&shareProfitHis.resutl.count" @size-change="handleShareListSizeChange" @current-change="handleShareListCurrentChange"></pagination>
            </div>
        </el-dialog>
        <!-- 弹窗 -->
        <el-dialog title="分成信息详情" :visible.sync="shareDetailVisible" :close-on-click-modal="false" top='5%'>
            <div style="margin:10px 10px 30px 10px;">
                <el-form>
                    <el-form-item label="实际分红金额">
                        {{selectLeadShareProfit.bounsValue}}
                    </el-form-item>
                    <el-form-item label="投后服务费率">
                        {{selectLeadShareProfit.feeRatio*100+'%'}}
                    </el-form-item>
                    <el-form-item label="投后服务费">
                        {{selectLeadShareProfit.feeValue}}
                    </el-form-item>
                    <el-form-item label="领投分成比例">
                        {{selectLeadShareProfit.leadShareRatio*100+'%'}}
                    </el-form-item>
                    <el-form-item label="领投分成金额">
                        {{selectLeadShareProfit.leadShareValue}}
                    </el-form-item>
                    <el-form-item label="执行状态">
                        {{selectLeadShareProfit.status==0?'未执行':'已执行'}}
                    </el-form-item>
                    <el-form-item v-if="selectLeadShareProfit.status!=0" label="执行时间">
                        {{selectLeadShareProfit.executeTime}}
                    </el-form-item>
                    <el-form-item v-if="selectLeadShareProfit.status==0">
                        <el-button @click="executeClick">执行分成</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import pagination from '../../components/common/pagination'
    export default {
        components: {
            pagination
        },
        data() {
            return {
                shareDetailVisible: false,
                shareProfitListVisible: false,
                dialogLookVisible: false,
                form: {},
                search_value: '',
                projectId: '',
                param: {},
                shareListParam: {},
                beginTime: '',
                endTime: '',
                item: {}
            }
        },
        computed: {
            investedServiceFeeList: function () {
                return this.$store.state.money.investedServiceFeeList || {}
            },
            investedServiceFeeHeadData: function () {
                return this.$store.state.money.investedServiceFeeHeadData || {}
            },
            shareProfitHis: function () {
                return this.$store.state.money.shareProfitHis || {}
            },
            selectLeadShareProfit: function () {
                return this.$store.state.money.selectLeadShareProfit || {}
            }
        },
        beforeMount() {
            this.$store.dispatch('getHeadBrokerageFee')
            this.$store.dispatch('LeadShareProfitHead')
            this.param = {
                name: this.search_value,
                startPage: 1,
                limit: 10,
            }
            this.$store.dispatch('selectProjectNotIncludeAll', this.param)
        },
        methods: {
            executeClick() {
                this.$store.dispatch('executeLeadShareProfit', { id: this.selectLeadShareProfit.id }).then((data) => {
                    if (data.flag) {
                        this.$message.info(data.message)
                        this.shareDetailVisible = false
                    } else {
                        this.$message.warning(data.message)
                    }

                })
            },
            shareProfitDetail(data) {
                this.$store.dispatch('selectLeadShareProfit', { id: data.id })
                this.shareDetailVisible = true
            },
            beginTimeChange(val) {
                this.shareListParam.startTime = val || ''
                this.$store.dispatch('ShareProfitHis', this.shareListParam)
            },
            endTimeChange(val) {
                this.shareListParam.endTime = val || ''
                this.$store.dispatch('ShareProfitHis', this.shareListParam)
            },
            // 搜索
            handleIconClick() {
                this.param.name = this.search_value
                this.param.page = 1
                this.$store.dispatch('selectProjectNotIncludeAll', this.param)
            },
            // 分页
            handleSizeChange(size) {
                this.param.limit = size
                this.param.startPage = 1
                this.$store.dispatch('selectProjectNotIncludeAll', this.param)
            },
            handleCurrentChange(page) {
                this.param.startPage = page
                this.$store.dispatch('selectProjectNotIncludeAll', this.param)
            },
            getShareProfitList(item) {
                this.shareProfitListVisible = true
                this.item = item
                this.shareListParam = {
                    projectId: item.id,
                    startTime: '',
                    endTime: '',
                    pageStart: 1,
                    limt: 10
                }
                this.$store.dispatch('ShareProfitHis', this.shareListParam)
            },
            handleShareListSizeChange(size) {
                this.shareListParam.limt = size
                this.shareListParam.pageStart = 1
                this.$store.dispatch('ShareProfitHis', this.shareListParam)
            },
            handleShareListCurrentChange(page) {
                this.shareListParam.pageStart = page
                this.$store.dispatch('ShareProfitHis', this.shareListParam)
            }


        }
    }
</script>