<style>
	/*tab*/

	#tabber .el-tabs__header {
		padding: 10px 30px 10px 30px;
		margin: 0;
		border-color: #eeeeee;
	}

	#tabber .el-tabs__item {
		height: 30px;
		line-height: 30px;
		padding: 0 13px;
		background: #e2e6ef;
		color: #a3abbe;
		border-radius: 15px;
		margin-right: 10px;
		font-size: 12px;
	}

	#tabber .el-tabs__item.is-active {
		color: #06ccb6;
	}

	#tabber .el-tabs__active-bar {
		display: none!important;
	}

	#tabber .el-tabs__content {
		border-left: 1px solid #eeeeee;
		border-right: 1px solid #eeeeee;
	}

	.edit-account {
		margin-bottom: 0px;
	}

	.cur-step {
		color: #fbc937;
	}
</style>
<template>
	<div style="background: #fafafa;">
		<div>
			<div class="back-button">
				<router-link :to="{path: '/personMember'}">
					<el-button type="text" icon="arrow-left">返回上一级</el-button>
				</router-link>
			</div>
			<div style="width:70%;height: 200px;background: #fff;margin: auto;">
				<div class="media-left" style="float:left;">
					<img @click="editHeadImage" style="cursor:pointer;width: 150px;height:150px;margin: 20px 10px;border:1px solid gray" class="media-object" :src="customerIndividualInfoByActorId.headFigureURL"
					 alt="头像">
				</div>
				<div class="media-body" style="margin: 20px 10px;">
					<div style="margin: 20px 10px;float:left;">
						<div style="    margin: 15px 10px 5px 5px;" class=" ">
							<label>姓名：</label>
							<span>{{customerInfoByActorId.name}}</span>
						</div>
						<div style="    margin: 5px 10px 5px 5px;" class=" ">
							<label>手机号：</label>
							<span>{{customerInfoByActorId.mobileNumber}}</span>
						</div>
						<div style="    margin: 5px 10px 5px 5px;" class=" ">
							<label>身份证号：</label>
							<span>{{customerInfoByActorId.identNumber}}</span>
						</div>
						<div style="    margin: 5px 10px 5px 5px;" class=" ">
							<label>E-mail：</label>
							<span>{{customerInfoByActorId.email||'未填写'}}</span>
						</div>
					</div>
					<div style=" float:left;margin-top:130px;">
						<el-button class="el-button el-button--primary" type='button' @click="dialogFormVisible = true">编辑账号</el-button>
						<el-button class="el-button el-button--primary" type='button' @click="auditeAccountChange">账号变更审核</el-button>
					</div>
				</div>
			</div>
			<div id="tabber">
				<el-tabs class="tab-nav" style=" width: 70%;height: 90px;margin: auto;" :value="'first'">
					<el-tab-pane name="first">
						<span slot="label"> 个人信息</span>
						<personInfo></personInfo>
					</el-tab-pane>
					<el-tab-pane name="third">
						<span slot="label"> 通讯地址</span>
						<postalAddress></postalAddress>
					</el-tab-pane>
					<el-tab-pane name="fourth">
						<span slot="label"> 平台身份认证</span>
						<accountInfo></accountInfo>
					</el-tab-pane>
					<el-tab-pane name="fifth">
						<span slot="label"> 合格投资人认证记录</span>
						<investorCertificationRecord>
						</investorCertificationRecord>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>

		<div class="p-form">
			<el-dialog title="编辑账号" :visible.sync="dialogFormVisible" @close="cancel('customer')" :close-on-click-modal="false">
				<el-form label-position="right" :model="customerInfoByActorId" :rules="customerRules" ref="customer">
					<el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
						<el-input v-model="customerInfoByActorId.mobileNumber" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="Email" :label-width="formLabelWidth" prop="email">
						<el-input v-model="customerInfoByActorId.email" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item class="edit-account" label="姓名" :label-width="formLabelWidth">
						<el-col :span="8">
							{{customerInfoByActorId.name}}
						</el-col>
					</el-form-item>
					<el-form-item class="edit-account" label="身份证号" :label-width="formLabelWidth">
						<el-col :span="8">
							{{customerInfoByActorId.identNumber}}
						</el-col>
					</el-form-item>
					<el-form-item class="edit-account" label="状态" :label-width="formLabelWidth">
						<el-col :span="8" v-if="customerInfoByActorId.status==1">正常</el-col>
						<el-col :span="8" v-if="customerInfoByActorId.status==2">已封禁</el-col>
						<el-col :span="8" v-if="customerInfoByActorId.status==0">无效</el-col>
					</el-form-item>

				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button type="warning" @click="accountOperation" v-if="customerInfoByActorId.status==1">封禁</el-button>
					<el-button type="warning" @click="accountOperation" v-if="customerInfoByActorId.status==2">激活</el-button>
					<el-button type="primary" @click="reset">重置登录口令</el-button>
					<el-button type="primary" @click="setPayPassword">重置支付口令</el-button>
					<el-button type="primary" @click="editAccount">保 存</el-button>
				</div>

			</el-dialog>
		</div>
		<!-- 封禁理由弹窗 -->
		<div class="p-form">
			<el-dialog title="封禁理由" :visible.sync="dialogClosureVisible" @close="cancel('actor')" :close-on-click-modal="false">
				<el-form :model="actor" :rules="actorRule" ref="actor">
					<el-form-item prop="rejection" label="封禁理由">
						<el-input class="inputing" v-model="actor.rejection" type="textarea" placeholder="请输入封禁理由..."></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel('actor')">取 消</el-button>
					<el-button type="primary" @click="closure">保 存</el-button>
				</div>
			</el-dialog>
		</div>
		<div class="p-form">
			<el-dialog title="口令信息" :visible.sync="resetPasswordVisible" @close="resetPasswordVisible=false" :close-on-click-modal="false">
				<el-form>
					<el-form-item label="重置口令：">
						<span style="color:red">{{resetPassword}}</span>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
				</div>
			</el-dialog>
		</div>
		<div class="p-form">
				<el-dialog title="头像编辑" :visible.sync="editHeadImgChange" :close-on-click-modal="false">
						<imageCropper  :op="{img:customerIndividualInfoByActorId.headFigureURL}" @result="updateHeadFigureURL"></imageCropper>
				</el-dialog>
		</div>
		<div class="p-form">
                <el-dialog title="个人会员账号变更审核" :visible.sync="auditeWaitFormVisible" @close="auditeWaitFormVisible=false" :close-on-click-modal="false">
                    <el-form >
                        <el-form-item  label="姓名">
                            {{customerInfoByActorId.name}}
                        </el-form-item>
                        <el-form-item  label="身份证号">
                            {{customerInfoByActorId.identNumber}}
                        </el-form-item>
                        <el-form-item  label="原手机号">
                            {{customerInfoByActorId.mobileNumber}}
                        </el-form-item>
                        <hr style="height:2px;background:rgb(191, 217, 217);;margin:10px 0;">
                        <el-form-item  label="新手机号">
                            {{auditeWaitByActorId.mobileNumber}}
                        </el-form-item>
                        <el-form-item  label="新姓名">
                            {{auditeWaitByActorId.name}}
                        </el-form-item>
                        <el-form-item  label="新身份证号">
                            {{auditeWaitByActorId.identNumber}}
                        </el-form-item>
                        <el-form-item  label="新账号实名认证">
                            <el-button v-if="auditeWaitByActorId.isRealName==0" @click="realNameValidate">
                                开始认证
                            </el-button>
                            <!-- 0：待认证 1：未通过 2：通过' -->
                            <span v-if="auditeWaitByActorId.isRealName!=0">{{auditeWaitByActorId.isRealName==2?'通过':'未通过'}}</span>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
						<el-button type="warning" @click="accountAuditRefuseVisible = true">拒绝</el-button>
                            <el-button type="success" @click="auditAccount">通过</el-button>
                    </div>
				</el-dialog>
				<div class="p-form">
						<el-dialog title="拒绝理由" :visible.sync="accountAuditRefuseVisible" @close="cancel" :close-on-click-modal="false">
							<el-form :model="refuseParam"  ref="refuseParam">
								<el-form-item prop="rejection" required label="拒绝理由">
									<el-input class="inputing" v-model="refuseParam.rejection" type="textarea" placeholder="请输入拒绝理由..."></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="cancel">取 消</el-button>
								<el-button type="primary" @click="refuse">保 存</el-button>
							</div>
						</el-dialog>
					</div>
            </div>
	</div>
