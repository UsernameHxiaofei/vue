<template>
    <div id='riskTeam'>
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
        <div style="margin:0 auto; width: 715px;" >
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'riskTeam',
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
#riskTeam{
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
#riskTeam .businessTitle {
        height: 30px;
        font-size: 18px;
        font-weight: bold
    }

    #riskTeam .businessTitle img {
        text-indent: 20px;
        margin-right: 5px;
    }

    #riskTeam .tableInfo {
        width: 100%;
        border: 1px solid gray;
        margin: 10px auto 20px 0;
    }

    #riskTeam .tableInfo td {
        border: 1px solid #bfbfbf;
        line-height: 30px;
        text-indent: 5px;
        text-align:center;
    }

    #riskTeam .itemText {
        width: 100px;
        text-align: center;
    }
</style>