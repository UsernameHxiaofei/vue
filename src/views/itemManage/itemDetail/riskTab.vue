<style > 
    #riskTab{
      margin: 0 auto;
      padding-top: 30px;
      width: 90%;
      min-width: 890px;
    }
    #riskTab .businessTitle{
    height:30px;
    font-size: 18px;
    font-weight: bold
  }
   #riskTab .businessTitle img{
    text-indent: 20px;
    margin-right:5px;
  }
  #riskTab .form-block{
      border-bottom: 1px solid #06ccb7;
      margin-bottom: 10px;
    }
    #riskTab .businessinfo-content .el-form-item__label {
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 16px;
      color: black;
      line-height: 1;
      padding: 11px 12px 11px 0;
      box-sizing: border-box;
  }
   #riskTab .businessinfo-content .el-form-item__content {
      line-height: 36px;
      position: relative;
      font-size: 16px;
  }
   #riskTab .businessinfo-content .el-form-item {
      margin-bottom: 0px;
  }
   #riskTab .tableInfo{
      width:100%;
      border:1px solid gray;
      margin:10px auto 20px 0;
   }
   #riskTab .tableInfo td{
      border:1px solid #bfbfbf;
      line-height: 30px;
      text-indent: 5px;
   }
   #riskTab .tableInfo tbody{
      border:2px groove #bababa;
   }
   #riskTab .tableInfo td:nth-child(2n-1){
      font-weight:bold;
      text-align: center;
      width:200px;
      text-indent: -10px;
   }
   #riskTab .tableInfo td:nth-child(2n){
      width:400px;
   }
  </style>
