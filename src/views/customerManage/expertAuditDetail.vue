<template>
    <div>
        <div class="back-button">
            <router-link :to="{path: '/expertAuditList'}">
                <el-button type="text" icon="arrow-left">返回上一级</el-button>
            </router-link>
        </div>
        <div class="hangjiashenhe">
            <ul>
                <li>
                    <label>手机号</label>
                    <span>{{expertData.mobileNumber}}</span>
                </li>
                <li>
                    <label>真实姓名</label>
                    <span>{{expertData.realName}}</span>
                </li>
                <li>
                    <label>身份证号</label>
                    <span>{{expertData.identNumber}}</span>
                </li>
                <li>
                    <label>专注行业</label>
                    <span class="zhuanzhuhangye">
                        <div style="float: left;padding-right: 20px;" v-for="(item,i) in industryList">
                            <el-checkbox :disabled="true" v-model="industryObj[i]" :label="item.value" :key="item.label">{{item.label}}
                            </el-checkbox>
                            <input type="number" v-model="workYearsObj[i]" :disabled="true" number="true" class="el-pagination__editor" style="width: 30px;line-height: 0px;">年
                        </div>
    
                    </span>
                </li>
                <li>
                    <label>所属单位</label>
                    <span>{{expertData.organization}}</span>
                </li>
                <li>
                    <label>职位</label>
                    <span>{{expertData.position}}</span>
                </li>
                    <li>
                        <label>常驻地区</label>
                        <span>{{expertData.permanent|address}}</span>
                    </li>
                    <li>
                        <label>名片</label>
                        <img v-imageBiger style="width:200px;" :src="expertData.businessCard">
                    </li>
                    <li>
                        <label>专业性凭证</label>
                        <img v-imageBiger style="width:200px;" :src="expertData.credentials">
                    </li>
                    <li>
                        <label>行家简介</label>
                        <span class="zhuanzhuhangye">
                            <span>{{expertData.profile}}</span>
                        </span>
                    </li>
            </ul>
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
                        <el-input class="inputing" :rows="5" v-model="refuseParam.rejection" type="textarea" placeholder="请输入拒绝理由..."></el-input>
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
import industryList from '../../constant/industry.js'

export default {
	computed: {
		expertAuditAdoptData: function () {
			return this.$store.state.customer.expertAuditAdoptData
		},
		expertAuditRefuseData: function () {
			return this.$store.state.customer.expertAuditRefuseData
		},
		expertData: function () {
			return this.$store.state.customer.expertData
		},
	},
	data() {
		return {
			industryObj: '',
			workYearsObj: '',
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
			industryList: industryList,
		}
	},
	beforeMount() {
		let expertParam = {
			id: this.$route.params.actorId
		}
		this.$store.dispatch('expertByActorId', expertParam).then(() => {
			if (this.expertData.industry) {
				var obj = JSON.parse(this.expertData.industry)
				this.industryObj = obj.industry
				this.workYearsObj = obj.workYears
			}

		})
	},
	methods: {
		adopt() {
			let adoptParam = {
				id: this.$route.params.customerId
			}
			this.$store.dispatch('expertAudit_adopt', adoptParam).then(() => {
				if (this.expertAuditAdoptData.success) {
					this.$router.push({ path: '/expertAuditList' })
					this.$message({
						message: '审核通过！',
						type: 'success'
					})
				} else {
					this.$message.error('操作失败')
				}

			})
		},
		refuse() {
			this.$refs['refuseParam'].validate((valid) => {
				if (valid) {
					this.$store.dispatch('expertAudit_refuse', this.refuseParam).then(() => {
						if (this.expertAuditRefuseData.success) {
							this.$router.push({ path: '/expertAuditList' })
							this.$message({
								message: '拒绝成功！',
								type: 'success'
							})
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
		},
	}
}
</script>



<style scoped>
body {
    background-color: #fcfcfc;
}

.content {
    background-color: #fcfcfc;
}

.hangjiashenhe {
    width: 60%;
    /*height: 100%;*/
    margin: 0 auto;
    background-color: #fff;
    font-size: 14px;
}

.hangjiashenhe ul {
    margin-left: 100px;
    padding-top: 16px;
    list-style: none;
}

.hangjiashenhe li {
    margin-top: 10px;
}

.hangjiashenhe label {
    display: inline-block;
    float: left;
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