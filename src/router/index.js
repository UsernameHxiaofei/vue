import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const MainView = () => import('../views/mainView.vue');
const riskView = () => import('../views/riskManage/riskManage.vue');
//会员管理
const customerInforMaintain = () => import('../views/customerManage/customerInforMaintain.vue');
const personMember = () => import('../views/customerManage/personMember.vue');
const enterpriseMember = () => import('../views/customerManage/enterpriseMember.vue');
const enterpriseChangeAuditList = () => import('../views/customerManage/enterpriseMemberChangeAuditList.vue');

const personMemberDetail = () => import('../views/customerManage/mermber/personMemberDetail.vue');
const enterpriseMemberDetail = () => import('../views/customerManage/mermber/enterpriseMemberDetail.vue');
const enterpriseMemberChangeAudit = () => import('../views/customerManage/enterpriseMemberChangeAudit.vue');

const expertAuditList = () => import('../views/customerManage/expertAuditList.vue');
const leadAuditList = () => import('../views/customerManage/leadAuditList.vue');
const leadAuditDetail = () => import('../views/customerManage/leadAuditDetail.vue');
const personLeadAuditList = () => import('../views/customerManage/personLeadAuditList.vue');
const enterpriseLeadAuditList = () => import('../views/customerManage/enterpriseLeadAuditList.vue');



const expertAuditDetail = () => import('../views/customerManage/expertAuditDetail.vue');
const investmentFund = () => import('../views/moneyManage/investmentFund.vue');
const investmentDetail = () => import('../views/moneyManage/investmentDetail.vue');
const depositManage = () => import('../views/moneyManage/depositManage.vue');
const marginApproval = () => import('../views/moneyManage/marginApproval.vue');
const approval = () => import('../views/moneyManage/approval.vue');
const refundApproval = () => import('../views/moneyManage/refundApproval.vue');
const capitalApproval = () => import('../views/moneyManage/capitalApproval.vue');
const brokerageManage = () => import('../views/moneyManage/brokerageManage.vue');
const rechargeManage = () => import('../views/moneyManage/rechargeManage.vue');
const rateSetting = () => import('../views/moneyManage/rateSetting.vue');
const enterpriseManage = () => import('../views/enterpriseManage/enterpriseManage.vue');
const msgImages = () => import('../views/contentManage/msgImages.vue');
const msgModel = () => import('../views/contentManage/msgModel.vue');
const msgShort = () => import('../views/contentManage/msgShort.vue');
const msgTalk = () => import('../views/contentManage/msgTalk.vue');
const msgTalkDetail = () => import('../views/contentManage/msgTalkDetail.vue');
const msgWebsite = () => import('../views/contentManage/msgWebsite.vue');
const msgWebDetail = () => import('../views/contentManage/msgWebDetail.vue');
const log = () => import('../views/systemManage/log.vue');
const permission = () => import('../views/systemManage/permission.vue');
const roleMaintain = () => import('../views/systemManage/roleMaintain.vue');
const universalRole = () => import('../views/systemManage/universalRole.vue');
const userMaintain = () => import('../views/systemManage/userMaintain.vue');
const riskHandle = () => import('../views/riskManage/riskHandle/riskHandle.vue');
const riskHistory = () => import('../views/riskManage/riskHistory/riskHistory.vue');
const itemDetail = () => import('../views/itemManage/itemDetail.vue');
const itemStep1 = () => import('../views/itemManage/createItem/itemStep1.vue');
const itemStep2 = () => import('../views/itemManage/createItem/itemStep2.vue');
const itemStep3 = () => import('../views/itemManage/createItem/itemStep3.vue');
const displayItem = () => import('../views/itemManage/displayItem.vue');
const enterpriseDetail = () => import('../views/enterpriseManage/enterpriseDetail.vue');
const riskIndex = () => import('../views/riskManage/riskHandle/riskIndex.vue');
const riskHistoryDetail = () => import('../views/riskManage/riskHistory/riskHistoryDetail.vue');
const riskSetting = () => import('../views/riskManage/riskSetting/riskSetting.vue');
const addRiskIndex = () => import('../views/riskManage/riskSetting/addRiskIndex.vue');
const itemEdit = () => import('../views/itemManage/editItem/editItem.vue');
const itemEditForAll = () => import('../views/itemManage/editItem/editItemForAll.vue');
const editRiskIndex = () => import('../views/riskManage/riskSetting/editRiskIndex.vue');
const riskIndexDetail = () => import('../views/riskManage/riskSetting/riskIndexDetail.vue');
const riskRegionContainer = () => import('../views/riskManage/riskInfo/riskRegionContainer.vue');
const monitor = () => import('../views/systemManage/monitor.vue');
const costMonitor = () => import('../views/systemManage/costMonitor.vue');
const investedItemList = () => import('../views/investedItemManage/investedItemList.vue');
const investedItemDetail = () => import('../views/investedItemManage/investedItemDetail.vue');
const investedItemCreate = () => import('../views/investedItemManage/investedItemCreate.vue');

