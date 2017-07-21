<template>
  <div id="msg-detail">
    <div class="search-box">
      <div class="date-box">
        <div class="output">
          <el-input placeholder="模板名称" icon="search" v-model.trim="keyword" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
          </el-input>
        </div>
      </div>
    </div>
    <!--表格-->
    <div class="my-table">
      <el-table :data="msgModelGetList.list" stripe border style="width: 100%">
        <el-table-column prop="kong" width="30">
        </el-table-column>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="templatName" label="模板名称">
        </el-table-column>
        <el-table-column prop="templatCode" label="模板编码">
        </el-table-column>
        <el-table-column prop="templatContent" label="模板内容">
        </el-table-column>
        <el-table-column prop="templatType" label="类型">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column width="180">
          <template scope="scope">
            <el-button @click="selectMsgModel(scope.row.templatId)" class="btn-style">编辑</el-button>
            <el-button @click="deleteMsgModel(scope.row.templatId)" class="btn-style">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="kong" width="30">
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box clearfix">
      <div class="page-wrap">
        <div class="block">
          <pagination :total="msgModelGetList.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
        </div>
      </div>
      <div class="btn-box">
        <el-button :plain="true" type="success" @click="createMsg">创建模板
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
  
    <!-- 模态框（Modal） -->
    <el-dialog class="p-form" :title="title" :visible.sync="dialogMsgVisible" @close="resetForm">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item v-show="false" label="模板id" :label-width="formLabelWidth" prop="templatId">
          <el-input v-model="ruleForm.templatId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板名称" :label-width="formLabelWidth" prop="templatName">
          <el-input v-model="ruleForm.templatName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="templatType">
          <el-select v-model="ruleForm.templatType" clearable placeholder="请选择模板类型">
            <el-option label="短信模板" value="1" key="1"></el-option>
            <el-option label="邮件模板" value="2" key="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板编码" :label-width="formLabelWidth" prop="templatCode">
          <el-input v-model="ruleForm.templatCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="消息内容" :label-width="formLabelWidth" prop="templatContent">
          <el-input type="textarea" :rows="5" v-model="ruleForm.templatContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="createOrUpdateForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>
<script>
import pagination from '../../components/common/pagination.vue'
export default {
  name: 'msgModel',
  components: {
    'pagination': pagination
  },
  mounted() {
    this.msgModelparam = {
      templatName: this.keyword,
      pageNo: 1,
      pageSize: 10,
    }
    //分页查询消息模板,模糊查询
    this.$store.dispatch('msgModel_getList', this.msgModelparam);
  },
  computed: {
    msgModelGetList: function () {
      return this.$store.state.content.msgModelGetList;
    },
    msgModelForm: function () {
      return this.$store.state.content.selectMsgModel;
    },
    insertUpdate: function () {
      return this.$store.state.content.insertNum;
    },
    deleteModel: function () {
      return this.$store.state.content.deleteNum;
    },
  },
  data() {
    return {
      title:'',
      keyword: '',
      totalList: 400,
      templatId: '',
      deletor: '',
      msgModelparam: {},
      delMsgModelparam: {},
      msgModelById: {},
      ltInfoTemplat: {},
      currentPage: 1,
      dialogMsgVisible: false,
      ruleForm: {
        templatId: '',
        templatCode: '',
        templatName: '',
        templatType: '',
        templatContent: '',
        creator: ''
      },
      rules: {
        templatName: [
          { required: true, message: '请输入消息模板名称', trigger: 'blur' }
        ],
        templatType: [
          { required: true, message: '请选择模板类型', trigger: 'change' }
        ],
        templatCode: [
          { required: true, message: '请输入模板编码', trigger: 'blur' }
        ],
        templatContent: [
          { required: true, message: '请填写消息模板内容', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      optionNum: ''
    }
  },
  methods: {
    handleIconClick(ev) {
      this.msgModelparam.templatName = this.keyword;
      this.msgModelparam.pageNo = 1;
      this.$store.dispatch('msgModel_getList', this.msgModelparam);
    },
    handleSizeChange(val) {
      this.msgModelparam.pageSize = val;
      this.msgModelparam.pageNo = 1;
      this.$store.dispatch('msgModel_getList', this.msgModelparam);
    },
    handleCurrentChange(val) {
      this.msgModelparam.pageNo = val;
      this.$store.dispatch('msgModel_getList', this.msgModelparam);
    },
    //删除消息模板
    deleteMsgModel(index) {
      this.$confirm('此操作将永久删除消息模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.templatId = index;
        this.deletor = this.$store.state.login.actor.name;
        this.delMsgModelparam = {
          templatId: this.templatId,
          deletor: this.deletor
        }
        this.$store.dispatch('msgModel_delete', this.delMsgModelparam).then(() => {
          if (this.deleteModel.success) {
            this.$store.dispatch('msgModel_getList', this.msgModelparam);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //编辑消息模板
    selectMsgModel(data) {
      this.title="编辑消息";
      // if(!data.templatType){
      //   data.templatType='1';
      // }
      //this.ruleForm=data;
      this.msgModelById = {
        templatId: data
      }

      this.dialogMsgVisible = true;
      this.$store.dispatch('msgModel_select', this.msgModelById).then(() => {
        if (this.msgModelForm.templatType != null && this.msgModelForm.templatType != '') {
          this.msgModelForm.templatType = this.msgModelForm.templatType.toString();
        } else {
          this.msgModelForm.templatType = '1';
        }
        this.ruleForm = this.msgModelForm;
      })
    },
    createMsg() {
      this.ruleForm.templatId = '';
      this.ruleForm.templatName = '';
      this.ruleForm.templatType = '';
      this.ruleForm.templatCode = '';
      this.ruleForm.templatContent = '';
      this.dialogMsgVisible = true;
      this.title="创建消息"
    },
    createOrUpdateForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.ruleForm.creator = this.$store.state.login.actor.name;
          this.$store.dispatch('msgModel_insert_update', this.ruleForm).then(() => {
            if (this.insertUpdate.success) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.$store.dispatch('msgModel_getList', this.msgModelparam);
              this.dialogMsgVisible = false;
            } else {
              this.$message({
                type: 'success',
                message: '保存失败!'
              });
            }
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
      this.dialogMsgVisible = false;
    },
    rangechange(v) {
      this.range = v.split(' - ');
      this.rechargeParam.startDate = this.range[0];
      this.rechargeParam.endDate = this.range[1];
      this.$store.dispatch('find_topupByCondition', this.msgModelparam);
    },
    statusChange() {
      this.rechargeParam.pageNum = 1;
      this.rechargeParam.statusCode = this.statusCode;
      this.$store.dispatch('find_topupByCondition', this.msgModelparam);
    },
  }
}
</script>