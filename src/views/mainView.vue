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
							<p><span style="font-size:0.7em;vertical-align: top">¥</span>
								{{itemManageHeadData.raisedAmountTatol||0}}
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
		<div class="search-box">
			<div class="output">
				<el-input placeholder="项目编号 | 项目名称 | 发起人" icon="search" v-model="keyword" :on-icon-click="search" @keyup.enter.native="search">
				</el-input>
			</div>
			<div class="date-box">
				<el-select v-model="industry" clearable placeholder="所属行业" @change="industryChange">
					<el-option v-for="item in industryOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="phase" clearable placeholder="项目阶段" @change="phaseChange">
					<el-option v-for="item in projectPhaseOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-cascader style="margin-left:10px;" placeholder="所属区域" expand-trigger="hover" clearable :options="options3" v-model="where" @change="handleChange">
				</el-cascader>
			</div>
		</div>
		<!--表格-->
		<div class="my-table">
			<el-table :data="itemManageList.list" stripe border style="width: 100%">
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
				<el-table-column width="180">
					<template scope="scope">
						<router-link :to="{path: '/itemDetail/'+scope.row.id}">
							<el-button class="btn-style">详情</el-button>
						</router-link>
						<router-link :to="{path: '/itemStep1/'+scope.row.id}">
							<el-button class="btn-style">修改</el-button>
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
		<el-dialog title="选择创建项目的发起人" :visible.sync="chooseItemCustomer">
			<div class="search-box" style="margin:10px 10px 30px 10px;float:right">
				<div class="output">
					<el-input placeholder="姓名 | 手机号 | 身份证" icon="search" v-model="customerKeyword" @keyup.enter.native="customerKeywordChange" :on-icon-click="customerKeywordChange">
					</el-input>
				</div>
       		</div>	
			<div class="my-table">
				<el-table :data="customerList.list" stripe border style="width: 100%">
					<el-table-column prop="" width="10">
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
							<span class="btn-small" :class="scope.row.projectParty==2 ? active : ''">项</span>
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
					<el-table-column prop="" width="10">
					</el-table-column>
				</el-table>
			</div>
			<div  style="margin:10px 10px 30px 10px;">
				<pagination :total="customerList.totalRecords" @size-change="handleCustomerSizeChange" @current-change="handleCustomerCurrentChange"></pagination>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import pagination from '../components/common/pagination'
import { regionData } from 'element-china-area-data'
import projectPhaseList from '../constant/projectPhase'
import industryList from '../constant/industry'


export default {
	components: {
		pagination
	},
	data() {
		return {
			param:{},
			options3: regionData,
			projectPhaseOption : projectPhaseList,
			industryOption : industryList,
			where: [],
			industry: '',
			phase: '',
			// 搜索
			keyword: '',
			
			active: 'border-orange',
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
		 }
    },
	beforeMount () {
        this.$store.dispatch('item_getHeadData');
        this.param={
                industry:this.industry,
                phase:this.phase,
                regionCode:this.where[2],
                keyword:this.keyword,
                pageSize:10,
                pageNo:1
            }
        this.$store.dispatch('item_getManageList',this.param);
		this.$store.commit('enterprise_setMemberInfo',{});
		this.$store.commit('enterprise_setInfo',{});
    },
	
	methods: {
		handleCustomerCurrentChange(val){
			this.customerParam.pageNo=val;
			this.$store.dispatch('item_getCustomerList',this.customerParam);
		},
		handleCustomerSizeChange(val){
			this.customerParam.pageNo=1;
			this.customerParam.pageSize=val;
			this.$store.dispatch('item_getCustomerList',this.customerParam);
		},
		createItemByCustomer(item){
			this.$store.dispatch('item_createProject1').then(()=>{
				if(!this.$store.state.item.createProjectId.length){
					this.$message.warning('创建项目失败，请联系服务器开发人员')
					return false;
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
			this.chooseItemCustomer=true;
			this.customerParam={
               	keyword: this.customerKeyword,
                pageNo:1,
                pageSize:10
			}
			this.$store.dispatch('item_getCustomerList',this.customerParam);
			
		},
		customerKeywordChange(){
			this.customerParam.keyword=this.customerKeyword;
			this.customerParam.pageNo=1;
			this.$store.dispatch('item_getCustomerList',this.customerParam);
		},
		search(){
            this.param.keyword=this.keyword;
            this.param.pageNo=1;
            this.$store.dispatch('item_getManageList',this.param);
        },
		industryChange(){
			this.param.industry = this.industry;
            this.param.pageNo=1;			
			this.$store.dispatch('item_getManageList',this.param);
		},
		phaseChange(){
			this.param.phase = this.phase;
            this.param.pageNo=1;			
			this.$store.dispatch('item_getManageList',this.param);
		},
		handleChange(value) {
			this.param.regionCode=this.where[2];
			this.param.pageNo=1;
			this.$store.dispatch('item_getManageList',this.param);
		},
		handleSizeChange(size){
            this.param.pageSize=size;
            this.param.pageNo=1;
            this.$store.dispatch('item_getManageList',this.param);
        },
        handleCurrentChange(page){
            this.param.pageNo=page;
            this.$store.dispatch('item_getManageList',this.param);
        }
	}
}
</script>

<style>

</style>