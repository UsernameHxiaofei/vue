<template>
    <div id='riskSetting'>
        <div class="back-button"><el-button type="text" icon="arrow-left"  @click="back">返回上一级</el-button></div>
        <el-row>
            <risk-column v-if="isProject"></risk-column>
        </el-row>
        <el-row>
            <el-col :span="21" :offset="3">
                <el-row>
                    <el-col :span="19" style="margin-top:50px;min-width:900px" v-if="!isProject" >
                        <h2 style="text-align:center;color:#bcc8ce;min-width:702.648px;margin:50px auto">全局风险指标</h2>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" :offset="1" class="risk_region" v-for="(item,index) in riskRegion" :key="item.id" :style="{'height':(65+46*maxNum)+'px'}" >
                        {{item.name}}
                        <div class="riskindex-div" v-for="riskIndex in item.riskIndexs" :key="riskIndex.id">
                            <el-button class="riskindex-button" @click="handleIndex(riskIndex.id)">{{riskIndex.name}}</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:40px">
                    <el-button style="margin-left:34.5%;width:10%;" @click="addIndex" size="large" type="primary">新增指标</el-button>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import riskColumn from '../riskInfo/riskColumn.vue';
import riskRegion from '../../../constant/riskRegion.js';
export default {
    name: 'riskSetting',
    data () {
        return {
            riskRegion:[],
            maxNum:0
        }
    },
    computed: {
      riskSettingData:function(){
          return this.$store.state.risk.riskSettingData||[];
      },
      projectInfo:function(){
          return this.$store.state.risk.projectInfo;
      },
      isProject:function(){
          return !!this.$route.params.id;
      }
    },
    mounted () {
        this.fetchData();
    },
    components: {
        'risk-column':riskColumn
    },
    methods: {
      fetchData(){
            if(!!this.$route.params.id&&this.$route.params.id.length>0){
                this.$store.dispatch('risk_getOne',{projectId:this.$route.params.id})
            }
            this.$store.dispatch('risk_selectRiskCategory',{id:this.$route.params.id}).then(()=>{
                if(this.$route.params.id&&this.riskSettingData.length==0){
                    this.$store.dispatch('risk_addGlobRiskForProject',{id:this.$route.params.id}).then(()=>{
                        this.formatData();
                    })
                }else{
                    this.formatData();
                }
            })
      },
      formatData(){
            let listData=JSON.parse(JSON.stringify(riskRegion));
            for (let addIndex = 0; addIndex < listData.length; addIndex++) {
                    let item = listData[addIndex];
                    for (let i = 0; i < this.riskSettingData.length; i++) {
                        let element = this.riskSettingData[i];
                        if(item.id==element.category){
                            item.riskIndexs=element.riskList;
                            if(element.riskList.length>this.maxNum){
                                this.maxNum=element.riskList.length
                            }
                        }
                    }
                }
            this.riskRegion=listData;
      },
      handleIndex(indexId){
          this.$router.push('/riskIndexDetail/'+indexId);
      },
      back(){
          this.$router.go(-1);
      },
      addIndex(){
          if(this.$route.params.id){
             this.$router.push('/addRiskIndex/'+this.$route.params.id);
          }else{
             this.$router.push('/addRiskIndex');
          }
      }
    }
}
</script>

<style scoped>
.risk_region{
    padding:20px;
    margin: 20px 30px 0 0;
    font-size:18px;
    font-weight: bold;
    text-align: center;
    background: #eceff1;
}
.riskindex-div{
    padding: 5px 0 5px 0;
}
.riskindex-div{
    padding: 5px 0 5px 0;
}
.riskindex-div .riskindex-button{
    min-width: 140px;
}
</style>