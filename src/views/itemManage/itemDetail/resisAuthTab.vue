<style>
    #resisAuthTab{
        margin: 0 auto;
        padding-top: 30px;
        width: 90%;
        min-width: 890px;
    }
    #resisAuthTab .businessTitle{
        height:30px;
        font-size: 18px;
        font-weight: bold
    }
    #resisAuthTab .businessTitle img{
        text-indent: 20px;
        margin-right:5px;
    }
    .pic-box {
        float: left;
    }

    .pic-box img {
        margin-right: 30px;
    }

    .pic-box img:last-child {
        margin-right: 0;
    }
    /*编辑登记信息弹窗*/
    .limitwidth .el-form-item__label {
        width: 160px!important;
    }

    .limitwidth .el-input {
        width: 80%!important;
    }

    #resisAuthTab .upimage .el-upload__input {
        display: none !important;
    }
    #resisAuthTab .accunt-info{
        width: 500px;
        margin: 15px 0;
    }
    #resisAuthTab .accunt-info td{
        height:40px;
        text-indent: 20px;
    }
    #resisAuthTab .accunt-info td:nth-child(2n+1){
        height:40px;
        width:206px;
        text-align: right;
        text-indent: 20px;
    }
    #resisAuthTab .businessinfo-content{
        display: flex;
        flex-flow:row nowrap;
        justify-content: flex-start;
    }
    #resisAuthTab .businessinfo-content .imageDiv{
        align-self:center;
        
    }   
    #resisAuthTab .businessinfo-content .imageDiv img{
        margin-right:20px;
    }
    #resisAuthTab .modify {
        margin-left:20px;
        width:100px;
        background: #06ccb6;
        border-color: #06ccb6;
        font-size: 14px;
        color: white;
        min-width: 100px;
    }
    #resisAuthTab .modify:hover {
        background: white;
        border-color: #06ccb6;
        color: #06ccb6;
        min-width: 100px;
    }
