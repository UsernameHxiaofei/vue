<template>
	<div id="accountInfo" style="width:100%;height: 100%;background: #fff;margin: auto;" class="account-box my-form">
		<el-row style="border-top:1px solid #eceff1" :class="{'row-bg':actor.category!=5}">
			<el-col :span="5">
				<div class="ac-col-2-1">
					<p>融资人认证</p>
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
				<div class="ac-col-4" @click="clickRealNameValidate()" v-if="customer.realName==0">认证</div>
				<div class="ac-col-4" v-if="customer.realName==1" @click="showRealNameValidate()">查看</div>
			</el-col>
		</el-row>
		<el-row class="row-bg" v-if="actor.category==5">
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
				<div class="ac-col-3-3">评价推荐项目，获取高额佣金
					<br>行家推广传播，提高个人品牌</div>
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
				<div class="ac-col-3-3">领投实业项目，获取超额收益
					<br>领投推广传播，提升品牌形象</div>
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
			</el-col>
		</el-row>

		<div class="p-form">
			<el-dialog :title="actor.category == 5?'个人融资认证':'企业融资认证'" :visible.sync="realNameDialog" @close="cancel('realName')" :close-on-click-modal="false">
				<el-form :rules="realNameRule" :label-width="formLabelWidth" ref="realName" :model="actor">
					<el-form-item :label="actor.category == 5?'手机号':'代理人手机号'" prop="mobileNumber">
						<el-input v-model="actor.mobileNumber" :readonly="true" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item :label="actor.category == 5?'姓名':'代理人姓名'" prop="name">
						<el-input v-model="actor.name" :readonly="customer.realName==1" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item :label="actor.category == 5?'身份证号':'代理人身份证号'" prop="identNumber">
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
				<el-form :rules="expertRule" :label-width="formLabelWidth" ref="expert" :model="expert">
					<el-form-item label="手机号" prop="mobileNumber">
						<el-input v-model="expert.mobileNumber" auto-complete="off" :readonly="true"></el-input>
					</el-form-item>
					<el-form-item label="真实姓名" prop="realName">
						<el-input v-model="expert.realName" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
					</el-form-item>
					<el-form-item label="身份证号" prop="identNumber">
						<el-input v-model="expert.identNumber" auto-complete="off" :readonly="customer.realName?true:false"> </el-input>
					</el-form-item>
					<el-form-item label="专注行业" required>
						<div v-for="(item , i) in industryList" style="float: left;padding-right: 20px;">
							<el-checkbox v-model="industryArr.industry[item.value]" :label="item.value" :key="item.label">{{item.label}}
							</el-checkbox>
							<input type="number" v-model="industryArr.workYears[item.value]" :disabled="industryArr.industry[item.value]?false:true" number="true" class="el-pagination__editor"
							 style="width: 30px;line-height: 0px;">年
						</div>
					</el-form-item>
					<el-form-item label="所属单位" prop="organization">
						<el-input v-model="expert.organization" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="职位" prop="position">
						<el-input v-model="expert.position" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="常驻地区 " required>
						<el-cascader :options="options" expand-trigger="click" change-on-select clearable v-model="expert.expertUsualPlaceOptions">
						</el-cascader>
					</el-form-item>
					<el-form-item label="名片">
							<img style="width:200px;" v-show="expert.businessCard" :src="expert.businessCard">
						<el-upload class="upload-demo" ref="uploadBusinessCard" action="/ajax/image_uploadByFile" :data="fileParam" 
						 :show-file-list="false" :auto-upload="true" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="businessCardSuccess">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="专业性凭证">
						<img style="width:200px;" v-for="item in expert.credentialsObject" :key="item"  :src="item">
						<el-upload class="upload-demo" ref="uploadCredentials" action="/ajax/image_uploadByFile" :data="fileParam" 
						 :show-file-list="false" :auto-upload="true" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="credentialsSuccess">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
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
				<el-form ref="viewExpert" :label-width="formLabelWidth" :model="expertData">
					<el-form-item label="手机号">
						<span>{{expertData.mobileNumber}}</span>
					</el-form-item>
					<el-form-item label="真实姓名">
						<span>{{expertData.realName}}</span>
					</el-form-item>
					<el-form-item label="身份证号">
						<span>{{expertData.identNumber}}</span>
					</el-form-item>
					<el-form-item label="专注行业" required>
						<div style="float: left;padding-right: 20px;" v-for="(item,i) in industryList">
							<el-checkbox :disabled="true" v-model="industryObj[item.value]" :label="item.value" :key="item.label">{{item.label}}
							</el-checkbox>
							<input type="number" v-model="workYearsObj[item.value]" :disabled="true" number="true" class="el-pagination__editor" style="width: 30px;line-height: 0px;">年
						</div>
					</el-form-item>
					<el-form-item label="所属单位">
						<span>{{expertData.organization}}</span>
					</el-form-item>
					<el-form-item label="职位">
						<span>{{expertData.position}}</span>
					</el-form-item>
					<el-form-item label="常驻地区 ">
						<span>{{expertData.permanent|address}}</span>
					</el-form-item>
					<el-form-item label="名片">
						<img style="width:200px;" :src="expertData.businessCard">
					</el-form-item>
					<el-form-item label="专业性凭证">
						<img style="width:200px;" v-for="item in expertData.credentialsObject" :key="item"  :src="item">
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
				<el-form :rules="expertRule" :label-width="formLabelWidth" ref="editExpert" :model="expertData">
					<el-form-item label="手机号" prop="mobileNumber">
						<el-input v-model="expertData.mobileNumber" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
					</el-form-item>
					<el-form-item label="真实姓名" prop="realName">
						<el-input v-model="expertData.realName" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
					</el-form-item>
					<el-form-item label="身份证号" prop="identNumber">
						<el-input v-model="expertData.identNumber" auto-complete="off" :readonly="customer.realName?true:false">
						</el-input>
					</el-form-item>
					<el-form-item label="专注行业" required>
						<div v-for="(item , i) in industryList" style="float: left;padding-right: 20px;">
							<el-checkbox v-model="industryObj[item.value]" :label="item.value" :key="item.label">{{item.label}}
							</el-checkbox>
							<input type="number" v-model="workYearsObj[item.value]" :disabled="industryObj[item.value]?false:true" number="true" class="el-pagination__editor"
							 style="width: 30px;line-height: 0px;">年
						</div>
					</el-form-item>
					<el-form-item label="所属单位" prop="organization">
						<el-input v-model="expertData.organization" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="职位" prop="position">
						<el-input v-model="expertData.position" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="常驻地区 " required>
						<el-cascader size="large" :options="options" v-model="expertData.expertUsualPlaceOptions">
						</el-cascader>
					</el-form-item>
					<el-form-item label="名片">
						<img style="width:200px;" :src="expertData.businessCard">
						<el-upload class="upload-demo" ref="uploadBusinessCard" action="/ajax/image_uploadByFile" :data="fileParam" :show-file-list="false"
						 :auto-upload="true" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="updateBusinessCardSuccess">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="专业性凭证">
						
						<img style="width:200px;" v-for="item in expertData.credentialsObject" :key="item"  :src="item">
						<el-upload class="upload-demo" ref="uploadCredentials" action="/ajax/image_uploadByFile" :data="fileParam" :show-file-list="false"
						 :auto-upload="true" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="updateCredentialsSuccess">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
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
			<el-dialog :title="actor.category == 5?'个人领投认证':'企业领投认证'" :visible.sync="leadDialog" @close="cancel('lead')" :close-on-click-modal="false">
				<el-form ref="lead" :label-width="formLabelWidth" :model="lead" :rules="leadRule">
					<el-row>
						<h3 style="text-align:center">
							{{actor.category == 5?'个人领投认证':'企业领投认证'}}
						</h3>
					</el-row>
					<el-form-item :label="actor.category == 5?'手机号':'代理人手机号'" prop="mobileNumber">
						<el-input v-model="lead.mobileNumber" auto-complete="off" :readonly="true"></el-input>
					</el-form-item>
					<el-form-item :label="actor.category == 5?'真实姓名':'代理人真实姓名'" prop="realName">
						<el-input v-model="lead.realName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item :label="actor.category == 5?'身份证号':'代理人身份证号'" prop="identNumber">
						<el-input v-model="lead.identNumber" auto-complete="off">
						</el-input>
					</el-form-item>

					<el-form-item v-if="actor.category == 5" label="所属单位" prop="organization">
						<el-input v-model="lead.organization" auto-complete="off" placeholder="请输入目前所属单位"></el-input>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="职位" prop="position">
						<el-input v-model="lead.position" auto-complete="off" placeholder="请输入目前职位"></el-input>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="籍贯 " prop="leadRegionOptions">
						<el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="lead.leadRegionOptions">
						</el-cascader>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="常驻地区 " prop="leadUsualPlaceOptions">
						<el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="lead.leadUsualPlaceOptions">
						</el-cascader>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="个人情况" prop="industryLevel">
						<el-radio-group v-model="lead.industryLevel">
							<el-radio v-for="item in personalList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-if="actor.category == 4" label="企业情况" prop="industryLevel">
						<el-radio-group v-model="lead.industryLevel">
							<el-radio v-for="item in enterpriseList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="关注行业" prop="industryList">
						<el-checkbox-group v-model="lead.industryList">
							<el-checkbox v-for="item in industryList" :label="item.value" :key="item.label">{{item.label}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item v-if="actor.category == 4" label="营业执照">
							<img style="width:200px;" :src="lead.businessLicenseURL">
						<el-upload class="upload-demo" ref="upload" action="/ajax/image_uploadByFile" :data="fileParam" 
						 :show-file-list="false" :auto-upload="true" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="businessLicenseSuccess">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						</el-upload>
					</el-form-item>
					<!-- <el-form-item v-if="actor.category == 4" label="统一社会信用代码" prop="creditCode">
						<el-input v-model="lead.creditCode" auto-complete="off" placeholder="请输入统一社会信用代码"></el-input>
					</el-form-item>
					<el-form-item v-if="actor.category == 4" label="所在地区" prop="leadRegionOptions">
						<el-cascader size="large" :options="options" v-model="lead.leadRegionOptions">
						</el-cascader>
					</el-form-item> -->

					<el-form-item label="已投项目">
						<el-input type="textarea" v-model="lead.investment" placeholder="请输入已投资的项目名称、尽量填写完整"></el-input>
					</el-form-item>
					<el-form-item prop="agree">
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
			<el-dialog :title="actor.category == 5?'个人领投认证':'企业领投认证'" :visible.sync="viewLeadDialog" @close="cancel('viewLead')" :close-on-click-modal="false">
				<el-form ref="viewLead" :label-width="formLabelWidth" :model="leadData">
					<el-row>
						<h3 style="text-align:center">
							{{actor.category == 5?'个人领投认证':'企业领投认证'}}
						</h3>
					</el-row>
					<el-form-item :label="actor.category == 5?'手机号':'代理人手机号'">
						<span>{{leadData.mobileNumber}}</span>
					</el-form-item>
					<el-form-item :label="actor.category == 5?'真实姓名':'代理人真实姓名'">
						<span>{{leadData.realName}}</span>
					</el-form-item>
					<el-form-item :label="actor.category == 5?'身份证号':'代理人身份证号'">
						<span>{{leadData.identNumber}}</span>
					</el-form-item>
					<el-form-item label="关注行业">
						<span>{{leadData.industry|industry}}</span>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="所属单位">
						<span>{{leadData.organization}}</span>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="职位">
						<span>{{leadData.position}}</span>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="籍贯 ">
						<span>{{leadData.birthplace|address}}</span>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="常驻地区 ">
						<span>{{leadData.permanent|address}}</span>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="个人情况">
						<span>{{leadData.industryLevel|industryLevel}}</span>
					</el-form-item>
					<el-form-item v-if="actor.category == 4" label="企业情况">
						<span>{{leadData.industryLevel|enterpriseIndustryLevel}}</span>
					</el-form-item>
					<el-form-item label="已投项目">
						<span>{{leadData.investment}}</span>
					</el-form-item>
					<el-form-item v-if="actor.category == 4" label="营业执照">
						<span>
							<img style="width:200px" :src="leadData.businessLicenseURL" alt="">
						</span>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="cancel('viewLead')">确 认</el-button>
				</div>
			</el-dialog>
		</div>
		<div class="p-form">
			<el-dialog :title="actor.category == 5?'个人领投认证':'企业领投认证'" :visible.sync="editLeadDialog" @close="cancel('editLead')" :close-on-click-modal="false">
				<el-form ref="editLead" :label-width="formLabelWidth" :model="leadData" :rules="leadRule">
					<el-row>
						<h3 style="text-align:center">
							{{actor.category == 5?'个人领投认证':'企业领投认证'}}
						</h3>
					</el-row>
					<el-form-item label="手机号" prop="mobileNumber">
						<el-input v-model="leadData.mobileNumber" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
					</el-form-item>
					<el-form-item label="真实姓名" prop="realName">
						<el-input v-model="leadData.realName" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
					</el-form-item>
					<el-form-item label="身份证号" prop="identNumber">
						<el-input v-model="leadData.identNumber" auto-complete="off" :readonly="customer.realName?true:false">
						</el-input>
					</el-form-item>
					<el-form-item label="关注行业">
						<el-checkbox-group v-model="newIndustryList">
							<el-checkbox v-for="item in industryList" :label="item.value" :key="item.label">{{item.label}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="所属单位" prop="organization">
						<el-input v-model="leadData.organization " auto-complete="off" placeholder="请输入目前所属单位"></el-input>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="职位" prop="position">
						<el-input v-model="leadData.position" auto-complete="off" placeholder="请输入目前职位"></el-input>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="籍贯 " prop="leadRegionOptions">
						<el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="leadData.leadRegionOptions">
						</el-cascader>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="常驻地区 " prop="leadUsualPlaceOptions">
						<el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="leadData.leadUsualPlaceOptions">
						</el-cascader>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="个人情况" prop="industryLevel">
						<el-radio-group v-model="leadData.industryLevel">
							<el-radio v-for="item in personalList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-if="actor.category == 4" label="统一社会信用代码" prop="creditCode">
						<el-input v-model="leadData.creditCode" auto-complete="off" placeholder="请输入统一社会信用代码"></el-input>
					</el-form-item>
					<el-form-item v-if="actor.category == 4" label="所在地区">
						<el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="leadData.leadRegionOptions">
						</el-cascader>
					</el-form-item>
					<el-form-item v-if="actor.category == 4" label="企业情况" prop="industryLevel">
						<el-radio-group v-model="leadData.industryLevel">
							<el-radio v-for="item in enterpriseList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="已投项目">
						<el-input type="textarea" v-model="leadData.investment" placeholder="请输入已投资的项目名称、尽量填写完整"></el-input>
					</el-form-item>

					<el-form-item v-if="actor.category == 4" label="营业执照">
						<el-upload class="upload-demo" ref="upload" action="/ajax/image_uploadByFile" :data="fileParam" list-type="picture-card"
						 :show-file-list="true" :auto-upload="true" :file-list="uploadList" :before-upload="beforeAvatarUpload" :on-success="updateBusinessLicenseSuccess">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
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
			<el-dialog :title="actor.category==5?'合格投资个人认证':'合格投资企业认证'" :visible.sync="investorDialog" @close="cancel('investor')" :close-on-click-modal="false">
				<el-form ref="investor" :label-width="formLabelWidth" :model="investor" :rules="investorRule">
					<h3 v-show="actor.category==4">代理人</h3>
					<el-form-item label="手机号" prop="mobileNumber">
						<el-input v-model="investor.mobileNumber" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
					</el-form-item>
					<el-form-item label="真实姓名" prop="name">
						<el-input v-model="investor.name" auto-complete="off" :readonly="customer.realName?true:false"></el-input>
					</el-form-item>
					<el-form-item label="身份证号" prop="identNumber">
						<el-input v-model="investor.identNumber" auto-complete="off" :readonly="customer.realName?true:false">
						</el-input>
					</el-form-item>
					<h3 v-show="actor.category==4">企业</h3>
					<el-form-item label="关注行业" prop="industry">
						<el-checkbox-group v-model="investor.industryList">
							<el-checkbox v-for="item in industryList" :label="item.value" :key="item.label">{{item.label}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item v-if="actor.category == 4" label="企业情况" prop="industryLevel">
						<el-radio-group v-model="investor.industryLevel">
							<el-radio v-for="item in enterpriseList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="所属单位" prop="organization">
						<el-input v-model="investor.organization" auto-complete="off" placeholder="请填写目前所属单位"></el-input>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="职位" prop="position">
						<el-input v-model="investor.position" auto-complete="off" placeholder="请填写目前职位"></el-input>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="籍贯 " prop="investorRegionOptions">
						<el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="investor.investorRegionOptions">
						</el-cascader>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="常驻地区 " prop="investorUsualPlaceOptions">
						<el-cascader expand-trigger="click" change-on-select clearable :options="options" v-model="investor.investorUsualPlaceOptions">
						</el-cascader>
					</el-form-item>
					<el-form-item v-if="actor.category == 5" label="个人情况" prop="industryLevel">
						<el-radio-group v-model="investor.industryLevel">
							<el-radio v-for="item in investorPersonalOptions" :label="item.value" :key="item.label">{{item.label}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item prop="agree" style="margin-bottom: 5px;">
						<el-checkbox v-model="investor.agree" name="">我已知晓股权融资是一种高风险投资，是一种没有固定收益和固定期
							<br>限的投资,有产生本金亏损的可能性。</el-checkbox>
					</el-form-item>
					<el-form-item prop="promise">
						<el-checkbox v-model="investor.promise" name="">我承诺以上登记的所有信息属实，并对虚假信息产生的一切后果负责。
							<br>我已认真阅读并同意《投资人服务协议》 《链投股权投资风险提示书》。</el-checkbox>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel('investor')">取 消</el-button>
					<el-button type="primary" @click="investorNameValidate">确 认</el-button>
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
	import { getSelectArray, getIndustryByArray } from '../../../util/index.js'
	import _ from 'lodash'

	export default {
		name: 'accountInfo',
		data() {
			var validateCheckbox = (rule, value, callback) => {
				if (value === false) {
					callback(new Error('请勾选同意'))
				} else {
					callback()
				}
			}
			return {
				industryObj: { 1: false, 2: false, 4: false, 8: false, 16: false, 32: false, 128:false,64: false },
				workYearsObj: { 1: '', 2: '', 4: '', 8: '', 16: '', 32: '', 128: '' ,64: ''},
				uploadList: [],
				newIndustryList: [],
				fileParam: {},
				industryArr: {
					industry:  { 1: false, 2: false, 4: false, 8: false, 16: false, 32: false, 128:false,64: false },
					workYears: { 1: '', 2: '', 4: '', 8: '', 16: '', 32: '', 128: '' ,64: ''},
				},
				active: 'tab-active',
				options: regionData,
				selectedOptions: [],
				regionOptions: [],
				usualPlaceOptions: [],
				industryList: industryList,
				investorPersonalOptions: investorPersonalList,
				personalList: personalList,
				enterpriseList: enterpriseList,
				expert: {
					realName: '',
					identNumber: '',
					mobileNumber: '',
					expertUsualPlaceOptions: [],
					permanent: '',
					id: '',
					industry: '',
					newIndustry: '',
					industryList: [],
					newIndustryList: [],
					credentialsObject:[],
					industryLevel: 0,
					organization: '',
					position: '',
					businessCard: '',
					credentials: '[]',
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
					creditCode: '',
					leadRegionOptions: [],
					leadUsualPlaceOptions: [],
					regionCode: '',
					usualPlace: '',
					investment: '',
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
				formLabelWidth: '130px',
				realNameDialog: false,
				expertDialog: false,
				viewExpertDialog: false,
				editExpertDialog: false,
				leadDialog: false,
				viewLeadDialog: false,
				editLeadDialog: false,
				investorDialog: false,
				realNameRule: {
					mobileNumber: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
						{ pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入真实姓名', trigger: 'blur' },
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
						{ required: true, message: '请输入真实姓名', trigger: 'blur' },
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
					realName: [
						{ required: true, message: '请输入真实姓名', trigger: 'blur' },
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
						{ required: true, message: '请输入单位名称', trigger: 'blur' }
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
					creditCode: [
						{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
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
						{ required: true, message: '请输入真实姓名', trigger: 'blur' },
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
					]
				},
			}
		},
		computed: {
			customer: function () {
				return this.$store.state.customer.customerIndividualInfoByActorId
			},
			actor: function () {
				return this.$store.state.customer.customerInfoByActorId
			},
			updateMobileAndEmailByIdStatus: function () {
				return this.$store.state.customer.updateMobileAndEmailByIdStatus
			},
			resetLoginPasswordStatus: function () {
				return this.$store.state.customer.resetLoginPasswordStatus
			},
			loginPasswordStatus: function () {
				return this.$store.state.customer.loginPasswordStatus
			},
			realNameVaildate: function () {
				return this.$store.state.customer.nameVaildate
			},
			expertVaildateStatus: function () {
				return this.$store.state.customer.expertVaildateStatus
			},
			updateExpertStatus: function () {
				return this.$store.state.customer.updateExpertStatus
			},
			personalLeadVaildateStatus: function () {
				return this.$store.state.customer.personalLeadVaildateStatus
			},
			updatePersonalLeadStatus: function () {
				return this.$store.state.customer.updatePersonalLeadStatus
			},
			organizationLeadVaildateStatus: function () {
				return this.$store.state.customer.organizationLeadVaildateStatus
			},
			updateOrganizationLeadStatus: function () {
				return this.$store.state.customer.updateOrganizationLeadStatus
			},
			investorVaildateStatus: function () {
				return this.$store.state.customer.investorVaildateStatus
			},
			expertData: function () {
				return this.$store.state.customer.expertData || { agree: true }
			},
			leadData: function () {
				return this.$store.state.customer.leadData || { agree: true, promise: true }
			}
		},
		methods: {
			accountInit() {
				let customerParams = {
					id: this.$route.params.actorId
				}
				this.$store.dispatch('customerIndividualInfoByActorId', customerParams).then(() => {
					if (this.actor.category == 4) {
						this.actor.name = this.customer.actorEnter.gentName
						this.actor.identNuber = this.customer.actorEnter.gentIdcard
					}
				})
			},
			clickRealNameValidate() {
				if (this.actor.category == 4) {
					this.actor.name = this.customer.actorEnter.gentName
					this.actor.identNuber = this.customer.actorEnter.gentIdcard
				}
				this.realNameDialog = true
			},
			showRealNameValidate() {
				if (this.actor.category == 4) {
					this.actor.name = this.customer.actorEnter.gentName
					this.actor.identNuber = this.customer.actorEnter.gentIdcard
				}
				this.realNameDialog = true
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
								})
								this.accountInit()
								this.cancel('realName')
							} else {
								this.$message.error(this.realNameVaildate.information)
							}
						})
					}
				})
			},
			expertClick() {
				this.expert.realName = this.actor.name
				this.expert.mobileNumber = this.actor.mobileNumber
				this.expert.identNumber = this.actor.identNumber
				this.expertDialog = true
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
									})

									this.expertVaildate()
								} else {
									this.$message.error(this.realNameVaildate.information)
								}
							})
						} else {
							this.expertVaildate()
						}

					}
				})
			},
			expertVaildate() {
				this.expert.industry = JSON.stringify(this.industryArr)
				this.expert.newIndustry = getIndustryByArray(this.industryArr.industry)
				this.expert.actorId = this.$route.params.actorId
				this.expert.permanent = this.expert.expertUsualPlaceOptions.length == 0 ? '' : this.expert.expertUsualPlaceOptions[this.expert.expertUsualPlaceOptions.length - 1]
				this.$store.dispatch('expertVaildate', this.expert).then(() => {
					if (this.expertVaildateStatus.success) {
						this.$message({
							type: 'success',
							message: '已提交认证等待审核!'
						})
						this.accountInit()
						this.cancel('expert')
					} else {
						this.$message.error(this.expertVaildateStatus.information)
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
						this.industryObj = obj.industry || this.industryObj
						this.workYearsObj = obj.workYears || this.workYearsObj
					}
					this.expertData.credentialsObject=JSON.parse(this.expertData.credentials)||[]
					this.viewExpertDialog = true
				}).catch((e)=>{
					this.expertData.credentialsObject=[]
					this.expertData.credentials='[]'
					this.viewExpertDialog = true
				})
			},
			editExpertClick() {
				let expertParam = {
					id: this.$route.params.actorId
				}
				this.$store.dispatch('expertByActorId', expertParam).then(() => {
					// this.expertData.newIndustryList = [];
					this.expertData.expertRegionOptions = []
					this.expertData.expertUsualPlaceOptions = []
					this.expertData.agree = true
					if(this.expertData.credentials){
						this.expertData.credentialsObject=JSON.parse(this.expertData.credentials)||[]
					}
					if (this.expertData.industry) {
						var obj = JSON.parse(this.expertData.industry)
						this.industryObj = obj.industry || this.industryObj
						this.workYearsObj = obj.workYears || this.workYearsObj
					}
					if (this.expertData.permanent) {
						this.expertData.expertUsualPlaceOptions = getSelectArray(this.expertData.permanent)
					}
					this.editExpertDialog = true
				})
			},
			updateExpert() {
				this.$refs['editExpert'].validate((valid) => {
					if (valid) {
						let industryObject = {
							industry: this.industryObj,
							workYears: this.workYearsObj
						}
						this.expertData.industry = JSON.stringify(industryObject)
						this.expertData.newIndustry = getIndustryByArray(this.industryObj)
						this.expertData.regionCode = this.expertData.expertRegionOptions.length == 0 ? '' : this.expertData.expertRegionOptions[this.expertData.expertRegionOptions.length - 1]; this.expertData.expertRegionOptions[2]
						this.expertData.permanent = this.expertData.expertUsualPlaceOptions.length == 0 ? '' : this.expertData.expertUsualPlaceOptions[this.expertData.expertUsualPlaceOptions.length - 1]; this.expertData.expertUsualPlaceOptions[2]
						let updateExpertParam = {
							expertObject: this.expertData,
							actorId: this.$route.params.actorId
						}
						this.$store.dispatch('updateExpert', updateExpertParam).then(() => {
							if (this.updateExpertStatus.success) {
								this.$message({
									type: 'success',
									message: '已重新提交认证等待审核!!'
								})
								this.accountInit()
								this.cancel('editExpert')
							}
						})
					}
				})
			},
			leadClick() {
				if (this.actor.category == 5) {
					this.lead.realName = this.actor.name
					this.lead.identNumber = this.actor.identNumber
				} else {
					this.lead.realName = this.customer.actorEnter.gentName
					this.lead.identNumber = this.customer.actorEnter.gentIdcard
				}
				this.lead.mobileNumber = this.actor.mobileNumber
				this.leadDialog = true
			},
			leadNameValidate() {
				this.lead.name = this.lead.realName
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
									})
									this.leadValidate()
								} else {
									this.$message.error(this.realNameVaildate.information)
								}
							})
						} else {
							this.leadValidate()
						}
					}
				})
			},
			leadValidate() {
				this.lead.industry = _.sum(this.lead.industryList)
				this.lead.regionCode = this.lead.leadRegionOptions.length > 0 ? this.lead.leadRegionOptions[this.lead.leadRegionOptions.length - 1] : ''
				this.lead.birthplace = this.lead.leadRegionOptions.length > 0 ? this.lead.leadRegionOptions[this.lead.leadRegionOptions.length - 1] : ''
				this.lead.permanent = this.lead.leadUsualPlaceOptions.length > 0 ? this.lead.leadUsualPlaceOptions[this.lead.leadUsualPlaceOptions.length - 1] : ''
				let leadParam = {
					actorId: this.$route.params.actorId,
					leadObject: this.lead,
				}
				if (this.actor.category == 5) {
					this.$store.dispatch('personalLeadVaildate', leadParam).then(() => {
						if (this.personalLeadVaildateStatus.success) {
							this.$message.success('已提交认证等待审核!')
							this.accountInit()
							this.cancel('lead')
						} else {
							this.$message.error(this.personalLeadVaildateStatus.information)
						}
					})
				} else {
					this.$store.dispatch('organizationLeadVaildate', leadParam).then(() => {
						if (this.organizationLeadVaildateStatus.success) {
							this.$message({
								type: 'success',
								message: '已提交认证等待审核!'
							})
							this.accountInit()
							this.cancel('lead')
						} else {
							this.$message.error(this.organizationLeadVaildateStatus.information)
						}
					})
				}
			},
			queryLead() {
				let leadParam = {
					id: this.$route.params.actorId
				}
				this.$store.dispatch('leadByActorId', leadParam).then(() => {
					this.viewLeadDialog = true
				})
			},
			editLeadClick() {
				let leadParam = {
					id: this.$route.params.actorId
				}
				this.$store.dispatch('leadByActorId', leadParam).then(() => {
					this.leadData.leadRegionOptions = []
					this.newIndustryList = this.leadData.industryLed || []
					this.leadData.agree = true
					this.leadData.promise = true
					// this.leadData.industryList = [];
					if (this.leadData.regionCode) {
						this.leadData.leadRegionOptions = getSelectArray(this.leadData.regionCode)
					}
					if (this.leadData.birthplace) {
						this.leadData.leadRegionOptions = getSelectArray(this.leadData.birthplace)
					}
					if (this.leadData.permanent) {
						this.leadData.leadUsualPlaceOptions = getSelectArray(this.leadData.permanent)
					}
					this.editLeadDialog = true
				})
			},
			updateLead() {
				this.$refs['editLead'].validate((valid) => {
					if (valid) {
						this.leadData.industryLed = _.sum(this.newIndustryList)
						if (this.leadData.leadRegionOptions) {
							this.leadData.regionCode = this.leadData.leadRegionOptions.length > 0 ? this.leadData.leadRegionOptions[this.leadData.leadRegionOptions.length - 1] : ''
							this.leadData.birthplace = this.leadData.leadRegionOptions.length > 0 ? this.leadData.leadRegionOptions[this.leadData.leadRegionOptions.length - 1] : ''
						}
						if (this.leadData.leadUsualPlaceOptions) {
							this.leadData.permanent = this.leadData.leadUsualPlaceOptions.length > 0 ? this.leadData.leadUsualPlaceOptions[this.leadData.leadUsualPlaceOptions.length - 1] : ''
						}
						if (this.actor.category == 5) {
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
									})
									this.accountInit()
									this.cancel('editLead')
								}
							})
						} else {
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
									})
									this.accountInit()
									this.cancel('editLead')
								}
							})
						}
					}
				})
			},
			investorClick() {
				if (this.actor.category == 4) {
					this.investor.identNumber = this.customer.actorEnter.gentIdcard
					this.investor.name = this.customer.actorEnter.gentName
				} else {
					this.investor.identNumber = this.actor.identNumber
					this.investor.name = this.actor.name
				}
				this.investor.mobileNumber = this.actor.mobileNumber
				this.investorDialog = true
			},
			investorNameValidate() {
				this.$refs['investor'].validate((valid) => {
					if (valid) {
						if (!this.customer.realName) {
							let realNameParams = {
								tel: this.investor.mobileNumber,
								customerName: this.investor.name,
								identNumber: this.investor.identNumber,
								actorId: this.$route.params.actorId,
							}
							this.$store.dispatch('realNameVaildate', realNameParams).then(() => {
								if (this.realNameVaildate.success) {
									this.$message({
										type: 'success',
										message: '实名认证成功!'
									})
									this.investorValidate()
								} else {
									this.$message.error(this.realNameVaildate.information)
								}
							})
						} else {
							this.investorValidate()
						}
					}
				})
			},
			investorValidate() {
				this.investor.industry = _.sum(this.investor.industryList)
				this.investor.actorId = this.$route.params.actorId
				this.investor.usualPlace = this.investor.investorUsualPlaceOptions.length > 0 ? this.investor.investorUsualPlaceOptions[this.investor.investorUsualPlaceOptions.length - 1] : ''
				this.investor.regionCode = this.investor.investorRegionOptions.length > 0 ? this.investor.investorRegionOptions[this.investor.investorRegionOptions.length - 1] : ''
				this.investor.type = (this.actor.category == 5 ? 1 : 2)
				this.$store.dispatch('investorVaildate', this.investor).then(() => {
					if (this.investorVaildateStatus.success) {
						this.$message({
							type: 'success',
							message: '认证成功!'
						})
						this.accountInit()
						this.cancel('investor')
					} else {
						this.$message.error(this.investorVaildateStatus.information)
					}
				})
			},
			cancel(formName) {
				this.editPasswordDialog = false
				this.expertDialog = false
				this.leadDialog = false
				this.investorDialog = false
				this.realNameDialog = false
				this.viewExpertDialog = false
				this.editExpertDialog = false
				this.viewLeadDialog = false
				this.editLeadDialog = false
				if (this.$refs[formName]) {
					this.$refs[formName].resetFields()
				}
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url
				this.dialogVisible = true
			},
			beforeAvatarUpload(file) {
				let isPic = false
				let fileSize = file.size / 1024 / 1024
				let fileType = file.type
				if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif') {
					isPic = true
				}
				const isLt50 = fileSize < 1
				if (!isPic) {
					this.$message.error('上传的图片格式为png、jpg、gif!')
					return isPic
				} else if (!isLt50) {
					this.$message.error('上传图片大小不能超过 1M!')
					return isLt50
				} else {
					this.fileParam.fileName = file.name
					this.fileParam.fileType = 1
				}
				return isPic && isLt50
			},
			//上传成功时返回的数据
			businessCardSuccess(data) {
				if (data) {
					this.$message.success('上传图片成功')
					this.expert.businessCard = data
				}
			},
			//上传成功时返回的数据
			updateBusinessCardSuccess(data) {
				if (data) {
					this.$message.success('上传图片成功')
					this.expertData.businessCard = data
				}
			},
			//上传成功时返回的数据
			credentialsSuccess(data) {
				if (data) {
					this.$message.success('上传图片成功')
					this.expert.credentials = JSON.stringify([JSON.stringify(data)])
					this.expert.credentialsObject = [data]
				}
			},
			//上传成功时返回的数据
			updateCredentialsSuccess(data) {
				if (data) {
					this.$message.success('上传图片成功')
					this.expertData.credentials = JSON.stringify([JSON.stringify(data)])
					this.expexpertDataert.credentialsObject = [data]
				}
			},
			//上传成功时返回的数据
			businessLicenseSuccess(data) {
				if (data) {
					this.$message.success('上传图片成功')
					this.lead.businessLicenseURL = data
				}
			},
			//上传成功时返回的数据
			updateBusinessLicenseSuccess(data) {
				if (data) {
					this.$message.success('上传图片成功')
					this.leadData.businessLicenseURL = data
				}
			},

		}
	}

