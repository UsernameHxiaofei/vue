<template>
  <div id="wrap">
    <!--栅格-->
    <div class="my-col">
      <el-row>
        <el-col :span="4">
          <div class="grid-content">
            <img class="pic" src="../../assets/images/fund4.png" />
            <div class="num-box">
              <span class="color-blue">全部项目</span>
              <p>{{ investGetHeadInfo.projectNum ||0}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="4" style="width:28%;">
          <div class="grid-content">
            <img class="pic" src="../../assets/images/fund5.png" />
            <div class="num-box">
              <span class="color-yellow">总融资额</span>
              <p>
                <sup>￥</sup>{{ investGetHeadInfo.allAmounts|| 0 }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--搜索-->
    <div class="search-box">
      <div class="output">
        <el-input placeholder="项目名称" icon="search" v-model.trim="keyword" @keyup.enter.native="search" :on-icon-click="search">
        </el-input>
      </div>
      <div class="date-box">
        <el-select v-model="itemStatus" @change="statusChange" clearable placeholder="项目状态">
          <el-option v-for="item in itemSelectStatus" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--表格-->
    <div class="my-table">
      <el-table :data="investmentFundData.records" stripe border style="width: 100%">
        <el-table-column prop="kong" width="30">
        </el-table-column>
        <el-table-column type="index" width="60" label="序号">
        </el-table-column>
        <el-table-column prop="projectName"  width="290" label="项目名称">
        </el-table-column>
        <el-table-column prop="projecStatus" width="100" label="状态">
          <template slot-scope="scope">
            {{scope.row.projecStatus|projectStatus}}
          </template>
        </el-table-column>
        <el-table-column prop="financingAmount" width="180" label="目标融资额(元)">
        </el-table-column>
        <el-table-column prop="percent" width="120" label="已融比例">
        </el-table-column>
        <el-table-column prop="raisedAmount" width="180" label="已融金额(元)">
        </el-table-column>
        <el-table-column prop="crowdFundingBegin" label="开始时间">
        </el-table-column>
        <el-table-column prop="crowdFundingEnd" label="结束时间">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <router-link :to="{path: '/investmentDetail/'+scope.row.projectId}">
              <el-button class="btn-style" @click="investmentDetail(scope.row)">明细</el-button>
            </router-link>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!--分页-->
    <div class="page-box fr clearfix">
      <div class="page-wrap">
        <pagination :total="investmentFundData.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from '../../components/common/pagination'
import pstatus from '../../constant/projectStatus.js'

export default {
	components: {
		pagination
	},
	computed: {
		investmentFundData: function () {
			return this.$store.state.money.investmentFundData
		},
		investGetHeadInfo: function () {
			return this.$store.state.money.investGetHeadInfo
		},
	},
	beforeMount() {
		this.param = {
			projectName: this.keyword,
			projectStatus: this.itemStatus,
			page: 1,
			number: 10
		}
		this.$store.dispatch('investmentFund_getList', this.param)
		this.$store.dispatch('invest_getHeadInfo')
	},
	data() {
		return {
			keyword: '',
			itemStatus: '',
			itemSelectStatus: pstatus,
		}
	},
	methods: {
		search() {
			this.param.projectName = this.keyword
			this.param.page = 1
			this.$store.dispatch('investmentFund_getList', this.param)
		},
		handleSizeChange(val) {
			this.param.number = val
			this.param.page = 1
			this.$store.dispatch('investmentFund_getList', this.param)
		},
		handleCurrentChange(val) {
			this.param.page = val
			this.$store.dispatch('investmentFund_getList', this.param)
		},
		statusChange() {
			this.param.page = 1
			this.param.projectStatus = this.itemStatus
			this.$store.dispatch('investmentFund_getList', this.param)
		},
		investmentDetail(item) {
			//stringify()用于从一个对象解析出字符串
			sessionStorage.setItem('projectInfo',JSON.stringify(item))
		},
	}
}
</script>