</style>
<template>
    <div id="resisAuthTab">
        <el-row>

        <el-col class="businessTitle">
                <img src="../../../assets/images/linear.png"  /> <span>企业银账授权信息</span>
                <el-button class="modify" v-if="!!enterpriseAccount.id"  @click="dialogFormVisible = true">修改</el-button>
            </el-col>
        <el-col class="businessinfo-content">
            <table class="accunt-info">
                <tr>
                    <td>项目主体名称</td><td>{{enterpriseAccount.name}}</td>
                </tr>
                <tr>
                    <td>统一社会信用代码</td><td>{{enterpriseAccount.creditCode}}</td>
                </tr>
                <tr>
                    <td>开户许可核准号</td><td>{{enterpriseAccount.accountApprovalNumber}}</td>
                </tr>
                <tr>
                    <td>开户银行</td><td>{{enterpriseAccount.depositBank}}</td>
                </tr>
                <tr>
                    <td>基本存款账户账号</td><td>{{enterpriseAccount.basicDepositAccountNumber}}</td>
                </tr>
                <tr>
                    <td>账户查询授权</td><td>{{enterpriseAccount.queryAuthorization==1?'口令型':'USB Key型'}}</td>
                </tr>
            </table>
            <div class="imageDiv">
                    <img v-imageBiger :src="enterpriseAccount.businessLicenseURL" title="营业执照（无）" width="250" height="150" />
                    <img v-imageBiger :src="enterpriseAccount.accountLicenceURL" title="开户许可证（无）" width="250" height="150" />
            </div>
        </el-col>
    </el-row>
    
        <el-row v-if="!!personAccount.id">
                <el-col class="businessTitle">
                    <img src="../../../assets/images/linear.png"  /> <span>个人银账授权信息</span>
                    <el-button class="modify" v-if="!!personAccount.id"  @click="dialogFormVisible1 = true">修改</el-button>
                </el-col>
                <el-col class="businessinfo-content">
                    <table class="accunt-info">
                        <tr>
                            <td>银行账号</td><td>{{personAccount.basicDepositAccountNumber}}</td>
                        </tr>
                        <tr>
                            <td>开户银行</td><td>{{personAccount.depositBank}}</td>
                        </tr>
                        <tr>
                            <td>开户行地区</td><td>{{personAccount.city}}</td>
                        </tr>
                        <tr>
                            <td>开户行机构名</td><td>{{personAccount.subbranch}}</td>
                        </tr>
                    </table>
                </el-col>
        </el-row>
       
        
        <!--编辑登记信息弹窗-->
        <div class="limitwidth">
            <el-dialog :title="title" :visible.sync="dialogFormVisible" :close-on-click-modal="false" >
                <el-form :model="limitform1" ref="limitformTarget" :rules="limit" :label-width="'200px'">
                    <el-form-item prop="name" label="企业名称">
                        <el-input readonly v-model="limitform1.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="creditCode" label="统一社会信用代码">
                        <el-input readonly v-model="limitform1.creditCode" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="accountApprovalNumber" label="开户许可核准号">
                        <el-input v-model="limitform1.accountApprovalNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="province" label="开户行省名">
                        <el-input v-model="limitform1.province" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="city" label="开户行市名">
                        <el-input v-model="limitform1.city" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="subbranch" label="开户支行名">
                        <el-input v-model="limitform1.subbranch" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="depositBank" label="开户银行">
                        <el-input v-model="limitform1.depositBank" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="basicDepositAccountNumber" label="基本存款账户账号">
                        <el-input v-model="limitform1.basicDepositAccountNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="businessLicenseURL" label="营业执照影印件">
                        <el-upload class="upload-img upimage" :multiple="false" action="/ajax/fileupload" :auto-upload="true"
                            accept="image/*"  :file-list="businessLicenseURLs"
                            :on-remove="businessLicenseURL_remove"
                            list-type="picture-card"  :before-upload="beforeUploadb" :on-success="successUpload1" :data="fileInfo" >
                            <el-button size="small" type="primary">选择文件</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpeg/jpg/png文件，且不超过10M</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="accountLicenceURL" label="客户许可证影印件">
                        <el-upload class="upload-img upimage" :multiple="false" action="/ajax/fileupload" :auto-upload="true"   accept="image/*"  :file-list="accountLicenceURLs"
                            :on-remove="accountLicenceURL_remove"
                            :before-upload="beforeUploada" list-type="picture-card"  :on-success="successUpload2" :data="fileInfo">
                            <el-button size="small" type="primary">上传图片</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpeg/jpg/png文件，且不超过10M</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="accountName" label="开户名">
                        <el-input v-model="limitform1.accountName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="queryAuthorization" required label="账户查询授权">
                        <el-radio-group v-model="limitform1.queryAuthorization">
                            <el-radio :label="1">口令型</el-radio>
                            <el-radio :label="2">USB Key型</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="customerCode" required label="网银客户号/企业客户号" v-if="limitform1.queryAuthorization==1">
                        <el-input v-model="limitform1.customerCode" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="userLoginName" required label="用户名" v-if="limitform1.queryAuthorization==1">
                        <el-input v-model="limitform1.userLoginName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="queryPassword" required label="密码" v-if="limitform1.queryAuthorization==1">
                        <el-input type="password" v-model="limitform1.queryPassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="pinCode" required label="pin码" v-if="limitform1.queryAuthorization==2">
                        <el-input v-model="limitform1.pinCode" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="queryPassword" required label="登录密码" v-if="limitform1.queryAuthorization==2">
                        <el-input type="password" v-model="limitform1.queryPassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="activationCode" required label="激活码" v-if="limitform1.queryAuthorization==2">
                        <el-input v-model="limitform1.activationCode" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog :title="title1" :visible.sync="dialogFormVisible1" :close-on-click-modal="false" >
                <el-form :model="limitform2" ref="limitformTarget1" :rules="limit1" :label-width="'200px'">
                    <el-form-item prop="basicDepositAccountNumber" label="银行账户">
                        <el-input readonly v-model="limitform2.basicDepositAccountNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="depositBank" label="开户银行">
                        <el-input v-model="limitform2.depositBank" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="province" label="开户行省名">
                        <el-input v-model="limitform2.province" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="city" label="开户行市名">
                        <el-input v-model="limitform2.city" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="subbranch" label="开户行机构名">
                        <el-input v-model="limitform2.subbranch" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="userLoginName" required label="登录名" >
                        <el-input v-model="limitform2.userLoginName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="queryPassword" required label="查询口令">
                        <el-input type="password" v-model="limitform2.queryPassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="queryPassword1" required label="确认口令" >
                        <el-input type="password" v-model="limitform2.queryPassword1" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm1">确 定</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    
