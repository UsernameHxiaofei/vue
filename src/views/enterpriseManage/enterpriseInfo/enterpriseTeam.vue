<template>
    <div id='enterpriseTeam'>
        <el-row>
            <el-col>
                <div v-for="item in datalist" class="enterprisePerson" :key="item.id">
                    <img  :src="item.imageURL" alt="">
                    <span class="personName">{{item.name}}</span><br><br>
                    <span class="personTitle">{{item.position}}</span><br><br>
                    <span class="personintro">{{item.profile}}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'enterpriseTeam',
    props: ['enterprise'],
    mounted () {
        this.$store.dispatch('enterprise_getMemberInfo',{id:this.enterpriseInfo.id||(this.enterprise&&this.enterprise.id)});
    },
    computed: {
        datalist:function(){
            return this.$store.state.enterprise.enterpriseMember||{};
        },
        enterpriseInfo:function(){
            return this.$store.state.enterprise.enterpriseInfo||{};
        }
    }
}
</script>

<style scoped>
#enterpriseTeam{
    width:715px;
    min-height:100px;
}
.enterprisePerson {
  margin:40px auto 10px 0;
  padding-right:10px;
  background-color: rgb(246, 246, 246);
  width: 710px;
  height: 180px;
}
.enterprisePerson img{
  float: left;
  margin: -10px 10px 10px -10px;
  width: 140px;
  height: 180px;
}
.personName {
  float: left;
  font-size: 18px;
  color: rgb(51, 51, 51);
  margin: 5px auto 0px 2px;
}
.personTitle{
 margin-top:5px;
 float: left;
 color: #999999;
 font-size:16px;
}
.personintro{
  margin-top:50px;
  font-size: 14px;
  color: rgb(102, 102, 102);
}
</style>