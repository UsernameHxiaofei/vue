<template>
    <div id='profit'>
         <el-row>
            <el-col :span="24" style="background:#ffffff">
                <el-row>
                    <el-col :span="24" style="margin-top:50px;">
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
                    <el-col :span="24" style="margin-top:30px">
                        <label class="text-label">单&emsp;&emsp;位</label>
                        <el-button class="sbtn" size="small" @click="select(8)" :class="{'selectb':unit1}">元</el-button>
                        <el-button class="sbtn" size="small" @click="select(9)" :class="{'selectb':unit2}">万元</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="margin-top:30px">
                        <label style="font-size:18px;float:left" >编制单位:<span>{{enterprise.name}}</span></label>
                        <label style="font-size:18px;float:right" >会小企02表</label>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <table id="datatable" style="width:100%;border:1px solid #e1e1e1;margin-bottom:100px">
                            <thead style="background:#eceff1">
                                <tr>
                                    <th style="width:500px">项目</th>
                                    <th style="width:80px">行次</th>
                                    <th width="150" v-for="n in listData.length">{{listData[n-1].year+'年'+(M?(listData[n-1].month+'月'):'')+(J?(listData[n-1].quarter+'季度'):'')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="td1">一、营业收入</td> <td>1</td> <td v-for="n in listData.length">{{listData[n-1].businessIncome}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">减：营业成本</td> <td>2</td> <td v-for="n in listData.length">{{listData[n-1].businessCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">营业税金及附加</td> <td>3</td> <td v-for="n in listData.length">{{listData[n-1].businessOtherTax}}</td> 
                                </tr>
                                <tr>
                                    <td class="td2">其中：消费税</td> <td>4</td> <td v-for="n in listData.length">{{listData[n-1].businessExciseTax}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">营业税</td> <td>5</td> <td v-for="n in listData.length">{{listData[n-1].businessSalesTax}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">城市维护建设税</td> <td>6</td> <td v-for="n in listData.length">{{listData[n-1].constructionTax}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">资源税</td> <td>7</td> <td v-for="n in listData.length">{{listData[n-1].resourceTax}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">土地增值税</td> <td>8</td> <td v-for="n in listData.length">{{listData[n-1].landValueAddTax}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">城镇土地使用税、房产税、车船税，印花税</td> <td>9</td> <td v-for="n in listData.length">{{listData[n-1].townAndOtherTax}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">教育费附加、矿产资源补偿费、排污费</td> <td>10</td> <td v-for="n in listData.length">{{listData[n-1].educationAndOtherTax}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">销售费用</td> <td>11</td> <td v-for="n in listData.length">{{listData[n-1].sellCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td2">其中：商品维修费</td> <td>12</td> <td v-for="n in listData.length">{{listData[n-1].maintenanceCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">广告费和业务宣传费</td> <td>13</td> <td v-for="n in listData.length">{{listData[n-1].advertisingCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">管理费用</td> <td>14</td> <td v-for="n in listData.length">{{listData[n-1].managementCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td2">其中：开办费</td> <td>15</td> <td v-for="n in listData.length">{{listData[n-1].organizationCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">业务招待费</td> <td>16</td> <td v-for="n in listData.length">{{listData[n-1].serveCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">研究费用</td> <td>17</td> <td v-for="n in listData.length">{{listData[n-1].researchCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">财务费用</td> <td>18</td> <td v-for="n in listData.length">{{listData[n-1].financialCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td2">其中：利息费用（收入以“-”号填列）</td> <td>19</td> <td v-for="n in listData.length">{{listData[n-1].interestCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">加：投资收益（损失以“-”号填列）</td> <td>20</td> <td v-for="n in listData.length">{{listData[n-1].investmentIncome}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">二、营业利润（亏损以“-”号填列）</td> <td>21</td> <td v-for="n in listData.length">{{listData[n-1].businessProfit}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">加：营业外收入</td> <td>22</td> <td v-for="n in listData.length">{{listData[n-1].businessOtherIncome}}</td> 
                                </tr>
                                <tr>
                                    <td class="td2">其中：政府补助</td> <td>23</td> <td v-for="n in listData.length">{{listData[n-1].governmentGrants}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">减：营业外支出</td> <td>24</td> <td v-for="n in listData.length">{{listData[n-1].businessOtherCost}}</td> 
                                </tr>
                                <tr>
                                    <td class="td2">其中：坏账损失</td> <td>25</td> <td v-for="n in listData.length">{{listData[n-1].badDebtLoss}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">无法收回的长期债券投资损失</td> <td>26</td> <td v-for="n in listData.length">{{listData[n-1].bondInvestmentLoss}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">无法收回的长期股权投资损失</td> <td>27</td> <td v-for="n in listData.length">{{listData[n-1].equityInvestmentLoss}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">自然灾害等不可抗力因素造成的损失</td> <td>28</td> <td v-for="n in listData.length">{{listData[n-1].naturalCalamitiesLoss}}</td> 
                                </tr>
                                <tr>
                                    <td class="td3">税收滞纳金</td> <td>29</td> <td v-for="n in listData.length">{{listData[n-1].taxLatePayment}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">三、利润总额（亏损总额以“-”号填列）</td> <td>30</td> <td v-for="n in listData.length">{{listData[n-1].profitTotal}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">减：所得税费用</td> <td>31</td> <td v-for="n in listData.length">{{listData[n-1].incomeTax}}</td> 
                                </tr>
                                <tr>
                                    <td class="td1">四、净利润（净亏损以“-”号填列）</td> <td>32</td> <td v-for="n in listData.length">{{listData[n-1].netProfit}}</td> 
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
    name: 'profit',
    props: ['enterprise'],
    data () {
        return {
            M:true,J:false,Y:false,Q3:true,Q6:false,Q9:false,Q12:false,unit1:true,unit2:false,
            param:{},listData:[]
        }
    },
    beforeMount () {
        this.param={type:'month',num:3,enterpriseId:this.enterprise.id};
        this.fetchData();
    },
    computed: {
      result:function(){
          return this.$store.state.enterprise.profit;
      }  
    },
    methods: {
        fetchData(){
                this.$store.dispatch('enterprise_profit',this.param).then(()=>{
                let list=this.result;
                if(this.unit2){
                        for (let i = 0; list&&i < list.length; i++) {
                            let item = list[i];
                            for (let attr in item) {
                                if (item.hasOwnProperty(attr)) {
                                    if(attr!='quarter'&&attr!='month'&&attr!='year'){
                                        let value = item[attr];
                                        let result=parseFloat(value/10000)||0;
                                        if((result+'').indexOf('.')!=-1){
                                            result=result.toFixed(2);
                                        }
                                        item[attr]=result;
                                    }
                                }
                            }
                        }
                    }
                    this.listData=list;
                })
            },
        select(n){
          if(n<=3){
            this.M=this.J=this.Y=false
          }else if(n<=7){
            this.Q3=this.Q6=this.Q9=this.Q12=false;
          }else{
            this.unit1=this.unit2=false; 
          }
          switch (n) {
                case 1:
                    this.param.type='month';
                    this.M = true;break;
                case 2:
                    this.param.type='quarter';
                    this.J = true; break;
                case 3:
                    this.param.type='year';
                    this.Y = true; break;
                case 4:
                    this.param.num=3;
                    this.Q3 = true; break;
                case 5:
                    this.param.num=6;
                    this.Q6 = true; break;
                case 6:
                    this.param.num=9;
                    this.Q9 = true; break;
                case 7:
                    this.param.num=12;
                    this.Q12 = true; break;
                case 8:
                    this.unit1 = true; break;
                case 9:
                    this.unit2 = true; break;
                default:
                    break;
            }
            this.fetchData();
        }
    }
}
</script>

<style>
#profit .sbtn{
    margin-left:20px;
    padding-left:30px;
    padding-right:30px;
}
#profit .text-label{
    font-weight: 550;
    font-size: 20px;
}
#profit .selectb{
    background: #06CCB7;
    color: white;
}
#profit #datatable *{
    text-align: center;
    font-size:18px;
    border: 1px solid #e1e1e1;
    height:45px;
}
#profit #datatable .td1{
    text-align: left;
    text-indent: 10px;
    font-weight: 600px;
}
#profit #datatable .td2{
    text-align: left;
    text-indent: 30px;
}
#profit #datatable .td3{
    text-align: left;
    text-indent: 60px;
}
#profit #datatable td{
    min-width: 120px;
}
#profit #datatable td:first-child{
    min-width: 500px;
}
#profit #datatable td:nth-child(2){
    min-width: 100px;
}
</style>