<template>
    <div class="banner-manager" id="msg-images">
        <div class="container-width">
            <div class="button-box">
                <el-button type="primary" @click="dialogFormVisible=true">添加轮播图</el-button>
                
                <!--<button class="btn btn-warning delete-btn">删 除</button>-->
                <!-- <div class="up-img">
                    <el-upload class="upload-demo" ref="upload" action="/ajax/banner_uploadByFile" :data="fileParam" list-type="picture" :show-file-list="true" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="uploadList" :auto-upload="false" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传图片，且不超过5M</div>
                    </el-upload>
                </div> -->
            </div>
            <el-row :gutter="20">
                <div v-for="(value,index) in bannerList.records">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <dl class="banner-detail">
                                <dt>
                                    <!-- :src="value.image_parh" v-if="value.image_parh"-->
                                    <img :src="value.image_parh" class="banner-i">
                                </dt>
                                <dd>
                                    <p>{{value.upload_time}}
                                        <span class="file-size fr">{{value.image_size}}KB</span>
                                    </p>
                                    <p>上传人：{{value.upload_user_name}}</p>
                                    <i class="iconfont icon-guanbi delete-img" @click="deleteImage(value.banner_id)"></i>
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
        <el-dialog title="添加轮播图" :visible.sync="dialogFormVisible" @close="resetForm">
            <el-form :model="fileParam" ref="fileParam" :label-width="'140px'" label-position="left" >
              <el-form-item label="上传图片" prop="imageUrl" :rules="[{ required: true, message: '请上传轮播图', trigger: 'blur,change' }]"> 
                 <el-button type="default" @click="chooseFile" >选择图片</el-button><br>
                 <img class="uploadImage" v-if="fileParam.imageUrl&&fileParam.imageUrl.length>0" :src="fileParam.imageUrl" :alt="fileParam.bannerName" >
                 <input style="display:none;" accept="image/jpeg,image/gif,image/png" type="file" name="file" id="uploadFileForBanner" @change="getFile">
              </el-form-item>
              <el-form-item label="轮播图链接地址"  prop="targetSrc" :rules="[{ required: true, message: '请设置轮播图链接地址', trigger: 'blur,change' }]">
                <el-input v-model="fileParam.targetSrc"></el-input>
              </el-form-item>
              <el-form-item label="显示顺序"  prop="show_sequence" :rules="[{ required: true,type:'number', message: '请设置轮播顺序', trigger: 'blur' }]">
                <el-input-number v-model.number="fileParam.show_sequence"  :min="1" ></el-input-number><br>
                <p style="color:gray">数值越大显示顺序越前面</p>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm">取 消</el-button>
              <el-button type="primary" @click="submitForm">添加</el-button>
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
    mounted() {

        this.param = {
            pageSize: this.pageSize,
            pageNo: this.pageNo
        }
        this.$store.dispatch('show_imageList', this.param);
    },
    computed: {
        bannerList: function () {      //show_imageList
            if (!this.$store.state.content.showImageList) {
                return { records: [],count:0 }
            } else {
                return this.$store.state.content.showImageList;
            }
        },
        bannerUpload: function () {    //banner_uploadByFile
            return this.$store.state.content.uploadBanner;
        },
        bannerDelete: function () {    //delete_bannerById
            return this.$store.state.content.deleteBanner;
        },
    },
    data() {
        return {
            dialogFormVisible:false,
            uploadList: [],
            param: {},
            
            fileParam: {
                show_sequence:1,
                targetSrc:'',
                imageUrl:''
            },
            pageNo: 1,
            pageSize: 10,
            picfile: {}
        };
    },
    methods: {
        submitForm(){
            this.$refs['fileParam'].validate((valid)=>{
                if(valid){
                    let self=this;
                    let fd=new FormData();
                    fd.append('file',document.getElementById('uploadFileForBanner').files[0]);
                    fd.append('bannerName',this.fileParam.bannerName)
                    fd.append('bannerType',this.fileParam.bannerType)
                    fd.append('uploadUseId',this.fileParam.uploadUseId)
                    fd.append('bannerSize',this.fileParam.bannerSize)
                    fd.append('targetSrc',this.fileParam.targetSrc)
                    fd.append('show_sequence',this.fileParam.show_sequence)
                    this.$http.post('/ajax/banner_uploadByFile',fd).then((res)=>{
                        if(!res.body.success){
                            this.$message.warning(res.body.information);
                        }else{
                            this.$message.success(res.body.information);
                        }
                    })
                }
            })
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        chooseFile(){
            document.getElementById('uploadFileForBanner').click()
        },
        getFile(){
            let self=this;
            let file=document.getElementById('uploadFileForBanner').files[0];
            let fileSize = file.size / 1024 / 1024;
            let fileType = file.type;
            let isPic=false;
            //this.picfile = file;
            if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif') {
                isPic = true;
            }
            const isLt5 = fileSize < 5;
            if (!isPic) {
                this.$message.error('上传的图片格式为png、jpg、gif!');
                return isPic;
            } else if (!isLt5) {
                this.$message.error('上传图片大小不能超过 5M!');
                return isLt5;
            } else {
                this.fileParam.bannerName = file.name;
                this.fileParam.bannerType = 1;
                this.fileParam.uploadUseId = this.$store.state.login.actor.id;
                this.fileParam.bannerSize = file.size;
            }
            let fr=new FileReader();
            fr.onload=function(){
                self.fileParam.imageUrl=this.result;
            }
            fr.readAsDataURL(file);
            fr=null;
        },  
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        resetForm(){
            this.$refs['fileParam'].resetFields();
            this.dialogFormVisible=false;
        },
        handOnChange(file, fileList) {
            //this.fileParam.file=file;
            console.log(fileList);
        },
        handlePreview(file) {
            console.log(file.url + '/' + file.name);
        },
        beforeAvatarUpload(file) {
            let isPic = false;
            console.log(file.name + '.........' + file.url);
            let fileSize = file.size / 1024 / 1024;
            let fileType = file.type;
            //this.picfile = file;
            if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif') {
                isPic = true;
            }
            const isLt5 = fileSize < 5;
            if (!isPic) {
                this.$message.error('上传的图片格式为png、jpg、gif!');
                return isPic;
            } else if (!isLt5) {
                this.$message.error('上传图片大小不能超过 5M!');
                return isLt5;
            } else {
                this.fileParam.bannerName = file.name;
                this.fileParam.bannerType = 1;
                this.fileParam.uploadUseId = this.$store.state.login.actor.id;
                this.fileParam.bannerSize = fileSize.toFixed(3);
                // this.$store.dispatch('banner_uploadByFile',this.fileParam).then(() =>{
                //     this.$message.success('上传成功!');
                // }).catch(() =>{
                //     //this.$message.error('上传失败!');
                // });
            }
            return isPic && isLt5;
        },
        uploadSuccess(res, file, fileList) {
            console.log(res);
            if (res) {
                this.$store.dispatch('show_imageList', this.param);
                this.uploadList = [];
            }
        },
        handleSizeChange(val) {
            this.param.pageSize = val;
            this.param.pageNo = 1;
            this.$store.dispatch('show_imageList', this.param);
        },
        handleCurrentChange(val) {
            this.param.pageNo = val;
            this.$store.dispatch('show_imageList', this.param);
        },
        deleteImage(id) {
            this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this;
                this.param.id = id;
                this.param.deletor = this.$store.state.login.actor.name;
                this.$store.dispatch('delete_bannerById', this.param).then(() => {
                    that.$store.dispatch('show_imageList', this.param);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '删除失败!'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }

}
</script>


<style scoped>
    .uploadImage{
        margin:20px auto 10px 0;

        width:400px;
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
    width: 720px;
    margin: auto;
}

.banner-detail .delete-img {
    top:-15px;
    right:-15px;
    width: 30px;
    height: 30px;
    font-size: 30px;
    position: absolute;
    cursor: pointer;
    /*display:none;*/
}
.banner-detail .delete-img:hover {
    color:#06ccb7;
    /*display:none;*/
}

.banner-detail dt {
    height: 160px;
    overflow: hidden
}

.banner-detail .banner-i {
    width: 100%;
}

.banner-detail dd>p {
    margin: 0;
}

.banner-detail dd {
    margin-top: 10px
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