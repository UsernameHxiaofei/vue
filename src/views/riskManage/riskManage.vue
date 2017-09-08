<style scoped>
.ppage {text-align: center;}
.paction-button { width: 75px; padding: 5px 5px; background: rgb(6, 204, 182);
border: 1px solid rgb(6, 204, 182);;
outline: rgb(6, 204, 182);
color:white;
border-radius: 5px;
margin-left:5px;
}
.paction-button:hover {
            color:rgb(6, 204, 182);
            background: white;
            border: 1px solid rgb(6, 204, 182);
            border-radius: 5px;
        }
    
        
        .paction-button1 {  
            padding: 10px 10px; background: rgb(6, 204, 182);
            border: 1px solid rgb(6, 204, 182);;
            outline: rgb(6, 204, 182);
            color:rgb(6, 204, 182);
            background: white;
            border-radius: 5px;
            margin-left:5px;
            }
        .paction-button1:hover {
            color:white;
            background: rgb(6, 204, 182);
            border: 1px solid rgb(6, 204, 182);
            border-radius: 5px;
        }
    
        .pstate {
            border-radius: 50%;
            width: 13px;
            height: 13px;
            float: right;
            margin: 3px 5px auto 5px;
        }
    
        .ppoint {
            float: left;
            margin: 7px 10px 5px 5px;
            width: 100px;
            cursor: pointer;
            font-size: 18px;
            color: rgb(163, 171, 190);
            font-weight: 600;
        }
        .ppoint:hover {
            color: rgb(77, 88, 111);
        }
    
        .personImg{
            width: 70px;
            margin: 0px 10px;
            height: 70px;
            border-radius: 35px;
        }
        .pinfo {
            font-size: 1em;
            color: #cbcbcb;
            width: 100%;
            float: left;
            padding:5px 0 5px 0;
            height: 30px;
        }
        .psimg{
            width:100%;
            float:left;
            line-height: 108px;
            padding:auto 0 auto 0;
            height: 108px;
            vertical-align: middle;
        }
        .info-text {
            text-indent: 20px;
            letter-spacing: 2px;
        }
    
        .ptitle {
            font-size: 18px;
            font-weight: bold;
            margin-top: 12px;
            color: #3f3f3f;
            height:50px;
        }
    
        .pimg {
            margin: 5px 5px 5px 5px;
            width: 95%;
            height: 190px;
        }
    
        .ptr {
            border: 1px solid #eeeeee;
            background-color: #fefefe;
            margin: 10px  auto 10px auto;
        }
    
      
        .search {
            text-align: center;
            margin: 50px auto 30px auto;
        }
        .search-input{
            width:240px;
            margin:0 20px;
        }
