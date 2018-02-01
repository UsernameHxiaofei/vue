<style>
    /*项目信息*/

    #investedItem .item-info {
        display: flex;
        flex-flow: row nowrap;
        padding: 30px;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        overflow: hidden;
    }

    #investedItem .com-img {
        float: left;
        margin-right: 20px;
        width: 26%;
        min-width: 300px;
        height: 230px;
    }

    #investedItem .item-con {
        float: left;
        width: 70%;
        align-self: flex-start;
    }

    #investedItem .item-title {
        font-weight: bold;
        font-size: 20px;
        line-height: 40px;
        margin: 0;
    }

    #investedItem .item-summary {
        font-weight: bold;
        font-size: 14px;
        line-height: 40px;
        margin: 5px 0;

    }

    #investedItem .item-channel {
        float: right;
        font-weight: bold;
        line-height: 40px;
        font-size: 16px;
    }

    #investedItem .item-channelMark {
        float: right;
        height: 40px;
    }

    #investedItem .item-list-info .grid-content {
        height: 40px;
        margin-top:10px;
    }

    /*tabber*/

    #investedTab .el-tabs__header {
        background: #fcfcfc;
        padding: 10px 30px 10px 30px;
        margin: 0;
        border-color: #eeeeee;
    }

    #investedTab .el-tabs__item {
        height: 30px;
        line-height: 30px;
        padding: 0 13px;
        background: #e2e6ef;
        color: #a3abbe;
        border-radius: 15px;
        margin-right: 10px;
        font-size: 12px;
    }

    #investedTab .el-tabs__item.is-active {
        color: #06ccb6;
    }

    #investedTab .el-tabs__active-bar {
        display: none!important;
    }

    #investedTab .el-tabs__content {
        margin: 0 auto;
        width: 85%;
    }

</style>

<template>
    <div id="investedItem">
        <!--项目信息-->
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button>
        </div>
        <div class="item-info">
            <img class="com-img" :src="investedItemDetail.imgUrl" alt="项目展示图" />
            <div class="item-con">
                <div class="item-title">{{investedItemDetail.name}}</div>
                <div class="item-summary">{{investedItemDetail.summary}}</div>
                <img class="item-channelMark" v-if="projectChannel.channelMark" :src="projectChannel.channelMark" :title="projectChannel.channelDesc"
                    :alt="projectChannel.channelDesc">
                <!-- <span class="item-channel" v-if="projectChannel.channelMark">引入渠道：{{projectChannel.channelDesc}}</span> -->
                <div class="item-list-info">
                    <el-row class="grid-content">
                        <el-col :span="12">
                            <img src="../../assets/images/local.png" /> {{investedItemDetail.regionCode|address}}
                        </el-col>
                        <el-col :span="12">
                            <img src="../../assets/images/tag.png" /> {{investedItemDetail.industry|industry}}
                        </el-col>
                    </el-row>
                    <el-row class="grid-content">
                        <el-col :span="12">
                            <span>总投资额：{{investedItemDetail.totalInvestAmount|moneyFormat}}万元</span>
                        </el-col>
                        <el-col :span="12">
                            <span>经营主：{{investedItemDetail.orderName}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="grid-content">
                        <el-col :span="12">
                            更新时间：{{investedItemDetail.lastUpdateTime}}
                        </el-col>
                        <el-col :span="12">
                            <span>创建时间：{{investedItemDetail.createTime}}</span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <!--tabber-->
        <div id="investedTab">
            <el-tabs v-model="activeName">
                <el-tab-pane label="权益人信息" name="1">
                    <rightsPerson v-show="activeName=='1'"></rightsPerson>
                    <!-- <expertTab v-show="activeName=='1'"></expertTab> -->
                </el-tab-pane>
                <el-tab-pane label="银账授权信息" name="2">
                    <enterpriseAccount v-if="activeName=='2'" :item="investedItemDetail"></enterpriseAccount>
                </el-tab-pane>
                <el-tab-pane label="收银收单渠道" name="3">
                    <merchant v-if="activeName=='3'" :item="investedItemDetail"></merchant>
                </el-tab-pane>
                <el-tab-pane label="核心团队成员" name="4">
                    <enterpriseTeam  v-if="activeName=='4'" :enterprise='{id:investedItemDetail.enterpriseId}'></enterpriseTeam>
                </el-tab-pane>
                <el-tab-pane label="分红报告" name="5">
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import enterpriseAccount from './investedItemDetail/enterpriseAccount'
    import rightsPerson from './investedItemDetail/rightsPerson'
    import enterpriseTeam from '../../views/enterpriseManage/enterpriseInfo/enterpriseTeam'
    import merchant from '../itemManage/itemDetail/merchant'

    export default {
        name: 'investedItemDetail',
        components: {
            enterpriseTeam,
            rightsPerson,
            enterpriseAccount,
            merchant
        },
        computed: {
            projectChannel: function () {
                return this.$store.state.item.projectChannel || {}
            },
            investedItemDetail: function () {
                return this.$store.state.investedItem.project || {}
            },
            projectId: function () {
                return this.$route.params.id
            },
            projectRightsList: function () {
                return this.$store.state.investedItem.projectRightsList || {}
            }
        },
        beforeMount() {
            let param = { id: this.projectId }
            this.$store.dispatch('item_getProjectChannel', param)
            this.$store.dispatch('AtiProjectInfoGet', param)
        },
        data() {
            return {
                activeName: '1',

            }
        },
        methods: {
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>