<style>
    #investedItemCreate h3{
        color:#333
    }
    .circle {
        display: inline-block;
        margin-left: 15px;
    }

    .circle .el-form-item__content {
        margin-left: 0!important;
    }

    .choose-area {
        overflow: hidden;
    }

    .choose-area .el-form-item {
        float: left;
    }

    .tips {
        color: rgb(131, 163, 165);
        font-size: 12px;
        line-height: 37px;
        margin-left: 10px;
    }

    .description .el-textarea__inner {
        min-height: 80px;
        resize: none;
    }
    
</style>
<template>
    <div id="investedItemCreate" style="background:#f5f5f5;">
        <div class="back-button">
            <router-link :to="{path: '/investedItemList'}">
                <el-button type="text" icon="arrow-left">返回上一级</el-button>
            </router-link>
        </div>
        <div style="padding:30px 100px 30px 30px">
                <h3>项目渠道</h3>
            <el-form ref="projectChannel" :model="projectChannel" label-width="140px">
                <el-form-item label="项目渠道">
                    <template>
                        <el-radio v-model.number="projectChannel.channelType" :label="1">平台自有</el-radio>
                        <el-radio v-model.number="projectChannel.channelType" :label="2">外部引入</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="渠道标志" v-show="projectChannel.channelType==2">
                    <img :src="projectChannel.channelMark" v-if="!!projectChannel.channelMark">
                    <el-button size="small" type="primary" @click="editChannelMarkChange=true">选取文件</el-button>
                </el-form-item>
                <el-form-item label="渠道概述" v-show="projectChannel.channelType==2">
                    <el-input v-model="projectChannel.channelDesc" placeholder="渠道概述" :maxlength="255"></el-input>
                </el-form-item>
            </el-form>
            <h3>项目基本信息</h3>
            <el-form ref="form" :model="form" :rules="rules" label-width="140px">
                <el-form-item label="项目标题" prop="name">
                    <el-input v-model="form.name" placeholder="输入项目标题，最好控制在20字以内"></el-input>
                </el-form-item>
                <el-form-item class="summary" label="项目概述" prop="summary">
                    <el-input v-model="form.summary" type="textarea" placeholder="一句话概括项目，突出项目特点"></el-input>
                </el-form-item>
                <el-form-item label="行业分类" prop="industry">
                    <el-radio-group v-model="form.industry">
                        <el-radio v-for="(item,index) in industryData" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="choose-area">
                    <el-form-item label="所属地区" prop="selectedOptions">
                        <el-cascader expand-trigger="hover" clearable change-on-select :options="options" v-model="form.selectedOptions" @change="handleRegionCodeChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item class="circle" prop="businessArea">
                        <el-input v-model="form.businessArea" placeholder="商圈名 / 园圈名"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="总投资额" prop="totalInvestAmount">
                    <el-input v-model.number="form.totalInvestAmount" placeholder="总投资额">
                        <template slot="append">万元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="企业名称" prop="enterpriseName">
                    <el-input v-model="form.enterpriseName" placeholder="企业名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="creditCode">
                    <el-input v-model="form.creditCode" placeholder="统一社会信用代码">
                    </el-input>
                </el-form-item>
                <el-form-item class="imgUrl" required label="项目展示图" prop="imgUrl">
                    <img style="width:400px" v-if="form.imgUrl" :src="form.imgUrl" alt="">
                    <el-upload class="upload-demo" ref="upload" action="/ajax/fileupload" :data="{fileType:2}" :show-file-list="false" :auto-upload="true"
                        :before-upload="beforeImgUpload" :on-success="ImgUploadSuccess">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 130px;" type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="p-form">
            <el-dialog title="渠道标志上传" :visible.sync="editChannelMarkChange" :close-on-click-modal="false">
                <imageCropper :op="{fixedNumber:[16,9]}" @result="uploadSuccess"></imageCropper>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import imageCropper from '../../components/common/cropper'
    import industryData from '../../constant/industry.js'
    import { regionData } from 'element-china-area-data'
    import { getSelectArray } from '../../util/index.js'
    export default {
        name: 'investedItemCreate',
        components: {
            imageCropper
        },
        beforeMount() {

        },
        data() {
            return {
                options: regionData,
                rules: {
                    name: [
                        { required: true, message: '请输入项目标题', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入项目标题', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    summary: [
                        { required: true, message: '请输入项目描述', trigger: 'blur' },
                        { min: 2, max: 80, message: '长度在 2 到 80 个字符', trigger: 'blur' }
                    ],
                    industry: [
                        { required: true, type: 'number', message: '请选择行业分类', trigger: 'change' }
                    ],
                    totalInvestAmount: [
                        { required: true, min: 0, type: 'number', message: '请输入总投资额', trigger: 'blur' },

                    ],
                    selectedOptions: [
                        { type: 'array', required: true, message: '请选择所属地区', trigger: 'change' }
                    ],
                    enterpriseName: { required: true, message: '请输入企业名称', trigger: 'blur' },
                    creditCode: [
                        { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                    ]
                },
                industryData,
                editChannelMarkChange: false,
                projectChannel: {
                    channelType: 1,
                    channelMark: '',
                    channelDesc: ''
                },
                form: {
                    name: '',
                    summary: '',
                    industry: 1,
                    selectedOptions: [],
                    regionCode: '',
                    businessArea: '',
                    totalInvestAmount: '',
                    imgUrl: '',
                    enterpriseName: '',
                    creditCode: '',
                    status:20
                }
            }
        },
        methods: {
            beforeImgUpload(file) {
                let isPic = false
                let fileSize = file.size / 1024 / 1024
                let fileType = file.type
                if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif') {
                    isPic = true
                }
                const isLt50 = fileSize < 2
                if (!isPic) {
                    this.$message.error('上传的图片格式为png、jpg、gif!')
                    return isPic
                } else if (!isLt50) {
                    this.$message.error('上传图片大小不能超过 2M!')
                    return false
                }
                return isPic && isLt50
            },
            channelMarkUploadSuccess(data){
                if (data.head.success) {
                    this.projectChannel.channelMark = JSON.parse(data.objectLiteral)
                }else{
                    this.$message.error(data.head.information)
                }
            },
            ImgUploadSuccess(data) {
                if (data.head.success) {
                    this.form.imgUrl = JSON.parse(data.objectLiteral)
                }else{
                    this.$message.error(data.head.information)
                }
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.form.totalInvestAmount=this.form.totalInvestAmount*10000
                        this.$store.dispatch('addAtiProjectInfo', this.form).then((data) => {
                            if (data.flag) {
                                this.projectChannel.projectId = data.resutl
					            this.$store.dispatch('item_addProjectChannel', this.projectChannel)
                                this.$message.success(data.message)
                                this.$router.push({ path: '/investedItemList' })
                            }
                        })
                    }

                })

            },
            //上传成功时返回的数据
            uploadSuccess(data) {
                if (data) {
                    this.projectChannel.channelMark = data
                    this.editChannelMarkChange = false
                }
                
            },
            handleRegionCodeChange(value) {
                let addressCode = ''
                if (value.length > 0) {
                    addressCode = value[value.length - 1]
                }
                this.form.regionCode = addressCode
            }
        }
    }
</script>