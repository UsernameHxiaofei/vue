<style scoped>
    .search-info {
        width: 100%;
        padding: 30px 50px;

    }

   .content-box {
        width: 100%;
        border-top: 1px solid #ccc;
        padding: 50px;
    }

    .echart {
        margin-top: 50px;
        width: 100%;
        height: 400px;
    }
    .total-info{
        float: left;
        margin:0 0 30px 0;
        width: 100%;
        background:  rgb(223, 236, 236);
        border-bottom: 1px solid  rgb(223, 236, 236);
        display: flex;
        justify-content:space-around

    }
    .item-block{
        width:220px;
        padding: 10px;
    }
    .item-name{
        color: #000;
    }
    .item-number{
        color: #444;
        font-size: 20px;
    }
</style>
<template>
    <div id="monitor">
        <div class="search-info">
            <label for="">时间范围：</label>
            <span style="margin-left:10px;">
                <el-date-picker :clearable="false" v-model="startTime" align="right" :editable="false" type="datetime" @change="startChange"
                    placeholder="选择开始日期"></el-date-picker>
                至
                <el-date-picker :clearable="false" v-model="endTime" align="right" :editable="false" type="datetime" @change="endChange"
                    placeholder="选择结束日期"></el-date-picker>
            </span>
        </div>
        <div class="content-box">
            <!-- 统计数据 -->
            <div class="total-info">
                <div class="item-block">
                    <div class="item-name">企业银账调用费用</div>
                    <div class="item-number">
                        {{totalData.enterAccountAmount}}  
                        <sup>￥</sup>
                    </div>
                    <div class="item-name">企业银账调用次数</div>
                    <div class="item-number">
                        {{totalData.enterAccountCount}}
                    </div>
                </div>
                <div class="item-block">
                    <div class="item-name">个人银账调用费用</div>
                    <div class="item-number">
                        {{totalData.perAccountAmount}}  
                        <sup>￥</sup>
                    </div>
                    <div class="item-name">个人银账调用次数</div>
                    <div class="item-number">
                        {{totalData.perAccountCount}}
                    </div>
                </div>
                <div class="item-block">
                    <div class="item-name">七牛云上传费用</div>
                    <div class="item-number">
                        {{totalData.qiniuUploadAmount}}  
                        <sup>￥</sup>
                    </div>
                    <div class="item-name">七牛云上传次数</div>
                    <div class="item-number">
                        {{totalData.qiniuUploadCount}}
                    </div>
                </div>
                <div class="item-block">
                    <div class="item-name">天创征信调用费用</div>
                    <div class="item-number">
                        {{totalData.tcCreditAmount}}  
                        <sup>￥</sup>
                    </div>
                    <div class="item-name">天创征信调用次数</div>
                    <div class="item-number">
                        {{totalData.tcCreditCount}}
                    </div>
                </div>
                <div class="item-block">
                    <div class="item-name">实名认证调用费用</div>
                    <div class="item-number">
                        {{totalData.realNameAmount}}  
                        <sup>￥</sup>
                    </div>
                    <div class="item-name">实名认证调用次数</div>
                    <div class="item-number">
                        {{totalData.realNameCount}}
                    </div>
                </div>
                <div class="item-block">
                    <div class="item-name">聚合支付调用费用</div>
                    <div class="item-number">
                        {{totalData.jhPayAmount}}  
                        <sup>￥</sup>
                    </div>
                    <div class="item-name">聚合支付调用次数</div>
                    <div class="item-number">
                        {{totalData.jhPayCount}}
                    </div>
                </div>
            </div>
            <!--表格-->
            <div class="my-table">
                <el-table :data="tableData" stripe border style="width: 100%">
                    <el-table-column prop="weekTime" width="140" label="时间">
                    </el-table-column>
                    <el-table-column prop="smsCount" label="本周发出短信数量">
                    </el-table-column>
                    <el-table-column prop="smsPrice" width="160" label="本周短信产生费用￥">
                    </el-table-column>
                    <el-table-column prop="baofoCount" label="本周宝付支付次数">
                    </el-table-column>
                    <el-table-column prop="baofoPrice"  width="160" label="本周产生宝付服务费￥">
                    </el-table-column>
                    <el-table-column prop="signCount" label="本周签约次数">
                    </el-table-column>
                    <el-table-column prop="signPrice" label="产生签约费用￥">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import { formatDate } from '../../util/index'
export default {
	beforeMount() {
		const end = new Date('2017-11-16 00:00:00')
		const start = new Date()
		start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
		this.startTime = start
		this.endTime = end
		this.param = {
			startTime: formatDate(start, 'yyyy-MM-dd HH:mm:ss'),
			endTime: formatDate(end, 'yyyy-MM-dd HH:mm:ss')
		}
		this.ready = true
		this.getInfo()
	},
	data() {
		return {
			ready: false,
			startTime: '',
			endTime: '',
			param: {},
			tableData: [],
			totalData: {}
		}
	},
	methods: {
		startChange(start) {
			this.param.startTime = start
			this.getInfo()
		},
		endChange(end) {
			this.param.endTime = end
			this.getInfo()
		},
		getInfo() {
			if (!this.ready) {
				return
			}
			this.$store.dispatch('showCostInfo', this.param).then((data) => {
				this.tableData = data
            })
			this.$store.dispatch('showExtraCostInfo', this.param).then((data) => {
				this.totalData = data
            })
            
		}
	}
}
</script>