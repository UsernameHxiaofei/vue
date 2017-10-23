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
                <span >
                        <el-date-picker v-model="startTime" :clearable="false" align="right" :editable="false" type="date"   @change="startChange" placeholder="选择开始日期"></el-date-picker>
                        至
                        <el-date-picker v-model="endTime" :clearable="false"  align="right" :editable="false" type="date"  @change="endChange" placeholder="选择结束日期"></el-date-picker>
                </span>
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
                    <span>元</span>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table border :data="listData.list" stripe style="width: 100%">
                    <el-table-column prop="order_num" width="120"  label="订单号" align="center"> </el-table-column>
                    <el-table-column prop="order_amount"  label="订单金额" width="100" align="center"> </el-table-column>
                    <el-table-column prop="pay_amount"  label="实付金额" width="100" align="center"> </el-table-column>
                    <el-table-column prop="dlb_discount"  label="哆啦宝补贴" width="110" align="center"> </el-table-column>
                    <el-table-column prop="merchant_discount"  label="商家补贴" width="100" align="center"> </el-table-column>
                    <el-table-column prop="balance_account_time" width="110" label="入账时间" align="center"> </el-table-column>
                    <el-table-column prop="complete_time" label="完成时间" align="center"> </el-table-column>
                    <el-table-column prop="refund_time"   label="退款时间" align="center"> </el-table-column>
                    <el-table-column prop="fee"  width="100"  label="交易费率" align="center"> </el-table-column>
                    <el-table-column prop="fee_value"  width="80"  label="手续费" align="center"> </el-table-column>
                    <el-table-column prop="status"  label="订单状态" width="100" align="center"> </el-table-column>
                    <el-table-column prop="batch_num" width="90" label="批次号" align="center"> </el-table-column>
                    <el-table-column prop="machine_num" width="90" label="机具号" align="center"> </el-table-column>
                    <el-table-column prop="shop_name" width="110" label="店铺名称" align="center"> </el-table-column>
                    <el-table-column prop="shop_num" width="100" label="店铺编号" align="center"> </el-table-column>
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
                return this.$store.state.enterprise.enterpriseAccountDetailDBL||{};
            },
            listDayAmount:function (){
                return this.$store.state.enterprise.listDayAmount||{};
            }
        },
        components: {
            'pagination': pagination
        },
        methods: {
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
                        bIn.push([new Date(item.transactionTime).getTime(),item.order_amount||0]);
                    }
                    this.imageData={bIn};
                    this.buildEcharts();
                })
            },
            getTotalData(){
                let totalLean=0,totalb=0,totalLeanNum=0,totalbNum=0;
                for (let i=0;this.dataList.list&&i<this.dataList.list.length;i++){
                    let item=this.dataList.list[i];
                    totalb++;
                    totalbNum+=item.order_amount;
                }
                this.totalData= { totalLean, totalb, totalLeanNum, totalbNum };
            },
            startChange(v){
                this.param.beginTime=v||'';
                this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.getTotalData();
                    this.getImageData();
               });
            },
            endChange(v){
                this.param.endTime=v||'';
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
                let myChart = echarts.init(document.getElementById('enterpriseDLBchart'),'customed');
                // 指定图表的配置项和数据
                let option = {
                    title: { text: '店铺订单收入', left: '300' }, tooltip: { trigger: 'axis' },
                    legend: { data: ['收入'], right: 100, orient: 'vertical' },
                    xAxis: { type:'time' ,position: 'bottom',axisPointer:{
                        label:{
                            formatter:function(params){
                                return moment(new Date(params.value)).format('YYYY-MM-DD');
                            }
                        }
                    }},
                    yAxis: { name: '金额(元)', nameLocation: 'end' },
                    series: [{
                        name: '收入', type: 'line',
                        data: this.imageData.bIn,
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
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            this.startTime=start;
            this.endTime=end;
            this.param = {
                beginTime: start,
                endTime:end,
                id: this.enterprise.id,
                pageSize: 10,
                pageNo: 1
            }
            this.$store.dispatch('enterprise_getAccountDetailDLB', this.param).then(()=>{
                this.listData=JSON.parse(JSON.stringify(this.dataList));
                this.getTotalData();
                this.getImageData();
            });
        },
        data() {
            return {
                startTime:'',
                endTime:'',
                param: {},
                totalData:{},
                imageData:[],
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
        color: #535455;
        font-size: 12px;
    }
</style>