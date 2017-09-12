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
                <el-date-picker id="dateRange" v-model="daterange" @change="rangechange" clearable type="daterange" align="left" placeholder="选择日期范围"></el-date-picker>
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
                    <el-table-column prop="transactionTime" width="170"  label="交易时间" align="center"> </el-table-column>
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
    import moment from 'moment'
    import theme from '../../../assets/js/echarts.theme.js'
    import riskRegion from '../../../constant/riskRegion.js'
    theme(echarts);

    export default {
        name: 'riskFunflow',
        computed: {
            projectRiskRule:function(){
                return this.$store.state.risk.projectRiskRule||[];
            },
            dataList: function () {
                return this.$store.state.enterprise.enterpriseAccountDetail||{};
            },
            enterprise: function () {
                return this.$store.state.enterprise.enterpriseInfo || {};
            },
            itemManageDetail: function () {
                return this.$store.state.item.itemManageDetail||{};
            },
            listDayAmount:function (){
                return this.$store.state.enterprise.listDayAmount||{};
            }
        },
        components: {
            'pagination': pagination
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
            getImageData(){
                let leanOut=[],bIn=[];
                let param={
                    type:0,
                    enterpriseId:this.enterprise.id,
                    beginTime:this.param.beginTime,
                    endTime:this.param.endTime
                }
                this.$store.dispatch('enterprise_selectListDayAmount', param).then(()=>{
                    for (let i=0;this.listDayAmount&&i<this.listDayAmount.length;i++){
                        let item=this.listDayAmount[i];
                        leanOut.push([new Date(item.transactionTime).getTime(),item.creditAmount||0]);
                        bIn.push([new Date(item.transactionTime).getTime(),item.debitAmount||0]);
                    }
                    this.imageData={leanOut, bIn};
                    this.buildEcharts();
                    this.buildEchartsOut();
                });
            },
            getTotalData(){
                let totalLean=0,totalb=0,totalLeanNum=0,totalbNum=0;
                for (let i = 0; this.dataList.list&&i < this.dataList.list.length; i++) {
                    let item = this.dataList.list[i];
                    let flag=item.debitAmount>item.creditAmount;//true就是借,就是流出
                    if(flag){
                        totalLean++;
                        totalLeanNum+=item.debitAmount;
                    }else{
                        totalb++;
                        item.creditAmount=item.creditAmount||0;
                        totalbNum+=item.creditAmount;
                    }
                }
                this.totalData= { totalLean, totalb, totalLeanNum:totalLeanNum.toFixed(2), totalbNum:totalbNum.toFixed(2) }; 
            },
            rangechange(v) {
                this.daterange = v.split(' - ');
                this.param.beginTime = this.daterange[0];
                this.param.endTime = this.daterange[1];
                if(!this.ready){
                    return;
                }
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.getTotalData()
                    this.getImageData();
                });
            },
            handleSizeChange(size) {
                this.param.pageSize = size;
                this.param.pageNo = 1;
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.getTotalData()
                });
            },
            handleCurrentChange(page) {
                this.param.pageNo = page;
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.getTotalData()
                });
            },
            buildEcharts() {
                
                let myChart = echarts.init(document.getElementById('funflowIn'),'customed');
                // 指定图表的配置项和数据
                let option = {
                    title: { text: '银账资金账户流入', x: 'center' }, tooltip: { trigger: 'axis' },
                    legend: { data: ['流入'], right: 50, orient: 'vertical' },
                    xAxis:  { type:'time'},
                    yAxis: { name: '金额(元)',type:'value', nameLocation: 'end',max:function(value){
                        
                        return value.max<this.riskLine.FLOWS_INTO_MEDIUM?this.riskLine.FLOWS_INTO_MEDIUM:value.max;
                    }},
                    series: [{
                        name: '流入', type: 'line',
                        data: this.imageData.bIn,
                        sampling:'max',
                        smoothMonotone:'x',
                        stack: '流入',
                        markLine : {
                            lineStyle: {
                                normal: {
                                    type: 'dashed'
                                }
                            },
                            data : [
                                { yAxis: this.riskLine.FLOWS_INTO__HIGH ,lineStyle:{normal:{color:'rgb(255, 135, 97)'}},label:{normal:{position:'end',formatter:'高风险'}}},
                                { yAxis: this.riskLine.FLOWS_INTO_MEDIUM,lineStyle:{normal:{color:'rgb(251, 201, 55)'}},label:{normal:{position:'end',formatter:'中风险'}}}
                            ]
                        },
                        lineStyle: { normal: { width: 3 } }
                    }],
                    dataZoom: [{
                        startValue: this.param.beginTime?new Date(this.param.beginTime).getTime():new Date().getTime(),
                        endValue:  this.param.endTime?new Date(this.param.endTime).getTime():new Date().getTime()-1000*60*60*24*30,
                        filterMode: 'empty'
                    }, {
                        filterMode: 'empty',
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
                    xAxis: { type:'time'},
                    yAxis: { name: '金额(元)', nameLocation: 'end',min:function(value) {
                        return value.min<this.riskLine.FLOWS_OUT_MEDIUM?value.min:this.riskLine.FLOWS_OUT_MEDIUM;
                    },max:function(value){
                        return value.max>this.riskLine.FLOWS_OUT_HIGH?value.max:this.riskLine.FLOWS_OUT_HIGH;
                    }},
                    series: [{
                        markLine : {
                            lineStyle: {
                                normal: {
                                    type: 'dashed'
                                }
                            },
                            data : [
                                { yAxis:  this.riskLine.FLOWS_OUT_HIGH,lineStyle:{normal:{color:'rgb(255, 135, 97)'}},label:{normal:{position:'end',formatter:'高风险'}}},
                                { yAxis:  this.riskLine.FLOWS_OUT_MEDIUM,lineStyle:{normal:{color:'rgb(251, 201, 55)' }},label:{normal:{position:'end',formatter:'中风险'}}}
                            ]
                        },
                        sampling:'max',
                        smoothMonotone:'x',
                        stack: '流出',
                        name: '流出', type: 'line',
                        data: this.imageData.leanOut,
                        lineStyle: { normal: { width: 3 } }
                    }],
                    dataZoom: [{
                        startValue: this.param.beginTime?new Date(this.param.beginTime).getTime():new Date().getTime(),
                        endValue:  this.param.endTime?new Date(this.param.endTime).getTime():new Date().getTime()-1000*60*60*24*30,
                        filterMode: 'empty'
                    }, {
                        type: 'inside',
                        filterMode: 'empty'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            getRiskLine(){
                for (var i = 0; i < this.projectRiskRule.length; i++) {
                    var item = this.projectRiskRule[i];
                    if(item.code&&item.code.length>0){
                        switch (item.code) {
                            case 'CASH_FLOWS_INTO_HIGH':
                                this.riskLine.FLOWS_INTO__HIGH=parseInt(item.riskRuleGroup[0].riskRuleInfo[0].value);
                                break;
                            case 'CASH_FLOWS_INTO_MEDIUM':
                                let riskRuleInfo1=item.riskRuleGroup[0].riskRuleInfo;
                                for (let i = 0; i < riskRuleInfo1.length; i++) {
                                    let it = riskRuleInfo1[i];
                                    if(it.relationName=='<'){
                                        this.riskLine.FLOWS_INTO_MEDIUM=parseInt(it.value);
                                    }
                                }
                                break;
                            case 'CASH_FLOWS_OUT_HIGH':
                                this.riskLine.FLOWS_OUT_HIGH=parseInt(item.riskRuleGroup[0].riskRuleInfo[0].value);
                                break;
                            case 'CASH_FLOWS_OUT_MEDIUM':
                                let riskRuleInfo2=item.riskRuleGroup[0].riskRuleInfo;
                                for (let i = 0; i < riskRuleInfo2.length; i++) {
                                    let it = riskRuleInfo2[i];
                                    if(it.relationName=='>'){
                                        this.riskLine.FLOWS_OUT_MEDIUM=parseInt(it.value);
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        },
        mounted () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                this.daterange=[start,end];
                this.param = {
                    beginTime: this.daterange[0],
                    endTime: this.daterange[1],
                    id:this.itemManageDetail.enterpriseId,
                    pageSize: 10,
                    pageNo: 1
                }
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.ready=true;
                    this.$store.dispatch('risk_selectProjectRiskRule',{id:this.itemManageDetail.id,category:1}).then(()=>{
                        this.getTotalData()
                        this.getRiskLine();
                        this.getImageData();
                    })
                });
        },
        data() {
            return {
                ready:false,
                listData:{},
                daterange: [],
                param: {},
                imageData:{},
                totalData:{},
                riskLine:{}
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