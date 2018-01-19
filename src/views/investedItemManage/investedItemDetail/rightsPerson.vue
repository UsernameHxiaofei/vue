<style scoped>
    #rightsPerson {
        width: 715px;
        min-height: 100px;
    }

    .enterprisePerson {
        margin: 30px auto 10px 0;
        padding-right: 10px;
        background-color: rgb(246, 246, 246);
        width: 710px;
        height: 140px;
    }

    .enterprisePerson img {
        float: left;
        border: none;
        border-radius: 50%;
        width: 140px;
        height: 140px;
    }

    .personName {
        width: 250px;
        display: inline-block;
        font-size: 14px;
        color: #06ccb6;
        margin: 20px 20px 0px 10px;
    }

    .edit-button-block {
        height: 40px;
        margin: 10px 20px 5px auto;
    }

    .editEnterprisePerson {
        margin-bottom: 20px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        border: 1px solid #06ccb7;
    }

    .basic-info {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: stretch;
        height: 180px;
    }
</style>
<template>
    <div id='rightsPerson'>
        <el-row>
            <el-col>
                <div class="edit-button-block">
                    <el-button style="float:left" @click="addRightsPerson" type="text">添加权益人</el-button>
                </div>
                <div v-for="(item,index) in projectRightsList.resutl" :key="index" class="enterprisePerson">
                    <img :src="item.actor.headUrl" alt="">
                    <span class="personName">姓名：{{item.rights&&item.rights.actorName}}</span>
                    <span class="personName">责任角色：{{item.rights&&item.rights.projectRole|projectRole}}</span>
                    <span class="personName">手机号：{{item.actor&&item.actor.mobileNumber}}</span>
                    <span class="personName">身份证号：{{item.actor&&item.actor.identNumber}}</span>
                    <span class="personName">权益占比：{{item.rights&&item.rights.rightsRatio*100+'%'}}</span>
                    <el-button size="small" @click="updatePerson(item)">编辑</el-button>
                    <el-button size="small" @click="deletePerson(item)">删除</el-button>
                </div>
                <div class="p-form">
                    <el-dialog title="头像修改" :visible.sync="editHeadImgChange" :close-on-click-modal="false">
                        <imageCropper @result="successUploadHeadImgURL"></imageCropper>
                    </el-dialog>
                </div>

                <div class="p-form">
                    <el-dialog title="权益人添加" :visible.sync="editformChange" :close-on-click-modal="false">
                        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                            <el-form-item label="创建方式">
                                <el-radio-group v-model.number="form.type">
                                    <el-radio :label="1">选择</el-radio>
                                    <el-radio :label="2">新建</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="责任角色" required>
                                <el-radio-group v-model.number="form.projectRole">
                                    <el-radio v-for="item in projectRoles" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-if="form.type==2" label="头像" prop="imgUrl">
                                <img style="width:100px" v-if="form.imgUrl" :src="form.imgUrl" alt="">
                                <el-button type="primary" @click="editHeadImgChange=true" size="small">上传头像</el-button>
                            </el-form-item>
                            <el-form-item v-if="form.type==2" label="姓名" prop="name">
                                <el-input v-model="form.name" placeholder="请输入姓名">
                                </el-input>
                            </el-form-item>
                            <el-form-item v-if="form.type==2" label="手机号" prop="mobileNo">
                                <el-input v-model="form.mobileNo" placeholder="请输入手机号">
                                </el-input>
                            </el-form-item>
                            <el-form-item v-if="form.type==2" label="身份证号" prop="cardNo">
                                <el-input v-model="form.cardNo" placeholder="请输入身份证号">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="权益占比" prop="rightsRatio">
                                <el-input v-model.number="form.rightsRatio" placeholder="权益占比">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <div class="search-box" v-show="form.type==1" style="margin:0px 1px 30px 30px;float:left">
                                <div class="output">
                                    <el-input placeholder="姓名 | 手机号 | 身份证" icon="search" v-model="customerKeyword" @keyup.enter.native="customerKeywordChange"
                                        :on-icon-click="customerKeywordChange">
                                    </el-input>
                                </div>
                            </div>
                            <div class="my-table" v-show="form.type==1">
                                <el-table :data="customerList.list" stripe border style="width: 100%">
                                    <el-table-column>
                                        <template slot-scope="scope">
                                            <el-button class="btn-style" @click="selectCustomer(scope.row)">选择</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="姓名">
                                    </el-table-column>
                                    <el-table-column prop="mobileNumber" label="手机号" width="115px">
                                    </el-table-column>
                                    <el-table-column prop="identNumber" label="身份证号" width="155px">
                                    </el-table-column>
                                    <el-table-column prop="createTime" label="注册时间" width="160px">
                                    </el-table-column>
                                    <el-table-column prop="status" label="状态">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.status ? "正常" : "无效"}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="audit" label="认证" width="140px">
                                        <template slot-scope="scope">
                                            <span class="btn-small" :class="scope.row.projectParty==1 ? active : ''">项</span>
                                            <span class="btn-small" :class="scope.row.expert==2 ? active : ''">行</span>
                                            <span class="btn-small" :class="scope.row.leadInvestor==2 ? active : ''">领</span>
                                            <span class="btn-small" :class="scope.row.investor==1 ? active : ''">投</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div style="margin:10px 10px 30px 10px;" v-show="form.type==1">
                                <pagination :total="customerList.totalRecords" @size-change="handleCustomerSizeChange" @current-change="handleCustomerCurrentChange"></pagination>
                            </div>

                        </el-form>
                        <div slot="footer" v-show="form.type==2" class="dialog-footer">
                            <el-button @click="editformChange = false">取 消</el-button>
                            <el-button type="primary" @click="submitForm">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <div class="p-form">
                    <el-dialog title="权益人编辑" :visible.sync="editPersonformChange" :close-on-click-modal="false">
                        <el-form ref="editPerson" :model="editPerson" :rules="rules" label-width="100px">
                            <el-form-item label="姓名">
                                {{editPersonInfo.actor&&editPersonInfo.actor.name}}
                            </el-form-item>
                            <el-form-item label="手机号">
                                {{editPersonInfo.actor&&editPersonInfo.actor.mobileNumber}}
                            </el-form-item>
                            <el-form-item label="身份证号">
                                {{editPersonInfo.actor&&editPersonInfo.actor.identNumber}}
                            </el-form-item>
                            <el-form-item label="责任角色" required>
                                <el-radio-group v-model.number="editPerson.projectRole">
                                    <el-radio v-for="item in projectRoles" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="权益占比" prop="rightsRatio">
                                <el-input v-model.number="editPerson.rightsRatio" placeholder="权益占比">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="editPersonformChange = false">取 消</el-button>
                            <el-button type="primary" @click="savePerson">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import projectRoles from '../../../constant/projectRoles'
    import imageCropper from '../../../components/common/cropper'
    import pagination from '../../../components/common/pagination'
    export default {
        name: 'rightsPerson',
        computed: {
            customerList: function () {
                return this.$store.state.item.customerList || {}
            },
            projectRightsList: function () {
                return this.$store.state.investedItem.projectRightsList || {}
            },
            projectId: function () {
                return this.$route.params.id
            },
            investedItemDetail: function () {
                return this.$store.state.investedItem.project || {}
            }
        },
        components: {
            pagination,
            imageCropper
        },
        mounted() {



            this.$store.dispatch('ProjectRightsInfoGets', { projectId: this.projectId })
        },
        data() {
            return {
                projectRoles,
                editPersonformChange: false,
                editformChange: false,
                editHeadImgChange: false,
                editPerson: {
                    projectId: this.projectId,
                    rightsRatio: 0,
                    projectRole: 1
                },
                editPersonInfo: {},
                active: 'border-orange',
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    cardNo: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' },
                    ],
                    mobileNo: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    rightsRatio: [
                        { required: true, min: 0, type: 'number', message: '请输入权益占比', trigger: 'blur' },
                    ],
                    imgUrl: [
                        { required: true, message: '请上传头像', trigger: 'change' },
                    ],
                },
                customerKeyword: '',
                customerParam: {
                    keyword: '',
                    category: 5,
                    certifi: 'C',
                    pageNo: 1,
                    pageSize: 10
                },
                form: {
                    type: 1,
                    name: '',
                    imgUrl: '',
                    cardNo: '',
                    mobileNo: '',
                    projectId: this.projectId,
                    rightsRatio: 0,
                    projectRole: 1,
                    actorId: '',
                }
            }
        },
        methods: {
            addRightsPerson() {
                this.editformChange = true
                this.$store.dispatch('item_getCustomerList', this.customerParam)
            },
            selectCustomer(item) {
                this.form.projectId = this.projectId
                this.form.actorId = item.actorId
                this.form.rightsRatio = this.form.rightsRatio / 100
                this.$store.dispatch('addProjectRightsInfoExestis', this.form).then((data) => {
                    if (data.flag) {
                        this.$message.success('添加成功')
                        this.editformChange = false
                        this.$store.dispatch('ProjectRightsInfoGets', { projectId: this.projectId })
                        this.$refs['form'].resetFields()
                    } else {
                        this.$message.warning(data.message)
                    }
                })
            },
            customerKeywordChange() {
                this.customerParam.keyword = this.customerKeyword
                this.customerParam.pageNo = 1
                this.$store.dispatch('item_getCustomerList', this.customerParam)
            },
            handleCustomerCurrentChange(val) {
                this.customerParam.pageNo = val
                this.$store.dispatch('item_getCustomerList', this.customerParam)
            },
            handleCustomerSizeChange(val) {
                this.customerParam.pageNo = 1
                this.customerParam.pageSize = val
                this.$store.dispatch('item_getCustomerList', this.customerParam)
            },
            successUploadHeadImgURL(data) {
                if (data) {
                    this.form.imgUrl = data
                    this.editHeadImgChange = false
                }
            },
            updatePerson(item) {
                this.editPersonformChange = true
                this.editPerson = Object.assign({},item.rights)
                this.editPerson.rightsRatio = this.editPerson.rightsRatio * 100
                this.editPersonInfo = item
            },
            savePerson() {
                this.editPerson.rightsRatio = this.editPerson.rightsRatio / 100
                this.editPerson.projectId = this.projectId
                this.$store.dispatch('ProjectRightsInfoUpdate', this.editPerson).then((data) => {
                    if (data.flag) {
                        this.$message.success('修改成功')
                        this.editPersonformChange = false
                        this.$store.dispatch('ProjectRightsInfoGets', { projectId: this.projectId })
                    } else {
                        this.$message.warning(data.message)
                    }
                })
            },
            deletePerson(item) {
                this.$confirm('该操作将彻底删除该权益人，请确认是否删除', '删除权益人', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$store.dispatch('ProjectRightsInfoDelete', { id: item.rights.id }).then((data) => {
                        if (data.flag) {
                            this.$message.success('删除成功')
                            this.$store.dispatch('ProjectRightsInfoGets', { projectId: this.projectId })
                        } else {
                            this.$message.warning(data.message)
                        }
                    })
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消操作' })
                })

            },
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.form.projectId = this.projectId
                        this.form.rightsRatio = this.form.rightsRatio / 100
                        this.$store.dispatch('addProjectRightsInfo', this.form).then((data) => {
                            if (data.flag) {
                                this.$message.success('添加成功')
                                this.editformChange = false
                                this.$refs['form'].resetFields()
                                this.$store.dispatch('ProjectRightsInfoGets', { projectId: this.projectId })
                            } else {
                                this.$message.warning(data.message)
                            }
                        })
                    }
                })

            }
        }
    }
</script>