<template>
    <div id='enterpriseManage'>
        <el-row class="search-box">
            <el-col class="output" >
                <el-input class="input1" style="width:300px" placeholder="企业名称|统一社会信用代码|法定代表人" clearable icon="search" v-model.trim="keyword" @keyup.enter.native="search" :on-icon-click="search"></el-input>
            </el-col>
            <el-col :span="6" style="float:right">
                <el-date-picker v-model="range" type="datetimerange" clearable placeholder="选择日期范围" @change="rangechange"></el-date-picker>
            </el-col>
            <el-col :span="4" style="float:right" >
                <el-cascader :options="options" v-model="where" @change="changeWhere" :editable="false" change-on-select clearable placeholder="所在地"></el-cascader>
            </el-col>
        </el-row>
        <el-row class="enp-search">
            <el-col :span="24" class="enterprise-table">
                <el-table border :data="enterpriseListData.list" stripe style="width: 100%">
                     <el-table-column width="30" prop="" label="" align="center"> </el-table-column> 
                     <el-table-column type="index" label="序号" width="70px"></el-table-column>
                     <el-table-column prop="creditCode" label="统一社会信用代码" align="center"> </el-table-column> 
                     <el-table-column prop="name" label="企业名称"  align="center"> </el-table-column>
                     <el-table-column label="所在地" align="center" >
                        <template scope="scope">
                            {{scope.row.addressCode|address}}
                        </template>
                    </el-table-column>
                     <el-table-column width="120" prop="representativeName" label="法定代表人" align="center"> </el-table-column>
                     <el-table-column width="240" prop="createTime" label="入库时间" align="center"> </el-table-column>
                     <el-table-column label="" width="100" align="center">
                         <template scope="scope">
                            <el-button class="btn-style" size="small" @click="detail(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column width="30" prop="" label="" align="center"> </el-table-column> 
                </el-table>
                <pagination style="float:right;margin:10px 50px" :total="enterpriseListData.totalCount"  @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import pagination from '../../components/common/pagination.vue'
import { regionData } from 'element-china-area-data'


export default {
    name: 'enterpriseManage',
    components: {
        'pagination':pagination
    },
    computed: {
         enterpriseListData:function(){
             return this.$store.state.enterprise.enterpriseManageList;
         }
    },
    mounted () {
        this.param={
                beginTime:this.range[0],
                endTime:this.range[1],
                addressCode:'',
                keyword:this.keyword,
                pageSize:10,
                pageNo:1
            }
        this.$store.dispatch('enterprise_getManageList',this.param);
    },
    data () {
        return {
            where: [],
            options: regionData,
            keyword:'',
            range:[],
            param:{}
        }
    },
    methods: {
        handleSizeChange(size){
            this.param.pageSize=size;
            this.param.pageNo=1;
            this.$store.dispatch('enterprise_getManageList',this.param);
        },
        handleCurrentChange(page){
            this.param.pageNo=page;
            this.$store.dispatch('enterprise_getManageList',this.param);
        },
        changeWhere(where){
            if(where.length==1){
                this.param.addressCode=where[0].slice(0,2);
            }else if(where.length==2){
                this.param.addressCode=where[1].slice(0,4);
            }else if(where.length==3){
                this.param.addressCode=where[2].slice(0,6);
            }else{
                this.param.addressCode='';
            }
            this.$store.dispatch('enterprise_getManageList',this.param);
        },
        rangechange(v){
            this.range= v.split(' - ');
            this.param.beginTime=this.range[0];
            this.param.endTime=this.range[1];
            this.$store.dispatch('enterprise_getManageList',this.param);
        },
        search(){
            this.param.keyword=this.keyword;
            this.param.pageNo=1;
            this.$store.dispatch('enterprise_getManageList',this.param);
        },
        detail(item){
            this.$store.commit('enterprise_setInfo',item);
            this.$router.push('/enterpriseDetail/'+item.id);
        }
    }
}
</script>

<style >
.enp-search{margin-top:40px;}
#enterpriseManage{right:0;}
.enterprise-table .el-table .cell{text-align: center;}
.enterprise-table .el-table__body .cell{color: #a3abbe;font-size: 12px;}
#enterpriseManage .btn-style{font-size: 12px;padding: 6px 15px;border-color: #06ccb6;color: #06ccb6;margin: 0 5px;}
#enterpriseManage .btn-style:hover{background: #06ccb6;color: white;}
</style>