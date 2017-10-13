<style>
.my-form .el-upload__input {
    display: none !important;
}

.tab-active {
    color: #06ccb7 !important;
}

.p-form .el-button--text {
    color: rgb(31, 61, 61);
}

.p-form .el-dialog--small {
    width: 45%;
    box-shadow: 0 0 5px #eee;
}

.p-form .el-radio {
    margin-right: 15px;
}

.p-form .el-radio+.el-radio {
    margin-left: 0px;
}

.p-form .el-checkbox {
    margin-right: 15px;
}

.p-form .el-checkbox+.el-checkbox {
    margin-left: 0px;
}
</style>
<template>
    <div style="width:100%;height: 100%;background: #fff;margin: auto;" class="account-box my-form">
        <el-row class="row-bg">
            <el-col :span="5">
                <div class="ac-col-1">
                    <p>手机号</p>
                    <p>Email</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-2">
                    <p>{{actor.mobileNumber}}</p>
                    <p>{{actor.email||''}}</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-3">二者皆可用作登录系统的账号</div>
            </el-col>
            <el-col :span="5">
                <div class="ac-col-4" @click="dialogFormVisible = true">修改</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="ac-col-2-1">
                    <p>登录密码</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-2-2">
                    <p>{{actor.loginPassword?"已设置":"未设置"}}</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-3">用以登录客户中心</div>
            </el-col>
            <el-col :span="5">
                <div class="ac-col-4" @click="resetPassword">重置</div>
            </el-col>
        </el-row>
        <el-row class="row-bg">
            <el-col :span="5">
                <div class="ac-col-2-1">
                    <p>支付密码</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-2-2">
                    <p>{{actor.payPassword?"已设置":"未设置"}}</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-3">涉及资金操作时使用</div>
            </el-col>
            <el-col :span="5">
                <div class="ac-col-4" @click="setPayPassword">重置</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="ac-col-2-1">
                    <p>实名认证</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-2-2">
                    <p>{{customer.realName?"已认证":"未认证"}}</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-3">是投融资服务平台的基本要求</div>
            </el-col>
            <el-col :span="5">
                <div class="ac-col-4" @click="realNameDialog = true" v-if="customer.realName==0">认证</div>
                <div class="ac-col-4" v-if="customer.realName==1" @click="realNameDialog = true">查看</div>
            </el-col>
        </el-row>
        <el-row class="row-bg">
            <el-col :span="5">
                <div class="ac-col-2-1">
                    <p>行家认证</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-2-2">
                    <p>{{customer.expert|certificate}}</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-3-3">评价推荐项目，获取高额佣金<br>行家推广传播，提高个人品牌</div>
            </el-col>
            <el-col :span="5">
                <div class="ac-col-4" @click="expertClick" v-if="customer.expert==0">认证</div>
                <div class="ac-col-4" @click="queryExpert" v-if="customer.expert==1 || customer.expert==2">查看</div>
                <div class="ac-col-4" @click="editExpertClick" v-if="customer.expert==3">重新申请</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="ac-col-2-1">
                    <p>领投认证</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-2-2">
                    <p>{{customer.leadInvestor|certificate}}</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-3-3">领投实业项目，获取超额收益<br>领投推广传播，提升品牌形象</div>
            </el-col>
            <el-col :span="5">
                <div class="ac-col-4" @click="leadClick" v-if="customer.leadInvestor==0">认证</div>
                <div class="ac-col-4" @click="queryLead" v-if="customer.leadInvestor==1 || customer.leadInvestor==2">查看</div>
                <div class="ac-col-4" @click="editLeadClick" v-if="customer.leadInvestor==3">重新申请</div>
            </el-col>
        </el-row>
        <el-row class="row-bg">
            <el-col :span="5">
                <div class="ac-col-2-1">
                    <p>合格投资人认证</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-2-2">
                    <p>{{customer.investor?"已认证":"未认证"}}</p>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="ac-col-3">是投融资服务平台的基本要求</div>
            </el-col>
            <el-col :span="5">
                <div class="ac-col-4" @click="investorClick" v-if="customer.investor==0">认证</div>
                <!--<div class="ac-col-4" v-if="customer.investor!=0">已认证</div>-->
            </el-col>
        </el-row>
        <div class="p-form">
            <el-dialog title="编辑账号" :visible.sync="dialogFormVisible" @close="cancel('actor')" :close-on-click-modal="false">
    
                <el-form label-position="right" :model="actor" :rules="actorRules" ref="actor">
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="actor.mobileNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
                        <el-input v-model="actor.email" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
    
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel('actor')">取 消</el-button>
                    <el-button type="primary" @click="editAccount">保 存</el-button>
                </div>
    
            </el-dialog>
        </div>
    
        <div class="p-form">
            <el-dialog title="实名认证" :visible.sync="realNameDialog" @close="cancel('realName')" :close-on-click-modal="false">
                <el-form :rules="realNameRule" ref="realName" :model="actor">
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="actor.mobileNumber" :readonly="customer.realName==1" auto-complete="off" value=""></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="actor.name" :readonly="customer.realName==1" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="identNumber">
                        <el-input v-model="actor.identNumber" :readonly="customer.realName==1" auto-complete="off">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel('realName')" :disabled="customer.realName==1">取 消</el-button>
                    <el-button type="primary" @click="nameVaildate" :disabled="customer.realName==1">确 认</el-button>
                </div>
            </el-dialog>
        </div>
    
        <div class="p-form">
            <el-dialog title="行家认证" :visible.sync="expertDialog" @close="cancel('expert')" :close-on-click-modal="false">
                <el-form :rules="expertRule" ref="expert" :model="expert">
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="expert.mobileNumber" auto-complete="off" value="" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
                        <el-input v-model="expert.realName" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="identNumber">
                        <el-input v-model="expert.identNumber" auto-complete="off" :readonly="customer.realName?true:false"> </el-input>
                    </el-form-item>
                    <el-form-item label="专注行业" required>
                        <div v-for="(item , i) in industryList" style="float: left;padding-right: 20px;">
                            <el-checkbox v-model="industryArr.industry[i]" :label="item.value" :key="item.label">{{item.label}}
                            </el-checkbox>
                            <input type="number" v-model="industryArr.workYears[i]" :disabled="industryArr.industry[i]?false:true" number="true" class="el-pagination__editor" style="width: 30px;line-height: 0px;">年
                        </div>
                    </el-form-item>
                    <el-form-item label="所属单位" :label-width="formLabelWidth" prop="organization">
                        <el-input v-model="expert.organization" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" :label-width="formLabelWidth" prop="position">
                        <el-input v-model="expert.position" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="常驻地区 " required>
                        <el-cascader  :options="options" expand-trigger="click" change-on-select clearable v-model="expert.expertUsualPlaceOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="名片">
                        <el-upload class="upload-demo" ref="uploadBusinessCard" action="/ajax/image_uploadByFile" :data="fileParam" list-type="picture-card" :show-file-list="true" :auto-upload="false" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="businessCardSuccess">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px; position:absolute; right:0; bottom:20px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="专业性凭证">
                        <el-upload class="upload-demo" ref="uploadCredentials" action="/ajax/image_uploadByFile" :data="fileParam" list-type="picture-card" :show-file-list="true" :auto-upload="false" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="credentialsSuccess">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px; position:absolute; right:0; bottom:20px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="行家简介">
                        <el-input type="textarea" :rows="6" v-model="expert.profile"></el-input>
                    </el-form-item>
                    <el-form-item prop="agree">
                        <el-checkbox v-model="expert.agree" label="我承诺以上登记的所有信息属实，并对虚假信息产生的一切后果负责" name=""></el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel('expert')">取 消</el-button>
                    <el-button type="primary" @click="expertNameVaildate">确 认</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="p-form">
            <el-dialog title="行家认证" :visible.sync="viewExpertDialog" @close="cancel('viewExpert')" :close-on-click-modal="false">
                <el-form ref="viewExpert" :model="expertData">
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                        <span>{{expertData.mobileNumber}}</span>
                    </el-form-item>
                    <el-form-item label="真实姓名" :label-width="formLabelWidth">
                        <span>{{expertData.realName}}</span>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth">
                        <span>{{expertData.identNumber}}</span>
                    </el-form-item>
                    <el-form-item label="专注行业" required>
                        <div style="float: left;padding-right: 20px;" v-for="(item,i) in industryList">
                            <el-checkbox :disabled="true" v-model="industryObj[i]" :label="item.value" :key="item.label">{{item.label}}
                            </el-checkbox>
                            <input type="number" v-model="workYearsObj[i]" :disabled="true" number="true" class="el-pagination__editor" style="width: 30px;line-height: 0px;">年
                        </div>
                    </el-form-item>
                    <el-form-item label="所属单位" :label-width="formLabelWidth">
                        <span>{{expertData.organization}}</span>
                    </el-form-item>
                    <el-form-item label="职位" :label-width="formLabelWidth">
                        <span>{{expertData.position}}</span>
                    </el-form-item>
                    <el-form-item label="常驻地区 " >
                        <span>{{expertData.permanent|address}}</span>
                    </el-form-item>
                    <el-form-item label="名片">
                        <img style="width:200px;" :src="expertData.businessCard">
                    </el-form-item>
                    <el-form-item label="专业性凭证">
                        <img style="width:200px;" :src="expertData.credentials">
                    </el-form-item>
                    <el-form-item label="行家简介">
                        <span>{{expertData.profile}}</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="cancel('viewExpert')">确 认</el-button>
                </div>
            </el-dialog>
        </div>
    
        <div class="p-form">
            <el-dialog title="行家认证" :visible.sync="editExpertDialog" @close="cancel('editExpert')" :close-on-click-modal="false">
                <el-form :rules="expertRule" ref="editExpert" :model="expertData">
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="expertData.mobileNumber" auto-complete="off" value="" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
                        <el-input v-model="expertData.realName" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="identNumber">
                        <el-input v-model="expertData.identNumber" auto-complete="off" :readonly="customer.realName?true:false">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="专注行业" required>
                        <div v-for="(item , i) in industryList" style="float: left;padding-right: 20px;">
                            <el-checkbox v-model="industryObj[i]" :label="item.value" :key="item.label">{{item.label}}
                            </el-checkbox>
                            <input type="number" v-model="workYearsObj[i]" :disabled="industryObj[i]?false:true" number="true" class="el-pagination__editor" style="width: 30px;line-height: 0px;">年
                        </div>
                    </el-form-item>
                    <el-form-item label="所属单位" :label-width="formLabelWidth" prop="organization">
                        <el-input v-model="expertData.organization" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" :label-width="formLabelWidth" prop="position">
                        <el-input v-model="expertData.position" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="常驻地区 " required >
                        <el-cascader size="large" :options="options" v-model="expertData.expertUsualPlaceOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="名片">
                        <el-upload class="upload-demo" ref="uploadBusinessCard" action="/ajax/image_uploadByFile" :data="fileParam" list-type="picture-card" :show-file-list="true" :auto-upload="false" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="updateBusinessCardSuccess">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px; position:absolute; right:0; bottom:20px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="专业性凭证">
                        <el-upload class="upload-demo" ref="uploadCredentials" action="/ajax/image_uploadByFile" :data="fileParam" list-type="picture-card" :show-file-list="true" :auto-upload="false" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="updateCredentialsSuccess">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px; position:absolute; right:0; bottom:20px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="行家简介">
                        <el-input type="textarea" :rows="6" v-model="expertData.profile"></el-input>
                    </el-form-item>
                    <el-form-item prop="agree">
                        <el-checkbox v-model="expertData.agree" label="我承诺以上登记的所有信息属实，并对虚假信息产生的一切后果负责" name=""></el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel('editExpert')">取 消</el-button>
                    <el-button type="primary" @click="updateExpert">确 认</el-button>
                </div>
            </el-dialog>
        </div>
    
        <div class="p-form">
            <el-dialog title="领投认证" :visible.sync="leadDialog" @close="cancel('lead')" :close-on-click-modal="false">
                <el-form ref="lead" :model="lead" :rules="leadRule">
                    <el-row>
                        <el-col :span="12" style="text-align: right;padding: 10px 10px;">
                            <el-button @click="menuclick(1)" :class="isActive&&show==1 ? active : ''" type="text">我个人领投</el-button>
                        </el-col>
                        <el-col :span="12" style="text-align: left;padding: 10px 10px;">
                            <el-button @click="menuclick(2)" :class="isActive&&show==2 ? active : ''" type="text">我代表机构</el-button>
                        </el-col>
                    </el-row>
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="lead.mobileNumber" auto-complete="off" value="" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
                        <el-input v-model="lead.realName" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="identNumber">
                        <el-input v-model="lead.identNumber" auto-complete="off" :readonly="customer.realName?true:false">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="关注行业" prop="industryList">
                        <el-checkbox-group v-model="lead.industryList">
                            <el-checkbox v-for="item in industryList" :label="item.value" :key="item.label">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="所属单位" :label-width="formLabelWidth" prop="organization">
                        <el-input v-model="lead.organization " auto-complete="off" placeholder="请输入目前所属单位"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="职位" :label-width="formLabelWidth" prop="position">
                        <el-input v-model="lead.position" auto-complete="off" placeholder="请输入目前职位"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="籍贯 " prop="leadRegionOptions">
                        <el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="lead.leadRegionOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="常驻地区 " prop="leadUsualPlaceOptions">
                        <el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="lead.leadUsualPlaceOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="个人情况" prop="industryLevel">
                        <el-radio-group v-model="lead.industryLevel">
                            <el-radio v-for="item in personalList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="企业名称" :label-width="formLabelWidth" prop="enterpriseName">
                        <el-input v-model="lead.enterpriseName" auto-complete="off" placeholder="请输入企业名称"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="统一社会信用代码" :label-width="formLabelWidth" prop="creditCode">
                        <el-input v-model="lead.creditCode" auto-complete="off" placeholder="请输入统一社会信用代码"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="所在地区" :label-width="formLabelWidth" prop="leadRegionOptions">
                        <el-cascader size="large" :options="options" v-model="lead.leadRegionOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="企业情况" prop="industryLevel">
                        <el-radio-group v-model="lead.industryLevel">
                            <el-radio v-for="item in enterpriseList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="已投项目">
                        <el-input type="textarea" v-model="lead.investment" placeholder="请输入已投资的项目名称、尽量填写完整"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="姓名" :label-width="formLabelWidth" prop="representative">
                        <el-input v-model="lead.representative" auto-complete="off" placeholder="请输入法定代表人姓名"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="身份证号" :label-width="formLabelWidth" prop="representativeIdentNumber">
                        <el-input v-model="lead.representativeIdentNumber" auto-complete="off" placeholder="请输入法定代表人身份证号">
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="手机号" :label-width="formLabelWidth" prop="representativeMobileNumber">
                        <el-input v-model="lead.representativeMobileNumber" auto-complete="off" value="" placeholder="请输入法定代表人手机号"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="营业执照">
                        <el-upload class="upload-demo" ref="upload" action="/ajax/image_uploadByFile" :data="fileParam" list-type="picture-card" :show-file-list="true" :auto-upload="false" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="businessLicenseSuccess">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px; position:absolute; right:0; bottom:20px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="agree" style="margin-bottom: 5px;">
                        <el-checkbox v-model="lead.agree" label="我已知股权投资是一种高风险投资，是一种没有固定收益和固定期限的投资" name=""></el-checkbox>
                    </el-form-item>
                    <el-form-item prop="promise">
                        <el-checkbox v-model="lead.promise" label="我承诺以上登记的所有信息属实，并对虚假信息产生的一切后果负责" name=""></el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel('lead')">取 消</el-button>
                    <el-button type="primary" @click="leadNameValidate">确 认</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="p-form">
            <el-dialog title="领投认证" :visible.sync="viewLeadDialog" @close="cancel('viewLead')" :close-on-click-modal="false">
                <el-form ref="viewLead" :model="leadData" >
                    <el-row>
                        <el-col :span="24" style="text-align: center;padding: 10px 10px;">
                            <span >{{leadData.institution?"机构领投":"个人领投"}}</span>
                        </el-col>
                    </el-row>
                    <el-form-item label="手机号" :label-width="formLabelWidth" >
                        <span>{{leadData.mobileNumber}}</span>
                    </el-form-item>
                    <el-form-item label="真实姓名" :label-width="formLabelWidth" >
                        <span>{{leadData.realName}}</span>
                     </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" >
                        <span>{{leadData.identNumber}}</span>
                    </el-form-item>
                    <el-form-item  label="关注行业">
                        <span>{{leadData.industry|industry}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="所属单位" :label-width="formLabelWidth" >
                        <span>{{leadData.organization}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="职位" :label-width="formLabelWidth">
                        <span>{{leadData.position}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="籍贯 " >
                        <span>{{leadData.birthplace|address}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="常驻地区 ">
                        <span>{{leadData.permanent|address}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="个人情况">
                        <span>{{leadData.industryLevel|industryLevel}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="企业名称" :label-width="formLabelWidth" >
                        <span>{{leadData.enterpriseName}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="统一社会信用代码" :label-width="formLabelWidth">
                        <span>{{leadData.creditCode}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="所在地区" :label-width="formLabelWidth" >
                       <span>{{leadData.regionCode|address}}</span>          
                    </el-form-item>
                    <el-form-item v-if="show==2" label="企业情况">
                        <span>{{leadData.industryLevel|industryLevel}}</span>
                    </el-form-item>
                    <el-form-item label="已投项目">
                        <span>{{leadData.investment}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="姓名" :label-width="formLabelWidth" >
                        <span>{{leadData.representative}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="身份证号" :label-width="formLabelWidth" >
                        <span>{{leadData.representativeIdentNumber}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="手机号" :label-width="formLabelWidth" >
                       <span>{{leadData.representativeMobileNumber}}</span>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="营业执照">
                        <span>{{leadData.businessLicense}}</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="cancel('viewLead')">确 认</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="p-form">
            <el-dialog title="领投认证" :visible.sync="editLeadDialog" @close="cancel('editLead')" :close-on-click-modal="false">
                <el-form ref="editLead" :model="leadData" :rules="leadRule">
                    <el-row>
                        <el-col :span="12" style="text-align: right;padding: 10px 10px;">
                            <el-button @click="menuclick(1)" :class="isActive&show==1 ? active : ''" type="text">我个人领投</el-button>
                        </el-col>
                        <el-col :span="12" style="text-align: left;padding: 10px 10px;">
                            <el-button @click="menuclick(2)" :class="isActive&&show==2 ? active : ''" type="text">我代表机构</el-button>
                        </el-col>
                    </el-row>
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="leadData.mobileNumber" auto-complete="off" value="" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
                        <el-input v-model="leadData.realName" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="identNumber">
                        <el-input v-model="leadData.identNumber" auto-complete="off" :readonly="customer.realName?true:false">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="关注行业" >
                        <el-checkbox-group v-model="newIndustryList">
                            <el-checkbox v-for="item in industryList" :label="item.value" :key="item.label">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="所属单位" :label-width="formLabelWidth" prop="organization">
                        <el-input v-model="leadData.organization " auto-complete="off" placeholder="请输入目前所属单位"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="职位" :label-width="formLabelWidth" prop="position">
                        <el-input v-model="leadData.position" auto-complete="off" placeholder="请输入目前职位"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="籍贯 " prop="leadRegionOptions">
                        <el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="leadData.leadRegionOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="常驻地区 " prop="leadUsualPlaceOptions">
                        <el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="leadData.leadUsualPlaceOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item v-if="show==1" label="个人情况" prop="industryLevel">
                        <el-radio-group v-model="leadData.industryLevel">
                            <el-radio v-for="item in personalList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="企业名称" :label-width="formLabelWidth" prop="enterpriseName">
                        <el-input v-model="leadData.enterpriseName" auto-complete="off" placeholder="请输入企业名称"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="统一社会信用代码" :label-width="formLabelWidth" prop="creditCode">
                        <el-input v-model="leadData.creditCode" auto-complete="off" placeholder="请输入统一社会信用代码"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="所在地区" :label-width="formLabelWidth" >
                        <el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="leadData.leadRegionOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="企业情况" prop="industryLevel">
                        <el-radio-group v-model="leadData.industryLevel">
                            <el-radio v-for="item in enterpriseList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="已投项目">
                        <el-input type="textarea" v-model="leadData.investment" placeholder="请输入已投资的项目名称、尽量填写完整"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="姓名" :label-width="formLabelWidth" prop="representative">
                        <el-input v-model="leadData.representative" auto-complete="off" placeholder="请输入法定代表人姓名"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="身份证号" :label-width="formLabelWidth" prop="representativeIdentNumber">
                        <el-input v-model="leadData.representativeIdentNumber" auto-complete="off" placeholder="请输入法定代表人身份证号">
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="手机号" :label-width="formLabelWidth" prop="representativeMobileNumber">
                        <el-input v-model="leadData.representativeMobileNumber" auto-complete="off" value="" placeholder="请输入法定代表人手机号"></el-input>
                    </el-form-item>
                    <el-form-item v-if="show==2" label="营业执照">
                        <el-upload class="upload-demo" ref="upload" action="/ajax/image_uploadByFile" :data="fileParam" list-type="picture-card" :show-file-list="true" :auto-upload="false" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="updateBusinessLicenseSuccess">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px; position:absolute; right:0; bottom:20px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="agree" style="margin-bottom: 5px;">
                        <el-checkbox v-model="leadData.agree" label="我已知股权投资是一种高风险投资，是一种没有固定收益和固定期限的投资" name=""></el-checkbox>
                    </el-form-item>
                    <el-form-item prop="promise">
                        <el-checkbox v-model="leadData.promise" label="我承诺以上登记的所有信息属实，并对虚假信息产生的一切后果负责" name=""></el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel('editLead')">取 消</el-button>
                    <el-button type="primary" @click="updateLead">确 认</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="p-form">
            <el-dialog title="合格投资人认证" :visible.sync="investorDialog" @close="cancel('investor')" :close-on-click-modal="false">
                <el-form ref="investor" :model="investor" :rules="investorRule">
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobileNumber">
                        <el-input v-model="investor.mobileNumber" auto-complete="off" value="" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
                        <el-input v-model="investor.realName" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="identNumber">
                        <el-input v-model="investor.identNumber" auto-complete="off" :readonly="customer.realName?true:false">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="关注行业" prop="industry">
                        <el-checkbox-group v-model="investor.industryList">
                            <el-checkbox v-for="item in industryList" :label="item.value" :key="item.label">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="所属单位" :label-width="formLabelWidth" prop="organization">
                        <el-input v-model="investor.organization " auto-complete="off" placeholder="请填写目前所属单位"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" :label-width="formLabelWidth" prop="position">
                        <el-input v-model="investor.position" auto-complete="off" placeholder="请填写目前职位"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯 " prop="investorRegionOptions">
                        <el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="investor.investorRegionOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="常驻地区 " prop="investorUsualPlaceOptions">
                        <el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="investor.investorUsualPlaceOptions" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="个人情况" prop="industryLevel">
                        <el-radio-group v-model="investor.industryLevel">
                            <el-radio v-for="item in investorPersonalOptions" :label="item.value" :key="item.label">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="agree" style="margin-bottom: 5px;">
                        <el-checkbox v-model="investor.agree" label="我已知股权投资是一种高风险投资，是一种没有固定收益和固定期限的投资" name=""></el-checkbox>
                    </el-form-item>
                    <el-form-item prop="promise">
                        <el-checkbox v-model="investor.promise" label="我承诺以上登记的所有信息属实，并对虚假信息产生的一切后果负责" name=""></el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel('investor')">取 消</el-button>
                    <el-button type="primary" @click="investorNameValidate">确 认</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="p-form">
			<el-dialog title="口令信息" :visible.sync="resetPasswordVisible" @close="resetPasswordVisible=false" :close-on-click-modal="false">
				<el-form>
					<el-form-item  label="重置口令：">
						<span style="color:red">{{resetPassword1}}</span>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
				</div>
			</el-dialog>
		</div>
    </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import industryList from '../../../constant/industry.js'
import personalList from '../../../constant/personal.js'
import investorPersonalList from '../../../constant/investorPersonal.js'
import enterpriseList from '../../../constant/enterprise.js'
import { getSelectArray,getIndustryByArray } from '../../../util/index.js'
import _ from 'lodash'

export default {
    // props:['customer','actor'],
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.password.newPassword !== '') {
                    this.$refs.editPassword.validateField('newPassword');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.password.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validateCheckbox = (rule, value, callback) => {
            if (value === false) {
                callback(new Error('请勾选同意'));
            } else {
                callback();
            }
        };
        return {
            resetPassword1:'',
            industryObj: '',
            workYearsObj: '',
            resetPasswordVisible:false,
            uploadList: [],
            newIndustryList:[],
            fileParam: {},
            industryArr: {
                industry: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
                workYears: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' },
            },
            active: 'tab-active',
            options: regionData,
            selectedOptions: [],
            regionOptions: [],
            usualPlaceOptions: [],
            industryList: industryList,
            investorPersonalOptions:investorPersonalList,
            personalList: personalList,
            enterpriseList: enterpriseList,
            password: {
                newPassword: '',
                password: ''
            },
            payPassword: {
                payPassword: '',
                phoneValidate: '',
                password: ''
            },
            expert: {
                realName: '',
                identNumber: '',
                mobileNumber: '',
                expertRegionOptions: [],
                expertUsualPlaceOptions: [],
                regionCode: '',
                permanent: '',
                id: '',
                industry: '',
                newIndustry: '',
                industryList: [],
                newIndustryList: [],
                industryLevel: 0,
                organization: '',
                position: '',
                businessCard: '',
                credentials: '',
                profile: '',
                rejection: '',
                agree: true,
            },
            lead: {
                name: '',
                identNumber: '',
                mobileNumber: '',
                id: '',
                industry: '',
                industryList: [],
                industryLevel: '',
                organization: '',
                position: '',
                enterpriseName: '',
                creditCode: '',
                leadRegionOptions: [],
                leadUsualPlaceOptions: [],
                regionCode: '',
                usualPlace: '',
                investment: '',
                representative: '',
                representativeIdentNumber: '',
                representativeMobileNumber: '',
                businessLicenseURL: '',
                agree: true,
                promise: true,
            },
            investor: {
                name: '',
                identNumber: '',
                mobileNumber: '',
                id: '',
                industry: '',
                industryLevel: '',
                industryList: [],
                personalList: [],
                organization: '',
                position: '',
                investorRegionOptions: [],
                investorUsualPlaceOptions: [],
                usualPlace: '',
                regionCode: '',
                agree: true,
                promise: true,
            },
            formLabelWidth: "120px",
            dialogFormVisible: false,
            realNameDialog: false,
            expertDialog: false,
            viewExpertDialog: false,
            editExpertDialog: false,
            leadDialog: false,
            viewLeadDialog:false,
            editLeadDialog:false,
            investorDialog: false,
            show: 1,
            isActive: true,
            actorRules: {
                mobileNumber: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ]
            },
            editPasswordRule: {
                oldPassword: [
                    { required: true, message: '请输入原始密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' }
                ],
            },
            payPasswordRule: {
                payPassword: [
                    { required: true, message: '请输入支付密码', trigger: 'blur' }
                ],
                phoneValidate: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' }
                ],
            },
            realNameRule: {
                mobileNumber: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    // { pattern: /^[\u4E00-\u9FA5]+$/, message: '姓名只能为中文', trigger: 'blur' }
                ],
                identNumber: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确', trigger: 'blur' }
                ],
            },
            expertRule: {
                mobileNumber: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    // { pattern: /^[\u4E00-\u9FA5]+$/, message: '姓名只能为中文', trigger: 'blur' }
                ],
                identNumber: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确', trigger: 'blur' }
                ],
                organization: [
                    { required: true, message: '请输入单位名称', trigger: 'blur' },
                ],
                position: [
                    { required: true, message: '请输入职位', trigger: 'blur' },
                ],
                expertRegionOptions: [
                    { required: true, message: '请选择籍贯', trigger: 'blur,change', type: 'array' }
                ],
                expertUsualPlaceOptions: [
                    { required: true, message: '请选择常驻地区', trigger: 'blur,change', type: 'array' }
                ],
                agree: [
                    { validator: validateCheckbox, trigger: 'blur,change' }
                ],
            },
            leadRule: {
                mobileNumber: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    // { pattern: /^[\u4E00-\u9FA5]+$/, message: '姓名只能为中文', trigger: 'blur' }
                ],
                identNumber: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确', trigger: 'blur' }
                ],
                industryList: [
                    { required: true, message: '请选择行业', trigger: 'blur', type: 'array' },
                ],
                organization: [
                    { required: true, message: '请输入单位名称', trigger: 'blur' },
                ],
                position: [
                    { required: true, message: '请输入职位', trigger: 'blur' },
                ],
                leadRegionOptions: [
                    { required: true, message: '请选择籍贯', trigger: 'blur,change', type: 'array' }
                ],
                leadUsualPlaceOptions: [
                    { required: true, message: '请选择常驻地区', trigger: 'blur,change', type: 'array' }
                ],
                enterpriseName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' },
                ],
                creditCode: [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
                ],
                representative: [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' },
                    // { pattern: /^[\u4E00-\u9FA5]+$/, message: '姓名只能为中文', trigger: 'blur' }
                ],
                representativeIdentNumber: [
                    { required: true, message: '请输入法人身份证', trigger: 'blur' },
                    { pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确', trigger: 'blur' }
                ],
                representativeMobileNumber: [
                    { required: true, message: '请输入法人手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                ],
                agree: [
                    { validator: validateCheckbox, trigger: 'blur,change' }
                ],
                promise: [
                    { validator: validateCheckbox, trigger: 'blur,change' }
                ],
                industryLevel: [
                    { required: true, message: '请选择行业水平', trigger: 'blur,change', type: 'number' }
                ],
            },
            investorRule: {
                mobileNumber: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    // { pattern: /^[\u4E00-\u9FA5]+$/, message: '姓名只能为中文', trigger: 'blur' }
                ],
                identNumber: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确', trigger: 'blur' }
                ],
                organization: [
                    { required: true, message: '请输入单位名称', trigger: 'blur' },
                ],
                position: [
                    { required: true, message: '请输入职位', trigger: 'blur' },
                ],
                investorRegionOptions: [
                    { required: true, message: '请选择籍贯', trigger: 'blur,change', type: 'array' }
                ],
                investorUsualPlaceOptions: [
                    { required: true, message: '请选择常驻地区', trigger: 'blur,change', type: 'array' }
                ],
                agree: [
                    { validator: validateCheckbox, trigger: 'blur,change' }
                ],
                promise: [
                    { validator: validateCheckbox, trigger: 'blur,change' }
                ],
            },
        }
    },
    computed: {
        customer: function () {
            return this.$store.state.customer.customerInfoByCustomerId;
        },
        actor: function () {
            return this.$store.state.customer.customerInfoByActorId;
        },
        updateMobileAndEmailByIdStatus: function () {
            return this.$store.state.customer.updateMobileAndEmailByIdStatus;
        },
        resetLoginPasswordStatus: function () {
            return this.$store.state.customer.resetLoginPasswordStatus;
        },
        loginPasswordStatus: function () {
            return this.$store.state.customer.loginPasswordStatus;
        },
        payPasswordUpdate: function () {
            return this.$store.state.customer.payPasswordUpdate;
        },
        realNameVaildate: function () {
            return this.$store.state.customer.nameVaildate;
        },
        expertVaildateStatus: function () {
            return this.$store.state.customer.expertVaildateStatus;
        },
        updateExpertStatus: function () {
            return this.$store.state.customer.updateExpertStatus;
        },
        personalLeadVaildateStatus: function () {
            return this.$store.state.customer.personalLeadVaildateStatus;
        },
        updatePersonalLeadStatus: function () {
            return this.$store.state.customer.updatePersonalLeadStatus;
        },
        organizationLeadVaildateStatus: function () {
            return this.$store.state.customer.organizationLeadVaildateStatus;
        },
        updateOrganizationLeadStatus: function () {
            return this.$store.state.customer.updateOrganizationLeadStatus;
        },
        investorVaildateStatus: function () {
            return this.$store.state.customer.investorVaildateStatus;
        },
        expertData: function () {
            return this.$store.state.customer.expertData||{agree:true};
        },
        leadData: function () {
            return this.$store.state.customer.leadData||{agree:true,promise:true};
        },

    },
    mounted() {
        this.customerInit();
    },
    methods: {
        customerInit() {
            let actorParams = {
                id: this.$route.params.actorId
            }
            this.$store.dispatch('customerInfoByActorId', actorParams).then(()=>{
                if(this.actor.email){
                    this.actor.email=this.actor.email.address;
                }else{
                    this.actor.email='';
                }
            })
            let customerParams = {
                id: this.$route.params.customerId
            }
            this.$store.dispatch('customerInfoByCustomerId', customerParams);
        },
        editAccount() {
            this.$refs['actor'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('updateMobileAndEmailById', this.actor).then(() => {
                        if (this.updateMobileAndEmailByIdStatus.success) {
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            })
                            this.customerInit();
                            this.dialogFormVisible = false;

                        } else {
                            this.customerInit();
                            this.$message.error(this.updateMobileAndEmailByIdStatus.information);
                        }
                    });
                }
            });
        },
        resetPassword() {
            this.$confirm('此操作将重置客户登录口令, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let resetParam = {
                    id: this.actor.id
                }
                this.$store.dispatch('resetLoginPwById', resetParam).then(() => {
                    if (this.resetLoginPasswordStatus.head.success) {
                        this.$message({
                            message: '重置口令成功！',
                            type: 'success'
                        })
                        this.resetPassword1=JSON.parse(this.resetLoginPasswordStatus.objectLiteral);
                        this.resetPasswordVisible=true;
                        this.customerInit();
                        this.cancel();
                    } else {
                        this.$message.error('重置口令失败！');
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消重置'
                });
            });
        },
        setPayPassword() {
            this.$confirm('此操作将修改客户支付口令, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let setPayPasswordParams = {
                    id: this.$route.params.actorId,
                }
                this.$store.dispatch('updatePayPassword', setPayPasswordParams).then(() => {
                    if (this.payPasswordUpdate.success) {
                        this.$message({
                            type: 'success',
                            message: '重置成功!'
                        });
                    } else {
                        this.$message.error(this.payPasswordUpdate.information);
                    }
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消重置'
                });
            });
        },
        nameVaildate() {
            this.$refs['realName'].validate((valid) => {
                if (valid) {
                    let realNameParams = {
                        tel: this.actor.mobileNumber,
                        customerName: this.actor.name,
                        identNumber: this.actor.identNumber,
                        actorId: this.$route.params.actorId,
                    }
                    this.$store.dispatch('realNameVaildate', realNameParams).then(() => {
                        if (this.realNameVaildate.success) {
                            this.$message({
                                type: 'success',
                                message: '认证成功!'
                            });
                            this.customerInit();
                            this.cancel('realName');
                        } else {
                            this.$message.error(this.realNameVaildate.information);
                        }
                    })
                }
            });
        },
        expertClick() {
            this.expert.realName = this.actor.name;
            this.expert.mobileNumber = this.actor.mobileNumber;
            this.expert.identNumber = this.actor.identNumber;
            this.expertDialog = true;
        },
        expertNameVaildate() {
            this.$refs['expert'].validate((valid) => {
                if (valid) {
                    if (!this.customer.realName) {
                        let realNameParams = {
                            tel: this.expert.mobileNumber,
                            customerName: this.expert.realName,
                            identNumber: this.expert.identNumber,
                            actorId: this.$route.params.actorId,
                        }
                        this.$store.dispatch('realNameVaildate', realNameParams).then(() => {
                            if (this.realNameVaildate.success) {
                                this.$message({
                                    type: 'success',
                                    message: '实名认证成功!'
                                });
                                this.expertVaildate();
                            } else {
                                this.$message.error(this.realNameVaildate.information);
                            }
                        })
                    } else {
                        this.expertVaildate();
                    }

                }
            })
        },
        expertVaildate() {
            this.expert.industry = JSON.stringify(this.industryArr);
            this.expert.newIndustry = getIndustryByArray(this.industryArr.industry);
            this.expert.actorId = this.$route.params.actorId;
            this.expert.regionCode = this.expert.expertRegionOptions.length==0?'':this.expert.expertRegionOptions[this.expert.expertRegionOptions.length-1];
            this.expert.permanent =  this.expert.expertUsualPlaceOptions.length==0?'':this.expert.expertUsualPlaceOptions[this.expert.expertUsualPlaceOptions.length-1];
            this.$store.dispatch('expertVaildate', this.expert).then(() => {
                if (this.expertVaildateStatus.success) {
                    this.$message({
                        type: 'success',
                        message: '已提交认证等待审核!'
                    });
                    this.customerInit();
                    this.cancel('expert');
                } else {
                    this.$message.error(this.expertVaildateStatus.information);
                }
            })
        },
        queryExpert() {
            let expertParam = {
                id: this.$route.params.actorId
            }
            this.$store.dispatch('expertByActorId', expertParam).then(() => {
                if (this.expertData.industry) {
                    var obj = JSON.parse(this.expertData.industry)
                    this.industryObj = obj.industry;
                    this.workYearsObj = obj.workYears;
                }
                this.viewExpertDialog = true;
            })
        },
        editExpertClick() {
            let expertParam = {
                id: this.$route.params.actorId
            }
            this.$store.dispatch('expertByActorId', expertParam).then(() => {
                // this.expertData.newIndustryList = [];
                this.expertData.expertRegionOptions = [];
                this.expertData.expertUsualPlaceOptions = [];
                this.expertData.agree = true;
                if (this.expertData.industryExp) {
                    var obj = JSON.parse(this.expertData.industryExp)
                    this.industryObj = obj.industry;
                    this.workYearsObj = obj.workYears;
                }
                if (this.expertData.regionCode) {
                    this.expertData.expertRegionOptions=getSelectArray(this.expertData.regionCode)                  
                }
                if (this.expertData.permanent) {
                    this.expertData.expertUsualPlaceOptions=getSelectArray(this.expertData.permanent)
                }
                this.editExpertDialog = true;
            })
        },
        updateExpert() {
            this.$refs['editExpert'].validate((valid) => {
                if (valid) {
                    let industryObject = {
                        industry: this.industryObj,
                        workYears:this.workYearsObj
                    }
                    this.expertData.industry = JSON.stringify(industryObject);
                    this.expertData.newIndustry = getIndustryByArray(this.industryObj);
                    this.expertData.regionCode = this.expertData.expertRegionOptions.length==0?'':this.expertData.expertRegionOptions[this.expertData.expertRegionOptions.length-1];this.expertData.expertRegionOptions[2];
                    this.expertData.permanent = this.expertData.expertUsualPlaceOptions.length==0?'':this.expertData.expertUsualPlaceOptions[this.expertData.expertUsualPlaceOptions.length-1];this.expertData.expertUsualPlaceOptions[2];
                    let updateExpertParam = {
                        expertObject: this.expertData,
                        actorId: this.$route.params.actorId
                    }
                    this.$store.dispatch('updateExpert', updateExpertParam).then(() => {
                        if (this.updateExpertStatus.success) {
                            this.$message({
                                type: 'success',
                                message: '已重新提交认证等待审核!!'
                            });
                            this.customerInit();
                            this.cancel('editExpert');
                        }
                    })
                }
            })
        },
        leadClick() {
            this.lead.realName = this.actor.name;
            this.lead.mobileNumber = this.actor.mobileNumber;
            this.lead.identNumber = this.actor.identNumber;
            this.leadDialog = true;
        },
        leadNameValidate() {
            this.$refs['lead'].validate((valid) => {
                if (valid) {
                    if (!this.customer.realName) {
                        let realNameParams = {
                            tel: this.lead.mobileNumber,
                            customerName: this.lead.realName,
                            identNumber: this.lead.identNumber,
                            actorId: this.$route.params.actorId,
                        }
                        this.$store.dispatch('realNameVaildate', realNameParams).then(() => {
                            if (this.realNameVaildate.success) {
                                this.$message({
                                    type: 'success',
                                    message: '实名认证成功!'
                                });
                                this.leadValidate();
                            } else {
                                this.$message.error(this.realNameVaildate.information);
                            }
                        })
                    } else {
                        this.leadValidate();
                    }
                }
            })
        },
        leadValidate() {
            this.lead.industry = _.sum(this.lead.industryList);
            this.lead.regionCode = this.lead.leadRegionOptions.length>0?this.lead.leadRegionOptions[this.lead.leadRegionOptions.length-1]:'';
            this.lead.birthplace = this.lead.leadRegionOptions.length>0?this.lead.leadRegionOptions[this.lead.leadRegionOptions.length-1]:'';
            this.lead.permanent = this.lead.leadUsualPlaceOptions.length>0?this.lead.leadUsualPlaceOptions[this.lead.leadUsualPlaceOptions.length-1]:'';
            let leadParam = {
                actorId: this.$route.params.actorId,
                leadObject: this.lead,
            }
            if (this.show == 1) {
                this.$store.dispatch('personalLeadVaildate', leadParam).then(() => {
                    if (this.personalLeadVaildateStatus.success) {
                        this.$message.success('已提交认证等待审核!');
                        this.customerInit();
                        this.cancel('lead');
                    } else {
                        this.$message.error(this.personalLeadVaildateStatus.information);
                    }
                })
            } else {
                this.$store.dispatch('organizationLeadVaildate', leadParam).then(() => {
                    if (this.organizationLeadVaildateStatus.success) {
                        this.$message({
                            type: 'success',
                            message: '已提交认证等待审核!'
                        });
                        this.customerInit();
                        this.cancel('lead');
                    } else {
                        this.$message.error(this.organizationLeadVaildateStatus.information);
                    }
                })
            }

        },
        queryLead() {
            let leadParam = {
                id: this.$route.params.actorId
            }
            this.$store.dispatch('leadByActorId', leadParam).then(() => {
                this.viewLeadDialog  = true;
            })
        },
        editLeadClick(){
             let leadParam = {
                id: this.$route.params.actorId
            }
            this.$store.dispatch('leadByActorId', leadParam).then(() => {
                if(this.leadData.institution){
                    this.menuclick(2)
                }else{
                    this.menuclick(1)
                }
                this.leadData.leadRegionOptions = [];
                this.newIndustryList=this.leadData.industryLed||[];
                this.leadData.agree = true;
                this.leadData.promise = true;
                // this.leadData.industryList = [];
                if (this.leadData.regionCode) {
                    this.leadData.leadRegionOptions=getSelectArray(this.leadData.regionCode);
                }
                if (this.leadData.birthplace) {
                    this.leadData.leadRegionOptions=getSelectArray(this.leadData.birthplace);
                }
                if (this.leadData.permanent) {
                    this.leadData.leadUsualPlaceOptions=getSelectArray(this.leadData.permanent);
                }
                this.editLeadDialog  = true;
            })
        },
        updateLead(){
            this.$refs['editLead'].validate((valid) => {
                if (valid) {
                    this.leadData.industryLed =  _.sum(this.newIndustryList);
                   if(this.leadData.leadRegionOptions) {
                       this.leadData.regionCode = this.leadData.leadRegionOptions.length>0?this.leadData.leadRegionOptions[this.leadData.leadRegionOptions.length-1]:'';
                       this.leadData.birthplace = this.leadData.leadRegionOptions.length>0?this.leadData.leadRegionOptions[this.leadData.leadRegionOptions.length-1]:'';
                   }
                   if(this.leadData.leadUsualPlaceOptions){
                       this.leadData.permanent = this.leadData.leadUsualPlaceOptions.length>0?this.leadData.leadUsualPlaceOptions[this.leadData.leadUsualPlaceOptions.length-1]:'';
                   }    
                    if(this.show ==1){
                        this.leadData.institution = 0
                        let updateLeadParam = {
                            leadObject: this.leadData,
                            actorId: this.$route.params.actorId
                        }
                        this.$store.dispatch('updatePersonalLead', updateLeadParam).then(() => {
                            if (this.updatePersonalLeadStatus.success) {
                                this.$message({
                                    type: 'success',
                                    message: '已重新提交认证等待审核!!'
                                });
                                this.customerInit();
                                this.cancel('editLead');
                            }
                        })
                    }else{
                         this.leadData.institution = 1
                         let updateLeadParam = {
                            leadObject: this.leadData,
                            actorId: this.$route.params.actorId
                        }
                        this.$store.dispatch('updateOrganizationLead', updateLeadParam).then(() => {
                            if (this.updateOrganizationLeadStatus.success) {
                                this.$message({
                                    type: 'success',
                                    message: '已重新提交认证等待审核!!'
                                });
                                this.customerInit();
                                this.cancel('editLead');
                            }
                        })
                    }
                }
            })
        },
        investorClick() {
            this.investor.realName = this.actor.name;
            this.investor.mobileNumber = this.actor.mobileNumber;
            this.investor.identNumber = this.actor.identNumber;
            this.investorDialog = true;
        },
        investorNameValidate() {
            this.$refs['investor'].validate((valid) => {
                if (valid) {
                    if (!this.customer.realName) {
                        let realNameParams = {
                            tel: this.investor.mobileNumber,
                            customerName: this.investor.realName,
                            identNumber: this.investor.identNumber,
                            actorId: this.$route.params.actorId,
                        }
                        this.$store.dispatch('realNameVaildate', realNameParams).then(() => {
                            if (this.realNameVaildate.success) {
                                this.$message({
                                    type: 'success',
                                    message: '实名认证成功!'
                                });
                                this.investorValidate();
                            } else {
                                this.$message.error(this.realNameVaildate.information);
                            }
                        })
                    } else {
                        this.investorValidate();
                    }
                }
            })
        },
        investorValidate() {
            this.investor.industry = _.sum(this.investor.industryList);
            this.investor.actorId = this.$route.params.actorId;
            this.investor.usualPlace = this.investor.investorUsualPlaceOptions.length>0?this.investor.investorUsualPlaceOptions[this.investor.investorUsualPlaceOptions.length-1]:'';
            this.investor.regionCode = this.investor.investorRegionOptions.length>0?this.investor.investorRegionOptions[this.investor.investorRegionOptions.length-1]:'';
            this.$store.dispatch('investorVaildate', this.investor).then(() => {
                if (this.investorVaildateStatus.success) {
                    this.$message({
                        type: 'success',
                         message: '认证成功!'
                    });
                    this.customerInit();
                    this.cancel('investor');
                } else {
                    this.$message.error(this.investorVaildateStatus.information);
                }
            })
        },
        cancel(formName) {
            try {
                if(this.$refs[formName]){
                    this.$refs[formName].resetFields();
                }
            } catch (error) {
                
            }
            
            this.editPasswordDialog = false;
            this.expertDialog = false;
            this.leadDialog = false;
            this.investorDialog = false;
            this.dialogFormVisible = false;
            this.realNameDialog = false;
            this.viewExpertDialog = false;
            this.editExpertDialog = false;
            this.viewLeadDialog = false;
            this.editLeadDialog = false;
        },
        menuclick(n) {
            this.show = n;
            switch (n) {
                case 1:
                    this.isActive = true;

                    break;
                case 2:
                    this.isActive = true;

                    break;
                default:
                    this.isActive = false;
                    break;
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleChange(value) {
            console.log(value)
        },
        submitUpload() {
            if(this.$refs.uploadBusinessCard){
                this.$refs.uploadBusinessCard.submit();
            }
            if(this.$refs.uploadCredentials){
                this.$refs.uploadCredentials.submit();
            }
            if(this.$refs.upload){
                this.$refs.upload.submit();
            }
        },
        beforeAvatarUpload(file) {
            let isPic = false;
            let fileSize = file.size / 1024 / 1024;
            let fileType = file.type;
            if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif') {
                isPic = true;
            }
            const isLt50 = fileSize < 1;
            if (!isPic) {
                this.$message.error('上传的图片格式为png、jpg、gif!');
                return isPic;
            } else if (!isLt50) {
                this.$message.error('上传图片大小不能超过 1M!');
                return isLt50;
            } else {
                this.fileParam.fileName = file.name;
                this.fileParam.fileType = 1;
                //this.fileParam.uploadUseId=this.$store.state.login.actor.id;
                //this.fileParam.bannerSize=fileSize.toFixed(3);
            }
            return isPic && isLt50;
        },
        //上传成功时返回的数据
        businessCardSuccess(data, file, fileList) {
            console.log(data);
            if (data) {
                this.$message.success('上传图片成功');
                this.expert.businessCard = data;
            }
        },
        //上传成功时返回的数据
        updateBusinessCardSuccess(data, file, fileList) {
            console.log(data);
            if (data) {
                this.$message.success('上传图片成功');
                this.expertData.businessCard = data;
            }
        },
        //上传成功时返回的数据
        credentialsSuccess(data, file, fileList) {
            console.log(data);
            if (data) {
                this.$message.success('上传图片成功');
                this.expert.credentials = data;
            }
        },
        //上传成功时返回的数据
        updateCredentialsSuccess(data, file, fileList) {
            console.log(data);
            if (data) {
                this.$message.success('上传图片成功');
                this.expertData.credentials = data;
            }
        },
        //上传成功时返回的数据
        businessLicenseSuccess(data, file, fileList) {
            console.log(data);
            if (data) {
                this.$message.success('上传图片成功');
                this.lead.businessLicenseURL = data;
            }
        },
        //上传成功时返回的数据
        updateBusinessLicenseSuccess(data, file, fileList) {
            if (data) {
                this.$message.success('上传图片成功');
                this.leadData.businessLicenseURL = data;
            }
        },

    }
}

