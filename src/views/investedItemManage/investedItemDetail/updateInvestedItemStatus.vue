<template>
    <div id='updateInvestedItemStatus'>
        <div class="updateInvestedItemStatus-content">
            <label>当前项目状态:&emsp;</label><label>{{investedItemDetail.status|investedItemStatus}}</label>
        </div>
        <div class="updateInvestedItemStatus-content">
            <el-radio-group @change="updateStatus" v-model="status">
                <el-radio :key="item.value" v-for="item in investedItemStatus" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
    import investedItemStatusData from '../../../constant/investedItemStatus'

    export default {
        name: 'updateInvestedItemStatus',
        computed: {
            investedItemDetail: function () {
                return this.$store.state.investedItem.project || {}
            },
        },
        data() {
            return {
                investedItemStatus: investedItemStatusData,
                status:0
            }
        },
        mounted(){
           
        },
        methods: {
            updateStatus() {
                // 20 运营中 30 休业整顿 40 停运
                
                this.$confirm('此操作将改变项目的状态, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('AtiProjectStatusUpdate', { projectId: this.$route.params.id, status: this.status }).then((data) => {
                        this.$store.dispatch('AtiProjectInfoGet', {id:this.$route.params.id}).then(()=>{
                            this.status=this.investedItemDetail.status
                        })
                        this.$message.info(data.message)
                    })
				}).catch(() => {
                    
				})
            }
        }
    }
</script>

<style scoped>
    .updateInvestedItemStatus-title {
        margin: 10px 16px;
    }
    .updateInvestedItemStatus-content {
        margin: 40px 16px;
        padding-bottom: 4px;
        font-weight: 600;
        font-size: 16px;
        vertical-align: middle;line-height: 18px;
        border-bottom: 1px solid #f4f5f9;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        flex-basis: 100px;
    }
</style>