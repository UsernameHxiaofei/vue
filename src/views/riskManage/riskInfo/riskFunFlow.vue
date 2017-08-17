<template>
    <div id='enterpriseFunflow' style="padding:50px;">
        <div class="back-button" ><el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button></div>
        <el-row style="margin:30px auto 30px auto;">
            <el-col :span="24">
                <div class="titleField">
                    <span>查询账号：</span>
                    <span>{{enterprise.basicDepositAccountNumber}} </span> &emsp;&emsp;&emsp;&emsp;
                    <span>账户名称：</span>
                    <span>{{enterprise.accountName}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <label class="titleField" for="dateRange">日期</label>&emsp;
                <el-date-picker id="dateRange" v-model="daterange" @change="rangechange" clearable type="datetimerange" align="left" placeholder="选择日期范围"></el-date-picker>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"   style="margin-top:45px">
                <div id="funflowIn" style="height:400px">

                </div>
            </el-col>
            <el-col :span="10"  :offset="2"  style="margin-top:45px">
                <div id="funflowOut" style="height:400px">

                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col style="margin-top:40px">
                <div style="float:right;font-size: 18px;color: rgb(6, 204, 182);font-weight:600">
                    <span>合计：贷</span>
                    <span>{{totalData.totalb}}</span>
                    <span>笔</span>&nbsp;
                    <span>{{totalData.totalbNum}}</span>
                    <span>元，借</span>
                    <span>{{totalData.totalLean}}</span>
                    <span>笔</span>&nbsp;
                    <span>{{totalData.totalLeanNum}}</span>
                    <span>元</span>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table border :data="listData.list" stripe style="width: 100%">
                    <el-table-column prop="transactionTime" width="180"  label="交易时间" align="center"> </el-table-column>
                    <el-table-column prop="summary" width="150" label="摘要" align="center"> </el-table-column>
                    <el-table-column prop="debitAmount" label="借方发生额" align="center"> </el-table-column>
                    <el-table-column prop="creditAmount" label="贷方发生额" align="center"> </el-table-column>
                    <el-table-column prop="balance" label="余额" align="center"> </el-table-column>
                    <el-table-column prop="recAccountNumber" label="对方账户" align="center"> </el-table-column>
                    <el-table-column prop="recAccountName" width="140" label="对方账户名称" align="center"> </el-table-column>
                    <el-table-column prop="voucherKind" label="凭证种类" align="center"> </el-table-column>
                    <el-table-column prop="voucherNumber" label="凭证号码" align="center"> </el-table-column>
                    <el-table-column prop="businessNumber" width="140" label="企业业务编号" align="center"> </el-table-column>
                    <el-table-column prop="cardNumber" label="卡号" align="center"> </el-table-column>
                </el-table>
                <pagination style="float:right;margin:10px 50px" :total="listData.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from '../../../../node_modules/echarts/dist/echarts.min.js'
    import pagination from '../../../components/common/pagination.vue'
    import theme from '../../../assets/js/echarts.theme.js'
    theme(echarts);

    export default {
        name: 'enterpriseFunflow',
        computed: {
            dataList: function () {
                return this.$store.state.enterprise.enterpriseAccountDetail||{};
            },
            enterprise: function () {
                return this.$store.state.enterprise.enterpriseInfo || {};
            },
            itemManageDetail: function () {
                return this.$store.state.item.itemManageDetail||{};
            }
        },
        components: {
            'pagination': pagination
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
            getTotalData(){
                let totalLean=0,totalb=0,totalLeanNum=0,totalbNum=0;
                let leanOut=[],bIn=[],time=[];
                this.paramImg={
                    beginTime: this.param.beginTime,
                    endTime: this.param.endTime,
                    id:this.itemManageDetail.enterpriseId,
                    pageSize: this.listData.totalCount,
                    pageNo: 1,
                    type:1//1：银行
                }
                this.$store.dispatch('enterprise_getAccountDetail', this.paramImg).then(()=>{
                    for (let i=0;this.dataList.list&&i<this.dataList.list.length;i++){
                        let item=this.dataList.list[i];
                        let flag=item.debitAmount>item.creditAmount;//true就是借,就是流出
                        leanOut.push([new Date(item.transactionTime).getTime(),item.creditAmount]);
                        bIn.push([new Date(item.transactionTime).getTime(),item.debitAmount]);
                        time.push(new Date(item.transactionTime).getTime());
                        if(flag){
                            totalLean++;
                            totalLeanNum+=item.debitAmount;
                        }else{
                            totalb++;
                            totalbNum+=item.creditAmount;
                        }
                        
                    }
                    this.totalData= { totalLean, totalb, totalLeanNum:totalLeanNum.toFixed(2), totalbNum:totalbNum.toFixed(2), leanOut, bIn, time };
                    this.buildEcharts();
                    this.buildEchartsOut();
                });
                
            },
            rangechange(v) {
                this.daterange = v.split(' - ');
                this.param.beginTime = this.daterange[0];
                this.param.endTime = this.daterange[1];
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.getTotalData()
                });
            },
            handleSizeChange(size) {
                this.param.pageSize = size;
                this.param.pageNo = 1;
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                });
            },
            handleCurrentChange(page) {
                this.param.pageNo = page;
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                });
            },
            buildEcharts() {
                let myChart = echarts.init(document.getElementById('funflowIn'),'customed');
                // 指定图表的配置项和数据
                let option = {
                    title: { text: '银账资金账户流入', x: 'center' }, tooltip: { trigger: 'axis' },
                    legend: { data: ['流入'], right: 50, orient: 'vertical' },
                    xAxis: {
                        type:'time'
                    },
                    yAxis: { name: '金额(元)', nameLocation: 'end' },
                    series: [{
                        name: '流入', type: 'line',
                        data: this.totalData.bIn,
                        markLine : {
                            lineStyle: {
                                normal: {
                                    type: 'dashed'
                                }
                            },
                            data : [
                                { yAxis:  100000,lineStyle:{normal:{color:'rgb(255, 135, 97)'}},label:{normal:{position:'end',formatter:'高风险'}}},
                                { yAxis:  250000,lineStyle:{normal:{color:'rgb(251, 201, 55)'}},label:{normal:{position:'end',formatter:'中风险'}}}
                            ]
                        },
                        lineStyle: { normal: { width: 3 } }
                    }],
                    dataZoom: [{
                        startValue: this.param.beginTime?new Date(this.param.beginTime).getTime():new Date().getTime(),
                        endValue:  this.param.endTime?new Date(this.param.endTime).getTime():new Date().getTime()-1000*60*60*24*7
                    }, {
                        type: 'inside'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            buildEchartsOut(){
                let myChart = echarts.init(document.getElementById('funflowOut'),'customed');
                // 指定图表的配置项和数据
                let option = {
                    title: { text: '银账资金账户流出', x: 'center' }, tooltip: { trigger: 'axis' },
                    legend: { data: [ '流出'], right: 50, orient: 'vertical' },
                    xAxis: {
                        type:'time'
                    },
                    yAxis: { name: '金额(元)', nameLocation: 'end' },
                    series: [{
                        markLine : {
                            lineStyle: {
                                normal: {
                                    type: 'dashed'
                                }
                            },
                            data : [
                                { yAxis:  8000,lineStyle:{normal:{color:'rgb(255, 135, 97)'}},label:{normal:{position:'end',formatter:'高风险'}}},
                                { yAxis:  4000,lineStyle:{normal:{color:'rgb(251, 201, 55)' }},label:{normal:{position:'end',formatter:'中风险'}}}
                            ]
                        },
                        name: '流出', type: 'line',
                        data: this.totalData.leanOut,
                        lineStyle: { normal: { width: 3 } }
                    }],
                    dataZoom: [{
                        startValue: this.param.beginTime?new Date(this.param.beginTime).getTime():new Date().getTime(),
                        endValue:  this.param.endTime?new Date(this.param.endTime).getTime():new Date().getTime()-1000*60*60*24*7
                    }, {
                        type: 'inside'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },
        mounted () {
            this.$store.dispatch('item_getManageDetail',  {id: this.$route.params.id}).then(()=>{
               this.$store.dispatch('enterprise_getInfo',{id:this.itemManageDetail.enterpriseId})
               this.param = {
                    beginTime: this.daterange[0],
                    endTime: this.daterange[1],
                    id:this.itemManageDetail.enterpriseId,
                    pageSize: 10,
                    pageNo: 1,
                    type:1//1：银行
                }
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.getTotalData()
                });
            })
        },
        data() {
            return {
                listData:{},
                daterange: [],
                param: {},
                paramImg:{},
                totalData:{}
            }
        }
    }

</script>

<style>
    #enterpriseFunflow-chart {
        width: 50%;
        height: 400px;
    }

    #enterpriseFunflow .titleField {
        font-size: 18px;
        font-weight: 600;
        color: rgb(51, 51, 51);
    }

    .datepp {
        margin-left: 20px;
    }

    #enterpriseFunflow .el-table .cell {
        text-align: center;
    }

    #enterpriseFunflow .el-table__body .cell {
        color: #a3abbe;
        font-size: 12px;
    }
</style>