export default {
	name: 'resisAuthTab',
	computed: {
		authInfoList: function () {
			return this.$store.state.item.authInfo || {}
		}
	},
	props: ['enterpriseId'],
	beforeMount() {
		this.$store.dispatch('item_getAuthInfo', { id: this.enterpriseId}).then(()=>{
			this.formatData()
		})
	},
	data() {
		return {
			dialogFormVisible: false,
			dialogFormVisible1:false,
			title: '修改企业银账授权信息',
			title1:'修改个人银账授权信息',
			enterpriseAccount:{},
			personAccount:{},
			limitform1: {
				name: '',
				creditCode: '',
				accountApprovalNumber: '',
				depositBank: '',
				basicDepositAccountNumber: '',
				queryAuthorization: 1,
				queryPassword: '',
				confirmPassword: '',
				businessLicenseURL: '',
				accountLicenceURL: '',
				accountName:'',
				customerCode:'',
				userLoginName:'',
				pinCode:'',
				activationCode:'',
				type:0 , //类型0：企业 1：个人
				province:'',//省份
				city:'',//市
				subbranch:''//支行
			},
			limitform2: {
				name: '',
				creditCode: '',
				accountApprovalNumber: '',
				depositBank: '',
				basicDepositAccountNumber: '',
				queryAuthorization: 1,
				queryPassword: '',
				confirmPassword: '',
				businessLicenseURL: '',
				accountLicenceURL: '',
				accountName:'',
				customerCode:'',
				userLoginName:'',
				pinCode:'',
				activationCode:'',
				type:1, //类型0：企业 1：个人
				province:'',//省份
				city:'',//市
				subbranch:''//支行
			},
			businessLicenseURLs:[],
			accountLicenceURLs:[],
			fileInfo:{
				fileType:2
			},
			limit:{
				province:[
					{required: true, message: '请输入开户行省名', trigger: 'blur' },
				],
				city:[
					{required: true, message: '请输入开户行市名', trigger: 'blur' },
				],
				subbranch:[
					{required: true, message: '请输入开户支行名', trigger: 'blur' },
				],
				accountApprovalNumber:[
					{required: true, message: '请输入开户许可核准号', trigger: 'blur' },
				],
				depositBank:[
					{required: true, message: '请输入开户银行', trigger: 'blur' }
				],
				basicDepositAccountNumber:[
					{required: true, message: '请输入基本存款账户账号', trigger: 'blur' }
				],
				accountName:[
					{required: true, message: '请输入开户名', trigger: 'blur' }
				],
				businessLicenseURL:[
					{required: true, message: '请上传营业执照影印件', trigger: 'blur' }
				],
				accountLicenceURL:[
					{required: true, message: '请上传开户许可证影印件', trigger: 'blur' }
				],
				queryPassword:[
					{required: true, message: '请输入密码', trigger: 'blur'}
				],
				customerCode:[
					{trigger: 'blur',validator:(rule, value, callback) => {
						if (this.limitform1.queryAuthorization==1&&value == '') {
							callback(new Error('请输入网银客户号/企业客户号'))
						} else {
							callback()
						}
					}}
				],
				userLoginName:[
					{trigger: 'blur',validator:(rule, value, callback) => {
						if (this.limitform1.queryAuthorization==1&&value == '') {
							callback(new Error('请输入用户名'))
						} else {
							callback()
						}
					}}
				],
				activationCode:[
					{trigger: 'blur',validator:(rule, value, callback) => {
						if (this.limitform1.queryAuthorization==2&&value == '') {
							callback(new Error('请输入激活码'))
						} else {
							callback()
						}
					}}
				],
				pinCode:[
					{trigger: 'blur',validator:(rule, value, callback) => {
						if (this.limitform1.queryAuthorization==2&&value == '') {
							callback(new Error('请输入pin码'))
						} else {
							callback()
						}
					}}
				]
			},
			limit1:{
				province:[
					{required: true, message: '请输入开户行省名', trigger: 'blur' },
				],
				city:[
					{required: true, message: '请输入开户行市名', trigger: 'blur' },
				],
				subbranch:[
					{required: true, message: '请输入开户行机构名', trigger: 'blur' },
				],
				depositBank:[
					{required: true, message: '请输入开户银行', trigger: 'blur' }
				],
				basicDepositAccountNumber:[
					{required: true, message: '请输入银行账户', trigger: 'blur' }
				],
				queryPassword:[
					{required: true, message: '请输入查询口令', trigger: 'blur'}
				],
				queryPassword1:[
					{trigger: 'blur',validator:(rule, value, callback) => {
						if(value==''){
							callback(new Error('请确认查询口令'))
						}else if (value!=this.limitform2.queryPassword) {
							callback(new Error('两次输入口令不一致'))
						} else {
							callback()
						}
					}}
				],
				userLoginName:[
					{required: true, message: '请输入登录名', trigger: 'blur'}
				]
			}
		}
	},
	methods: {
		submitForm1(){
			this.$refs['limitformTarget1'].validate((valid) => {
				if (valid) {
					let param=this.limitform2
					param.id=this.personAccount.id
					param.enterpriseId= this.enterpriseId
					this.$store.dispatch('item_updateAuthInfo',{param,vue:this}).then(()=>{
						this.dialogFormVisible1=false
						this.formatData()
					})
				} else {
					return false
				}
			})
		},
		formatData(){
			let auth=JSON.parse(JSON.stringify(this.authInfoList))
			for (let i = 0; i < auth.length; i++) {
				let item = auth[i]
				if(item.type==0){
					this.enterpriseAccount=item
				}else if(item.type==1){
					this.personAccount=item
				}
			}
			if(this.enterpriseAccount.businessLicenseURL&&this.enterpriseAccount.businessLicenseURL.length>0){
				this.businessLicenseURLs.push({url:this.enterpriseAccount.businessLicenseURL,name:'营业执照影印件'})
			}
			if(this.enterpriseAccount.accountLicenceURL&&this.enterpriseAccount.accountLicenceURL.length>0){
				this.accountLicenceURLs.push({url:this.enterpriseAccount.accountLicenceURL,name:'客户许可证影印件'})
			}
			if(this.enterpriseAccount.id)this.limitform1=this.enterpriseAccount
			if(this.personAccount.id)this.limitform2=this.personAccount
		},
		accountLicenceURL_remove(){
			this.limitform1.accountLicenceURL=''
		},
		businessLicenseURL_remove(){
			this.limitform1.businessLicenseURL=''
		},
		beforeUploadb(file){
			if(this.limitform1.businessLicenseURL&&this.limitform1.businessLicenseURL.length>0){
				this.$message.warning('只能上传一份营业执照影印件')
				return false
			}
			if(file.size>=1024*1024*10){
				this.$message.warning('不能上传大于10MB的文件！')
				return false
			}
			return true
		},
		beforeUploada(file){
			if(this.limitform1.accountLicenceURL&&this.limitform1.accountLicenceURL.length>0){
				this.$message.warning('只能上传一份客户许可证影印件')
				return false
			}
			if(file.size>=1024*1024*10){
				this.$message.warning('不能上传大于10MB的文件！')
				return false
			}
			return true
		},
		successUpload1(response){
			this.limitform1.businessLicenseURL=JSON.parse(response.objectLiteral)
		},
		successUpload2(response){
			this.limitform1.accountLicenceURL=JSON.parse(response.objectLiteral)
		},
		submitForm(){
			this.$refs['limitformTarget'].validate((valid) => {
				if (valid) {
					let param=this.limitform1
					param.id=this.enterpriseAccount.id
					param.enterpriseId= this.enterpriseId
					this.$store.dispatch('item_updateAuthInfo',{param,vue:this}).then(()=>{
						this.dialogFormVisible=false
						this.formatData()
					})
				} else {
					return false
				}
			})
		}
            
	}
}

</script>