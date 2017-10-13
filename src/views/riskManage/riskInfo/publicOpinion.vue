<style scoped>
    #publicOpinion {
        margin: 0 auto;
        padding-top: 30px;
        width: 90%;
        min-width: 890px;
    }

    #publicOpinion .businessTitle {
        height: 30px;
        font-size: 18px;
        font-weight: bold
    }

    #publicOpinion .businessTitle img {
        text-indent: 20px;
        margin-right: 5px;
    }

    #publicOpinion .tableInfo {
        width: 100%;
        border: 1px solid gray;
        margin: 10px auto 20px 0;
    }

    #publicOpinion .tableInfo td {
        border: 1px solid #bfbfbf;
        line-height: 30px;
        text-indent: 5px;
    }
    #publicOpinion .itemText{
        width:100px;
        text-align: center;
    }
</style>
<template>
    <div id='publicOpinion'>
        <div>
            <el-col class="businessTitle">
                <img src="../../../assets/images/linear.png" />
                <span>核心团队成员相关舆情</span>
            </el-col>
            <el-col class="businessinfo-content">
                <table class="tableInfo">
                    <tr>
                        <td class="itemText">序号</td>
                        <td>12544GL</td>
                        <td class="itemText">发布日期</td>
                        <td>2016-09-01</td>
                        <td class="itemText">相关成员</td>
                        <td>丁希刚</td>
                    </tr>
                    <tr>
                        <td class="itemText">信息来源</td>
                        <td colspan="5">舆情公示</td>
                    </tr>
                    <tr>
                        <td class="itemText">链接</td>
                        <td colspan="3">无</td>
                        <td class="itemText">快照</td>
                        <td>无</td>
                    </tr>
                    <tr>
                        <td class="itemText">内容</td>
                        <td colspan="6"></td>
                    </tr>
                </table>
            </el-col>
        </div>
        <div>
            <el-col class="businessTitle">
                <img src="../../../assets/images/linear.png" />
                <span>企业相关舆情</span>
            </el-col>
            <el-col class="businessinfo-content">
                <table class="tableInfo">
                    <tr>
                        <td class="itemText">序号</td>
                        <td>95882773EN</td>
                        <td class="itemText">发布日期</td>
                        <td colspan="3">2016-09-01</td>
                    </tr>
                    <tr>
                        <td class="itemText">信息来源</td>
                        <td colspan="5">舆情公示</td>
                    </tr>
                    <tr>
                        <td class="itemText">链接</td>
                        <td colspan="3">无</td>
                        <td class="itemText">快照</td>
                        <td>无</td>
                    </tr>
                    <tr>
                        <td class="itemText">内容</td>
                        <td colspan="6">无</td>
                    </tr>
                </table>
            </el-col>
        </div>
       

    </div>
</template>

<script>
    export default {
        name: 'publicOpinion',
        data() {
            return {

            }
        }

    }
</script>