</template>
<script>
	import personInfo from './personInfo.vue'
	import postalAddress from './postalAddress.vue'
	import accountInfo from './accountInfo.vue'
	import investorCertificationRecord from './investorCertificationRecord.vue'
	import imageCropper from '../../../components/common/cropper'
	export default {
		name: 'personMemberDetail',
		components: {
			personInfo, investorCertificationRecord, postalAddress, accountInfo,imageCropper
		},
		computed: {
			customerIndividualInfoByActorId: function () {
				return this.$store.state.customer.customerIndividualInfoByActorId
			},
			customerInfoByActorId: function () {
				return this.$store.state.customer.customerInfoByActorId
			},
			systemClosureUser: function () {
				return this.$store.state.system.systemClosureUser
			},
			resetLoginPasswordStatus: function () {
				return this.$store.state.customer.resetLoginPasswordStatus
			},
			updateMobileAndEmailByIdStatus: function () {
				return this.$store.state.customer.updateMobileAndEmailByIdStatus
			},
			payPasswordUpdate: function () {
				return this.$store.state.customer.payPasswordUpdate
			},
		},
		data() {
			return {
				editHeadImgChange:false,
				dialogFormVisible: false,
				dialogClosureVisible: false,
				accountAuditRefuseVisible:false,
				resetPasswordVisible: false,
				title: '编辑账号',
				formLabelWidth: '120px',
				actor: {
					status: '',
					rejection: '',
					actorId: '',
				},
				refuseParam: {
                    actorId: this.$route.params.actorId,
                    rejection: '',
                },
				actorRule: {
					rejection: [
						{ required: true, message: '请输入封禁理由', trigger: 'blur' }
					],
				},
				customerRules: {
					mobileNumber: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
						{ pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
					],
					email: [
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
					]
				},
				resetPassword: '',
				auditeWaitByActorId:{},
				auditeWaitFormVisible: false
			}
		},
		beforeMount() {
			this.customerInit()
		},
		methods: {
			auditeAccountChange(){
				this.loadChangeAudit().then(()=>{
					if(this.auditeWaitByActorId.id){
						 this.auditeWaitFormVisible=true
					}else{
						this.$message.info('该会员没有出现账号变更审核')
					}
				 })
			},
			realNameValidate(){
                this.$store.dispatch('verifyIdcardForAudite',{
                    name:this.customerInfoByActorId.name,
                    identNumber:this.customerInfoByActorId.identNumber,
                    mobileNumber:this.auditeWaitByActorId.mobileNumber,
                    id:this.auditeWaitByActorId.actorId
                }).then((data)=>{
                    this.loadChangeAudit()
                })
			},
			auditAccount(){
				let adoptParam = {
                    id: this.auditeWaitByActorId.id,
                    status: 1,
                    rejection: this.refuseParam.rejection
                }
                this.$store.dispatch('updateActorAuditeStatus', adoptParam).then((data) => {
                    if (data.success) {
                        this.$message({
                            message: '审核通过',
                            type: 'success'
                        })
                        this.cancel()
                    } else {
                        this.$message.error(data.information)
                    }
                })
			},
			refuse() {
                this.$refs['refuseParam'].validate((valid) => {
                    if (valid) {
                        let adoptParam = {
                            id: this.auditeWaitByActorId.id,
                            status: 2,
                            rejection: this.refuseParam.rejection
                        }
                        this.$store.dispatch('updateActorAuditeStatus', adoptParam).then((data) => {
                            if (data.success) {
                                this.$message({
                                    message: '拒绝成功',
                                    type: 'success'
								})
								this.auditeWaitFormVisible=false
                                this.cancel('refuseParam')
                            } else {
                                this.$message.error(data.information)
                            }
                        })
                    }
                })

            },
			loadChangeAudit(){
                return this.$store.dispatch('auditeWaitByActorId',{type:2,id:this.$route.params.actorId}).then((data)=>{
                    this.auditeWaitByActorId=data
                })
            },
			editHeadImage(){
                this.editHeadImgChange=true
			},
			updateHeadFigureURL(val){
				if(val){
					this.$store.dispatch('customer_updateHeadFigureURL',{id: this.$route.params.actorId,headFigureURL:val}).then((data)=>{
						if(data.success){
							this.$store.dispatch('customerIndividualInfoByActorId', {id: this.$route.params.actorId})
							this.editHeadImgChange=false
						}
					})
				}
			},
			setPayPassword() {
				this.$confirm('此操作将修改会员支付口令, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let setPayPasswordParams = {
						id: this.$route.params.actorId,
					}
					this.$store.dispatch('updatePayPassword', setPayPasswordParams).then(() => {
						if (this.payPasswordUpdate.success) {
							this.$message({
								type: 'success',
								message: '重置成功!'
							})
						} else {
							this.$message.error(this.payPasswordUpdate.information)
						}
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消重置'
					})
				})
			},
			customerInit() {
				let actorParams = {
					id: this.$route.params.actorId
				}
				this.$store.dispatch('customerInfoByActorId', actorParams).then(() => {
					if (this.customerInfoByActorId.email) {
						this.customerInfoByActorId.email = this.customerInfoByActorId.email.address
					} else {
						this.customerInfoByActorId.email = ''
					}
				})
			},
			editAccount() {
				this.$refs['customer'].validate((valid) => {
					if (valid) {
						this.$store.dispatch('updateMobileAndEmailById', this.customerInfoByActorId).then(() => {
							if (this.updateMobileAndEmailByIdStatus.success) {
								this.$message({
									message: '修改成功！',
									type: 'success'
								})
								this.customerInit()
								this.dialogFormVisible = false
							} else {
								this.customerInit()
								this.$message.error('修改失败')
							}
						})
					}
				})
			},
			accountOperation() {
				if (this.customerInfoByActorId.status == 1) {
					this.dialogClosureVisible = true
				} else {
					this.actor.status = 1
					this.actor.actorId = this.customerInfoByActorId.id
					this.$store.dispatch('system_closureUser', this.actor).then(() => {
						if (this.systemClosureUser.success) {
							this.$message({
								message: '激活成功！',
								type: 'success'
							})
							this.customerInit()
							this.dialogFormVisible = false
						} else {
							this.$message.error('激活失败')
						}
					})
				}
			},
			closure() {
				this.$refs['actor'].validate((valid) => {
					if (valid) {
						this.actor.status = 2
						this.actor.actorId = this.customerInfoByActorId.id
						this.$store.dispatch('system_closureUser', this.actor).then(() => {
							if (this.systemClosureUser.success) {
								this.$message({
									message: '封禁成功！',
									type: 'success'
								})
								this.customerInit()
								this.cancel('actor')
								this.dialogClosureVisible = false
							} else {
								this.$message.error('封禁失败')
							}
						})
					}
				})
			},
			reset() {
				this.$confirm('此操作将重置会员登录口令, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let resetParam = {
						id: this.customerInfoByActorId.id
					}
					this.$store.dispatch('resetLoginPwById', resetParam).then(() => {
						if (this.resetLoginPasswordStatus.head.success) {
							this.$message({
								message: '重置口令成功！',
								type: 'success'
							})
							this.resetPassword = JSON.parse(this.resetLoginPasswordStatus.objectLiteral)
							this.resetPasswordVisible = true
							this.customerInit()
						} else {
							this.$message.error('重置口令失败')
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消重置'
					})
				})
			},
			cancel(formName) {
				if(this.$refs[formName]){
                    this.$refs[formName].resetFields()
                }
				this.dialogClosureVisible = false
				this.accountAuditRefuseVisible = false;
				this.auditeWaitFormVisible=false
			}
		}
	}
</script>