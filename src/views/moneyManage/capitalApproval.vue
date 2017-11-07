<style scoped>
.top-box {
    width: 100%;
    padding: 20px 0 20px 30px;
    background-color: #fcfcfc;
}
</style>
<template>
    <div id="wrap">
        <div class="top-box">
            <el-button-group>
                <router-link :to="{path: '/refundApproval'}">
                    <el-button>退款审批</el-button>
                </router-link>
                <router-link :to="{path: '/marginApproval'}">
                    <el-button>保证金审批</el-button>
                </router-link>
                <router-link :to="{path: '/capitalApproval'}">
                    <el-button type="primary">注资审批</el-button>
                </router-link>
            </el-button-group>
        </div>
        <!--搜索-->
        <div class="search-box">
            <div class="output">
                <el-input placeholder="项目名称" icon="search" v-model.trim="keyword" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </div>
        </div>
        <!--表格-->
        <div class="my-table">
            <el-table :data="getCapitalInjectionList.content" stripe border style="width: 100%">
                <el-table-column prop="kong" width="30">
                </el-table-column>
                <el-table-column type='index' width="60" label="序号">
                </el-table-column>
                <el-table-column prop="projectName" label="项目名称">
                </el-table-column>
                <el-table-column prop="enterpriseName" label="项目方名称">
                </el-table-column>
                <el-table-column prop="statusName" label="状态">
                </el-table-column>
                <el-table-column prop="totalAmount" label="总投资额(元)">
                </el-table-column>
                <el-table-column prop="targetAmount" label="目标融资额(元)">
                </el-table-column>
                <el-table-column prop="raisedAmount" label="实际融资额(元)">
                </el-table-column>
                <el-table-column prop="payAmount" label="申请注资额(元)">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <router-link :to="{path: '/approval/'+scope.row.projectId}">
                            <el-button class="btn-style btn-margin" @click="approval(scope.row)">明细</el-button>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="kong" width="30">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box fr clearfix">
            <div class="page-wrap">
                <pagination :total="getCapitalInjectionList.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../../components/common/pagination'
export default {
    components: {
        pagination
    },
    computed: {
        getCapitalInjectionList: function () {
            return this.$store.state.money.getCapitalInjectionList;
        },
    },
    beforeMount() {
        this.param = {
            projectName: this.keyword,
            page: 1,
            number: 10
        }
        this.$store.dispatch("get_capitalInjectionList", this.param);
    },
    data() {
        return {
            keyword: '',
        }
    },
    methods: {
        handleIconClick() {
            this.param.projectName = this.keyword;
            this.param.page = 1;
            this.$store.dispatch('get_capitalInjectionList', this.param);
        },
        handleSizeChange(size) {
            this.param.number = size;
            this.param.page = 1;
            this.$store.dispatch('get_capitalInjectionList', this.param);
        },
        handleCurrentChange(page) {
            this.param.page = page;
            this.$store.dispatch('get_capitalInjectionList', this.param);
        },
        approval(item) {
            //stringify()用于从一个对象解析出字符串
            sessionStorage.setItem('projectInfo', JSON.stringify(item));
        }
    }
}
</script>