<style scoped>
    #enterpriseTeam {
        width: 715px;
        min-height: 100px;
    }

    .enterprisePerson {
        margin: 30px auto 10px 0;
        padding-right: 10px;
        background-color: rgb(246, 246, 246);
        width: 710px;
        height: 180px;
    }

    .enterprisePerson img {
        float: left;
        margin: -10px 10px 10px -10px;
        width: 140px;
        height: 180px;
    }

    .personName {
        float: left;
        font-size: 18px;
        color: rgb(51, 51, 51);
        margin: 5px auto 0px 2px;
    }

    .personTitle {
        margin-top: 5px;
        float: left;
        color: #999999;
        font-size: 16px;
    }

    .personintro {
        margin-top: 50px;
        font-size: 14px;
        color: rgb(102, 102, 102);
    }

    .edit-button-block {
        height: 40px;
        margin: 10px 20px 5px auto;
    }

    .editEnterprisePerson {
        margin-bottom: 20px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        border: 1px solid #06ccb7;
    }

    .basic-info {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: stretch;
        height: 180px;
    }

    .basic-info img {
        width: 140px;
        margin-right: 15px;
        height: 180px;
    }

    .basic-info .item1 {
        width: 530px;
    }

    .basic-info .item2 {
        width: 530px;
    }

    .extra-info {
        margin-top: 5px;
        height: 70px;
    }

    .extra-info .show-item {
        width: 400px;
        float: left;
        margin: auto 30px auto 0;
        display: flex;
        flex-flow: row nowrap;
    }

    .extra-info .show-item span {
        display: inline-block;
    }

    .extra-info .show-item span:first-child {
        display: inline-block;
        width: 70px;
        color: #999;
        text-align: justify;
        text-justify: newspaper;
    }

    .show-item:nth-child(2n+1) {
        width: 200px
    }
