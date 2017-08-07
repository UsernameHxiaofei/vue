//个人信息
<template>
	<div style="width:100%;height: 100%;background: #fff;">
		<div class="hangjiashenhe" style="position: relative;" v-if="status">
	
			<el-button type="primary" style="position: absolute; right: 0;top: 30px;" @click="status=false">编辑</el-button>
			<ul>
				<li>
					<label>昵称</label>
					<span>{{customerInfo.nickname}}</span>
				</li>
				
				<li>
					<label>性别</label>
					<span v-if="customerInfo.gender == 0">保密</span>
					<span v-if="customerInfo.gender == 1">男</span>
					<span v-if="customerInfo.gender == 2">女</span>
				</li>
				<li>
					<label>出生日期</label>
					<span>{{customerInfo.birthdate}}</span>
				</li>
				<li>
					<label>常驻地区</label>
					<span>{{customerInfo.usualPlace|address}}</span>
				</li>
				<li>
					<label>单位</label>
					<span>{{customerInfo.organization}}</span>
				</li>
				<li>
					<label>职位</label>
					<span>{{customerInfo.position}}</span>
				</li>
				<li>
					<label>微信号</label>
					<span>{{customerInfo.wechatNumber}}</span>
				</li>
				<li>
					<label>个人简介</label>
					<span>{{customerInfo.personProfile}}</span>
				</li>
				<li>
					<label>行家简介</label>
					<span>{{customerInfo.expertProfile}}</span>
				</li>
				<li>
					<label>已投项目</label>
					<span>{{customerInfo.investment}}</span>
				</li>
				<li>
					<label>专注行业</label>
					<span>{{customerInfo.newIndustry|industry}}</span>
				</li>
				<li>
					<label>关注行业</label>
					<span>{{customerInfo.industryLed|industry}}</span>	
				</li>
			</ul>
		</div>
	
		<el-form v-if="!status" :model="customerInfo"  ref="customerInfo" class="my-form" label-width="90px" style="width: 70%;margin:auto;padding: 20px 0;">
			
			<el-form-item label="头像" >
				<img class="customer-head-image" :src="customerInfo.headFigureURL" v-if="!!customerInfo.headFigureURL" alt=""><br>
				<el-button size="small" @click="editHeadImgChange=true">上传头像</el-button>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="customerInfo.nickname"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-radio-group v-model="customerInfo.gender">
					<el-radio :label="1">男</el-radio>
					<el-radio :label="2">女</el-radio>
					<el-radio :label="0">保密</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="出生日期" >
				<el-col :span="11">
					<el-date-picker 
					v-model="birthdate" 
					type="date" 
					 placeholder="选择日期" 
					 style="width: 100%;"></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="所在地">
				<el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="selectedOptions" @change="handleChange">
				</el-cascader>
			</el-form-item>
			<el-form-item label="单位" prop="organization">
				<el-input v-model="customerInfo.organization"></el-input>
			</el-form-item>
			<el-form-item label="职位" prop="position">
				<el-input v-model="customerInfo.position"></el-input>
			</el-form-item>
			<el-form-item label="微信号" prop="wechatNumber">
				<el-input v-model="customerInfo.wechatNumber"></el-input>
			</el-form-item>
			<el-form-item label="个人简介" prop="personProfile">
				<el-input type="textarea" :rows="5" v-model="customerInfo.personProfile"></el-input>
			</el-form-item>
			<el-form-item label="行家简介" prop="expertProfile">
				<el-input type="textarea" :rows="5" v-model="customerInfo.expertProfile"></el-input>
			</el-form-item>
			<el-form-item label="已投项目" prop="investment">
				<el-input type="textarea" :rows="5" v-model="customerInfo.investment"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button style="width: 120px;" @click="cancel">取消</el-button>
				<el-button style="width: 120px;" type="primary" @click="onSubmit">保存</el-button>
			</el-form-item>
		</el-form>
		<div class="p-form">
            <el-dialog title="头像修改" :visible.sync="editHeadImgChange">
                    <imageCropper @result="uploadSuccess"></imageCropper>
            </el-dialog>
        </div>
	</div>
</template>
<script>
import { regionData } from 'element-china-area-data'
import { getSelectArray } from '../../../util/index.js'
import imageCropper from '../../../components/common/ImageDialogCropper'

	export default {
		components: { 
			imageCropper
		},
		computed: {
            customerInfo:function(){
                return this.$store.state.customer.customerInfoByCustomerId;
            },
            customerUpdate:function(){
                return this.$store.state.customer.customerUpdate;
            },
        },
		mounted(){
			this.personInit();
		},
		 data() {
			return {
				editHeadImgChange:false,
				birthdate:'',
				status:true,
				options: regionData,
        		selectedOptions: []
			}
		},
		methods: {
			personInit(){
			 let customerParams = {
					id:this.$route.params.customerId
			 }
             this.$store.dispatch('customerInfoByCustomerId',customerParams).then(()=>{
				 if(this.customerInfo.birthdate){
				 	this.birthdate =  this.stringToDate(this.customerInfo.birthdate) 
				 }
				 if(this.customerInfo.regionCode){
					this.selectedOptions=getSelectArray(this.customerInfo.regionCode)
				 }
				 
			 });
			},
			stringToDate(s) { 
				var d = new Date(); 
				d.setYear(parseInt(s.substring(0,4),10)); 
				d.setMonth(parseInt(s.substring(5,7)-1,10)); 
				d.setDate(parseInt(s.substring(8,10),10)); 
				d.setHours('00'); 
				d.setMinutes('00'); 
				d.setSeconds('00'); 
				return d; 
			},
			onSubmit() {
				if(this.selectedOptions)this.customerInfo.regionCode =this.selectedOptions.length>0?this.selectedOptions[this.selectedOptions.length-1]:'';
				if(this.birthdate)this.customerInfo.birthdate = this.birthdate.Format("yyyy-MM-dd hh:mm:ss"); 
				if(this.birthdate)this.customerInfo.birthdateStr = this.customerInfo.birthdate;
				this.$store.dispatch('update_customer',this.customerInfo).then(()=>{
					if(this.customerUpdate.success){
						this.$message({
							message: '编辑成功！',
							type: 'success'
						})
						this.$emit('edit-success')
						this.status = true;
					}else{
						this.$message.error('编辑失败');
						this.personInit();
						this.cancel();
					}
				})
			},
			cancel(){
				this.status = true;
			},
			handleChange (value) {
				console.log(value)
			},
			//上传成功时返回的数据
			uploadSuccess(data){
				if(data){
					this.customerInfo.headFigureURL=data;
					this.editHeadImgChange=false;
				}
			},
		}
	}    

    Date.prototype.Format = function (fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
</script>
<style scoped>
/*.my-form .el-form-item {
	margin-bottom: 10px;
}*/

body {
	background-color: #fcfcfc;
}

.content {
	background-color: #fcfcfc;
}

.hangjiashenhe {
	width: 80%;
	height: 100%;
	margin: 0 auto;
	background-color: #fff;
	font-size: 14px;
}

.hangjiashenhe ul {
	margin:10px auto;
	padding-top: 16px;
}

.hangjiashenhe li {
	margin-top: 10px;
}

.hangjiashenhe label {
	
	width: 100px;
	font-weight: 400;
	color: #999;
	text-align: right;
	margin-right: 20px;
	float: left;
	display: block;
}

.hangjiashenhe li>span {
	display: inline-block;
	width: 75%;
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
</style>