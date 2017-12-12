<template>
	<div id="msg-detail">
		<div class="search-box">
			<div class="output">
				<el-input placeholder="手机号 | 内容" icon="search" v-model.trim="keyword" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
				</el-input>
			</div>
			<div class="date-box">
				<div class="my-calender">
					<el-date-picker v-model="range" type="datetimerange" clearable align="right" placeholder="选择日期范围" :picker-options="pickerOptions"
					 @change="rangechange">
					</el-date-picker>
				</div>
				<el-select v-model="statusCode" @change="statusChange" clearable placeholder="全部">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		<!--表格-->
		<div class="my-table">
			<el-table :data="msgListData.list" stripe border style="width: 100%">
				<el-table-column prop="kong" width="30">
				</el-table-column>
				<el-table-column type="index" width="60" label="序号">
				</el-table-column>
				<el-table-column prop="senderName" label="发送人" width="150">
				</el-table-column>
				<el-table-column prop="receiver" label="接收手机号" width="150">
				</el-table-column>
				<el-table-column prop="content" label="短信内容">
				</el-table-column>
				<el-table-column prop="sendStatus" label="状态" width="100">
				</el-table-column>
				<el-table-column prop="createTime" label="发送时间" width="150">
				</el-table-column>
				<el-table-column prop="kong" width="30">
				</el-table-column>
			</el-table>
		</div>
		<div class="page-box Clear">
			<div class="page-wrap">
				<div class="block">
					<pagination :total="msgListData.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
				</div>
			</div>
			<div class="btn-box">
				<el-button :plain="true" type="success" @click="dialogFormVisible = true">创建短信
					<i class="el-icon-plus"></i>
				</el-button>
			</div>
		</div>

		<!-- 模态框（Modal） -->
		<el-dialog class="p-form creatInfo" title="创建短信" :visible.sync="dialogFormVisible" @close="resetForm" :close-on-click-modal="false">
			<el-form :model="msgShortForm" ref="msgShortForm">
				<el-form-item label="接收手机号" :label-width="formLabelWidth" prop="receivers" :rules="[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^[0-9,]+$/, message: '请输入正确的手机号,且用英文逗号隔开', trigger: 'blur,change' }     
            ]">
					<el-input type="textarea" :rows="3" v-model="msgShortForm.receivers" placeholder="多个手机号用英文逗号隔开" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="短信息内容" :label-width="formLabelWidth" prop="content" :rules="[{ required: true, message: '请输入短信内容', trigger: 'blur' }]">
					<el-input type="textarea" :rows="5" v-model="msgShortForm.content" placeholder="内容" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm">取 消</el-button>
				<el-button type="primary" @click="addMsgShort">发 送</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style>
	.creatInfo .el-form-item__label {
		width: 95px!important;
	}

	.creatInfo .el-form-item__content {
		margin-left: 95px !important;
	}
</style>
<script>
import pagination from '../../components/common/pagination.vue'
import _ from 'lodash'
export default {
	name: 'msgModel',
	components: {
		'pagination': pagination
	},
	data() {
		return {
			// 搜索
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
						picker.$emit('pick', [start, end])
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
						picker.$emit('pick', [start, end])
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
						picker.$emit('pick', [start, end])
					}
				}],
			},
			options: [{
				value: '0',
				label: '待发'
			}, {
				value: '1',
				label: '发送中'
			}, {
				value: '2',
				label: '成功'
			}, {
				value: '3',
				label: '失败'
			}],
			dialogFormVisible: false,
			msgShortForm: {
				receiver: [],
				content: '',
				receivers: ''
			},
			msgShortParam: {},
			formLabelWidth: '120px',
			startDate: '',
			endDate: '',
			keyword: '',
			statusCode: '',
			// 日历
			range: [],
		}
	},
	beforeMount() {
		this.msgShortParam = {
			sendStatus: this.statusCode,
			content: this.keyword,
			beginDate: this.startDate,
			endDate: this.endDate,
			pageNo: 1,
			pageSize: 10,
		}
		//分页查询短消息,模糊查询
		this.$store.dispatch('find_ltMessageByCondition', this.msgShortParam)
	},
	computed: {
		msgListData: function () {
			if (this.$store.state.content.ltMessageList) {
				return this.$store.state.content.ltMessageList
			} else {
				return { count: 0, list: [] }
			}
		},
		postLtMessage: function () {
			return this.$store.state.content.postLtMessage
		},
		actor: function () {
			return this.$store.state.login.actor
		},
	},
	methods: {
		resetForm() {
			this.$refs['msgShortForm'].resetFields()
			this.msgShortForm.receivers = ''
			this.dialogFormVisible = false
		},
		handleIconClick() {
			this.msgShortParam.content = this.keyword
			this.msgShortParam.page = 1
			this.$store.dispatch('find_ltMessageByCondition', this.msgShortParam)
		},
		handleSizeChange(val) {
			this.msgShortParam.pageSize = val
			this.msgShortParam.pageNo = 1
			this.$store.dispatch('find_ltMessageByCondition', this.msgShortParam)
		},
		handleCurrentChange(val) {
			this.msgShortParam.pageNo = val
			this.$store.dispatch('find_ltMessageByCondition', this.msgShortParam)
		},
		rangechange(v) {
			this.range = v.split(' - ')
			this.msgShortParam.beginDate = this.range[0]
			this.msgShortParam.endDate = this.range[1]
			this.$store.dispatch('find_ltMessageByCondition', this.msgShortParam)
		},
		statusChange() {
			this.msgShortParam.pageNo = 1
			this.msgShortParam.sendStatus = this.statusCode
			this.$store.dispatch('find_ltMessageByCondition', this.msgShortParam)
		},
		addMsgShort() {
			this.msgShortForm.receiver = this.msgShortForm.receivers.split(',')
			this.msgShortForm.receiver = _.difference(this.msgShortForm.receiver, [''])
			for (let i = 0; i < this.msgShortForm.receiver.length; i++) {
				if (!(/^1[34578]\d{9}$/.test(this.msgShortForm.receiver[i]))) {
					this.$message({
						type: 'error',
						message: '第' + (i + 1) + '个手机号输入错误'
					})
					return
				}
			}
			//创建短信的状态  0 成功  1失败  2 部分成功
			this.$refs['msgShortForm'].validate((valid) => {
				if (valid) {
					this.msgShortForm.senderId = this.actor.id
					this.$store.dispatch('sendSms_byReceiver', this.msgShortForm).then(() => {
						if (this.postLtMessage && this.postLtMessage[0] == 0) {
							this.$store.dispatch('find_ltMessageByCondition', this.msgShortParam)
							this.$message({
								type: 'success',
								message: '创建短信成功!'
							})
							this.dialogFormVisible = false
						} else if (this.postLtMessage[0] == 1) {
							this.$store.dispatch('find_ltMessageByCondition', this.msgShortParam)
							this.$message({
								type: 'error',
								message: '发送过于频繁, 请等待一段时间再发送!'
							})
							this.dialogFormVisible = false
						} else if (this.postLtMessage[0] == 2) {
							this.$store.dispatch('find_ltMessageByCondition', this.msgShortParam)
							this.$message({
								type: 'error',
								message: '此号码' + this.postLtMessage[1] + '发送过于频繁'
							})
							this.dialogFormVisible = false
						} else {
							this.$message({
								type: 'error',
								message: '创建短信失败!'
							})
						}
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消!'
						})
					})
				} else {
					return false
				}
			})
		}
	}
}
</script>