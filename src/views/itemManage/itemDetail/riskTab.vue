<template>
  <div id="riskTab">
      <!--风险信息-->
      <el-row :gutter="20" >
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>行政处罚信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form :label-width="'200px'"  label="conent">
                <el-form-item>

                </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>列入经营异常名录信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form :label-width="'200px'"  label="conent">
                <el-form-item>

                </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>主要人员公安不良记录</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form :label-width="'200px'"  label="conent">
                <el-form-item>

                </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>主要人员法院涉诉信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form :label-width="'200px'"  label="conent">
                <el-form-item>

                </el-form-item>
            </el-form>
          </el-col>
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>企业法院涉诉信息</span>
          </el-col>
          <el-col class="businessinfo-content" >  
            <el-form :label-width="'200px'"  label="conent">
                <el-form-item>

                </el-form-item>
            </el-form>
          </el-col>
      </el-row>
  </div>
</template>
<script>
  export default {
    name:'riskTab',
    data() {
      return {
        
      };
    }
  };
</script>
<style scoped> 
  #riskTab{
    margin: 0 auto;
    padding-top: 30px;
    width: 80%;
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