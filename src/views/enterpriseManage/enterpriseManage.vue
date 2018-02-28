<template>
	<div id='enterpriseManage'>
		<el-row class="search-box">
			<el-input class="input1" style="width:300px" placeholder="企业名称|统一社会信用代码|法定代表人" clearable icon="search" v-model.trim="keyword"
			 @keyup.enter.native="search" :on-icon-click="search"></el-input>
			<span style="float:right">
				<el-date-picker v-model="startTime" align="right" :editable="false" type="date" clearable @change="startChange" placeholder="选择开始日期"></el-date-picker>
				至
				<el-date-picker v-model="endTime" align="right" :editable="false" type="date" clearable @change="endChange" placeholder="选择结束日期"></el-date-picker>
			</span>
			<el-cascader style="float:right;margin-right:30px;" :options="options" v-model="where" @change="changeWhere" :editable="false"
			 change-on-select clearable placeholder="所在地"></el-cascader>
		</el-row>
		<el-row class="enp-search">
			<el-col :span="24" class="enterprise-table">
				<el-table border :data="enterpriseListData.list" stripe style="width: 100%">
					<el-table-column width="30" prop="" label="" align="center"> </el-table-column>
					<el-table-column type="index" label="序号" width="70"></el-table-column>
					<el-table-column prop="creditCode" label="统一社会信用代码" width="250" align="center"> </el-table-column>
					<el-table-column prop="name" label="企业名称" width="260" align="center"> </el-table-column>
					<el-table-column label="所在地" width="220" align="center">
						<template slot-scope="scope">
							{{scope.row.addressCode|address}}
						</template>
					</el-table-column>
					<el-table-column width="150" prop="representativeName" label="法定代表人" align="center"> </el-table-column>
					<el-table-column width="150" prop="createTime" label="入库时间" align="center"> </el-table-column>
					<el-table-column label=""  align="center">
						<template slot-scope="scope">
							<el-button class="btn-style" size="small" @click="detail(scope.row)">详情</el-button>
							<el-button class="btn-style" size="small" @click="findItems(scope.row)">查看融资项目</el-button>
						</template>
					</el-table-column>
					<el-table-column width="30" prop="" label="" align="center"> </el-table-column>
				</el-table>
				<pagination style="float:right;margin:10px 50px" :total="enterpriseListData.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
			</el-col>
		</el-row>
		<el-dialog :title="'融资企业名称：'+titleName" size="large" :visible.sync="dialogTableVisible">
			<el-table :data="items" stripe border style="width: 100%">
				<el-table-column prop="code" width="120" label="项目编号"> </el-table-column>
				<el-table-column prop="name" label="项目名称" > </el-table-column>
				<el-table-column prop="initiatorName" width="120" label="发起人"> </el-table-column>
				<el-table-column prop="industry" width="120" label="所属行业">
					<template slot-scope="scope">
						{{scope.row.industry|industry}}
					</template>
				</el-table-column>
				<el-table-column prop="regionCode" label="所属区域">
					<template slot-scope="scope">
						{{scope.row.regionCode|address}}
					</template>
				</el-table-column>
				<el-table-column prop="lastUpdate" label="更新时间">
				</el-table-column>
				<el-table-column prop="phase" label="阶段">
					<template slot-scope="scope">
						{{scope.row.phase|projectPhase}}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						{{scope.row.status|projectStatus}}
					</template>
				</el-table-column>
				<el-table-column width="180">
					<template slot-scope="scope">
						<el-button @click="itemDetail(scope.row)" class="btn-style">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
		
	</div>
</template>

<script>
	import pagination from '../../components/common/pagination.vue'
	import { regionData } from 'element-china-area-data'

	export default {
		name: 'enterpriseManage',
		components: {
			'pagination': pagination
		},
		computed: {
			enterpriseListData: function () {
				return this.$store.state.enterprise.enterpriseManageList
			},
			items: function () {
				return this.$store.state.enterprise.items
			}
		},
		beforeMount() {
			this.param = {
				beginTime: '',
				endTime: '',
				addressCode: '',
				keyword: this.keyword,
				pageSize: 10,
				pageNo: 1
			}
			this.$store.dispatch('enterprise_getManageList', this.param)
		},
		data() {
			return {
				
				where: [],
				startTime: '',
				endTime: '',
				options: regionData,
				keyword: '',
				range: [],
				param: {},
				dialogTableVisible: false,
				titleName: ''
			}
		},
		methods: {
			
			findItems(item) {
				this.$store.dispatch('enterprise_getItems', { enterpriseId: item.id })
				this.titleName = item.name
				this.dialogTableVisible = true
			},
			itemDetail(item) {
				this.dialogTableVisible = false
				this.$router.push('/itemDetail/' + item.id)
			},
			handleSizeChange(size) {
				this.param.pageSize = size
				this.param.pageNo = 1
				this.$store.dispatch('enterprise_getManageList', this.param)
			},
			handleCurrentChange(page) {
				this.param.pageNo = page
				this.$store.dispatch('enterprise_getManageList', this.param)
			},
			changeWhere(where) {
				if (where.length == 1) {
					this.param.addressCode = where[0].slice(0, 2)
				} else if (where.length == 2) {
					this.param.addressCode = where[1].slice(0, 4)
				} else if (where.length == 3) {
					this.param.addressCode = where[2].slice(0, 6)
				} else {
					this.param.addressCode = ''
				}
				this.$store.dispatch('enterprise_getManageList', this.param)
			},
			startChange(v) {
				this.param.beginTime = v || ''
				this.$store.dispatch('enterprise_getManageList', this.param)
			},
			endChange(v) {
				this.param.endTime = v || ''
				this.$store.dispatch('enterprise_getManageList', this.param)
			},
			search() {
				this.param.keyword = this.keyword
				this.param.pageNo = 1
				this.$store.dispatch('enterprise_getManageList', this.param)
			},
			detail(item) {
				this.$store.commit('enterprise_setInfo', item)
				this.$router.push('/enterpriseDetail/' + item.id)
			}
		}
	}
</script>

<style>
	.enp-search {
		margin-top: 40px;
	}

	#enterpriseManage {
		right: 0;
	}

	.enterprise-table .el-table .cell {
		text-align: center;
	}

	.enterprise-table .el-table__body .cell {
		color: #535455;
		font-size: 12px;
	}

	#enterpriseManage .btn-style {
		font-size: 12px;
		padding: 6px 15px;
		border-color: #06ccb6;
		color: #06ccb6;
		margin: 5px 5px;
	}

	#enterpriseManage .btn-style:hover {
		background: #06ccb6;
		color: white;
	}
</style>