<template>
  <div id="thirdAuth">
      <el-row :gutter="20" >
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>第三方征信报告</span>
          </el-col>
          <div class="creditReport">
       <div class="abstract" >
            <p>评估对象： {{projectItem.name}}</p>
            <p>项目名称： {{projectItem.name}}</p>
            <p>评估日期： {{credit.tcCreditAntiFraudList&&credit.tcCreditAntiFraudList.createTime||''}}</p>
            <p>评估机构： 天创信用服务有限公司</p>
             <p>反 欺 诈： {{credit.tcCreditAntiFraudList&&credit.tcCreditAntiFraudList.antiFraud||'不通过'}}</p>
             <p>企业等级： {{credit.tcCreditAntiFraudList&&credit.tcCreditAntiFraudList.grade||'无评级'}}</p> 
             <p>评    分： {{credit.tcCreditAntiFraudList&&credit.tcCreditAntiFraudList.score&&parseFloat(credit.tcCreditAntiFraudList.score)&&parseFloat(credit.tcCreditAntiFraudList.score).toFixed(2)||'未评分'}}</p>  
       </div> 
       <h3>信息验证概要</h3>
       <div>
            <p class="cent">企业、法人信息验证 <a herf="">《反欺诈规则》</a></p>
            <table class="table3">
                <tbody>
                    <tr>
                        <th>验证项</th>
                        <th>是否通过</th>
                        <th>拒绝原因</th>
                    </tr>
                </tbody>
            </table>
           <table  class="table3">
                <tbody>
                    <tr ><td class="tit" colspan="3">企业</td></tr>
                    <tr  v-for="(Item,index) in credit.tcCreditAntiFraudList&&credit.tcCreditAntiFraudList.company" :key="index">
                        <td> {{Item.nameCn}}</td>
                        <td> {{Item.result}}</td>
                        <td> {{Item.message}}</td>
                    </tr>
                </tbody>
            </table>
            <table  class="table3" v-for="(presonItem,i) in credit.tcCreditAntiFraudList&&credit.tcCreditAntiFraudList.administrators" :key="i" v-if="presonItem.type==1">
                 <tbody>
                    <tr ><td class="tit" colspan="3">法人-{{presonItem.name}}</td></tr>
                    <tr  v-for="(Item,index) in presonItem.adminDetail" :key="index">
                        <td> {{Item.nameCn}}</td>
                        <td> {{Item.result}}</td>
                        <td> {{Item.message}}</td>
                    </tr>
                </tbody>
            </table>  
            <table  class="table3" v-for="(presonItem,i) in credit.tcCreditAntiFraudList&&credit.tcCreditAntiFraudList.administrators" :key="i" v-if="presonItem.type==2">
                <tbody >
                    <tr ><td class="tit" colspan="3">高管-{{presonItem.name}}</td></tr>
                    <tr  v-for="(Item,index) in presonItem.adminDetail" :key="index">
                        <td> {{Item.nameCn}}</td>
                        <td> {{Item.result}}</td>
                        <td> {{Item.message}}</td>
                    </tr>
                </tbody> 
            </table>
       </div>
       <h3>项目信息</h3>
       <div>
            <h5>项目简介</h5>
            <p><b>筹资总额：{{projectItem.financingAmount|currency}}元 </b></p>
            <p><b>概要</b>：{{projectItem.summary}}
            </p>

            <h5>行家建议</h5>
            <p>{{expertAdvice.content}} 
            </p>

            <h5>领投人</h5>
            <p>{{leadInvestorIntention.opinion}} 
            </p>
       </div>
       
       <h3>报告主要内容</h3>
       <div>
            <h5>工商注册信息</h5>
            <p>统一社会信用代码：{{tcEnterpriseBasic.regno}}</p>
            <p>注册名称：{{tcEnterpriseBasic.entname}}</p>
            <p>企业类型：{{tcEnterpriseBasic.enttype}}</p>
            <p>法人代表：{{tcEnterpriseBasic.frname}}</p>
            <p>注册资本(万元)：{{tcEnterpriseBasic.regcap}} </p>
            <p>注册日期：{{tcEnterpriseBasic.esdate}}</p>
            <p>经营期限：{{tcEnterpriseBasic.opto}}</p>
            <p>登记地址：{{tcEnterpriseBasic.dom}}</p>
            <p>注册机关：{{tcEnterpriseBasic.regorg}}</p>
            <p>营业状态：{{tcEnterpriseBasic.entstatus}}</p>

            <h5>经营范围</h5>
            <p>业工商信息－企业工商信息查询:{{tcEnterpriseBasic.opscope}}</p>
            
            <h5>股东构成</h5>
            <table  class="table3">
                <thead>
                    <tr>
                        <th>股东名称</th>
                        <th>认缴出资金额（万）</th>
                        <th>股权占比</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in tcEnterpriseShareholder" :key="i">
                        <td> {{item.shaname}}</td>
                        <td>  {{item.subconam}}</td>
                        <td>  {{item.fundedratio}}</td>
                    </tr>
                    
                </tbody>
                
            </table>

            <h5>高管信息</h5>
            <table  class="table3">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>姓名</th>
                        <th>职位</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in tcEnterprisePerson" :key="i">
                        <td> {{i+1}}</td>
                        <td> {{item.pername}}</td>
                        <td> {{item.position}}</td>
                    </tr>
                    
                </tbody>
                 
            </table>
            
            <h5>注册变更记录</h5>
            <table class="table4">
                <thead>
                    <tr>
                        <th>变更日期</th>
                        <th>变更项</th>
                        <th>变更前</th>
                        <th>变更后</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(item,i) in tcEnterpriseAlter" :key="i">
                        <td> {{item.altdate}}</td>
                        <td> {{item.altitem}}</td>
                        <td> {{item.altbe}}</td>
                        <td> {{item.altaf}}</td>
                    </tr>   
                 </tbody>
            </table>

            <h5>企业对外投资信息</h5>
            <table class="tableTwo" v-for="(item,i) in tcEnterpriseEntinv" :key="i">
                <tr>
                    <td>投资对象企业</td><td>{{item.entname}}</td><td>企业类型</td><td>{{item.enttype}}</td>
                </tr>
                <tr>
                    <td>注册资本(万元)</td><td>{{item.regcap}}</td><td>出资金额(万元)</td><td>{{item.ubconam}}</td>
                </tr>
                <tr>
                    <td>出资比例</td><td>{{item.fundedratio}}</td><td>企业状态</td><td>{{item.entstatus}}</td>
                </tr>
            </table>
           

            <h5>法人代表在其他企业任职</h5>
            <table class="tableTwo" v-for="(item,i) in tcEnterpriseFrposition" :key="i">
                <tr>
                    <td>企业名称</td><td>{{item.entname}}</td><td>企业类型</td><td>{{item.enttype}}</td>
                </tr>
                <tr>
                    <td>注册资本(万元)</td><td>{{item.regcap}}</td><td>企业状态</td><td>{{item.entstatus}}</td>
                </tr>
                <tr>
                    <td>担任职务</td><td>{{item.position}}</td><td></td><td></td>
                </tr>
            </table>
            

            <h5>法人代表对外投资</h5>
            <table class="tableTwo"  v-for="(item,i) in tcEnterpriseFrinv" :key="i">
                <tr>
                    <td>投资对象企业</td><td>{{item.entname}}</td><td>企业类型</td><td>{{item.enttype}}</td>
                </tr>
                <tr>
                    <td>企业状态</td><td>{{item.entstatus}}</td><td>注册资本(万元)</td><td>{{item.regcap}}</td>
                </tr>
                <tr>
                    <td>出资金额(万元)</td><td>{{item.subconam}}</td><td>出资比例</td><td>{{item.fundedratio}}</td>
                </tr>
            </table>

            <h5>商标申请</h5>
            <table class="tableTwo"  v-for="(item,i) in tcTpcinfoTrademark" :key="i">
                <tr>
                    <td>注册号</td><td>{{item.registerNum}}</td><td>申请状态</td><td>{{item.status}}</td>
                </tr>
                <tr>
                    <td>申请日期</td><td>{{item.applyDate}}</td><td>商标名称</td><td>{{item.name}}</td>
                </tr>
                <tr>
                    <td>商标图片</td><td>{{item.img}}</td><td>分类</td><td>{{item.category}}</td>
                </tr>
            </table>
            

            <h5>专利著作信息</h5>
            <table class="tableTwo"  v-for="(item,i) in tcTpcinfoPatent" :key="i">
                <tr>
                    <td>专利申请号/版本</td><td>{{item.patentNumber}}</td><td>发布日期/首次发表日期</td><td>{{item.pubDate}}</td>
                </tr>
                <tr>
                    <td>专利名称/软件名称</td><td>{{item.title}}</td><td>专利类型/分类号</td><td>{{item.type+'/'+item.mainClassCode}}</td>
                </tr>
            </table>

            <!-- <h5>投诉记录</h5>
            <p>文书类型：</p>
            <p>案例日期：</p>
            <p>案例主题：</p>
            <p>案例信息：</p>

            <h5>企业关系图谱</h5> -->
           
           
       </div> 
    </div>  
    
      </el-row>
  </div>
