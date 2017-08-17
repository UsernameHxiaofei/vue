<template>
        <div id="msg-detail">
          <div class="search-box">
            <div class="output">
              <el-input placeholder="手机号 | 姓名" icon="search" v-model.trim="keyword" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
              </el-input>
            </div>
            <div class="date-box">
              <el-select v-model="indentType" @change="typeChange" clearable placeholder="身份类型">
                <el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="statusCode" @change="statusChange" clearable placeholder="状态">
                <el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <!--表格-->
          <div class="my-table">
            <el-table :data="webMessage.list" stripe border style="width: 100%">
              <el-table-column prop="kong" width="30">
              </el-table-column>
              <el-table-column type="index" width="50" label="序号">
              </el-table-column>
              <el-table-column prop="name" label="姓名">
              </el-table-column>
              <el-table-column prop="mobileNumber" label="手机号">
              </el-table-column>
              <el-table-column prop="identNumber" label="身份证号">
              </el-table-column>
              <el-table-column prop="createTime" label="注册时间">
              </el-table-column>
              <el-table-column prop="statusName" label="状态">
              </el-table-column>
              <el-table-column width="140" label="认证">
                <template scope="scope">
                  <span class="btn-small" :class="scope.row.projectParty==1 ? active : ''">项</span>
                  <span class="btn-small" :class="scope.row.expert==2 ? active : ''">行</span>
                  <span class="btn-small" :class="scope.row.leadInvestor==2 ? active : ''">领</span>
                  <span class="btn-small" :class="scope.row.investor==1 ? active : ''">投</span>
                </template>
              </el-table-column>
              <el-table-column width="120">
                <template scope="scope">
                  <router-link :to="{path: '/msgTalkDetail/'+scope.row.id}">
                    <el-button class="btn-style btn-margin">交流记录</el-button>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="kong" width="30">
              </el-table-column>
            </el-table>
          </div>
          <div class="page-box clearfix">
            <div class="page-wrap">
              <div class="block">
                <pagination :total="webMessage.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"></pagination>
              </div>
            </div>
          </div>
        </div>
      </template>
      <script>
      import pagination from '../../components/common/pagination.vue'
      export default {
        components: {
          'pagination': pagination
        },
         computed: {
          webMessage: function () {
            return this.$store.state.content.selectWebMessage;
          }
        },
        data() {
          return {
            statusCode: '',
            keyword: '',
            indentType: '',
            active: 'border-orange',
            optionsType: [{
              value: 'A',
              label: '实名'
            }, {
              value: 'B',
              label: '行家'
            }, {
              value: 'C',
              label: '项目方'
            }, {
              value: 'D',
              label: '投资人'
            }, {
              value: 'E',
              label: '领投'
            }],
            optionsStatus: [{
              value: '1',
              label: '正常'
            }, {
              value: '2',
              label: '已封禁'
            }],
            dialogTableVisible: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: '',
            },
            msgWebParam: {},
            formLabelWidth: '120px'
          }
        },
        mounted() {
          this.msgWebParam = {
            status: this.statusCode,
            keyword: this.keyword,
            indentType: this.indentType,
            pageNo: 1,
            pageSize: 10,
          }
          //分页查询站内消息,模糊查询
          this.$store.dispatch('selectPage_byCondition', this.msgWebParam);
        },
        methods: {
          handleIconClick(ev) {
            this.msgWebParam.keyword = this.keyword;
            this.msgWebParam.pageNo = 1;
            this.$store.dispatch('selectPage_byCondition', this.msgWebParam);
          },
          handleSizeChange(val) {
            this.msgWebParam.pageSize = val;
            this.msgWebParam.pageNo = 1;
            this.$store.dispatch('selectPage_byCondition', this.msgWebParam);
          },
          handleCurrentChange(val) {
            this.msgWebParam.pageNo = val;
            this.$store.dispatch('selectPage_byCondition', this.msgWebParam);
          },
          typeChange() {
            this.msgWebParam.pageNo = 1;
            this.msgWebParam.indentType = this.indentType;
            this.$store.dispatch('selectPage_byCondition', this.msgWebParam);
          },
          statusChange() {
            this.msgWebParam.pageNo = 1;
            this.msgWebParam.status = this.statusCode;
            this.$store.dispatch('selectPage_byCondition', this.msgWebParam);
          }
        }
      }
      </script>
      