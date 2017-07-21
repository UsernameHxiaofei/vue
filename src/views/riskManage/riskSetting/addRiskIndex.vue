<template>
    <div id='addRiskIndex'>
        <div class="back-button"><el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button></div>
        <el-row >
              <risk-column v-if="projectInfo.projectId"></risk-column>
        </el-row>
        <el-row>
            <el-col :span="21" :offset="3" :style="{'marginTop':projectInfo.projectId?0:'100px'}">
                <el-row>
                    <el-col :span="20">
                        <h2 style="text-align:center;color:#bcc8ce;min-width:702.648px">风险指标设置</h2>
                        <el-form class="addForm" ref="form" :model="form" :rules="formrules"  label-width="290px">
                            <el-form-item label="指标名"  prop="name">
                                <el-input v-model="form.name" placeholder="请输入指标名" :maxlength="15"></el-input>
                            </el-form-item>
                            <el-form-item label="风险域"  prop="region">
                                <el-select v-model="form.region" class="full">
                                    <el-option v-for="(item,index) in riskRegion" :key="item.id" :value="item.id" :label="item.name" >{{item.name}}</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="风险等级"  prop="lv">
                                 <el-select v-model="form.lv" class="full">
                                    <el-option  :value="2" label="中" >中</el-option>
                                    <el-option  :value="3" label="高" >高</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="风险规则" >
                                <el-table  :data="totalRulesData"  >
                                    <el-table-column prop="cause.name" label="因子" width="160" align="center"> </el-table-column>
                                    <el-table-column prop="relation.name" label="关系" align="center" > </el-table-column> 
                                    <el-table-column prop="value" label="取值"   align="center"> </el-table-column>
                                    <el-table-column prop="unit" label="单位" align="center"> </el-table-column>
                                    <el-table-column prop=""  align="center" width="140">
                                        <template scope="scope">
                                            <el-button v-show="!scope.row.flag" size="small" @click="edit(scope.row)">编辑</el-button>
                                            <el-button v-show="!scope.row.flag" size="small" @click="del(scope.row)">删除</el-button>
                                            <el-button v-show="scope.row.flag" size="small" @click="delGroup(scope.row)">删除组</el-button>
						                </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="createRule" style="float:right">添加风险规则</el-button>
                                <el-button @click="createGroup" style="float:right;margin-right:20px">添加组</el-button>
                            </el-form-item>
                            <el-form-item label="因子" prop="cause">
                                <el-select v-model="form.cause" class="full" @change="factorChange">
                                    <el-option v-for="(item,index) in factors" :key="item.id" :value="item" :label="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="关系" prop="relation">
                                <el-select v-model="form.relation" class="full">
                                    <el-option v-for="(item,index) in relations" :key="item.id" :value="item" :label="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="取值" prop="value">
                                <el-input v-model="form.value" placeholder="请输入数值"></el-input>
                            </el-form-item>
                            <el-form-item label="单位" prop="unit">
                                {{form.unit}}
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" style="float:right" @click="submit">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog title="编辑规则" :visible.sync="editflag" size="tiny" >
                <el-form :model="editform" :rules="editformrules" label-width="50px" style="width:80%;margin-left:10%">
                    <el-form-item label="因子" prop="cause">
                        <el-select v-model="editform.cause" class="full" @change="editfactorChange">
                            <el-option v-for="(item,index) in factors" :key="item.id" :value="item" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关系" prop="relation">
                        <el-select v-model="editform.relation" class="full">
                            <el-option v-for="(item,index) in editform.relations" :key="item.id" :value="item" :label="item.name"></el-option>
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
            console.log(this.$route.params.id)
            if(!!this.$route.params.id&&this.$route.params.id.length>0){
                this.$store.dispatch('risk_getOne',{projectId:this.$route.params.id})
            }
            this.$store.dispatch('risk_getFactors').then(()=>{
                if(!this.factors[0]){
                    this.$message.info('因子信息错误，请联系管理员')
                    return false;
                }
                this.form.cause=this.factors[0];
                this.form.unit=this.form.cause.unit;
                this.form.relation=this.form.cause.riskRelationInfo[0];
            })
        },
        data() {
            return {
                editflag:false,
                groupIndex:1,
                riskRegion:riskRegion,
                relations:[],
                form: {
                    name: '',
                    region: 1,
                    lv: 3,
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
                formrules:{
                    name:[
                        { required:true,message:'请输入指标名',trigger:'change'}
                    ],
                    value:[
                        { required:true,message:'请输入数值',trigger:'change'}
                    ]
                },
                editformrules:{
                    value:[
                        { required:true,message:'请输入数值',trigger:'change'}
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
                this.form.unit=this.form.cause.unit;
                this.relations=this.form.cause.riskRelationInfo;
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
                                category:this.form.region
                            },
                            riskRuleGroup:riskRuleGroups,
                            projectId:this.$route.params.id
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
            createRule() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let rule={
                            cause:this.form.cause,
                            causeName:this.form.cause.name,
                            relation:this.form.relation,
                            relationName:this.form.relation.name,
                            value:this.form.value,
                            unit:this.form.unit,
                            index:new Date().getTime(),
                            groupIndex:this.groupIndex
                        }
                        this.totalRulesData.push(rule);
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
    margin-top:40px;
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