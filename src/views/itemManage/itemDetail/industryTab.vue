<template>
  <div id="industryTab">
      <!--工商信息-->
      <el-row :gutter="20">
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>企业照面信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
              <table class="tableInfo" v-for="item in businessInfo.tcBasic" :key="item.businessId">
                  <tr><td>企业名称</td><td>{{item.entname }}</td><td>法定代表人姓名</td><td>{{item.frname }}</td></tr>
                  <tr><td>注册号</td><td>{{item.regno }}</td><td>原注册号</td><td>{{item.oriregno }}</td></tr>
                  <tr><td>注册资本（万元）</td><td>{{item.regcap }}</td><td>实收资本（万元）</td><td>{{item.reccap }}</td></tr>
                  <tr><td>币种</td><td>{{item.regcapcur }}</td><td>经营状态</td><td>{{item.entstatus }}</td></tr>
                  <tr><td>企业(机构)类型</td><td>{{item.enttype }}</td><td>开业日期</td><td>{{item.esdate }}</td></tr>
                  <tr><td>经营期限自</td><td>{{item.opfrom }}</td><td>经营期限至</td><td>{{item.opto }}</td></tr>
                  <tr><td>住址</td><td>{{item.dom }}</td><td>登记机关</td><td>{{item.regorg }}</td></tr>
                  <tr><td>许可经营项目</td><td>{{item.abuitem }}</td><td>一般经营项目</td><td>{{item.cbuitem }}</td></tr>
                  <tr><td>经营(业务)范围</td><td>{{item.opscope }}</td><td>经营(业务)范围及方式</td><td>{{item.opscoandform }}</td></tr>
                  <tr><td>最后年检年度</td><td>{{item.ancheyear }}</td><td>变更日期</td><td>{{item.changedate }}</td></tr>
                  <tr><td>注销日期</td><td>{{item.candate }}</td><td>最后年检日期</td><td>{{item.anchedate }}</td></tr>
                  <tr><td>行业门类代码</td><td>{{item.industryphycode }}</td><td>行业门类名称</td><td>{{item.industryphyname }}</td></tr>
                  <tr><td>国民经济行业代码</td><td>{{item.industrycocode }}</td><td>国民经济行业名称</td><td>{{item.industryconame }}</td></tr>
               </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>股东信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
              <table class="tableInfo" v-for="item in businessInfo.tcShareholder" :key="item.businessId">
                  <tr><td>股东名称</td><td>{{item.shaname }}</td><td>认缴出资额(万元)</td><td>{{item.subconam }}</td></tr>
                  <tr><td>认缴出资币种</td><td>{{item.regcapcur }}</td><td>出资方式</td><td>{{item.conform }}</td></tr>
                  <tr><td>出资方式</td><td>{{item.fundedratio }}</td><td>出资比例</td><td>{{item.fundedratio }}</td></tr>
                  <tr><td>出资日期</td><td>{{item.condate }}</td><td>国别</td><td>{{item.country }}</td></tr>
                  <tr><td>股东总数量</td><td>{{item.invamount }}</td><td>股东出资比例总和</td><td>{{item.invsumfundedratio }}</td></tr>
              </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>高管信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
              <table class="tableInfo1">
                  <tr><th>姓名</th><th>职位</th><th>性别</th><th>总人数</th></tr>
                  <tr v-for="item in businessInfo.tcPerson" :key="item.businessId">
                    <td>{{item.pername}}</td><td>{{item.position }}</td><td>{{item.sex}}</td><td>{{item.personamount }}</td>
                  </tr>
              </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>法人对外投资信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
              <table class="tableInfo" v-for="item in businessInfo.tcFrinv" :key="item.businessId">
                  <tr><td>法定代表人姓名</td><td>{{item.name }}</td><td>企业(机构)名称</td><td>{{item.entname }}</td></tr>
                  <tr><td>注册号</td><td>{{item.regno }}</td><td>企业(机构)类型</td><td>{{item.enttype }}</td></tr>
                  <tr><td>注册资本(万元)</td><td>{{item.regcap }}</td><td>注册资本币种</td><td>{{item.regcapcur }}</td></tr>
                  <tr><td>企业状态</td><td>{{item.entstatus }}</td><td>注销日期</td><td>{{item.candate }}</td></tr>
                  <tr><td>吊销日期</td><td>{{item.revdate }}</td><td>登记机关</td><td>{{item.regorg }}</td></tr>
                  <tr><td>认缴出资额(万元)</td><td>{{item.subconam }}</td><td>认缴出资币种</td><td>{{item.currency }}</td></tr>
                  <tr><td>出资方式</td><td>{{item.conform }}</td><td>出资比例</td><td>{{item.fundedratio }}</td></tr>
                  <tr><td>开业日期</td><td>{{item.esdate }}</td><td></td><td></td></tr>
              </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>法人其他任职信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
              <table class="tableInfo"v-for="item in businessInfo.tcFrposition" :key="item.businessId">
                  <tr><td>法定代表人姓名</td><td>{{item.name }}</td><td>企业(机构)名称</td><td>{{item.entname }}</td></tr>
                  <tr><td>注册号</td><td>{{item.regno }}</td><td>企业(机构)类型</td><td>{{item.enttype }}</td></tr>
                  <tr><td>注册资本(万元)</td><td>{{item.regcap }}</td><td>注册资本币种</td><td>{{item.regcapcur }}</td></tr>
                  <tr><td>企业状态</td><td>{{item.entstatus }}</td><td>注销日期</td><td>{{item.candate }}</td></tr>
                  <tr><td>吊销日期</td><td>{{item.revdate }}</td><td>登记机关</td><td>{{item.regorg }}</td></tr>
                  <tr><td>职务</td><td>{{item.position }}</td><td>是否法定代表人</td><td>{{item.lerepsign }}</td></tr>
                  <tr><td>开业日期</td><td>{{item.esdate }}</td><td></td><td></td></tr>
              </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>企业对外投资信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
              <table class="tableInfo" v-for="item in businessInfo.tcEntinv" :key="item.businessId">
                  <tr><td>企业(机构)名称</td><td>{{item.entname }}</td><td>注册号</td><td>{{item.regno }}</td></tr>
                  <tr><td>企业(机构)类型</td><td>{{item.enttype }}</td><td>注册资本(万元)</td><td>{{item.regcap }}</td></tr>
                  <tr><td>注册资本币种</td><td>{{item.regcapcur }}</td><td>企业状态</td><td>{{item.entstatus }}</td></tr>
                  <tr><td>注销日期</td><td>{{item.candate }}</td><td>吊销日期</td><td>{{item.revdate }}</td></tr>
                  <tr><td>认缴出资额(万元)</td><td>{{item.subconam }}</td><td>认缴出资币种</td><td>{{item.congrocur }}</td></tr>
                  <tr><td>出资方式</td><td>{{item.conform }}</td><td>出资比例</td><td>{{item.fundedratio }}</td></tr>
                  <tr><td>企业总数量</td><td>{{item.binvvamount }}</td><td>登记机关</td><td>{{item.regorg }}</td></tr>
                  <tr><td>法定代表人姓名</td><td>{{item.name }}</td><td></td><td></td></tr>
              </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>变更信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
              <table class="tableInfo1">
                  <tr><th>变更日期</th><th>变更事项</th><th>变更前内容</th><th>变更后内容</th></tr>
                  <tr v-for="item in businessInfo.tcAlter" :key="item.businessId">
                    <td>{{item.altdate}}</td><td>{{item.altitem }}</td><td>{{item.altbe}}</td><td>{{item.altaf }}</td>
                  </tr>
              </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>分支机构信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <table class="tableInfo1">
                <tr><th>分支机构名称</th><th>分支机构企业注册号</th><th>分支机构负责人</th><th>一般经营项目</th><th>分支机构地址</th></tr>
                <tr v-if="businessInfo.tcFiliation&&businessInfo.tcFiliation.length>0"  v-for="item in businessInfo.tcFiliation" :key="item.brname">
                  <td>{{item.brname}}</td><td>{{item.brregno}}</td><td>{{item.brprincipal}}</td><td>{{item.cbuitem}}</td><td>{{item.braddr}}</td>
                </tr>
                <tr v-else><td colspan="5">没有查询到分支机构信息</td></tr>
            </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>股权出质历史信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
              <table class="tableInfo1">
                  <tr><th>质权人姓名</th><th>出质人类别</th><th>出质金额（万元）</th><th>出质备案日期</th><th>出质审批部门</th><th>出质批准日期</th><th>出质截至日期</th></tr>
                  <tr v-if="businessInfo.tcFiliation&&businessInfo.tcSharesimpawn.length>0"  v-for="item in businessInfo.tcFiliation" :key="item.brname">
                    <td>{{item.imporg}}</td>
                    <td>{{item.imporgtype}}</td>
                    <td>{{item.impam}}</td>
                    <td>{{item.imponrecdate}}</td>
                    <td>{{item.impexaeep}}</td>
                    <td>{{item.impsandate}}</td>
                    <td>{{item.impto}}</td>
                  </tr>
              </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>动产抵押信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
            <table class="tableInfo" v-if="!!businessInfo.tcMordetail" v-for="item in businessInfo.tcMordetail" :key="item.businessId">
              <tr><td>抵押ID</td><td>{{item.morreg_id }}</td><td>抵押人</td><td>{{item.mortgagor }}</td></tr>
              <tr><td>抵押权人</td><td>{{item.more }}</td><td>登记机关</td><td>{{item.regorg }}</td></tr>
              <tr><td>登记日期</td><td>{{item.regidate }}</td><td>状态标识</td><td>{{item.mortype }}</td></tr>
              <tr><td>登记证号</td><td>{{item.morregcno }}</td><td>申请抵押原因</td><td>{{item.appregrea }}</td></tr>
              <tr><td>被担保主债权种类</td><td>{{item.priclaseckind }}</td><td>被担保主债权数额(万元)</td><td>{{item.priclasecam }}</td></tr>
              <tr><td>履约起始日期</td><td>{{item.pefperform }}</td><td>履约截止日期</td><td>{{item.pefperto }}</td></tr>
              <tr><td>注销日期</td><td>{{item.candate }}</td><td></td><td></td></tr>
            </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>动产抵押物信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
              <table class="tableInfo1">
                  <tr><th>抵押 ID</th><th>抵押物名称</th><th>数量</th><th>价值(万元)</th></tr>
                  <tr v-if="businessInfo.tcMorguainfo&&businessInfo.tcMorguainfo.length>0"  v-for="item in businessInfo.tcMorguainfo" :key="item.businessId">
                    <td>{{item.brname}}</td><td>{{item.brregno}}</td><td>{{item.brprincipal}}</td><td>{{item.cbuitem}}</td>
                  </tr>
              </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>失信被执行人信息</span>
          </el-col>
          <el-col class="businessinfo-content">  
              <table class="tableInfo" v-for="item in businessInfo.tcPunishbreak" :key="item.businessId">
                  <tr><td>案号</td><td>{{item.casecode }}</td><td>被执行人姓名/名称</td><td>{{item.inameclean }}</td></tr>
                  <tr><td>失信人类型</td><td>{{item.type }}</td><td>性别</td><td>{{item.sexyclean }}</td></tr>
                  <tr><td>年龄</td><td>{{item.ageclean }}</td><td>身份证号码/工商注册号</td><td>{{item.cardnum }}</td></tr>
                  <tr><td>身份证原始发证地</td><td>{{item.ysfzd }}</td><td>法定代表人/负责人姓名</td><td>{{item.businessentity }}</td></tr>
                  <tr><td>立案时间</td><td>{{item.regdateclean }}</td><td>公布时间</td><td>{{item.publishdateclean }}</td></tr>
                  <tr><td>执行法院</td><td>{{item.courtname }}</td><td>省份</td><td>{{item.areanameclean }}</td></tr>
                  <tr><td>执行依据文号</td><td>{{item.gistid }}</td><td>做出执行依据单位</td><td> {{item.gistunit }}</td></tr>
                  <tr><td>生效法律文书确定的义务</td><td>{{item.duty }}</td><td>失信被执行人行为具体情形</td><td> {{item.disrupttypename }}</td></tr>
                  <tr><td>被执行人的履行情况</td><td>{{item.performance }}</td><td>已履行</td><td> {{item.performedpart }}</td></tr>
                  <tr><td>未履行</td><td>{{item.unperformpart }}</td><td></td><td></td></tr>
                </table>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>被执行人信息</span>
          </el-col>
          <el-col class="businessinfo-content">
              <table class="tableInfo" v-for="item in businessInfo.tcPunished" :key="item.businessId">
                  <tr><td>案号</td><td>{{item.casecode }}</td><td>被执行人姓名/名称</td><td>{{item.inameclean }}</td></tr>
                  <tr><td>身份证号码/企业注册号</td><td>{{item.cardnumclean }}</td><td>性别</td><td>{{item.sexyclean }}</td></tr>
                  <tr><td>年龄</td><td>{{item.ageclean }}</td><td>省份</td><td>{{item.areanameclean }}</td></tr>
                  <tr><td>身份证原始发证地</td><td>{{item.ysfzd }}</td><td>执行法院</td><td>{{item.courtname }}</td></tr>
                  <tr><td>立案时间</td><td>{{item.regdateclean }}</td><td>案件状态</td><td>{{item.casestate }}</td></tr>
                  <tr><td>执行标的（元）</td><td>{{item.execmoney }}</td><td></td><td></td></tr>
              </table>  
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>股权冻结历史信息</span>
          </el-col>
          <el-col class="businessinfo-content">
            <table class="tableInfo" v-for="item in businessInfo.tcSharesfrost" :key="item.businessId">
                <tr><td>冻结文号</td><td>{{item.frodocno }}</td><td>冻结机关</td><td>{{item.froauth }}</td></tr>
                <tr><td>冻结起始日期</td><td>{{item.frofrom }}</td><td>冻结截至日期</td><td>{{item.froto }}</td></tr>
                <tr><td>冻结金额（万元）</td><td>{{item.froam }}</td><td>解冻机关</td><td>{{item.thawauth }}</td></tr>
                <tr><td>解冻文号</td><td>{{item.thawauth }}</td><td>解冻日期</td><td>{{item.thawdate }}</td></tr>
                <tr><td>解冻说明</td><td>{{item.thawcomment }}</td><td></td><td></td></tr>
            </table>    
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>清算信息</span>
          </el-col>
          <el-col class="businessinfo-content">
            <table class="tableInfo1">
                <tr><th>清算责任人</th><th>清算负责人</th><th>清算组成员</th><th>清算完结情况</th><th>清算完结日期</th><th>债务承接人</th><th>债权承接人</th></tr>
                <tr v-if="businessInfo.tcMorguainfo&&businessInfo.tcMorguainfo.length>0"  v-for="item in businessInfo.tcMorguainfo" :key="item.businessId">
                  <td>{{item.ligentity}}</td>
                  <td>{{item.ligprincipal}}</td>
                  <td>{{item.liqmen}}</td>
                  <td>{{item.ligst}}</td>
                  <td>{{item.ligenddate}}</td>
                  <td>{{item.debttranee}}</td>
                  <td>{{item.claimtranee}}</td>
                </tr>
            </table>
          </el-col>
      </el-row>
  </div>
