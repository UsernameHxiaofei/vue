<style>
    #riskHandle .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
    }

    #riskHandle .el-dialog--small {
        width: 725px;
    }

    #riskHandle .indexInfo {
        color: #666;
        min-width: 50px;
        height: 25px;
        text-indent: 10px;
        margin-left: 10px;
    }

    #riskHandle .riskform-content {
        color: #666;
        height: 188px;
        padding: 2px;
        font-size: 16px;
    }

    #riskHandle .description {
        text-align: center;
        background: #fafafa;
        border-right: 1px solid #dedede;
        height: 188px;
        color: #7f868a;
        font-size: 17px;
        line-height: 188px;
    }

    #riskHandle .description-text {
        color: #7f868a;
        font-size: 17px;
        height: 188px;
        padding: 2px;
        max-height: 188px;
    }

    #riskHandle .el-radio__label {
        font-size: 15px;
        padding-left: 5px;
        color: #797272;
    }

    #riskHandle .handleInfoDiv {
        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;
    }

    #riskHandle .riskIndexInfo {
        width: 60%;
    }

    #riskHandle .indexDetailInfo {
        width: 40%;
    }

    #riskHandle .info-item {
        width: 100%;
        height: 24px;
        vertical-align: middle;
    }

    #riskHandle .detail-mark {
        color: #06ccb7;
        cursor: pointer;
    }

    #riskHandle .info-item label {
        width: 60px;
        text-align: justify;
        text-justify: distribute-all-lines;
        /*ie6-8*/
    }
</style>
<template>
    <div id='riskHandle'>
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button>
        </div>
        <el-row style="margin-top:20px">
            <risk-info></risk-info>
        </el-row>
        <el-row>
            <div style="padding:30px 80px;margin:20px auto;width:885px;background:#ffffff">
                <el-row class="handleInfoDiv" style="padding:30px 80px;border:1px solid #dedede;background:#fafafa;">
                    <div class="riskIndexInfo">
                        <div class="info-item">
                            <label>指标名</label>
                            <span class="indexInfo">{{riskIndex.riskName||' '}}</span>
                        </div>
                        <div class="info-item">
                            <label>风险域</label>
                            <span class="indexInfo">{{riskIndex.riskCategory|riskRegion}} </span>
                        </div>
                        <div class="info-item">
                            <label>等级</label>
                            <span class="indexInfo">{{level[riskIndex.riskLevel]}}</span>
                        </div>
                        <div class="info-item">
                            <label>触发时间</label>
                            <span class="indexInfo">{{riskIndex.createTime}}</span>
                        </div>
                        <div class="info-item">
                            <label>状态</label>
                            <span class="indexInfo">{{status[riskIndex.status]}}</span>
                        </div>
                    </div>
                    <div class="indexDetailInfo">
                        <label>触发异常</label>
                        <div class="info-item" v-for="i in riskIndexRule">
                            <span>{{i}}</span>
                        </div>
                        <div class="info-item detail-mark" v-for="i in riskIndex.memberChangeList">
                            {{i.changeTask}}:
                            <br>{{i.oldContent}}
                            <br>变为
                            <br>{{i.newContent}}
                        </div>
                    </div>

                </el-row>
                <el-form style="padding:30px 80px;border:1px solid #dedede;margin-top:20px;background:#fafafa" ref="form" :model="form" label-width="80px">
                    <el-form-item required label="情况说明" prop="situationExplan">
                        <el-input resize="none" :disabled="handling" type="textarea" :rows="8" placeholder="请输入内容" class="description-text" v-model="form.situationExplan">
                        </el-input>
                    </el-form-item>
                    <el-form-item required label="处理意见" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio :disabled="handling" :label="1">可以缓释</el-radio>
                            <el-radio :disabled="handling" :label="2">需要追踪</el-radio>
                            <el-radio :disabled="handling" :label="3">立即介入</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-show="form.status==1">
                        <el-button type="primary" style="float:right;width:120px;" size="large" @click="submitForm">确定</el-button>
                    </el-form-item>
                    <el-form-item v-show="form.status!=1">
                        <el-button type="primary" style="float:right;width:120px;" size="large" @click="addrisk">风险发布</el-button>
                    </el-form-item>
                    <el-form-item required label="跟踪说明" prop="followSituation" v-show="finalHandle">
                        <el-input resize="none" type="textarea" :rows="8" placeholder="请输入内容" class="description-text" v-model="form.followSituation">
                        </el-input>
                    </el-form-item>
                    <el-form-item required label="最终意见" prop="finalSuggestion" v-show="finalHandle">
                        <el-radio-group v-model="form.finalSuggestion">
                            <el-radio :label="1">可以缓释</el-radio>
                            <el-radio :label="2">无法缓释</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-show="finalHandle">
                        <el-button type="primary" style="float:right;width:120px;" @click="finnalSubmit" size="large">完结</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title="风险发布" :visible.sync="riskflag" :close-on-click-modal="false">
                    <div>
                        <el-row>
                            <el-col style="border:1px solid #dedede;padding:20px 40px">
                                <el-form :model="form" label-width="85px">
                                    <el-form-item label="接收人" prop="exper">
                                        <el-checkbox :disabled="handling" v-show="persons.resp1&&persons.resp1.expertInfo" v-model="form.expert">{{'行家-'+(persons.resp1&&persons.resp1.expertInfo?persons.resp1.expertInfo.name:'')}}</el-checkbox>
                                        <el-checkbox :disabled="handling" v-show="persons.resp1&&persons.resp1.leadInfo" v-model="form.lead">{{'领投-'+(persons.resp1&&persons.resp1.leadInfo?persons.resp1.leadInfo.name:'')}}</el-checkbox>
                                        <br>
                                        <label>更多投资人</label>
                                        <el-select v-model="form.follows" value-key="id" clearable multiple placeholder="请选择">
                                            <el-option v-for="v in persons.resp2" :key="v.id" :label="v.name" :value="v"> </el-option>
                                        </el-select>
                                        <el-checkbox :disabled="handling" style="margin-left:20px;margin-top:5px" @change="selectAllPerson" v-model="form.all">全选</el-checkbox>
                                    </el-form-item>
                                    <el-form-item label="推送内容" prop="sendContent">
                                        <el-input resize="none" :disabled="handling" type="textarea" :rows="8" placeholder="请输入内容" v-model="form.sendContent">
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="width:120px" @click="submitForm">确认</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-row>
    </div>