<template>
  <div id="riskTab">
      <!--风险信息-->
      <el-row :gutter="20" >
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>行政处罚信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <table class="tableInfo" v-if="!!(thirdReport&&thirdReport.tcEnterpriseBusinessInfo&&thirdReport.tcEnterpriseBusinessInfo.tcCaseinfo)"  v-for="item in (thirdReport&&thirdReport.tcEnterpriseBusinessInfo&&thirdReport.tcEnterpriseBusinessInfo.tcCaseinfo)" :key="item.businessId">
               <tr><td>案发时间</td><td>{{item.casetime }}</td><td>案由</td><td>{{item.casereason }}</td></tr>
               <tr><td>案值</td><td>{{item.caseval }}</td><td>案发时间</td><td>{{item.casetime }}</td></tr>
               <tr><td>案件类型</td><td>{{item.casetype }}</td><td>执行类别</td><td>{{item.exesort }}</td></tr>
               <tr><td>案件结果</td><td>{{item.caseresult }}</td><td>处罚决定文书</td><td>{{item.pendecno }}</td></tr>
               <tr><td>处罚决定书签发日期</td><td>{{item.pendecissdate }}</td><td>作出行政处罚决定机关名称</td><td>{{item.penauth }}</td></tr>
               <tr><td>主要违法事实</td><td>{{item.illegfact }}</td><td>处罚依据</td><td>{{item.penbasis }}</td></tr>
               <tr><td>处罚种类</td><td>{{item.pentype }}</td><td>处罚结果</td><td>{{item.penresult }}</td></tr>
               <tr><td>处罚金额</td><td>{{item.penam }}</td><td>处罚执行情况</td><td>{{item.penexest }}</td></tr>
               <tr><td>证件号</td><td>{{item.cerno }}</td><td>当事人</td><td>{{item.name }}</td></tr>
            </table>
            <table class="tableInfo" v-else>
              <tr><td>没有查询到行政处罚信息</td></tr>
            </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>主要人员公安不良记录</span>
          </el-col>
          <el-col class="businessinfo-content" >  
              <table class="tableInfo"  v-if="!!thirdReport.tcRepresentativeInfo"  >
                  <tr><td>法定代表人</td><td>{{thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.name}}{{thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo.result==0?'(无不良记录)':''}}</td></tr>
                  <tr v-for="(item,index) in thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo.tcBadInfoItems" :key="index">
                    <td>{{item.caseTime}}</td>
                    <td>{{item.caseSource}}</td>
                  </tr>
              </table>
              <table class="tableInfo"   v-for="(item,index) in thirdReport.tcEnterpriseMemberInfo" :key="index">
                  <tr><td>高管</td><td>{{item.tcBadInfo&&item.tcBadInfo.name||''}}{{item.tcBadInfo&&item.tcBadInfo.result&&item.tcBadInfo.result==0?'(无不良记录)':''}}</td></tr>
                  <tr v-for="(i,ind) in item.tcBadInfo.tcBadInfoItems" :key="ind">
                      <td>{{i.caseTime}}</td>
                      <td>{{i.caseSource}}</td>
                  </tr>
              </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>主要人员法院涉诉信息</span>
          </el-col>
          <el-col class="businessinfo-content" >
              <table class="tableInfo" v-if="!!thirdReport.tcRepresentativeInfo">
                <tr><td>法定代表人</td><td>{{thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.name}}{{thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcLitigationPerson&&thirdReport.tcRepresentativeInfo.tcLitigationPerson.length==0?'(无涉诉信息)':''}}</td></tr>
                <tbody  v-for="(item,index) in thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcLitigationPerson" :key="index" >
                    <tr><td>标题</td><td>{{item.title}}</td></tr>
                    <tr><td>内容</td><td>{{item.body}}</td></tr>
                    <tr><td>时间</td><td>{{item.sortTime}}</td></tr>
                    <tr><td>名称</td><td>{{item.count}}</td></tr>
                    <tr><td>案号</td><td>{{item.caseNo}}</td></tr>
                    <tr><td>当事人/被执行人</td><td>{{item.pname}}</td></tr>
                    <tr><td>类型</td><td>{{item.datatype=='cpws'?'裁判文书':item.datatype=='ktgg'?'开庭公告':item.datatype=='zxgg'?'执行公告':item.datatype=='sxgg'?'失信公告':item.datatype=='fygg'?'法院公告':item.datatype=='wdhmd'?'网贷黑名单':item.datatype=='ajlc'?'案件流程信息':item.datatype=='bgt'?'曝光台':'未知来源'}}</td></tr>
                </tbody>
              </table>  
              <table class="tableInfo"v-for="(item,index) in thirdReport.tcEnterpriseMemberInfo" :key="index"   >
                <tr><td>高管</td><td>{{item.tcBadInfo&&item.tcBadInfo.name}}{{item.tcLitigationPerson&&item.tcLitigationPerson.length==0?'（无涉诉信息）':''}}</td></tr>
                <tbody v-if="item.tcLitigationPerson&&item.tcLitigationPerson.length>0" v-for="(i,ind) in item.tcLitigationPerson" :key="ind">
                    <tr><td>标题</td><td>{{i.title}}</td></tr>
                    <tr><td>内容</td><td>{{i.body}}</td></tr>
                    <tr><td>时间</td><td>{{i.sortTime}}</td></tr>
                    <tr><td>名称</td><td>{{i.count}}</td></tr>
                    <tr><td>案号</td><td>{{i.caseNo}}</td></tr>
                    <tr><td>当事人/被执行人</td><td>{{i.pname}}</td></tr>
                    <tr><td>类型</td><td>{{i.datatype=='cpws'?'裁判文书':i.datatype=='ktgg'?'开庭公告':i.datatype=='zxgg'?'执行公告':i.datatype=='sxgg'?'失信公告':i.datatype=='fygg'?'法院公告':i.datatype=='wdhmd'?'网贷黑名单':i.datatype=='ajlc'?'案件流程信息':i.datatype=='bgt'?'曝光台':'未知来源'}}</td></tr>
                </tbody>
              </table>  
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>企业法院涉诉信息 {{thirdReport&&thirdReport.tcLitigationEnterprise&&thirdReport.tcLitigationEnterprise.length>0?'':'(无)'}}</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <table class="tableInfo" v-for="item in (thirdReport&&thirdReport.tcLitigationEnterprise)" :key="item.id">
                <tr><td>标题</td><td>{{item.title }}</td><td>时间</td><td>{{item.sortTime }}</td></tr>
                <tr><td>内容</td><td>{{item.body }}</td><td>名称</td><td>{{item.count }}</td></tr>
                <tr><td>案号</td><td>{{item.caseNo }}</td><td>当事人/被执行人</td><td>{{item.pname }}</td></tr>
                <tr><td>类型</td><td>{{item.datatype=='cpws'?'裁判文书':item.datatype=='ktgg'?'开庭公告':item.datatype=='zxgg'?'执行公告':item.datatype=='sxgg'?'失信公告':item.datatype=='fygg'?'法院公告':item.datatype=='wdhmd'?'网贷黑名单':item.datatype=='ajlc'?'案件流程信息':item.datatype=='bgt'?'曝光台':'未知来源'}}</td><td></td><td></td></tr>
            </table>
          </el-col>
      </el-row>
  </div>
</template>
<script>
  export default {
    name:'riskTab',
    computed: {
        thirdReport:function(){
          return this.$store.state.item.thirdReport;
        }
    },
    data() {
      return {
        
      };
    }
  };
</script>
