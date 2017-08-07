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
.upload-demo{ position:relative;}
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
					<span><img style=" width: 200px;" :src="enterpriseInfo.imageURL"></span>
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
				<el-cascader expand-trigger="click" style="width:280px;" change-on-select clearable :options="options" v-model="selectedOptions" @change="handleChange">
				</el-cascader>
			</el-form-item>
			<el-form-item label="企业形象图" prop="img">
				<el-upload
			class="upload-demo"
			ref="upload"
			action="/ajax/image_uploadByFile"
			:data="fileParam"
			list-type="picture-card"
			:show-file-list="true"
			:auto-upload="false"
            :file-list="uploadList"
			:before-upload="beforeAvatarUpload"
			:on-success="uploadSuccess">
			<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			<el-button style="margin-left: 10px; position:absolute; right:0; bottom:20px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
		</el-upload>
				<el-dialog v-model="dialogVisible" size="tiny">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>
			<el-form-item label="企业简介" prop="profile">
				<el-input type="textarea"  :rows="6" v-model="enterpriseInfo.profile"></el-input>
			</el-form-item>
			<el-form-item label="已投项目" prop="investment">
				<el-input type="textarea"  :rows="6" v-model="enterpriseInfo.investment"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button style="width: 120px;" @click="cancel">取消</el-button>
	
				<el-button style="width: 120px;" type="primary" @click="onSubmit">保存</el-button>
			</el-form-item>
		</el-form>
		
	</div>
</template>
<script>
import { regionData } from 'element-china-area-data'
import { getSelectArray } from '../../../util/index.js'
	export default {
		computed: {
            enterpriseInfo:function(){
               return this.$store.state.customer.enterpriseInfoByActorId;
            },
			enterpriseInfoAdd:function(){
				return this.$store.state.customer.enterpriseInfoAdd;
			},
			enterpriseInfoUpdate:function(){
				return this.$store.state.customer.enterpriseInfoUpdate;
			}
        },
		mounted(){
			this.enterpriseInit();
		},
		 data() {
			return {
				status:true,
				options: regionData,
        		selectedOptions: [],
				uploadList:[],
				dialogVisible:false,
				dialogImageUrl:'',
				fileParam:{},
			}
		},
		methods: {
			enterpriseInit(){
				let enterpriseParams = {
					id:this.$route.params.actorId
				}
				this.$store.dispatch('enterpriseInfoByActorId',enterpriseParams).then(()=>{
					if(this.enterpriseInfo.regionCode){
						this.selectedOptions=getSelectArray(this.enterpriseInfo.regionCode)
					}
				});
			},
			handleClick(tab, event) {

        	},
			addEnterpriseInfo(){
				this.status = false;
			},
			onSubmit() {
				if(this.selectedOptions){
					this.enterpriseInfo.regionCode = this.selectedOptions.length>0?this.selectedOptions[this.selectedOptions.length-1]:'';
				}
				if(this.enterpriseInfo.id){
					this.$store.dispatch('update_enterpriseInfo',this.enterpriseInfo).then(()=>{
						if(this.enterpriseInfoUpdate.success){
							this.$message({
								message: '编辑成功！',
								type: 'success'
							})
							this.status = true;
						}else{
							this.$message.error('编辑失败');
							this.cancel();
						}
					})
				}else{
					this.enterpriseInfo.actorId = this.$route.params.actorId
					this.enterpriseInfo.id='';
					this.$store.dispatch('add_enterpriseInfo',this.enterpriseInfo).then(()=>{
						if(this.enterpriseInfoAdd.success){
							this.$message({
								message: '添加成功！',
								type: 'success'
							})
							this.status = true;
						}else{
							this.$message.error('编辑失败');
							this.cancel();
						}
					})
				}
			},
			cancel(){
				let enterpriseParams = {
					id:this.$route.params.actorId
				}
             	this.$store.dispatch('enterpriseInfoByActorId',enterpriseParams);
				this.status = true;
			},
			handleChange (value) {
				console.log(value)
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			imgChange(file,fileList){
				// console.log(file, fileList);
			},
			uploadImg(event,file,fileList){
				console.log(file);
			},
			submitUpload() {
				this.$refs.upload.submit();
        	},
			beforeAvatarUpload(file){
				let isPic = false;
				let fileSize = file.size / 1024 /1024;
				let fileType = file.type;
				if(fileType === 'image/jpeg'||fileType === 'image/png'||fileType === 'image/gif'){
					isPic = true;
				}
				const isLt50 = fileSize < 1;
				if (!isPic) {
					this.$message.error('上传的图片格式为png、jpg、gif!');
					return isPic;
				}else if (!isLt50) {
					this.$message.error('上传图片大小不能超过 1M!');
					return isLt50;
				}else{
					this.fileParam.fileName=file.name;
					this.fileParam.fileType=1;
					//this.fileParam.uploadUseId=this.$store.state.login.actor.id;
					//this.fileParam.bannerSize=fileSize.toFixed(3);
				}
				return isPic&&isLt50;   
			},
			//上传成功时返回的数据
			uploadSuccess(data,file,fileList){
				console.log(data);
				if(data){
					this.$message.success('上传图片成功');
					this.enterpriseInfo.imageURL=data;
				}
			},
		}
	}    
</script>