</template>
<script>
  export default {
    name:'thirdAuth',
    computed: {
        enterpriseInfo: function () {
           return this.$store.state.enterprise.enterpriseInfo || {};
        },
        thirdReport:function(){
           return this.$store.state.item.thirdReport||{};
        },
        projectItem(){
           return this.$store.state.item.itemManageDetail||{};
        },
        itemManageDetail: function () {
           return this.$store.state.item.itemManageDetail||{};
        },
        credit:function(){
            return this.$store.state.item.thirdReport||{};
        },
        tcEnterpriseBasic(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcBasic[0]||{}
        },
        tcEnterpriseShareholder(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcShareholder
        },
        tcEnterprisePerson(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcPerson
        },
        tcEnterpriseAlter(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcAlter
        },
        tcEnterpriseEntinv(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcEntinv
        },
        tcEnterpriseFrposition(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcFrposition
        },
        tcEnterpriseFrinv(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcFrinv
        },
        tcTpcinfoTrademark(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcTpcinfoTrademark||{}
        },
        tcTpcinfoPatent(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcTpcinfoPatent
        },
        tcRepresentativeInfo(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcRepresentativeInfo
        },
        tcEnterpriseMemberInfo(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseMemberInfo
        },
        expertAdvice(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.expertAd||{};
        },
        leadInvestorIntention(){
            return this.$store.state.item.thirdReport&&this.$store.state.item.leadAd||{};
        }
    },
    data() {
      return {
        
      };
    }
  };
