<style>
.step1 {
    padding: 30px 50px;
    background: white;
    margin: 0 auto;
    min-width:720px;width:80%
}

.model-divider {
    margin-bottom: 20px;
}

.model-divider span {
    margin-left: 5px;
    color: #333333;
    font-size: 18px;
    font-weight: bold;
    vertical-align: middle;
}
.model-divider img{vertical-align: middle;}
.money .el-col {
    margin-right: 10px;
}

.money .el-upload__input {
    display: none !important;
}

.money .upload-img {
    margin-top: 20px;
}

.choose-area {
    overflow: hidden;
}

.choose-area .el-form-item {
    float: left;
}

.footer-button {
    margin-top: 20px;
    background: white;
    overflow: hidden;
    padding-bottom: 30px;
}

.description .el-textarea__inner {
    min-height: 80px;
    resize: none;
}

.person-box {
    position: relative;
}

.person-info {
    overflow: hidden;
    background: #fafafa;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    padding: 10px 0;
    margin-bottom: 20px;
}

.head-img {
    width: 140px;
    height: 180px;
    margin: 0 20px 0 10px;
}

.icon-group {
    position: absolute;
    right: 0;
    top: -10px;
}

.edit-con{
    margin-bottom: 40px;
}

/*添加团队成员弹窗*/
.myhead .el-upload__input {
    display: none !important;
}

