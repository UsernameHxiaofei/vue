<template>
    <div id="systemMaintain">
        <!--搜索-->
        <div class="search-box">
            <div class="output">
                 <el-input placeholder="角色名称" icon="search" v-model.trim="search_value" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="date-box">
               <el-button class="el-button el-button--primary" @click="dialogUserVisible = true">添加角色
                    <i class="el-icon-plus"></i>
                </el-button>
            </div>
        </div>
        <!--表格-->
        <div class="my-table">
            <el-table :data="systemRoleList.list" stripe border style="width: 100%">
                <el-table-column width="30">
                </el-table-column>
                <el-table-column type='index' width="100" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="角色名称">
                </el-table-column>
                <el-table-column prop="generalRole.name" label="泛角色">
                </el-table-column>
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
                        <span title="编辑角色" class="edits" @click="getData(scope.row)">
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
                <pagination :total="systemRoleList.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
            </div>
        </div>
        <!-- 添加角色弹窗 -->
        <div class="p-form">
            <el-dialog title="添加角色" :visible.sync="dialogUserVisible" @close="cancel">
                <el-form :model="addRole" :rules="rule" ref="addRole">
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="addRole.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="泛角色" :label-width="formLabelWidth" prop="generalRoleId">
                        <el-select v-model="addRole.generalRoleId" clearable placeholder="请选择" style="width:100%;">
                            <el-option v-for="item in systemAuthRoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="client">保 存</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 編輯角色弹窗 -->
        <div class="p-form">
            <el-dialog title="编辑角色" :visible.sync="dialogEditRole" @close="quit">
                <el-form :model="editRole" :rules="editRule" ref="editRole">
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="editRole.name"></el-input>
                    </el-form-item>
                    <el-form-item label="泛角色" :label-width="formLabelWidth" prop="generalRoleId">
                        <el-select v-model="editRole.generalRoleId" clearable placeholder="请选择" style="width:100%;">
                            <el-option v-for="item in systemAuthRoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="quit">取 消</el-button>
                    <el-button type="primary" @click="editReserve">保 存</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 封禁理由弹窗 -->
        <div class="p-form">
            <el-dialog title="封禁理由" :visible.sync="dialogClosureVisible" @close="cancelBtn">
                <el-form :model="closureUser" :rules="rule2" ref="closureUser">
                    <el-form-item prop="rejection" label="封禁理由">
                        <el-input class="inputing" v-model="closureUser.rejection" rows='5' type="textarea" placeholder="请输入封禁理由..."></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelBtn">取 消</el-button>
                    <el-button type="primary" @click="closure">保 存</el-button>
                </div>
            </el-dialog>
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
        systemRoleList: function () {
            return this.$store.state.system.systemRoleList;
        },
        systemAuthRoleList: function () {
            return this.$store.state.system.systemAuthRoleList;
        },
        systemAddRoleInfo: function () {
            return this.$store.state.system.systemAddRoleInfo;
        },
        systemForbidden: function () {
            return this.$store.state.system.systemForbidden;
        },
        systemUpdateRole: function () {
            return this.$store.state.system.systemUpdateRole;
        },
    },
    mounted() {
        this.param = {
            name: this.search_value,
            pageNo: 1,
            pageSize: 10
        }
        this.$store.dispatch('system_roleList', this.param);
        this.$store.dispatch('system_authRoleList');
    },
    data() {
        return {
            search_value: '',
            dialogUserVisible: false,
            dialogClosureVisible: false,
            dialogEditRole: false,
            formLabelWidth: '100px',
            addRole: {
                name: '',
                generalRoleId: '',
            },
            editRole: {
                name: '',
                generalRoleId: '',
            },
            closureUser: {
                rejection: '',
                id: '',
            },
            rule: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                generalRoleId: [
                    { required: true, message: '请选择泛角色', trigger: 'blur' }
                ]
            },
            rule2: {
                rejection: [
                    { required: true, message: '请填写封禁理由', trigger: 'blur' }
                ]
            },
            editRule: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                generalRoleId: [
                    { required: true, message: '请选择泛角色', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        //新增的取消
        cancel() {
            this.$refs['addRole'].resetFields();
            this.addRole = {
                name: '',
                generalRoleId: '',
            };
            this.$store.dispatch('system_roleList', this.param);
            this.dialogUserVisible = false;
        },
        //编辑的取消
        quit() {
            this.$refs['editRole'].resetFields();
            this.editRole = {
                name: '',
                generalRoleId: '',
            };
            this.$store.dispatch('system_roleList', this.param);
            this.dialogEditRole = false;
        },
        //封禁的取消
        cancelBtn() {
            this.$refs['closureUser'].resetFields();
            this.closureUser = {
                rejection: '',
                id: '',
            };
            this.$store.dispatch('system_roleList', this.param);
            this.dialogClosureVisible = false;
        },
        // 搜索
        handleIconClick() {
            this.param.name = this.search_value;
            this.param.pageNo = 1;
            this.$store.dispatch('system_roleList', this.param);
        },
        // 分页
        handleSizeChange(size) {
            this.param.pageSize = size;
            this.param.pageNo = 1;
            this.$store.dispatch('system_roleList', this.param);
        },
        handleCurrentChange(page) {
            this.param.pageNo = page;
            this.$store.dispatch('system_roleList', this.param);
        },
        // 添加角色
        client() {
            this.$refs['addRole'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('system_addRoleInfo', this.addRole).then(() => {
                        if (this.systemAddRoleInfo.success) {
                            this.$message({
                                message: '添加角色成功！',
                                type: 'success'
                            });
                            this.$store.dispatch('system_roleList', this.param);
                            this.dialogUserVisible = false;
                        } else {
                            this.$message('添加失败,已存在此角色！');
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 点击编辑角色
        getData(data) {
            if (data.generalRole) {
                this.editRole.generalRoleId = data.generalRole.id;
            } else {
                this.editRole.generalRoleId = '';
            }
            this.editRole.name = data.name;
            this.editRole.id = data.id;
            this.dialogEditRole = true;
        },
        // 保存编辑角色
        editReserve() {
            this.$refs['editRole'].validate((valid) => {
                if (valid) {
                    if (this.editRole.id) {
                        this.$store.dispatch('system_updateRole', this.editRole).then(() => {
                            if (this.systemUpdateRole.success) {
                                this.$message({
                                    message: '编辑角色成功！',
                                    type: 'success'
                                });
                                this.$store.dispatch('system_roleList', this.param);
                                this.dialogEditRole = false;
                            } else {
                                this.$message('编辑失败');
                            }
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        // 激活/禁用角色
        openClosure(row) {
            this.closureUser.id = row.id;
            if (row.status == 1) {
                this.closureUser.status = 2;
                this.dialogClosureVisible = true;
            } else {
                this.closureUser.status = 1;
                this.$store.dispatch('system_forbidden', this.closureUser).then(() => {
                    if (this.systemForbidden) {
                        this.$message({
                            message: '激活成功！',
                            type: 'success'
                        });
                        this.$store.dispatch('system_roleList', this.param);
                    } else {
                        this.$message('激活失败');
                    }
                });
            }

        },
        closure() {
            this.$refs['closureUser'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('system_forbidden', this.closureUser).then(() => {
                        if (this.systemForbidden.success) {
                            this.$message({
                                message: '您已成功提交封禁理由！',
                                type: 'success'
                            });
                            this.$store.dispatch('system_roleList', this.param);
                            this.dialogClosureVisible = false;
                        } else {
                            this.$message('封禁失败');
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

    },
}
</script>
