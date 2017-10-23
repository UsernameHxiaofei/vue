<template>
    <div id='addRiskIndex'>
        <div class="back-button"><el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button></div>
        <el-row >
              <risk-column v-if="projectInfo.projectId"></risk-column>
        </el-row>
        <el-row :style="{'marginTop':projectInfo.projectId?0:'100px'}">
            <div style="width:70%;min-width:650px;margin:auto auto;">
                        <h2 style="text-align:center;color:#bcc8ce;min-width:702.648px">风险指标设置</h2>
                        <el-form class="addForm" ref="form" :model="form" :rules="formrules"  label-width="120px">
                            <el-form-item label="指标名"  prop="name">
                                <el-input v-model="form.name" placeholder="请输入指标名" :maxlength="15"></el-input>
                            </el-form-item>
                            <el-form-item label="风险域"  prop="region">
                                <el-select v-model="form.region" class="full" @change="regionChange">
                                    <el-option v-for="(item,index) in riskRegion" :key="item.id" :value="item.id" :label="item.name" >{{item.name}}</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="风险等级"  prop="lv">
                                 <el-select v-model="form.lv" class="full">
                                    <el-option  :value="2" label="中" >中</el-option>
                                    <el-option  :value="3" label="高" >高</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="指标标识码"  prop="code">
                                <el-input v-model="form.code" placeholder="特殊功能指标标识码"></el-input>
                            </el-form-item>
                            <el-form-item label="风险规则" >
                                <el-table  :data="totalRulesData"  >
                                    <el-table-column prop="cause.name" label="因子" width="160" align="center"> </el-table-column>
                                    <el-table-column prop="relation.name" label="关系" align="center"  > </el-table-column> 
                                    <el-table-column prop="value" label="取值"   align="center"> </el-table-column>
                                    <el-table-column prop="unit" label="单位" align="center"> </el-table-column>
                                    <el-table-column prop=""  align="center" >
                                        <template scope="scope">
                                            <el-button v-show="!scope.row.flag" size="small" @click="edit(scope.row)">编辑</el-button>
                                            <el-button v-show="!scope.row.flag" size="small" @click="del(scope.row)">删除</el-button>
                                            <el-button v-show="scope.row.flag" size="small" @click="delGroup(scope.row)">删除组</el-button>
                                            <el-button v-show="scope.row.flag" size="small" @click="addGroupRule(scope.row)">添加组内规则</el-button>
						                </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="createRule" style="float:right">添加风险规则</el-button>
                                <el-button @click="createGroup" style="float:right;margin-right:20px">添加组</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" style="float:right" @click="submit">保存</el-button>
                            </el-form-item>
                        </el-form>
                
            </div>
        </el-row>
        <el-dialog title="添加规则" :visible.sync="addflag" size="tiny" :close-on-click-modal="false" >
                <el-form :model="addform" ref="addform" :rules="addformrules" label-width="80px" style="width:80%;margin-left:10%">
                    <el-form-item label="因子" prop="cause">
                        <el-select v-model="addform.cause" class="full" value-key="id" @change="factorChange" >
                            <el-option v-for="(item,index) in factors"  :key="item.id"  :value="item" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关系" prop="relation">
                        <el-select v-model="addform.relation" class="full" value-key="id">
                            <el-option v-for="(item,index) in relations"  :key="item.id" :value="item" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="取值" prop="value">
                        <el-input v-model="addform.value" placeholder="请输入数值"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="unit">
                        {{addform.unit}}
                    </el-form-item>
                    <el-form-item>
                        <el-button style="float:right;" type="primary" @click="addRule">确 定</el-button>
                        <el-button style="float:right;margin-right:20px" @click="addflag = false">取 消</el-button>
                    </el-form-item>
                </el-form>
        </el-dialog>
        <el-dialog title="编辑规则" :visible.sync="editflag" size="tiny"  :close-on-click-modal="false">
                <el-form :model="editform" :rules="editformrules" label-width="80px" style="width:80%;margin-left:10%">
                    <el-form-item label="因子" prop="cause">
                        <el-select v-model="editform.cause" value-key="id" class="full" @change="editfactorChange">
                            <el-option v-for="(item,index) in factors"  :key="item.id" :value="item" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关系" prop="relation">
                        <el-select v-model="editform.relation" value-key="id" class="full">
                            <el-option v-for="(item,index) in editform.relations"  :key="item.id" :value="item" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="取值" prop="value">
                        <el-input v-model="editform.value" placeholder="请输入数值"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="unit">
                        {{editform.unit}}
                    </el-form-item>
                    <el-form-item>
                        <el-button style="float:right;" type="primary" @click="editflag = false">确 定</el-button>
                        <el-button style="float:right;margin-right:20px" @click="editflag = false">取 消</el-button>
                    </el-form-item>
                </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import riskColumn from '../riskInfo/riskColumn.vue';
    import _ from 'lodash';
    import riskRegion from '../../../constant/riskRegion.js';

    export default {
        name: 'addRiskIndex',
        components: {
            'risk-column': riskColumn
        },
        mounted() {
            if(!!this.$route.params.id&&this.$route.params.id.length>0){
                this.$store.dispatch('risk_getOne',{projectId:this.$route.params.id})
            }
            this.$store.dispatch('risk_getFactors',{factoryId:'',category:1}).then(()=>{
                if(!this.factors[0]){
                    this.$message.info('因子信息错误，请联系管理员')
                    return false;
                }
                this.addform.cause=this.factors[0];
                this.addform.unit=this.addform.cause.unit;
                this.factorChange();
                this.addform.relation=this.addform.cause.riskRelationInfo[0];
            })
        },
        data() {
            return {
                editflag:false,
                addflag:false,
                addGroupRuleFlag:false,
                groupIndex:1,
                riskRegion:riskRegion,
                relations:[],
                form: {
                    name: '',
                    region: 1,
                    lv: 3,
                    code:'',
                },
                addform:{
                    cause:{},
                    relation: {},
                    value: '',
                    unit: ''
                },
                editform:{
                    cause:{},
                    relation: {},
                    value: '',
                    unit:'',
                    relations:[]
                },
                addformrules:{
                    value:[
                        { required:true,message:'请输入单位数值',trigger:'blur'}
                    ]
                },
                formrules:{
                    name:[
                        { required:true,message:'请输入指标名',trigger:'blur'}
                    ]
                },
                editformrules:{
                    value:[
                        { required:true,message:'请输入单位数值',trigger:'blur'}
                    ]
                },
                totalRulesData:[]
            }
        },
        computed: {
            factors:function(){
                return this.$store.state.risk.riskFactors||{};
            },
            projectInfo:function(){
                return this.$store.state.risk.projectInfo||{};
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            del(item){
                let data=JSON.parse(JSON.stringify(this.totalRulesData));
                _.remove(data, function(n) {
                    return item.index==n.index;
                });
                this.totalRulesData=data;
            },
            delGroup(item){
                let data=JSON.parse(JSON.stringify(this.totalRulesData));
                _.remove(data, function(n) {
                    return item.groupIndex==n.groupIndex;
                });
                this.totalRulesData=data;
            },
            edit(item){
                this.editform=item;
                this.editform.relations=this.editform.cause.riskRelationInfo;
                this.editflag=true;
            },
            factorChange(){
                this.addform.unit=this.addform.cause.unit;
                this.relations=this.addform.cause.riskRelationInfo;
            },
            regionChange(value){
                this.$store.dispatch('risk_getFactors',{factoryId:'',category:value}).then(()=>{
                    if(!this.factors[0]){
                        this.$message.info('因子信息错误，请联系管理员')
                        return false;
                    }
                    this.addform.cause=this.factors[0];
                    this.addform.unit=this.factors[0].unit;
                    this.addform.relation=this.factors[0].riskRelationInfo[0];
                })
            },
            editfactorChange(){
                this.editform.unit=this.editform.cause.unit;
                this.editform.relations=this.editform.cause.riskRelationInfo;
            },
            submit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let riskRuleGroups=[];
                        let riskRules=[];
                        console.log(this.totalRulesData.length,this.totalRulesData);
                        for (let i = 0; i < this.totalRulesData.length; i++) {
                            let element = this.totalRulesData[i];
                            if(element.flag){
                                riskRuleGroups.push({riskRuleInfo:riskRules});
                                riskRules=[];
                            }else if(!element.flag&&i==(this.totalRulesData.length-1)){
                                riskRules.push({factorId:element.cause.id,relationId:element.relation.id,value:element.value})
                                riskRuleGroups.push({riskRuleInfo:riskRules});
                                riskRules=[];
                            }else{
                                riskRules.push({factorId:element.cause.id,relationId:element.relation.id,value:element.value})
                            }
                        }
                        let param = {
                            risk:{
                                name:this.form.name,
                                level:this.form.lv,
                                category:this.form.region,
                                projectId:this.$route.params.id||'',
                                code:this.form.code
                            },
                            riskRuleGroup:riskRuleGroups
                        }
                        this.$store.dispatch('risk_addRiskIndex',{param,vue:this})
                    } else {
                        return false;
                    }
                });
                
            },
            createGroup() {
                if(!this.totalRulesData[this.totalRulesData.length-1]||this.totalRulesData[this.totalRulesData.length-1].flag){
                    this.$message.warning('不能创建一个空规则组');
                    return;
                }
                let rule={
                    causeName:'',
                    relationName:'',
                    value:'',
                    unit:'',
                    index:new Date().getTime(),
                    flag:true,
                    groupIndex:this.groupIndex
                }
                this.totalRulesData.push(rule);
                this.groupIndex++;
            },
            addGroupRule(item){
                this.addGroupRuleFlag=item.groupIndex;
                this.addflag=true;
            },
            createRule() {               
                this.addflag=true;
            },
            addRule(){
                this.$refs['addform'].validate((valid) => {
                    if (valid) {
                        let rule={
                            cause:this.addform.cause,
                            causeName:this.addform.cause.name,
                            relation:this.addform.relation,
                            relationName:this.addform.relation.name,
                            value:this.addform.value,
                            unit:this.addform.unit,
                            index:new Date().getTime(),
                            groupIndex:this.addGroupRuleFlag?this.addGroupRuleFlag:this.groupIndex
                        }
                        if(this.addGroupRuleFlag){
                            let tempTotal=[],done=true; 
                            for (let i = 0; i < this.totalRulesData.length+1; i++) {
                                let item = this.totalRulesData[done?i:i-1];
                                if(done&&item.groupIndex==this.addGroupRuleFlag){
                                    tempTotal[i]=rule;
                                    done=false;
                                }else if(item.groupIndex<=this.addGroupRuleFlag){
                                    tempTotal[i]=item;
                                }else{
                                    tempTotal[i+1]=item;
                                }
                            }
                            this.totalRulesData=tempTotal;
                        }else{
                            this.totalRulesData.push(rule);
                        }
                        this.addGroupRuleFlag=false;
                        this.addflag=false;
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style >
#addRiskIndex .addForm{
    margin:40px auto 0 auto;
    width:80%;
    min-width: 702.648px;
}
#addRiskIndex .el-form-item__label{
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: rgb(72, 105, 106);
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
}
#addRiskIndex .full{
   width:100%
}
</style>