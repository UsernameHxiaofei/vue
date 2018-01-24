<template>
    <div id='investedItemTable'>
        <div class="search-box" >
            <div class="output">
                <el-input style="width:260px;" placeholder="项目编号|项目名称|经营主" icon="search" v-model.trim="keyword" :on-icon-click="search" @keyup.enter.native="search"></el-input>
            </div>
            <div class="date-box">
                <el-cascader style="margin-left:10px;" placeholder="所属区域" expand-trigger="click" change-on-select clearable :options="options3"
                    v-model="where" @change="handleChange">
                </el-cascader>
                <el-select v-model="industry" clearable placeholder="所属行业" @change="industryChange">
                    <el-option v-for="item in industryOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!--表格-->
        <div class="my-table">
            <el-table v-loading="tableloading" :data="projectList.list" stripe border style="width: 100%">
                <el-table-column prop="" width="40"></el-table-column>
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column prop="code" width="120" label="项目编号"> </el-table-column>
                <el-table-column prop="name" width="220" label="项目名称"> </el-table-column>
                <el-table-column prop="orderName" width="140" label="经营主"> </el-table-column>
                <el-table-column prop="industry" width="110" label="所属行业">
                    <template slot-scope="scope">
                        {{scope.row.industry|industry}}
                    </template>
                </el-table-column>
                <el-table-column label="所属地区">
                    <template slot-scope="scope">
                        {{scope.row.regionCode|address}}
                    </template>
                </el-table-column>
                <el-table-column prop="lastUpdateTime" label="更新时间">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        运营中
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope" style="text-align:center">
                            <el-button @click="runButton(scope.row)" class="btn-style">{{button.label}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="" width="40"></el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box clearfix">
            <div class="page-wrap">
                <pagination :total="projectList.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>

        </div>
    </div>
</template>

<script>
    import pagination from '../common/pagination'
    import { regionData } from 'element-china-area-data'
    import projectPhaseList from '../../constant/projectPhase'
    import industryList from '../../constant/industry'

    export default {
        name: 'investedItemTable',
        components: {
            pagination
        },
        props: {
            button: {
                type: Object,
                default: function () {
                    return { label: '详情',value:'/investedItemDetail/' }
                }
            },
        },
        computed: {
            projectList: function () {
                return this.$store.state.investedItem.projectList || {}
            }
        },
        data() {
            return {
                where: [],
                industry: '',
                // 搜索
                keyword: '',
                tableloading: false,
                param: {},
                projectPhaseOption: projectPhaseList,
                industryOption: industryList,
                options3: regionData,
            }
        },
        beforeMount() {
            this.param = {
                industry: this.industry,
                regionCode: this.where.length > 0 ? this.where[this.where.length - 1] : '',
                keyWord: this.keyword,
                limit: 10,
                pageStart: 1
            }
            this.getListData()
        },
        methods: {
            runButton(data){
                this.$emit('buttonClick',data)
            },
            getListData() {
                this.tableloading = true
                this.$store.dispatch('showAtiProjectInfoList', this.param).then(() => {
                    this.tableloading = false
                })
            },
            search() {
                this.param.keyWord = this.keyword
                this.param.pageNo = 1
                this.getListData()
            },
            industryChange() {
                this.param.industry = this.industry
                this.param.pageNo = 1
                this.getListData()
            },
            handleChange() {
                this.param.regionCode = this.where.length > 0 ? this.where[this.where.length - 1] : ''
                this.param.pageStart = 1
                this.getListData()
            },
            handleSizeChange(size) {
                this.param.limit = size
                this.param.pageStart = 1
                this.getListData()
            },
            handleCurrentChange(page) {
                this.param.pageStart = page
                this.getListData()
            }
        }
    }
</script>

<style scoped>
</style>