<style>
    .step1 {
        padding: 30px 50px;
        background: white;
        margin: 0 auto;
        min-width: 720px;
        width: 80%
    }

    .step1 .el-radio+.el-radio {
        margin-left: 0;
        margin-right: 15px;
    }

    .step1 .el-radio-group .el-radio {
        margin-right: 15px;
    }

    .circle {
        display: inline-block;
        margin-left: 15px;
    }

    .circle .el-form-item__content {
        margin-left: 0!important;
    }

    .model-divider {
        margin-bottom: 20px;
    }

    .model-divider img {
        vertical-align: middle;
    }

    .model-divider span {
        margin-left: 5px;
        color: #333333;
        font-size: 18px;
        font-weight: bold;
        vertical-align: middle;
    }

    .money .el-col {
        margin-right: 10px;
    }

    .money .el-upload__input {
        display: none !important;
    }

    .money .upload-img {
        margin-top: 20px;
    }

    .choose-area {
        overflow: hidden;
    }

    .choose-area .el-form-item {
        float: left;
    }

    .tips {
        color: rgb(131, 163, 165);
        font-size: 12px;
        line-height: 37px;
        margin-left: 10px;
    }

    .footer-button {
        margin-top: 20px;
        background: white;
        overflow: hidden;
        padding-bottom: 30px;
    }

    .description .el-textarea__inner {
        min-height: 80px;
        resize: none;
    }
</style>
<template>
    <div class="content" style="background:#f5f5f5;">
        <div class="back-button">
            <router-link :to="{path: '/main'}">
                <el-button type="text" icon="arrow-left">返回上一级</el-button>
            </router-link>
        </div>
        <div class="step1">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="项目标题" required prop="name">
                    <el-input v-model="form.name" placeholder="输入项目标题，最好控制在20字以内"></el-input>
                </el-form-item>
                <el-form-item class="summary" required label="项目概述" prop="summary">
                    <el-input v-model="form.summary" type="textarea" placeholder="请输入项目的一句话简介"></el-input>
                </el-form-item>
                <el-form-item label="行业分类" required prop="industry">
                    <el-radio-group v-model="form.industry">
                        <el-radio v-for="(item,index) in industryData" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="choose-area">
                    <el-form-item label="所属地区" required prop="selectedOptions">
                        <el-cascader expand-trigger="hover" clearable change-on-select :options="options" v-model="form.selectedOptions" @change="handleRegionCodeChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item class="circle" prop="businessArea">
                        <el-input v-model="form.businessArea" placeholder="商圈名 / 园圈名"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <el-form ref="planform" :model="planform" :rules="rules" label-width="100px">
                <div class="model-divider">
                    <img src="../../../assets/images/linear.png" /> <span>融资情况</span>
                </div>
                <div class="money">
                    <el-form-item label="总投资额" prop="overallInvestment">
                        <el-col :span="21">
                            <el-input v-model.number="planform.overallInvestment" placeholder="总投资额=目标融资额+已投入额+承诺出资">
                                <template slot="append">万元</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="目标融资额" prop="financingAmount">
                        <el-col :span="21">
                            <el-input v-model.number="planform.financingAmount" placeholder="目标融资额<=总投资额*50%">
                                <template slot="append">万元</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="融资时间" required prop="financingDays">
                        <el-col :span="21">
                            <el-input v-model.number="planform.financingDays" placeholder="请输入融资时间">
                                <template slot="append">天以内</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="出让股份" required prop="transferringSharesRatio">
                        <el-col :span="21">
                            <el-input v-model.number="planform.transferringSharesRatio" :maxlength="2" placeholder="请输入出让股份比例">
                                <template slot="append">%</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="前期资金投入">
                        <el-form-item prop="isInvested">
                            <el-checkbox v-model="planform.isInvested" label="前期已投入部分资金" name="type"></el-checkbox>
                        </el-form-item>
                        <transition name="el-zoom-in-top" >
                            <el-form-item prop="investedAmount" v-if="planform.isInvested">
                                <el-col :span="21">
                                    <el-input v-model.number="planform.investedAmount" placeholder="项目前期已经投入经营的金额">
                                        <template slot="append">万元</template>
                                    </el-input>
                                </el-col>
                            </el-form-item>
                        </transition>
                        <transition name="el-zoom-in-top" >
                        <el-form-item prop="evidenceURL" v-if="planform.isInvested">
                            <el-upload class="upload-img" action="/ajax/fileupload" :auto-upload="true" :data="{fileType:2}" :file-list="evidenceURL"
                                :on-success="successUpload_evidenceURL" :on-remove="handleRemove">
                                <el-button size="small" type="primary">上传凭据</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传不超过10M的文件</div>
                            </el-upload>
                        </el-form-item>
                        </transition>
                    </el-form-item>
                    <el-form-item label="承诺出资" required prop="commitmentAmount">
                        <el-col :span="21">
                            <el-input v-model.number="planform.commitmentAmount" placeholder="融资成功时应当与其他投资人一并注入的资金">
                                <template slot="append">万元</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                </div>
            </el-form>
            <el-form ref="conditionform" :model="conditionform" :rules="rules" label-width="100px">
                <div class="model-divider">
                    <img src="../../../assets/images/linear.png" /> <span>投资人条件</span>
                </div>
                <div class="choose-area">
                    <el-col :span="5">
                        <el-form-item prop="birth">
                            <el-checkbox v-model="conditionform.IsinvestorNativePlace" label="投资人籍贯" name="type"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <transition name="el-zoom-in-top" >
                    <el-form-item prop="selectedOptions1" v-show="conditionform.IsinvestorNativePlace">
                        <el-cascader  expand-trigger="click" change-on-select clearable :options="options" v-model="selectedOptions1">
                        </el-cascader>
                    </el-form-item>
                    </transition>
                </div>
                <div class="choose-area">
                    <el-col :span="5">
                        <el-form-item prop="permanent">
                            <el-checkbox v-model="conditionform.Ispermanent" label="常驻地区" name="invitation"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <transition name="el-zoom-in-top" >
                    <el-form-item prop="selectedOptions2" v-show="conditionform.Ispermanent">
                        <el-cascader  expand-trigger="click" change-on-select clearable :options="options" v-model="selectedOptions2">
                        </el-cascader>
                    </el-form-item>
                    </transition>
                </div>
                <div class="choose-area">
                    <el-form-item prop="invitation">
                        <el-checkbox v-model="conditionform.invitation" label="邀请码机制" name="invitation"></el-checkbox>
                    </el-form-item>
                    <span class="tips">上线之前获得平台生成的邀请码，提供邀请码的投资人才能参与项目</span>
                </div>
            </el-form>
        </div>
        <div class="footer-button">
            <div class="step1">
                <el-button style="float: right;width: 130px;" type="primary" @click="onSubmit">下一步</el-button>
                <!--<el-button style="float: right;width: 130px;margin-right:40px" type="primary" v-show="editFlag" @click="onSubmit">保存</el-button>-->
            </div>
        </div>
    </div>