</template>

<script>
import riskColumn from '../riskInfo/riskColumn'

export default {
	name: 'riskHandle',
	components: {
		'risk-info': riskColumn
	},
	beforeMount() {
		this.$store.dispatch('risk_selectRiskWarningById', { id: this.$route.params.id }).then(() => {
			if (this.riskIndex.riskRuleInfo) {
				for (let i = 0; i < this.riskIndex.riskRuleInfo.length; i++) {
					let element = this.riskIndex.riskRuleInfo[i]
					this.riskIndexRule.push(element.factorName + element.relationName + element.value + element.unit)
				}
			}
			this.$store.dispatch('risk_historyDetail', { riskProjectId: this.$route.params.id }).then(() => {
				this.$store.dispatch('risk_getPerson', { projectId: this.$store.state.risk.projectInfo.projectId }).then(() => {
					if (this.historyDetail && this.riskIndex.status === 3) {
						this.form.situationExplan = this.historyDetail.situationExplan
						this.form.status = this.historyDetail.status
						let messageList = this.historyDetail.riskOperateMessages
						let follows = []
						if (messageList && messageList.length > 0) {
							this.form.sendContent = messageList[0].sendContent
							for (let i = 0; i < messageList.length; i++) {
								let item = messageList[i]
								if (item.receiveType === 1) {
									this.form.expert = true
								} else if (item.receiveType === 2) {
									this.form.lead = true
								} else {
									for (let m = 0; m < this.persons.resp2.length; m++) {
										let element = this.persons.resp2[m]
										if (item.receiveId == element.id) {
											follows.push({ id: item.receiveId, mobileNumber: element.mobileNumber, name: element.name })
										}
									}
								}
							}
						}
						this.form.follows = follows
						this.handling = true
						this.finalHandle = true
					}
				})
			})
		})
	},
	computed: {
		persons: function () {
			return this.$store.state.risk.projectPerson
		},
		riskIndex: function () {
			return this.$store.state.risk.riskIndex || {}
		},
		historyDetail: function () {
			return this.$store.state.risk.historyDetail[0]
		},
		riskOperateId: function () {
			return this.$store.state.risk.riskOperateId
		}
	},
	data() {
		return {
			level: {
				3: '高',
				2: '中',
				1: '低'
			},
			status: {
				0: '待处理',
				1: '人工缓释',
				2: '无法缓释',
				3: '处理中',
				4: '自动缓释'
			},
			handling: false,
			riskflag: false,
			finalHandle: false,
			riskIndexRule: [],
			form: {
				situationExplan: '',//情况说明
				status: 1,//处理意见
				followSituation: '',
				finalSuggestion: 0,
				follows: [],
				expert: false,
				lead: false,
				all: false,
				sendContent: ''
			}
		}
	},
	methods: {
		finnalSubmit() {
			let param = {
				id: this.historyDetail && this.historyDetail.id ? this.historyDetail.id : this.riskOperateId,
				followSituation: this.form.followSituation,
				finalSuggestion: this.form.finalSuggestion,
				operateId: this.$store.state.login.actor.id
			}
			this.$store.dispatch('risk_saveFinalHandle', { param, vue: this })
		},
		submitForm() {
			if (this.riskIndex.status === 3) {
				this.riskflag = false
				return
			}
			let sendPerson = []
			if (this.form.status != 1) {
				if (this.all) {
					sendPerson.push({ receiveId: this.persons.resp1.expertInfo.id, receiveType: 1, mobile: this.persons.resp1.expertInfo.mobileNumber })
					sendPerson.push({ receiveId: this.persons.resp1.leadInfo.id, receiveType: 2, mobile: this.persons.resp1.leadInfo.mobileNumber })
					for (let i = 0; this.persons.resp2 && i < this.persons.resp2.length; i++) {
						let item = this.persons.resp2[i]
						sendPerson.push({ receiveId: item.id, receiveType: 3, mobile: item.mobileNumber })
					}
				} else {
					if (this.form.expert) {
						sendPerson.push({ receiveId: this.persons.resp1.expertInfo.id, receiveType: 1, mobile: this.persons.resp1.expertInfo.mobileNumber })
					}
					if (this.form.lead) {
						sendPerson.push({ receiveId: this.persons.resp1.leadInfo.id, receiveType: 2, mobile: this.persons.resp1.leadInfo.mobileNumber })
					}
					for (let i = 0; this.form.follows && i < this.form.follows.length; i++) {
						let item = this.form.follows[i]
						sendPerson.push({ receiveId: item.id, receiveType: 3, mobile: item.mobileNumber })
					}
				}
			}
			let param = {
				riskId: this.riskIndex.id,
				operateId: this.$store.state.login.actor.id,
				situationExplan: this.form.situationExplan,
				status: this.form.status,
				sendContent: this.form.sendContent,
				sendPerson: sendPerson
			}
			if (param.situationExplan.length == 0) {
				this.$message.warning('请填写情况说明')
				return
			}
			this.$store.dispatch('risk_saveHandle', { param, vue: this }).then(() => {
				if (this.$store.state.risk.riskOperateId && this.$store.state.risk.riskOperateId.length != 0) {
					this.handling = true
					this.riskflag = false
					if (param.status != 1) {
						this.finalHandle = true
					}
				}
			})
		},
		back() {
			this.$router.go(-1)
		},
		addrisk() {
			this.riskflag = true
		},
		selectAllPerson() {
			if (this.form.all) {
				this.form.expert = this.form.lead = true
				this.follows = this.persons.resp2
			} else {
				this.form.expert = this.form.lead = false
				this.follows = []
			}
		}
	}
}

</script>