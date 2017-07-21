<template>
    <div class="banner-manager" id="msg-images">
        <div class="container-width">
            <div class="button-box">
                <div class="up-img">
                    <el-upload class="upload-demo" ref="upload" action="/ajax/banner_uploadByFile" :data="fileParam" list-type="picture" :show-file-list="true" :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handOnChange" :file-list="uploadList" :auto-upload="false" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传图片，且不超过5M</div>
                    </el-upload>
                </div>
    
                <!--<button class="btn btn-warning delete-btn">删 除</button>-->
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
                                    <img src="../../assets/images/delete.png" @click="deleteImage(value.banner_id)" class="delete-img">
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
            uploadList: [],
            param: {},
            fileParam: {},
            pageNo: 1,
            pageSize: 10,
            picfile: {},
            // fileList: [
            //     {
            //         name: '王一山', 
            //         url: require('../../assets/images/banner.png'),
            //         uploadDate:'2017-03-25 12:34:12',
            //         size:'112kb'
            //     },
            //     {
            //         name: '刘大力', 
            //         url: require('../../assets/images/banner.png'),
            //         uploadDate:'2017-03-25 12:34:12',
            //         size:'112kb'
            //     },
            //     {
            //         name: '刘大力', 
            //         url: require('../../assets/images/banner.png'),
            //         uploadDate:'2017-03-25 12:34:12',
            //         size:'112kb'
            //     },
            //     {
            //         name: '刘大力', 
            //         url: require('../../assets/images/banner.png'),
            //         uploadDate:'2017-03-25 12:34:12',
            //         size:'112kb'
            //     }
            // ],
        };
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
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
    width: 20px;
    position: absolute;
    top: -11px;
    right: -11px;
    cursor: pointer;
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