</template>
<script>
    import industryData from '../../../constant/industry.js'
    import { regionData } from 'element-china-area-data'
    import { getSelectArray } from '../../../util/index.js'
    export default {
        name: 'itemStep1',
        computed: {
            financingPlanData: function () {
                return this.$store.state.item.financingPlanData || {};
            },
            itemManageDetail: function () {
                return this.$store.state.item.itemManageDetail || {};
            },
            investedEvidence: function () {
                return this.$store.state.item.investedEvidence || {};
            },
            investorCondition: function () {
                return this.$store.state.item.investorCondition || {};
            }
        },
        mounted() {
            this.editDataReview();
        },
        data() {
            return {
                industryData: industryData,
                options: regionData,
                selectedOptions: [],
                selectedOptions1: [],
                selectedOptions2: [],
                evidenceURL: [],
                form: {
                    name: '',
                    summary: '',
                    industry: '',
                    regionCode: '',
                    businessArea: '',
                    selectedOptions:[],
                },
                planform: {
                    overallInvestment: '',
                    financingAmount: '',
                    financingDays: '',
                    transferringSharesRatio: '',
                    investedAmount: '',
                    isInvested: false,
                    commitmentAmount: ''
                },
                conditionform: {
                    IsinvestorNativePlace: false,
                    Ispermanent: false,
                    permanent: '',
                    investorNativePlace: '',
                    invitation: false
                },
                rules: {
                    name: [
                        { required: true, message: '请输入项目标题', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    summary: [
                        { required: true, message: '请输入项目描述', trigger: 'blur' },
                        { min: 2, max: 100, message: '长度在 2 到 80 个字符', trigger: 'blur' }
                    ],
                    industry: [
                        { required: true, type: 'number', message: '请选择行业分类', trigger: 'change' }
                    ],
                    overallInvestment: [
                        { required: true,min:0,type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],
                    financingAmount: [
                        { required: true,min:0, type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],
                    financingDays: [
                        { required: true,min:0, type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],
                    transferringSharesRatio: [
                        { required: true,min:0, type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],
                    commitmentAmount: [
                        { required: true,min:0, type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],
                    selectedOptions: [
                        { type: "array", required: true, message: '请选择所属地区', trigger: 'change,blur' }
                    ],
                },
                editFlag: false,
                createInvestedEvidence: [],
                successFlag:true
            }
        },
        methods: {
            onSubmit() {
                if (this.editFlag) {
                    this.editStep1();
                } else {
                    this.saveStep1();
                }
            },
            editStep1() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.updateFinancingPlan();
                        this.updateInvestorCondition();
                        let projectParam = {
                            id: this.$route.params.id,
                            name: this.form.name,
                            summary: this.form.summary,
                            industry: this.form.industry,
                            regionCode: this.form.regionCode,
                            businessArea: this.form.businessArea
                        }
                        this.$store.dispatch('item_updateProjectForAffrim', { param: projectParam, vue: this }).then(() => {
                            if(this.successFlag){
                                this.$router.push('/itemStep2/' + this.$route.params.id);
                            }
                        })
                    } else {
                        this.$message.warning('请完善项目信息')
                        return false;
                    }
                })
            },
            saveStep1() {
                this.$refs['form'].validate((valid) => {
                    this.createInvestorCondition();
                    this.createFinancingPlan();
                    if (valid) {
                        let projectParam = {
                            id: this.$route.params.id,
                            name: this.form.name,
                            summary: this.form.summary,
                            industry: this.form.industry,
                            regionCode: this.form.regionCode
                        }
                        this.$store.dispatch('item_updateProjectForAffrim', { param: projectParam, vue: this }).then(() => {
                            if(this.successFlag){
                                this.$store.commit('item_setClearCreateItemData');
                                this.$router.push('/itemStep2/' + this.$route.params.id);
                            }
                        })
                    } else {
                        this.$message.warning('请完善项目信息')
                        return false;
                    }
                })
            },
            successUpload_evidenceURL(response, file, fileList) {
                this.createInvestedEvidence = fileList;
            },
            handleRegionCodeChange(value) {
                let addressCode='';
                if(value.length>0){
                    addressCode=value[value.length-1];
                }
                this.form.regionCode = addressCode;
            },
            handleRemove(file, fileList) {
                this.createInvestedEvidence = fileList;
            },
            updateFinancingPlan() {
                this.$refs['planform'].validate((valid) => {
                    if (valid) {
                        this.successFlag=true;
                        let financingPlanParam = {
                            overallInvestment: this.planform.overallInvestment * 10000,
                            financingAmount: this.planform.financingAmount * 10000,
                            financingDays: this.planform.financingDays,
                            transferringSharesRatio: this.planform.transferringSharesRatio / 100,
                            commitmentAmount: this.planform.commitmentAmount * 10000,
                            invested: this.planform.isInvested ? 1 : 0,
                            investedAmount: this.planform.isInvested ? this.planform.investedAmount * 10000 : 0,
                            id: this.itemManageDetail.financingPlanId,
                            projectId: this.$route.params.id
                        }
                        this.$store.dispatch('item_updateFinancingPlan', { param:  financingPlanParam, vue: this }).then(() => {
                            this.$store.dispatch('item_deleteInvestedEvidence', { id: this.itemManageDetail.financingPlanId }).then(() => {
                                if (this.itemManageDetail.financingPlanId && this.itemManageDetail.financingPlanId.length != 0 && this.createInvestedEvidence.length > 0) {
                                    for (let i = 0; i < this.createInvestedEvidence.length; i++) {
                                        let element = this.createInvestedEvidence[i];
                                        if (!element.response) {
                                            continue;
                                        }
                                        let param = {
                                            evidenceURL: JSON.parse(element.response.objectLiteral),
                                            name: element.name,
                                            financingPlanId: this.itemManageDetail.financingPlanId
                                        }
                                        this.$store.dispatch('item_createInvestedEvidence', { param, vue: this });
                                    }

                                }
                            })
                        })
                    } else {
                        this.successFlag=false;
                        this.$message.warning('请完善融资方案')
                        return false;
                    }
                });
            },
            createFinancingPlan() {
                this.$refs['planform'].validate((valid) => {
                    if (valid) {
                        this.successFlag=true;
                        let financingPlanParam = {
                            overallInvestment: this.planform.overallInvestment * 10000,
                            financingAmount: this.planform.financingAmount * 10000,
                            financingDays: this.planform.financingDays,
                            transferringSharesRatio: this.planform.transferringSharesRatio / 100,
                            commitmentAmount: this.planform.commitmentAmount * 10000,
                            invested: this.planform.isInvested ? 1 : 0,
                            investedAmount: this.planform.isInvested ? this.planform.investedAmount * 10000 : 0
                        }
                        return this.$store.dispatch('item_createFinancingPlan', { param: financingPlanParam, vue: this }).then(() => {
                            let projectParam = {
                                id: this.$route.params.id,
                                financingPlanId: this.$store.state.item.financingPlanId
                            }
                            this.$store.dispatch('item_updateProjectForAffrim', { param: projectParam, vue: this })
                            if (this.$store.state.item.financingPlanId.length != 0) {
                                for (let i = 0; i < this.createInvestedEvidence.length; i++) {
                                    let element = this.createInvestedEvidence[i];
                                    if (!element.response) {
                                        continue;
                                    }
                                    let param = {
                                        evidenceURL: JSON.parse(element.response.objectLiteral),
                                        name: element.name,
                                        financingPlanId: this.$store.state.item.financingPlanId
                                    }
                                    this.$store.dispatch('item_createInvestedEvidence', { param, vue: this });
                                }

                            }
                        })
                    } else {
                        this.successFlag=false;
                        this.$message.warning('请完善融资方案')
                        return false;
                    }
                });
            },
            createInvestorCondition() {
                if (this.conditionform.invitation || this.conditionform.IsinvestorNativePlace || this.conditionform.Ispermanent) {
                    let investorCondition = {
                        invitation: this.conditionform.invitation ? 1 : 0,
                        investorNativePlace: this.conditionform.IsinvestorNativePlace ? this.selectedOptions1[this.selectedOptions1.length-1] : '',
                        permanent: this.conditionform.Ispermanent ? this.selectedOptions2[this.selectedOptions2.length-1] : '',
                        financeId: this.$route.params.id
                    }
                    return this.$store.dispatch('item_createInvestorCondition', { param: investorCondition, vue: this })
                }
                
            },
            updateInvestorCondition() {
                let investorCondition = {
                    invitation: this.conditionform.invitation ? 1 : 0,
                    investorNativePlace: this.conditionform.IsinvestorNativePlace ? this.selectedOptions1[this.selectedOptions1.length-1] : '',
                    permanent: this.conditionform.Ispermanent ? this.selectedOptions2[this.selectedOptions2.length-1] : '',
                    financeId: this.$route.params.id
                }
                this.$store.dispatch('item_updateInvestorCondition', { param: investorCondition, vue: this })
            },
            editDataReview() {
                this.$store.dispatch('item_getManageDetail', { id: this.$route.params.id }).then(() => {
                    if (!this.itemManageDetail.financingPlanId) {
                        this.editFlag = false;
                        return false;
                    }
                    this.editFlag = true;
                    this.form.name = this.itemManageDetail.name;
                    this.form.summary = this.itemManageDetail.summary;
                    this.form.industry = this.itemManageDetail.industry;
                    this.form.regionCode = this.itemManageDetail.regionCode;
                    this.form.selectedOptions = getSelectArray(this.itemManageDetail.regionCode);
                    this.form.businessArea = this.itemManageDetail.businessArea;
                    this.$store.dispatch('item_selectInvestorConditionByFinId', { id: this.$route.params.id }).then(() => {
                        this.conditionform.IsinvestorNativePlace = this.investorCondition.investorNativePlace&&this.investorCondition.investorNativePlace.length > 0 ? true : false;
                        this.conditionform.investorNativePlace = this.investorCondition.investorNativePlace;
                        this.selectedOptions1 = getSelectArray(this.investorCondition.investorNativePlace);
                        this.conditionform.Ispermanent =this.investorCondition.permanent&&this.investorCondition.permanent.length > 0 ? true : false;
                        this.conditionform.permanent = this.investorCondition.permanent;
                        this.selectedOptions2 = getSelectArray(this.investorCondition.permanent);
                        this.conditionform.invitation = this.investorCondition.invitation == 1 ? true : false;
                    })
                    this.$store.dispatch('item_getFinancingPlan', { id: this.itemManageDetail.financingPlanId }).then(() => {
                        if (this.financingPlanData.id && this.financingPlanData.id.length > 0) {
                            this.planform.overallInvestment =( this.financingPlanData.overallInvestment / 10000)||'';
                            this.planform.financingAmount = (this.financingPlanData.financingAmount / 10000)||'';
                            this.planform.financingDays = (this.financingPlanData.financingDays)||'';
                            this.planform.transferringSharesRatio = (this.financingPlanData.transferringSharesRatio * 100)||0;
                            this.planform.isInvested = (this.financingPlanData.investedAmount && this.financingPlanData.investedAmount != 0) ? true : false;
                            this.planform.investedAmount = this.financingPlanData.investedAmount / 10000;
                            this.planform.commitmentAmount = this.financingPlanData.commitmentAmount / 10000;
                            this.$store.dispatch('item_getInvestedEvidence', { id: this.financingPlanData.id }).then(() => {
                                for (let i = 0; i < this.investedEvidence.length; i++) {
                                    let item = this.investedEvidence[i];
                                    this.evidenceURL.push({
                                        name: item.name,
                                        url: item.evidenceURL,
                                        response: { objectLiteral: item.evidenceURL }
                                    })
                                }
                            })
                        }
                    })
                })
            }
        }
    }

</script>