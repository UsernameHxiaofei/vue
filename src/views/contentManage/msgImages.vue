<template>
	<div class="banner-manager" id="msg-images">
		<div class="container-width">
			<div class="button-box">
				<el-button type="primary" @click="dialogFormVisible=true">添加轮播图</el-button>
			</div>
			<el-row :gutter="20">
				<div v-for="(value,index) in bannerList.records">
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<dl class="banner-detail">
								<dt>
									<img v-imageBiger :src="value.image_parh" class="banner-i">
								</dt>
								<dd>
									<p>{{value.upload_time}}
										<span class="file-size fr">{{Number(value.image_size/1024/1024).toFixed(2)}}Mb</span>
									</p>
									<p>上传人：{{value.upload_user_name}}
										<span class="file-size fr">显示顺序：{{value.show_sequence}}</span>
									</p>
									<p>类型：{{value.banner_type}}
										
									</p>
									<span class="delete-img">
										<i style="font-size: 30px;" class="iconfont icon-guanbi " @click="deleteImage(value.banner_id)"></i>
									</span>
								</dd>
							</dl>
						</div>
					</el-col>
				</div>
			</el-row>
			<div class="block fr">
				<pagination :total="bannerList.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
			</div>
		</div>
		<el-dialog title="添加轮播图" :visible.sync="dialogFormVisible" @close="resetForm" :close-on-click-modal="false">
			<el-form :model="fileParam" ref="fileParam" :label-width="'140px'" label-position="left">
				<el-form-item label="轮播图类型" prop="" :rules="[{ required: true, message: '请设置轮播图链接地址', trigger: 'blur,change' }]">
					<template>
						<el-radio v-model="fileParam.picType" :label="1">平台</el-radio>
						<el-radio v-model="fileParam.picType" :label="2">微信</el-radio>
					</template>
				</el-form-item>
				<el-form-item label="上传图片" prop="imageUrl" :rules="[{ required: true, message: '请上传轮播图', trigger: 'blur,change' }]">
					<el-button type="default" @click="chooseFile">选择图片</el-button>
					<br>
					<img class="uploadImage" v-if="fileParam.imageUrl&&fileParam.imageUrl.length>0" :src="fileParam.imageUrl" :alt="fileParam.bannerName">
					<input style="display:none;" accept="image/jpeg,image/gif,image/png" type="file" name="file" id="uploadFileForBanner" @change="getFile">
				</el-form-item>
				<el-form-item label="轮播图链接地址" prop="targetSrc" :rules="[{required: true, message: '请设置轮播图链接地址', trigger: 'blur,change' }]">
					<el-input v-model="fileParam.targetSrc" :maxlength="255"></el-input>
				</el-form-item>
				<el-form-item label="按钮显示文本" prop="btnText" v-if="fileParam.picType==1" :rules="[{message: '请设置按钮显示文本', trigger: 'blur,change' }]">
					<el-input v-model="fileParam.btnText" :maxlength="64"></el-input>
				</el-form-item>
				<el-form-item label="按钮链接地址" prop="btnUrl" v-if="fileParam.picType==1" :rules="[{message: '请设置按钮链接地址', trigger: 'blur,change' }]">
					<el-input v-model="fileParam.btnUrl" :maxlength="255"></el-input>
				</el-form-item>
				<el-form-item label="按钮顶部外边距" prop="btnTop" v-if="fileParam.picType==1" :rules="[{type:'number',message: '请设置按钮顶部外边距', trigger: 'blur,change' }]">
					<el-input-number v-model.number="fileParam.btnTop" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="按钮左外边距" prop="btnLeft" v-if="fileParam.picType==1" :rules="[{type:'number',message: '请设置按钮左外边距', trigger: 'blur,change' }]">
					<el-input-number v-model.number="fileParam.btnLeft" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="轮播顺序" prop="show_sequence" :rules="[{required: true,type:'number', message: '请设置轮播顺序', trigger: 'blur' }]">
					<el-input-number v-model.number="fileParam.show_sequence" :min="1"></el-input-number>
					<br>
					<p style="color:gray">数值越大显示顺序越前面</p>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm">取 消</el-button>
				<el-button type="primary" :loading="adding" @click="submitForm">添加</el-button>
			</div>
		</el-dialog>
	</div>
</template>


