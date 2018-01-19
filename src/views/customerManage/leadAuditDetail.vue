<template>
    <div>
        <div class="back-button">
                <el-button type="text" @click="goback()" icon="arrow-left">返回上一级</el-button>
        </div>
        <div class="hangjiashenhe">
            <h3 v-if="actor.category==4">代理人</h3>
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
            <h3 v-if="actor.category==4">企业信息</h3>
            <ul>
                <li>
                    <label>关注行业</label>
                    <span class="zhuanzhuhangye">
                        <span>{{leadData.industry|industry}}</span>
                    </span>
                </li>
                <li v-if="actor.category!=4">
                    <label>所属单位</label>
                    <span>{{leadData.organization}}</span>
                </li>
                <li v-if="actor.category!=4">
                    <label>职位</label>
                    <span>{{leadData.position}}</span>
                </li>
                <li v-if="actor.category!=4">
                    <label>籍贯</label>
                    <span>{{leadData.birthplace|address}}</span>
                </li>
                <li v-if="actor.category!=4">
                    <label>常驻地区</label>
                    <span>{{leadData.permanent|address}}</span>
                </li>
                <li v-if="actor.category!=4">
                    <label>个人情况</label>
                    <span class="zhuanzhuhangye">
                        <span>{{leadData.industryLevel|industryLevel}}</span>
                    </span>
                </li>
                <li v-if="actor.category==4">
                    <label>企业名称</label>
                    <span>{{actor.name}}</span>
                </li>
                <li v-if="actor.category==4">
                    <label>统一社会信用代码</label>
                    <span>{{actor.identNumber}}</span>
                </li>
                <li v-if="actor.category==4">
                    <label>所在地</label>
                    <span>{{customer.actorEnter&&customer.actorEnter.addressCode|address}}</span>
                </li>
                <li v-if="actor.category==4">
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
                <h3 v-if="actor.category==4">营业执照</h3>
                <img v-imageBiger class="businessLicenseURL" v-if="actor.category==4" :src="leadData.businessLicenseURL" alt="">
            <div class="btn-box-c">
                <el-button type="warning" @click="dialogClosureVisible = true">拒绝</el-button>
                <el-button type="success" @click="adopt">通过</el-button>
            </div>
        </div>
        <!-- 拒绝理由弹窗 -->
        <div class="p-form">
            <el-dialog title="拒绝理由" :visible.sync="dialogClosureVisible" @close="cancel" :close-on-click-modal="false">
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
			return this.$store.state.customer.leadAuditAdoptData
		},
		leadAuditRefuseData: function () {
			return this.$store.state.customer.leadAuditRefuseData
		},
		leadData: function () {
			return this.$store.state.customer.leadData
        },
        actor: function () {
            return this.$store.state.customer.customerInfoByActorId
        },
        customer: function () {
                return this.$store.state.customer.customerIndividualInfoByActorId
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
	beforeMount() {
		let leadParam = {
			id: this.$route.params.actorId
        }
        this.$store.dispatch('customerInfoByActorId', leadParam).then(()=>{
            if(this.actor.email){
                this.actor.email=this.actor.email.address
            }else{
                this.actor.email=''
            }
        })
        this.$store.dispatch('customerIndividualInfoByActorId', leadParam)
        this.$store.dispatch('leadByActorId', leadParam)
        
	},
	methods: {
        goback(){
            let path='/personLeadAuditList'
            if(this.actor.category==4){
                path='/enterpriseLeadAuditList'
            }
            this.$router.push(path)
        },
		adopt() {
			let adoptParam = {
				id: this.$route.params.customerId
			}
			this.$store.dispatch('leadAudit_adopt', adoptParam).then(() => {
				if (this.leadAuditAdoptData.success) {
					this.$message({
						message: '审核通过！',
						type: 'success'
					})
					this.goback()
				} else {
					this.$message.error('操作失败')
				}
			})
		},
		refuse() {
			this.$refs['refuseParam'].validate((valid) => {
				if (valid) {
					this.$store.dispatch('leadAudit_refuse', this.refuseParam).then(() => {
						if (this.leadAuditRefuseData.success) {
							this.$message({
								message: '拒绝成功！',
								type: 'success'
							})
							this.dialogClosureVisible = false
							this.goback()
						} else {
							this.$message.error('操作失败')

						}
					})
				}
			})
		},
		cancel() {
			this.$refs['refuseParam'].resetFields()
			this.dialogClosureVisible = false
		}
	}
}
</script>



<style scoped>
.businessLicenseURL{
    margin-left:200px;
    text-align: center;
    width:200px;
}

.hangjiashenhe {
    box-sizing: border-box;
    width: 60%;
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
    list-style: none;
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