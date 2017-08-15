<style scoped>
.bigger-image{
    width:800px;
}
</style>
<template>
    <div class='imageViewDialog'>
        <el-dailog  title="图片查看" size="full" :visible.sync="imageView">
            <img class="bigger-image" :src="image" v-if="!!image" alt="">
        </el-dailog>
    </div>
</template>
<script>
export default {
    name: 'name',
    data () {
        return {
            imageView:false
        }
    },
    props: {
        image:{
            required:false,
            default:''
        }
    },
    watch: {
        image:function(){
            if(!!image){
                this.imageView=true;
            }
        }
    }

}
</script>

