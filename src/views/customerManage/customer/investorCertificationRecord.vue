<template>
    <div style="width:100%;height: 100%;background: #fff;margin: auto;">
        <!--<div v-if="!investorData" style=" height: 100px;text-align: center; line-height: 100px; font-size: 18px;">
                    				当前无记录
                    			</div>-->
        <!--<div class="hangjiashenhe" v-if="investorData">-->
        <div class="hangjiashenhe">
            <div class="look-btn">
                <el-button type="warning" @click="lookAssessment">{{look?"查看合格投资人认证记录":"查看个人投资者风险承受能力评估问卷"}}</el-button>
            </div>
            <assessment v-if="look"></assessment>
            <ul v-if="!look">
                <li>
                    <label>手机号</label>
                    <span>{{investorData.tel}}</span>
                </li>
                <li>
                    <label>真实姓名</label>
                    <span>{{investorData.realName}}</span>
                </li>
                <li>
                    <label>身份证号</label>
                    <span>{{investorData.identNumber}}</span>
                </li>
                <li>
                    <label>关注行业</label>
                    <span class="zhuanzhuhangye">
                        <span>{{investorData.industry|industry}}</span>
                    </span>
                </li>
                <li>
                    <label>所属单位</label>
                    <span>{{investorData.organization}}</span>
                </li>
                <li>
                    <label>职位</label>
                    <span>{{investorData.position}}</span>
                </li>
                <li>
                    <label>籍贯</label>
                    <span>{{investorData.birthplace|address}}</span>
                </li>
                <li>
                    <label>常驻地区</label>
                    <span>{{investorData.usualPlace|address}}</span>
                </li>
                <li>
                    <label>个人情况</label>
                    <span class="zhuanzhuhangye">
                         <span>{{investorData.industryLevel|industryLevelforInvestor}}</span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import assessment from './assessment.vue'
export default {
    components: {
        assessment,
    },
    computed: {
        investorData: function () {
            if (!this.$store.state.customer.investorData) {
                return {
                    tel: '',
                    realName: '',
                    industryLevel: '',
                    usualPlace: '',
                    regionCode: '',
                    organization: '',
                    position: '',
                    industry: '',
                    identNumber: '',
                }
            } else {
                return this.$store.state.customer.investorData;

            }
        },
    },
    data() {
        return {
            look: false
        }
    },
    beforeMount() {
        this.investorInit();
    },
    methods: {
        investorInit() {
            let param = {
                id: this.$route.params.actorId,
            }
            this.$store.dispatch('investorByActorId', param)
        },
        lookAssessment() {
            this.look = !this.look;
        }

    },
    // this.$on('id-selected', function (id) {
    //     // ...
    // })
}
</script>
<style scoped>
body {
    background-color: #fcfcfc;
}

.content {
    background-color: #fcfcfc;
}

.hangjiashenhe {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
    font-size: 14px;
}

.look-btn {
    overflow: hidden;
}

.look-btn button {
    float: right;
    margin-top: 20px;
}

.hangjiashenhe ul {
    margin-left: 100px;
    padding-top: 16px;
}

.hangjiashenhe li {
    margin-top: 10px;
}

.hangjiashenhe label {
    display: inline-block;
    width: 100px;
    font-weight: 400;
    color: #999;
    text-align: right;
    margin-right: 20px;
}

.hangjiashenhe li>span {
    display: inline-block;
    width: 300px;
    color: #333;
}

.hangjiashenhe .zhuanzhuhangye {
    padding: 10px;
    border: 1px solid #ccc;
}

.zhuanzhuhangye span {
    display: inline-block;
    font-size: 13px;
    margin-right: 10px;
}

.hangjiashenhe .btn-box-c {
    padding: 15px;
    text-align: center
}
</style>

<style>

</style>