</script>
<style > 
#thirdAuth .businessTitle{
  height:30px;
  font-size: 18px;
  font-weight: bold
  }
  #thirdAuth .businessTitle img{
    text-indent: 20px;
    margin-right:5px;
  }
  #thirdAuth{
    margin: 0 auto;
    padding-top: 30px;
    width: 90%;
    min-width: 890px;
  }
  .creditReport{
    box-sizing: border-box;
    padding:30px;
  }
  #thirdAuth .abstract {
  padding-top: 20px;
}
#thirdAuth .abstract p {
  font-weight: bolder;
  font-size: 16px;
}
#thirdAuth h3 {
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  padding-top: 40px;
}
#thirdAuth .cent {
  text-align: center;
  line-height: 50px;
}
#thirdAuth .tableTwo{
    width: 100%;
    border-top: 1px solid #bfbfbf;
    margin:20px auto;

} 
#thirdAuth .tableTwo td{
    width:300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #bfbfbf;
    text-align: left;
    text-indent: 10px;
}
#thirdAuth .tableTwo td:nth-child(2n+1){
    width:100px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    border: 1px solid #bfbfbf;
    text-align: center;
}

#thirdAuth .table3  {
  width: 100%;
  border-top: 1px solid #bfbfbf;
  margin-top: -1px;
}
#thirdAuth .table3 td,
#thirdAuth .table3 th {
  width: 33%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bfbfbf;
  text-align: center;
}
#thirdAuth .table3 th {
  background: #97b7ff;
  color: #5e80cb;
}
#thirdAuth .table4  {
  width: 100%;
  border-top: 1px solid #bfbfbf;
  margin-top: -1px;
}
#thirdAuth .table4 td,
#thirdAuth .table4 th {
  width: 25%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bfbfbf;
  text-align: center;
}
#thirdAuth .table4 th {
  background: #97b7ff;
  color: #5e80cb;
}
#thirdAuth h5 {
  padding-left: 26px;
  line-height: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #06ccb6;
  background: url("../../../assets/images/square.png") no-repeat;
}
#thirdAuth p {
  line-height: 22px;
  word-break: break-all;
}
#thirdAuth .twoColumns {
  width: 100%;
  overflow: hidden;
  line-height: 20px;
}
#thirdAuth .twoColumns .fl {
  float: left;
  width: 380px;
}
#thirdAuth .twoColumns .fr {
  float: right;
  width: 250px;
}
#thirdAuth .twoColumns .title {
  color: #ccc;
}
#thirdAuth .blank {
  padding: 20px;
}
</style>