<template>
    <div id='riskColumn'>
        <el-row style="margin:60px 10%">
            <el-col class="ptr" style="height:200px;box-sizing:content-box;min-width:930px;">
                <el-row >
                    <el-col style="min-width:320px;height:200px" :span="8">
                        <img class="pimg" :src="mainData.imageURL" :alt="mainData.projectName" />
                    </el-col>
                    <el-col style="min-width:300px;height:200px" :span="8">
                        <el-row class="ptitle">
                            <el-col :span="24">
                                {{mainData.projectName||''}}
                            </el-col>
                        </el-row>
                        <el-row class="pinfo">
                            <el-col :span="12">&emsp;<span class="iconfont icon-dingwei" aria-hidden="true"></span>&nbsp;{{mainData.regionCode|address}}</el-col>
                            <el-col :span="12" ><span class="iconfont icon-biaoqian" aria-hidden="true"></span>&nbsp;{{mainData.industry|industry}}</el-col>
                        </el-row>
                        <el-row class="psimg">
                            <el-col :span="8"><img class="personImg" :src="mainData.initiatorImg" v-if="mainData.initiatorImg" alt="项目人"></el-col>
                            <!--项目人-->
                            <el-col :span="8"><img class="personImg" :src="mainData.expertImg" v-if="mainData.expertImg" alt="行家"></el-col>
                            <!--行家-->
                            <el-col :span="8"><img class="personImg" :src="mainData.leadInvestorImg" v-if="mainData.leadInvestorImg" alt="领投"></el-col>
                            <!--领投-->
                        </el-row>
                    </el-col>
                    <el-col style="min-width:250px;height:200px" :span="5" :offset="1">
                        <el-row>
                            <template v-for="rv in mainData.riskRegion">
                                <div class="ppoint" >
                                    <span class="pstate" :style="{'background-color':lvColor[rv.lv]}"></span> {{rv.name}}
                                </div>
                            </template>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import riskRegion from '../../../constant/riskRegion.js';

export default {
    name: 'riskColumn',
    data () {
        return {
            mainData:{},
            riskRegion:riskRegion,
            lvColor:{
                    4:'#08cc06',
                    3:'rgb(255, 135, 97)',
                    2:'rgb(251, 201, 55)',
                    1:'rgb(6, 204, 182)'
                }
        }
    },
    mounted() {
        this.formatData();
    },
    computed: {
        result:function(){
            return this.$store.state.risk.projectInfo;
        },
        riskIndexInfo:function(){
            return this.$store.state.risk.riskIndex;
        }
    },
    methods: {
        formatData() {
            if(!this.result.projectName){
                this.mainData = JSON.parse(sessionStorage.getItem('risk_projectInfo'));
            }else{
                this.mainData = this.result;
            }
            let riskRegion = JSON.parse(JSON.stringify(this.riskRegion));
            for (let i = 0; this.mainData.riskProjectList && i < this.mainData.riskProjectList.length; i++) {
                let risk = this.mainData.riskProjectList[i];
                for (let n = 0; n < riskRegion.length; n++) {
                    if (riskRegion[n].id === risk.riskCategory) {
                        riskRegion[n].lv = risk.level;
                        break;
                    }
                }
            }
            this.mainData.riskRegion = riskRegion;
        }
    }
}
</script>

<style >
#riskColumn  .pstate {
        border-radius: 50%;
        width: 13px;
        height: 13px;
        float: right;
        margin: 3px 5px auto 5px;
    }

  #riskColumn  .ppoint {
        float: left;
        margin: 15px 10px 5px 5px;
        width: 100px;
        font-size: 18px;
        letter-spacing: 1px;
        color: rgb(163, 171, 190);
        font-weight: 600;
    }

   #riskColumn .personImg{
        float: left;
        width: 70px;
        margin: 0px 10px;
        height: 70px;
        border-radius: 35px;
    }
   #riskColumn .pinfo {
        font-size: 1em;
        color: #cbcbcb;
        width: 100%;
        float: left;
        padding-top:10px;
        height: 60px;
    }
   #riskColumn .psimg{
        width:100%;
        padding-top:15px;
        float:left;
    } 


  #riskColumn  .info-text {
        text-indent: 20px;
        letter-spacing: 2px;
    }

  #riskColumn  .ptitle {
        font-size: 18px;
        font-weight: bold;
        margin-top: 12px;
        color: #3f3f3f;
    }

   #riskColumn .pimg {
        margin: 5px 5px 5px 5px;
        width: 95%;
        height: 190px;
    }

   #riskColumn .ptr {
        margin-top: 10px;
        border: 1px solid #eeeeee;
        background-color: #fefefe;
    }
</style>