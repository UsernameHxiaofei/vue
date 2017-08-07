<template>
  <div id="thirdAuth">
      <el-row :gutter="20" >
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>第三方征信报告</span>
          </el-col>
          <div class="creditReport">
       <div class="abstract" v-if="credit.tcCreditAntiFraudList.createTime">
            <p>评估对象： {{projectItem.name}}</p>
            <p>项目名称： {{projectItem.name}}</p>
            <p>评估日期： {{credit.tcCreditAntiFraudList.createTime}}</p>
            <p>评估机构： 天创信用服务有限公司</p>
             <p>反 欺 诈： {{credit.tcCreditAntiFraudList.antiFraud}}</p>
             <p v-if="credit.tcCreditAntiFraudList.grade">企业等级： {{credit.tcCreditAntiFraudList.grade}}</p> 
             <p v-if="credit.tcCreditAntiFraudList.score">评    分： {{credit.tcCreditAntiFraudList.score}}</p>  
       </div> 
       <h3>信息验证概要</h3>
       <div>
            <p class="cent">企业、法人信息验证 <a herf="">《反欺诈规则》</a></p>
            <table>
                <tbody>
                    <tr>
                        <th>验证项</th>
                        <th>是否通过</th>
                        <th>拒绝原因</th>
                    </tr>
                </tbody>
            </table>
           <table>
                <tbody>
                    <tr ><td class="tit" colspan="3">企业</td></tr>
                    <tr  v-for="(Item,index) in credit.tcCreditAntiFraudList.company" :key="index">
                        <td> {{Item.nameCn}}</td>
                        <td> {{Item.result}}</td>
                        <td> {{Item.message}}</td>
                    </tr>
                </tbody>
            </table>
            <table  v-for="(presonItem,i) in credit.tcCreditAntiFraudList.administrators" :key="i" v-if="presonItem.type==1">
                 <tbody>
                    <tr ><td class="tit" colspan="3">法人-{{presonItem.name}}</td></tr>
                    <tr  v-for="(Item,index) in presonItem.adminDetail" :key="index">
                        <td> {{Item.nameCn}}</td>
                        <td> {{Item.result}}</td>
                        <td> {{Item.message}}</td>
                    </tr>
                </tbody>
            </table>  
            <table v-for="(presonItem,i) in credit.tcCreditAntiFraudList.administrators" :key="i" v-if="presonItem.type==2">
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
       <div>{{credit.tcEnterpriseBusinessInfo.tcBasic.regno}}
            <h5>工商注册信息</h5>
            <p>统一社会信用代码：{{tcEnterpriseBasic.regno}}</p>
            <p>注册名称：{{tcEnterpriseBasic.entname}}</p>
            <p>企业类型：{{tcEnterpriseBasic.enttype}}</p>
            <p>法人代表：{{tcEnterpriseBasic.frname}}</p>
            <p>注册资本：{{tcEnterpriseBasic.regcap}} </p>
            <p>注册日期：{{tcEnterpriseBasic.esdate}}</p>
            <p>经营期限：{{tcEnterpriseBasic.opto}}</p>
            <p>登记地址：{{tcEnterpriseBasic.dom}}</p>
            <p>注册机关：{{tcEnterpriseBasic.regorg}}</p>
            <p>营业状态：{{tcEnterpriseBasic.entstatus}}</p>

            <h5>经营范围</h5>
            <p>业工商信息－企业工商信息查询:{{tcEnterpriseBasic.opscope}}</p>
            
            <h5>股东构成</h5>
            <table>
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
            <table>
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
            <div v-for="(item,i) in tcEnterpriseAlter" :key="i">
                <p>变更日期：{{item.altdate}}</p>
                <p>变更项：{{item.altdate}}</p>
                <p>变更前：{{item.altbe}}</p>
                <p>变更后：{{item.altaf}}</p>
                <p>&nbsp;</p>
            </div>

            <h5>经营异常信息</h5>
            <p>列入日期：</p>
            <p>列入原因：</p>
            <p>决定机关（列入）：</p>
            <p>移出原因：</p>

            <h5>企业信息</h5>
            <div  v-for="(item,i) in tcEnterpriseEntinv" :key="i">
                <p>投资对象企业：{{item.entname}}</p>
                <p>企业类型：{{item.enttype}}</p>
                <p>注册资本：{{item.regcap}}</p>
                <p>出资金额：{{item.subconam}}</p>
                <p>出资比例：{{item.fundedratio}}</p>
                <p>企业状态：{{item.entstatus}}</p>
                <p> </p>
            </div>

            <h5>法人代表在其他企业任职</h5>
            <div  v-for="(item,i) in tcEnterpriseFrposition" :key="i">
                <p>企业名称：{{item.entname}}</p>
                <p>企业类型：{{item.enttype}}</p>
                <p>注册资本：{{item.regcap}}</p>
                <p>企业状态：{{item.entstatus}}</p>
                <p>担任职务: {{item.position}}</p>
                <p> </p>
            </div>

            <h5>法人代表对外投资</h5>
            <div  v-for="(item,i) in tcEnterpriseFrinv" :key="i">
                <p>投资对象企业：{{item.entname}}</p>
                <p>企业类型：{{item.enttype}}</p>
                <p>企业状态：{{item.regcap}}</p>
                <p>注册资本：{{item.subconam}}</p>
                <p>出资金额：{{item.fundedratio}}</p>
                <p>出资比例：{{item.entstatus}}</p>
                <p> </p>
            </div>

            <h5>商标申请</h5>
            <div  v-for="(item,i) in tcTpcinfoTrademark" :key="i">
                <p>注册号：{{item.registerNum}}</p>
                <p>申请状态：{{item.status}}</p>
                <p>申请日期：{{item.applyDate}}</p>
                <p>商标名称：{{item.name}}</p>
                <p>商标图片：{{item.img}}</p>
                <p>分类：{{item.category}}</p>
                <p> </p>
            </div>

            <h5>专利著作信息</h5>
            <div  v-for="(item,i) in tcTpcinfoTrademark" :key="i">
                <p>专利申请号/版本：{{item.patentNumber}}</p>
                <p>发布日期/首次发表日期：{{item.launchDate}}</p>
                <p>专利名称/软件名称：{{item.classifyCode}}</p>
                <p>专利类型/分类号：{{item.classifyCode}}</p>
                <p> </p>
            </div>

            <h5>投诉记录</h5>
            <p>文书类型：</p>
            <p>案例日期：</p>
            <p>案例主题：</p>
            <p>案例信息：</p>

            <h5>企业关系图谱</h5>
           
           
            <!-- <h5>法人代表背景情况</h5> -->
              <!-- <div  v-if="tcRepresentativeInfo.name">
                <div class="twoColumns">
                    <span class="fl title">个人身份信息</span>
                    <span class="fr title">学历信息</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">姓名：{{tcRepresentativeInfo.name}}</span>
                    <span class="fr">毕业院校：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">身份证号：{{tcRepresentativeInfo.idcard}}&nbsp;&nbsp;{{tcRepresentativeInfo.tcVerifyIdcard.resultMsg}}</span>
                    <span class="fr">学历信息：{{tcRepresentativeInfo.apiEdu.result}}&nbsp;&nbsp;{{tcRepresentativeInfo.apiEdu.message}}</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">身份证姓名一致性：{{tcRepresentativeInfo.telVerify.result}}&nbsp;&nbsp;{{tcRepresentativeInfo.telVerify.message}}</span>
                    <span class="fr">学历层次：{{tcRepresentativeInfo.telVerify.result}}&nbsp;&nbsp;{{tcRepresentativeInfo.telVerify.message}}</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">专业名称：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">毕业时间:</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">毕业结论：</span>
                </div>
                <p class="blank"></p>



                <div class="twoColumns">
                    <span class="fl title">职业资格证书</span>
                    <span class="fr title">不良信息记录</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">获奖日期：</span>
                    <span class="fr">前科记录：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">证书编号：</span>
                    <span class="fr">在逃记录：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">职称级别：</span>
                    <span class="fr">吸毒记录：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">职业名称：</span>
                    <span class="fr"></span>
                </div>
                <div class="twoColumns">
                    <span class="fl">颁布证书的机构名称：</span>
                    <span class="fr"></span>
                </div>
                <p class="blank"></p>


                <div class="twoColumns">
                    <span class="fl title">法院涉及情况</span>
                    <span class="fr title">手机状态</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">开庭公告：</span>
                    <span class="fr">手机号：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">裁判文书：</span>
                    <span class="fr">手机号实号：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">执行公告：</span>
                    <span class="fr">归属地：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">失职公告：</span>
                    <span class="fr">当前状态：{{tcRepresentativeInfo.telNoStatus.result}}&nbsp;&nbsp;{{tcRepresentativeInfo.telNoStatus.message}}</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">在网时间：{{tcRepresentativeInfo.telOnline.result}}&nbsp;&nbsp;{{tcRepresentativeInfo.telOnline.message}}</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">月均消费：</span>
                </div>
                <p>&nbsp; </p>
            </div>  -->

             <p class="blank"></p>

 

           <!-- <h5>企业高管信息</h5> -->
             <!-- <div v-for="(presonItem,i) in tcEnterpriseMemberInfo" :key="i">
                <div class="twoColumns">
                    <span class="fl title">个人身份信息</span>
                    <span class="fr title">学历信息</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">姓名：{{tcRepresentativeInfo.name}}</span>
                    <span class="fr">毕业院校：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">身份证号：{{presonItem.detail.idIsRight.result}}&nbsp;&nbsp;{{presonItem.detail.idIsRight.message}}</span>
                    <span class="fr">学历信息：{{presonItem.detail.apiEdu.result}}&nbsp;&nbsp;{{presonItem.detail.apiEdu.message}}</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">身份证姓名一致性：{{presonItem.detail.telVerify.result}}&nbsp;&nbsp;{{presonItem.detail.telVerify.message}}</span>
                    <span class="fr">学历层次：{{presonItem.detail.telVerify.result}}&nbsp;&nbsp;{{presonItem.detail.telVerify.message}}</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">专业名称：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">毕业时间:</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">毕业结论：</span>
                </div>
                <p class="blank"></p>



                <div class="twoColumns">
                    <span class="fl title">职业资格证书</span>
                    <span class="fr title">不良信息记录</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">获奖日期：</span>
                    <span class="fr">前科记录：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">证书编号：</span>
                    <span class="fr">在逃记录：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">职称级别：</span>
                    <span class="fr">吸毒记录：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">职业名称：</span>
                    <span class="fr"></span>
                </div>
                <div class="twoColumns">
                    <span class="fl">颁布证书的机构名称：</span>
                    <span class="fr"></span>
                </div>
                <p class="blank"></p>


                <div class="twoColumns">
                    <span class="fl title">法院涉及情况</span>
                    <span class="fr title">手机状态</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">开庭公告：</span>
                    <span class="fr">手机号：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">裁判文书：</span>
                    <span class="fr">手机号实号：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">执行公告：</span>
                    <span class="fr">归属地：</span>
                </div>
                <div class="twoColumns">
                    <span class="fl">失职公告：</span>
                    <span class="fr">当前状态：{{presonItem.detail.telNoStatus.result}}&nbsp;&nbsp;{{presonItem.detail.telNoStatus.message}}</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">在网时间：{{presonItem.detail.telOnline.result}}&nbsp;&nbsp;{{presonItem.detail.telOnline.message}}</span>
                </div>
                <div class="twoColumns">
                    <span class="fl"></span>
                    <span class="fr">月均消费：</span>
                </div>
                <p>&nbsp; </p>
            </div>   -->
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
            return this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcBasic[0]
        },
        tcEnterpriseShareholder(){
            return this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcShareholder
        },
        tcEnterprisePerson(){
            return this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcPerson
        },
        tcEnterpriseAlter(){
            return this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcAlter
        },
        tcEnterpriseEntinv(){
            return this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcEntinv
        },
        tcEnterpriseFrposition(){
            return this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcFrposition
        },
        tcEnterpriseFrinv(){
            return this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo.tcFrinv
        },
        tcTpcinfoTrademark(){
            return this.$store.state.item.thirdReport.tcTpcinfoTrademark
        },
        tcTpcinfoPatent(){
            return this.$store.state.item.thirdReport.tcTpcinfoPatent
        },
        tcRepresentativeInfo(){
            return this.$store.state.item.thirdReport.tcRepresentativeInfo
        },
        tcEnterpriseMemberInfo(){
            return this.$store.state.item.thirdReport.tcEnterpriseMemberInfo
        },
        expertAdvice(){
            return this.$store.state.item.expertAd||{};
        },
        leadInvestorIntention(){
            return this.$store.state.item.leadAd||{};
        }
    },
    mounted () {
        this.$store.dispatch('item_getThirdReport',{id:this.$route.params.projectId})
    },
    data() {
      return {
        
      };
    }
  };
</script>
<style > 
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
#thirdAuth table {
  width: 100%;
  border-top: 1px solid #bfbfbf;
  margin-top: -1px;
}
#thirdAuth table td,
#thirdAuth table th {
  width: 33%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bfbfbf;
  text-align: center;
}
#thirdAuth table th {
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
  #thirdAuth .businessTitle{
    height:30px;
    font-size: 18px;
    font-weight: bold
  }
 #thirdAuth .businessTitle img{
  text-indent: 20px;
  margin-right:5px;
}
  #thirdAuth .businessinfo-content .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 16px;
    color: black;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
}
 #thirdAuth .businessinfo-content .el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 16px;
}
 #thirdAuth .businessinfo-content .el-form-item {
    margin-bottom: 0px;
}
</style>