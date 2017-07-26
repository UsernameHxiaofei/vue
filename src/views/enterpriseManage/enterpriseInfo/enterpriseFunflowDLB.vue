<template>
    <div id='enterpriseFunflowDLB'>
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
                <el-date-picker id="dateRange" v-model="daterange" @change="rangechange" clearable type="datetimerange" align="left" placeholder="选择日期范围"></el-date-picker>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="margin :45px auto 20px 0">
                <div id="enterpriseDLBchart"></div>
            </el-col>
        </el-row>
        <el-row style="margin-top:60px">
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
                    <el-table-column prop="order_num" width="130"  label="订单号" align="center"> </el-table-column>
                    <el-table-column prop="order_amount" width="100" label="订单金额" align="center"> </el-table-column>
                    <el-table-column prop="pay_amount" width="110" label="实付金额" align="center"> </el-table-column>
                    <el-table-column prop="dlb_discount" width="130" label="哆啦宝补贴" align="center"> </el-table-column>
                    <el-table-column prop="merchant_discount" width="100" label="商家补贴" align="center"> </el-table-column>
                    <el-table-column prop="balance_account_time" width="180" label="入账时间" align="center"> </el-table-column>
                    <el-table-column prop="complete_time" width="180" label="完成时间" align="center"> </el-table-column>
                    <el-table-column prop="refund_time" width="180"  label="退款时间" align="center"> </el-table-column>
                    <el-table-column prop="fee"  width="120"  label="交易费率" align="center"> </el-table-column>
                    <el-table-column prop="fee_value"  width="80"  label="手续费" align="center"> </el-table-column>
                    <el-table-column prop="status"  label="订单状态" width="110" align="center"> </el-table-column>
                    <el-table-column prop="batch_num" width="130" label="批次号" align="center"> </el-table-column>
                    <el-table-column prop="machine_num" width="110" label="机具号" align="center"> </el-table-column>
                    <el-table-column prop="shop_name" width="110" label="店铺名称" align="center"> </el-table-column>
                    <el-table-column prop="shop_num" width="110" label="店铺编号" align="center"> </el-table-column>
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
        props: ['enterprise'],
        computed: {
            dataList: function () {
                return this.$store.state.enterprise.enterpriseAccountDetailDBL||{};
            }
        },
        components: {
            'pagination': pagination
        },
        methods: {
            getTotalData(){
                let totalLean=0,totalb=0,totalLeanNum=0,totalbNum=0;
                let leanOut=[],bIn=[];
                this.paramImg={
                    beginTime: this.param.beginTime,
                    endTime: this.param.endTime,
                    id:this.enterprise.id,
                    pageSize: this.listData.totalCount,
                    pageNo: 1,
                    type:1//1：银行
                }
                this.$store.dispatch('enterprise_getAccountDetailDLB', this.paramImg).then(()=>{
                    for (let i=0;this.dataList.list&&i<this.dataList.list.length;i++){
                        let item=this.dataList.list[i];
                        let flag=item.refund_time&&item.refund_time.length>0;//true就是借,就是流出
                        if(flag){
                            totalLean++;
                            leanOut.push([new Date(item.complete_time).getTime(),item.order_amount]);
                            totalLeanNum+=item.pay_amount;
                        }else{
                            totalb++;
                            bIn.push([new Date(item.complete_time).getTime(),item.order_amount]);
                            totalbNum+=item.pay_amount;
                        }
                    }
                    this.totalData= { totalLean, totalb, totalLeanNum, totalbNum, leanOut, bIn};
                    this.buildEcharts();
                })
            },
            rangechange(v) {
                this.daterange = v.split(' - ');
                this.param.beginTime = this.daterange[0];
                this.param.endTime = this.daterange[1];
                this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                     this.listData=JSON.parse(JSON.stringify(this.dataList));
                     this.getTotalData()
                });
            },
            handleSizeChange(size) {
                this.param.pageSize = size;
                this.param.pageNo = 1;
                this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                });
            },
            handleCurrentChange(page) {
                this.param.pageNo = page;
                this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                });
            },
            buildEcharts() {
                let myChart = echarts.init(document.getElementById('enterpriseDLBchart'),'customed');
                // 指定图表的配置项和数据
                let option = {
                    title: { text: '店铺订单收入', left: '300' }, tooltip: { trigger: 'axis' },
                    legend: { data: ['收入', '流出'], right: 100, orient: 'vertical' },
                    xAxis: {
                        type:'time'
                    },
                    yAxis: { name: '金额(元)', nameLocation: 'end' },
                    series: [{
                        name: '收入', type: 'line',
                        data: this.totalData.bIn,
                        lineStyle: { normal: { width: 3 } }
                    }],
                    dataZoom: [{
                        type: 'inside'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },
        mounted () {
            this.param = {
                beginTime: this.daterange[0],
                endTime: this.daterange[1],
                id: this.enterprise.id,
                pageSize: 10,
                pageNo: 1
            }
            this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                 this.listData=JSON.parse(JSON.stringify(this.dataList));
                   this.getTotalData()
            });

        },
        data() {
            return {
                paramImg:{},
                daterange: [],
                param: {},
                totalData:{},
                listData:[]
            }
        }
    }

</script>

<style>
    #enterpriseDLBchart {
        width: 100%;
        height: 400px;
    }

    #enterpriseFunflowDLB .titleField {
        font-size: 18px;
        font-weight: 600;
        color: rgb(51, 51, 51);
    }

    .datepp {
        margin-left: 20px;
    }

    #enterpriseFunflowDLB .el-table .cell {
        text-align: center;
    }

    #enterpriseFunflowDLB .el-table__body .cell {
        color: #a3abbe;
        font-size: 12px;
    }
</style>