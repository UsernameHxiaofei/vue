<template>
    <div id='navbar'>
        <div class="back-button">
            <el-button type="text" icon="arrow-left" @click="back">返回上一级</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    methods: {
        back(){
            this.$router.go(-1)
        }
    }

}
</script>

<style scoped>
.back-button{
    width: 100%;
    height:40px;
    line-height: 40px;
    vertical-align: middle;
    background: #f6f9f8;
}
.back-button button{
    margin-left:20px;
}
</style>