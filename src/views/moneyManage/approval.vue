<style scoped>
.top-box {
  width: 100%;
  padding: 20px 30px;
  background-color: #fcfcfc;
}
/*统计*/
.rong {
  height: 50px;
  line-height: 50px;
  width: 96%;
  margin: 0 auto;
}

.rong-box span {
  font-size: 14px;
  color: #333333;
  margin-right: 30px;
}

em {
  font-style: normal;
}

.rong-name {
  float: left;
}

.refusing {
  float: right;
}
</style>
<template>
  <div id="wrap">
    <div class="top-box">
      <router-link :to="{path: '/capitalApproval'}">
        <el-button type="text" icon="arrow-left">返回上一级</el-button>
      </router-link>
      <el-button type="primary" class="refusing" @click="refuse" :disabled="btnStatus">拒绝审批</el-button>
    </div>
    <!--统计-->
    <div class="rong" style="margin-top:20px;">
      <div class="rong-box">
        <span>{{projectName}}</span>
        <span>项目状态：{{statusCode|projectStatus}}</span>
        <span>已融金额：{{raisedAmount}}元</span>
      </div>
    </div>
    <div class="rong">
      <div class="rong-box">
        <span>卡主名：{{getCapitalInjectionDetail.name}}</span>
        <span>银行名：{{getCapitalInjectionDetail.bankName}}</span>
        <span>银行账号：{{getCapitalInjectionDetail.bankAccount}}</span>
        <span style="color:red;">（请确认收款账号正确）</span>
      </div>
    </div>
    <!--表格-->
    <div class="my-table" style="margin-top:20px;">
      <el-table :data="getCapitalInjectionDetail.content" stripe border style="width: 100%">
        <el-table-column prop="kong" width="30">
        </el-table-column>
        <el-table-column type='index' width="60" label="序号">
        </el-table-column>
        <el-table-column prop="transactionId" label="交易流水号">
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称">
        </el-table-column>
        <el-table-column prop="statusName" label="状态">
        </el-table-column>
        <el-table-column prop="payAmount" label="总注资额(元)">
        </el-table-column>
        <el-table-column prop="current" label="当前次数">
        </el-table-column>
        <el-table-column prop="planPay" label="本次注资额(元)">
        </el-table-column>
        <el-table-column prop="realPay" label="本次实际注资额(元)">
        </el-table-column>
        <el-table-column width="120">
          <template scope="scope">
            <el-button v-if="scope.row.statusCode==0" class="btn-style" @click="injection(scope.row)">注资</el-button>
            <el-button v-if="scope.row.statusCode==5" class="btn-style" @click="renewApply(scope.row)">重新申请</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="kong" width="30">
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page-box fr clearfix">
      <div class="page-wrap">
        <pagination :total="getCapitalInjectionDetail.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
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
    getCapitalInjectionDetail: function () {
      return this.$store.state.money.getCapitalInjectionDetail;
    },
    actor: function () {
      return this.$store.state.login.actor;
    },
    refuseCapitalInjection: function () {
      return this.$store.state.money.refuseCapitalInjection;
    },
    agreeCapitalInjection: function () {
      return this.$store.state.money.agreeCapitalInjection;
    },
    renewCapitalInjection: function () {
      return this.$store.state.money.renewCapitalInjection;
    },
  },
  mounted() {
    this.approvalInit()
  },
  data() {
    return {
      projectName:'',
      raisedAmount:'',
      statusCode:'',
      param: {},
      btnStatus: false,
    }
  },
  methods: {
    //初始化表格且判断拒绝审批按钮是否被禁用
    approvalInit() {
      this.param = {
        projectId: this.$route.params.projectId,
        page: 1,
        number: 10
      }
      this.$store.dispatch("get_capitalInjectionDetail", this.param).then(()=>{
          for (let i = 0; i < this.getCapitalInjectionDetail.content.length; i++) {
            if (this.getCapitalInjectionDetail.content[i].statusCode == 0) {
              this.btnStatus = false;
            } else if (this.getCapitalInjectionDetail.content[i].statusCode != 0) {
              this.btnStatus = true;
              return;
            }
          }
      });
      //parse用于从一个字符串中解析出json对象
      let projectInfo=JSON.parse(sessionStorage.getItem('projectInfo'));
      this.projectName=projectInfo.projectName,
      this.raisedAmount=projectInfo.raisedAmount,
      this.statusCode=projectInfo.statusCode
    },
    //分页
    handleSizeChange(size) {
      this.param.number = size;
      this.param.page = 1;
      this.$store.dispatch('get_capitalInjectionDetail', this.param);
    },
    handleCurrentChange(page) {
      this.param.page = page;
      this.$store.dispatch('get_capitalInjectionDetail', this.param);
    },
    //拒绝审批
    refuse() {
      this.$confirm('此操作将进行拒绝审批, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let refuseParam = {
          projectId: this.$route.params.projectId,
          checkerId: this.actor.id
        }
        this.$store.dispatch("refuse_capitalInjection", refuseParam).then(() => {
          if (this.refuseCapitalInjection.result == "success") {
            this.$message({
              type: 'success',
              message: '拒绝审批成功!'
            });
            this.btnStatus = true;
            this.$store.dispatch('get_capitalInjectionDetail', this.param);
            
          } else {
            this.$message({
              type: 'warning',
              message: '拒绝审批失败!'
            });
          }
        }, 300);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消此操作'
        });
      });
    },
    //注资
    injection(data) {
      this.$confirm('此操作将进行注资, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let agreeParam = {
          transactionId: data.transactionId,
          checkerId: this.actor.id
        }
        this.$store.dispatch("agree_capitalInjection", agreeParam).then(() => {
          if (this.agreeCapitalInjection.result == 'success') {
            this.$message({
              type: 'success',
              message: '注资成功!'
            });
            this.$store.dispatch('get_capitalInjectionDetail', this.param);
          } else {
            this.$message({
              type: 'warning',
              message: '注资失败!'
            });
          }
        }, 300);

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消此操作'
        });
      });
    },
    //重新申请
    renewApply(data) {
      this.$confirm('此操作将进行重新申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let renewParam = {
          transactionId: data.transactionId,
          checkerId: this.actor.id
        }
        this.$store.dispatch("renew_capitalInjection", renewParam).then(() => {
          if (this.renewCapitalInjection.result == 'success') {
            this.$message({
              type: 'success',
              message: '重新申请成功!'
            });
            this.$store.dispatch('get_capitalInjectionDetail', this.param);
          } else {
            this.$message({
              type: 'warning',
              message: '重新申请失败!'
            });
          }
        }, 300);

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消此操作'
        });
      });
    }
  }
}
</script>