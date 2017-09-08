<template>
    <div id='riskFunflow' style="padding:50px;">
        <div class="back-button"><el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button></div>
        <el-row style="margin:30px auto 30px auto;">
            <el-col :span="24">
                <div class="titleField">
                    <span>代理商编号：</span>
                    <span>{{listData.list&&listData.list[0].agent_num}}</span> &emsp;&emsp;&emsp;&emsp;
                    <span>商户编号：</span>
                    <span>{{listData.list&&listData.list[0].customer_num}}</span> &emsp;&emsp;&emsp;&emsp;
                    <span>商户简称：</span>
                    <span>{{listData.list&&listData.list[0].short_name}}</span>
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
            <el-col :span="24" style="margin :45px auto 50px 0">
                <div id="riskFunflowchart"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col style="margin-top:-40px">
                <div style="float:right;font-size: 18px;color: rgb(6, 204, 182);font-weight:600">
                    <span>合计：入账</span>
                    <span>{{totalData.totalb}}</span>
                    <span>笔</span>&nbsp;
                    <span>{{totalData.totalbNum}}</span>
                    <span>元，退款</span>
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
                    <el-table-column prop="order_num" width="120"  label="订单号" align="center"> </el-table-column>
                    <el-table-column prop="order_amount"  label="订单金额" align="center"> </el-table-column>
                    <el-table-column prop="pay_amount"  label="实付金额" align="center"> </el-table-column>
                    <el-table-column prop="dlb_discount"  label="哆啦宝补贴" align="center"> </el-table-column>
                    <el-table-column prop="merchant_discount"  label="商家补贴" align="center"> </el-table-column>
                    <el-table-column prop="balance_account_time" width="110" label="入账时间" align="center"> </el-table-column>
                    <el-table-column prop="complete_time" width="110" label="完成时间" align="center"> </el-table-column>
                    <el-table-column prop="refund_time" width="110"  label="退款时间" align="center"> </el-table-column>
                    <el-table-column prop="fee"  width="90"  label="交易费率" align="center"> </el-table-column>
                    <el-table-column prop="fee_value"  width="80"  label="手续费" align="center"> </el-table-column>
                    <el-table-column prop="status"  label="订单状态" width="90" align="center"> </el-table-column>
                    <el-table-column prop="batch_num" width="90" label="批次号" align="center"> </el-table-column>
                    <el-table-column prop="machine_num" width="90" label="机具号" align="center"> </el-table-column>
                    <el-table-column prop="shop_name" width="90" label="店铺名称" align="center"> </el-table-column>
                    <el-table-column prop="shop_num" width="90" label="店铺编号" align="center"> </el-table-column>
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
        name: 'riskFunflow',
        computed: {
            projectRiskRule:function(){
                return this.$store.state.risk.projectRiskRule||[];
            },
            dataList: function () {
                return this.$store.state.enterprise.enterpriseAccountDetailDBL||{};
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
                    type:1,
                    enterpriseId:this.enterprise.id,
                    beginTime:this.param.beginTime,
                    endTime:this.param.endTime,
                }
                this.$store.dispatch('enterprise_selectListDayAmount',param).then(()=>{
                    for (let i=0;this.listDayAmount&&i<this.listDayAmount.length;i++){
                        let item=this.listDayAmount[i];
                        bIn.push([new Date(item.transactionTime).getTime(),item.pay_amount||0]);
                    }
                    this.imageData={bIn};
                    this.buildEcharts();
                })
            },
            getTotalData(){
                let totalLean=0,totalb=0,totalLeanNum=0,totalbNum=0;
                for (let i=0;this.dataList.list&&i<this.dataList.list.length;i++){
                    let item=this.dataList.list[i];
                    let flag=item.refund_time&&item.refund_time.length>0;//true就是借,就是流出
                    if(flag){
                        totalLean++;
                        totalLeanNum+=item.pay_amount;
                    }else{
                        totalb++;
                        totalbNum+=item.pay_amount;
                    }
                }
                this.totalData= { totalLean, totalb, totalLeanNum, totalbNum };
            },
            rangechange(v) {
                this.daterange = v.split(' - ');
                this.param.beginTime = this.daterange[0];
                this.param.endTime = this.daterange[1];
                if(!this.ready){
                    return;
                }
                this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.getTotalData();
                    this.getImageData();
                });
            },
            handleSizeChange(size) {
                this.param.pageSize = size;
                this.param.pageNo = 1;
                this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                   this.listData=JSON.parse(JSON.stringify(this.dataList));
                   this.getTotalData();
                });
            },
            handleCurrentChange(page) {
                this.param.pageNo = page;
                this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                   this.listData=JSON.parse(JSON.stringify(this.dataList));
                   this.getTotalData();
                });
            },
            buildEcharts() {
                let myChart = echarts.init(document.getElementById('riskFunflowchart'),'customed');
                // 指定图表的配置项和数据
                let option = {
                    title: { text: '店铺订单收入', x: 'center' }, tooltip: { trigger: 'axis' },
                    legend: { data: ['收入'], right: 100, orient: 'vertical' },
                    xAxis: {
                        type:'time'
                    },
                    yAxis: { name: '金额(元)', nameLocation: 'end' },
                    series: [{
                        name: '收入', type: 'line',
                        data: this.imageData.bIn,
                        markLine : {
                            lineStyle: {
                                normal: {
                                    type: 'dashed'
                                }
                            },
                            data : [
                                { yAxis:  this.riskLine.DLB_IN_HIGH,lineStyle:{normal:{color:'rgb(255, 135, 97)' }},label:{normal:{position:'end',formatter:'高风险'}}},
                                { yAxis:  this.riskLine.DLB_IN_MIDDLE,lineStyle:{normal:{color:'rgb(251, 201, 55)'}},label:{normal:{position:'end',formatter:'中风险'}}}
                            ]
                        },
                        lineStyle: { normal: { width: 3 } }
                    }],
                    dataZoom: [{
                        startValue: this.param.beginTime?new Date(this.param.beginTime).getTime():new Date().getTime(),
                        endValue:  this.param.endTime?new Date(this.param.endTime).getTime():new Date().getTime()-1000*60*60*24*30
                    }, {
                        type: 'inside'
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
                            case 'DLB_IN_HIGH':
                                this.riskLine.DLB_IN_HIGH=parseInt(item.riskRuleGroup[0].riskRuleInfo[0].value);
                                break;
                            case 'DLB_IN_MIDDLE':
                                let riskRuleInfo1=item.riskRuleGroup[0].riskRuleInfo;
                                for (let i = 0; i < riskRuleInfo1.length; i++) {
                                    let it = riskRuleInfo1[i];
                                    if(it.relationName=='<'){
                                        this.riskLine.DLB_IN_MIDDLE=parseInt(it.value);
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            },
        },
        mounted () {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            this.daterange=[start,end];
               this.param = {
                    beginTime: this.daterange[0],
                    endTime: this.daterange[1],
                    id:this.itemManageDetail.enterpriseId,
                    pageSize: 10,
                    pageNo: 1
                }
                this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                   this.listData=JSON.parse(JSON.stringify(this.dataList));
                   this.ready=true;
                   this.$store.dispatch('risk_selectProjectRiskRule',{id:this.itemManageDetail.id,category:1}).then(()=>{
                        this.getTotalData()
                        this.getRiskLine();
                        console.log(this.riskLine)
                        this.getImageData();
                    })
                   
                });
        },
        data() {
            return {
                ready:false,
                daterange: [],
                param: {},
                totalData:{},
                imageData:[],
                listData:[],
                riskLine:{}
            }
        }
    }

</script>

<style>
    #riskFunflowchart {
        width: 95%;
        height: 400px;
    }

    #riskFunflow .titleField {
        font-size: 18px;
        font-weight: 600;
        color: rgb(51, 51, 51);
    }

    .datepp {
        margin-left: 20px;
    }

    #riskFunflow .el-table .cell {
        text-align: center;
    }

    #riskFunflow .el-table__body .cell {
        color: #a3abbe;
        font-size: 12px;
    }
</style>