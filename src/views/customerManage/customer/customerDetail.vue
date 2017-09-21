<style>
/*tab*/

#tabber .el-tabs__header {
	background: #fcfcfc;
	padding: 20px 30px 10px 30px;
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
	/*margin: 0 30px;*/
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
				<router-link :to="{path: '/customerInforMaintain'}">
					<el-button type="text" icon="arrow-left">返回上一级</el-button>
				</router-link>
			</div>
			<div style="width:70%;height: 200px;background: #fff;margin: auto;">
	
				<div class="media-left" style="float:left;">
					<img style="width: 150px;height:150px;margin: 20px 10px;border:1px solid gray" class="media-object" :src="customerInfoByCustomerId.headFigureURL" alt="头像">
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
					<div style=" float:left; width: 100px;height: 200px;margin-left: 180px;line-height:200px;">
						<el-button class="el-button el-button--primary" type='button' @click="dialogFormVisible = true">编辑账号</el-button>
					</div>
				</div>
			</div>
	
			<div id="tabber">
	
				<el-tabs class="tab-nav" style=" width: 70%;height: 90px;margin: auto;" v-model="activeName">
	
					<el-tab-pane name="first">
						<span slot="label"> 个人信息</span>
						<personInfo @edit-success="customerInit"></personInfo>
					</el-tab-pane>
					<el-tab-pane name="second">
						<span slot="label"> 企业信息</span>
						<enterpriseInfo></enterpriseInfo>
					</el-tab-pane>
					<el-tab-pane name="third">
						<span slot="label"> 通讯地址</span>
						<postalAddress></postalAddress>
					</el-tab-pane>
					<el-tab-pane name="fourth">
						<span slot="label"> 账号认证信息</span>
						<accountInfo ></accountInfo>
					</el-tab-pane>
					<el-tab-pane name="fifth">
						<span slot="label"> 合格投资人认证记录</span>
						<investorCertificationRecord >
						</investorCertificationRecord>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	
		<div class="p-form">
			<el-dialog title="编辑账号" :visible.sync="dialogFormVisible" @close="cancel('customer')">
		
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
					<el-button type="primary" @click="reset">重置口令</el-button>
					<el-button type="primary" @click="editAccount">保 存</el-button>
				</div>
	
			</el-dialog>
		</div>
		<!-- 封禁理由弹窗 -->
		<div class="p-form">
			<el-dialog title="封禁理由" :visible.sync="dialogClosureVisible" @close="cancel('actor')">
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
			<el-dialog title="口令信息" :visible.sync="resetPasswordVisible" @close="resetPasswordVisible=false">
				<el-form>
					<el-form-item  label="重置口令：">
						<span style="color:red">{{resetPassword}}</span>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import personInfo from './personInfo.vue'
import enterpriseInfo from './enterpriseInfo.vue'
import postalAddress from './postalAddress.vue'
import accountInfo from './accountInfo.vue'
import investorCertificationRecord from './investorCertificationRecord.vue'

export default {
	name: 'customerDetail',
	components: {
		personInfo, investorCertificationRecord, enterpriseInfo, postalAddress, accountInfo
	},
	computed: {
		customerInfoByCustomerId: function () {
			return this.$store.state.customer.customerInfoByCustomerId;
		},
		customerInfoByActorId: function () {
			return this.$store.state.customer.customerInfoByActorId;
		},
		systemClosureUser: function () {
			return this.$store.state.system.systemClosureUser;
		},
		resetLoginPasswordStatus: function () {
			return this.$store.state.customer.resetLoginPasswordStatus;
		},
		updateMobileAndEmailByIdStatus: function () {
			return this.$store.state.customer.updateMobileAndEmailByIdStatus;
		},

	},
	data() {
		return {
			activeName: 'first',
			dialogFormVisible: false,
			dialogClosureVisible: false,
			resetPasswordVisible:false,
			title: "编辑账号",
			formLabelWidth: '120px',
			actor: {
				status: '',
				rejection: '',
				actorId: '',
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
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
				]
			},
			resetPassword:''
		}
	},
	mounted() {
		this.customerInit();
	},
	methods: {
		customerInit() {
			let actorParams = {
				id: this.$route.params.actorId
			}
			this.$store.dispatch('customerInfoByActorId', actorParams).then(()=>{
				this.customerInfoByActorId.email=this.customerInfoByActorId.email.address;
			})
			let customerParams = {
				id: this.$route.params.customerId
			}
			this.$store.dispatch('customerInfoByCustomerId', customerParams);
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
							
							this.customerInit();
							this.dialogFormVisible = false;
							
						} else {
							this.customerInit();
							this.$message.error('修改失败');
						}
					});
				}
			});
		},
		accountOperation() {
			if (this.customerInfoByActorId.status == 1) {
				this.dialogClosureVisible = true;
			} else {
				this.actor.status = 1;
				this.actor.actorId = this.customerInfoByActorId.id;
				this.$store.dispatch('system_closureUser', this.actor).then(() => {
					if (this.systemClosureUser.success) {
						this.$message({
							message: '激活成功！',
							type: 'success'
						})
						this.customerInit();
						this.dialogFormVisible = false;
					} else {
						this.$message.error('激活失败');
					}
				})
			}
		},
		closure() {
			this.$refs['actor'].validate((valid) => {
				if (valid) {
					this.actor.status = 2;
					this.actor.actorId = this.customerInfoByActorId.id;
					this.$store.dispatch('system_closureUser', this.actor).then(() => {
						if (this.systemClosureUser.success) {
							this.$message({
								message: '封禁成功！',
								type: 'success'
							})
							this.customerInit();
							this.cancel('actor');
							this.dialogClosureVisible = false;
						} else {
							this.$message.error('封禁失败');
						}
					})
				}
			});
		},
		reset() {
			this.$confirm('此操作将重置客户登录口令, 是否继续?', '提示', {
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
						this.resetPassword=JSON.parse(this.resetLoginPasswordStatus.objectLiteral);
						this.resetPasswordVisible = true;
						this.customerInit();
					} else {
						this.$message.error('重置口令失败');
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消重置'
				});
			});
		},
		cancel(formName) {
			this.$refs[formName].resetFields();
			this.dialogClosureVisible = false;
			// this.dialogFormVisible = false;
		}
	}
}
</script>


