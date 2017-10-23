<style scoped>
        .conditional-search{
            min-width:900px;
            width:65%;
            margin:15px auto;

        }
        .regionC{
            width:110px;
            height:30px;
            float:left;
            background: #e0e0e0;
            vertical-align: middle;
            line-height: 30px;
            text-align: center;
            margin:10px 20px 10px 0px;
            cursor: pointer;
        }
        .region-button{
            width:110px;
            height:30px;
            float:left;
            margin:10px 40px 10px 0px;
        }
        .index-table{
            min-width:900px;
            width:65%;
            margin:15px auto;
        }
        .choosedInfo{
            color: #fff;
            background-color: #06ccb7;
            border-color: #06ccb7;
        }
       .btn-style{font-size: 12px;padding: 6px 15px;border-color: #06ccb6;color: #06ccb6;margin: 0 5px;}
        .btn-style:hover{background: #06ccb6;color: white;}
</style>
<template>
    <div id='riskSetting'>
        <div class="back-button"  v-if="isProject"><el-button type="text" icon="arrow-left"  @click="back">返回上一级</el-button></div>
        <el-row>
            <risk-column v-if="isProject"></risk-column>
        </el-row>
        <el-row >
            <div style="min-width:900px;width:65%;margin:50px auto 0 auto" v-if="!isProject" >
                <h2 style="text-align:left;;min-width:702.648px;margin:50px auto 0 auto">全局风险指标</h2>
                <hr style="border:1px solid #eceff1;background:#eceff1;">
            </div>
            <div class="conditional-search">   
                <div class="regionC" @click="choosed=0" :class="{'choosedInfo':choosed==0}">全风险域</div>
                <div class="regionC" @click="choosed=item.id" :class="{'choosedInfo':choosed==item.id}" v-for="(item,index) in riskRegion">{{item.name}}</div>
                <el-button class="region-button" @click="addIndex" size="small" type="success">新增指标</el-button>
            </div>
            <div class="my-table index-table">
                    <el-table :data="riskRulePage.list" stripe border style="width: 100%">
                        <el-table-column type="index"  width="50px">
                        </el-table-column>
                        <el-table-column prop="name" label="指标名" width="160px" >
                        </el-table-column>
                        <el-table-column prop="category" label="风险域">
                                <template scope="scope">
                                       {{scope.row.category|riskRegion}}
                                </template>
                        </el-table-column>
                        <el-table-column prop="level" label="等级" >
                                <template scope="scope">
                                        {{scope.row.level|riskLv}}
                                 </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="生效时间" >
                        </el-table-column>
                        <el-table-column prop="riskType" label="类型">
                                <template scope="scope">
                                        {{scope.row.riskType|riskType}}
                                 </template>
                        </el-table-column>
                        <el-table-column  label="操作" >
                            <template scope="scope">
                                <el-button class="btn-style" size="small" @click="handleIndex(scope.row.id)">查看</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" width="20px">
                        </el-table-column>
                    </el-table>
                    <el-pagination  class="ppage"
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :current-page="1" 
                    :page-sizes="[10, 20, 30, 40]" 
                    :page-size="10" 
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="riskRulePage.totalCount">
                    </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
import riskColumn from '../riskInfo/riskColumn.vue';
import riskRegion from '../../../constant/riskRegion.js';
import templateJson from './templeJson.js';

export default {
    name: 'riskSetting',
    data () {
        return {
            choosed:0,
            riskRegion:riskRegion,
            basicData:[],
            showData:[],
            param:{}
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
      },
      riskRulePage:function(){
          return this.$store.state.risk.pageRiskCategory||{};
      }
    },
    mounted () {
        this.fetchData();
    },
    watch:{
        '$route':function(){
            this.fetchData();
        },
        choosed:function(v){
            this.param.category=v||'';
            this.$store.dispatch('risk_selectPageRiskCategory',this.param)
        }
    },
    components: {
        'risk-column':riskColumn
    },
    methods: {
      handleSizeChange(pageSize){
        this.param.pageSize=pageSize;
        this.param.pageNo=1;
      },
      handleCurrentChange(pageNo){
        this.param.pageNo=pageNo;
        this.formatData();
      },
      fetchData(){
            if(!!this.$route.params.id&&this.$route.params.id.length>0){
                this.$store.dispatch('risk_getOne',{projectId:this.$route.params.id})
            }
            this.param={
                pageSize:10,
                pageNo:1,
                category:'',
                projectId:this.$route.params.id||'',
            }
            this.$store.dispatch('risk_selectPageRiskCategory',this.param).then(()=>{
                if(this.$route.params.id&&this.riskRulePage.list&&this.riskRulePage.list.length==0){
                    this.$store.dispatch('risk_addGlobRiskForProject',{id:this.$route.params.id}).then(()=>{
                        this.formatData();
                    })
                }else{
                    this.formatData();
                }
            })
      },
      formatData(){
         this.$store.dispatch('risk_selectPageRiskCategory',this.param)
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

