<template>
    <div id='header'>
        <div id="userinfo">
            <div class="messageInfo">
                <i class="iconfont icon-xiaoxi"></i>
                <label></label>
                <span>6</span>
            </div>
            <span class="sepreate">|</span>
            <img src="../../assets/images/headimg.png" class="headimg" @click="editHeadImg" />
            <span class="username" v-html="actor.name"></span>
            <span class="setting">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="iconfont icon-shezhi"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="updateMyself">修改个人信息</el-dropdown-item>
                        <el-dropdown-item @click.native="editPasswordDialog = true">登录密码修改</el-dropdown-item>
                        <el-dropdown-item @click.native="exit">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </span>
        </div>
    
        <!-- 编辑用戶弹窗 -->
        <div class="p-form">
            <el-dialog title="个人信息修改" :visible.sync="dialogeditUserVisible" @close="cancel">
                <el-form :model="actor" :rules="actorRules" ref="editActor">
                    <el-form-item label="手机号" prop="mobileNumber">
                        <el-input v-model="actor.mobileNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="actor.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="identNumber">
                        <el-input v-model="actor.identNumber" auto-complete="off"></el-input>
                    </el-form-item>
    
                    <!--<el-form-item label="登录口令" :label-width="formLabelWidth" prop="loginPassword">
                                            <el-input v-model="actor.loginPassword" type="password" auto-complete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="口令确认" :label-width="formLabelWidth" prop="psw1">
                                            <el-input v-model="actor.psw1" type="password" auto-complete="off"></el-input>
                                        </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    
        <div class="p-form">
            <el-dialog title="修改登录密码" :visible.sync="editPasswordDialog">
                <el-form :rules="editPasswordRule" ref="editPassword" :model="password">
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="password.newPassword" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password">
                        <el-input v-model="password.password" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editPasswordDialog = false">取 消</el-button>
                    <el-button type="primary" @click="updateLoginPassword">确 认</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="p-form">
            <el-dialog title="头像修改" :visible.sync="editHeadImgChange">
                <imageCropper></imageCropper>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import imageCropper from '../common/imageCropper'

export default {
    name: 'header',
    components: {
      imageCropper  
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.password.newPassword !== '') {
                    this.$refs.editPassword.validateField('password');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.password.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            editHeadImgChange:false,
            password: {
                newPassword: '',
                password: ''
            },
            keyword: "",
            dialogeditUserVisible: false,
            editPasswordDialog: false,
            actorRules: {
                mobileNumber: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { pattern: /^[\u4E00-\u9FA5]+$/, message: '姓名只能为中文', trigger: 'blur' }
                ],
                identNumber: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确', trigger: 'blur' }
                ],
            },
            editPasswordRule: {
                // newPassword: [
                //     { required: true, message: '请输入新密码', trigger: 'blur' }
                // ],
                // password: [
                //     { required: true, message: '请输入确认密码', trigger: 'blur' }
                // ],
                newPassword: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },

        }
    },
    computed: {
        actor: function () {
            return this.$store.state.login.actor;
        },
        updateActorStatus: function () {
            return this.$store.state.system.updateActorStatus;
        },
        resetLoginPasswordStatus: function () {
            return this.$store.state.customer.resetLoginPasswordStatus;
        },
        loginPasswordStatus: function () {
            return this.$store.state.customer.loginPasswordStatus;
        },
    },
    methods: {
        editHeadImg(){
            this.editHeadImgChange=true;
        },
        updateMyself() {
            this.dialogeditUserVisible = true;
            // this.$store.dispatch('login_out',this);
        },
        onSubmit() {
            this.$refs['editActor'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('updateActor', this.actor).then(() => {
                        if (this.updateActorStatus.success) {
                            this.$message({
                                type: 'success',
                                message: '修改成功，请重新登录'
                            })
                            this.exit();
                            this.cancel();
                        } else {
                            this.$message.error('修改失败')
                            this.cancel();
                        }
                    });
                }
            })
        },
        updateLoginPassword() {
            this.$refs['editPassword'].validate((valid) => {
                if (valid) {
                    let passwordParam = {
                        id: this.actor.id,
                        password: this.password.newPassword
                    }
                    this.$store.dispatch('updateLoginPassword', passwordParam).then(() => {
                        if (this.loginPasswordStatus) {
                            this.$message({
                                message: '修改成功！请重新登录',
                                type: 'success'
                            })
                            this.exit();
                            this.editPasswordDialog = false;
                        } else {
                            this.$message.error('修改失败');
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        resetPassword() {
            this.$confirm('此操作将重置登录口令, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let resetParam = {
                    id: this.actor.id
                }
                this.$store.dispatch('resetLoginPwById', resetParam).then(() => {
                    if (this.resetLoginPasswordStatus.success) {
                        this.$message({
                            message: '重置口令成功！请重新登录',
                            type: 'success'
                        })
                        this.exit();
                    } else {
                        this.$message.error('重置口令失败');
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消重置'
                });
            });
        },
        cancel() {
            this.$refs['editActor'].resetFields();
            this.dialogeditUserVisible = false;
        },
        exit() {
            this.$store.dispatch('login_out', this);
        },
        handleIconClick() {
            console.log(this.keyword);
        }
    }
}

</script>

<style lang="stylus" scoped>

    .setting i{
        font-size: 15px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .setting i:hover{
        color: rgba(51, 51, 51, 0.5);
        cursor: pointer;
    }
    .username{
        margin:-20px auto auto 20px;
        text-align: center;
        font-size: 15px;
    }
    .headimg{
        margin: -21px 0px -10px 20px;
        width: 54px;
        height:54px;
        border-radius: 50%;
    }
    .headimg:hover{
        
        border: 1px dashed rgb(6, 204, 182);
        cursor: pointer;
    }
    .sepreate {
        cursor: default;
        font-size: 30px;
        color: rgb(207, 216, 220);
    }

    .messageInfo {
        float: left;
        margin-right: 0px;
        width: 48px;
        height: 64px;
        color: rgb(51, 51, 51);
    }

    .messageInfo i {
        font-size: 27px;
    }

    .messageInfo i:hover {
        color: rgba(51, 51, 51, 0.5);
        cursor: pointer;
    }

    .messageInfo label {
        position: relative;
        left: -16px;
        top: -7px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: rgb(6, 204, 182);
    }

    .messageInfo span {
        position: relative;
        left: -26px;
        top: -15px;
        font-size: 12px;
        color: white;
    }

    #userinfo {
        position: absolute;
        top: 0;
        right: 25px;
        max-width: 330px;
        height: 64px;
    }

    #search {
        width: 260px;
        margin: 0 0 10px 30px;
    }

    #header {
        position: absolute;
        top: 0;
        right: 0;
        left: 230px;
        height: 64px;
        line-height: 64px;
        vertical-align: middle;
        background-color: #eceff1 !important;
    }
</style>