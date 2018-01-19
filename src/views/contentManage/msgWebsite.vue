<template>
  <div id="msg-detail">
    <div class="search-box">
      <div class="output">
        <el-input placeholder="手机号 | 姓名" icon="search" v-model.trim="keyword" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <div class="date-box">
        <el-select v-model="indentType" @change="typeChange" clearable placeholder="身份类型">
          <el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="statusCode" @change="statusChange" clearable placeholder="状态">
          <el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--表格-->
    <div class="my-table">
      <el-table :data="webMessage.list" stripe border style="width: 100%">
        <el-table-column prop="kong" width="30">
        </el-table-column>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="mobileNumber" label="手机号">
        </el-table-column>
        <el-table-column prop="identNumber" label="身份证号">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间">
        </el-table-column>
        <el-table-column prop="statusName" label="状态">
        </el-table-column>
        <el-table-column width="140" label="认证">
          <template  slot-scope="scope">
            <span class="btn-small" :class="scope.row.projectParty==1 ? active : ''">项</span>
            <span class="btn-small" :class="scope.row.expert==2 ? active : ''">行</span>
            <span class="btn-small" :class="scope.row.leadInvestor==2 ? active : ''">领</span>
            <span class="btn-small" :class="scope.row.investor==1 ? active : ''">投</span>
          </template>
        </el-table-column>
        <el-table-column width="90">
          <template  slot-scope="scope">
            <router-link :to="{path: '/msgWebDetail/'+scope.row.id}">
              <el-button class="btn-style btn-margin">消息</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="kong" width="30">
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box clearfix">
      <div class="page-wrap">
        <div class="block">
          <pagination :total="webMessage.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
        </div>
      </div>
      <div class="btn-box">
        <el-button :plain="true" type="success" @click="dialogFormVisible = true">创建消息
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <!-- 模态框（Modal） allActorList-->
    <el-dialog class="p-form" title="创建站内消息" :visible.sync="dialogFormVisible" @close="resetForm" :close-on-click-modal="false">
      <el-form :model="msgWebForm" ref="msgWebForm">
        <el-form-item label="接收人" :label-width="formLabelWidth" prop="receiver" :rules="[{ required: true, message: '请选择接收人', trigger: 'blur,change' }]">
          <el-select v-model="msgWebForm.receiver" clearable placeholder="接收人">
            <el-option v-for="item in allActorList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content" :rules="[{ required: true, message: '请输入消息内容', trigger: 'blur' }]">
          <el-input type="textarea" :rows="4" v-model="msgWebForm.content" placeholder="内容" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="addMsgWeb">发 送</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagination from '../../components/common/pagination.vue'
export default {
	components: {
		'pagination': pagination
	},
	computed: {
		webMessage: function () {
			return this.$store.state.content.selectWebMessage
		},
		postWebMessage: function () {
			return this.$store.state.content.postWebMessage
		},
		allActorList: function () {
			return this.$store.state.content.allActorList
		},
	},
	data() {
		return {
			statusCode: '',
			keyword: '',
			indentType: '',
			active: 'border-orange',
			msgWebForm: {
				receiver: '',
				content: '',
				senderId: '',
			},
			optionsType: [{
				value: 'A',
				label: '实名'
			}, {
				value: 'B',
				label: '行家'
			}, {
				value: 'C',
				label: '融资人'
			}, {
				value: 'D',
				label: '投资人'
			}, {
				value: 'E',
				label: '领投'
			}],
			optionsStatus: [{
				value: '1',
				label: '正常'
			}, {
				value: '2',
				label: '已封禁'
			}],
			dialogTableVisible: false,
			dialogFormVisible: false,
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: '',
			},
			msgWebParam: {},
			formLabelWidth: '120px'
		}
	},
	beforeMount() {
		this.msgWebParam = {
			status: this.statusCode,
			keyword: this.keyword,
			indentType: this.indentType,
			pageNo: 1,
			pageSize: 10,
		}
		//分页查询站内消息,模糊查询
		this.$store.dispatch('selectPage_byCondition', this.msgWebParam)
		//查询站内所有用户信息
		this.$store.dispatch('select_allActor', '').then(()=>{
			for(let i=0;i<this.allActorList.length;i++){
				if(this.allActorList[i].name==''){
					this.allActorList[i].name='未知'
				}
			}
		})
	},
	methods: {
		resetForm() {
			this.$refs['msgWebForm'].resetFields()
			this.dialogFormVisible = false
		},
		handleIconClick() {
			this.msgWebParam.keyword = this.keyword
			this.msgWebParam.pageNo = 1
			this.$store.dispatch('selectPage_byCondition', this.msgWebParam)
		},
		handleSizeChange(val) {
			this.msgWebParam.pageSize = val
			this.msgWebParam.pageNo = 1
			this.$store.dispatch('selectPage_byCondition', this.msgWebParam)
		},
		handleCurrentChange(val) {
			this.msgWebParam.pageNo = val
			this.$store.dispatch('selectPage_byCondition', this.msgWebParam)
		},
		typeChange() {
			this.msgWebParam.pageNo = 1
			this.msgWebParam.indentType = this.indentType
			this.$store.dispatch('selectPage_byCondition', this.msgWebParam)
		},
		statusChange() {
			this.msgWebParam.pageNo = 1
			this.msgWebParam.status = this.statusCode
			this.$store.dispatch('selectPage_byCondition', this.msgWebParam)
		},
		addMsgWeb() {
			this.msgWebForm.senderId = this.$store.state.login.actor.id
			this.$refs['msgWebForm'].validate((valid) => {
				if (valid) {
					this.$store.dispatch('send_webMessage', this.msgWebForm).then(() => {
						if (this.postWebMessage.success) {
							this.$store.dispatch('selectPage_byCondition', this.msgWebParam)
							this.$message({
								type: 'success',
								message: '创建消息成功!'
							})
							this.dialogFormVisible = false
						} else {
							this.$message({
								type: 'error',
								message: '创建消息失败!'
							})
						}
					}).catch(() => {

					})
				} else {
					return false
				}
			})
		},
	}
}
</script>
