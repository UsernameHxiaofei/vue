<style >
#assessment .questions{
    margin: 15px 0;
}
#assessment .assAdvice{
    color:#06ccb7;
    font-size: 18px;
    font-weight: bold;
    margin: 30px 0 30px 0;
}
#assessment  .assAdvice .el-tag--success{
    font-size: 18px;
    font-weight: bold;
    background: white;
    color:#333333;
    padding: 0 8px;
    margin-right: 5px;
}
#assessment .aboutAss{
     color:#06ccb7;
     font-size: 18px;
     width: 91.66666666666667%;
     font-weight: bold;
     text-align: center;
}
#assessment .asseType{
    border:2px solid #06ccb7;
    padding:20px!important;
    margin:30px 20px 0 0;
    height:230px;
}
#assessment .asseType h3{
    text-align: center;
    margin:25px 0;
    font-size: 18px;
    font-weight: bold
}
#assessment .asseType p{
    color:#666666;
    
}
#assessment .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #06ccb7;
    border-color: #06ccb7;
}
#assessment .el-radio__input.is-disabled+.el-radio__label {
    color: rgb(31, 61, 61);;
    cursor: not-allowed;
}
#assessment .valine .el-radio {
    color: rgb(31, 61, 61);
    cursor: pointer;
    white-space: nowrap;
    display: block;
    
    user-select: none;
}
#assessment .el-radio__input.is-disabled .el-radio__inner {
    /* background-color: rgb(238, 246, 246); */
    border-color: rgb(209, 229, 229);
    cursor: not-allowed;
}
#assessment .valine .el-radio+.el-radio {
    margin-left: 0px;
}
</style>
<template>
    <div id="assessment" style="width:100%;height: 100%;background: #fff;margin: auto;">
        <el-row>
            <el-col>
                <div id="radio-select">
                    <p class="questions">1.请问您的年龄处于：</p>
                    <el-radio-group  v-model="answers[0]" >
                        <el-radio disabled :label="'A'">30岁以下</el-radio>
                        <el-radio disabled :label="'B'">31-40岁</el-radio>
                        <el-radio disabled :label="'C'">41-50岁</el-radio>
                        <el-radio disabled :label="'D'">51-60岁</el-radio>
                        <el-radio disabled :label="'E'">60岁以上</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">2.您家庭预计进行股权类投资的资金占家庭现有总资产(不含自住、自用房产及汽车等固定资产)的比例是：</p>
                    <el-radio-group v-model="answers[1]" >
                        <el-radio disabled :label="'A'">70%以上</el-radio>
                        <el-radio disabled :label="'B'">50%-70%</el-radio>
                        <el-radio disabled :label="'C'">30%－50%</el-radio>
                        <el-radio disabled :label="'D'">10%－30%</el-radio>
                        <el-radio disabled :label="'E'">10%以下</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">3.进行一项重大投资后，您通常会觉得：</p>
                    <el-radio-group v-model="answers[2]" >
                        <el-radio disabled :label="'A'">很高兴，对自己的决定很有信心</el-radio>
                        <el-radio disabled :label="'B'">轻松，基本持乐观态度</el-radio>
                        <el-radio disabled :label="'C'">基本没什么影响</el-radio>
                        <el-radio disabled :label="'D'">比较担心投资结果</el-radio>
                        <el-radio disabled :label="'E'">非常担心投资结果</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">4.如果您需要把大量现金整天携带在身的话，您是否会感到：</p>
                    <el-radio-group v-model="answers[3]" >
                        <el-radio disabled :label="'A'">非常焦虑</el-radio>
                        <el-radio disabled :label="'B'">有点焦虑</el-radio>
                        <el-radio disabled :label="'C'">完全不会焦虑</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">5.当您独自到外地游玩，遇到三岔路口，您会选择：</p>
                    <el-radio-group v-model="answers[4]" >
                        <el-radio disabled :label="'A'">仔细研究地图和路标</el-radio>
                        <el-radio disabled :label="'B'">找别人问路</el-radio>
                        <el-radio disabled :label="'C'">大致判断一下方向</el-radio>
                        <el-radio disabled :label="'D'">也许会用掷骰子的方式来做决定</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">6.作为理财资产配置的手段之一，在股权投资上，您每年预算的可投资金是多少？</p>
                    <el-radio-group v-model="answers[5]" >
                        <el-radio disabled :label="'A'">5万以内</el-radio>
                        <el-radio disabled :label="'B'">5-20万</el-radio>
                        <el-radio disabled :label="'C'">20万-50万</el-radio>
                        <el-radio disabled :label="'D'">50万以上</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">7.您认为自己能承受的最大投资损失是多少？</p>
                    <el-radio-group v-model="answers[6]" >
                        <el-radio disabled :label="'A'">10%以内</el-radio>
                        <el-radio disabled :label="'B'">10%（含）-30%</el-radio>
                        <el-radio disabled :label="'C'">30%（含）-50%</el-radio>
                        <el-radio disabled :label="'D'">50%（含）以上</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">8.您有多少年投资基金、股票、信托、私募证券、金融衍生产品、股权投资等风险投资品的经验？</p>
                    <el-radio-group v-model="answers[7]" >
                        <el-radio disabled :label="'A'">没有经验</el-radio>
                        <el-radio disabled :label="'B'">少于2年</el-radio>
                        <el-radio disabled :label="'C'">2年（含）至5年</el-radio>
                        <el-radio disabled :label="'D'">5年（含）以上</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">9.当您进行投资时，您的首要目标是：</p>
                    <el-radio-group class="valine" v-model="answers[8]" >
                        <el-radio disabled :label="'A'">资产保值，我不愿意承担任何投资风险</el-radio>
                        <el-radio disabled :label="'B'">尽可能保证本金安全，不在乎收益率比较低</el-radio>
                        <el-radio disabled :label="'C'">产生较多的收益，可以承担一定的投资风险</el-radio>
                        <el-radio disabled :label="'D'">实现资产大幅增长，愿意承担很大的投资风险</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">10.您的投资经验可以被概括为：</p>
                    <el-radio-group class="valine" v-model="answers[9]" >
                        <el-radio disabled :label="'A'">有限：除银行活期账户和定期存款外，我基本没有其他投资经验</el-radio>
                        <el-radio disabled :label="'B'">一般：除银行活期账户和定期存款外，我购买过基金、保险等理财产品，但还需要进一步的指导</el-radio>
                        <el-radio disabled :label="'C'">丰富：我是一位有经验的投资者，参与过股票、基金等产品的交易，并倾向于自己做出投资决策</el-radio>
                        <el-radio disabled :label="'D'">非常丰富：我是一位非常有经验的投资者，参与过权证、期货或创业板、公司股权类等高风险产品的交易</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">11.您是否了解股权类投资市场的相关知识：</p>
                    <el-radio-group class="valine" v-model="answers[10]" >
                        <el-radio disabled :label="'A'">从来没有参与过股权类交易，对投资知识完全不了解</el-radio>
                        <el-radio disabled :label="'B'">学习过股权类投资知识，但没有实际操作经验，不懂投资技巧</el-radio>
                        <el-radio disabled :label="'C'">了解股权类市场的投资知识，并且有过实际操作经验，懂得一些投资技巧</el-radio>
                        <el-radio disabled :label="'D'">参与过多年的股权类交易，投资知识丰富，具有一定的专业水平</el-radio>
                    </el-radio-group>
                </div>
                <div id="radio-select">
                    <p class="questions">12.您用于股权类投资的资金不会用作其它用途的时间段为：</p>
                    <el-radio-group v-model="answers[11]" >
                        <el-radio disabled :label="'A'">短期——0到1年</el-radio>
                        <el-radio disabled :label="'B'">中期——1到5年</el-radio>
                        <el-radio disabled :label="'C'">长期——5年以上</el-radio>
                    </el-radio-group>
                </div>
            </el-col>
            <el-col>
                
            </el-col>
        </el-row>
        <div class="assAdvice">评估意见：您的风险承受能力评级属于：<el-tag type="success">{{grade.lable||''}}</el-tag>型</div>
        <p class="aboutAss">关于不同风险承受能力类型的说明</p>
        <el-row style="margin-bottom:30px;">
            <div v-for="item in result">
                <el-col :span="11" class="asseType">
                    <h3>{{item.lable}}</h3>
                    <p>{{item.discription}}</p>
                </el-col>
            </div>
        </el-row>
    </div>
