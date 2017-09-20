<style>
        /*有限合伙信息*/
    
        .partner-box {
            width: 80%;
            min-width: 500px;
            margin: 0 auto;
            padding: 30px 0;
            overflow: hidden;
        }
    
        .partner-time {
            margin: 0 40px 0 0;
            float: left;
            width: 100%;
        }
    
        .partner-time li {
            color: #333333;
            margin-top: 5px;
            font-size: 14px;
            line-height: 30px;
        }
    
        .partner-time li span {
            display: inline-block;
            width: 125px;
            font-weight: bold;
            margin-right: 20px;
            color: black;
            text-align: right;
        }
    
        .bianji {
            float: right;
            margin-right: 45%;
        }
    </style>
    <template>
        <div class="eleventh">
            <!--聚合支付商户信息-->
            <div class="partner-box">
                <ul class="partner-time">
                    <li><span>商户编号</span>{{merchant.customer_num}}</li>
                    <li><span>商户简称</span>{{merchant.short_name}}</li>
                    <li><span>店铺编号</span>{{merchant.shop_num}}</li>
                    <li><span>店铺名称</span>{{merchant.shop_name}}</li>
                    <li><span>机具号</span>{{merchant.machine_num}}</li>
                </ul>
                <el-button class="bianji" type="success" @click="edit">编辑</el-button>
            </div>
            <el-dialog :title="'编辑聚合支付商户信息'" :visible.sync="dialogFormVisible">
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
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </template>
    <script>
        export default {
            name: 'merchant',
            data() {
                return {
                    dialogFormVisible: false,
                    merchantForm: {
                        projectId:'',
                        customer_num: '',
                        short_name: '',
                        shop_num: '',
                        shop_name: '',
                        machine_num: ''
                    },
                    merchantFormRules: {
                        customer_num: [{ required: true, message: '请输入商户编号', trigger: 'blur' }]
                    }
                }
            },
            methods: {
                edit(){
                    this.dialogFormVisible = true;
                    this.merchantForm=JSON.parse(JSON.stringify(this.merchant));
                },
                submitForm() {
                    this.$refs['merchantForm'].validate((valid) => {
                        if (valid) {
                            this.$store.dispatch('item_editMerchant',{param:this.merchantForm,vue:this});
                            this.dialogFormVisible = false;
                            this.$refs['merchantForm'].resetFields();
                        } else {
                            return false;
                        }
                    });
                }
            },
            computed: {
                merchant: function () {
                    return this.$store.state.item.merchant || {};
                }
            }
        }
    
    </script>