</script>

<style>
	.account-box {
		width: 90%;
		margin: 0 auto;
		padding-top: 10px;
		background-color: #fff;
	}

	#accountInfo .ac-col-1,
	#accountInfo .ac-col-2-1,
	#accountInfo .ac-col-3-3,
	#accountInfo .ac-col-3,
	#accountInfo .ac-col-2,
	#accountInfo .ac-col-2-2,
	#accountInfo .ac-col-4 {
		padding: 6px 0;
	}

	#accountInfo .ac-col-1,
	#accountInfo .ac-col-2-1 {
		color: #777;
	}

	#accountInfo .ac-col-1,
	#accountInfo .ac-col-2-1,
	#accountInfo .ac-col-3-3,
	#accountInfo .ac-col-3 {
		border-right: 1px solid #ccc;
	}

	#accountInfo .account-box .ac-col-1 {
		margin: 0;
		text-align: center;
	}

	#accountInfo .ac-col-3-3,
	#accountInfo .ac-col-3 {
		color: #aaa
	}

	#accountInfo .ac-col-2,
	#accountInfo .ac-col-2-2 {
		color: #06ccb6;
		padding-left: 20px
	}

	#accountInfo .account-box .ac-col-2,
	#accountInfo .account-box .ac-col-3 {
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

	.account-box .row-bg {
		background-color: #eceff1
	}
</style>