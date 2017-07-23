<template>
  <div id="industryTab">
      <!--工商信息-->
      <el-row :gutter="20">
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>企业照面信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form class="form-block" :label-width="'150px'" v-for="item in businessInfo.tcEnterpriseBasic" :key="item.businessId">
              <el-form-item label="企业名称">
                {{item.entname}}
              </el-form-item>
              <el-form-item label="注册号">
                {{item.regno}}
              </el-form-item>
              <el-form-item label="原注册号">
                {{item.oriregno}}
              </el-form-item>
              <el-form-item label="法定代表人姓名">
                {{item.frname}}
              </el-form-item>
              <el-form-item label="注册资本（万元）">
                {{item.regcap}}
              </el-form-item>
              <el-form-item label="实收资本（万元）">
                {{item.reccap}}
              </el-form-item>
              <el-form-item label="币种">
                {{item.regcapcur}}
              </el-form-item>
              <el-form-item label="经营状态">
                {{item.entstatus}}
              </el-form-item>
              <el-form-item label="企业(机构)类型">
                {{item.enttype}}
              </el-form-item>
              <el-form-item label="开业日期">
                {{item.esdate}}
              </el-form-item>
              <el-form-item label="经营期限自">
                {{item.opfrom}}
              </el-form-item>
              <el-form-item label="经营期限至">
                {{item.opto}}
              </el-form-item>
              <el-form-item label="住址">
                {{item.dom}}
              </el-form-item>
              <el-form-item label="登记机关">
                {{item.regorg}}
              </el-form-item>
              <el-form-item label="许可经营项目">
                {{item.abuitem}}
              </el-form-item>
              <el-form-item label="一般经营项目">
                {{item.cbuitem}}
              </el-form-item>
              <el-form-item label="经营(业务)范围">
                {{item.opscope}}
              </el-form-item>
              <el-form-item label="经营(业务)范围及方式">
                {{item.opscoandform}}
              </el-form-item>
              <el-form-item label="最后年检年度">
                {{item.ancheyear}}
              </el-form-item>
              <el-form-item label="变更日期">
                {{item.changedate}}
              </el-form-item>
              <el-form-item label="注销日期">
                {{item.candate}}
              </el-form-item>
              <el-form-item label="吊销日期">
                {{item.revdate}}
              </el-form-item>
              <el-form-item label="最后年检日期">
                {{item.anchedate}}
              </el-form-item>
              <el-form-item label="行业门类代码">
                {{item.industryphycode}}
              </el-form-item>
              <el-form-item label="行业门类名称">
                {{item.industryphyname}}
              </el-form-item>
              <el-form-item label="国民经济行业代码">
                {{item.industrycocode}}
              </el-form-item>
              <el-form-item label="国民经济行业名称">
                {{item.industryconame}}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>股东信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseShareholder" :key="item.businessId" >
              <el-form-item label="股东名称">
                {{item.shaname}}
              </el-form-item>
              <el-form-item label="认缴出资额(万元)">
                {{item.subconam}}
              </el-form-item>
              <el-form-item label="认缴出资币种">
                {{item.regcapcur}}
              </el-form-item>
              <el-form-item label="出资方式">
                {{item.conform}}
              </el-form-item>
              <el-form-item label="出资比例">
                {{item.fundedratio}}
              </el-form-item>
              <el-form-item label="出资日期">
                {{item.condate}}
              </el-form-item>
              <el-form-item label="国别">
                {{item.country}}
              </el-form-item>
              <el-form-item label="股东总数量">
                {{item.invamount}}
              </el-form-item>
              <el-form-item label="股东出资比例总和">
                {{item.invsumfundedratio}}
              </el-form-item>
              <el-form-item label="   ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>高管信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterprisePerson" :key="item.businessId" >
              <el-form-item label="姓名">
                {{item.pername}}
              </el-form-item>
              <el-form-item label="职位">
                {{item.position}}
              </el-form-item>
              <el-form-item label="性别">
                {{item.sex}}
              </el-form-item>
              <el-form-item label="总人数">
                {{item.personamount}}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>法人对外投资信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseFrinv" :key="item.businessId" >
              <el-form-item label="法定代表人姓名">
                {{item.name}}
              </el-form-item>
              <el-form-item label="企业(机构)名称">
                {{item.entname}}
              </el-form-item>
              <el-form-item label="注册号">
                {{item.regno}}
              </el-form-item>
              <el-form-item label="企业(机构)类型">
                {{item.enttype}}
              </el-form-item>
              <el-form-item label="注册资本(万元)">
                {{item.regcap}}
              </el-form-item>
              <el-form-item label="注册资本币种">
                {{item.regcapcur}}
              </el-form-item>
              <el-form-item label="企业状态">
                {{item.entstatus}}
              </el-form-item>
              <el-form-item label="注销日期">
                {{item.candate}}
              </el-form-item>
              <el-form-item label="吊销日期">
                {{item.revdate}}
              </el-form-item>
              <el-form-item label="登记机关">
                {{item.regorg}}
              </el-form-item>
              <el-form-item label="认缴出资额(万元)">
                {{item.subconam}}
              </el-form-item>
              <el-form-item label="认缴出资币种">
                {{item.currency}}
              </el-form-item>
              <el-form-item label="出资方式">
                {{item.conform}}
              </el-form-item>
              <el-form-item label="出资比例">
                {{item.fundedratio}}
              </el-form-item>
              <el-form-item label="开业日期">
                {{item.esdate}}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>法人其他任职信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseFrposition" :key="item.businessId" >
              <el-form-item label="法定代表人姓名">
                {{item.name}}
              </el-form-item>
              <el-form-item label="企业(机构)名称">
                {{item.entname}}
              </el-form-item>
              <el-form-item label="注册号">
                {{item.regno}}
              </el-form-item>
              <el-form-item label="企业(机构)类型">
                {{item.enttype}}
              </el-form-item>
              <el-form-item label="注册资本(万元)">
                {{item.regcap}}
              </el-form-item>
              <el-form-item label="注册资本币种">
                {{item.regcapcur}}
              </el-form-item>
              <el-form-item label="企业状态">
                {{item.entstatus}}
              </el-form-item>
              <el-form-item label="注销日期">
                {{item.candate}}
              </el-form-item>
              <el-form-item label="吊销日期">
                {{item.revdate}}
              </el-form-item>
              <el-form-item label="登记机关">
                {{item.regorg}}
              </el-form-item>
              <el-form-item label="职务">
                {{item.position}}
              </el-form-item>
              <el-form-item label="是否法定代表人">
                {{item.lerepsign}}
              </el-form-item>
              <el-form-item label="开业日期">
                {{item.esdate}}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>企业对外投资信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseEntinv" :key="item.businessId" >
              <el-form-item label="企业(机构)名称">
                {{item.entname}}
              </el-form-item>
              <el-form-item label="注册号">
                {{item.regno}}
              </el-form-item>
              <el-form-item label="企业(机构)类型">
                {{item.enttype}}
              </el-form-item>
              <el-form-item label="注册资本(万元)">
                {{item.regcap}}
              </el-form-item>
              <el-form-item label="注册资本币种">
                {{item.regcapcur}}
              </el-form-item>
              <el-form-item label="企业状态">
                {{item.entstatus}}
              </el-form-item>
              <el-form-item label="注销日期">
                {{item.candate}}
              </el-form-item>
              <el-form-item label="吊销日期">
                {{item.revdate}}
              </el-form-item>
              <el-form-item label="登记机关">
                {{item.regorg}}
              </el-form-item>
              <el-form-item label="认缴出资额(万元)">
                {{item.subconam}}
              </el-form-item>
              <el-form-item label="认缴出资币种">
                {{item.congrocur}}
              </el-form-item>
              <el-form-item label="出资方式">
                {{item.conform}}
              </el-form-item>
              <el-form-item label="出资比例">
                {{item.fundedratio}}
              </el-form-item>
              <el-form-item label="企业总数量">
                {{item.binvvamount}}
              </el-form-item>
              <el-form-item label="法定代表人姓名">
                {{item.name}}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>变更信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseAlter" :key="item.businessId" >
              <el-form-item label="变更日期">
                {{item.altdate }}
              </el-form-item>
              <el-form-item label="变更事项">
                {{item.altitem }}
              </el-form-item>
              <el-form-item label="变更前内容">
                {{item.altbe }}
              </el-form-item>
              <el-form-item label="变更后内容">
                {{item.altaf}}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>分支机构信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseFiliation" :key="item.brname" >
              <el-form-item label="分支机构名称">
                {{item.brname}}
              </el-form-item>
              <el-form-item label="分支机构企业注册号">
                {{item.brregno}}
              </el-form-item>
              <el-form-item label="分支机构负责人">
                {{item.brprincipal}}
              </el-form-item>
              <el-form-item label="一般经营项目">
                {{item.cbuitem}}
              </el-form-item>
              <el-form-item label="分支机构地址">
                {{item.braddr}}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>股权出质历史信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseSharesimpawn" :key="item.imporg" >
              <el-form-item label="质权人姓名">
                {{item.imporg}}
              </el-form-item>
              <el-form-item label="出质人类别">
                {{item.imporgtype}}
              </el-form-item>
              <el-form-item label="出质金额（万元）">
                {{item.impam}}
              </el-form-item>
              <el-form-item label="出质备案日期">
                {{item.imponrecdate}}
              </el-form-item>
              <el-form-item label="出质审批部门">
                {{item.impexaeep}}
              </el-form-item>
              <el-form-item label="出质批准日期">
                {{item.impsandate}}
              </el-form-item>
              <el-form-item label="出质截至日期">
                {{item.impto}}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>动产抵押信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseMordetail" :key="item.morreg_id" >
              <el-form-item label="抵押ID">
                {{item.morreg_id }}
              </el-form-item>
              <el-form-item label="抵押人">
                {{item.mortgagor }}
              </el-form-item>
              <el-form-item label="抵押权人">
                {{item.more }}
              </el-form-item>
              <el-form-item label="登记机关">
                {{item.regorg }}
              </el-form-item>
              <el-form-item label="登记日期">
                {{item.regidate }}
              </el-form-item>
              <el-form-item label="状态标识">
                {{item.mortype }}
              </el-form-item>
              <el-form-item label="登记证号">
                {{item.morregcno }}
              </el-form-item>
              <el-form-item label="申请抵押原因">
                {{item.appregrea }}
              </el-form-item>
              <el-form-item label="被担保主债权种类">
                {{item.priclaseckind }}
              </el-form-item>
              <el-form-item label="被担保主债权数额(万元)">
                {{item.priclasecam }}
              </el-form-item>
              <el-form-item label="履约起始日期">
                {{item.pefperform }}
              </el-form-item>
              <el-form-item label="履约截止日期">
                {{item.pefperto }}
              </el-form-item>
              <el-form-item label="注销日期">
                {{item.candate }}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>动产抵押物信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.morguainfo" :key="item.businessId" >
              <el-form-item label="变更日期">
                {{item.altdate }}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>失信被执行人信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterprisePunishbreak" :key="item.businessId" >
              <el-form-item label="案号">
                {{item.casecode }}
              </el-form-item>
              <el-form-item label="被执行人姓名/名称">
                {{item.inameclean }}
              </el-form-item>
              <el-form-item label="失信人类型">
                {{item.type }}
              </el-form-item>
              <el-form-item label="性别">
                {{item.sexyclean }}
              </el-form-item>
              <el-form-item label="年龄">
                {{item.ageclean }}
              </el-form-item>
              <el-form-item label="身份证号码/工商注册号">
                {{item.cardnum }}
              </el-form-item>
              <el-form-item label="身份证原始发证地">
                {{item.ysfzd }}
              </el-form-item>
              <el-form-item label="法定代表人/负责人姓名">
                {{item.businessentity }}
              </el-form-item>
              <el-form-item label="立案时间">
                {{item.regdateclean }}
              </el-form-item>
              <el-form-item label="公布时间">
                {{item.publishdateclean }}
              </el-form-item>
              <el-form-item label="执行法院">
                {{item.courtname }}
              </el-form-item>
              <el-form-item label="省份">
                {{item.areanameclean }}
              </el-form-item>
              <el-form-item label="执行依据文号">
                {{item.gistid }}
              </el-form-item>
              <el-form-item label="做出执行依据单位">
                {{item.gistunit }}
              </el-form-item>
              <el-form-item label="生效法律文书确定的义务">
                {{item.duty }}
              </el-form-item>
              <el-form-item label="失信被执行人行为具体情形">
                {{item.disrupttypename }}
              </el-form-item>
              <el-form-item label="被执行人的履行情况">
                {{item.performance }}
              </el-form-item>
              <el-form-item label="已履行">
                {{item.performedpart }}
              </el-form-item>
              <el-form-item label="未履行">
                {{item.unperformpart }}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>被执行人信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterprisePunished" :key="item.businessId" >
              <el-form-item label="案号">
                {{item.casecode }}
              </el-form-item>
              <el-form-item label="被执行人姓名/名称">
                {{item.inameclean }}
              </el-form-item>
              <el-form-item label="身份证号码/企业注册号">
                {{item.cardnumclean }}
              </el-form-item>
              <el-form-item label="性别">
                {{item.sexyclean }}
              </el-form-item>
              <el-form-item label="年龄">
                {{item.ageclean }}
              </el-form-item>
              <el-form-item label="省份">
                {{item.areanameclean }}
              </el-form-item>
              <el-form-item label="身份证原始发证地">
                {{item.ysfzd }}
              </el-form-item>
              <el-form-item label="执行法院">
                {{item.courtname }}
              </el-form-item>
              <el-form-item label="立案时间">
                {{item.regdateclean }}
              </el-form-item>
              <el-form-item label="案件状态">
                {{item.casestate }}
              </el-form-item>
              <el-form-item label="执行标的（元）">
                {{item.execmoney }}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>股权冻结历史信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseSharesfrost" :key="item.businessId" >
              <el-form-item label="冻结文号">
                {{item.frodocno }}
              </el-form-item>
              <el-form-item label="冻结机关">
                {{item.froauth }}
              </el-form-item>
              <el-form-item label="冻结起始日期">
                {{item.frofrom }}
              </el-form-item>
              <el-form-item label="冻结截至日期">
                {{item.froto }}
              </el-form-item>
              <el-form-item label="冻结金额（万元）">
                {{item.froam }}
              </el-form-item>
              <el-form-item label="解冻机关">
                {{item.thawauth }}
              </el-form-item>
              <el-form-item label="解冻文号">
                {{item.thawdocno }}
              </el-form-item>
              <el-form-item label="解冻日期">
                {{item.thawdate }}
              </el-form-item>
              <el-form-item label="解冻说明">
                {{item.thawcomment }}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>清算信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <el-form class="form-block":label-width="'150px'" v-for="item in businessInfo.tcEnterpriseLiquidation" :key="item.businessId" >
              <el-form-item label="清算责任人">
                {{item.ligentity }}
              </el-form-item>
              <el-form-item label="清算负责人">
                {{item.ligprincipal }}
              </el-form-item>
              <el-form-item label="清算组成员">
                {{item.liqmen }}
              </el-form-item>
              <el-form-item label="清算完结情况">
                {{item.ligst }}
              </el-form-item>
              <el-form-item label="清算完结日期">
                {{item.ligenddate }}
              </el-form-item>
              <el-form-item label="债务承接人">
                {{item.debttranee }}
              </el-form-item>
              <el-form-item label="债权承接人">
                {{item.claimtranee }}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          
      </el-row>
  </div>
</template>
<script>

  export default {
    name:'industryTab',
    computed: {
        businessInfo:function(){
          if(this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo){
            return this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo;
          }
          return {};
        }
    }
  };
</script>
<style>
  #industryTab{
    margin: 0 auto;
    padding-top: 30px;
    width: 80%;
    min-width: 890px;
  }
 #industryTab .businessTitle{
  height:30px;
  font-size: 18px;
  font-weight: bold
  }
  #industryTab .businessTitle img{
    text-indent: 20px;
    margin-right:5px;
  }
  #industryTab .form-block{
    border-bottom: 1px solid #06ccb7;
    margin-bottom: 10px;
  }
  #industryTab .businessinfo-content .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 16px;
    color: black;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
}
 #industryTab .businessinfo-content .el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 16px;
}
 #industryTab .businessinfo-content .el-form-item {
    margin-bottom: 0px;
}
</style>