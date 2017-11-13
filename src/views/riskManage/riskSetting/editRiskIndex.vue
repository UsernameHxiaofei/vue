<template>
    <div id='editRiskIndex'>
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button>
        </div>
        <el-row>
            <risk-column v-if="projectInfo.projectId&&projectInfo.projectId.length>0"></risk-column>
        </el-row>
        <el-row :style="{'marginTop':projectInfo.projectId?0:'100px'}">
            <div style="width:70%;min-width:650px;margin:auto auto;">
                        <h2 style="text-align:center;color:#bcc8ce;min-width:702.648px">风险指标设置</h2>
                        <el-form class="addForm" ref="form" :model="form" :rules="formrules" label-width="120px">
                            <el-form-item label="指标名" prop="name">
                                <el-input v-model="form.name" placeholder="请输入指标名"></el-input>
                            </el-form-item>
                            <el-form-item label="风险域" prop="region">
                                <el-select v-model="form.region" class="full" @change="regionChange">
                                    <el-option v-for="(item,index) in riskRegion" :key="item.id" :value="item.id" :label="item.name">{{item.name}}</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="风险等级" prop="lv">
                                <el-select v-model="form.lv" class="full">
                                    <el-option  :value="2" label="中" >中</el-option>
                                    <el-option  :value="3" label="高" >高</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="form.code&&form.code.length>0" label="指标标识码"  prop="code">
                                <el-input v-model="form.code" :disabled="true"  placeholder="特殊指标标识码"></el-input>
                            </el-form-item>
                            <el-form-item label="风险规则">
                                <el-table :data="totalRulesData">
                                    <el-table-column prop="factorName" label="因子" align="center"> </el-table-column>
                                    <el-table-column prop="relationName" label="关系" align="center"> </el-table-column>
                                    <el-table-column prop="value" label="取值" align="center"> </el-table-column>
                                    <el-table-column prop="unit" label="单位" align="center"> </el-table-column>
                                    <el-table-column prop="" width="180" align="center" >
                                        <template slot-scope="scope">
                                            <el-button v-show="!scope.row.flag" size="small" @click="edit(scope.row)">编辑</el-button>
                                            <el-button v-show="!scope.row.flag" size="small"  @click="del(scope.row)">删除</el-button>
                                            <el-button v-show="scope.row.flag" size="small"  @click="createRule(scope.row)">添加组内规则</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="default" style="float:right" @click="createGroup">添加规则组</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" style="float:right" @click="submit">保存</el-button>
                            </el-form-item>
                        </el-form>
                </div>
        </el-row>
        <el-dialog :title="formName" :visible.sync="editflag" size="tiny" :close-on-click-modal="false">
            <el-form :model="editform" :rules="editformrules" ref="editform" label-width="80px" style="width:80%;margin-left:10%">
                <el-form-item label="因子" prop="factor">
                    <el-select v-model="editform.factor" value-key="id" class="full" @change="editfactorChange">
                        <el-option v-for="(item,index) in factors"  :key="item.id" :value="item" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关系" prop="relation">
                    <el-select v-model="editform.relation" value-key="id" class="full" >
                        <el-option v-for="(item,index) in editform.relations"  :key="item.id" :value="item" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="取值" prop="value">
                    <el-input  v-model="editform.value" placeholder="请输入数值"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    {{editform.unit}}
                </el-form-item>
                <el-form-item>
                    <el-button style="float:right;" type="primary" @click="editDone">确 定</el-button>
                    <el-button style="float:right;margin-right:20px" @click="editflag = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import riskColumn from '../riskInfo/riskColumn.vue';
    import riskRegion from '../../../constant/riskRegion.js';
    import riskLv from '../../../constant/riskLevel.js'
    export default {
        name: 'addRiskIndex',
        components: {
            'risk-column': riskColumn
        },
        beforeMount() {
            this.fetchData();
        },
        computed: {
            factors: function () {
                return this.$store.state.risk.riskFactors || {};
            },
            indexInfo: function () {
                return this.$store.state.risk.riskIndexInfo || {};
            },
            projectInfo:function(){
                return this.$store.state.risk.projectInfo || {};
            }
        },
        data() {
            return {
                editflag: false,
                riskRegion: riskRegion,
                form: {
                    name: '',
                    region: 1,
                    lv: 3
                },
                riskLvs:riskLv,
                editItem: {},
                editform: {
                    factor: {},
                    relation: {},
                    value: '',
                    unit: '',
                    relations: []
                },
                formrules: {
                    name: [
                        { required: true, message: '请输入指标名', trigger: 'blur' }
                    ]
                },
                editformrules: {
                    value:  [
                        {validator:(rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('数值不能为空'));
                            } else if (!/^[+-]?\d+(.\d+)?$/.test(value)) {
                                callback(new Error('请输入数字'));
                            } else {
                                callback();
                            }
                        },trigger:'change'} 
                    ]
                    
                },
                formName: '编辑规则',
                totalRulesData: []
            }
        },
        methods: {
            submit(){
                let param={
                    id:this.$route.params.id,
                    name:this.form.name,
                    category:this.form.region,
                    level:this.form.lv,
                    code:this.form.code
                };
                this.$store.dispatch('risk_updateRiskInfo',{param,vue:this});
            },
            back() {
                this.$router.go(-1);
            },
            fetchData() {
                this.$store.dispatch('risk_getFactors',{factorId:'',category:1}).then(() => {
                    if (!this.factors[0]) {
                        this.$message.info('因子信息错误，请联系管理员')
                        return false;
                    }
                });
                this.$store.dispatch('risk_selectRiskInfo', { id: this.$route.params.id }).then(() => {
                    this.form.name = this.indexInfo.name;
                    this.form.region = this.indexInfo.category;
                    this.form.lv = this.indexInfo.level;
                    this.form.code= this.indexInfo.code;
                    let rulesData = [];
                    for (let i = 0; this.indexInfo.riskRuleGroup && i < this.indexInfo.riskRuleGroup.length; i++) {
                        let item = this.indexInfo.riskRuleGroup[i];
                        for (let m = 0; m < item.riskRuleInfo.length; m++) {
                            let temp = item.riskRuleInfo[m];
                            rulesData.push(temp);
                            if (m == item.riskRuleInfo.length - 1) {
                                rulesData.push({ flag: true, ruleGroupId: temp.ruleGroupId });
                            }
                        }
                    }
                    this.totalRulesData = rulesData;
                })
            },
            regionChange(value){
                this.$store.dispatch('risk_getFactors',{factorId:'',category:value}).then(() => {
                    if (!this.factors[0]) {
                        this.$message.info('因子信息错误，请联系管理员')
                        return false;
                    }
                    this.editform.factor = this.factors[0];
                    this.editform.relations =  this.factors[0].riskRelationInfo;
                    this.editform.unit =  this.factors[0].unit;
                });
            },
            edit(item) {
                this.formName = '编辑规则';
                this.editflag = true;
                this.editItem = item;
                this.editform.value = item.value;
                for (let i = 0; i < this.factors.length; i++) {
                    let temp = this.factors[i];
                    if (item.factorId == temp.id) {
                        this.editform.factor = temp;
                        this.editform.relations = temp.riskRelationInfo;
                        this.editform.unit = temp.unit;
                        for (let m = 0; m < temp.riskRelationInfo.length; m++) {
                            let tempRelation = temp.riskRelationInfo[m];
                            if (tempRelation.id === item.relationId) {
                                this.editform.relation = tempRelation;
                            }
                        }
                        break;
                    }
                }
            },
            createGroup() {
                this.formName = '创建规则组';
                this.$refs.editform && this.$refs.editform.resetFields();
                this.editflag = true;

            },
            createRule(item) {
                this.formName = '创建规则';
                this.editflag = true;
                this.editItem = item;
                this.$refs.editform && this.$refs.editform.resetFields()
            },
            editDone() {
                if (this.editItem.flag) {
                    this.addRule();
                } else if (JSON.stringify(this.editItem) == '{}') {
                    this.addGroup();
                } else {
                    this.editRule();
                }
            },
            editRule() {
                this.$refs['editform'].validate((valid) => {
                    if (valid) {
                        let param = {
                            id: this.editItem.id,
                            factorId: this.editform.factor.id,
                            value: this.editform.value,
                            ruleGroupId: this.editItem.ruleGroupId,
                            relationId: this.editform.relation.id
                        };
                        this.$store.dispatch('risk_updateRiskRuleInfo', { param: param, vue: this }).then(() => {
                            this.fetchData();
                            this.editItem = {};
                            this.editflag = false;
                            this.$refs['editform'].resetFields();
                        })
                    } else {
                        return false;
                    }
                })
            },
            addGroup() {
                this.$refs['editform'].validate((valid) => {
                    if (valid) {
                        let param = {
                            riskId: this.$route.params.id,
                            riskRuleGroupList: [{riskRuleInfo:[{
                                factorId: this.editform.factor.id,
                                value: this.editform.value,
                                relationId: this.editform.relation.id
                            }]}]
                        }
                        this.$store.dispatch('risk_addRiskRuleGroup', { param, vue: this }).then(() => {
                            this.fetchData();
                            this.editItem = {};
                            this.editflag = false;
                            this.$refs['editform'].resetFields();
                        })
                    } else {
                        return false;
                    }
                })
            },
            addRule() {
                this.$refs['editform'].validate((valid) => {
                    if (valid) {
                        let param = {
                            groupId: this.editItem.ruleGroupId,
                            riskRuleInfoList: [
                                {
                                    factorId: this.editform.factor.id,
                                    value: this.editform.value,
                                    ruleGroupId: this.editItem.ruleGroupId,
                                    relationId: this.editform.relation.id
                                }
                            ]
                        };
                        this.$store.dispatch('risk_addRiskRuleInfo', { param: param, vue: this }).then(() => {
                            this.fetchData();
                            this.editItem = {};
                            this.editflag = false;
                            this.$refs['editform'].resetFields();
                        })
                    } else {
                        return false;
                    }
                })
            },
            del(item) {
                this.$confirm('确定删除该规则？', '确认删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('risk_deleteRiskRuleInfo', { param: { id: item.id }, vue: this }).then(() => {
                        this.fetchData();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            
            editfactorChange() {
                this.editform.unit = this.editform.factor.unit;
                this.editform.relations = this.editform.factor.riskRelationInfo;
            }
        }
    }

</script>

<style>
    #editRiskIndex .addForm {
        margin: 40px auto 0 auto;
        width: 80%;
        min-width: 702.648px;
    }

    #editRiskIndex .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: rgb(72, 105, 106);
        line-height: 1;
        padding: 11px 12px 11px 0;
        box-sizing: border-box;
    }

    #editRiskIndex .full {
        width: 100%
    }
</style>