</style>
<template>
    <div id="riskManage">
        <el-row>
            <div class="search">
                    <el-input class="search-input" placeholder="项目编号|项目名称|发起人" icon="search" @keyup.enter.native="search" v-model.trim="keyword" :on-icon-click="search"></el-input>
                    <el-select class="search-input" v-model="type" clearable placeholder="所属行业" @change="changeindustry">
                        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select><el-select class="search-input" v-model="risklv" clearable placeholder="风险等级" @change="changelv">
                        <el-option v-for="item in risklvs" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select><el-cascader class="search-input" :options="options" clearable v-model="where" @change="changeWhere" change-on-select placeholder="所在地"></el-cascader>
            </div>
        </el-row>
        <el-row class="ptable">
                <template v-for="item in listData.list">
                    <div class="ptr" style="width:875px;" >
                        <div style="height:200px;box-sizing:content-box;">
                            <div style="float:left;width:320px;height:200px">
                                <img class="pimg" :src="item.imageURL" :alt="item.projectName" />
                            </div>
                            <div style="float:left;width:300px;height:200px">
                                <el-row class="ptitle">
                                    <el-col :span="24" :title="item.projectName">
                                        {{item.projectName}}
                                    </el-col>
                                </el-row>
                                <el-row class="pinfo">
                                    <el-col :span="12">
                                        <span class="iconfont icon-dingwei" aria-hidden="true"></span>&nbsp;{{item.regionCode|address}}
                                    </el-col>
                                    <el-col :span="12">
                                        <span class="iconfont icon-biaoqian" aria-hidden="true"></span>&nbsp;{{item.industry|industry}}
                                    </el-col>
                                </el-row>
                                <el-row class="psimg">
                                    <img class="personImg" :src="item.initiatorImg" v-if="item.initiatorImg" alt="项目人">
                                    <!--项目人-->
                                    <img class="personImg" :src="item.expertImg" v-if="item.expertImg" alt="行家">
                                    <!--行家-->
                                    <img class="personImg" :src="item.leadInvestorImg" v-if="item.leadInvestorImg" alt="领投">
                                    <!--领投-->
                                </el-row>
                            </div>
                            <div style="float:left;width:250px;height:200px">
                                <div style="margin-top:5px;width:230px">
                                    <template v-for="rv in item.riskRegion">
                                        <div class="ppoint" @click="handleRisk(item,rv)" >
                                            <span class="pstate"  :style="{'background-color':lvColor[rv.lv]}"></span>{{rv.name}}
                                        </div>
                                    </template>
                                </div>
                                <div style="display: inline-block;">
                                    <button class="paction-button" @click="handle(item,'/riskHistory/'+item.projectId)">预警历史</button>
                                    <button class="paction-button" @click="handle(item,'/riskIndex/'+item.projectId)">预警指标</button>
                                    <button class="paction-button" @click="handle(item,'/riskSetting/'+item.projectId)">风险设置</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <el-pagination  class="ppage"
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="1" 
                :page-sizes="[10, 20, 30, 40]" 
                :page-size="10" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="listData.totalCount">
                </el-pagination>
        </el-row>
        <el-dialog size="tiny" title="选择查看的资金流" :visible.sync="riskfun">
            <el-row>
                <el-col>
                    <el-button class="paction-button1" @click="handleFunFlow(1)">银行账户资金流</el-button>
                    <el-button class="paction-button1" @click="handleFunFlow(2)">哆啦宝资金流</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '../../components/common/pagination.vue'
    import { regionData } from 'element-china-area-data'
    import riskRegions from '../../constant/riskRegion.js'
    import industryData from  '../../constant/industry.js'
    import riskLv from '../../constant/riskLevel.js'

    export default {
        name: 'riskManage',
        components: {
          pagination:pagination
        },
        mounted() {
            this.param={
                industry:null,
                regionCode:'',
                keyword:'',
                level:'',
                pageNo:1,
                pageSize:10
            }
            this.$store.dispatch('risk_getList',this.param).then(()=>{
                this.formatData();
            })
        },
        computed: {
          result:function(){
              return this.$store.state.risk.listData;
          },
          itemManageDetail: function () {
              return this.$store.state.item.itemManageDetail||{};
          }
        },
        data() {
            return {
                riskfun:false,
                listData:{},
                riskRegion:riskRegions,
                param:{},
                where: [],
                options: regionData,
                risklvs: riskLv,
                risklv: '',
                type: '',
                types: industryData,
                keyword: "",
                lvColor:{
                    4:'rgb(255, 135, 97)',
                    3:'rgb(251, 201, 55)',
                    2:'#f3c6d9',
                    1:'#08cc06'
                }
            }
        },
        methods: {
            handleFunFlow(index){
                if(index==1){
                    this.$router.push('/riskFunFlow/'+this.itemManageDetail.enterpriseId);
                }else{
                    this.$router.push('/riskFunFlowDLB/'+this.itemManageDetail.enterpriseId);
                }
            },
            handleRisk(item,rv){
                console.log(item,rv);
                if(rv.id==1||rv.id==2){
                    this.$store.dispatch('item_getManageDetail',  {id: item.projectId}).then(()=>{
                        this.$store.dispatch('enterprise_getInfo',{id:this.itemManageDetail.enterpriseId}).then(()=>{
                            if(rv.id==1){//资金风险
                                this.riskfun=true;
                            }
                            if(rv.id==2){//财务分析
                                this.$router.push('/enterpriseDetail/'+this.itemManageDetail.enterpriseId)
                            }
                        })
                    })
                }else if(rv.id==4||rv.id==3){
                    this.$router.push('/riskRegionContainer/'+rv.id+'/'+item.projectId);
                }else if(rv.id==7){
                    this.$store.dispatch('item_getManageDetail',  {id: item.projectId}).then(()=>{
                        this.$store.dispatch('enterprise_getInfo',{id:this.itemManageDetail.enterpriseId}).then(()=>{
                            this.$router.push('/riskRegionContainer/'+rv.id+'/'+item.projectId);
                        })
                    })
                }
            },
            formatData(){
                this.listData=this.result;
                for (let i = 0; this.listData.list&&i < this.listData.list.length; i++) {
                        let item = this.listData.list[i];
                        let riskRegion=JSON.parse(JSON.stringify(this.riskRegion));
                        for (let j = 0; item.riskProjectList&&j < item.riskProjectList.length; j++) {
                            let risk = item.riskProjectList[j];
                            for (let n = 0;riskRegion&&n < riskRegion.length;n++){
                                if(riskRegion[n].id===risk.category){
                                    riskRegion[n].lv=risk.level;
                                    break;
                                }
                            }     
                        }
                        item.riskRegion=riskRegion;
                }
                console.log(this.listData)
            },
            changeindustry(ind){
                this.param.industry=ind;
                this.$store.dispatch('risk_getList',this.param).then(()=>{
                    this.formatData();
                })
            },
            changelv(lv){
                this.param.level=lv;
                this.$store.dispatch('risk_getList',this.param).then(()=>{
                    this.formatData();
                })
            },
            changeWhere(where){
                if(where.length==1){
                    this.param.regionCode=where[0].slice(0,2);
                }else if(where.length==2){
                    this.param.regionCode=where[1].slice(0,4);
                }else if(where.length==3){
                    this.param.regionCode=where[2].slice(0,6);
                }else{
                    this.param.regionCode='';
                }
                this.$store.dispatch('risk_getList',this.param).then(()=>{
                    this.formatData();
                })
            },
            handleCurrentChange(page) {
                this.param.pageNo=page;
                this.$store.dispatch('risk_getList',this.param).then(()=>{
                    this.formatData();
                })
            },
            handleSizeChange(size){
                this.param.pageSize=size;
                this.param.pageNo=1;
                this.$store.dispatch('risk_getList',this.param).then(()=>{
                    this.formatData();
                })
            },
            search() {
                this.param.keyword=this.keyword;
                this.$store.dispatch('risk_getList',this.param).then(()=>{
                    this.formatData();
                })
            },
            handle(item,path) {
                sessionStorage.setItem('risk_projectInfo',JSON.stringify(item));
                this.$store.commit('risk_projectInfo',item);
                this.$router.push(path);
            }
        }
    }

</script>

