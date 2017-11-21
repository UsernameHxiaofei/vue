<style>
    /*有限合伙信息*/

    .partner-box {
        width: 80%;
        min-width: 500px;
        margin: 0 auto;
        padding: 30px 0;
        overflow: hidden;
    }

    .partner-time {
        margin: 0 40px 0 0;
        float: left;
        width: 100%;
    }

    .partner-time li {
        color: #333333;
        margin-top: 5px;
        font-size: 14px;
        line-height: 30px;
    }

    .partner-time li span {
        display: inline-block;
        width: 125px;
        font-weight: bold;
        margin-right: 20px;
        color: black;
        text-align: right;
    }

    .bianji {
        float: right;
        margin-right: 45%;
    }
</style>
<template>
    <div class="eleventh">
        <!--有限合伙信息-->
        <div class="partner-box">
            <ul class="partner-time">
                <li>
                    <span>企业名称</span>{{partner.name}}</li>
                <li>
                    <span>统一社会信用代码</span>{{partner.code}}</li>
                <li>
                    <span>开户许可核准号</span>{{partner.licence}}</li>
                <li>
                    <span>开户银行</span>{{partner.bankName}}</li>
                <li>
                    <span>开户银行机构</span>{{partner.bankOrgnizationName}}</li>
                <li>
                    <span>开户行省名</span>{{partner.bankProvince}}</li>
                <li>
                    <span>开户行市名</span>{{partner.bankCity}}</li>
                <li>
                    <span>银行账户</span>{{partner.bankAccount}}</li>
            </ul>
            <el-button class="bianji" type="success" @click="dialogFormVisible = true">编辑</el-button>
        </div>
        <el-dialog :title="'编辑有限合伙人信息'" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="partnerForm" ref="partnerForm" :rules="partnerRules" :label-width="'200px'" style="width:80%">
                <el-form-item prop="name" label="企业名称">
                    <el-input disabled v-model="partnerForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="统一社会信用代码">
                    <el-input disabled v-model="partnerForm.code" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="licence" label="开户许可核准号">
                    <el-input v-model="partnerForm.licence" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankName" label="开户银行">
                    <el-input v-model="partnerForm.bankName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankProvince" label="开户行省名">
                    <el-input v-model="partnerForm.bankProvince" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankCity" label="开户行市名">
                    <el-input v-model="partnerForm.bankCity" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankOrgnizationName" label="开户银行机构">
                    <el-input v-model="partnerForm.bankOrgnizationName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="bankAccount" label="银行账户">
                    <el-input v-model="partnerForm.bankAccount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="protocol" label="有限合伙协议模板">
                    <el-upload class="upload-img upimage" ref="uploadPartnerDome" :multiple="false" action="/ajax/fileupload" :auto-upload="true"
                        :file-list="protocols" :on-remove="protocol_remove" :before-upload="beforeUpload" :on-success="protocolUpload"
                        :data="{fileType:2}">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
	name: 'partnerTab',
	beforeMount() {
		this.$store.dispatch('item_getPartnerInfo', { id: this.$route.params.projectId }).then(() => {
			this.partnerForm = JSON.parse(JSON.stringify(this.partner))
			if (this.partner.protocol && this.partner.protocol.length > 0) {
				this.protocols = [{ name: '有限合伙人模板', response: { objectLiteral: this.partner.protocol }, url: this.partner.protocol }]
			}
		})
	},
	data() {
		return {
			dialogFormVisible: false,
			partnerForm: {
				name: '',
				code: '',
				licence: '',
				bankName: '',
				bankOrgnizationName: '',
				bankProvince: '',
				bankCity: '',
				bankAccount: '',
				protocol: ''
			},
			protocols: [],
			partnerRules: {
				name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
				code: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
				licence: [{ required: true, message: '请输入开户许可核准号', trigger: 'blur' }],
				bankName: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
				bankOrgnizationName: [{ required: true, message: '请输入开户银行机构', trigger: 'blur' }],
				bankProvince: [{ required: true, message: '请输入开户行省名', trigger: 'blur' }],
				bankCity: [{ required: true, message: '请输入开户行市名', trigger: 'blur' }],
				bankAccount: [{ required: true, message: '请输入银行账户', trigger: 'blur' }],
				protocol: [{ required: true, message: '请上传有限合伙协议模板', trigger: 'blur' }]
			}
		}
	},
	methods: {
		protocol_remove(file, fileList) {
			if (fileList.length > 0) {
				this.partnerForm.protocol = JSON.parse(fileList[0].response.objectLiteral)
			} else {
				this.partnerForm.protocol = ''
			}
		},
		protocolUpload(response) {
			this.partnerForm.protocol = JSON.parse(response.objectLiteral)
		},
		beforeUpload(file) {
			if (this.partnerForm.protocol.length > 0) {
				this.$message.warning('有限合伙人协议模板只能存在一个!')
				return false
			}
			if (file.size >= 1024 * 1024 * 10) {
				this.$message.warning('不能上传大于10MB的文件！')
				return false
			}
			if (file.type != 'application/pdf') {
				this.$message.warning('协议模板必须是pdf文件！')
				return false
			}
			return true
		},
		submitForm() {
			this.$refs['partnerForm'].validate((valid) => {
				if (valid) {
					let param = this.partnerForm
					param.id = this.$route.params.projectId
					this.$store.dispatch('item_updatePartnerInfo', { param, vue: this }).then(() => {
						this.partnerForm = JSON.parse(JSON.stringify(this.partner))
						this.dialogFormVisible = false
					})
					this.$refs['partnerForm'].resetFields()
				} else {
					return false
				}
			})
		}
	},
	computed: {
		partner: function () {
			return this.$store.state.item.partnerInfo || {}
		}
	}
}

</script>