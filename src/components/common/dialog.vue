<style>
.p-form .el-form-item__label{text-align:right;font-weight: normal;}
.p-form .el-dialog--small {width: 35%;box-shadow:0 0 5px #eee;}
.p-form .el-dialog__body{padding:25px 20px 0;margin-top:15px;border-top:1px solid rgb(191, 217, 217);
border-bottom:1px solid rgb(191, 217, 217);}
.p-form .el-dialog__footer{padding:15px 20px;}
.p-form .el-input{width:93% !important;}
</style>
<template>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false">
      <slot></slot>
      <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
	props:['dialogFormVisible','title'],
	data() {
		return {
        
      }
    },
	methods:{
		handleClose() {
			this.$emit('dialog-cancel-callback') 
		},
		cancel(){
			this.$emit('dialog-cancel-callback')        
			// this.dialogFormVisible = false;
			// this.$emit('',)
		},
		confirm(){
			this.$emit('dialog-confirm-callback')
		}
	},
	computed: {

	}
};
</script>

<style scoped>

</style>
