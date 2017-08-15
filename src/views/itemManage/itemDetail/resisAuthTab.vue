<style>
    /*授权登记信息*/
    .auth-box {
        width:90%;
        min-width: 1000px;
        margin: 0 auto;
        padding: 30px 0;
        overflow: hidden;
    }

    .auth-time {
        margin: 0 40px 0 0;
        float: left;
    }

    .auth-time li {
        color: #333333;
        margin-top: 5px;
        width:380px;
    }

    .auth-time li span {
        display: inline-block;
        width: 125px;
        margin-right: 20px;
        color: #666666;
        text-align: right;
    }
    
    .modify {
        margin-top: 115px;
        margin-left: 115px;
        float: left ;
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

    .upimage .el-upload__input {
        display: none !important;
    }
</style>
<template>
    <div class="tenth">
        <!--授权登记信息-->
        <div class="auth-box">
            <ul class="auth-time">
                <li>
                    <span>项目主体名称</span>{{authInfo.name}}</li>
                <li>
                    <span>统一社会信用代码</span>{{authInfo.creditCode}}</li>
                <li>
                    <span>开户许可核准号</span>{{authInfo.accountApprovalNumber}}</li>
                <li>
                    <span>开户银行</span>{{authInfo.depositBank}}</li>
                <li>
                    <span>基本存款账户账号</span>{{authInfo.basicDepositAccountNumber}}</li>
                <li>
                    <span>账户查询授权</span>{{authInfo.queryAuthorization==1?'口令型':'USB Key型'}}</li>
            </ul>
            <div class="pic-box">
                <img v-imageBiger :src="authInfo.businessLicenseURL" width="250" height="150" />
                <img v-imageBiger :src="authInfo.accountLicenceURL" width="250" height="150" />
            </div>
            <el-button class="modify" type="success" @click="dialogFormVisible = true">修改</el-button>
        </div>
        <!--编辑登记信息弹窗-->
        <div class="p-form limitwidth">
            <el-dialog :title="title" :visible.sync="dialogFormVisible" >
                <el-form :model="limitform" ref="limitformTarget" :rules="limit" :label-width="'200px'">
                    <el-form-item prop="name" label="企业名称">
                        <el-input readonly v-model="limitform.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="creditCode" label="统一社会信用代码">
                        <el-input readonly v-model="limitform.creditCode" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="accountApprovalNumber" label="开户许可核准号">
                        <el-input v-model="limitform.accountApprovalNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="depositBank" label="开户银行">
                        <el-input v-model="limitform.depositBank" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="basicDepositAccountNumber" label="基本存款账户账号">
                        <el-input v-model="limitform.basicDepositAccountNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="businessLicenseURL" label="营业执照影印件">
                        <el-upload class="upload-img upimage" :multiple="false" action="/ajax/fileupload" :auto-upload="true"
                            accept="image/*"  :file-list="businessLicenseURLs"
                            :on-remove="businessLicenseURL_remove"
                            list-type="picture-card"  :before-upload="beforeUpload" :on-success="successUpload1" :data="fileInfo" :disabled="limitform.businessLicenseURL&&limitform.businessLicenseURL.length!=0">
                            <el-button size="small" type="primary">选择文件</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpeg/jpg/png文件，且不超过10M</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="accountLicenceURL" label="客户许可证影印件">
                        <el-upload class="upload-img upimage" :multiple="false" action="/ajax/fileupload" :auto-upload="true"   accept="image/*"  :file-list="accountLicenceURLs"
                            :on-remove="accountLicenceURL_remove"
                            :before-upload="beforeUpload" list-type="picture-card"  :on-success="successUpload2" :data="fileInfo" :disabled="limitform.businessLicenseURL&&limitform.accountLicenceURL.length!=0" >
                            <el-button size="small" type="primary">上传图片</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpeg/jpg/png文件，且不超过10M</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="accountName" label="开户名">
                        <el-input v-model="limitform.accountName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="queryAuthorization" required label="账户查询授权">
                        <el-radio-group v-model="limitform.queryAuthorization">
                            <el-radio :label="1">口令型</el-radio>
                            <el-radio :label="2">USB Key型</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="customerCode" required label="网银客户号/企业客户号" v-if="limitform.queryAuthorization==1">
                        <el-input v-model="limitform.customerCode" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="userLoginName" required label="用户名" v-if="limitform.queryAuthorization==1">
                        <el-input v-model="limitform.userLoginName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="queryPassword" required label="密码" v-if="limitform.queryAuthorization==1">
                        <el-input type="password" v-model="limitform.queryPassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="pinCode" required label="pin码" v-if="limitform.queryAuthorization==2">
                        <el-input v-model="limitform.pinCode" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="queryPassword" required label="登录密码" v-if="limitform.queryAuthorization==2">
                        <el-input type="password" v-model="limitform.queryPassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="activationCode" required label="激活码" v-if="limitform.queryAuthorization==2">
                        <el-input v-model="limitform.activationCode" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'resisAuthTab',
        computed: {
            authInfo: function () {
                return this.$store.state.item.authInfo || {};
            },
            itemManageDetail: function () {
                return this.$store.state.item.itemManageDetail||{};
            }
        },
        mounted() {
            this.$store.dispatch('item_getAuthInfo', { id: this.itemManageDetail.enterpriseId }).then(()=>{
                let auth=JSON.parse(JSON.stringify(this.authInfo));
                if(auth.businessLicenseURL&&auth.businessLicenseURL.length>0){
                    this.businessLicenseURLs.push({url:auth.businessLicenseURL,name:'营业执照影印件'})
                }
                if(auth.accountLicenceURL&&auth.accountLicenceURL.length>0){
                    this.accountLicenceURLs.push({url:auth.accountLicenceURL,name:'客户许可证影印件'})
                }
                if(auth)this.limitform=auth;
            })
        },
        data() {
            return {
                dialogFormVisible: false,
                title: '修改登记授权信息',
                limitform: {
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
                    activationCode:''
                },
                businessLicenseURLs:[],
                accountLicenceURLs:[],
                fileInfo:{
                    fileType:2
                },
                limit:{
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
                        {required: true, message: '请上传客户许可证影印件', trigger: 'blur' }
                    ],
                    queryPassword:[
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    customerCode:[
                        {trigger: 'blur',validator:(rule, value, callback) => {
                            if (this.limitform.queryAuthorization==1&&value == '') {
                            callback(new Error('请输入网银客户号/企业客户号'));
                            } else {
                            callback();
                            }
                        }}
                    ],
                    userLoginName:[
                        {trigger: 'blur',validator:(rule, value, callback) => {
                            if (this.limitform.queryAuthorization==1&&value == '') {
                            callback(new Error('请输入用户名'));
                            } else {
                            callback();
                            }
                        }}
                    ],
                    activationCode:[
                        {trigger: 'blur',validator:(rule, value, callback) => {
                            if (this.limitform.queryAuthorization==2&&value == '') {
                            callback(new Error('请输入激活码'));
                            } else {
                            callback();
                            }
                        }}
                    ],
                    pinCode:[
                        {trigger: 'blur',validator:(rule, value, callback) => {
                            if (this.limitform.queryAuthorization==2&&value == '') {
                            callback(new Error('请输入pin码'));
                            } else {
                            callback();
                            }
                        }}
                    ]
                }
            }
        },
        methods: {
            accountLicenceURL_remove(){
                this.limitform.accountLicenceURL='';
            },
            businessLicenseURL_remove(){
                this.limitform.businessLicenseURL='';
            },
            beforeUpload(file){
                if(file.size>=1024*1024*10){
                    this.$message.warning('不能上传大于10MB的文件！');
                    return false;
                }
                return ture;
            },
            successUpload1(response,file,fileList){
                this.businessLicenseURL=JSON.parse(response.objectLiteral);
            },
            successUpload2(response,file,fileList){
                this.accountLicenceURL=JSON.parse(response.objectLiteral);
            },
            submitForm(){
                this.$refs['limitformTarget'].validate((valid) => {
                    if (valid) {
                        let param=this.limitform;
                        param.id=this.authInfo.accountId;
                        param.enterpriseId= this.enterpriseInfo.id;
                        this.$store.dispatch('item_updateAuthInfo',{param,vue:this}).then(()=>{
                            this.limitform=JSON.parse(JSON.stringify(this.authInfo));
                        })
                    } else {
                        return false;
                    }
                });
            }
            
        }
    }

</script>