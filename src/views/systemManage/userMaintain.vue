<style>
.del-btn.el-icon-delete2:before {
    font-size: 20px;
    cursor: pointer;
}
.del-btn{vertical-align: top;margin-left: 5px;}
</style>
<template>
    <div id="systemMaintain">
        <!--搜索-->
        <div class="search-box">
            <div class="output">
                <el-input placeholder="姓名" icon="search" v-model.trim="search_value" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="date-box">
               <el-button class="el-button el-button--primary" @click="dialogUserVisible = true">添加用户
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
                <el-table-column prop="mobileNumber" label="手机号">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column  label="Email">
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
        <div class="p-form">
            <el-dialog title="添加账号" :visible.sync="dialogUserVisible" @close="cancel" :close-on-click-modal="false">
                <el-form :model="addUser" :rules="rule" ref="addUser">
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="addUser.mobileNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="addUser.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
                        <el-input v-model="addUser.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" :label-width="formLabelWidth" prop="roles">
                        <el-select multiple v-model="addUser.roles" clearable placeholder="请选择" style="width:100%;">
                            <el-option v-for="item in systemRole" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="登录口令" :label-width="formLabelWidth" prop="loginPassword">
                        <el-input v-model="addUser.loginPassword" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="口令确认" :label-width="formLabelWidth" prop="psw1">
                        <el-input v-model="addUser.psw1" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="client">保 存</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 编辑用戶弹窗 -->
        <div class="p-form">
            <el-dialog title="编辑账号" :visible.sync="dialogeditUserVisible" @close="quit" :close-on-click-modal="false">
                <el-form :model="editUser" :rules="editRule" ref="editUser">
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="editUser.mobileNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="editUser.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
                        <el-input v-model="editUser.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" :label-width="formLabelWidth" prop="roles">
                        <el-select multiple v-model="editUser.roles" clearable placeholder="请选择" style="width:100%;">
                            <el-option v-for="item in systemRole" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                        <el-checkbox v-model="checked" @change="changeCommand">变更口令</el-checkbox>
                    </el-form-item>
                    <el-form-item v-if="command" label="登录口令" :label-width="formLabelWidth" prop="loginPassword">
                        <el-input v-model="editUser.loginPassword" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item v-if="command" label="口令确认" :label-width="formLabelWidth" prop="psw1">
                        <el-input v-model="editUser.psw1" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
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
    
    </div>
</template>
<script>
import pagination from '../../components/common/pagination'
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
		let validatePass = (rule, value, callback) => {
			if (!value||value === '') {
				callback(new Error('请输入登录口令'))
			} else {
				if (this.addUser.psw1 !== '') {
					this.$refs.addUser.validateField('psw1')
				}
				callback()
			}
		}
		let validatePass2 = (rule, value, callback) => {
			if (!value||value === '') {
				callback(new Error('请再次输入登录口令'))
			} else if (value !== this.addUser.loginPassword) {
				callback(new Error('两次输入的登录口令不一致!'))
			} else {
				callback()
			}
		}
		let validatePass3 = (rule, value, callback) => {
			if (!value||value === '') {
				callback(new Error('请输入登录口令'))
			} else {
				if (this.editUser.psw1 !== '') {
					this.$refs.editUser.validateField('psw1')
				}
				callback()
			}
		}
		let validatePass4 = (rule, value, callback) => {
			if (!value||value === '') {
				callback(new Error('请再次输入登录口令'))
			} else if (value !== this.editUser.loginPassword) {
				callback(new Error('两次输入的登录口令不一致!'))
			} else {
				callback()
			}
		}
		return {
			command: false,
			checked: false,
			roles: [],
			search_value: '',
			formLabelWidth: '100px',
			dialogUserVisible: false,
			dialogClosureVisible: false,
			dialogeditUserVisible: false,
			closureUser: {
				rejection: '',
				status: '',
				actorId: '',
			},
			addUser: {
				mobileNumber: '',
				name: '',
				email: '',
				loginPassword: '',
				roles: []
			},
			editUser: {
				mobileNumber: '',
				name: '',
				email: '',
				loginPassword: '',
				roles: [],
			},
			rule: {
				mobileNumber: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
					{ pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				email: [
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
				],
				roles: [
					{ required: true, type: 'array', message: '请至少选择一个角色', trigger: 'blur,change' }
				],
				loginPassword: [
					{ required: true, validator: validatePass, trigger: 'blur' }
				],
				psw1: [
					{ required: true, validator: validatePass2, trigger: 'blur' }
				],
			},
			editRule: {
				mobileNumber: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
					{ pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				email: [
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
				],
				roles: [
					{ required: true, type: 'array', message: '请至少选择一个角色', trigger: 'blur,change' }
				],
				loginPassword: [
					{ required: true, validator: validatePass3, trigger: 'blur' }
				],
				psw1: [
					{ required: true, validator: validatePass4, trigger: 'blur' }
				],
			},
			rule2: {
				rejection: [
					{ required: true, message: '请填写封禁理由', trigger: 'blur' }
				]
			},

		}
	},
	methods: {
		//新增的取消
		cancel() {
			this.$refs['addUser'].resetFields()
			this.addUser = {
				mobileNumber: '',
				name: '',
				email: '',
				loginPassword: '',
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
				mobileNumber: '',
				name: '',
				email: '',
				loginPassword: '',
				roles: []
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
				if (valid) {
					this.$store.dispatch('system_createUser', this.addUser).then(() => {
						if (this.systemCreate.success) {
							this.$message({
								message: '添加账号成功！',
								type: 'success'
							})
							this.$store.dispatch('system_getManageList', this.param)
							this.dialogUserVisible = false
						} else {
							this.$message('添加失败')
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
			this.editUser.email = data.email&&data.email.address
			this.roles = []
			this.checked = false
			this.editUser.loginPassword = ''
			this.editUser.psw1 = ''
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
			if (this.editUser.loginPassword == '') {
				this.editUser.type = 0
			} else {
				this.editUser.type = 1
			}
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
								if(this.systemUpdate.information==''){
									this.$message.warning(this.systemUpdate.information)
								}else{
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
