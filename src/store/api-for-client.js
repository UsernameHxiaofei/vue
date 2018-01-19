import Vue from 'vue';
import Resource from 'vue-resource';
import { Message } from 'element-ui';

Vue.use(Resource);
Vue.http.options.root = '/ajax';
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push(function (request, next) {
	Vue.prototype.$bar.running();
	next((response) => {
		Vue.prototype.$bar.end();
		if (response.body.assignUniqueSecretMessage) {
			Message.closeAll();
			Message.warning(response.body.assignUniqueSecretMessage);
			if (response.body.assignUniqueSecretMessage == '账号未登录！') {
				setTimeout(() => {
					location.href = '/login';
				}, 1000);
			}
			response.data = null;
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
const employeeApi = require('./employeeModule/employee_client')(Vue);
const investedItemApi = require('./investedItemModule/investedItem_client')(Vue);

export const api = {
	...loginApi,
	...riskApi,
	...customerApi,
	...enterpriseApi,
	...systemApi,
	...moneyApi,
	...itemApi,
	...contentApi,
	...employeeApi,
	...investedItemApi
};