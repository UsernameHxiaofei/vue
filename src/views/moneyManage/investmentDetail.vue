<style>
/*返回上一级*/

.go-back {
  height: 63px;
  line-height: 63px;
  background: #fafafa;
}

.go-back div {
  color: #06ccb6;
  margin-left: 30px;
}

.go-back div i,
.go-back div span {
  vertical-align: middle;
}

.go-back a:hover {
  text-decoration: none;
}



/*统计*/

.rong {
  height: 87px;
  line-height: 87px;
  width: 96%;
  margin: 0 auto;
}

.rong-name span {
  font-size: 16px;
  color: #000000;
  margin-right: 70px;
  font-weight: bold;
}

em {
  font-style: normal;
}

.rong-name {
  float: left;
}

.state {
  width: 120px;
  height: 30px;
  line-height: 30px;
  padding: 0;
  background: #fbc937;
  border: none;
  border-radius: 25px;
  margin-top: 28px;
  float: right;
}

.state span {
  color: white;
  text-align: center;
  font-size: 14px;
}
</style>
<template>
  <div id="wrap">
    <!--返回上一级-->
    <div class="go-back">
      <router-link :to="{path: '/investmentFund'}">
        <div>
          <i class="el-icon-arrow-left"></i>
          <span>返回上一级</span>
        </div>
      </router-link>
    </div>
    <!--统计-->
    <div class="rong">
      <div class="rong-name">
        <span>{{projectName}}</span>
        <span>已融金额：
          <em>{{raisedAmount||0}}</em>元</span>
      </div>
      <el-button type="warning" class="state">{{projecStatus|projectStatus}}</el-button>
    </div>
    <!--表格-->
    <div class="my-table">
      <el-table :data="subscriptionData.records" stripe border style="width: 100%">
        <el-table-column prop="kong" width="30">
        </el-table-column>
        <el-table-column type="index" width="60" label="序号">
        </el-table-column>
        <el-table-column prop="investUserName" label="投资人">
        </el-table-column>
        <el-table-column prop="investAmount" label="投资金额(元)">
        </el-table-column>
        <el-table-column prop="investPercent" label="投资比例">
        </el-table-column>
        <el-table-column prop="isLeaderByName" label="领投">
          <template scope="scope">
            <span v-if="scope.row.isLeader=='no'">否</span>
            <span v-if="scope.row.isLeader=='yes'">是</span>
          </template>
        </el-table-column>
        <el-table-column prop="investTime" label="认投时间">
        </el-table-column>
        <el-table-column prop="payTime" label="支付时间">
        </el-table-column>
        <el-table-column prop="isPayByName" label="状态">
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-button class="btn-style" v-if="scope.row.refundStatus==0 && scope.row.isRefound==true" @click="refund(scope.row)">退款</el-button>
            <el-button class="btn-style" v-if="scope.row.refundStatus==1 && scope.row.isRefound==true" @click="refund(scope.row)">重新申请退款</el-button>
            <span v-if="scope.row.refundStatus==2 && scope.row.isRefound==true">退款中</span>
            <span v-if="scope.row.refundStatus==3 && scope.row.isRefound==true">已退款</span>
          </template>
        </el-table-column>
        <el-table-column prop="kong" width="30">
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page-box fr clearfix">
      <div class="page-wrap">
        <pagination :total="subscriptionData.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from '../../components/common/pagination'
export default {
  components: {
    pagination
  },
  computed: {
    subscriptionData: function () {
      return this.$store.state.money.subscriptionData;
    },
    bailRefund: function () {
      return this.$store.state.money.bailRefund;
    },
    actor: function () {
      return this.$store.state.login.actor;
    },
  },
  mounted() {
    this.investparam = {
      projectId: this.$route.params.projectId,
      page: 1,
      number: 10
    }
    this.$store.dispatch('getSubscription', this.investparam);
    //parse用于从一个字符串中解析出json对象
    this.projectName = JSON.parse(sessionStorage.getItem('projectInfo')).projectName;
    this.raisedAmount = JSON.parse(sessionStorage.getItem('projectInfo')).raisedAmount||0;
    this.projecStatus = JSON.parse(sessionStorage.getItem('projectInfo')).projecStatus;
  },

  data() {
    return {
      investparam:{},
      finished: false,
      projectName: '',
      raisedAmount: '',
      projecStatus: ''
    }
  },
  methods: {
    refund(data) {
      this.$confirm('此操作将进行退款申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let drawParam = {
          projectId: data.projectId,
          operaterId: this.actor.id,
          oldTransactionId: data.transactionId
        }
        this.$store.dispatch('bail_refund', drawParam).then(() => {
          if (this.bailRefund) {
            if (this.bailRefund.status == 5) {
              this.$message({
                type: 'warning',
                message: '项目不在退款时期,不退款 ！'
              });
            } else {
              this.$message({
                type: 'success',
                message: '退款申请成功!'
              });
              this.$store.dispatch('getSubscription', this.investparam);
            }

            // this.finished=true;
          } else {
            this.$message({
              type: 'info',
              message: '退款申请失败!'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退款申请'
        });
      });

    },
    handleSizeChange(size) {
      this.investparam.number = size;
      this.investparam.page = 1;
      this.$store.dispatch('getSubscription', this.investparam);
    },
    handleCurrentChange(val) {
      this.investparam.page = val;
      this.$store.dispatch('getSubscription', this.investparam);
    },
  }
}
</script>

