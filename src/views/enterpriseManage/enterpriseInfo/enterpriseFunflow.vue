
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
    
        #enterpriseFunflow .datepp {
            margin-left: 20px;
        }
    
        #enterpriseFunflow .el-table .cell {
            text-align: center;
        }
    
        #enterpriseFunflow .el-table__body .cell {
            color: #535455;
            font-size: 12px;
        }
        #enterpriseFunflow .head-action{
            width:500px;
            height: 130px;
            display: flex;
            flex-flow: row nowrap;
            align-items: stretch;
            justify-content: flex-start;
            border: 1px solid #b1b1b1;
            padding:20px;
            float:left;
            margin:20px;
        }
        #enterpriseFunflow .info .info-item{
            display: flex;
            flex-flow: row nowrap;
            align-items: stretch;
            justify-content: flex-start;
            width:300px;
        }
        #enterpriseFunflow .info .info-item label{
            width:140px;
            text-align: right;
            margin-right:10px;
        }
        #enterpriseFunflow .banlance{
            width:200px;
        }
        #enterpriseFunflow .banlance label{
            margin: 20px auto 10px 30px;
            font-size:14px;
            display: block;

        }
        #enterpriseFunflow .banlance span{
            font-size:16px;
            margin-left:30px;
            color:rgb(6, 204, 182);
            font-weight:bold;
        }
        #enterpriseFunflow .typebutton{
            width:75px;
            color:rgb(6, 204, 182);
            border-radius: 5px;
            height:34px;
            background: white;
            outline: none;
            
            border: 1px solid rgb(6, 204, 182);
        }
        #enterpriseFunflow .typebutton:nth-child(1){
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;

        }
        #enterpriseFunflow .typebutton:nth-child(2){
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;

        }
        #enterpriseFunflow .noeffect{
            color:#999;
            background: rgb(205, 214, 214);
            border:none;
        }
        #enterpriseFunflow .actionbar{
           width:200px;
           float: right;
           margin-right:150px;
        }
    </style>
