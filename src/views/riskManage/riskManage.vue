<template>
    <div id="riskManage">
        <el-row>
            <el-col :span="21" :offset="3" class="search">
                    <el-col :span="4" :offset="1">
                        <el-input placeholder="项目编号|项目名称|发起人" icon="search" @keyup.enter.native="search" v-model="keyword" :on-icon-click="search"></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-select v-model="type" clearable placeholder="所属行业" @change="changeindustry">
                            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4" >
                        <el-select v-model="risklv" clearable placeholder="风险等级" @change="changelv">
                            <el-option v-for="item in risklvs" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4" >
                        <el-cascader :options="options" clearable v-model="where" @change="changeWhere"  change-on-select placeholder="所在地"></el-cascader>
                    </el-col>
            </el-col>
            <el-col :span="21" :offset="3">
                <el-row class="ptable">
                    <template v-for="item in listData.list">
                        <el-col class="ptr" style="min-width:970px;max-width:100%" :span="18">
                            <el-row style="height:200px;box-sizing:content-box;">
                                <el-col style="min-width:320px;height:200px" :span="8">
                                    <img class="pimg" :src="item.imageURL" :alt="item.projectName" />
                                </el-col>
                                <el-col style="min-width:300px;height:200px" :span="8">
                                    <el-row class="ptitle">
                                        <el-col :span="24">
                                            {{item.projectName}}
                                        </el-col>
                                    </el-row>
                                    <el-row class="pinfo">
                                        <el-col :span="12" >
                                            <span class="iconfont icon-dingwei" aria-hidden="true"></span>&nbsp;{{item.regionCode|address}}
                                        </el-col>
                                        <el-col :span="12" >
                                            <span  class="iconfont icon-biaoqian" aria-hidden="true"></span>&nbsp;{{item.industry|industry}}
                                        </el-col>
                                    </el-row>
                                    <el-row  class="psimg">
                                        <el-col :span="8"><img class="personImg" :src="item.initiatorImg" v-if="item.initiatorImg" alt="项目人"></el-col><!--项目人-->
                                        <el-col :span="8"><img class="personImg" :src="item.expertImg" v-if="item.expertImg" alt="行家"></el-col><!--行家-->
                                        <el-col :span="8"><img class="personImg" :src="item.leadInvestorImg" v-if="item.leadInvestorImg" alt="领投"></el-col><!--领投-->
                                    </el-row>
                                </el-col>
                                <el-col style="min-width:250px;height:200px" :span="5" :offset="1">
                                    <el-row style="margin-top:5px;width:230px">
                                        <template v-for="rv in item.riskRegion">
                                            <div class="ppoint" >
                                                <span class="pstate" @click="handleRisk(item,rv)" :style="{'background-color':lvColor[rv.lv]}"></span> {{rv.name}}
                                            </div>
                                        </template>
                                    </el-row>
                                    <div>
                                        <button class="paction-button" @click="handle(item,'/riskHistory/'+item.projectId)">预警历史</button>
                                        <button class="paction-button" @click="handle(item,'/riskIndex/'+item.projectId)">预警指标</button>
                                        <button class="paction-button" @click="handle(item,'/riskSetting/'+item.projectId)">风险设置</button>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </template>
                </el-row>
                <el-row>
                    <pagination class="ppage" :total="listData.totalCount"  @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></pagination>
                </el-row>
                <el-dialog size="small" title="选择查看的资金流" :visible.sync="riskfun">
                    <el-row>
                        <el-col>
                            <el-button class="paction-button1" @click="handleFunFlow(1)">银行账户资金流</el-button>
                            <el-button class="paction-button1" @click="handleFunFlow(2)">哆啦宝资金流</el-button>
                        </el-col>
                    </el-row>
                </el-dialog>
            </el-col>
        </el-row>
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
                    4:'#08cc06',
                    3:'rgb(255, 135, 97)',
                    2:'rgb(251, 201, 55)',
                    1:'rgb(6, 204, 182)'
                },
                chooseItem:{}
            }
        },
        methods: {
            handleFunFlow(index){
                if(index==1){
                    this.$router.push('/riskFunFlow/'+this.chooseItem.projectId);
                }else{
                    this.$router.push('/riskFunFlowDLB/'+this.chooseItem.projectId);
                }
            },
            handleRisk(item,rv){
                if(rv.id==1){
                    this.riskfun=true;
                    this.chooseItem=item;
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
                                if(riskRegion[n].id===risk.riskCategory){
                                    riskRegion[n].lv=risk.level;
                                    break;
                                }
                            }     
                        }
                        item.riskRegion=riskRegion;
                }
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

<style scoped>
    .ppage {
        margin-top: 20px;
    }

    .paction-button {
        width: 75px;
        padding: 5px 5px;
        background: rgb(6, 204, 182);
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

    
    .paction-button1{
        font-weight: 700;
         color: rgb(163, 171, 190);
    }

    .pstate {
        border-radius: 50%;
        width: 13px;
        height: 13px;
        float: right;
        margin: 3px 5px auto 5px;
        cursor: pointer;
    }

    .ppoint {
        float: left;
        margin: 7px 10px 5px 5px;
        width: 100px;
        font-size: 18px;
        letter-spacing: 1px;
        color: rgb(163, 171, 190);
        font-weight: 600;
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
        margin-top: 10px;
        border: 1px solid #eeeeee;
        background-color: #fefefe;
        
    }

    .ptable {
        margin-top: 20px;
    }

  
    .search {
        margin-top: 40px
    }
</style>