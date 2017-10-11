<template>
    <div id='riskRegionContain'>
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button>
        </div>
        <industryTab v-if="category=='3'"></industryTab>
        <riskTab v-if="category=='4'"></riskTab>
        <enterpriseTeam style="margin:0 auto" v-if="category=='7'"></enterpriseTeam>
        <publicOpinion v-if="category=='5'"></publicOpinion>
        <scence v-if="category=='6'"></scence>
        <div style="margin:0 auto; width: 715px;" v-if="category=='7'">
            <div>
                <el-col class="businessTitle">
                    <img src="../../../assets/images/linear.png" />
                    <span>变更记录</span>
                </el-col>
                <el-col class="businessinfo-content">
                    <table class="tableInfo">
                        <tr>
                            <td class="itemText">序号</td>
                            <td class="itemText">变更事项</td>
                            <td class="itemText">变更前内容</td>
                            <td class="itemText">变更后内容</td>
                            <td class="itemText">变更日期</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>变更董事长</td>
                            <td>吕晓俊</td>
                            <td>丁希岗</td>
                            <td>2017-09-28</td>
                        </tr>
                    </table>
                </el-col>
            </div>
            <div>
                <el-col class="businessTitle">
                    <img src="../../../assets/images/linear.png" />
                    <span>公安不良记录</span>
                </el-col>
                <el-col class="businessinfo-content">
                    <table class="tableInfo">
                            <tr>
                                    <td class="itemText">无公安不良记录</td>
                                </tr>
                    </table>
                </el-col>
            </div>
            <div>
                <el-col class="businessTitle">
                    <img src="../../../assets/images/linear.png" />
                    <span>法院涉诉信息</span>
                </el-col>
                <el-col class="businessinfo-content">
                    <table class="tableInfo">
                        <tr>
                            <td class="itemText">无法院涉诉信息</td>
                        </tr>
                    </table>
                </el-col>
            </div>
        </div>
    </div>
</template>

<script>
    import industryTab from '../../itemManage/itemDetail/industryTab'
    import riskTab from '../../itemManage/itemDetail/riskTab'
    import enterpriseTeam from '../../enterpriseManage/enterpriseInfo/enterpriseTeam'
    import publicOpinion from '../../riskManage/riskInfo/publicOpinion'
    import scence from '../../riskManage/riskInfo/scence'
    export default {
        name: 'riskRegionContain',
        components: {
            industryTab,
            riskTab,
            enterpriseTeam,
            publicOpinion,
            scence
        },
        data() {
            return {
                category: 0
            }
        },
        beforeMount() {
            this.category = this.$route.params.category;
        },
        methods: {
            back() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    #riskRegionContain {
        width: 80%;
        margin: 50px auto;
    }

    #riskRegionContain {
        margin: 0 auto;
        padding-top: 30px;
        width: 90%;
        min-width: 890px;
    }

    #riskRegionContain .businessTitle {
        height: 30px;
        font-size: 18px;
        font-weight: bold
    }

    #riskRegionContain .businessTitle img {
        text-indent: 20px;
        margin-right: 5px;
    }

    #riskRegionContain .tableInfo {
        width: 100%;
        border: 1px solid gray;
        margin: 10px auto 20px 0;
    }

    #riskRegionContain .tableInfo td {
        border: 1px solid #bfbfbf;
        line-height: 30px;
        text-indent: 5px;
        text-align:center;
    }

    #riskRegionContain .itemText {
        width: 100px;
        text-align: center;
    }
</style>