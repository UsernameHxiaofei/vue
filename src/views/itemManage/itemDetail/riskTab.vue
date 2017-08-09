<template>
  <div id="riskTab">
      <!--风险信息-->
      <el-row :gutter="20" >
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>行政处罚信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form class="form-block":label-width="'150px'" v-for="item in (thirdReport&&thirdReport.tcEnterpriseBusinessInfo&&thirdReport.tcEnterpriseBusinessInfo.tcEnterpriseCaseinfo)" :key="item.businessId" >
              <el-form-item label="案发时间">
                {{item.casetime }}
              </el-form-item>
              <el-form-item label="案由">
                {{item.casereason }}
              </el-form-item>
              <el-form-item label="案值">
                {{item.caseval }}
              </el-form-item>
              <el-form-item label="案件类型">
                {{item.casetype }}
              </el-form-item>
              <el-form-item label="执行类别">
                {{item.exesort }}
              </el-form-item>
              <el-form-item label="案件结果">
                {{item.caseresult }}
              </el-form-item>
              <el-form-item label="处罚决定文书">
                {{item.pendecno }}
              </el-form-item>
              <el-form-item label="处罚决定书签发日期">
                {{item.pendecissdate }}
              </el-form-item>
              <el-form-item label="作出行政处罚决定机关名称">
                {{item.penauth }}
              </el-form-item>
              <el-form-item label="主要违法事实">
                {{item.illegfact }}
              </el-form-item>
              <el-form-item label="处罚依据">
                {{item.penbasis }}
              </el-form-item>
              <el-form-item label="处罚种类">
                {{item.pentype }}
              </el-form-item>
              <el-form-item label="处罚结果">
                {{item.penresult }}
              </el-form-item>
              <el-form-item label="处罚金额">
                {{item.penresult }}
              </el-form-item>
              <el-form-item label="案发时间">
                {{item.penam }}
              </el-form-item>
              <el-form-item label="处罚执行情况">
                {{item.penexest }}
              </el-form-item>
              <el-form-item label="    ">
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>列入经营异常名录信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form :label-width="'200px'"  >
                <el-form-item>

                </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>主要人员公安不良记录</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form  :label-width="'200px'" v-if="!!thirdReport.tcRepresentativeInfo" >
                <el-form-item label="法定代表人" v-if="!!(thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo)">
                   {{thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.name}}&emsp;
                   {{thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo.result==0?'无不良记录':''}}
                </el-form-item>
                <el-form-item>
                   <el-form :label-width="'200px'" v-if="thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo.result==1" >
                      <el-form-item label="不良记录" v-for="(item,index) in thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo&&thirdReport.tcRepresentativeInfo.tcBadInfo.tcBadInfoItems" :key="index">
                          {{item.caseTime}}:{{item.caseSource}}
                      </el-form-item>
                   </el-form>
                </el-form-item>
            </el-form>
            <el-form class="form-block" :label-width="'200px'" v-for="(item,index) in thirdReport.tcEnterpriseMemberInfo" :key="index">
                <el-form-item label="高管" v-if="!!item.tcBadInfo">
                   {{item.tcBadInfo&&item.tcBadInfo.name||''}}&emsp;
                   {{item.tcBadInfo&&item.tcBadInfo.result&&item.tcBadInfo.result==0?'无不良记录':''}}
                </el-form-item>
                <el-form-item>
                   <el-form :label-width="'200px'" v-if="item.tcBadInfo&&item.tcBadInfo.result==1" >
                      <el-form-item label="不良记录" v-for="(i,ind) in item.tcBadInfo.tcBadInfoItems" :key="ind">
                          {{i.caseTime}}:{{i.caseSource}}
                      </el-form-item>
                   </el-form>
                </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>主要人员法院涉诉信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form  :label-width="'200px'"  v-if="!!thirdReport.tcRepresentativeInfo" >
                <el-form-item label="法定代表人">
                   {{thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.name}}&emsp;
                   {{thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcLitigationPerson&&thirdReport.tcRepresentativeInfo.tcLitigationPerson.length==0?'无涉诉信息':''}}
                </el-form-item>
                <el-form-item>
                   <el-form :label-width="'200px'" class="form-block" v-if="thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcLitigationPerson&&thirdReport.tcRepresentativeInfo.tcLitigationPerson.length>0" v-for="(item,index) in thirdReport.tcRepresentativeInfo&&thirdReport.tcRepresentativeInfo.tcLitigationPerson" :key="index" >
                      <el-form-item label="标题" >
                        {{item.title}}
                      </el-form-item>
                      <el-form-item label="内容" >
                        {{item.body}}
                      </el-form-item>
                      <el-form-item label="时间" >
                        {{item.sortTime}}
                      </el-form-item>
                      <el-form-item label="名称" >
                        {{item.count}}
                      </el-form-item>
                      <el-form-item label="案号" >
                        {{item.caseNo}}
                      </el-form-item>
                      <el-form-item label="当事人/被执行人" >
                        {{item.pname}}
                      </el-form-item>
                      <el-form-item label="类型" >
                        {{item.datatype=='cpws'?'裁判文书':item.datatype=='ktgg'?'开庭公告':item.datatype=='zxgg'?'执行公告':item.datatype=='sxgg'?'失信公告':item.datatype=='fygg'?'法院公告':item.datatype=='wdhmd'?'网贷黑名单':item.datatype=='ajlc'?'案件流程信息':item.datatype=='bgt'?'曝光台':'未知来源'}}
                      </el-form-item>
                   </el-form>
                </el-form-item>
                <el-form :label-width="'200px'" v-for="(item,index) in thirdReport.tcEnterpriseMemberInfo" :key="index" >
                    <el-form-item label="高管">
                      {{item.tcBadInfo&&item.tcBadInfo.name}}&emsp;
                      {{item.tcLitigationPerson&&item.tcLitigationPerson.length==0?'无涉诉信息':''}}
                    </el-form-item>
                    <el-form-item>
                      <el-form class="form-block" :label-width="'200px'" v-if="item.tcLitigationPerson&&item.tcLitigationPerson.length>0" v-for="(i,ind) in item.tcLitigationPerson" :key="ind">
                          <el-form-item label="标题" >
                            {{i.title}}
                          </el-form-item>
                          <el-form-item label="内容" >
                            {{i.body}}
                          </el-form-item>
                          <el-form-item label="时间" >
                            {{i.sortTime}}
                          </el-form-item>
                          <el-form-item label="名称" >
                            {{i.count}}
                          </el-form-item>
                          <el-form-item label="案号" >
                            {{i.caseNo}}
                          </el-form-item>
                          <el-form-item label="当事人/被执行人" >
                            {{i.pname}}
                          </el-form-item>
                          <el-form-item label="类型" >
                            {{i.datatype=='cpws'?'裁判文书':item.datatype=='ktgg'?'开庭公告':item.datatype=='zxgg'?'执行公告':item.datatype=='sxgg'?'失信公告':item.datatype=='fygg'?'法院公告':item.datatype=='wdhmd'?'网贷黑名单':item.datatype=='ajlc'?'案件流程信息':item.datatype=='bgt'?'曝光台':'未知来源'}}
                          </el-form-item>
                      </el-form>
                    </el-form-item>
                </el-form>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>企业法院涉诉信息 {{thirdReport&&thirdReport.tcLitigationEnterprise&&thirdReport.tcLitigationEnterprise.length>0?'':'(无)'}}</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form :label-width="'200px'" class="form-block" v-for="item in (thirdReport&&thirdReport.tcLitigationEnterprise)" :key="item.id">
                <el-form-item label="标题" >
                  {{item.title}}
                </el-form-item>
                <el-form-item label="内容" >
                  {{item.body}}
                </el-form-item>
                <el-form-item label="时间" >
                  {{item.sortTime}}
                </el-form-item>
                <el-form-item label="名称" >
                  {{item.count}}
                </el-form-item>
                <el-form-item label="案号" >
                  {{item.caseNo}}
                </el-form-item>
                <el-form-item label="当事人/被执行人" >
                  {{item.pname}}
                </el-form-item>
                <el-form-item label="类型" >
                  {{item.datatype=='cpws'?'裁判文书':item.datatype=='ktgg'?'开庭公告':item.datatype=='zxgg'?'执行公告':item.datatype=='sxgg'?'失信公告':item.datatype=='fygg'?'法院公告':item.datatype=='wdhmd'?'网贷黑名单':item.datatype=='ajlc'?'案件流程信息':item.datatype=='bgt'?'曝光台':'未知来源'}}
                </el-form-item>
            </el-form>
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
</style>