const routes = [
	{ path: '/main', component: MainView ,meta: { scrollToTop: true } },
	{ path: '/risk', component: riskView },
	{ path: '/riskHandle/:id', component: riskHandle },
	{ path: '/riskHistory/:id', component: riskHistory },
	{ path: '/riskIndex/:id', component: riskIndex },
	{ path: '/riskSetting/:id?', component: riskSetting },
	{ path: '/addRiskIndex/:id?', component: addRiskIndex },
	{ path: '/riskIndexDetail/:id', component: riskIndexDetail },
	{ path: '/editRiskIndex/:id', component: editRiskIndex },
	{ path: '/riskHistoryDetail/:id', component: riskHistoryDetail },
	{ path: '/customerInforMaintain', component: customerInforMaintain },
	{ path: '/personMember', component: personMember },
	{ path: '/enterpriseMember', component: enterpriseMember },
	{ path: '/enterpriseChangeAuditList', component: enterpriseChangeAuditList },
	{ path: '/enterpriseChangeAudit/:id/:actorId', component: enterpriseMemberChangeAudit },
	{ path: '/personMemberDetail/:customerId/:actorId', component: personMemberDetail },
	{ path: '/enterpriseMemberDetail/:customerId/:actorId', component: enterpriseMemberDetail },
	{ path: '/expertAuditDetail/:actorId/:customerId', component: expertAuditDetail },
	{ path: '/expertAuditList', component: expertAuditList },
	{ path: '/leadAuditList', component: leadAuditList },
	{ path: '/personLeadAuditList', component: personLeadAuditList },
	{ path: '/enterpriseLeadAuditList', component: enterpriseLeadAuditList },
	{ path: '/leadAuditDetail/:actorId/:customerId', component: leadAuditDetail },
	{ path: '/investmentFund', component: investmentFund },
	{ path: '/investmentDetail/:projectId', component: investmentDetail },
	{ path: '/depositManage', component: depositManage },
	{ path: '/marginApproval', component: marginApproval },
	{ path: '/approval/:projectId', component: approval },
	{ path: '/refundApproval', component: refundApproval },
	{ path: '/capitalApproval', component: capitalApproval },
	{ path: '/brokerageManage', component: brokerageManage },
	{ path: '/rechargeManage', component: rechargeManage },
	{ path: '/rateSetting', component: rateSetting },
	{ path: '/enterprise', component: enterpriseManage },
	{ path: '/msgImages', component: msgImages },
	{ path: '/msgModel', component: msgModel },
	{ path: '/msgTalk', component: msgTalk },
	{ path: '/msgTalkDetail/:id', component: msgTalkDetail },
	{ path: '/msgShort', component: msgShort },
	{ path: '/msgWebsite', component: msgWebsite },
	{ path: '/msgWebDetail/:id', component: msgWebDetail },
	{ path: '/log', component: log },
	{ path: '/permission', component: permission },
	{ path: '/roleMaintain', component: roleMaintain },
	{ path: '/universalRole', component: universalRole },
	{ path: '/userMaintain', component: userMaintain },
	{ path: '/itemDetail/:projectId', component: itemDetail },
	{ path: '/itemStep1/:id', component: itemStep1 ,meta: { scrollToTop: true } },
	{ path: '/itemStep2/:id', component: itemStep2,meta: { scrollToTop: true } },
	{ path: '/itemStep3/:id', component: itemStep3 ,meta: { scrollToTop: true } },
	{ path: '/itemEdit/:id', component: itemEdit ,meta: { scrollToTop: true } },
	{ path: '/itemEditForAll/:id', component: itemEditForAll ,meta: { scrollToTop: true } },
	{ path: '/displayItem/:projectId', component: displayItem,meta: { scrollToTop: true }  },
	{ path: '/enterpriseDetail/:id', component: enterpriseDetail },
	{ path: '/riskRegionContainer/:category/:projectId', component: riskRegionContainer ,meta: { scrollToTop: true } },
	{ path: '/monitor', component: monitor },
	{ path: '/costMonitor', component: costMonitor },

	{ path: '/investedItemList',component:investedItemList},
	{ path: '/investedItemDetail/:id',component:investedItemDetail},
	{ path: '/investedItemCreate',component:investedItemCreate},
	{ path: '/', redirect: '/main' }
];



export function createRouter() {
	return new Router({
		mode: 'history',
		routes: routes,
		scrollBehavior: (to, from, savedPosition) => {
			if (savedPosition) {
				// savedPosition is only available for popstate navigations.
				return savedPosition;
			} else {
				const position = {};
				//if any matched route config has meta thafrom scrolling to to
				if (to.matched.some(m => m.meta.scrollToTop)) {
					// cords will be used if no selector is provided,
					// or if the selector didn't match any element.
					position.x = 0;
					position.y = 0;
				}
				// if the returned position is falsy or an empty object,
				// will retain current scroll position.
				return position;
			}
		}
	});
}
