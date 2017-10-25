<style scoped>
/*栅格*/

#my-grid .el-col-4:nth-child(2),
#my-grid .el-col-4:nth-child(3) {
    width: 23%
}
</style>
<template>
    <div id="wrap">
        <!--栅格-->
        <div class="my-col" id="my-grid">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund8.png" />
                        <div class="num-box">
                            <span class="color-blue">充值记录(笔)</span>
                            <p>{{topupStatResults.total_record?topupStatResults.total_record:0}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund6.png" />
                        <div class="num-box">
                            <span class="color-green">失败金额(共{{topupStatResults.fail_record}}笔)</span>
                            <p>
                                <sup>￥</sup>{{topupStatResults.fail_amount?topupStatResults.fail_amount:0}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <img class="pic" src="../../assets/images/fund7.png" />
                        <div class="num-box">
                            <span class="color-orange">成功金额(共{{topupStatResults.success_record}}笔)</span>
                            <p>
                                <sup>￥</sup>{{topupStatResults.success_amount?topupStatResults.success_amount:0}}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--搜索-->
        <div class="search-box">
    
            <div class="output">
                <el-input placeholder="手机号 | 姓名" icon="search" v-model.trim="keyword" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="date-box">
                <el-date-picker v-model="startDate" align="right" type="datetime"  clearable @change="startChange" placeholder="选择开始日期"></el-date-picker>
                  至
                <el-date-picker v-model="endDate" align="right"  type="datetime" clearable @change="endChange" placeholder="选择结束日期"></el-date-picker>
                <el-select v-model="statusCode" clearable @change="statusChange" placeholder="状态">
                    <el-option v-for="item in transactionStatuses" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!--表格-->
        <div class="my-table">
            <el-table :data="topupByConditions.records" stripe border style="width: 100%">
                <el-table-column prop="kong" width="30">
                </el-table-column>
                <el-table-column type='index' prop="th1" width="60" label="序号">
                </el-table-column>
                <el-table-column prop="id" label="充值编号">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="amount" label="充值金额(元)">
                </el-table-column>
                <el-table-column prop="time" label="充值时间">
                </el-table-column>
                <el-table-column prop="statusName" label="状态">
                </el-table-column>
                <el-table-column prop="kong" width="30">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box fr clearfix">
            <div class="page-wrap">
                <pagination :total="topupByConditions.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>
    
    </div>
</template>
<script>
import pagination from '../../components/common/pagination'
export default {
    name: 'rechargeManage',
    components: {
        pagination
    },
    data() {
        return {
            rechargeParam: {},
            keyword: '',
            // 日历
            startDate: '',
            endDate: '',
            statusCode: '',
            range: [],
            // 搜索
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }],
            }
        }
    },
    mounted() {
        this.rechargeParam = {
            fuzzy: this.keyword,
            startDate: null,
            endDate: null,
            statusCode: this.statusCode,
            page: 1,
            number: 10
        }
        console.log(this.rechargeParam);
        //条件查询充值记录
        this.$store.dispatch('find_topupByCondition', this.rechargeParam);
        //获取交易状态的所有状态信息
        this.$store.dispatch('getAll_transactionStatus');
        //获取充值记录的统计结果
        this.$store.dispatch('get_topupStatResult',this.rechargeParam);
    },
    computed: {
        topupByConditions: function () {
            return this.$store.state.money.topupByCondition;
        },
        transactionStatuses: function () {
            return this.$store.state.money.transactionStatus;
        },
        topupStatResults: function () {
            return this.$store.state.money.topupStatResult;
        }
    },
    methods: {
        handleIconClick() {
            this.rechargeParam.fuzzy = this.keyword;
            this.rechargeParam.page = 1;
            this.$store.dispatch('find_topupByCondition', this.rechargeParam);
        },
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
            this.rechargeParam.number = val;
            this.rechargeParam.page = 1;
            this.$store.dispatch('find_topupByCondition', this.rechargeParam);
        },
        handleCurrentChange(val) {
            this.rechargeParam.page = val;
            this.$store.dispatch('find_topupByCondition', this.rechargeParam);
        },
        startChange(v){
            this.rechargeParam.startDate = v?v:null;
            this.$store.dispatch('get_topupStatResult',this.rechargeParam);
            this.$store.dispatch('find_topupByCondition', this.rechargeParam);
        },
        endChange(v){
            this.rechargeParam.endDate =v?v:null;
            this.$store.dispatch('get_topupStatResult',this.rechargeParam);
            this.$store.dispatch('find_topupByCondition', this.rechargeParam);
        },
        statusChange() {
            this.rechargeParam.pageNum = 1;
            this.rechargeParam.statusCode = this.statusCode;
            this.$store.dispatch('find_topupByCondition', this.rechargeParam);
        },
    }
}
</script>