</style>
<template>
    <div id='enterpriseTeam'>
        <el-row>
            <el-col>
                <div class="edit-button-block" v-if="!showDisplay">
                    <el-button style="float:left" v-show="!editFlag" @click="addEnterpriseMember" type="text">添加团队成员</el-button>
                    <el-button style="float:right" @click="editFlag=!editFlag" type="text">{{editFlag?'开始编辑':'退出编辑'}}</el-button>
                </div>
                <div v-for="item in datalist" class="enterprisePerson" :key="item.id" v-show="editFlag">
                    <img :src="item.imageURL" alt="">
                    <span class="personName">{{item.name}}</span>
                    <br>
                    <br>
                    <span class="personTitle">{{item.position}}</span>
                    <br>
                    <br>
                    <span class="personintro">{{item.profile}}</span>
                </div>
                <div class="edit-block" v-show="!editFlag">
                    <div v-for="item in datalist" :key="item.id" class="editEnterprisePerson">
                        <div class="basic-info">
                            <img :src="item.imageURL" alt="">
                            <div class="basic-item">
                                <div class="item1 personName">
                                    <span style="color: rgb(80, 79, 79);">{{item.position}}</span>
                                    {{item.name}}
                                    <el-button style="float:right" icon="delete" size="mini" @click="deleteEnterpriseMember(item)" type="primary">删除</el-button>
                                    <el-button style="float:right;margin-right:10px;" size="mini" icon="edit" @click="editEnterpriseMember(item)" type="primary">编辑</el-button>
                                </div>
                                <div class="item2 personintro"> {{item.profile}}</div>
                            </div>
                        </div>
                        <div class="extra-info">
                            <div class="show-item">
                                <span>手机号</span>
                                <span>{{item.mobileNumber}}</span>
                            </div>
                            <div class="show-item">
                                <span>学历</span>
                                <span>{{item.education|education}}</span>
                            </div>
                            <div class="show-item">
                                <span>婚姻情况</span>
                                <span>{{item.marriage|marriage}}</span>
                            </div>
                            <div class="show-item">
                                <span>身份证号</span>
                                <span>{{item.identNumber}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--添加团队成员弹窗-->
                <div class="p-form">
                    <dialogComponent :title="'核心团队成员信息'" :dialogFormVisible="dialogTeamVisible" @dialog-confirm-callback="team" @dialog-cancel-callback="cancel">
                        <el-form :model="teamform" :rules="teamrule" ref="teamform">
                            <el-form-item class="myhead" prop="imageURL" label="上传头像" label-width="140px">
                                <img class="enterpriseMember-head-image" :src="teamform.imageURL" v-if="!!teamform.imageURL" alt="">
                                <el-button size="small" @click="editHeadImgChange=true">上传头像</el-button>
                            </el-form-item>
                            <el-form-item label="法定代表人" prop="isRepresent" label-width="140px">
                                <el-checkbox v-model="isRepresent"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="姓名" prop="name" label-width="140px">
                                <el-input v-model="teamform.name" :maxlength="32"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" prop="mobileNumber" label-width="140px">
                                <el-input v-model="teamform.mobileNumber" :maxlength="11"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" prop="identNumber" label-width="140px">
                                <el-input v-model="teamform.identNumber" :maxlength="18"></el-input>
                            </el-form-item>
                            <el-form-item label="学历" prop="education" label-width="140px">
                                <el-select v-model="teamform.education" style="width:350px;" placeholder="请选择">
                                    <el-option v-for="(item,index) in educations" :key="index" :value="item.value" :label="item.lable">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="婚姻状况" prop="marriage" label-width="140px">
                                <el-radio-group v-model="teamform.marriage">
                                    <el-radio v-for="(item,index) in marriages" :key="index" :label="item.value">{{item.label}}</el-radio>
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
import imageCropper from '../../../components/common/cropper'
import dialogComponent from '../../../components/common/dialog.vue'
import educationsData from '../../../constant/education.js'
import marriageData from '../../../constant/marriage.js'
export default {
	name: 'enterpriseTeam',
	props: ['enterprise','showDisplay'],
	components: {
		dialogComponent,
		imageCropper
	},
	beforeMount() {
		this.$store.dispatch('enterprise_getInfo',{ id: this.enterpriseInfo.id || (this.enterprise && this.enterprise.id) })
		this.$store.dispatch('enterprise_getMemberInfo', { id: this.enterpriseInfo.id || (this.enterprise && this.enterprise.id) })
	},
	data() {
		return {
			editFlag: true,
			dialogTeamVisible: false,
			editHeadImgChange: false,
			editMember: '',//编辑团队成员专用
			educations: educationsData,
			marriages: marriageData,
			teamform: {
				id: '',
				imageURL: '',
				name: '',
				mobileNumber: '',
				identNumber: '',
				education: '',
				marriage: 4,
				position: '',
				profile: ''
			},
			teamrule: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				mobileNumber: [
					{
						required: true, trigger: 'blur', validator: (rule, value, callback) => {
							if (value == '') {
								callback(new Error('请输入手机号码'))
							} else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.teamform.mobileNumber)) {
								callback(new Error('手机号输入格式有误'))
							} else {
								callback()
							}
						}
					}
				],
				identNumber: [
					{
						required: true, trigger: 'blur', validator: (rule, value, callback) => {
							if (value == '') {
								callback(new Error('请输入身份证信息'))
							} else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.teamform.identNumber)) {
								callback(new Error('身份证输入格式有误'))
							} else {
								callback()
							}
						}
					}
				],
				education: [
					{ required: true, type: 'number', message: '请输入学历', trigger: 'blur' }
				],
				profile: [
					{ required: true, message: '请输入简介', trigger: 'blur' }
				]
			},
			isRepresent: false,
		}
	},
	methods: {
		successUpload_memberimageURL(data) {
			this.teamform.imageURL = data
			this.editHeadImgChange = false
		},
		addWarning(type, member) {
			// //type 添加ADD 删除DELETE 更新UPDATE
			this.$store.dispatch('addWarningForEnterpriseMemberChange', {
				type, member, enterpriseId: this.enterpriseInfo.id|| (this.enterprise && this.enterprise.id)
			})
		},
		addEnterpriseMember() {//点击添加团队成员 
			this.editMember = ''
			this.isRepresent = false
			this.teamform = {
				id: '',
				imageURL: '',
				name: '',
				mobileNumber: '',
				identNumber: '',
				education: '',
				marriage: 4,
				position: '',
				profile: ''
			}
			if (this.$refs['teamform']) {
				this.$refs['teamform'].resetFields()
			}
			this.dialogTeamVisible = true
		},
		team() {
			this.$refs['teamform'].validate((valid) => {
				if (valid) {
					let param = this.teamform
					let warningParam = JSON.parse(JSON.stringify(this.teamform))
					param.enterpriseId = this.enterpriseInfo.id || (this.enterprise && this.enterprise.id)
					if (this.editMember.length > 0) {
						param.id = this.editMember
						this.$store.dispatch('item_updateEnterpriseMember', { param, vue: this }).then(() => {
							if (this.isRepresent && this.enterpriseInfo.representativeId != this.editMember) {
								param.representativeId = this.editMember
								param.id = this.enterpriseInfo.id
								this.$store.dispatch('item_updateEnterpriseRepresentative', { param: param, vue: this })
								warningParam.representativeId = this.editMember
								this.addWarning('UPDATE', warningParam)
							} else {
								this.addWarning('UPDATE', this.teamform)
							}
							if (!this.isRepresent && this.enterpriseInfo.representativeId == this.editMember) {
								this.$message.warning('请勾选其他团队成员的法定代表人复选款来变更法定代表人，只能变更不能取消')
							}
							this.editMember = ''
						})
					} else {
						this.$store.dispatch('item_createEnterpriseMember', { param, vue: this }).then(() => {
							this.addWarning('ADD', null)
							if (this.isRepresent && this.$store.state.item.enterpriseMemberId.length > 0) {
								let param = {}
								param.id = this.enterpriseInfo.id
								param.representativeId = JSON.parse(this.$store.state.item.enterpriseMemberId)
								this.$store.dispatch('item_updateEnterpriseRepresentative', { param: param, vue: this })
							}
						})
					}
					this.teamform = {
						id: '',
						imageURL: '',
						name: '',
						mobileNumber: '',
						identNumber: '',
						education: '',
						marriage: 4,
						position: '',
						profile: ''
					}
					this.dialogTeamVisible = false
				} else {
					return false
				}
			})
		},
		cancel() {
			this.teamform = {
				id: '',
				imageURL: '',
				name: '',
				mobileNumber: '',
				identNumber: '',
				education: '',
				marriage: 4,
				position: '',
				profile: ''
			}
			this.dialogTeamVisible = false
		},
		editEnterpriseMember(item) {
			this.teamform = {
				id: '',
				imageURL: '',
				name: '',
				mobileNumber: '',
				identNumber: '',
				education: '',
				marriage: 4,
				position: '',
				profile: ''
			}
			this.teamform = item
			if (this.enterpriseInfo.representativeId === item.id) {
				this.isRepresent = true
			} else {
				this.isRepresent = false
			}
			this.editMember = item.id
			this.dialogTeamVisible = true
		},
		deleteEnterpriseMember(item) {
			this.$confirm(`确认删除这个团队成员${item.name}？`, '确认操作', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch('item_updateEnterpriseMemberStatusById', {
					param: {
						id: item.id,
						enterpriseId: this.enterpriseInfo.id,
						status: 0
					}, vue: this
				}).then(() => {
					this.addWarning('DELETE', null)
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消'
				})
			})
		},
	},
	computed: {
		datalist: function () {
			return this.$store.state.enterprise.enterpriseMember || {}
		},
		enterpriseInfo: function () {
			return this.$store.state.enterprise.enterpriseInfo || {}
		}
	}
}
</script>