.upload-projectImg .el-upload{
    width:80%;
    height:300px;
    border:1px solid rgb(191, 217, 217);
    border-radius: 10px;
}
.upload-projectImg .el-upload:hover{
    border:1px dashed #06ccb7;
    border-radius: 10px;
}
.upload-projectImg img{
    width:100%;
    height:300px;
    line-height: 300px;
    vertical-align: middle;
    border:1px solid rgb(191, 217, 217);
    border-radius: 10px;
}
.upload-projectImg img:hover{
    width:100%;
    height:300px;
    line-height: 300px;
    vertical-align: middle;
    border:1px dashed #06ccb7;
    border-radius: 10px;
}
.avatar-uploader-icon{
    width:100%;
    height:300px;
    color:rgb(191, 217, 217);
    line-height: 300px;
    font-size:40px;
    vertical-align: middle;
}
</style>
<template>
    <div class="content" style="background:#f5f5f5;">
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button>
        </div>
        <div class="step1">
            <el-form ref="form" :model="form" :rules="rules">
                <div class="model-divider">
                    <img src="../../../assets/images/linear.png" />
                    <span>项目情况</span>
                </div>
                <el-form-item class="money" label-width="140px">
                    <el-upload class="upload-img upload-projectImg" action="/ajax/fileupload" :data="{fileType:1}"  accept="image/*"
                         :auto-upload="true" :show-file-list="false" v-loading="projectImgLoading"
                        :on-success="successUpload_projectURL"  :before-upload="uploadBeforeForProjectImage" >
                        <img v-if="projectImg" :src="projectImg" v-loading="projectImgLoading">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpeg/jpg/png文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>
                <div class="edit-con" v-if="editorRender">
                    <quill-editor v-model="content" ref="myQuillEditor" > </quill-editor>
                </div>
                <div class="model-divider">
                    <img src="../../../assets/images/linear.png" />
                    <span>企业基本情况</span>
                </div>
                <el-form-item label="企业名称" prop="name" label-width="190px">
                    <el-input v-model="form.name" :maxlength="32"></el-input>
                </el-form-item>
                <el-form-item label="所属行业" label-width="190px" required prop="industry">
                    <el-radio-group v-model="form.industry">
                        <el-radio v-for="(item,index) in industryData" :key="index" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="description" label="统一社会信用代码" :maxlength="32" prop="creditCode" label-width="190px">
                    <el-input v-model="form.creditCode"></el-input>
                </el-form-item>
                <div class="model-divider">
                    <img src="../../../assets/images/linear.png" />
                    <span>项目经验</span>
                </div>
                <el-form-item class="description" label="已有运营中的实体项目数" label-width="190px" prop="existProjectNum">
                    <el-input-number v-model.number="form.existProjectNum"  :min="0"></el-input-number>
                </el-form-item>
                <div class="model-divider">
                    <img src="../../../assets/images/linear.png" />
                    <span>经营管理团队信息</span>
                </div>
                <div>
                    <div class="person-box" v-for="(item,index) in enterpriseMembers">
                        <div class="person-info" >
                            <el-col style="width:170px">
                                <img class="head-img" :src="item.imageURL" :alt="item.imageURL"/>
                            </el-col>
                            <el-col style="width:600px">
                                <div class="person-intro">
                                    <h4>{{item.name}}
                                        <span>{{item.position}}</span>
                                    </h4>
                                    <p style="color:#999999;">{{item.profile}}</p>
                                    <span>{{item.mobileNumber}}</span>
                                    <br/>
                                    <span>{{item.education|education}}</span>
                                    <br/>
                                    <span>{{item.identNumber}}</span>
                                </div>
                            </el-col>
                        </div>
                        <div class="icon-group">
                            <el-button-group>
                                <el-button type="primary" icon="edit" @click.native="editEnterpriseMember(item)" size="mini"></el-button>
                                <el-button type="primary" icon="delete" @click.native="deleteEnterpriseMember(item)" size="mini"></el-button>
                            </el-button-group>
                        </div>
                    </div>
                    <el-button @click="addEnterpriseMember()" style="width: 130px;margin-bottom:20px;" type="primary">
                        <i class="el-icon-plus"></i>添加团队成员</el-button>
                </div>
                <div class="model-divider">
                    <img src="../../../assets/images/linear.png" />
                    <span>参考资料</span>
                </div>
                <div class="choose-area">
                    <el-form-item class="money" prop="img1" label-width="140px">
                        <el-upload class="upload-img" action="/ajax/fileupload"  :auto-upload="true" :data="{fileType:2}"
                            :on-success="successUpload_planFile"  :disabled="planFile.length>0" :file-list="plan_materials"
                            :before-upload="uploadBefore"
                         list-type="picture-card" :on-remove="handlePlanFileRemove">
                            <el-button size="small" type="primary">上传商业计划书</el-button>
                            <div slot="tip" class="el-upload__tip">文件大小10MB以内</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="money" prop="img2" label-width="40px">
                        <el-upload class="upload-img" action="/ajax/fileupload"  :auto-upload="true" :data="{fileType:2}" 
                         :on-success="successUpload_otherFiles" :on-remove="handleOtherFileRemove" :file-list="others_materials"
                         :before-upload="uploadBefore"  
                         list-type="picture-card" >
                            <el-button size="small" type="primary">上传其他资料</el-button>
                            <div slot="tip" class="el-upload__tip">文件大小10MB以内</div>
                        </el-upload>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="footer-button">
            <div class="step1">
                <el-button style="float: right;width: 130px;" type="primary" @click="onSubmit">下一步</el-button>
                <el-button style="float: right;width: 130px;margin-right:20px;" type="primary" @click="prevstep">上一步</el-button>
            </div>
        </div>
        <!--添加团队成员弹窗-->
        <div class="p-form">
            <dialogComponent :title="title1" :dialogFormVisible="dialogTeamVisible" @dialog-confirm-callback="team" @dialog-cancel-callback="cancel">
                <el-form :model="teamform" :rules="teamrule" ref="teamform">
                    <el-form-item class="myhead" prop="imageURL" label="上传头像" label-width="170px">
                        <img class="enterpriseMember-head-image"  :src="teamform.imageURL" v-if="!!teamform.imageURL" alt=""><br>
				        <el-button size="small" @click="editHeadImgChange=true">上传头像</el-button>
                    </el-form-item>
                    <el-form-item label="法定代表人" prop="isRepresent"  label-width="140px">
                        <el-checkbox v-model="isRepresent"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name"  label-width="140px">
                        <el-input v-model="teamform.name" :maxlength="16"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobileNumber"  label-width="140px">
                        <el-input v-model="teamform.mobileNumber" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="identNumber" label-width="140px">
                        <el-input v-model="teamform.identNumber" :maxlength="18" ></el-input>
                    </el-form-item>
                    <el-form-item label="学历" prop="education" label-width="140px">
                        <el-select v-model="teamform.education" style="width:350px;" placeholder="请选择">
                            <el-option v-for="(item,index) in educations" :key="index"  :value="item.value" :label="item.lable">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="婚姻状况" prop="marriage" label-width="140px">
                        <el-radio-group v-model="teamform.marriage">
                            <el-radio :label="1">已婚</el-radio>
                            <el-radio :label="2">未婚</el-radio>
                            <el-radio :label="3">离异</el-radio>
                            <el-radio :label="4">其他</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="职位" prop="position" label-width="140px" :maxlength="16">
                        <el-input v-model="teamform.position"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="profile" label-width="140px" :maxlength="512">
                        <el-input v-model="teamform.profile" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
            </dialogComponent>
        </div>
        <div class="p-form">
            <el-dialog title="头像修改" :visible.sync="editHeadImgChange" :close-on-click-modal="false">
                    <imageCropper :op="{fixedNumber:[140,180]}" @result="successUpload_memberimageURL"></imageCropper>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import dialogComponent from '../../../components/common/dialog'
