<template>
    <div id='riskIndexDetail'>
        <div class="back-button"><el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button></div>
        <el-row>
            <risk-column v-if="projectInfo.projectId&&projectInfo.projectId.length>0"></risk-column>
        </el-row>
        <el-row style="margin-top:50px;min-width:900px" :style="{'marginTop':projectInfo.projectId?0:'100px'}">
                    <div style="width:80%;min-width:650px;margin:auto auto;">
                        <h2 style="text-align:center;color:#bcc8ce;">风险指标</h2>
                        <el-form class="addForm" ref="form"  label-width="120px">
                            <el-form-item label="指标名"  prop="name">
                                {{indexInfo.name}}
                            </el-form-item>
                            <el-form-item label="风险域"  prop="region">
                                {{indexInfo.category|riskRegion}}
                            </el-form-item>
                            <el-form-item label="风险等级" >
                                {{lvData[indexInfo.level]}}
                            </el-form-item>
                            <el-form-item v-if="indexInfo.code&&indexInfo.code.length>0" label="指标标识码"  prop="code">
                                {{indexInfo.code}}
                            </el-form-item>
                            <el-form-item label="风险规则" >
                                <el-table  :data="totalRulesData"  >
                                    <el-table-column prop="factorName" label="因子" align="center"> </el-table-column>
                                    <el-table-column prop="relationName" label="关系" align="center" > </el-table-column> 
                                    <el-table-column prop="value" label="取值"   align="center"> </el-table-column>
                                    <el-table-column prop="unit" label="单位" align="center"> </el-table-column>
                                </el-table>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" style="float:right;" @click="del">删除</el-button>
                                <el-button type="primary" style="float:right;margin-right:20px" @click="edit">编辑</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
        </el-row>
    </div>
</template>

<script>
    import riskRegion from '../../../constant/riskRegion.js';
    import riskColumn from '../riskInfo/riskColumn.vue';
    
    export default {
        name: 'riskIndexDetail', 
        components: {
            riskColumn
        },
        beforeMount () {
            this.$store.dispatch('risk_selectRiskInfo',{id:this.$route.params.id}).then(()=>{
                for (let i = 0; this.indexInfo.riskRuleGroup&&i < this.indexInfo.riskRuleGroup.length; i++) {
                    let item = this.indexInfo.riskRuleGroup[i];
                    for (let m = 0; m < item.riskRuleInfo.length; m++) {
                        let temp = item.riskRuleInfo[m];
                        this.totalRulesData.push(temp);
                        if(m==item.riskRuleInfo.length-1){
                            this.totalRulesData.push({flag:true});
                        }
                    }
                }
            })
        },
        computed: {
            indexInfo:function(){
                return this.$store.state.risk.riskIndexInfo||{};
            },
            projectInfo:function(){
                return this.$store.state.risk.projectInfo || {};
            }
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
            del(){
                this.$store.dispatch('risk_deleteRiskInfo',{param:{id:this.$route.params.id},vue:this})
                this.$router.go(-1);
            },
            edit(){
                this.$router.push('/editRiskIndex/'+this.$route.params.id);
            }
        },
        data () {
            return {
                lvData:{3:'高',2:'中',1:'低'},
                totalRulesData:[]
            }
        }
    }
</script>

<style scoped>
#riskIndexDetail .addForm{
    margin:40px auto 0 auto;
    width:80%;
    min-width: 702.648px;
}
</style>