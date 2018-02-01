<template>
    <div>
        <div class="back-button">
            <router-link :to="{path: '/enterpriseChangeAuditList'}">
                <el-button type="text" icon="arrow-left">返回上一级</el-button>
            </router-link>
        </div>
        <div class="hangjiashenhe">
            <h3>企业会员变更审核</h3>
            <ul>
                <li>
                    <label>企业名称</label>
                    <span>{{actor.name}}</span>
                </li>
                <li>
                    <label>统一社会信用代码</label>
                    <span>{{actor.identNumber}}</span>
                </li>
                <li>
                    <label>原所在地</label>
                    <span v-if="customer.actorEnter">{{customer.actorEnter.addressCode|address}}</span>
                </li>
                <li>
                    <label>原法定代表人姓名</label>
                    <span v-if="customer.actorEnter">{{customer.actorEnter.repName||'未填写'}}</span>
                </li>
                <li>
                    <label>原法定代表人手机号</label>
                    <span v-if="customer.actorEnter">{{customer.actorEnter.repMobile||'未填写'}}</span>
                </li>
                <li>
                    <label>原法定代表人身份证号</label>
                    <span v-if="customer.actorEnter">{{customer.actorEnter.repIdcard||'未填写'}}</span>
                </li>
            </ul>
            <hr style="margin:0 50px;height:3px;background:rgb(155, 153, 153)">
            <ul>
                <li>
                    <label>新所在地</label>
                    <span>{{actorAudit.addressCode|address}}</span>
                </li>
                <li>
                    <label>新法定代表人姓名</label>
                    <span>{{actorAudit.repName}}</span>
                </li>
                <li>
                    <label>新法定代表人手机号</label>
                    <span>{{actorAudit.repMobile}}</span>
                </li>
                <li>
                    <label>新法定代表人身份证号</label>
                    <span>{{actorAudit.repIdcard}}</span>
                </li>
                <li>

                    <el-button @click="nameValidate" v-if="actorAudit.isRealName==0">
                        法定代表人实名认证
                    </el-button>
                    <label v-if="actorAudit.isRealName!=0">法定代表人实名认证</label>
                    <span v-if="actorAudit.isRealName!=0">{{actorAudit.isRealName==1?'通过':'不通过'}}</span>
                </li>
            </ul>
            <div class="btn-box-c">
                <el-button type="warning" :disabled="actorAudit.status==1" @click="dialogClosureVisible = true">拒绝</el-button>
                <el-button type="success" :disabled="actorAudit.status==1" @click="adopt">通过</el-button>
            </div>
        </div>
        <div class="p-form">
            <el-dialog title="拒绝理由" :visible.sync="dialogClosureVisible" @close="cancel" :close-on-click-modal="false">
                <el-form :model="refuseParam"  ref="refuseParam">
                    <el-form-item prop="rejection" required label="拒绝理由">
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
        name: 'enterpriseMemberChangeAudit',
        computed: {
            actorAudit: function () {
                return this.$store.state.customer.enterperiseAudit || {}
            },
            customer: function () {
                return this.$store.state.customer.customerIndividualInfoByActorId || {}
            },
            actor: function () {
                return this.$store.state.customer.customerInfoByActorId || {}
            }
        },
        data() {
            return {
                refuseParam: {
                    actorId: this.$route.params.actorId,
                    rejection: '',
                },
                dialogClosureVisible: false
            }
        },
        beforeMount() {

            let actorParams = {
                id: this.$route.params.actorId
            }
            this.$store.dispatch('selectActorAuditeById', {
                id: this.$route.params.id
            })
            this.$store.dispatch('customerIndividualInfoByActorId', actorParams)
            this.$store.dispatch('customerInfoByActorId', actorParams).then(() => {
                if (this.actor.email) {
                    this.actor.email = this.actor.email.address
                } else {
                    this.actor.email = ''
                }
            })
        },
        methods: {
            nameValidate() {
                let param = {
                    name: this.actorAudit.repName,
                    identNumber: this.actorAudit.repIdcard,
                    mobileNumber:this.actorAudit.repMobile,
                    id: this.$route.params.id
                }
                this.$store.dispatch('verifyIdcardForAudite', param).then((data) => {
                    
                    if(data.success){
                        this.$store.dispatch('selectActorAuditeById', {
                            id: this.$route.params.id
                        }).then(()=>{
                            this.$message({
                                message: this.actorAudit.isRealName==1?'实名认证通过':'实名认证不通过，三要素信息不符',
                                type: 'success'
                            })
                        })
                        
                    }else{
                        this.$message.warning(data.information)
                    }
                    
                })
            },
            adopt() {
                let adoptParam = {
                    id: this.$route.params.id,
                    status: 1,
                    rejection: this.refuseParam.rejection
                }
                this.$store.dispatch('updateActorAuditeStatus', adoptParam).then((data) => {
                    if (data.success) {
                        this.$message({
                            message: '审核通过',
                            type: 'success'
                        })
                        this.$router.push({ path: '/enterpriseChangeAuditList' })
                    } else {
                        this.$message.error(data.information)
                    }
                })
            },
            refuse() {
                this.$refs['refuseParam'].validate((valid) => {
                    if (valid) {
                        let adoptParam = {
                            id: this.$route.params.id,
                            status: 2,
                            rejection: this.refuseParam.rejection
                        }
                        this.$store.dispatch('updateActorAuditeStatus', adoptParam).then((data) => {
                            if (data.success) {
                                this.$message({
                                    message: '拒绝成功',
                                    type: 'success'
                                })
                                this.$router.push({ path: '/enterpriseChangeAuditList' })
                            } else {
                                this.$message.error(data.information)
                            }
                        })
                    }
                })

            },
            cancel() {
                this.dialogClosureVisible = false
            }
        }
    }
</script>



<style scoped>
    .businessLicenseURL {
        margin-left: 200px;
        text-align: center;
        width: 400px;
    }

    .hangjiashenhe {
        box-sizing: border-box;
        width: 60%;
        height: 100%;
        margin: 0 auto;
        padding-top: 20px;
        background-color: #fff;
        font-size: 14px;
    }

    .hangjiashenhe h3 {
        padding-top: 10px;
        margin-left: 50px
    }

    .hangjiashenhe ul {
        margin-left: 100px;
        list-style: none;
    }

    .hangjiashenhe li {
        margin-top: 10px;
    }

    .hangjiashenhe label {
        float:left;
        width: 100px;
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