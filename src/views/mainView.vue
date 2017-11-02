<template>
	<div id='main'>
		<!--栅格-->
		<div class="my-col">
			<el-row>
				<el-col :span="4">
					<div class="grid-content">
						<img class="pic" src="../assets/images/fund5.png" />
						<div class="num-box">
							<span class="color-yellow">成功融资</span>
							<p>
								<span style="font-size:0.7em;vertical-align: top">¥</span>
								{{itemManageHeadData.raisedAmountTatol&&itemManageHeadData.raisedAmountTatol.toFixed(0)||0}}
							</p>
						</div>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content">
						<img class="pic" src="../assets/images/fund4.png" />
						<div class="num-box">
							<span class="color-blue">融资企业</span>
							<p>{{itemManageHeadData.enterpriseTatol||0}}</p>
						</div>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content">
						<img class="pic" src="../assets/images/fund3.png" />
						<div class="num-box">
							<span class="color-green">入驻行家</span>
							<p>{{itemManageHeadData.expertTatol||0}}</p>
						</div>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content">
						<img class="pic" src="../assets/images/fund2.png" />
						<div class="num-box">
							<span class="color-deepgreen">入驻领投</span>
							<p>{{itemManageHeadData.leadInvestor||0}}</p>
						</div>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content">
						<img class="pic" src="../assets/images/fund1.png" />
						<div class="num-box">
							<span class="color-orange">合格投资人</span>
							<p>{{itemManageHeadData.investorTatol||0}}</p>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	
		<!--搜索-->
		<div class="search-box" style="margin:30px 0 10px 30px;">
			<div class="output">
				<el-input style="width:260px;" placeholder="项目编号 | 项目名称 | 发起人" icon="search" v-model.trim="keyword" :on-icon-click="search" @keyup.enter.native="search"></el-input>
				<el-checkbox style="float:left;margin-top:5px" v-model="isRestart" @change="restartChange"><span style="color:#97bcbe;font-weight:normal">显示历史记录</span></el-checkbox>
			</div>
			<div class="date-box">
				<el-cascader style="margin-left:10px;" placeholder="所属区域" expand-trigger="click" change-on-select clearable :options="options3" v-model="where" @change="handleChange">
				</el-cascader>
				<el-select v-model="industry" clearable placeholder="所属行业" @change="industryChange">
					<el-option v-for="item in industryOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="phase" style="margin-right:20px" clearable placeholder="项目阶段" @change="phaseChange">
					<el-option v-for="item in projectPhaseOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		<!--表格-->
		<div class="my-table">
			<el-table v-loading="tableloading" :data="itemManageList.list" stripe border style="width: 100%">
				<el-table-column prop="" width="40"></el-table-column>
				<el-table-column type="index" width="60" label="序号"> </el-table-column>
				<el-table-column prop="code" width="120" label="项目编号"> </el-table-column>
				<el-table-column prop="name"  label="项目名称"> </el-table-column>
				<el-table-column prop="initiatorName" width="120" label="发起人"> </el-table-column>
				<el-table-column prop="industry" width="120" label="所属行业"> 
					<template scope="scope">
						{{scope.row.industry|industry}}
					</template>
				</el-table-column>
				<el-table-column prop="regionCode"  label="所属区域" >
					<template scope="scope">
						{{scope.row.regionCode|address}}
					</template>
				</el-table-column>
				<el-table-column prop="lastUpdate" label="更新时间" >
				</el-table-column>
				<el-table-column prop="phase"  label="阶段">
					<template scope="scope">
						{{scope.row.phase|projectPhase}}
					</template>
				</el-table-column>
				<el-table-column prop="status"  label="状态">
					<template scope="scope">
						{{scope.row.status|projectStatus}}
					</template>
				</el-table-column>
				<el-table-column width="180">
					<template scope="scope">
						<router-link :to="{path: '/itemDetail/'+scope.row.id}">
							<el-button class="btn-style">详情</el-button>
						</router-link>
						<router-link v-if="operator.category==2" :to="{path: '/itemStep1/'+scope.row.id}">
							<el-button  class="btn-style">修改</el-button>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="" width="40" ></el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<div class="page-box clearfix">
			<div class="page-wrap">
				<pagination :total="itemManageList.totalRecords" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
			</div>
			<div class="btn-box">
					<el-button  type="primary" @click="createProject">创建项目
						<i class="el-icon-plus"></i>
					</el-button>
			</div>
		</div>
		<el-dialog title="选择创建项目的发起人" size="large" :visible.sync="chooseItemCustomer" :close-on-click-modal="false">
			<div v-if="itemType=='A'" class="search-box" style="margin:10px 10px 30px 10px;float:right">
				<div class="output">
					<el-input placeholder="姓名 | 手机号 | 身份证" icon="search" v-model="customerKeyword" @keyup.enter.native="customerKeywordChange" :on-icon-click="customerKeywordChange">
					</el-input>
				</div>
			   </div>	
			   <el-form>
				<el-form-item label="模拟投资最大购买份数" required v-if="itemType=='B'">
					<el-input-number v-model.number="copies"  :min="1"></el-input-number>
				</el-form-item>
			</el-form>
			<div class="my-table">
				<el-table    :data="customerList.list||customerInfoForSimulationList.list" stripe border style="width: 100%">
					<el-table-column prop="" width="5">
					</el-table-column>
					<el-table-column type="index" label="序号" width="60px">
					</el-table-column>
					<el-table-column prop="name" label="姓名">
					</el-table-column>
					<el-table-column prop="mobileNumber" label="手机号" width="115px">
					</el-table-column>
					<el-table-column prop="identNumber" label="身份证号" width="165px">
					</el-table-column>
					<el-table-column prop="createTime" label="注册时间" width="160px">
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template scope="scope">
							<span>{{scope.row.status ? "正常" : "无效"}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="audit" label="认证" width="140px">
						<template scope="scope">
							<span class="btn-small" :class="scope.row.projectParty==1 ? active : ''">项</span>
							<span class="btn-small" :class="scope.row.expert==2 ? active : ''">行</span>
							<span class="btn-small" :class="scope.row.leadInvestor==2 ? active : ''">领</span>
							<span class="btn-small" :class="scope.row.investor==1 ? active : ''">投</span>
						</template>
					</el-table-column>
					<el-table-column>
						<template scope="scope">
							<el-button class="btn-style" @click="createItemByCustomer(scope.row)">选择</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="" width="5">
					</el-table-column>
				</el-table>
			</div>
			<div  style="margin:10px 10px 30px 10px;" >
				<pagination :total="customerList.totalRecords||customerInfoForSimulationList.totalRecords" @size-change="handleCustomerSizeChange" @current-change="handleCustomerCurrentChange"></pagination>
			</div>
				
		</el-dialog>
		<el-dialog size="tiny" title="选择创建项目的类型" :visible.sync="chooseItemType" :close-on-click-modal="false">
				<div class="itemType" @click="chooseType('A')">
					普通项目
				</div>
				<div class="itemType"  @click="chooseType('B')">
					模拟投资项目
				</div>
		</el-dialog>
	</div>
</template>
<script>
import pagination from '../components/common/pagination'
import { regionData } from 'element-china-area-data'
import projectPhaseList from '../constant/projectPhase'
import industryList from '../constant/industry'
import statusList from '../constant/projectStatus'

export default {
	components: {
		pagination
	},
	// asyncData ({ store,session,router }) {
	// 	return Promise.all([store.dispatch('item_getManageList', session),store.dispatch('item_getHeadData',session)]);
    // },
	data() {
		return {
			tableloading:false,
			param:{},
			chooseItemType:false,
			options3: regionData,
			projectPhaseOption : projectPhaseList,
			industryOption : industryList,
			projectStatusList : statusList,
			where: [],
			industry: '',
			phase: '',
			isRestart:false,
			status:'',
			// 搜索
			keyword: '',
			copies:1,
			active: 'border-orange',
			itemType:'A',
			customerKeyword:'',
			chooseItemCustomer:false,
			customerParam:{}
		}
	},
	computed: {
         itemManageList:function(){
             return this.$store.state.item.itemManageList||{};
         },
         itemManageHeadData:function(){
             return this.$store.state.item.itemManageHeadData||{};
         },
		 customerList:function(){
			 return this.$store.state.item.customerList||{};
		 },
         customerInfoForSimulationList:function(){
             return this.$store.state.item.customerInfoForSimulationList||{};
         },
	     operator:function(){
			 return this.$store.state.login.actor
		 }
    },
	beforeMount () {
        this.param={
                industry:this.industry,
				phase:this.phase,
				status:'',
				isRestart:0,
                regionCode:this.where.length>0?this.where[this.where.length-1]:'',
                keyword:this.keyword,
                pageSize:10,
                pageNo:1
			}
		this.getListData();
		this.$store.dispatch('item_getHeadData');
		this.$store.commit('enterprise_setMemberInfo',{});
		this.$store.commit('enterprise_setInfo',{});
    },
	methods: {
		chooseType(type){
			this.itemType=type;
			if(type=='A'){
				this.customerParam={
					keyword: this.customerKeyword,
					pageNo:1,
					pageSize:10
				}
				this.$store.dispatch('item_getCustomerList',this.customerParam);
			}else{
				this.customerParamForSimulation={
					pageNo:1,
					pageSize:10
				}
				this.$store.dispatch('item_getCustomerInfoForSimulation',this.customerParamForSimulation);
			}
			this.chooseItemType=false;
			this.chooseItemCustomer=true;
		},
		handleCustomerCurrentChange(val){
			if(this.itemType='A'){
				this.customerParam.pageNo=val;
				this.$store.dispatch('item_getCustomerList',this.customerParam);
			}else{
				this.customerParamForSimulation.pageNo=val;
				this.$store.dispatch('item_getCustomerInfoForSimulation',this.customerParamForSimulation)
			}
			
		},
		handleCustomerSizeChange(val){
			if(this.itemType='A'){
				this.customerParam.pageNo=1;
				this.customerParam.pageSize=val;
				this.$store.dispatch('item_getCustomerList',this.customerParam);
			}else{
				this.customerParamForSimulation.pageNo=1;
				this.customerParamForSimulation.pageSize=val;
				this.$store.dispatch('item_getCustomerInfoForSimulation',this.customerParamForSimulation)
			}
		},
		createItemByCustomer(item){
			this.$store.dispatch('item_createProject1',{type:this.itemType,copies:this.copies}).then(()=>{
				if(!this.$store.state.item.createProjectId.length){
					this.$message.warning('创建项目失败，请联系服务器开发人员')
					return false;
				}else{
					this.chooseItemCustomer=true;
				}
				let projectParam={
					id:this.$store.state.item.createProjectId,
                    initiatorId: item.actorId
                }
               	this.$store.dispatch('item_updateProject', { param: projectParam, vue: this });
				this.$router.push('/itemStep1/'+this.$store.state.item.createProjectId);
			});
		},
		createProject(){
			this.chooseItemType=true;
		},
		getListData(){
			this.tableloading=true;
			this.$store.dispatch('item_getManageList',this.param).then(()=>{
				this.tableloading=false;
			})
		},
		restartChange(){
			this.param.isRestart = this.isRestart?1:0;
            this.param.pageNo=1;			
			this.getListData();
		},
		customerKeywordChange(){
			this.customerParam.keyword=this.customerKeyword;
			this.customerParam.pageNo=1;
			this.$store.dispatch('item_getCustomerList',this.customerParam);
		},
		search(){
            this.param.keyword=this.keyword;
            this.param.pageNo=1;
            this.getListData();
        },
		industryChange(){
			this.param.industry = this.industry;
            this.param.pageNo=1;			
			this.getListData();
		},
		phaseChange(){
			this.param.phase = this.phase;
            this.param.pageNo=1;
			this.getListData();
		},
		handleChange(value) {
			this.param.regionCode=this.where.length>0?this.where[this.where.length-1]:''
			this.param.pageNo=1;
			this.getListData();
		},
		handleSizeChange(size){
            this.param.pageSize=size;
            this.param.pageNo=1;
            this.getListData();
        },
        handleCurrentChange(page){
            this.param.pageNo=page;
            this.getListData();
        }
	}
}
</script>

<style>
#main .itemType{
	display: inline-block;
	width:250px;
	text-align: center;
	height:100px;
	line-height: 100px;
	vertical-align: middle;
	margin:0 9px;
	font-size: 18px;
	border: 1px solid #06ccb7;
	color: #06ccb7;
	font-weight: bold;
	cursor: pointer;
}
#main .itemType:hover{
	border: 1px solid #fff;
	color: #fff;
	background: #06ccb7;
}
.output1{
	width:450px;
	float: left;
}
</style>