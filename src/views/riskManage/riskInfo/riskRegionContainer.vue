<template>
    <div id='riskRegionContain'>
        <div class="back-button"><el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button></div>
        <industryTab class="riskRegionContain" v-if="category=='3'" ></industryTab>
        <riskTab class="riskRegionContain" v-if="category=='4'" ></riskTab>
        <enterpriseTeam class="riskRegionContain" v-if="category=='7'"></enterpriseTeam>
    </div>
</template>

<script>
import industryTab from '../../itemManage/itemDetail/industryTab'
import riskTab from '../../itemManage/itemDetail/riskTab'
import enterpriseTeam from '../../enterpriseManage/enterpriseInfo/enterpriseTeam'
export default {
    name: 'riskRegionContain',
    components: {
       industryTab,
       riskTab,
       enterpriseTeam
    },
    data () {
        return {
            category:0
        }
    },
    beforeMount () {
       this.category=this.$route.params.category;
    },
    methods: {
        back(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.riskRegionContain{
    width:80%;
    margin:50px auto;
}
</style>