</template>
<script>
export default {
    computed: {

    },
    name:'assessment',
    data() {
        return {
            result:[
                {level:'A',lable:'保守型',discription:'此类投资者对于投资产品的任何下跌都不愿意接受，甚至不能承受极小的资产波动，属于风险厌恶型的投资者，首要目的是保持投资的稳定性与资产的保值，这类投资者需要注意为达到上述目标回报率可能很低，以换取本金免于受损和较高的流动性。'},
                {level:'B',lable:'相对保守型',discription:'此类投资者不愿意接受暂时的投资损失，关注本金的安全，往往是稍微有些风险厌恶型的投资者，首要投资目标是资产一定程度的增值，为了获得一定的收益能承受少许本金损失和波动，此类投资者可以承受少许的资产波动和本金损失风险。'},
                {level:'C',lable:'稳健型',discription:'此类投资者愿意承担一定程度的风险，主要强调投资风险和资产增值之间的平衡，为了获得一定收益可以承受投资产品价格的波动，甚至可以承受一段时间内投资产品价格的下跌，此类投资者可以承受一定程度的资产波动风险和本金亏损风险。'},
                {level:'D',lable:'相对积极型',discription:'此类投资者为了获得高回报的投资收益，能够承受投资产品价格的显著波动，主要投资目标是实现资产增值，为实现目标往往愿意承担相当程度的风险，此类投资者可以承受相当大的资产波动风险和本金亏损风险。'},
                {level:'E',lable:'积极型',discription:'此类投资者能够承受投资产品价格的剧烈波动，也可以承担这种波动所带来的结果，投资目标主要是取得超额收益，为实现投资目标愿意冒更大的风险，此类投资者能够承担相当大的投资风险和更大的本金亏损风险。'}
            ],
            answers:[],
            grade:{},
        }
    },
    computed:{
        questionnaire:function(){
            return this.$store.state.customer.questionnaire;
        }
    },
    mounted() {
        this.$store.dispatch('getQuestionnaire',{id:this.$route.params.actorId}).then(()=>{
            if(this.questionnaire.answer&&this.questionnaire.answerArray.length){
                this.answers=this.questionnaire.answerArray;
                for (let i = 0; i < this.result.length; i++) {
                    let element = this.result[i];
                    if(element.level==this.questionnaire.grade){
                        this.grade=element;
                        break;
                    }
                    
                }
            }
        })
    },
    methods: {


    }
}
</script>


