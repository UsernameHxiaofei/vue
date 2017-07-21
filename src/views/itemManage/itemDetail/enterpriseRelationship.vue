<template>
  <div id="enterpriseRelation">
      <el-row :gutter="20" >
          <el-col class="businessTitle">
            <img src="../../../assets/images/linear.png"  /> <span>企业关系图谱</span>
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
    name:'enterpriseRelation',
    data() {
      return {
        
      };
    }
  };
</script>
<style scoped> 
  #enterpriseRelation{
    margin: 0 auto;
    padding-top: 30px;
    width: 80%;
    min-width: 890px;
  }
  #enterpriseRelation{
    margin: 0 auto;
    padding-top: 30px;
    width: 80%;
    min-width: 890px;
  }
  #enterpriseRelation .businessTitle{
  height:30px;
  font-size: 18px;
  font-weight: bold
}
 #enterpriseRelation .businessTitle img{
  text-indent: 20px;
  margin-right:5px;
}
  #enterpriseRelation .businessinfo-content .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 16px;
    color: black;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
}
 #enterpriseRelation .businessinfo-content .el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 16px;
}
 #enterpriseRelation .businessinfo-content .el-form-item {
    margin-bottom: 0px;
}
</style>