import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const MainView = () => import('../views/mainView.vue')
const riskView = () => import('../views/riskManage/riskManage.vue')
const customerInforMaintain = () => import('../views/customerManage/customerInforMaintain.vue')
const customerDetail = () => import('../views/customerManage/customer/customerDetail.vue')
const expertAuditList = () => import('../views/customerManage/expertAuditList.vue')
const leadAuditList = () => import('../views/customerManage/leadAuditList.vue')
const leadAuditDetail = () => import('../views/customerManage/leadAuditDetail.vue')
const expertAuditDetail = () => import('../views/customerManage/expertAuditDetail.vue')
const investmentFund = () => import('../views/moneyManage/investmentFund.vue')
const investmentDetail = () => import('../views/moneyManage/investmentDetail.vue')
const depositManage = () => import('../views/moneyManage/depositManage.vue')
const marginApproval = () => import('../views/moneyManage/marginApproval.vue')
const approval = () => import('../views/moneyManage/approval.vue')
const refundApproval = () => import('../views/moneyManage/refundApproval.vue')
const capitalApproval = () => import('../views/moneyManage/capitalApproval.vue')
const brokerageManage = () => import('../views/moneyManage/brokerageManage.vue')
const rechargeManage = () => import('../views/moneyManage/rechargeManage.vue')
const rateSetting = () => import('../views/moneyManage/rateSetting.vue')
const enterpriseManage = () => import('../views/enterpriseManage/enterpriseManage.vue')
const msgImages = () => import('../views/contentManage/msgImages.vue')
const msgModel = () => import('../views/contentManage/msgModel.vue')
const msgShort = () => import('../views/contentManage/msgShort.vue')
const msgTalk = () => import('../views/contentManage/msgTalk.vue')
const msgWebsite = () => import('../views/contentManage/msgWebsite.vue')
const msgWebDetail = () => import('../views/contentManage/msgWebDetail.vue')
const msgProjectList = () => import('../views/contentManage/msgProjectList.vue')
const log = () => import('../views/systemManage/log.vue')
const permission = () => import('../views/systemManage/permission.vue')
const roleMaintain = () => import('../views/systemManage/roleMaintain.vue')
const universalRole = () => import('../views/systemManage/universalRole.vue')
const userMaintain = () => import('../views/systemManage/userMaintain.vue')
const riskHandle = () => import('../views/riskManage/riskHandle/riskHandle.vue')
const riskHistory = () => import('../views/riskManage/riskHistory/riskHistory.vue')
const itemDetail = () => import('../views/itemManage/itemDetail.vue')
const itemStep1 = () => import('../views/itemManage/createItem/itemStep1.vue')
const itemStep2 = () => import('../views/itemManage/createItem/itemStep2.vue')
const itemStep3 = () => import('../views/itemManage/createItem/itemStep3.vue')
const displayItem = () => import('../views/itemManage/displayItem.vue')
const enterpriseDetail = () => import('../views/enterpriseManage/enterpriseDetail.vue')
const riskIndex = () => import('../views/riskManage/riskHandle/riskIndex.vue')
const riskHistoryDetail = () => import('../views/riskManage/riskHistory/riskHistoryDetail.vue')
const riskSetting = () => import('../views/riskManage/riskSetting/riskSetting.vue')
const addRiskIndex = () => import('../views/riskManage/riskSetting/addRiskIndex.vue')
const itemEdit = () => import('../views/itemManage/editItem/editItem.vue')
const riskFunFlow = () => import('../views/riskManage/riskInfo/riskFunFlow.vue')
const riskFunFlowDLB = () => import('../views/riskManage/riskInfo/riskFunFlowDLB.vue')
const editRiskIndex =()=>import('../views/riskManage/riskSetting/editRiskIndex.vue')
const riskIndexDetail=()=>import('../views/riskManage/riskSetting/riskIndexDetail.vue')


const routes = [
  { path: '/main', component: MainView },
  { path: '/risk', component: riskView },
  { path: '/riskHandle/:id', component: riskHandle },
  { path: '/riskHistory/:id', component: riskHistory },
  { path: '/riskIndex/:id', component: riskIndex },
  { path: '/riskSetting/:id?',component: riskSetting },
  { path: '/addRiskIndex/:id?',component: addRiskIndex },
  { path: '/riskIndexDetail/:id',component: riskIndexDetail },
  { path: '/editRiskIndex/:id',component: editRiskIndex },
  { path: '/riskHistoryDetail/:id', component: riskHistoryDetail },
  { path: '/customerInforMaintain', component: customerInforMaintain },
  { path: '/customerDetail/:customerId/:actorId', component: customerDetail },
  { path: '/expertAuditDetail/:actorId/:customerId', component: expertAuditDetail },
  { path: '/expertAuditList', component: expertAuditList },
  { path: '/leadAuditList', component: leadAuditList },
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
  { path: '/msgShort', component: msgShort },
  { path: '/msgWebsite', component: msgWebsite },
  { path: '/msgWebDetail/:id', component: msgWebDetail },
  { path: '/msgProjectList', component: msgProjectList },
  { path: '/log', component: log },
  { path: '/permission', component: permission },
  { path: '/roleMaintain', component: roleMaintain },
  { path: '/universalRole', component: universalRole },
  { path: '/userMaintain', component: userMaintain },
  { path: '/itemDetail/:projectId', component: itemDetail },
  { path: '/itemStep1/:id', component: itemStep1 },
  { path: '/itemStep2/:id', component: itemStep2 },
  { path: '/itemStep3/:id', component: itemStep3 },
  { path: '/itemEdit/:id', component: itemEdit},
  { path: '/displayItem/:projectId', component: displayItem },
  { path: '/enterpriseDetail/:id', component: enterpriseDetail },
  { path: '/riskFunFlow/:id',component:riskFunFlow},
  { path: '/riskFunFlowDLB/:id',component:riskFunFlowDLB},
  { path: '/', redirect: '/main' }
]

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })
}
