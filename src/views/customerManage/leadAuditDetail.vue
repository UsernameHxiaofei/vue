<template>
    <div>
        <div class="back-button">
            <router-link :to="{path: '/leadAuditList'}">
                <el-button type="text" icon="arrow-left">返回上一级</el-button>
            </router-link>
        </div>
        <div class="hangjiashenhe">
            <h3 v-if="leadData.institution==1">个人信息</h3>
            <ul>
                <li>
                    <label>手机号</label>
                    <span>{{leadData.mobileNumber}}</span>
                </li>
                <li>
                    <label>真实姓名</label>
                    <span>{{leadData.realName}}</span>
                </li>
                <li>
                    <label>身份证号</label>
                    <span>{{leadData.identNumber}}</span>
                </li>
            </ul>
            <h3 v-if="leadData.institution==1">企业信息</h3>
            <ul>
                <li>
                    <label>关注行业</label>
                    <span class="zhuanzhuhangye">
                        <span>{{leadData.industry|industry}}</span>
                    </span>
                </li>
                <li v-if="leadData.institution!=1">
                    <label>所属单位</label>
                    <span>{{leadData.organization}}</span>
                </li>
                <li v-if="leadData.institution!=1">
                    <label>职位</label>
                    <span>{{leadData.position}}</span>
                </li>
                <li v-if="leadData.institution!=1">
                    <label>籍贯</label>
                    <span>{{leadData.birthplace|address}}</span>
                </li>
                <li v-if="leadData.institution!=1">
                    <label>常驻地区</label>
                    <span>{{leadData.permanent|address}}</span>
                </li>
                <li v-if="leadData.institution!=1">
                    <label>个人情况</label>
                    <span class="zhuanzhuhangye">
                        <span>{{leadData.industryLevel|industryLevel}}</span>
                    </span>
                </li>
                <li v-if="leadData.institution==1">
                    <label>企业名称</label>
                    <span>{{leadData.enterpriseName}}</span>
                </li>
                <li v-if="leadData.institution==1">
                    <label>统一社会信用代码</label>
                    <span>{{leadData.creditCode}}</span>
                </li>
                <li v-if="leadData.institution==1">
                    <label>所在地</label>
                    <span>{{leadData.regionCode|address}}</span>
                </li>
                <li v-if="leadData.institution==1">
                    <label>企业情况</label>
                    <span>{{leadData.industryLevel|enterpriseIndustryLevel}}</span>
                </li>
                <li>
                    <label>投资过的项目</label>
                    <span class="zhuanzhuhangye">
                        {{leadData.investment}}
                    </span>
                </li>
            </ul>
                <h3 v-if="leadData.institution==1">法定代表人信息</h3>
            <ul>
                <li v-if="leadData.institution==1">
                    <label>法定代表人</label>
                    <span>{{leadData.representative}}</span>
                </li>    
                <li v-if="leadData.institution==1">
                    <label>身份证号</label>
                    <span>{{leadData.representativeIdentNumber}}</span>
                </li>    
                <li v-if="leadData.institution==1">
                    <label>手机号</label>
                    <span>{{leadData.representativeMobileNumber}}</span>
                </li>    
            </ul>
                <h3 v-if="leadData.institution==1">营业执照</h3>
                <img v-imageBiger class="businessLicenseURL" v-if="leadData.institution==1" :src="leadData.businessLicenseURL" alt="">
            <div class="btn-box-c">
                <el-button type="warning" @click="dialogClosureVisible = true">拒绝</el-button>
                <el-button type="success" @click="adopt">通过</el-button>
            </div>
        </div>
        <!-- 拒绝理由弹窗 -->
        <div class="p-form">
            <el-dialog title="拒绝理由" :visible.sync="dialogClosureVisible" @close="cancel">
                <el-form :model="refuseParam" :rules="rules" ref="refuseParam">
                    <el-form-item prop="rejection" label="拒绝理由">
                        <el-input class="inputing" v-model="refuseParam.rejection" type="textarea" placeholder="请输入拒绝理由..."></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="refuse">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>



<script>
export default {
    computed: {
        leadAuditAdoptData: function () {
            return this.$store.state.customer.leadAuditAdoptData;
        },
        leadAuditRefuseData: function () {
            return this.$store.state.customer.leadAuditRefuseData;
        },
        leadData: function () {
            return this.$store.state.customer.leadData;
        },
    },
    data() {
        return {
            refuseParam: {
                actorId: this.$route.params.actorId,
                rejection: '',
            },
            dialogClosureVisible: false,
            rules: {
                rejection: [
                    { required: true, message: '请输入拒绝理由', trigger: 'blur' }
                ],

            },
        }
    },
    mounted() {
        let leadParam = {
            id: this.$route.params.actorId
        }
        this.$store.dispatch('leadByActorId', leadParam)
    },
    methods: {
        adopt() {
            let adoptParam = {
                id: this.$route.params.customerId
            }
            this.$store.dispatch('leadAudit_adopt', adoptParam).then(() => {
                if (this.leadAuditAdoptData.success) {
                    this.$message({
                        message: '审核通过！',
                        type: 'success'
                    });
                    this.$router.push({ path: '/leadAuditList' })
                } else {
                    this.$message.error('操作失败');
                }

            });
        },
        refuse() {
            this.$refs['refuseParam'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('leadAudit_refuse', this.refuseParam).then(() => {
                        if (this.leadAuditRefuseData.success) {
                            this.$message({
                                message: '拒绝成功！',
                                type: 'success'
                            });
                            this.dialogClosureVisible = false;
                            this.$router.push({ path: '/leadAuditList' })
                        } else {
                            this.$message.error('操作失败');

                        }

                    });
                }
            });
        },
        cancel() {
            this.$refs['refuseParam'].resetFields();
            this.dialogClosureVisible = false;
        },
    }
}
</script>



<style scoped>
.businessLicenseURL{
    margin-left:200px;
    text-align: center;
    width:400px;
}
body {
    background-color: #fcfcfc;
}

.content {
    background-color: #fcfcfc;
}

.hangjiashenhe {
    box-sizing: border-box;
    width: 60%;
    height: 100%;
    margin: 0 auto;
    padding-top:20px;
    background-color: #fff;
    font-size: 14px;
}
.hangjiashenhe h3{
    padding-top:10px;
    margin-left: 50px
}
.hangjiashenhe ul {
    margin-left: 100px;
}

.hangjiashenhe li {
    margin-top: 10px;
}

.hangjiashenhe label {
    display: inline-block;
    width: 150px;
    font-weight: 400;
    color: #999;
    text-align: right;
    margin-right: 20px;
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
</style>