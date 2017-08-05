<template>
    <div id='enterpriseFunflow'>
        <el-row style="margin:30px auto 30px auto;">
            <el-col :span="24">
                <div class="titleField">
                    <span>查询账号：</span>
                    <span>{{enterprise.basicDepositAccountNumber}}</span> &emsp;&emsp;&emsp;&emsp;
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
            <el-col :span="24" style="margin-top:45px">
                <div id="balance">

                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="margin-top:45px">
                <div id="funflowIn">

                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top:60px">
            <el-col >
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
                    <el-table-column prop="voucherKind" label="凭证种类" align="center">
                        <template scope="scope">
                            <span>{{scope.row.voucherKind|funFlowType}}</span>
                        </template>
                    </el-table-column>
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
    import moment from 'moment'
    import theme from '../../../assets/js/echarts.theme.js'
    theme(echarts);

    export default {
        name: 'enterpriseFunflow',
        props: ['enterprise'],
        computed: {
            dataList: function () {
                return this.$store.state.enterprise.enterpriseAccountDetail||{};
            }
        },
        components: {
            'pagination': pagination
        },
        methods: {
            getTotalData(){
                if(this.listData.totalCount&&this.listData.totalCount==0){
                    return;
                }
                let totalLean=0,totalb=0,totalLeanNum=0,totalbNum=0;
                let leanOut=[],bIn=[],time=[],balance=[];
                this.paramImg={
                    beginTime: this.param.beginTime,
                    endTime: this.param.endTime,
                    id:this.enterprise.id,
                    pageSize: this.listData.totalCount,
                    pageNo: 1,
                    type:1//1：银行
                }
                this.$store.dispatch('enterprise_getAccountDetail', this.paramImg).then(()=>{
                    for (let i=0;this.dataList.list&&i<this.dataList.list.length;i++){
                        let item=this.dataList.list[i];
                        let flag=item.debitAmount>item.creditAmount;//true就是借,就是流出
                        leanOut.push([new Date(item.transactionTime).getTime(),item.creditAmount||0]);
                        bIn.push([new Date(item.transactionTime).getTime(),item.debitAmount]);
                        time.push(new Date(item.transactionTime).getTime());
                        balance.push([new Date(item.transactionTime).getTime(),item.balance]);
                        if(flag){
                            totalLean++;
                            totalLeanNum+=item.debitAmount;
                        }else{
                            totalb++;
                            item.creditAmoun=item.creditAmoun||0;
                            totalbNum+=item.creditAmoun;
                        }
                        
                    }
                    this.totalData= { totalLean, totalb, totalLeanNum:totalLeanNum.toFixed(2), totalbNum:totalbNum.toFixed(2), leanOut, bIn, time,balance };
                    this.buildEcharts();
                });
            },
            rangechange(v) {
                this.daterange = v.split(' - ');
                this.param.beginTime = this.daterange[0];
                this.param.endTime = this.daterange[1];
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.changeFlag=true;
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
                let funflow = echarts.init(document.getElementById('funflowIn'),'customed');
                let balance = echarts.init(document.getElementById('balance'),'customed');
                // 指定图表的配置项和数据
                let funflowOption = {
                    title: { text: '银账资金账户流水', x: 'center' }, tooltip: { trigger: 'axis' },
                    legend: { data: ['流入','流出'], right: 200, orient: 'vertical'},
                    grid: [{
                        height:'35%'
                    }, {
                        top:'50%'
                    }],
                    xAxis: [
                        { type:'time' ,position: 'top',axisPointer:{
                            label:{
                                formatter:function(params){
                                    return moment(new Date(params.value)).format('YYYY-MM-DD HH:mm:ss');
                                }
                            }
                        }},
                        { type:'time',gridIndex:1,axisPointer:{
                            label:{
                                formatter:function(params){
                                    return moment(new Date(params.value)).format('YYYY-MM-DD HH:mm:ss');
                                }
                            }
                        }}
                    ],
                    axisPointer: {
                        link: {xAxisIndex: 'all'}
                    },
                    yAxis:[
                        { name: '金额(元)', nameLocation: 'start',gridIndex: 0 },
                        { name: '金额(元)', nameLocation: 'start',inverse: true,gridIndex: 1}
                    ],
                    series: [{
                        name: '流入', type: 'bar',
                        data: this.totalData.bIn,
                        barMaxWidth :40,
                        barCategoryGap:'60%',
                        lineStyle: { normal: { width: 3} }
                    },
                    {
                        name: '流出', type: 'bar',
                        barMaxWidth :40,
                        barCategoryGap:'60%',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: this.totalData.leanOut,
                        lineStyle: { normal: { width: 3 } }
                    }],
                    dataZoom: [{
                        show:true,
                        realtime: true,
                        startValue: new Date().getTime(),
                        endValue: new Date().getTime()-1000*60*60*24*7,
                        xAxisIndex: [0, 1]
                    },{
                        realtime: true,
                        startValue: new Date().getTime(),
                        endValue: new Date().getTime()-1000*60*60*24*7,
                        xAxisIndex: [0, 1],
                        type: 'inside'
                    }]
                };
                let balanceOption ={
                    title: { text: '银账资金账户余额情况', x: 'center' }, tooltip: { trigger: 'axis' },
                    legend: { data: ['余额'], right: 200, orient: 'vertical'},
                    xAxis: { type:'time' ,position: 'bottom',
                    axisPointer:{label:{ formatter:function(params){ return moment(new Date(params.value)).format('YYYY-MM-DD HH:mm:ss');}},
                        axisTick:{length:1}
                    }},
                    yAxis:{ name: '金额(元)', nameLocation: 'end'},
                    series: [{
                        name: '余额', type: 'line',
                        data: this.totalData.balance,
                        lineStyle: { normal: { width: 3} }
                    }],
                    dataZoom: [{
                        startValue: new Date().getTime(),
                        endValue: new Date().getTime()-1000*60*60*24*7
                    }, {
                        type: 'inside'
                    }]
                }
                // 使用刚指定的配置项和数据显示图表。
                balance.setOption(balanceOption);
                funflow.setOption(funflowOption);
            }
        },
        mounted () {
            this.param = {
                beginTime: this.daterange[0],
                endTime: this.daterange[1],
                id: this.enterprise.id,
                pageSize: 10,
                pageNo: 1,
                type:1//1：银行
            }
            this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                 this.listData=JSON.parse(JSON.stringify(this.dataList));
                 this.getTotalData();
            });

        },
        data() {
            return {
                changeFlag:{},
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
    #enterpriseFunflow #funflowIn{
        width: 100%;
        height: 600px;
    }
    #enterpriseFunflow #balance{
        width: 100%;
        height: 500px;
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