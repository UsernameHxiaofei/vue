<template>
    <div id='cashflow'>
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
                        <label style="font-size:18px;float:right" >会小企03表</label>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <table id="datatable" style="width:100%;border:1px solid #e1e1e1;margin-bottom:100px">
                            <thead style="background:#eceff1">
                                <tr>
                                    <th style="width:500px">项目</th>
                                    <th style="width:80px">行次</th>
                                    <th width="150" v-for="n in listData.length">
                                        {{listData[n-1].year+'年'+(M?(listData[n-1].month+'月'):'')+(J?(listData[n-1].quarter+'季度'):'')}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>一、经营活动产生的现金流量:</td> <td></td> <td v-for="n in listData.length"></td> 
                                </tr>
                                <tr>
                                    <td>销售产成品、商品、提供劳务收到的现金</td> <td>1</td> <td v-for="n in listData.length">{{listData[n-1].salesIncome}}</td> 
                                </tr>
                                <tr>
                                    <td>收到其他与经营活动有关的的现金</td> <td>2</td> <td v-for="n in listData.length">{{listData[n-1].receiveCash}}</td> 
                                </tr>
                                <tr>
                                    <td >购买原材料、商品、接受劳务支付的现金</td> <td>3</td> <td v-for="n in listData.length">{{listData[n-1].buyCost}}</td> 
                                </tr>
                                <tr>
                                    <td >支付的职工薪酬</td> <td>4</td> <td v-for="n in listData.length">{{listData[n-1].payStaffSalaries}}</td> 
                                </tr>
                                <tr>
                                    <td >支付的税费</td> <td>5</td> <td v-for="n in listData.length">{{listData[n-1].payTaxes}}</td> 
                                </tr>
                                <tr>
                                    <td >支付其他与经营活动有关的现金</td> <td>6</td> <td v-for="n in listData.length">{{listData[n-1].payOtherCost}}</td> 
                                </tr>
                                <tr>
                                    <td >经营活动产生的现金流量净额</td> <td>7</td> <td v-for="n in listData.length">{{listData[n-1].operateActivitiesNetCash}}</td> 
                                </tr>
                                <tr>
                                    <td >二、投资活动产生的现金流量：</td> <td></td> <td v-for="n in listData.length"></td> 
                                </tr>
                                <tr>
                                    <td >收回短期投资、长期债券投资和长期股权投资收到的现金</td> <td>8</td> <td v-for="n in listData.length">{{listData[n-1].longInvestmentCash}}</td> 
                                </tr>
                                <tr>
                                    <td >取得投资收益取得的现金</td> <td>9</td> <td v-for="n in listData.length">{{listData[n-1].profitCash}}</td> 
                                </tr>
                                <tr>
                                    <td >处置固定资产、无形资产和其他非流动资产收回的现金净额</td> <td>10</td> <td v-for="n in listData.length">{{listData[n-1].assetCash}}</td> 
                                </tr>
                                <tr>
                                    <td >短期投资、长期债券投资和长期股权投资支付的现金</td> <td>11</td> <td v-for="n in listData.length">{{listData[n-1].paymentsInvestCash}}</td> 
                                </tr>
                                <tr>
                                    <td >构建固定资产、无形资产和其他非流动资产支付的现金</td> <td>12</td> <td v-for="n in listData.length">{{listData[n-1].paymentsAssetsCash}}</td> 
                                </tr>
                                <tr>
                                    <td >投资活动产生的现金流量净额</td> <td>13</td> <td v-for="n in listData.length">{{listData[n-1].investmentNetCash}}</td> 
                                </tr>
                                <tr>
                                    <td >三、筹资活动产生的现金流量：</td> <td> </td> <td v-for="n in listData.length"></td> 
                                </tr>
                                <tr>
                                    <td >取得借款收到的现金</td> <td>14</td> <td v-for="n in listData.length">{{listData[n-1].loanCashReceive}}</td> 
                                </tr>
                                <tr>
                                    <td >吸收投资者投资收到的现金</td> <td>15</td> <td v-for="n in listData.length">{{listData[n-1].investorsCashReceive}}</td> 
                                </tr>
                                <tr>
                                    <td >偿还借款本金支付的现金</td> <td>16</td> <td v-for="n in listData.length">{{listData[n-1].repayLoanCash}}</td> 
                                </tr>
                                <tr>
                                    <td >偿还借款本息支付的现金</td> <td>17</td> <td v-for="n in listData.length">{{listData[n-1].repayLoanInterestCash}}</td> 
                                </tr>
                                <tr>
                                    <td >分配利润支付的现金</td> <td>18</td> <td v-for="n in listData.length">{{listData[n-1].payProfitsCash}}</td> 
                                </tr>
                                <tr>
                                    <td >筹资活动产生的现金流量净额</td> <td>19</td> <td v-for="n in listData.length">{{listData[n-1].financingActivitiesNetCash}}</td> 
                                </tr>
                                <tr>
                                    <td >四、现金净增加额</td> <td>20</td> <td v-for="n in listData.length">{{listData[n-1].netCashIncrease}}</td> 
                                </tr>
                                <tr>
                                    <td >加：期初现金余额</td> <td>21</td> <td v-for="n in listData.length">{{listData[n-1].beginCashBalance}}</td> 
                                </tr>
                                <tr>
                                    <td >五、期末现金余额</td> <td>22</td> <td v-for="n in listData.length">{{listData[n-1].endCashBalance}}</td> 
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
    name: 'cashflow',
    props: ['enterprise'],
    data () {
        return {
            M:true,J:false,Y:false,Q3:true,Q6:false,Q9:false,Q12:false,unit1:true,unit2:false,param:{},
            listData:{}
        }
    },
    beforeMount () {
        this.param={type:'month',num:3,enterpriseId:this.enterprise.id}
        this.fetchData();
    },
    computed: {
        result:function(){
            return this.$store.state.enterprise.cash;
        } 
    },
    methods: {
        fetchData(){
                this.$store.dispatch('enterprise_cash',this.param).then(()=>{
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
                    this.param.unit=true;
                    this.unit1 = true; break;
                case 9:
                    this.param.unit=false;
                    this.unit2 = true; break;
                default:
                    break;
            }
          this.fetchData(); 
        }
    }
}
</script>

<style scoped>
#cashflow .sbtn{
    margin-left:20px;
    padding-left:30px;
    padding-right:30px;
}
#cashflow .text-label{
    font-weight: 550;
    font-size: 20px;
}
#cashflow .selectb{
    background: #06CCB7;
    color: white;
}
#cashflow #datatable *{
    text-align: center;
    font-size:18px;
    border: 1px solid #e1e1e1;
    height:45px;
}
#cashflow #datatable td:first-child{
    text-align: left;
    text-indent: 10px;
    font-weight: 600px;
}
#cashflow #datatable td{
    min-width: 120px;
}
#cashflow #datatable td:first-child{
    min-width: 570px;
}
#cashflow #datatable td:nth-child(2){
    min-width: 100px;
}
</style>