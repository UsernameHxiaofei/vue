<style>
    .merchantTab {
        width: 80%;
        margin: 50px auto;
    }

    .merchantTab .merchantlist {

        width: 100%;
        border: 1px solid #e2e6ef;
    }

    .merchantTab .add-merchant {
        margin: 0 0 20px 0;
    }

    .merchantlist th {
        font-size: 14px;
        line-height: 40px;
        padding: 0 10px;
        border: 1px solid #e2e6ef;
    }

    .merchantlist td {
        border: 1px solid #e2e6ef;
        font-size: 14px;
        line-height: 40px;
        padding: 0 10px;
    }
</style>
<template>
    <div class="merchantTab">
        <!--聚合支付商户信息-->
        <div>
            <el-button class="add-merchant" type="success" @click="add()">增加商户</el-button>
            <table class="merchantlist">
                <tr>
                    <th>商户编号</th>
                    <th>商户简称</th>
                    <th>店铺编号</th>
                    <th>店铺名称</th>
                    <th>机具号</th>
                    <th>交易类型</th>
                    <th>渠道类型</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in merchant">
                    <td>{{item.customer_num}}</td>
                    <td>{{item.short_name}}</td>
                    <td>{{item.shop_num}}</td>
                    <td>{{item.shop_name}}</td>
                    <td>{{item.machine_num}}</td>
                    <td>{{item.tradeType|tradeType}}</td>
                    <td>{{item.channel|channel}}</td>
                    <td class="bianji">
                        <el-button size="small" @click="edit(item)">编辑</el-button>
                        <el-button size="small" @click="deleteItem(item)">删除</el-button>
                    </td>
                </tr>
            </table>
        </div>
        <el-dialog :title="'聚合支付商户信息'" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="merchantForm" ref="merchantForm" :rules="merchantFormRules" :label-width="'200px'" style="width:80%">
                <el-form-item prop="customer_num" label="商户编号">
                    <el-input v-model="merchantForm.customer_num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="short_name" label="商户简称">
                    <el-input v-model="merchantForm.short_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="shop_num" label="店铺编号">
                    <el-input v-model="merchantForm.shop_num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="shop_name" label="店铺名称">
                    <el-input v-model="merchantForm.shop_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="shop_name" label="机具号">
                    <el-input v-model="merchantForm.machine_num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="tradeType" label="交易类型">
                    <el-radio v-for="item in tradeTypeOptions" :key="item.value" v-model.number="merchantForm.tradeType" :label="item.value">{{item.label}}</el-radio>
                </el-form-item>
                <el-form-item prop="channel" label="渠道类型">
                    <el-radio v-for="item in channelOptions" :key="item.value" v-model.number="merchantForm.channel" :label="item.value">{{item.label}}</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import channels from '../../../constant/payChannels'
    import tradeTypes from '../../../constant/tradeTypes'
    export default {
        name: 'merchant',
        beforeMount () {
            this.$store.dispatch('item_getMerchant', { id: this.item.id })
        },
        props: ['item'],
        data() {
            return {
                channelOptions: channels,
                tradeTypeOptions: tradeTypes,
                dialogFormVisible: false,
                addFlag: false,
                merchantForm: {
                    projectId: '',
                    customer_num: '',
                    short_name: '',
                    shop_num: '',
                    shop_name: '',
                    machine_num: '',
                    tradeType: 1
                },
                merchantFormRules: {
                    customer_num: [{ required: true, message: '请输入商户编号', trigger: 'blur' }]
                }
            }
        },
        methods: {
            add() {
                this.dialogFormVisible = true
                this.merchantForm = {
                    projectId: this.item.id,
                    customer_num: '',
                    short_name: '',
                    shop_num: '',
                    shop_name: '',
                    machine_num: '',
                    tradeType: 1,
                    channel: 1,
                }
                this.addFlag = true;
            },

            edit(item) {
                this.dialogFormVisible = true
                this.merchantForm = JSON.parse(JSON.stringify(item))
            },
            submitForm() {
                if (this.addFlag) {
                    this.merchantSubmit()
                } else {
                    this.$refs['merchantForm'].validate((valid) => {
                        if (valid) {
                            this.$store.dispatch('item_editMerchant', { param: this.merchantForm, vue: this })
                            this.dialogFormVisible = false
                            this.$refs['merchantForm'].resetFields()
                        } else {
                            return false
                        }
                    })
                }
                this.addFlag = false
            },
            merchantSubmit() {
                this.$refs['merchantForm'].validate((valid) => {
                    if (valid) {
                        this.merchantForm.projectId = this.item.id
                        this.merchantForm.enterpriseId = this.item.enterpriseId
                        this.$store.dispatch('item_addMerchant', { param: this.merchantForm, vue: this })
                        this.$refs['merchantForm'].resetFields()
                        this.dialogFormVisible = false
                    } else {
                        return false
                    }
                })
            },
            deleteItem(item) {
                this.$confirm('此操作将使商户将失去这个机具号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('item_deleteMerchant', { param: { id: item.id, projectId: item.projectId }, vue: this })
                }).catch(() => {

                })

            }
        },
        computed: {
            merchant: function () {
                return this.$store.state.item.merchant || {}
            }
        }
    }

</script>