<template>
    <div id='riskRegionContain'>
            <div class="back-button">
                    <el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button>
                </div>
        <industryTab v-if="category=='3'"></industryTab>
        <riskTab v-if="category=='4'"></riskTab>
        <riskTeam style="margin:0 auto" v-if="category=='7'"></riskTeam>
        <publicOpinion v-if="category=='5'"></publicOpinion>
        <scence v-if="category=='6'"></scence>
        <riskFunflow v-if="category=='11'"></riskFunflow>
        <riskFunflowDBL v-if="category=='12'"></riskFunflowDBL>
    </div>
</template>

<script>
    import riskFunflow from './riskFunFlow.vue'
    import riskFunflowDBL from './riskFunFlowDLB.vue'
    import industryTab from '../../itemManage/itemDetail/industryTab'
    import riskTab from '../../itemManage/itemDetail/riskTab'
    import riskTeam from './riskTeam.vue'
    import publicOpinion from './publicOpinion'
    import scence from './scence.vue'
    export default {
        name: 'riskRegionContain',
        components: {
            industryTab,
            riskTab,
            riskTeam,
            publicOpinion,
            scence,
            riskFunflow,
            riskFunflowDBL
        },
        data() {
            return {
                category: 0
            }
        },
        computed: {
            itemManageDetail: function () {
              return this.$store.state.item.itemManageDetail||{};
            }
        },
        beforeMount() {
            this.$store.dispatch('item_getManageDetail',  {id: this.$route.params.projectId}).then(()=>{
                 this.$store.dispatch('enterprise_getInfo',{id:this.itemManageDetail.enterpriseId}).then(()=>{
                    this.category = this.$route.params.category;
                 })
            })
            
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
        margin: 0px auto;
        min-width: 890px;
    }
</style>