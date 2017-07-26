import Vue from 'vue'
import Resource from 'vue-resource';
import { Loading,Message } from 'element-ui';
Vue.use(Resource);
Vue.http.options.root = '/ajax';

Vue.http.interceptors.push(function (request, next) {
  let service=Loading.service({
    text:'loading'
  });
  // continue to next interceptor
  next(function (response) {
    service.close();
    if(response.body.assignUniqueSecretMessage){
      Message.warning(response.body.assignUniqueSecretMessage);
      let aa=response.body;
      delete aa.assignUniqueSecretMessage;
    }
  });
});

const loginApi = require('./login/login_client')(Vue);

const riskApi = require('./riskModule/risk_client')(Vue);
const customerApi = require('./customerModule/customer_client')(Vue);
const enterpriseApi = require('./enterpriseModule/enterprise_client')(Vue);
const systemApi = require('./systemModule/system_client')(Vue);
const moneyApi = require('./moneyModule/money_client')(Vue);
const itemApi = require('./itemModule/item_client')(Vue);
const contentApi = require('./contentModule/content_client')(Vue);

export const api = {
  ...loginApi,
  ...riskApi,
  ...customerApi,
  ...enterpriseApi,
  ...systemApi,
  ...moneyApi,
  ...itemApi,
  ...contentApi
}