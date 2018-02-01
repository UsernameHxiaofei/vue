<template>
    <div>
        <el-dialog :title="importFile.title" :visible.sync="visible" :before-close="handleClose">
            <el-form>
                <el-form-item :label="importFile.label">
                    <el-button @click="uploadFile" :loading="fileloading">上传</el-button>
                </el-form-item>
                <el-form-item label="上传文件列表">
                    <el-table border :data="exportlist" stripe style="width: 100%">
                        <el-table-column prop="name" label="文件名"></el-table-column>
                        <el-table-column prop="size" label="文件大小" align="center"> </el-table-column>
                        <el-table-column prop="time" label="上传时间" align="center"> </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button class="btn-style" size="small" @click="exportFile(scope.row)">{{scope.row.isExported?'已导入':'导入'}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <form style="display:none">
                        <input type="file" @change="fileChange" name="file" ref="fileInput">
                    </form>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'importFile',
        props: {
            importFile: {
                type: Object,
                default: function () {
                    return { title: '文件导入组件', label: '上传文件',visible:true }
                }
            },
            visible:{
                type:Boolean,
                default:false
            }
        },
        computed: {
            isVisible:function(){
                return !this.visible
            }
        },
        data() {
            return {
                fileloading: false,
                exportlist: [],
                
            }
        },
        methods: {
            handleClose(){
                this.$emit('close')
            },
            uploadFile() {
                this.$refs['fileInput'].click()
                // this.exportlist
            },
            fileChange(event) {
                if (event.target.files.length == 0) {
                    return
                }
                let file = event.target.files[0]
                let formData = new FormData()
                formData.append('file', file)
                let xhr = new XMLHttpRequest()
                xhr.open('post', '/ajax/fileupload')
                let self = this
                this.fileloading = true
                xhr.onload = function () {
                    self.fileloading = false
                    if (!xhr.response) {
                        self.$message.warning(JSON.parse(xhr.response).information)
                    } else if (xhr.status == 200) {
                        self.$message.success('上传完成')
                        let temp = {
                            name: file.name,
                            size: file.size + 'byte',
                            time: new Date().toLocaleString(),
                            path: JSON.parse(JSON.parse(xhr.response).objectLiteral),
                            isExported: false
                        }
                        self.exportlist.push(temp)
                    }
                }
                xhr.send(formData)
            },
            exportFile(item) {
                this.$emit('result', item)
            },
        }
    }
</script>

<style scoped>
</style>