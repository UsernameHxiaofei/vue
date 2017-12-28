<template>
	<div class="imageDialogCropper" ref="imageDialogCropper">
		<div :style="{height:getSize().h+'px',width:getSize().w+'px',margin:'0 auto',maxHeight:'300px',maxWidth:'300px'}">
			<imageCropper ref="cropper" style="margin:0 auto;width:100%;" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
			 :autoCrop="option.autoCrop" :canScale="option.canScale" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :autoCropWidth="option.autoCropWidth"
			 :autoCropHeight="option.autoCropHeight" @realTime="realTime">
			</imageCropper>
			<el-progress v-show="(completeRate!=100&&completeRate!=0)" :text-inside="true" :stroke-width="15" :percentage="completeRate"></el-progress>
		</div>
		<div class="operation-div">
			<el-button class="operationButton" @click="commit">确定</el-button>
			<el-button class="operationButton" type="primary" @click="selectImage">选择图片</el-button>
		</div>
		<form action="#" method="post">
			<input style="display: none" ref="cropperFileInput" type="file" name="file" accept="image/*"
			 @change="uploadImage" />
		</form>
	</div>
</template>
<style scoped>
	.operation-div {
		height: 60px;
		margin-top: 20px;
		border-top: 1px solid #eee;
	}

	.operationButton {
		float: right;
		margin: 10px 0 auto 20px;
	}
</style>
<script>
	import imageCropper from '../imageCropper/imageCropper'
	export default {
		name: 'imageDialogCropper',
		props: {
			op: {
				required: false,
				default: null
			}
		},
		data() {
			return {
				option: {
					img: this.op && this.op.img || '', //url 地址 || base64 || blob     截图地址
					size: 1,//截图质量  （0.1到1）
					outputType: 'png',//截图格式
					canScale: true,//是否允许缩放
					autoCrop: true,//默认生成截图框
					autoCropWidth: parseInt(this.op && this.op.width),//默认生成截图框宽度
					autoCropHeight: parseInt(this.op && this.op.height),//默认生成截图框高度
					fixed: true,
					fixedNumber: this.op && this.op.fixedNumber || [1, 1]
				},
				fileName: {},
				previews: {},
				completeRate: 0
			}
		},
		methods: {
			getSize() {
				if (this.op && this.op.fixedNumber) {
					var w = 300, h = 300
					var wh = this.op.fixedNumber[0] / this.op.fixedNumber[1]
					// 如果设置了比例
					w = ~~(h * wh)
					return { w, h }
				}
				return { w: 300, h: 300 }
			},
			realTime(data) {
				this.previews = data
			},
			commit() {
				this.$refs.cropper.getCropBlob((data) => {
					let filename = this.fileName.length > 0 ? this.fileName : this.op.img.substring(this.op.img.lastIndexOf('/'), this.op.img.length)
					let formData = new FormData()
					formData.append('file', data)
					formData.append('name', filename)
					let xhr = new XMLHttpRequest()
					function updateProgress(event) {
						if (event.lengthComputable) {
							this.completeRate = Number((Number.parseFloat(event.loaded / event.total) * 100).toFixed(2))
						}
					}
					xhr.onprogress = updateProgress
					xhr.upload.onprogress = updateProgress

					xhr.open('post', '/ajax/fileuploadBlob')
					let self = this


					xhr.onload = function () {
						this.completeRate = 100
						if (!xhr.response) {
							self.$message.warning(JSON.parse(xhr.response).information)
						} else if (xhr.status == 200) {
							self.$message.success('上传完成')
							self.$emit('result', JSON.parse(JSON.parse(xhr.response).objectLiteral))
							self.$refs.cropper.clearCrop()//清除截图
							self.option.img = ''
						}
					}
					xhr.send(formData)
				})
			},
			selectImage() {
				this.$refs.cropperFileInput.click()
				this.option.img = ''
			},
			uploadImage() {
				this.$refs.cropper.clearCrop()//清除截图
				this.completeRate = 0
				let fileInput = this.$refs.cropperFileInput
				let file = fileInput.files[0]
				this.fileName = file.name
				var reader = new FileReader()
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(fileInput.value)) {
					this.$message.warning('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
					return false
				}
				reader.onload = (e) => {
					this.option.img = e.target.result
					fileInput.value = ''//同图片触发input change
				}
				reader.readAsDataURL(file)
			}
		},
		components: {
			imageCropper
		}
	}
</script>