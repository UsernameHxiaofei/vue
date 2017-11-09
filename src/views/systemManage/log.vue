<style>
.el-form-item__content span {
  word-break: break-all;
}
.marginLeft{
  margin-left: 30px;
}
</style>

<template>
  <div id="systemMaintain">
    <!--搜索-->
    <div class="search-box">
      <div class="output">
        <el-input placeholder="操作人" icon="search" v-model.trim="operatorName" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
        </el-input>
        
      </div>
      <div class="output marginLeft">
        <el-input placeholder="部件码" icon="search" v-model.trim="componentCode" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <div class="output marginLeft">
        <el-input placeholder="输入输出关键字" icon="search" v-model.trim="inputAndOutData" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <div class="date-box">
        <div class="my-calender">
          <el-date-picker v-model="range" type="datetimerange" clearable align="right" placeholder="选择日期范围" :picker-options="pickerOptions" @change="rangechange"></el-date-picker>
        </div>
      </div>
    </div>
    <!--表格-->
    <div class="my-table">
      <el-table :data="systemLogList.list" stripe border style="width: 100%">
        <el-table-column prop="kong" width="30">
        </el-table-column>
        <el-table-column type='index' width="70" label="序号">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="输入数据">
                <span>{{ props.row.inputData }}</span>
              </el-form-item>
              <el-form-item label="输出数据">
                <span>{{ props.row.outputData }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="操作人姓名" prop="operateName">
        </el-table-column>
        <el-table-column label="操作人IP地址" prop="ip">
        </el-table-column>
        <el-table-column label="部件码" prop="componentCode">
        </el-table-column>
        <el-table-column label="服务码" prop="serviceCode">
        </el-table-column>
        <el-table-column label="操作开始时间" prop="beginTime">
        </el-table-column>
        <el-table-column label="操作结束时间" prop="endTime">
        </el-table-column>
        <el-table-column prop="kong" width="30">
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page-box clearfix">
      <div class="page-wrap">
        <pagination :total="systemLogList.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
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
		systemLogList: function () {
			return this.$store.state.system.systemLogList
    },
	},
	beforeMount() {
		this.param = {
			beginTime: this.startTime,
			endTime: this.endTime,
			operatorName:this.operatorName,
			componentCode:this.componentCode,
			inputAndOutData:this.inputAndOutData,
			pageNo: 1,
			pageSize: 10
		}
		this.$store.dispatch('system_logList', this.param)
  },
	data() {
		return {
			startTime: '',
			endTime: '',
			operatorName:'',
			componentCode:'',
			inputAndOutData:'',
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
				}, {
					text: '最近一个月',
					onClick(picker) {
						const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
				}, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
				}]
			},
			range: []
		}
	},
	methods: {
		// 搜索
		handleIconClick() {
			this.param.operatorName=this.operatorName
      this.param.componentCode=this.componentCode
      this.param.inputAndOutData=this.inputAndOutData
      this.param.pageNo = 1
      this.$store.dispatch('system_logList', this.param)
    },
		// 分页
		handleSizeChange(size) {
			this.param.pageSize = size
      this.param.pageNo = 1
      this.$store.dispatch('system_logList', this.param)
    },
		handleCurrentChange(page) {
			this.param.pageNo = page
      this.$store.dispatch('system_logList', this.param)
    },
		// 时间
		rangechange(v) {
			this.range = v.split(' - ')
      this.param.beginTime = this.range[0]
      this.param.endTime = this.range[1]
      this.$store.dispatch('system_logList', this.param)
    },
	}
}
</script>
