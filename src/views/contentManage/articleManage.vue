<template>
    <div class='artcleManage'>
        <div class="search-box">
            <div class="output">
                <el-input placeholder="关键字" icon="search" v-model.trim="keyword" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="output" style="margin-left:20px">
                <el-select v-model="status" clearable placeholder="状态" @change="statusChange">
                    <el-option v-for="item in articleStatus" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="output" style="margin-left:20px">
                <el-button class="el-button el-button--primary" @click="createArticle">新建文稿
                    <i class="el-icon-plus"></i>
                </el-button>
            </div>
        </div>
        <!--表格-->
        <div class="my-table">
            <el-table :data="selectDynamicForShow.flag&&selectDynamicForShow.resutl.list" stripe border >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="内容">
                                <div class="ck-content" v-html="props.row.content"></div>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop='title' label="标题">
                </el-table-column>
                <el-table-column prop='sectionName' width="120" label="栏目">
                </el-table-column>
                <el-table-column prop='opreator' width="120" label="操作人">
                </el-table-column>
                <el-table-column label="状态" width="120" prop="statusName">
                </el-table-column>
                <el-table-column label="创建时间" prop="creatTime">
                </el-table-column>
                <el-table-column label="编辑时间" prop="lastUpdateTime">
                </el-table-column>
                <el-table-column label="操作" prop="endTime">
                    <template slot-scope="props">
                        <router-link :to="{path: '/articleDetail/'+props.row.id}">
                            <el-button class="btn-style">编辑</el-button>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="kong" width="30">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box clearfix">
            <div class="page-wrap">
                <pagination :total="selectDynamicForShow.flag&&selectDynamicForShow.resutl.count||0" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import pagination from '../../components/common/pagination'
    import articleStatusData from '../../constant/articleStatus'
    export default {
        name: 'artcleManage',
        components: {
            pagination
        },
        beforeMount() {
            this.$store.dispatch('selectDynamicForShow', this.param)
        },
        data() {
            return {
                param: {
                    section: 1,
                    status: 0,
                    keyword: '',
                    pageNum: 1,
                    pageLimit: 10
                },
                articleStatus: articleStatusData,
                keyword: '',
                status: ''
            }
        },
        methods: {
            handleSizeChange(val) {
                this.param.pageLimit = val
                this.param.pageNum = 1
                this.$store.dispatch('selectDynamicForShow', this.param)
            },
            handleCurrentChange(val) {
                this.param.pageNum = val
                this.$store.dispatch('selectDynamicForShow', this.param)
            },
            handleIconClick() {
                this.param.keyword = this.keyword
                this.param.pageNum = 1
                this.$store.dispatch('selectDynamicForShow', this.param)
            },
            statusChange(val) {
                this.param.status = val
                this.param.pageNum = 1
                this.$store.dispatch('selectDynamicForShow', this.param)
            },
            createArticle(){
                this.$router.push('/articleDetail/')
            }
        },
        computed: {
            selectDynamicForShow: function () {
                return this.$store.state.content.selectDynamicForShow||{}
            }
        }

    }
</script>

<style scoped>
    
</style>