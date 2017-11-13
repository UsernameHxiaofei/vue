<template>
    <div id='riskIndex'>
        <div class="back-button"><el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button></div>
        <el-row style="margin-top:20px">
                     <risk-info ></risk-info>
        </el-row>
        <el-row >
                    <div style="margin:20px auto;width:885px;background:#ffffff">
                        <el-table  border :data="listData.list" stripe >
                            <el-table-column type="index"></el-table-column>
                            <el-table-column prop="riskName" label="指标名" align="center"> </el-table-column> 
                            <el-table-column prop="riskCategory" label="风险域" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.riskCategory|riskRegion}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="riskLevel" label="等级" align="center" :formatter="levelDes"> </el-table-column>
                            <el-table-column prop="createTime" label="预警触发时间" width="200" align="center" > </el-table-column>
                            <el-table-column prop="status" label="状态" align="center":formatter="stateDes"></el-table-column>
                            <el-table-column label="" align="center">
                                <template slot-scope="scope">
                                    <el-button class="btn-style" size="small" @click="detail(scope.row)">处理</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination style="float:left;margin:10px 20px" :total="listData.totalCount"
                             @size-change="handleSizeChange" @current-change="handleCurrentChange">
                        </pagination>
                    </div>
        </el-row>
    </div>
</template>

<script>
import riskColumn from '../riskInfo/riskColumn'
import pagination from '../../../components/common/pagination.vue'

export default {
	name: 'riskIndex',
	components: {
		'pagination':pagination,
		'risk-info':riskColumn  
	},
	computed: {
		listData:function(){
			return this.$store.state.risk.riskIndexList
		},
		projectInfo:function(){
			return this.$store.state.risk.projectInfo
		}
	},
	beforeMount () {
		this.param={
			pageNo:1,
			pageSize:10,
			projectId:this.$store.state.risk.projectInfo.projectId||this.$route.params.id
		}
            
		this.$store.dispatch('risk_getRiskIndexList',this.param)
	},
	data() {
		return {
			param:{},
			status:{
				0:'待处理',
				1:'人工缓释',
				2:'无法缓释',
				3:'处理中',
				4:'自动缓释'
			},
			level:{
				3:'高',
				2:'中',
				1:'低'
			}
		}
	},
	methods: {
		stateDes(row){
			return this.status[row.status]
		},
		levelDes(row){
			return this.level[row.riskLevel]
		},
		back(){
			this.$router.go(-1)
		},
		detail(item){
			this.$store.commit('risk_riskIndex',item)
			if(item.status==3){
				this.$store.dispatch('risk_historyDetail',{riskProjectId:item.id})
			}
			this.$router.push('/riskHandle/'+item.id)
		},
		handleSizeChange(size){
			this.param.pageSize=size
			this.param.pageNo=1
			this.$store.dispatch('risk_getRiskIndexList',this.param)
		},
		handleCurrentChange(page){
			this.param.pageNo=page
			this.$store.dispatch('risk_getRiskIndexList',this.param)
		}
	}
}

</script>

<style>
  #riskIndex .el-table .cell{text-align: center;}
  #riskIndex .el-table__body .cell{color: #535455;font-size: 13px;}
</style>