<script>
	import pagination from '../../components/common/pagination.vue'
	export default {
		name: 'msgImages',
		components: {
			'pagination': pagination
		},
		beforeMount() {
			this.param = {
				pageSize: this.pageSize,
				pageNo: this.pageNo
			}
			this.$store.dispatch('show_imageList', this.param)
		},
		computed: {
			bannerList: function () {      //show_imageList
				if (!this.$store.state.content.showImageList) {
					return { records: [], count: 0 }
				} else {
					return this.$store.state.content.showImageList
				}
			},
			bannerUpload: function () {    //banner_uploadByFile
				return this.$store.state.content.uploadBanner
			},
			bannerDelete: function () {    //delete_bannerById
				return this.$store.state.content.deleteBanner
			},
		},
		data() {
			return {
				adding: false,
				dialogFormVisible: false,
				uploadList: [],
				param: {},
				fileParam: {
					show_sequence: 1,
					targetSrc: '',
					imageUrl: '',
					picType: 1,
				},
				pageNo: 1,
				pageSize: 10,
				picfile: {}
			}
		},
		methods: {
			submitForm() {
				this.$refs['fileParam'].validate((valid) => {
					if (valid) {
						let fd = new FormData()
						fd.append('file', document.getElementById('uploadFileForBanner').files[0])
						fd.append('bannerName', this.fileParam.bannerName)
						fd.append('magType', this.fileParam.magType)
						fd.append('picType', this.fileParam.picType)
						fd.append('uploadUseId', this.fileParam.uploadUseId)
						fd.append('bannerSize', this.fileParam.bannerSize)
						fd.append('targetSrc', this.fileParam.targetSrc)
						fd.append('show_sequence', this.fileParam.show_sequence)
						fd.append('btnText', this.fileParam.btnText)
						fd.append('btnUrl', this.fileParam.btnUrl)
						fd.append('btnTop', this.fileParam.btnTop)
						fd.append('btnLeft', this.fileParam.btnLeft)
						this.adding = true
						this.$http.post('/ajax/banner_uploadByFile', fd).then((res) => {
							this.adding = false
							if (!res.body.success) {
								this.$message.warning(res.body.information)
							} else {
								this.$message.success(res.body.information)
								this.resetForm()
								this.$store.dispatch('show_imageList', this.param)
							}
						})
					}
				})
			},
			submitUpload() {
				this.$refs.upload.submit()
			},
			chooseFile() {
				document.getElementById('uploadFileForBanner').click()
			},
			getFile() {
				let self = this
				let file = document.getElementById('uploadFileForBanner').files[0]
				let fileSize = file.size / 1024 / 1024
				let fileType = file.type
				let isPic = false
				if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif') {
					isPic = true
				}
				const isLt5 = fileSize < 5
				if (!isPic) {
					this.$message.error('上传的图片格式为png、jpg、gif!')
					return isPic
				} else if (!isLt5) {
					this.$message.error('上传图片大小不能超过 5M!')
					return isLt5
				} else {
					this.fileParam.bannerName = file.name
					this.fileParam.magType = 1
					this.fileParam.uploadUseId = this.$store.state.login.actor.id
					this.fileParam.bannerSize = file.size
				}
				let fr = new FileReader()
				fr.onload = function () {
					self.fileParam.imageUrl = this.result
				}
				fr.readAsDataURL(file)
				fr = null
			},
			resetForm() {
				this.$refs['fileParam'].resetFields()
				this.dialogFormVisible = false
			},
			handleSizeChange(val) {
				this.param.pageSize = val
				this.param.pageNo = 1
				this.$store.dispatch('show_imageList', this.param)
			},
			handleCurrentChange(val) {
				this.param.pageNo = val
				this.$store.dispatch('show_imageList', this.param)
			},
			deleteImage(id) {
				this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let that = this
					this.param.id = id
					this.param.deletor = this.$store.state.login.actor.name
					this.$store.dispatch('delete_bannerById', this.param).then(() => {
						that.$store.dispatch('show_imageList', this.param)
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '删除失败!'
						})
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


<style scoped>
	.uploadImage {
		margin: 20px auto 10px 0;
		width: 400px;
	}

	.banner-detail {
		position: relative;
	}

	.el-upload__input {
		display: none !important;
	}

	.banner-manager .button-box {
		padding: 15px 0
	}

	.container-width {
		width: 750px;
		margin: auto;
	}

	.banner-detail .delete-img {
		top: -8px;
		right: 0px;
		width: 30px;
		height: 30px;
		color: white;
		position: absolute;
		cursor: pointer;
		/*display:none;*/
	}

	.banner-detail .delete-img:hover {
		color: #06ccb7;
		/*display:none;*/
	}

	.banner-detail dt {
		overflow: hidden
	}

	.banner-detail .banner-i {
		width: 100%;
		height: 200px;
	}

	.banner-detail dd>p {
		margin: 0;
	}

	.banner-detail dd {
		margin-top: 10px;
	}

	.banner-detail dd span {
		float: right;
	}

	.up-img {
		position: relative;
	}

	.up-img input[type='file'] {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}

	.block {
		margin-bottom: 20px;
	}
</style>