</template>
<script>

export default {
	name:'industryTab',
	computed: {
		thirdReport:function(){
			return this.$store.state.item.thirdReport
		},
		itemManageDetail: function () {
			return this.$store.state.item.itemManageDetail || {}
		}
	},
	beforeMount () {
      
		this.$store.dispatch('item_getThirdReport',{id:this.$route.params.projectId}).then(()=>{
			this.businessInfo=(this.$store.state.item.thirdReport&&this.$store.state.item.thirdReport.tcEnterpriseBusinessInfo)||{}
		})
      
	},
	data () {
		return {
			businessInfo:{}
		}
	}
}
</script>
<style>
  #industryTab .tableInfo{
      width:100%;
      border:1px solid gray;
      margin:10px auto 20px 0;
   }
  #industryTab .tableInfo1{
      width:100%;
      border:1px solid gray;
      margin:10px auto 20px 0;
   }
   #industryTab .tableInfo td{
      border:1px solid #bfbfbf;
      line-height: 30px;
      text-indent: 5px;
   }
   #industryTab .tableInfo1 td{
      border:1px solid #bfbfbf;
      line-height: 30px;
      text-indent: 5px;
      text-align: center;
   }
   #industryTab .tableInfo1 th{
      border:1px solid #bfbfbf;
      line-height: 30px;
      text-indent: 5px;
      text-align: center;
   }
   #industryTab .tableInfo td{
      border:1px solid #bfbfbf;
      line-height: 30px;
      text-indent: 5px;
   }
   #industryTab .tableInfo tbody{
      border:2px groove #bababa;
   }
   #industryTab .tableInfo td:nth-child(2n-1){
      font-weight:bold;
      text-align: center;
      width:200px;
      text-indent: -10px;
   }
   #industryTab .tableInfo td:nth-child(2n){
      width:400px;
   }
  #industryTab{
    margin: 0 auto;
    padding-top: 30px;
    width: 90%;
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

</style>