<style>
.elli-btn .el-table .cell {
    overflow: initial;
}
</style>
<template>
    <div id="main">
        <div class="my-col">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund3.png" />
                        <div class="num-box">
                            <span class="color-green">未认证</span>
                            <p>{{customerStatistics.UnCertifiCount}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund4.png" />
                        <div class="num-box">
                            <span class="color-blue">融资人</span>
                            <p>{{customerStatistics.projectPartyCount}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund3.png" />
                        <div class="num-box">
                            <span class="color-green">行家</span>
                            <p>{{customerStatistics.expertCount}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund2.png" />
                        <div class="num-box">
                            <span class="color-deepgreen">领投</span>
                            <p>{{customerStatistics.leadInvestorCount}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund1.png" />
                        <div class="num-box">
                            <span class="color-orange">合格投资人</span>
                            <p>{{customerStatistics.investorCount}}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div style=" padding-right: 30px;float: right;font-size: 16px;font-weight: 600;">
                <span>合计：{{customerStatistics.allCount}}</span>
            </div>
        </div>
    
        <!--搜索-->
        <div class="search-box">
            <div class="output">
                <el-input placeholder="姓名 | 手机号 | 身份证" icon="search" v-model.trim="keyword" @keyup.enter.native="keywordChange" :on-icon-click="keywordChange">
                </el-input>
            </div>
            <div class="date-box">
                <el-date-picker
                    v-model="beginTime"
                    type="datetime"
                    placeholder="注册开始时段">
                  </el-date-picker>
                  至
                  <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  placeholder="注册截止时段">
                </el-date-picker>
                <el-select v-model="status" @change="statusChange" clearable placeholder="状态">
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="certifi" @change="certifiChange" clearable placeholder="认证">
                    <el-option v-for="item in certifiOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!--表格-->
        <div class="my-table  elli-btn">
             <!-- v-loading="!customerListData.list" element-loading-text="拼命加载中" -->
            <el-table :data="customerListData.list" stripe border style="width: 100%">
                <el-table-column prop="kong" width="20">
                </el-table-column>
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="mobileNumber" label="手机号" >
                </el-table-column>
                <el-table-column prop="identNumber" label="身份证号">
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间" >
                </el-table-column>
                <el-table-column prop="status" label="状态" width="110px">
                    <template  slot-scope="scope">
                        <span v-if="scope.row.status==0">无效</span>
                        <span v-else-if="scope.row.status==1">正常</span>
                        <span v-else>已封禁</span>
                    </template>
                </el-table-column>
                <el-table-column prop="audit" label="认证" width="128px">
                    <template  slot-scope="scope">
                        <span class="btn-small" :class="scope.row.projectParty==1 ? active : ''">项</span>
                        <span class="btn-small" :class="scope.row.expert==2 ? active : ''">行</span>
                        <span class="btn-small" :class="scope.row.leadInvestor==2 ? active : ''">领</span>
                        <span class="btn-small" :class="scope.row.investor==1 ? active : ''">投</span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template  slot-scope="scope">
                        <router-link :to="{path: '/personMemberDetail/'+scope.row.customerId+'/'+scope.row.actorId}">
                            <el-button class="btn-style">详情</el-button>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="kong" width="20">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box clearfix">
            <div class="page-wrap">
                <pagination :total="customerListData.totalRecords" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
            <div class="btn-box">
                <el-button @click="dialogFormVisible = true" :plain="true" type="success">添加客户
                    <i class="el-icon-plus"></i>
                </el-button>
            </div>
        </div>
        <div class="p-form">
            <el-dialog title="创建客户" :visible.sync="dialogFormVisible" @close="cancel" :close-on-click-modal="false">
    
                <el-form :model="customer" :rules="customerRules" ref="customer">
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="customer.mobileNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="customer.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="identNumber">
                        <el-input v-model="customer.identNumber" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="addActor">确 认</el-button>
                </div>
    
            </el-dialog>
        </div>
        <div class="p-form">
            <el-dialog title="客户信息" :visible.sync="showCustomerInfo" @close="cancelShow" :close-on-click-modal="false">
                <el-form :model="customerInfo" ref="customer1">
                    <el-form-item label="手机号" :label-width="formLabelWidth" >
                        {{customerInfo.mobileNumber}}
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" >
                        {{customerInfo.name}}
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth">
                        {{customerInfo.identNumber}}
                    </el-form-item>
                    <el-form-item label="登录口令" :label-width="formLabelWidth">
                        <span style="color:red">{{customerInfo.password}}</span>    
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import pagination from '../../components/common/pagination'
export default {
	name: 'customerInforMaintain',
	components: {
		pagination
	},
	computed: {
		customerListData: function () {
			return this.$store.state.customer.customerListData
		},
		customerStatistics: function () {
			return this.$store.state.customer.customerStatistics
		},
		customerActorData: function () {
			return this.$store.state.customer.actorData
		},
		customerData: function () {
			return this.$store.state.customer.customerData
		}
	},
	data() {
		return {
			statusOptions: [ { value: 1, label: '正常' }, { value: 2, label: '已封禁' }],
			certifiOptions: [{ value: 'A', label: '实名' }, { value: 'B', label: '行家' },
				{ value: 'C', label: '融资人' },
				{ value: 'D', label: '投资人' },
				{ value: 'E', label: '领投人' }],
			active: 'border-orange',
			dialogFormVisible: false,
			showCustomerInfo:false,
			formLabelWidth: '120px',
			keyword: '',
			certifi: '',
            status: '',
            beginTime:'',
            endTime:'',
			param: {},
			customer: {
				identNumber: '',
				mobileNumber: '',
				name: '',
			},
			customerInfo:{},
			customerRules: {
				mobileNumber: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
					{ pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				identNumber: [
					{ required: true, message: '请输入身份证号', trigger: 'blur' },
					{ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确', trigger: 'blur' }
				],
			}
		}
	},
	beforeMount() {
		this.$store.dispatch('customer_statistics').then(()=>{
			if(this.customerStatistics){
				this.customerStatistics.allCount = this.customerStatistics.UnCertifiCount+this.customerStatistics.expertCount+this.customerStatistics.investorCount+this.customerStatistics.leadInvestorCount+this.customerStatistics.projectPartyCount
			}
		})
		this.param = {
			keyword: this.keyword,
			status: this.status,
            certifi: this.certifi,
            beginTime:this.beginTime,
            endTime:this.endTime,
			pageSize: 10,
			pageNum: 1
		}
		this.$store.dispatch('customer_getList', this.param)
	},
	methods: {
		handleSizeChange(val) {
			this.param.pageSize = val
			this.param.pageNum = 1
			this.$store.dispatch('customer_getList', this.param)
		},
		handleCurrentChange(val) {
			this.param.pageNum = val
			this.$store.dispatch('customer_getList', this.param)
		},
		certifiChange() {
			this.param.pageNum = 1
			this.param.certifi = this.certifi
			this.$store.dispatch('customer_getList', this.param)
		},
		statusChange() {
			this.param.pageNum = 1
			this.param.status = this.status
			this.$store.dispatch('customer_getList', this.param)
		},
		keywordChange() {

			this.param.keyword = this.keyword
			this.param.pageNum = 1
			this.$store.dispatch('customer_getList', this.param)
		},
		addActor() {
			this.$refs['customer'].validate((valid) => {
				if (valid) {
					this.$store.dispatch('add_actor',this.customer ).then(() => {
						if (this.customerActorData.head.success) {
							this.customerInfo=JSON.parse(JSON.stringify(this.customer))
							this.customerActorData.objectLiteral=JSON.parse(this.customerActorData.objectLiteral)
							this.customerInfo.password=this.customerActorData.objectLiteral.loginPassword
							this.addCustomer()
							this.dialogFormVisible = false
							this.showCustomerInfo = true
						} else {
							this.$message.error(this.customerActorData.head.information)
						}

					})
				}
			})
		},
		addCustomer() {
			let customerParam = {
				actorId: this.customerActorData.objectLiteral.id,
				mobileNumber: this.customer.mobileNumber,
				name: this.customer.name,
				identNumber: this.customer.identNumber
			}
			this.$store.dispatch('add_customer', customerParam).then(() => {
				if (this.customerData.success) {
					this.$message({
						message: '添加成功！',
						type: 'success'
					})
					this.param.pageNum = 1
					this.$store.dispatch('customer_getList', this.param)
				} else {
					this.$message.error(this.customerData.information)
				}

                
			})
		},
		cancel() {
			this.dialogFormVisible = false
			this.$refs['customer'].resetFields()
		},
		cancelShow(){
			this.showCustomerInfo = false
            
		}
	}
}

</script>
