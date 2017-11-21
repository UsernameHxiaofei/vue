
<template>
  <div class="my-page">
    <el-pagination style="width: 80%;float: left;"
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange" 
    :current-page="1" 
    :page-sizes="[10, 20, 30, 40]" 
    :page-size="10" 
    layout="total, sizes, prev, pager, next, jumper" 
    :total="totalCount">
    </el-pagination>
  </div>

</template>

<script>
export default {
	props:['total'],
	methods: {
		handleSizeChange(val) {
			this.$emit('size-change',val)
		},
		handleCurrentChange(val) {
			this.$emit('current-change',val)
		}
	},
	watch: {
		total:function(v){
			this.totalCount=v
		}
	},
	data() {
		return {
			currentPage: 1,
			totalCount:this.total||0
		}
	}
}
</script>
<style>
.my-page .el-pagination__editor{width:60px;}
</style>