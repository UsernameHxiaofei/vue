<template>
    <div id='investedItemList'>
        <!--搜索-->
        <div class="search-box" style="padding:5px 0 10px 5px;float:left;">
            <div class="output">
                <el-input style="width:260px;" placeholder="项目编号|项目名称|经营主" icon="search" v-model.trim="keyword" :on-icon-click="search"
                    @keyup.enter.native="search"></el-input>
            </div>
            <el-button type="primary" style="margin-left:10px;float:right" @click="createProject">创建项目
                <i class="el-icon-plus"></i>
            </el-button>
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
                <el-table-column >
                    <template slot-scope="scope" style="text-align:center">
                        <router-link :to="{path: '/investedItemDetail/'+scope.row.id}">
                            <el-button class="btn-style">详情</el-button>
                        </router-link>
                        
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
    import pagination from '../../components/common/pagination'
    import { regionData } from 'element-china-area-data'
    import projectPhaseList from '../../constant/projectPhase'
    import industryList from '../../constant/industry'
    import imageCropper from '../../components/common/cropper'
    export default {
        components: {
            pagination,
            imageCropper
        },
        data() {
            return {
                editChannelMarkChange: false,
                tableloading: false,
                param: {},
                options3: regionData,
                projectPhaseOption: projectPhaseList,
                industryOption: industryList,
                where: [],
                industry: '',
                // 搜索
                keyword: '',
                active: 'border-orange',
                projectChannel: {
                    channelType: 1,
                    channelMark: '',
                    channelDesc: ''
                },
             
                dialogVisible: false,
                customerParam: {}
            }
        },
        computed: {
            projectList: function () {
                return this.$store.state.investedItem.projectList || {}
            },
           
            operator: function () {
                return this.$store.state.login.actor
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
            createProject(){
                this.$router.push('/investedItemCreate')
            },
            uploadChannelMark() {
                this.editChannelMarkChange = true
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
    .output1 {
        width: 450px;
        float: left;
    }
</style>