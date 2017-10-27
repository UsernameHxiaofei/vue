<style>
.reserve {
  margin: 26px 30px 28px 0;
  overflow: hidden;
}

.reserve .el-button--success.is-plain {
  float: right;
  background: #06ccb6;
  color: white;
  border-color: #06ccb6;
  padding: 10px 45px;
}

.reserve .el-button--success.is-plain:hover {
  border-color: #06ccb6;
}


.auth-th {
  background-color: rgb(238, 246, 246);
  color: rgb(31, 61, 61);
  height: 40px;
  line-height: 40px;
  overflow: hidden;
}

.auth-th p {
  float: left;
  text-align: center;
}

.auth-th p:first-child {
  margin-left:30px;
}

.auth-th p:last-child {
  margin-left:30px;
}

.auth-con {
  overflow: hidden;
  margin: 0 30px;
}

.auth-con .auth-tree {
  width: 20%;
  float: left;
  margin-top: 30px;
}

.auth-con .auth-tree .el-tree {
  min-height: 420px;
}

.auth-con .auth-transfer {
  width: 80%;
  float: left;
}

.auth-transfer .el-transfer {
  width: 95%;
  margin: 30px auto 0 auto;
}

.auth-transfer .el-transfer-panel {
  width:42%;
}

.auth-transfer .el-transfer-panel__body {
  height: 380px;
}

.auth-transfer .el-transfer-panel__list {
  height: 344px;
}
</style>
<template>
  <div class="permission">
    
    <!--权限-->
    <div class="">
      <div class="auth-th">
        <p>选择角色</p>
        <p>角色名称：
          <span>{{this.str}}</span>
        </p>
      </div>
      <div class="auth-con">
        <div class="auth-tree">
          <el-tree accordion :data="systemGetPermissionList" node-key="id" highlight-current :props="defaultProps" @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div class="auth-transfer">
          <el-transfer filterable :filter-method="filterMethod"  filter-placeholder="请输入权限名" v-model="havePrivilegeList" :props="{key: 'id', label: 'name' }" :data="allList" :button-texts="['收回 = = ', ' = = 赋予']" :titles="['可用权限','拥有权限']">
          </el-transfer>
        </div>
      </div>
    </div>
    <div class="reserve">
      <el-button :plain="true" type="success" @click="preserve">保存</el-button>
    </div>
  </div>
</template>
<script>

import _ from 'lodash'
export default {
  computed: {
    systemGetPermissionList: function () {
      return this.$store.state.system.systemGetPermissionList;
    },
    systemInquiryList: function () {
      return this.$store.state.system.systemInquiryList;
    },
    systemUpdatePermissionList: function () {
      return this.$store.state.system.systemUpdatePermissionList;
    },
  },
  mounted() {
    this.$store.dispatch('system_getPermissionList').then(()=>{
      
    });
  },
  data() {
    return {
      str: '',
      roleId: '',
      allList:[],
      oldList:[],
      havePrivilegeList:[],
      defaultProps: {
        label: 'name',
        children: 'roles'
      }
    };
  },

  methods: {
    handleNodeClick(data, node) {
      this.roleId = data.id;
      if (node.level === 2) {//  1是一级  泛角色 ， 2是2级 角色 
        this.str = data.name;
        let inquiryParams = {
          roleId: data.id
        }
        this.$store.dispatch('system_inquiryList', inquiryParams).then(()=>{
          let templist=[],oldTemplist=[];
          if(this.systemInquiryList.havePrivilegeList){
            Object.keys(this.systemInquiryList.havePrivilegeList).forEach((item,index)=>{
              let elements=this.systemInquiryList.havePrivilegeList[item];
              elements.forEach((element,j)=>{
                oldTemplist.push(element.id);
                element.name=element.grouping+'-'+element.name;
                templist.push(element);
              })
            })
          }
          Object.keys(this.systemInquiryList.noHavePrivilegeList).forEach((item,index)=>{
            let elements=this.systemInquiryList.noHavePrivilegeList[item];
            elements.forEach((element,j)=>{
                element.name=element.grouping+'-'+element.name;
                templist.push(element);
            })
          })
          this.allList=templist;
          this.oldList = oldTemplist;
          this.havePrivilegeList=oldTemplist;
          // if(this.systemInquiryList.havePrivilegeList){
          //  this.havePrivilegeList = [];
          //   for (let i = 0; i < this.systemInquiryList.havePrivilegeList.length; i++) {
          //     this.havePrivilegeList.push(this.systemInquiryList.havePrivilegeList[i].id);
          //   }
          //   this.oldList = this.havePrivilegeList;
          // }else{
          //   this.oldList = [];
          // }
        });
      }
    },
    filterMethod(query, item){
      return item.name.match(query);
    },
    preserve() {
      let updateParams = {
          roleId: this.roleId,
          forAdd: _.difference(this.havePrivilegeList,this.oldList),
          forDelete:_.difference(this.oldList,this.havePrivilegeList),
        }
      this.$store.dispatch('system_updatePermissionList', updateParams).then(() => {
        if (this.systemUpdatePermissionList.success) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        } else {
          this.$message('保存失败');
        }
      });
    }
  },


};
</script>
