<template>
    <div id='coreFinancialIndex'>
        <el-row>
            <el-col :span="24" style="background:#ffffff">
                <el-row>
                    <el-col :span="24" style="margin-top:20px;">
                        <label class="text-label">频&emsp;&emsp;率</label>
                        <el-button class="sbtn" size="small" @click="select(1)" :class="{'selectb':M}">月</el-button>
                        <el-button class="sbtn" size="small" @click="select(2)" :class="{'selectb':J}">季</el-button>
                        <el-button class="sbtn" size="small" @click="select(3)" :class="{'selectb':Y}">年</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="margin-top:30px">
                        <label class="text-label">期&emsp;&emsp;数</label>
                        <el-button class="sbtn" size="small" @click="select(4)" :class="{'selectb':Q3}">3</el-button>
                        <el-button class="sbtn" size="small" @click="select(5)" :class="{'selectb':Q6}">6</el-button>
                        <el-button class="sbtn" size="small" @click="select(6)" :class="{'selectb':Q9}">9</el-button>
                        <el-button class="sbtn" size="small" @click="select(7)" :class="{'selectb':Q12}">12</el-button>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="24" style="margin-top:30px;;margin-right:90px">
                        <table id="datatable" style="width:100%;border:1px solid #e1e1e1">
                            <thead style="background:#eceff1">
                                <tr>
                                    <th style="width:300px"></th>
                                    <th style="width:500px">分析指标</th>
                                    <th width="150" v-for="n in listData.length">
                                        {{listData[n-1].year+'年'+(M?(listData[n-1].month+'月'):'')+(J?(listData[n-1].quarter+'季度'):'')}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>                                     <!--<td v-for="n in listData.length"></td>-->
                                    <td>偿债能力</td> <td>流动比例</td> <td v-for="n in listData.length">{{listData[n-1].currentRatio}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>速动比例</td> <td v-for="n in listData.length">{{listData[n-1].quickRatio}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>现金比例</td> <td v-for="n in listData.length">{{listData[n-1].cashRatio}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>资产负债率</td> <td v-for="n in listData.length">{{listData[n-1].assetRatio}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>产权比例</td> <td v-for="n in listData.length">{{listData[n-1].equityRatio}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>有形净值比例</td> <td v-for="n in listData.length">{{listData[n-1].netWorthRatio}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>已获利息倍数</td> <td v-for="n in listData.length">{{listData[n-1].interestMultiples}}</td>
                                </tr>
                                <tr>
                                    <td>盈利能力</td> <td>ROE</td> <td v-for="n in listData.length">{{listData[n-1].roe}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>ROA</td> <td v-for="n in listData.length">{{listData[n-1].roa}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>销售毛利率</td> <td v-for="n in listData.length">{{listData[n-1].saleRate}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>销售净利率</td> <td v-for="n in listData.length">{{listData[n-1].netSaleRate}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>成本费用利率</td> <td v-for="n in listData.length">{{listData[n-1].costProfitRatio}}</td>
                                </tr>
                                <tr>
                                    <td>发展前景</td> <td>企业销售增长率</td> <td v-for="n in listData.length">{{listData[n-1].salesGrowthRate}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>净利润增长率</td> <td v-for="n in listData.length">{{listData[n-1].netProfitGrowthRate}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>总资产增长率</td> <td v-for="n in listData.length">{{listData[n-1].totalAssetsGrowthRate}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>股东权益增长率</td> <td v-for="n in listData.length">{{listData[n-1].equityGrowthRate}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>经营活动产生的现金流量净额增长率</td> <td v-for="n in listData.length">{{listData[n-1].netCashGrowthRate}}</td>
                                </tr>
                                <tr>
                                    <td>运营效率</td> <td>存货周转率</td> <td v-for="n in listData.length">{{listData[n-1].inventoryTurnover}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>应收账款周转率</td> <td v-for="n in listData.length">{{listData[n-1].accountsReceivableTurnover}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>固定资产周转率</td> <td v-for="n in listData.length">{{listData[n-1].fixedAssetsTurnover}}</td>
                                </tr>
                                <tr>
                                    <td></td> <td>总资产周转率</td> <td v-for="n in listData.length">{{listData[n-1].totalAssetsTurnover}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'coreFinancialIndex',
    data () {
        return {
            M:true,J:false,Y:false,Q3:true,Q6:false,Q9:false,Q12:false,
            param:{}
        }
    },
    props: ['enterprise'],
    computed: {
       listData:function(){
           if(this.$store.state.enterprise.coreFinance.length&&this.$store.state.enterprise.coreFinance.length==0){
               this.$message('暂无该条件核心财务指标数据')
           }
           return this.$store.state.enterprise.coreFinance;
       }
    },
    beforeMount () {
        this.param={type:'month',num:3,enterpriseId:this.enterprise.id};
        this.$store.dispatch('enterprise_coreFinance',this.param,this);
    },
    methods: {
        select(n) {
            if (n <= 3) {
                this.M = this.J = this.Y = false
            } else {
                this.Q3 = this.Q6 = this.Q9 = this.Q12 = false;
            }
            switch (n) {
                case 1:
                    this.param.type = 'month';
                    this.M = true; break;
                case 2:
                    this.param.type = 'quarter';
                    this.J = true; break;
                case 3:
                    this.param.type = 'year';
                    this.Y = true; break;
                case 4:
                    this.param.num = 3;
                    this.Q3 = true; break;
                case 5:
                    this.param.num = 6;
                    this.Q6 = true; break;
                case 6:
                    this.param.num = 9;
                    this.Q9 = true; break;
                case 7:
                    this.param.num = 12;
                    this.Q12 = true; break;
                default:
                    break;
            }
            this.$store.dispatch('enterprise_coreFinance', this.param,this);
        }
    }
}
</script>

<style>
#coreFinancialIndex .sbtn{
    margin-left:20px;
    padding-left:30px;
    padding-right:30px;
}
#coreFinancialIndex .text-label{
    font-weight: 550;
    font-size: 20px;
}
#coreFinancialIndex .selectb{
    background: #06CCB7;
    color: white;
}
#coreFinancialIndex #datatable *{
    text-align: center;
    font-size:18px;
    border: 1px solid #e1e1e1;
    height:45px;
}
#coreFinancialIndex #datatable td{
    min-width: 110px;
}
#coreFinancialIndex #datatable td:first-child{
    min-width: 300px;
}
#coreFinancialIndex #datatable td:nth-child(2){
    min-width: 300px;
}
</style>