</script>

<style>
p {
    margin: 0;
}

.account-box {
    width: 70%;
    margin: 0 auto;
    padding-top: 30px;
    background-color: #fff;
}

.ac-col-1,
.ac-col-2-1,
.ac-col-3-3,
.ac-col-3,
.ac-col-2,
.ac-col-2-2,
.ac-col-4 {
    padding: 6px 0;
}

.ac-col-1,
.ac-col-2-1 {
    color: #777;
}

.ac-col-1,
.ac-col-2-1,
.ac-col-3-3,
.ac-col-3 {
    border-right: 1px solid #ddd;
}

.account-box .ac-col-1 {
    margin: 0;
    text-align: center;
}

.ac-col-3-3,
.ac-col-3 {
    color: #ccc
}

.ac-col-2,
.ac-col-2-2 {
    color: #000;
    padding-left: 20px
}

.account-box .ac-col-2,
.account-box .ac-col-3 {
    text-align: left;
}

.account-box .ac-col-4,
.account-box .ac-col-2-1 {
    text-align: center;
}

.account-box .ac-col-3,
.account-box .ac-col-4,
.account-box .ac-col-2-1,
.account-box .ac-col-2-2 {
    line-height: 40px;
}

.account-box .ac-col-4 {
    color: #06ccb6;
    cursor: pointer;
}

.row-bg {
    background-color: #eceff1
}
</style>