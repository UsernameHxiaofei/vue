<template>
  <div id="msg-detail">
    <div class="search-box">
      <div class="output">
        <el-input placeholder="项目名称 | 项目方" icon="search" v-model="input2" :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <div class="date-box">
        <el-select v-model="value1" clearable placeholder="所属行业">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value2" clearable placeholder="全部">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--表格-->
    <div class="my-table">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="kong" width="30">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="th2" label="项目名称">
        </el-table-column>
        <el-table-column prop="th3" label="项目方">
        </el-table-column>
        <el-table-column prop="th4" label="所属行业">
        </el-table-column>
        <el-table-column prop="th5" label="状态">
        </el-table-column>
        <el-table-column prop="th6" label="目标融资额(元)">
        </el-table-column>
        <el-table-column prop="th7" label="创建时间">
        </el-table-column>
        <el-table-column width="200">
          <template scope="scope">
            <router-link :to="{path: '/itemDetail'}">
              <el-button class="btn-style">编辑</el-button>
            </router-link>
            <el-button class="btn-style">BP下载</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="kong" width="30">
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box clearfix">
      <div class="block fr">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  
    <!-- 模态框（Modal） -->
    <el-dialog class="p-form" title="编辑消息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="模板名称" :label-width="formLabelWidth">
          <el-input v-model="form.juename" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.juese" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板编码" :label-width="formLabelWidth">
          <el-input v-model="form.juename" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="消息内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.juese" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }, {
        value: '选项6',
        label: '北京烤鸭'
      }, {
        value: '选项7',
        label: '北京烤鸭'
      }],
      value4: '',
      value5: '',
      value1: '',
      value2: '',
      value3: '',
      // 搜索
      input2: '',
      // 表格
      tableData: [{
        kong: " ",
        th1: '1',
        th2: '20170501002',
        th3: '蓝色妖姬梦',
        th4: '陈小二',
        th5: '餐饮/商铺',
        th6: '上海市浦东新区',
        th7: '2017-05-20'
      }, {
        kong: " ",
        th1: '2',
        th2: '20170501002',
        th3: '蓝色妖姬梦',
        th4: '陈小二',
        th5: '餐饮/商铺',
        th6: '上海市浦东新区',
        th7: '2017-05-20'
      }, {
        kong: " ",
        th1: '3',
        th2: '20170501002',
        th3: '蓝色妖姬梦',
        th4: '陈小二',
        th5: '餐饮/商铺',
        th6: '上海市浦东新区',
        th7: '2017-05-20'
      }, {
        kong: " ",
        th1: '4',
        th2: '20170501002',
        th3: '蓝色妖姬梦',
        th4: '陈小二',
        th5: '餐饮/商铺',
        th6: '上海市浦东新区',
        th7: '2017-05-20'
      }, {
        kong: " ",
        th1: '5',
        th2: '20170501002',
        th3: '蓝色妖姬梦',
        th4: '陈小二',
        th5: '餐饮/商铺',
        th6: '上海市浦东新区',
        th7: '2017-05-20'
      }, {
        kong: " ",
        th1: '6',
        th2: '20170501002',
        th3: '蓝色妖姬梦',
        th4: '陈小二',
        th5: '餐饮/商铺',
        th6: '上海市浦东新区',
        th7: '2017-05-20'
      }],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleIconClick(ev) {
      console.log(ev);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scope>

</style>