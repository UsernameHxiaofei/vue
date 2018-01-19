<template>
	<div style="width:100%;height: 100%;background: #fff;margin: auto;padding:20px;float: left" class="Clear">
		<div style="width:40%;padding: 15px; border: 1px solid #c1c1c1;float:left;margin: 20px;" v-for="item in postalAddressList">
			<div style="height: 30px;line-height: 30px;">
				<span><label>收件人：</label>{{item.receiver}}</span>
				<div style="float: right;">
					<el-button style="width: 70px;" @click="updatePostalAddress(item)">修改</el-button>
					<el-button style="width: 70px;" @click="deletePostalAddress(item.id)">删除</el-button>
				</div>
			</div>
			<div style="height: 30px;line-height: 30px;">
				<span><label>手机号：</label>{{item.receiverMobileNumber}}</span>
			</div>
			<div style="height: 30px;line-height: 30px;">
				<span><label>地址 ：</label>{{item.receiverRegionCode|address}}{{item.receiverAddress}}</span>
			</div>
			
		</div>

		<div style="width:40%;padding: 15px; border: 1px solid #c1c1c1;float:left;margin: 20px;height: 70px;">
			<div style="text-align: center;">
				<el-button @click="addPostalAddress" :plain="true" type="success">添加新地址
					<i class="el-icon-plus"></i>
				</el-button>
			</div>
		</div>
		<el-dialog class="p-form" :title="title" :visible.sync="dialogFormVisible" @close="cancel" :close-on-click-modal="false">
			<el-form :rules="rules" ref="postalAddress" :model="postalAddress" label-width="90px">
				<el-form-item label="收件人" prop="receiver">
					<el-input placeholder="请填写真实姓名" v-model="postalAddress.receiver" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="receiverMobileNumber">
					<el-input placeholder="请填写手机号" v-model="postalAddress.receiverMobileNumber" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="所在地区" prop="selectedOptions">
					<el-cascader :options="options" v-model="postalAddress.selectedOptions">
					</el-cascader>
				</el-form-item>
				<el-form-item label="详细地址" prop="receiverAddress">
					<el-input placeholder="请填写准确的收货地址" v-model="postalAddress.receiverAddress" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="onSubmit">确 认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { getSelectArray} from '../../../util/index.js'
export default {
	components: {
	},
	computed: {
		postalAddressList: function () {
			return this.$store.state.customer.postalAddressList
		},
		postalAddressUpdate: function () {
			return this.$store.state.customer.postalAddressUpdate
		},
		postalAddressAdd: function () {
			return this.$store.state.customer.postalAddressAdd
		},
		postalAddressDelete: function () {
			return this.$store.state.customer.postalAddressDelete
		},
	},
	beforeMount() {
		this.postalAddressInit()
	},
	data() {
		return {
			options: regionData,
			selectedOptions: [],
			dialogFormVisible: false,
			postalAddress: {
			},
			rules: {
				receiver: [
					{ required: true, message: '请输入收件人名称', trigger: 'blur' }
				],
				receiverMobileNumber: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
					{ pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
				],
				selectedOptions: [
					{ required: true, message: '请输入收件地区', trigger: 'blur,change', type: 'array' }
				],
				receiverAddress: [
					{ required: true, message: '请输入详细地址', trigger: 'blur' }
				],
			},
			title: '添加新地址',

		}
	},
	methods: {
		postalAddressInit() {
			let postalAddressParams = {
				id: this.$route.params.actorId
			}
			this.$store.dispatch('postalAddressByActorId', postalAddressParams)
		},
		onSubmit() {
			this.$refs['postalAddress'].validate((valid) => {
				if (valid) {
					this.postalAddress.receiverRegionCode = this.postalAddress.selectedOptions[2]
					if (this.postalAddress.id) {
						this.$store.dispatch('update_postalAddress', this.postalAddress).then(() => {
							if (this.postalAddressUpdate.success) {
								this.$message({
									message: '编辑成功！',
									type: 'success'
								})
								this.postalAddressInit()
								this.cancel()
							} else {
								this.$message.error('编辑失败')
								this.postalAddressInit()
							}
						})
					} else {
						this.$store.dispatch('add_postalAddress', this.postalAddress).then(() => {
							if (this.postalAddressAdd.success) {
								this.$message({
									message: '添加成功！',
									type: 'success'
								})
								this.postalAddressInit()
								this.cancel()
							} else {
								this.$message.error('添加失败')
							}
						})
					}

				} else {
					return false
				}
			})
		},
		addPostalAddress() {
			this.title = '新增收件地址'
			this.postalAddress = {
				id: '',
				receiver: '',
				receiverMobileNumber: '',
				receiverRegionCode: '',
				selectedOptions: [],
				receiverAddress: '',
				actorId: this.$route.params.actorId,
			},
			this.dialogFormVisible = true
		},
		updatePostalAddress(item) {
			this.title = '修改收件地址'
			this.postalAddress = item
			if (this.postalAddress.receiverRegionCode) {
				this.postalAddress.selectedOptions = getSelectArray(this.postalAddress.receiverRegionCode)
			}
			this.dialogFormVisible = true
		},
		cancel() {
			this.$refs['postalAddress'].resetFields()
			this.dialogFormVisible = false
		},
		deletePostalAddress(postalAddressId) {
			this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let deleteParams = {
					id: postalAddressId
				}
				this.$store.dispatch('delete_postalAddress', deleteParams).then(() => {
					if (this.postalAddressDelete.success) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.postalAddressInit()
					} else {
						this.$message.error('删除失败!')
					}
				})

			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		}
	}

}
</script>