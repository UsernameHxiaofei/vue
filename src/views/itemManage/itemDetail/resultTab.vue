<style>
    /*审核结论*/

    .review {
        width: 80%;
        min-width: 520px;
        margin: 0 auto;
        position: relative;
        padding-bottom: 80px;
    }

    .verdict {
        overflow: hidden;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        padding: 30px 10px 10px 10px;
        border-bottom: 1px solid #EEEEEE;
    }

    .verdict span {
        float: left;
        font-size: 18px;
    }

    .verdict img {
        float: right;
    }

    .review p {
        margin-top: 30px;
        padding: 0 10px;
        margin-bottom: 0;
    }
</style>
<template>
    <div class="eighth">
        <!--审核结论-->
        <div class="review" v-show="resultInfo.phase">
            <div>
                <div class="verdict" v-show="isShowFirst||(resultInfo.phase||0)>=5">
                    <span>初审结论</span>
                    <img :src="isShowFirst?'../../../assets/images/no.png':'../../../assets/images/ok.png'" width="30" height="30" />
                </div>
                <p v-show="isShowFirst">{{resultInfo.rejection}}</p>
            </div>
            <div>
                <div class="verdict" v-show="isShowSecond||(resultInfo.phase||0)>=6">
                    <span>复审结论</span>
                    <img :src="isShowSecond?'../../../assets/images/no.png':'../../../assets/images/ok.png'" width="30" height="30" />
                </div>
                <p v-show="isShowSecond">{{resultInfo.rejection}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import dialogComponent from '../../../components/common/dialog'
export default {
	name: 'resultTab',
	components: {
		dialogComponent
	},
	data() {
		return {
			dialogReviewVisible: false
		}
	},
	computed: {
		itemManageDetail: function () {
			return this.$store.state.item.itemManageDetail || {}
		},
		resultInfo:function(){
			return this.$store.state.item.resultInfo||{}
		},
		isShowFirst:function(){
			return this.resultInfo.rejection&&this.resultInfo.rejection.length>0&&this.resultInfo.phase==4
		},
		isShowSecond:function(){
			return this.resultInfo.rejection&&this.resultInfo.rejection.length>0&&this.resultInfo.phase==5
		}
	}
}

</script>