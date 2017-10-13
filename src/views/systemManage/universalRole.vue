<style>
.role-form .el-form-item__label {
    width: 95px!important;
}
</style>
<template>
    <div id="systemMaintain">
        <!--搜索-->
        <div class="search-box">
            <div class="output">
               <el-input placeholder="泛角色名称" icon="search" v-model.trim="search_value" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="date-box">
                <el-button class="el-button el-button--primary" @click="dialogUserVisible=true">添加泛角色
                    <i class="el-icon-plus"></i>
                </el-button>
            </div>
        </div>
        <!--表格-->
        <div class="my-table">
            <el-table :data="systemPanRoleList.list" stripe border style="width: 100%">
                <el-table-column width="30">
                </el-table-column>
                <el-table-column type='index' width="100" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="泛角色名称">
                </el-table-column>
                <el-table-column prop="category" label="分类">
                    <template scope="scope">
                        <span v-if="scope.row.category==0">门户</span>
                        <span v-if="scope.row.category==1">后台运营</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template scope="scope">
                        <span v-if="scope.row.status==0">无效</span>
                        <span v-if="scope.row.status==1">正常</span>
                        <span v-if="scope.row.status==2">已禁用</span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template scope="scope">
                        <span title="禁用/激活" class="normalize" :class="{ active: scope.row.status==2 }" @click="openClosure(scope.row)">
                        </span>
                        <span title="编辑泛角色" class="edits" @click="getData(scope.row)">
                        </span>
                    </template>
                </el-table-column>
                <el-table-column width="30">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box clearfix">
            <div class="page-wrap">
                <pagination :total="systemPanRoleList.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>
        <!-- 新增泛角色弹窗 -->
        <div class="p-form role-form">
            <el-dialog title="添加泛角色" :visible.sync="dialogUserVisible" @close="cancel" :close-on-click-modal="false">
                <el-form :model="addUser" :rules="rule" ref="addUser">
                    <el-form-item label="泛角色名称" prop="name">
                        <el-input v-model="addUser.name"></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="category">
                        <el-select v-model="addUser.category" clearable>
                            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="client">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    
        <!-- 编辑泛角色弹窗 -->
        <div class="p-form role-form">
            <el-dialog title="编辑泛角色" :visible.sync="dialogEditPanRole" @close="quit" :close-on-click-modal="false">
                <el-form :model="editPanRole" :rules="editRule" ref="editPanRole">
                    <el-form-item label="泛角色名称" prop="name">
                        <el-input v-model="editPanRole.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="category">
                        <el-select v-model="editPanRole.category" clearable>
                            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="quit">取 消</el-button>
                    <el-button type="primary" @click="reservePanRole">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import pagination from '../../components/common/pagination'
export default {
    components: {
        pagination,
    },
    computed: {
        systemPanRoleList: function () {
            return this.$store.state.system.systemPanRoleList;
        },
        systemAddPanRole: function () {
            return this.$store.state.system.systemAddPanRole;
        },
        systemBan: function () {
            return this.$store.state.system.systemBan;
        },
        systemUpdatePanRole: function () {
            return this.$store.state.system.systemUpdatePanRole;
        },
    },
    mounted() {
        this.param = {
            name: this.search_value,
            pageNo: 1,
            pageSize: 10
        }
        this.$store.dispatch('system_panRoleList', this.param);
    },
    data() {
        return {
            search_value: '',
            dialogUserVisible: false,
            dialogEditPanRole: false,
            category: '',
            categories: [
                { value: 0, label: '门户' },
                { value: 1, label: '后台运营' }
            ],
            addUser: {
                name: '',
                category: ''
            },
            editPanRole: {
                name: '',
                category: ''
            },
            rule: {
                name: [
                    { required: true, message: '请输入泛角色名称', trigger: 'blur' }
                ],
                category: [
                    { required: true, type: 'number', message: '请选择分类', trigger: 'change' }
                ]
            },
            editRule: {
                name: [
                    { required: true, message: '请输入泛角色名称', trigger: 'blur' }
                ],
                category: [
                    { required: true, type: 'number', message: '请选择分类', trigger: 'change' }
                ]
            },
        }
    },
    methods: {
        //新增的取消
        cancel() {
            this.$refs['addUser'].resetFields();
            this.addUser = {
                name: '',
                category: ''
            };
            this.$store.dispatch('system_panRoleList', this.param);
            this.dialogUserVisible = false;
        },
        //编辑的取消
        quit() {
            this.$refs['editPanRole'].resetFields();
            this.editPanRole = {
                name: '',
                category: ''
            };
            this.$store.dispatch('system_panRoleList', this.param);
            this.dialogEditPanRole = false;
        },
        // 搜索
        handleIconClick() {
            this.param.name = this.search_value;
            this.param.pageNo = 1;
            this.$store.dispatch('system_panRoleList', this.param);
        },
        // 分页
        handleSizeChange(size) {
            this.param.pageSize = size;
            this.param.pageNo = 1;
            this.$store.dispatch('system_panRoleList', this.param);
        },
        handleCurrentChange(page) {
            this.param.pageNo = page;
            this.$store.dispatch('system_panRoleList', this.param);
        },
        // 添加泛角色
        client() {
            this.$refs['addUser'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('system_addPanRole', this.addUser).then(() => {
                        if (this.systemAddPanRole.success) {
                            this.$message({
                                message: '添加泛角色成功！',
                                type: 'success'
                            });
                            this.$store.dispatch('system_panRoleList', this.param);
                            this.dialogUserVisible = false;
                        } else {
                            this.$message('添加失败,已存在此泛角色！');
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 禁用/激活
        openClosure(row) {
            if (row.status == 1) {
                row.status = 2;
                let params = {
                    status: row.status,
                    id: row.id
                };
                this.$store.dispatch('system_ban', params).then(() => {
                    if (this.systemBan.success) {
                        this.$message({
                            message: '禁用成功！',
                            type: 'success'
                        });
                        this.$store.dispatch('system_panRoleList', this.param);
                    } else {
                        this.$message('禁用失败');
                    }
                });
            } else {
                row.status = 1;
                let params = {
                    status: row.status,
                    id: row.id
                };
                this.$store.dispatch('system_ban', params).then(() => {
                    if (this.systemBan.success) {
                        this.$message({
                            message: '激活成功！',
                            type: 'success'
                        });
                        this.$store.dispatch('system_panRoleList', this.param);
                    } else {
                        this.$message('激活失败');
                    }
                });
            }
        },
        // 点击编辑泛角色
        getData(data) {
            this.editPanRole = data;
            this.editPanRole.category = data.category;
            this.dialogEditPanRole = true;
        },
        // 保存编辑泛角色
        reservePanRole() {
            this.$refs['editPanRole'].validate((valid) => {
                if (valid) {
                    if (this.editPanRole.id) {
                        this.$store.dispatch('system_updatePanRole', this.editPanRole).then(() => {
                            if (this.systemUpdatePanRole.success) {
                                this.$message({
                                    message: '编辑泛角色成功！',
                                    type: 'success'
                                });
                                this.$store.dispatch('system_panRoleList', this.param);
                                this.dialogEditPanRole = false;
                            } else {
                                this.$message('编辑泛角色失败');
                            }
                        });
                    }
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