<template>
    <div id='enterpriseFunflow'>
        <el-row style="margin:10px auto 10px auto;">
                <div class="head-action"  v-for="(item,index) in account" :key="index">
                    <div class="info">
                        <div class="info-item">
                            <label>开户许可核准号</label>
                            <span>{{item.accountApprovalNumber}}</span>
                        </div>
                        <div class="info-item">
                            <label>开户银行</label>
                            <span>{{item.depositBank}}</span>
                        </div>
                        <div class="info-item">
                            <label>基本存款账账户账号</label>
                            <span>{{item.basicDepositAccountNumber}}</span>
                        </div>
                        <div class="info-item">
                            <label>账号名称</label>
                            <span>{{item.accountName}}</span>
                        </div>
                        <div class="info-item">
                            <label>
                                <el-button size="mini" @click="uploadMS(item)">上传民生银行excel</el-button>
                            </label>   
                        </div>

                    </div>
                    <div class="banlance">
                        <label>账户余额</label>
                        <span>{{item.balance||0}}元</span>
                    </div>
                </div>
        </el-row>
        <el-row>
            <el-col :span="24">
                <label class="titleField" >日期</label>&emsp;
                <span >
                    <el-date-picker :clearable="false"  v-model="startTime" align="right" :editable="false" type="date"   @change="startChange" placeholder="选择开始日期"></el-date-picker>
                    至
                    <el-date-picker :clearable="false"  v-model="endTime" align="right" :editable="false" type="date"  @change="endChange" placeholder="选择结束日期"></el-date-picker>
                </span>
                <div class="actionbar">
                    <button class="typebutton" type="button" :class="{'noeffect':!showChart}" @click="showChart=true"> 图表 </button>
                    <button class="typebutton" type="button" :class="{'noeffect':showChart}" @click="showChart=false"> 明细 </button>
                </div> 
            </el-col>
        </el-row>
        <el-row v-show="showChart">
            <el-col :span="24" style="margin-top:15px">
                <div id="balance">

                </div>
            </el-col>
        </el-row>
        <el-row v-show="showChart">
            <el-col :span="24" style="margin-top:45px">
                <div id="funflowIn">

                </div>
            </el-col>
        </el-row>
        <el-row v-show="!showChart">
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
        <el-row v-show="!showChart">
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
        <el-dialog title="导入哆啦宝pos民生银行账单" :visible.sync="MSPosImport">
                <el-form>
                    <el-form-item label="上传账单excel">
                        <el-button @click="uploadFile" :loading="fileloading">上传</el-button>
                    </el-form-item>
                    <el-form-item label="上传文件列表">
                        <el-table border :data="exportlist" stripe style="width: 100%">
                            <el-table-column prop="name" label="文件名"></el-table-column>
                            <el-table-column prop="size" label="文件大小" align="center"> </el-table-column>
                            <el-table-column prop="time" label="上传时间" align="center"> </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button class="btn-style" size="small" :disabled="scope.row.isExported" @click="exportFile(scope.row)">{{scope.row.isExported?'已导入':'导入'}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <form style="display:none">
                            <input type="file" @change="fileChange" name="file" ref="fileInput">
                        </form>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-button style="float:right"  @click="MSPosImport=false">取消</el-button>
                    <el-button style="float:right;margin-right:10px;" type="primary" @click="MSPosImport=false">确定</el-button>
                </el-row>
        </el-dialog>
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
            },
            listDayAmount:function (){
                return this.$store.state.enterprise.listDayAmount||{};
            },
            account:function(){
                return this.$store.state.item.authInfo&&this.$store.state.item.authInfo||{};
            }
        },
        components: {
            'pagination': pagination
        },
        methods: {
            uploadMS(item){
                // if(!item.id){
                //     this.$message.warning('银行账号未设置！');
                //     return;
                // }
                this.accountId=item.id;
                this.MSPosImport=true;
            },
            uploadFile() {
                this.$refs['fileInput'].click();
                // this.exportlist
            },
            fileChange(event) {
                if(event.target.files.length==0){
                    return;
                }
                let file = event.target.files[0];
                let formData = new FormData();
                formData.append('file', file);
                let xhr = new XMLHttpRequest();
                xhr.open('post', '/ajax/fileupload');
                let self = this;
                this.fileloading=true;
                xhr.onload = function () {
                    self.fileloading=false;
                    if (!xhr.response) {
                        self.$message.warning(JSON.parse(xhr.response).information);
                    } else if (xhr.status == 200) {
                        self.$message.success('上传完成');
                        let temp = {
                            name:file.name,
                            size:file.size+'byte',
                            time:new Date().toLocaleString(),
                            path:JSON.parse(JSON.parse(xhr.response).objectLiteral),
                            isExported:false
                        }
                        self.exportlist.push(temp);
                    }
                };
                xhr.send(formData);
            },
            exportFile(item) {
                this.$store.dispatch('item_saveDataEnterCMBC',{accountId:this.accountId,path:item.path}).then((data)=>{
                    if(data.success){
                        this.$message.success('导入成功');
                        item.isExported=true;
                    }else{
                        this.$message.warning(data.information);
                    }
                })
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
            getImageData(){
                let param={
                    type:0,
                    enterpriseId:this.enterprise.id,
                    beginTime: this.param.beginTime.toLocaleString(),
                    endTime: this.param.endTime.toLocaleString()
                }
                let leanOut=[],bIn=[],balance=[];
                this.$store.dispatch('enterprise_selectListDayAmount',param).then(()=>{
                    Object.keys(this.listDayAmount).forEach((key)=>{
                        let creditAmount=0,debitAmount=0,balan=0;
                        this.listDayAmount[key].forEach((item)=>{
                            creditAmount+=item.creditAmount||0;
                            debitAmount+=item.debitAmount||0;
                            balan+=item.balance||0;
                        })
                        leanOut.push([new Date(key).getTime(), creditAmount || 0]);
                        bIn.push([new Date(key).getTime(),debitAmount || 0]);
                        balance.push([new Date(key).getTime(),balan||0]);
                    })
                    this.imageData={leanOut, bIn,balance }
                    this.buildEcharts();
                })
            },
            startChange(v){
                if(!this.ready){
                    return;
                }
                this.param.beginTime=v;
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.getTotalData()
                    this.getImageData()
                });
            },
            endChange(v){
                if(!this.ready){
                    return;
                }
                this.param.endTime=v;
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
                    this.getTotalData()
                    this.getImageData()
                });
            },
            handleSizeChange(size) {
                this.param.pageSize = size;
                this.param.pageNo = 1;
                this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                    this.getTotalData()
                    this.listData=JSON.parse(JSON.stringify(this.dataList));
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
                                    return moment(new Date(params.value)).format('YYYY-MM-DD');
                                }
                            }
                        }},
                        { type:'time',gridIndex:1,axisPointer:{
                            label:{
                                formatter:function(params){
                                    return moment(new Date(params.value)).format('YYYY-MM-DD');
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
                        data: this.imageData.bIn,
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
                        data: this.imageData.leanOut,
                        lineStyle: { normal: { width: 3 } }
                    }],
                    dataZoom: [{
                        show:true,
                        realtime: true,
                        startValue: this.param.beginTime?new Date(this.param.beginTime).getTime():new Date().getTime(),
                        endValue:  this.param.endTime?new Date(this.param.endTime).getTime():new Date().getTime()-1000*60*60*24*28,
                        xAxisIndex: [0, 1]
                    },{
                        realtime: true,
                        startValue: this.param.beginTime?new Date(this.param.beginTime).getTime():new Date().getTime(),
                        endValue:  this.param.endTime?new Date(this.param.endTime).getTime():new Date().getTime()-1000*60*60*24*28,
                        xAxisIndex: [0, 1],
                        type: 'inside'
                    }]
                };
                let balanceOption ={
                    title: { text: '银账资金账户余额情况', x: 'center' }, tooltip: { trigger: 'axis' },
                    legend: { data: ['余额'], right: 100, orient: 'vertical'},
                    xAxis: { type:'time' ,position: 'bottom',
                    axisPointer:{label:{ formatter:function(params){ return moment(new Date(params.value)).format('YYYY-MM-DD');}},
                        axisTick:{length:1}
                    }},
                    yAxis:{ name: '金额(元)', nameLocation: 'end'},
                    series: [{
                        name: '余额', type: 'line',
                        data: this.imageData.balance,
                        lineStyle: { normal: { width: 3} }
                    }],
                    dataZoom: [{
                        startValue: this.param.beginTime?new Date(this.param.beginTime).getTime():new Date().getTime(),
                        endValue:  this.param.endTime?new Date(this.param.endTime).getTime():new Date().getTime()-1000*60*60*24*28
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
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            this.startTime=start;
            this.endTime=end;
            this.param = {
                beginTime:start,
                endTime: end,
                id: this.enterprise.id,
                pageSize: 10,
                pageNo: 1,
                type:1//1：银行
            }
            this.$store.dispatch('enterprise_getAccountDetail', this.param).then(()=>{
                this.ready=true;
                this.listData=JSON.parse(JSON.stringify(this.dataList));
                this.getTotalData();
                this.getImageData();
            });

        },
        data() {
            return {
                accountId:'',
                MSPosImport:false,
                fileloading:false,
                exportlist:[],
                ready:false,
                startTime:'',
                endTime:'',
                showChart:true,
                lastBalance:0,
                listData:{},
                param: {},
                imageData:{},
                totalData:{}
            }
        }
    }

</script>
