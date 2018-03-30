<style>
	.del-btn.el-icon-delete2:before {
		font-size: 20px;
		cursor: pointer;
	}

	.del-btn {
		vertical-align: top;
		margin-left: 5px;
	}
</style>
<template>
	<div id="systemMaintain">
		<!--搜索-->
		<div class="search-box">
			<div class="output">
				<el-input placeholder="标志码|手机号|名称|Email" icon="search" v-model.trim="search_value" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
				</el-input>
			</div>
			<div class="date-box">
				<el-button class="el-button el-button--primary" @click="dialogUserVisible = true">添加账号
					<i class="el-icon-plus"></i>
				</el-button>
			</div>

		</div>
		<!--表格-->
		<div class="my-table">
			<el-table :data="systemManageList.list" stripe border style="width: 100%">
				<el-table-column width="30">
				</el-table-column>
				<el-table-column type='index' width="100" label="序号">
				</el-table-column>
				<el-table-column prop='identNumber' width="180" label="标识码">
				</el-table-column>
				<el-table-column   label="类别">
						<template slot-scope="scope">
								{{scope.row.category|actorCategory}}
						</template>
				</el-table-column>
				<el-table-column prop="mobileNumber" label="手机号">
				</el-table-column>
				<el-table-column prop="name" label="名称">
				</el-table-column>
				<el-table-column label="Email">
					<template slot-scope="scope">
						{{(scope.row.email&&scope.row.email.address)||''}}
					</template>
				</el-table-column>
				<el-table-column prop="roles" label="角色">
					<template slot-scope="scope">
						<div v-for="(item,index) in scope.row.roles">
							{{ item.name+" "}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="createdTime" label="创建时间">
				</el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<span v-if="scope.row.status==0">无效</span>
						<span v-if="scope.row.status==1">正常</span>
						<span v-if="scope.row.status==2">已封禁</span>
					</template>
				</el-table-column>
				<el-table-column>
					<template slot-scope="scope">
						<span title="禁用/激活" class="normalize" :class="{ active: scope.row.status==2 }" @click="openClosure(scope.row)">
						</span>
						<span title="编辑账号" class="edits" @click="getData(scope.row)">
						</span>
						<span title="删除账号" class="el-icon-delete2 del-btn" @click="delBtn(scope.row)"></span>
					</template>
				</el-table-column>
				<el-table-column width="30">
				</el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<div class="page-box clearfix">
			<div class="page-wrap">
				<pagination :total="systemManageList.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
			</div>
		</div>
		<!-- 添加用戶弹窗 -->
		<div>
			<el-dialog title="添加账号" :visible.sync="dialogUserVisible" @close="cancel" :close-on-click-modal="false">
				<el-form :model="addUser" :label-width="formLabelWidth" :rules="rule" ref="addUser">
					<el-form-item label="标志码"  required prop="indetNumber">
						<el-input v-model="addUser.identNumber" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="账号类型"  prop="category">
						<el-select v-model.number="addUser.category" placeholder="请选择账号类型">
							<el-option v-for="item in actorCategorys" :key="item.value" :label="item.label" :disabled="item.disabled" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="addUser.category==4?'代表人手机号':'手机号'"  prop="mobileNumber">
						<el-input v-model="addUser.mobileNumber" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item :label="addUser.category==4?'企业名称':'名称'"  prop="name">
						<el-input v-model="addUser.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="Email" prop="email">
						<el-input v-model="addUser.email" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="角色"  prop="roles">
						<el-select multiple v-model="addUser.roles" clearable placeholder="请选择" style="width:100%;">
							<el-option v-for="item in systemRole" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel">取 消</el-button>
					<el-button type="primary" @click="client">保 存</el-button>
				</div>
			</el-dialog>
		</div>
		<!-- 编辑用戶弹窗 -->
		<div >
			<el-dialog title="编辑账号" :visible.sync="dialogeditUserVisible" @close="quit" :close-on-click-modal="false">
				<el-form :model="editUser" :label-width="formLabelWidth" :rules="editRule" ref="editUser">
					<el-form-item label="标志码" required prop="indetNumber">
						<el-input v-model="editUser.identNumber" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="账号类型"  prop="category">
							<el-select v-model.number="editUser.category" placeholder="请选择账号类型">
								<el-option v-for="item in actorCategorys" :key="item.value" :label="item.label" :disabled="item.disabled" :value="item.value">
								</el-option>
							</el-select>
					</el-form-item>
					<el-form-item :label="editUser.category==4?'代表人手机号':'手机号'"  prop="mobileNumber">
						<el-input v-model="editUser.mobileNumber" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item :label="editUser.category==4?'企业名称':'名称'" prop="name">
						<el-input v-model="editUser.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="Email"  prop="email">
						<el-input v-model="editUser.email" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="角色"  prop="roles">
						<el-select multiple v-model="editUser.roles" clearable placeholder="请选择" style="width:100%;">
							<el-option v-for="item in systemRole" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="success" @click="reset">重置密码</el-button>
					<el-button @click="quit">取 消</el-button>
					<el-button type="primary" @click="editClient">保 存</el-button>
				</div>
			</el-dialog>
		</div>
		<!-- 封禁理由弹窗 -->
		<div class="p-form">
			<el-dialog title="封禁理由" :visible.sync="dialogClosureVisible" @close="cancelBtn" :close-on-click-modal="false">
				<el-form :model="closureUser" :rules="rule2" ref="closureUser">
					<el-form-item prop="rejection" label="封禁理由">
						<el-input class="inputing" v-model="closureUser.rejection" type="textarea" rows='5' placeholder="请输入封禁理由..."></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancelBtn">取 消</el-button>
					<el-button type="primary" @click="closure">保 存</el-button>
				</div>
			</el-dialog>
		</div>
		<el-dialog title="请记住这个口令" :visible.sync="resetPasswordVisible" @close="resetPasswordVisible=false" :close-on-click-modal="false">
			<el-form>
				<el-form-item  label="重置口令：">
					<span style="color:red">{{resetPassword}}</span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import pagination from '../../components/common/pagination'
	import actorCategorys from '../../constant/actorCategory'



	export default {
		components: {
			pagination
		},
		computed: {
			systemManageList: function () {
				return this.$store.state.system.systemManageList
			},
			systemRole: function () {
				return this.$store.state.system.systemRole
			},
			systemCreate: function () {
				return this.$store.state.system.systemCreateUser
			},
			systemUpdate: function () {
				return this.$store.state.system.systemUpdateUser
			},
			systemClosure: function () {
				return this.$store.state.system.systemClosureUser
			},
			actor: function () {
				return this.$store.state.login.actor
			},
			resetLoginPasswordStatus: function () {
				return this.$store.state.customer.resetLoginPasswordStatus
			},
		},
		beforeMount() {
			this.param = {
				name: this.search_value,
				pageNo: 1,
				pageSize: 10
			}
			this.$store.dispatch('system_getManageList', this.param)
			this.$store.dispatch('system_roleInfo')
		},
		data() {
			return {
				command: false,
				checked: false,
				roles: [],
				search_value: '',
				resetPasswordVisible:false,
				resetPassword:'',
				formLabelWidth: '120px',
				dialogUserVisible: false,
				dialogClosureVisible: false,
				dialogeditUserVisible: false,
				closureUser: {
					rejection: '',
					status: '',
					actorId: '',
				},
				actorCategorys,
				addUser: {
					identNumber: '',
					mobileNumber: '',
					name: '',
					email: '',
					category:5,
					roles: []
				},
				editUser: {
					identNumber: '',
					mobileNumber: '',
					name: '',
					email: '',
					category: 5,
					roles: []
				},
				rule: {
					identNumber:[
						{required: true,message:'', trigger: 'blur'}
					],
					mobileNumber: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
						{ pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					],
					email: [
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
					],
					roles: [
						{ required: true, type: 'array', message: '请至少选择一个角色', trigger: 'blur,change' }
					]
				},
				editRule: {
					mobileNumber: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
						{ pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					],
					email: [
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
					],
					roles: [
						{ required: true, type: 'array', message: '请至少选择一个角色', trigger: 'blur,change' }
					]
				},
				rule2: {
					rejection: [
						{ required: true, message: '请填写封禁理由', trigger: 'blur' }
					]
				},

			}
		},
		methods: {
			reset() {
				this.$confirm('此操作将重置客户登录口令, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let resetParam = {
						id: this.editUser.id
					}
					this.$store.dispatch('resetLoginPwById', resetParam).then(() => {
						if (this.resetLoginPasswordStatus.head.success) {
							this.$message({
								message: '重置密码成功！',
								type: 'success'
							})
							this.resetPassword=JSON.parse(this.resetLoginPasswordStatus.objectLiteral)
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
			//新增的取消
			cancel() {
				this.$refs['addUser'].resetFields()
				this.addUser = {
					identNumber: '',
					mobileNumber: '',
					name: '',
					email: '',
					category: 5,
					roles: []
				}
				this.$store.dispatch('system_getManageList', this.param)
				this.dialogUserVisible = false
			},
			//编辑的取消
			quit() {
				this.dialogeditUserVisible = false
				this.$refs['editUser'].resetFields()
				this.editUser = {
					identNumber: '',
					mobileNumber: '',
					name: '',
					email: '',
					roles: [],
					category: 5
				}
				this.$store.dispatch('system_getManageList', this.param)
			},
			//封禁的取消
			cancelBtn() {
				this.$refs['closureUser'].resetFields()
				this.closureUser = {
					rejection: '',
					status: '',
					actorId: '',
				}
				this.$store.dispatch('system_getManageList', this.param)
				this.dialogClosureVisible = false
			},
			// 搜索
			handleIconClick() {
				this.param.name = this.search_value
				this.param.pageNo = 1
				this.$store.dispatch('system_getManageList', this.param)
			},
			// 分页
			handleSizeChange(size) {
				this.param.pageSize = size
				this.param.pageNo = 1
				this.$store.dispatch('system_getManageList', this.param)
			},
			handleCurrentChange(page) {
				this.param.pageNo = page
				this.$store.dispatch('system_getManageList', this.param)
			},
			// 保存添加用户
			client() {
				this.$refs['addUser'].validate((valid) => {
					console.log('asdad',this.addUser)
					if (valid) {
						this.$store.dispatch('system_createUser', this.addUser).then(() => {
							if (this.systemCreate) {
								this.$message({
									message: '添加账号成功！',
									type: 'success'
								})
								this.resetPassword=this.systemCreate
								this.resetPasswordVisible=true
								this.$store.dispatch('system_getManageList', this.param)
								this.dialogUserVisible = false
							} else {
								this.$message.warning('添加失败')
							}
						})
					} else {
						return false
					}
				})
			},
			// 点击编辑用户查询信息
			getData(data) {
				this.editUser = JSON.parse(JSON.stringify(data))
				this.editUser.email = data.email && data.email.address
				this.roles = []
				this.checked = false
				for (let i = 0; i < this.editUser.roles.length; i++) {
					this.roles[i] = this.editUser.roles[i].id
				}
				this.editUser.roles = this.roles
				this.dialogeditUserVisible = true
				this.changeCommand()
			},
			//变更口令
			changeCommand() {
				if (this.checked == true) {
					this.command = true
				} else {
					this.command = false
				}
			},
			//保存编辑用户
			editClient() {
				this.$refs['editUser'].validate((valid) => {
					if (valid) {
						if (this.editUser.id) {
							this.$store.dispatch('system_updateUser', this.editUser).then(() => {
								if (this.systemUpdate.success) {
									this.$message({
										message: '编辑用户成功！',
										type: 'success'
									})
									this.$store.dispatch('system_getManageList', this.param)
									this.dialogeditUserVisible = false
								} else {
									if (this.systemUpdate.information == '') {
										this.$message.warning(this.systemUpdate.information)
									} else {
										this.$message.warning('操作失败')
									}
								}
							})
						}
					} else {
						return false
					}
				})
			},
			//点击封禁
			openClosure(row) {
				this.closureUser.actorId = row.id
				if (row.status == 1) {
					this.closureUser.status = 2
					this.dialogClosureVisible = true
				} else {
					this.closureUser.status = 1
					this.$store.dispatch('system_closureUser', this.closureUser).then(() => {
						if (this.systemClosure.success) {
							this.$message({
								message: '激活成功！',
								type: 'success'
							})
							this.$store.dispatch('system_getManageList', this.param)
						} else {
							this.$message('激活失败')
						}
					})
				}


			},
			// 判断封禁用户是否成功
			closure() {
				this.$refs['closureUser'].validate((valid) => {
					if (valid) {
						this.$store.dispatch('system_closureUser', this.closureUser).then(() => {
							if (this.systemClosure.success) {
								this.$message({
									message: '您已成功提交封禁理由！',
									type: 'success'
								})
								this.$store.dispatch('system_getManageList', this.param)
								this.dialogClosureVisible = false
							} else {
								this.$message('封禁失败')
							}
						})
					} else {
						return false
					}
				})
			},
			delBtn(data) {
				this.$confirm('此操作将永久删除账户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let delParams = {
						rejection: '',
						status: 0,
						actorId: data.id,
					}
					if (data.id != this.actor.id) {
						this.$store.dispatch('system_closureUser', delParams).then(() => {
							if (this.systemClosure.success) {
								this.$message({
									message: '删除成功！',
									type: 'success'
								})
								this.$store.dispatch('system_getManageList', this.param)
							} else {
								this.$message('删除失败')
							}
						})
					} else {
						this.$message({
							type: 'info',
							message: '不能删除自己的账户！'
						})
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			}
		},
	}
</script>