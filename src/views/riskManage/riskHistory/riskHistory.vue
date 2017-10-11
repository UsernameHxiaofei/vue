<template>
    <div id='riskHistory'>
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button>
        </div>
        <el-row style="margin-top:20px">
            <risk-info></risk-info>
        </el-row>
        <el-row>
            <div style="margin:20px auto;max-width:1200px;background:#ffffff">
                <el-table id="riskhistory-table" border :data="listData.list" stripe>
                    <el-table-column type="index" label="序号" width="80"> </el-table-column>
                    <el-table-column prop="riskName" label="指标名" align="center" width="150"> </el-table-column>
                    <el-table-column prop="riskCategory" label="风险域" width="120" align="center">
                        <template scope="scope">
                            {{scope.row.riskCategory|riskRegion}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="riskLevel" label="等级" align="center" width="80" :formatter="levelDes"> </el-table-column>
                    <el-table-column prop="createTime" label="预警触发时间" width="170" align="center"> </el-table-column>
                    <el-table-column prop="updateTime" label="处理时间" width="170" align="center"> </el-table-column>
                    <el-table-column prop="status" label="状态" width="150" align="center" :formatter="stateDes"></el-table-column>
                    <el-table-column prop="operateName" label="处理人" width="125" align="center"> </el-table-column>
                    <el-table-column label="" align="center">
                        <template scope="scope">
                            <el-button class="btn-style" size="small" @click="detail(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination style="float:left;margin:10px 50px" :total="listData.totalCount||0" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
    import pagination from '../../../components/common/pagination.vue'
    import riskColumn from '../riskInfo/riskColumn'

    export default {
        name: 'riskHistory',
        components: {
            'pagination':pagination,
            'risk-info':riskColumn  
        },
        computed: {
           listData:function(){
               return this.$store.state.risk.historyList;
           }  
        },
        mounted () {
           this.param={
               pageSize:10,
               pageNo:1,
               projectId:this.$store.state.risk.projectInfo.projectId||this.$route.params.id
           }
           this.$store.dispatch('risk_getHistoryList',this.param);  
        },
        data() {
            return {
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
                },
                param:{}
            }
        },
        methods: {
            stateDes(row){
                return this.status[row.status];
            },
            levelDes(row){
                return this.level[row.riskLevel];
            },
            back(){
                this.$router.go(-1);
            },
            handleSizeChange(size){
                this.param.pageSize=size;
                this.param.pageNo=1;
                this.$store.dispatch('risk_getHistoryList',this.param);
            },
            handleCurrentChange(page){
                this.param.pageNo=page;
                this.$store.dispatch('risk_getHistoryList',this.param);
            },
            detail(item){
                this.$store.commit('risk_riskIndex',item);
                this.$store.dispatch('risk_historyDetail',{riskProjectId:item.id}).then(()=>{
                    this.$router.push('/riskHistoryDetail/'+item.id);
                });
            }
        }
    }

</script>

<style >
    #riskhistory-table .el-table .cell{text-align: center;}
    #riskhistory-table .el-table__body .cell{color: #535455;font-size: 13px;}
</style>