import editor from '../../../components/editor/editor.vue'
import educations from '../../../constant/education.js'
import industryData from '../../../constant/industry.js'
import imageCropper from '../../../components/common/ImageDialogCropper'
export default {
    name:'itemStep2',
    components: {
        dialogComponent,
        'quill-editor':editor,
        imageCropper
    },
    computed: {
        enterpriseMembers:function(){
            return this.$store.state.enterprise.enterpriseMember||{}
        },
        itemManageDetail: function () {
            return this.$store.state.item.itemManageDetail||{};
        },
        enterpriseInfo: function () {
            return this.$store.state.enterprise.enterpriseInfo || {};
        },
        detailedIntroduction:function(){
            return this.$store.state.item.detailedIntroduction||{};
        },
        materials:function(){
            return this.$store.state.item.materials||{};
        }
    },
    mounted () {
        this.editorRender=true;
        this.$store.dispatch('item_getManageDetail', { id: this.$route.params.id }).then(()=>{
            if(this.itemManageDetail.enterpriseId||this.itemManageDetail.detailedIntroductionId){
                this.editFlag=true;
            }else{
                return;
            }
            if(this.itemManageDetail.imageURL){
                this.projectImg=this.itemManageDetail.imageURL||'';
            }
            if(this.itemManageDetail.enterpriseId){
                this.$store.dispatch('enterprise_getInfo',{id:this.itemManageDetail.enterpriseId}).then(()=>{
                    this.form.existProjectNum=this.enterpriseInfo.existProjectNum;
                    this.form.name=this.enterpriseInfo.name;
                    this.form.creditCode=this.enterpriseInfo.creditCode;
                    this.form.industry=parseInt(this.enterpriseInfo.industry);
                })
            }
            if(this.itemManageDetail.detailedIntroductionId){
                this.$store.dispatch('item_getDetailedIntroduction',{id: this.itemManageDetail.detailedIntroductionId}).then(()=>{
                    this.content=this.detailedIntroduction.content;
                })
            }
            this.$store.dispatch('item_selectMaterialByProjectId',{id:this.$route.params.id}).then(()=>{
                for (var i = 0; i < this.materials.length; i++) {
                    var item = this.materials[i];
                    if(item.name.indexOf('商业计划书')!=-1){
                        this.planFile=item.materialURL;
                        this.plan_materials=[{name:item.name,response:{objectLiteral:item.materialURL},url:item.materialURL}];
                    }else{
                        this.others_materials.push({name:item.name,url:item.materialURL,response:{objectLiteral:item.materialURL}});
                    }
                }
                
            })
            return this.$store.dispatch('enterprise_getMemberInfo',{id:this.itemManageDetail.enterpriseId});
        })
    },
    data() {
        return {
            editHeadImgChange:false,
            editorRender:false,
            industryData:industryData,
            editFlag:false,
            content: '',
            plan_materials:[],
            others_materials:[],
            educations:educations,
            dialogTeamVisible: false,
            title1: "添加团队成员",
            projectImg:'',
            projectImgLoading:false,
            planFile:'',
            otherFiles:[],
            isRepresent:true,
            form: {
                existProjectNum: 0,
                name: '',
                industry:64 ,
                creditCode: ''
            },
            teamform: {
                id:'',
                imageURL:'',
                name: '',
                mobileNumber: '',
                identNumber: '',
                education: '',
                marriage:4,
                position: '',
                profile: ''
            },
            teamrule: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                mobileNumber: [
                    {required: true,trigger: 'blur',validator:(rule, value, callback) => {
                            if (value =='') {
                                callback(new Error('请输入手机号码'));
                            }else if(!/^1(3|4|5|7|8)\d{9}$/.test(this.teamform.mobileNumber)){
                                callback(new Error('手机号输入格式有误'));
                            }else{
                                callback();
                            }
                    }}
                ],
                identNumber: [
                    {required: true,trigger: 'blur',validator:(rule, value, callback) => {
                            if (value =='') {
                                callback(new Error('请输入身份证信息'));
                            }else if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.teamform.identNumber)){
                                callback(new Error('身份证输入格式有误'));
                            }else{
                                callback();
                            }
                    }} 
                ],
                education: [
                    { required: true,type:'number', message: '请输入学历', trigger: 'blur' }
                ],
                profile: [
                    { required: true, message: '请输入简介', trigger: 'blur' }
                ]
            },
            rules: {
                name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                industry:[
                    { required: true,type:'number', message: '请选择行业', trigger: 'blur' }
                ],
                creditCode: [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                ]
            },
            editMember:'',//编辑团队成员专用
            successFlag:true
        }
    },
    methods: {
        uploadBefore(file){
            if(file.size>=10*1024*1024){
                this.$message.warning('上传文件大小不能超过10mb')
                return false;
            }
        },
        uploadBeforeForProjectImage(file){
            if(file.size>=2*1024*1024){
                this.$message.warning('上传文件大小不能超过2mb')
                return false;
            }
            this.projectImgLoading=true;
        },
        uploadBeforeForImage(file){
            if(file.size>=2*1024*1024){
                this.$message.warning('上传文件大小不能超过2mb')
                return false;
            }
        },
        successUpload_projectURL(response,file,fileList){
            this.projectImg=JSON.parse(response.objectLiteral);
            this.projectImgLoading=false;
        },
        successUpload_memberimageURL(data){
            this.teamform.imageURL=data;
            this.editHeadImgChange=false;
        },
        successUpload_planFile(response,file,fileList){
            this.planFile=JSON.parse(response.objectLiteral);
        },
        successUpload_otherFiles(response,file,fileList){
            this.otherFiles=fileList;
        },
        handlePlanFileRemove(file, fileList) {
            this.planFile='';
        },
        handleOtherFileRemove(file, fileList){
            this.otherFiles=fileList;
        },
        prevstep() {
            this.$router.go(-1);
        },
        uploadMaterial(){
            this.$store.dispatch('item_deleteMaterialByFinId',{param:{id:this.$route.params.id},vue:this}).then(()=>{
                if(this.planFile&&this.planFile.length>0){
                    let planFileParam={
                        materialURL:this.planFile,
                        name:'商业计划书'+this.planFile.slice(this.planFile.lastIndexOf('.')==-1?this.planFile.length:this.planFile.lastIndexOf('.'),this.planFile.length),
                        projectId:this.$route.params.id
                    }
                    this.$store.dispatch('item_createMaterial',{param:planFileParam,vue:this});
                }
                for (let i = 0; i < this.otherFiles.length; i++) {
                    let item = this.otherFiles[i];
                    if(item.name.indexOf('商业计划书')!=-1){
                        this.$message.warning('请在商业计划书上传中上传商业计划书')
                        break;
                    }
                    let param={
                        materialURL:JSON.parse(item.response.objectLiteral),
                        name:item.name,
                        projectId:this.$route.params.id
                    }
                    this.$store.dispatch('item_createMaterial',{param,vue:this});
                }
            })
        },
        onSubmit() {
            if (this.projectImg.length == 0) {
                this.$message.warning('请上传项目展示图！');
                return false;
            }
            if(this.content.length == 0){
                this.$message.warning('请完成项目介绍!');
                return false;
            }
            if(this.enterpriseInfo.representativeId&&this.enterpriseInfo.representativeId.length==0){
                this.$message.warning('请在团队成员中勾选一个法定代表人')
                return;
            }
            if (!this.itemManageDetail.enterpriseId&&this.$store.state.item.enterpriseId.length == 0) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let enterpriseParam=JSON.parse(JSON.stringify(this.form));
                        enterpriseParam.addressCode=this.itemManageDetail.regionCode;
                        enterpriseParam.existProjectNum=this.form.existProjectNum;
                        this.$store.dispatch('item_createEnterprise', { param: enterpriseParam, vue: this }).then(()=>{
                            if(this.$store.state.item.enterpriseId.length == 0){
                                this.$message.warning('创建融资企业失败')
                                return;
                            }
                            this.uploadMaterial();
                            this.saveStep2();
                        })
                    } else {
                        return false;
                    }
                });
            }else{
                this.$refs['form'].validate((valid) => {
                        if (valid) {
                            let param=this.form;
                            param.addressCode=this.itemManageDetail.regionCode;
                            param.existProjectNum=this.form.existProjectNum;
                            param.enterpriseId=this.itemManageDetail.enterpriseId||this.$store.state.item.enterpriseId;
                            this.$store.dispatch('item_updateEnterprise', { param: param, vue: this })
                        } else {
                            return false;
                        }
                });
                this.uploadMaterial();
                this.saveStep2();
            } 
        },
        saveStep2(){
            let projectParam = {
                    imageURL: this.projectImg,
                    id: this.$route.params.id,
                    enterpriseId: this.itemManageDetail.enterpriseId||this.$store.state.item.enterpriseId
                }
            if(this.editFlag&&this.itemManageDetail.detailedIntroductionId){
                this.$store.dispatch('item_updateDetailedIntroduction', { param: {id:this.itemManageDetail.detailedIntroductionId,content: this.content }, vue: this })
                this.$store.dispatch('item_updateProjectForAffrim', { param: projectParam, vue: this }).then(()=>{
                            this.$store.commit('item_setClearCreateItemData')
                            this.$router.push('/itemStep3/' + this.$route.params.id)
                        })
            } else {
                this.$store.dispatch('item_createDetailedIntroduction', { param: { content: this.content }, vue: this }).then(() => {
                    if (this.$store.state.item.detailedIntroductionId && this.$store.state.item.detailedIntroductionId.length > 0) {
                        projectParam.detailedIntroductionId = this.$store.state.item.detailedIntroductionId;
                        this.$store.dispatch('item_updateProjectForAffrim', { param: projectParam, vue: this }).then(()=>{
                            this.$store.commit('item_setClearCreateItemData');
                            this.$router.push('/itemStep3/' + this.$route.params.id);
                        })
                    }
                })
            }
        },
        addEnterpriseMember(){//点击添加团队成员 
            this.editMember='';
            this.isRepresent=false;
            this.teamform= {
                id:'',
                imageURL:'',
                name: '',
                mobileNumber: '',
                identNumber: '',
                education: '',
                marriage:4,
                position: '',
                profile: ''
            }
            if((this.$store.state.item.enterpriseId.length == 0&&!this.itemManageDetail.enterpriseId)||(!this.itemManageDetail.enterpriseId&&this.editFlag)){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('item_createEnterprise',{param:this.form,vue:this}).then(()=>{
                            if(this.$store.state.item.enterpriseId.length>0){
                                let projectParam = {
                                    enterpriseId: this.$store.state.item.enterpriseId,
                                    id: this.$route.params.id
                                }
                                this.$store.dispatch('item_updateProjectForAffrim', { param: projectParam, vue: this }).then(()=>{
                                    this.dialogTeamVisible = true;
                                    if(this.$refs['teamform']){
                                        this.$refs['teamform'].resetFields();
                                    }
                                })
                            }else{
                                this.$message.warning('创建企业失败');
                            }
                        })
                    } else {
                        this.$message.warning('请完善企业信息');
                        return false;
                    }
                });
            }else{
                this.dialogTeamVisible = true;
            }
        },
        editEnterpriseMember(item){
            this.teamform= {
                id:'',
                imageURL:'',
                name: '',
                mobileNumber: '',
                identNumber: '',
                education: '',
                marriage:4,
                position: '',
                profile: ''
            }
            this.teamform=item;
            if(this.enterpriseInfo.representativeId===item.id){
                this.isRepresent=true;
            }else{
                this.isRepresent=false;
            }
            this.editMember=item.id;
            this.dialogTeamVisible = true;
        },
        deleteEnterpriseMember(item){
            this.$confirm(`确认删除这个团队成员${item.name}？`, '确认操作', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('item_updateEnterpriseMemberStatusById',{param:{
                        id:item.id,
                        enterpriseId:this.itemManageDetail.enterpriseId||this.$store.state.item.enterpriseId,
                        status:0
                    },vue:this})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        },
        team() {
            this.$refs['teamform'].validate((valid) => {
                if (valid) {
                    let param=this.teamform;
                    param.enterpriseId=this.itemManageDetail.enterpriseId||this.$store.state.item.enterpriseId;
                    if(this.editMember.length>0){
                        param.id=this.editMember;
                        this.$store.dispatch('item_updateEnterpriseMember',{param,vue:this}).then(()=>{
                            if(this.isRepresent&&this.enterpriseInfo.representativeId!=this.editMember){
                                param.id=this.itemManageDetail.enterpriseId;
                                param.representativeId=this.editMember;
                                this.$store.dispatch('item_updateEnterpriseRepresentative', { param: param, vue: this });
                            }
                            if(!this.isRepresent&&this.enterpriseInfo.representativeId==this.editMember){
                               this.$message.warning('请勾选其他团队成员的法定代表人复选款来变更法定代表人，只能变更不能取消')
                            }
                            this.editMember='';
                            
                        })
                    }else{
                        this.$store.dispatch('item_createEnterpriseMember',{param,vue:this}).then(()=>{
                            if(this.isRepresent&&this.$store.state.item.enterpriseMemberId.length>0){
                                let param={};
                                param.id=this.itemManageDetail.enterpriseId||this.$store.state.item.enterpriseId;
                                param.representativeId=JSON.parse(this.$store.state.item.enterpriseMemberId);
                                this.$store.dispatch('item_updateEnterpriseRepresentative', { param: param, vue: this });
                            }
                        })
                    }
                    this.teamform= {
                                id:'',
                                imageURL:'',
                                name: '',
                                mobileNumber: '',
                                identNumber: '',
                                education: '',
                                marriage:4,
                                position: '',
                                profile: ''
                    }
                    this.dialogTeamVisible = false;
                } else {
                    return false;
                }
            });
        },
        cancel(teamform) {
                    this.teamform= {
                        id:'',
                        imageURL:'',
                        name: '',
                        mobileNumber: '',
                        identNumber: '',
                        education: '',
                        marriage:4,
                        position: '',
                        profile: ''
                    }
            this.dialogTeamVisible = false;
        },
        back(){
            this.$store.commit('item_setClearCreateItemData');
            this.$router.go(-1);
        }
    }
}    
</script>


