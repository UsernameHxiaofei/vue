<template>
    <div id='debts'>
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
                    <el-col :span="24" style="margin-top:30px">
                        <label class="text-label">单&emsp;&emsp;位</label>
                        <el-button class="sbtn" size="small" @click="select(8)" :class="{'selectb':unit1}">元</el-button>
                        <el-button class="sbtn" size="small" @click="select(9)" :class="{'selectb':unit2}">万元</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="margin-top:30px">
                        <label style="font-size:18px;float:left" >编制单位:<span>{{enterprise.name}}</span></label>
                        <label style="font-size:18px;float:right" >会小企01表</label>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <table id="datatable" style="width:100%;border:1px solid #e1e1e1;margin-bottom:100px">
                            <thead style="background:#eceff1">
                                <tr>
                                    <th style="width:500px">资产</th>
                                    <th style="width:80px">行次</th>
                                    <th width="150" v-for="n in listData.length">
                                        {{listData[n-1].year+'年'+(M?(listData[n-1].month+'月'):'')+(J?(listData[n-1].quarter+'季度'):'')}}
                                    </th>
                                    <!--<th style="width:180px">期初</th>-->
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>流动资产</td> <td></td><td v-for="n in listData.length"></td>
                                </tr>
                                <tr>
                                    <td>货币资金</td> <td>1</td> <td v-for="n in listData.length">{{listData[n-1].monetaryFund}}</td>
                                </tr>
                                <tr>
                                    <td>短期投资</td> <td>2</td> <td v-for="n in listData.length">{{listData[n-1].shortInvestment}}</td>
                                </tr>
                                <tr>
                                    <td>应收票据</td> <td>3</td> <td v-for="n in listData.length">{{listData[n-1].billsReceivable}}</td>
                                </tr>
                                <tr>
                                    <td>应收账款</td> <td>4</td> <td v-for="n in listData.length">{{listData[n-1].accountsReceivable}}</td>
                                </tr>
                                <tr>
                                    <td>应收股利</td> <td>5</td> <td v-for="n in listData.length">{{listData[n-1].dividendReceivable}}</td>
                                </tr>
                                <tr>
                                    <td>预付账款</td> <td>6</td> <td v-for="n in listData.length">{{listData[n-1].advancePayment}}</td>
                                </tr>
                                <tr>
                                    <td>应收利息</td> <td>7</td> <td v-for="n in listData.length">{{listData[n-1].interestReceivable}}</td>
                                </tr>
                                <tr>
                                    <td>其他应收款</td> <td>8</td> <td v-for="n in listData.length">{{listData[n-1].otherReceivable}}</td>
                                </tr>
                                <tr>
                                    <td>存货</td> <td>9</td> <td v-for="n in listData.length">{{listData[n-1].stock}}</td>
                                </tr>
                                <tr>
                                    <td>其中：原材料</td> <td>10</td> <td v-for="n in listData.length">{{listData[n-1].rawMaterial}}</td>
                                </tr>
                                <tr>
                                    <td>在产品</td> <td>11</td> <td v-for="n in listData.length">{{listData[n-1].inProduct}}</td>
                                </tr>
                                <tr>
                                    <td>库存商品</td> <td>12</td> <td v-for="n in listData.length">{{listData[n-1].stockProduct}}</td>
                                </tr>
                                <tr>
                                    <td>周转材料</td> <td>13</td> <td v-for="n in listData.length">{{listData[n-1].turnoverMaterials}}</td>
                                </tr>
                                <tr>
                                    <td>其他流动资产</td> <td>14</td> <td v-for="n in listData.length">{{listData[n-1].otherCurrentAssets}}</td>
                                </tr>
                                <tr>
                                    <td>流动资产合计</td> <td>15</td> <td v-for="n in listData.length">{{listData[n-1].currentAssetsTotal}}</td>
                                </tr>
                                <tr>
                                    <td>非流动资产：</td> <td></td> <td v-for="n in listData.length"></td>
                                </tr>
                                <tr>
                                    <td>长期债券投资</td> <td>16</td> <td v-for="n in listData.length">{{listData[n-1].longBondInvestment}}</td>
                                </tr>
                                <tr>
                                    <td>长期股权投资</td> <td>17</td> <td v-for="n in listData.length">{{listData[n-1].longEquityInvestment}}</td>
                                </tr>
                                <tr>
                                    <td>固定资产原价</td> <td>18</td> <td v-for="n in listData.length">{{listData[n-1].fixedAssetsPrice}}</td>
                                </tr>
                                <tr>
                                    <td>减：累计折旧</td> <td>19</td> <td v-for="n in listData.length">{{listData[n-1].depreciationTotal}}</td>
                                </tr>
                                <tr>
                                    <td>固定资产账面价值</td> <td>20</td> <td v-for="n in listData.length">{{listData[n-1].fixedAssetsBookValue}}</td>
                                </tr>
                                <tr>
                                    <td>在建工程</td> <td>21</td> <td v-for="n in listData.length">{{listData[n-1].constructionInProgress}}</td>
                                </tr>
                                <tr>
                                    <td>工程物资</td> <td>22</td> <td v-for="n in listData.length">{{listData[n-1].constructionMaterials}}</td>
                                </tr>
                                <tr>
                                    <td>固定资产清理</td> <td>23</td> <td v-for="n in listData.length">{{listData[n-1].fixedAssetsLiquidation}}</td>
                                </tr>
                                <tr>
                                    <td>生产性生物资产</td> <td>24</td> <td v-for="n in listData.length">{{listData[n-1].productiveBiologicalAssets}}</td>
                                </tr>
                                <tr>
                                    <td>无形资产</td> <td>25</td> <td v-for="n in listData.length">{{listData[n-1].intangibleAssets}}</td>
                                </tr>
                                <tr>
                                    <td>开发支出</td> <td>26</td> <td v-for="n in listData.length">{{listData[n-1].developmentCost}}</td>
                                </tr>
                                <tr>
                                    <td>长期待摊费用</td> <td>27</td> <td v-for="n in listData.length">{{listData[n-1].longPrepaidExpenses}}</td>
                                </tr>
                                <tr>
                                    <td>其他非流动资产</td> <td>28</td> <td v-for="n in listData.length">{{listData[n-1].otherNonCurrentAssets}}</td>
                                </tr>
                                <tr>
                                    <td>非流动资产合计</td> <td>29</td> <td v-for="n in listData.length">{{listData[n-1].nonCurrentAssetsTotal}}</td>
                                </tr>
                                <tr>
                                    <td>资产合计</td> <td>30</td> <td v-for="n in listData.length">{{listData[n-1].assetsTotal}}</td>
                                </tr>
                                <tr style="background:#eceff1;font-weight:bold;">
                                    <td style="text-align:center">负债和所有者权益</td> <td>行次</td> <th width="150" v-for="n in listData.length">
                                        {{listData[n-1].year+'年'+(M?(listData[n-1].month+'月'):'')+(J?(listData[n-1].quarter+'季度'):'')}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>流动负债：</td> <td></td> <td v-for="n in listData.length"></td>
                                </tr>
                                <tr>
                                    <td>短期借款</td> <td>31</td> <td v-for="n in listData.length">{{listData[n-1].shortLoan}}</td>
                                </tr>
                                <tr>
                                    <td>应付票据</td> <td>32</td> <td v-for="n in listData.length">{{listData[n-1].billsPayable}}</td>
                                </tr>
                                <tr>
                                    <td>应付账款</td> <td>33</td> <td v-for="n in listData.length">{{listData[n-1].accountsPayable}}</td>
                                </tr>
                                <tr>
                                    <td>预售账款</td> <td>34</td> <td v-for="n in listData.length">{{listData[n-1].preAccountsReceivable}}</td>
                                </tr>
                                <tr>
                                    <td>应付员工薪酬</td> <td>35</td> <td v-for="n in listData.length">{{listData[n-1].payrollPayable}}</td>
                                </tr>
                                <tr>
                                    <td>应交税费</td> <td>36</td> <td v-for="n in listData.length">{{listData[n-1].taxPayable}}</td>
                                </tr>
                                <tr>
                                    <td>应付利息</td> <td>37</td> <td v-for="n in listData.length">{{listData[n-1].interestPayable}}</td>
                                </tr>
                                <tr>
                                    <td>应付利润</td> <td>38</td> <td v-for="n in listData.length">{{listData[n-1].profitPayable}}</td>
                                </tr>
                                <tr>
                                    <td>其他应付款</td> <td>39</td> <td v-for="n in listData.length">{{listData[n-1].otherPayable}}</td>
                                </tr>
                                <tr>
                                    <td>其他流动负债</td> <td>40</td> <td v-for="n in listData.length">{{listData[n-1].otherCurrentLiabilities}}</td>
                                </tr>
                                <tr>
                                    <td>流动负债合计</td> <td>41</td> <td v-for="n in listData.length">{{listData[n-1].currentLiabilitiesTotal}}</td>
                                </tr>
                                <tr>
                                    <td>非流动负债：</td> <td></td> <td v-for="n in listData.length"></td>
                                </tr>
                                <tr>
                                    <td>长期借款</td> <td>42</td> <td v-for="n in listData.length">{{listData[n-1].longBorrowing}}</td>
                                </tr>
                                <tr>
                                    <td>长期应付款</td> <td>43</td> <td v-for="n in listData.length">{{listData[n-1].longPayables}}</td>
                                </tr>
                                <tr>
                                    <td>递延收益</td> <td>44</td> <td v-for="n in listData.length">{{listData[n-1].deferredIncome}}</td>
                                </tr>
                                <tr>
                                    <td>其他非流动负债</td> <td>45</td> <td v-for="n in listData.length">{{listData[n-1].otherNonCurrentLiabilities}}</td>
                                </tr>
                                <tr>
                                    <td>非流动负债合计</td> <td>46</td> <td v-for="n in listData.length">{{listData[n-1].nonCurrentLiabilitiesTotal}}</td>
                                </tr>
                                <tr>
                                    <td>负债合计</td> <td>47</td> <td v-for="n in listData.length">{{listData[n-1].liabilitiesTotal}}</td>
                                </tr>
                                <tr>
                                    <td>所有者权益（或股东权益）：</td> <td> </td> <td v-for="n in listData.length"></td>
                                </tr>
                                <tr>
                                    <td>实收资本（或股东权益）</td> <td>48</td> <td v-for="n in listData.length">{{listData[n-1].paidInAssets}}</td>
                                </tr>
                                <tr>
                                    <td>资本公积</td> <td>49</td> <td v-for="n in listData.length">{{listData[n-1].assetsSurplus}}</td>
                                </tr>
                                <tr>
                                    <td>盈余公积</td> <td>49</td> <td v-for="n in listData.length">{{listData[n-1].surplusReserve}}</td>
                                </tr>
                                <tr>
                                    <td>未分配利润</td> <td>49</td> <td v-for="n in listData.length">{{listData[n-1].undistributedProfit}}</td>
                                </tr>
                                <tr>
                                    <td>所有者权益（或股东权益）合计</td> <td>49</td> <td v-for="n in listData.length">{{listData[n-1].ownerEquity}}</td>
                                </tr>
                                <tr>
                                    <td>负债和所有者权益（或股东权益）总计</td> <td>49</td> <td v-for="n in listData.length">{{listData[n-1].liabilitiesAndOwnerEquity}}</td>
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
    name: 'debts',
    props: ['enterprise'],
    data () {
        return {
            M:true,J:false,Y:false,Q3:true,Q6:false,Q9:false,Q12:false,unit1:true,unit2:false,
            param:{},
            listData:[]
        }
    },
    beforeMount () {
        this.param={type:'month',num:3,enterpriseId:this.enterprise.id};
        this.fetchData();
    },
    computed: {
       result:function(){
           return this.$store.state.enterprise.debt;
       }
    },
    methods: {
        fetchData(){
                this.$store.dispatch('enterprise_debt',this.param).then(()=>{
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
#debts .sbtn{
    margin-left:20px;
    padding-left:30px;
    padding-right:30px;
}
#debts .text-label{
    font-weight: 550;
    font-size: 20px;
}
#debts .selectb{
    background: #06CCB7;
    color: white;
}
#debts #datatable *{
    text-align: center;
    font-size:18px;
    border: 1px solid #e1e1e1;
    height:45px;
}
#debts #datatable td{
    min-width: 110px;
}
#debts #datatable td:first-child{
    text-align: left;
    text-indent: 10px;
    font-weight: 600px;
    min-width: 200px;
}
#debts #datatable td:nth-child(2){
    min-width: 50px;
}

</style>