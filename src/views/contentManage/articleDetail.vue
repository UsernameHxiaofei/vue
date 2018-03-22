<template>
    <div>
        <div class="back-button">
                <router-link class="pull-left" :to="{path: '/articleManage'}">
                    <el-button type="text" icon="arrow-left">返回上一级</el-button>
                </router-link>
            </div>
    <div class='articleDetail'>
        <h2>文稿信息</h2>
        <el-form ref="form" :model="detail" :rules="rules" label-width="75px">
            <el-form-item label="标题" prop="title" >
                <el-input v-model.trim="detail.title" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="栏目" prop="sectionType" >
                <el-select v-model="detail.sectionType" clearable placeholder="栏目">
                    <el-option v-for="item in sections" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="content" v-if="isRender">
                <quill-editor v-model="detail.content"></quill-editor>
            </el-form-item>
            <el-form-item label="创建时间" v-if="detail.creatTime" >
                {{detail.creatTime}}
            </el-form-item>
            <el-form-item label="更新时间" v-if="detail.lastUpdateTime" >
                {{detail.lastUpdateTime}}
            </el-form-item>
            <el-form-item  label="状态" v-if="detail.statusName">
                {{detail.statusName}}
            </el-form-item>
            <el-form-item label-width="0px">
                <el-button type="primary" @click="createArticle">保存草稿</el-button>
                <el-button type="success" v-if="detail.status!=2" @click="deploy">发表</el-button>
                <el-button type="warning" v-if="detail.status==2" @click="forbidden">屏蔽</el-button>
            </el-form-item>
        </el-form>

    </div>
</div>
</template>

<script>
    import articleStatusData from '../../constant/articleStatus'
    import editor from '../../components/editor/editor.vue'
    export default {
        name: 'articleDetail',
        beforeMount() {
            this.$store.commit('selectDynamicForDetail',{})
            this.refreshData()
        },
        mounted () {
            this.isRender = true
        },
        data() {
            return {
                detail: {
                    id: this.$route.params.id,
                    title: '',
                    sectionType: 1,//1、新闻动态
                    status: 1,//1、草稿2、已发表3、已屏蔽
                    content: '',
                    opreationId: this.$store.state.login.actor.id
                },
                sections: [
                    { value: 1, label: '新闻动态' }
                ],
                articleStatus: articleStatusData,
                isRender: false,
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            createArticle() {
                this.detail.status = 1
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('addDynamic', this.detail).then((data) => {
                            if (data.flag) {
                                Object.assign({},this.detail);
                                this.$message.success('保存完成')
                                this.refreshData()
                            } else {
                                this.$message.warning(data.message)
                            }
                        })
                    }
                })
            },
            deploy() {
                let param = Object.assign({},this.detail);
                param.status=2;
                this.$confirm('发表该文稿将把此文稿变为已发表状态，并开始展示在客户端', '发表确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs['form'].validate((valid) => {
                        if (valid) {
                            this.$store.dispatch('addDynamic', param).then((data) => {
                                if (data.flag) {
                                    this.$message.success('发表成功')
                                    this.refreshData()
                                } else {
                                    this.$message.warning(data.message)
                                }
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
                
            },
            forbidden() {
                this.$confirm('屏蔽该文稿将把此文稿变为已屏蔽状态，并从各客户端展示中移除', '屏蔽确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                    let param = {
                        id: this.$route.params.id||this.detail.id,
                        status: 3
                    }
                    this.$store.dispatch('dynamicUpdate', param).then((data)=>{
                            if (data.flag) {
                                this.$message.success('操作成功')
                                this.detail.status = 3
                            } else {
                                this.$message.warning(data.message)
                            }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            },
            refreshData() {
                if (!this.$route.params.id) {
                    return
                }
                this.$store.dispatch('selectDynamicForDetail', { id: this.$route.params.id }).then(() => {
                    this.detail = this.selectDynamicForDetail.flag ? this.selectDynamicForDetail.resutl :  {
                        id: this.$route.params.id||this.selectDynamicForDetail.resutl.id,
                        title: '',
                        sectionType: 1,//1、新闻动态
                        status: 1,//1、草稿2、已发表3、已屏蔽
                        content: '',
                        opreationId: this.$store.state.login.actor.id
                    }
                })
            },
        },
        computed: {
            selectDynamicForDetail: function () {
                return this.$store.state.content.selectDynamicForDetail || {}
            }
        },
        components: {
            'quill-editor': editor,
        }

    }
</script>

<style scoped>
    .articleDetail {
        padding: 30px 10%;
    }
</style>