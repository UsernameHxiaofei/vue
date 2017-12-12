//企业信息
<style lang="" scoped>
	.my-form .el-form-item {
		margin-bottom: 10px;
	}

	.my-form .el-upload__input {
		display: none !important;
	}

	body {
		background-color: #fcfcfc;
	}

	.content {
		background-color: #fcfcfc;
	}

	.hangjiashenhe {
		height: 100%;
		margin: 0 auto;
		background-color: #fff;
		font-size: 14px;
	}

	.hangjiashenhe ul {
		margin-left: 100px;
		padding-top: 16px;
		list-style: none;
	}

	.hangjiashenhe li {
		margin-top: 10px;
	}

	.hangjiashenhe label {
		width: 120px;
		font-weight: 400;
		color: #999;
		text-align: right;
		margin-right: 20px;
		float: left;
	}

	.hangjiashenhe li>span {
		display: inline-block;
		width: 300px;
		color: #333;
	}

	.hangjiashenhe .zhuanzhuhangye {
		padding: 10px;
		border: 1px solid #ccc;
	}

	.zhuanzhuhangye span {
		display: inline-block;
		font-size: 13px;
		margin-right: 10px;
	}

	.hangjiashenhe .btn-box-c {
		padding: 15px;
		text-align: center
	}

	.upload-demo {
		position: relative;
	}
</style>
<template>
	<div style="width:100%;height: 100%;background: #fff;margin: auto;">

		<div class="hangjiashenhe" style="position: relative;" v-if="status">
			<div v-if="!enterpriseInfo.enterpriseName" style=" height: 100px;text-align: center; line-height: 100px; font-size: 18px;">
				未添加企业信息
			</div>
			<el-button type="primary" style="position: absolute; right: 60px;top: 30px;" @click="addEnterpriseInfo">{{enterpriseInfo.id?"编辑":"添加"}}</el-button>

			<ul v-if="enterpriseInfo.enterpriseName">
				<li>
					<label>企业名称</label>
					<span>{{enterpriseInfo.enterpriseName}}</span>
				</li>
				<li>
					<label>统一社会信用代码</label>
					<span>{{enterpriseInfo.creditCode}}</span>
				</li>
				<li>
					<label>所在地区</label>
					<span>{{enterpriseInfo.regionCode|address}}</span>
				</li>
				<li>
					<label>企业形象图</label>
					<span>
						<img v-imageBiger style=" width: 200px;" :src="enterpriseInfo.imageURL">
					</span>
				</li>
				<li>
					<label>企业简介</label>
					<span>{{enterpriseInfo.profile}}</span>
				</li>
				<li>
					<label>已投项目</label>
					<span>{{enterpriseInfo.investment}}</span>
				</li>
			</ul>
		</div>

		<el-form v-if="!status" ref="enterpriseInfo" class="my-form" :model="enterpriseInfo" label-width="130px" style="width: 70%;margin:auto;padding: 20px 0;">
			<el-form-item label="企业名称" prop="enterpriseName">
				<el-input v-model="enterpriseInfo.enterpriseName"></el-input>
			</el-form-item>
			<el-form-item label="统一社会信用代码" prop="creditCode">
				<el-input v-model="enterpriseInfo.creditCode"></el-input>
			</el-form-item>
			<el-form-item label="所在地区">
				<el-cascader expand-trigger="click" style="width:280px;" change-on-select clearable :options="options" v-model="selectedOptions">
				</el-cascader>
			</el-form-item>
			<el-form-item label="企业形象图" prop="img">
				<img v-if="!!enterpriseInfo.imageURL" style=" width: 200px;" :src="enterpriseInfo.imageURL" alt="企业形象图">
				<br>
				<el-button size="small" type="primary" @click="editEnterpriseImgChange=true">上传企业形象图</el-button>
			</el-form-item>
			<el-form-item label="企业简介" prop="profile">
				<el-input type="textarea" :rows="6" v-model="enterpriseInfo.profile"></el-input>
			</el-form-item>
			<el-form-item label="已投项目" prop="investment">
				<el-input type="textarea" :rows="6" v-model="enterpriseInfo.investment"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button style="width: 120px;" @click="cancel">取消</el-button>

				<el-button style="width: 120px;" type="primary" @click="onSubmit">保存</el-button>
			</el-form-item>
		</el-form>
		<div class="p-form">
			<el-dialog title="上传企业形象图" :visible.sync="editEnterpriseImgChange" :close-on-click-modal="false">
				<imageCropper @result="uploadSuccess"></imageCropper>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import imageCropper from '../../../components/common/cropper.vue'
import { regionData } from 'element-china-area-data'
import { getSelectArray } from '../../../util/index.js'
export default {
	computed: {
		enterpriseInfo: function () {
			return this.$store.state.customer.enterpriseInfoByActorId
		},
		enterpriseInfoAdd: function () {
			return this.$store.state.customer.enterpriseInfoAdd
		},
		enterpriseInfoUpdate: function () {
			return this.$store.state.customer.enterpriseInfoUpdate
		}
	},
	components: {
		imageCropper
	},
	beforeMount() {
		this.enterpriseInit()
	},
	data() {
		return {
			status: true,
			editEnterpriseImgChange: false,
			options: regionData,
			selectedOptions: [],
			uploadList: [],
			dialogImageUrl: '',
			fileParam: {},
		}
	},
	methods: {
		enterpriseInit() {
			let enterpriseParams = {
				id: this.$route.params.actorId
			}
			this.$store.dispatch('enterpriseInfoByActorId', enterpriseParams).then(() => {
				if (this.enterpriseInfo.regionCode) {
					this.selectedOptions = getSelectArray(this.enterpriseInfo.regionCode)
				}
			})
		},
		addEnterpriseInfo() {
			this.status = false
		},
		onSubmit() {
			if (this.selectedOptions) {
				this.enterpriseInfo.regionCode = this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : ''
			}
			if (this.enterpriseInfo.id) {
				this.$store.dispatch('update_enterpriseInfo', this.enterpriseInfo).then(() => {
					if (this.enterpriseInfoUpdate.success) {
						this.$message({
							message: '编辑成功！',
							type: 'success'
						})
						this.status = true
					} else {
						this.$message.error('编辑失败')
						this.cancel()
					}
				})
			} else {
				this.enterpriseInfo.actorId = this.$route.params.actorId
				this.enterpriseInfo.id = ''
				this.$store.dispatch('add_enterpriseInfo', this.enterpriseInfo).then(() => {
					if (this.enterpriseInfoAdd.success) {
						this.$message({
							message: '添加成功！',
							type: 'success'
						})
						this.status = true
					} else {
						this.$message.error('编辑失败')
						this.cancel()
					}
				})
			}
		},
		cancel() {
			let enterpriseParams = {
				id: this.$route.params.actorId
			}
			this.$store.dispatch('enterpriseInfoByActorId', enterpriseParams)
			this.status = true
		},
		//上传成功时返回的数据
		uploadSuccess(data) {
			this.enterpriseInfo.imageURL = data
			this.editEnterpriseImgChange = false
		},
	}
}    
</script>