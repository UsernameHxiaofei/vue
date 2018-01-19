import Vue from 'vue';
import Vuex from 'vuex';

import loginModule from './login/index';
import riskModule from './riskModule/index';
import customerModule from './customerModule/index';
import enterpriseModule from './enterpriseModule/index';
import systemModule from './systemModule/index';
import moneyModule from './moneyModule/index';
import itemModule from './itemModule/index';
import contentModule from './contentModule/index';
import employeeModule from './employeeModule/index';
import investedItemModule from './investedItemModule/index';

Vue.use(Vuex);

const modules = {
	risk: riskModule,
	customer: customerModule,
	enterprise: enterpriseModule,
	login: loginModule,
	system: systemModule,
	money: moneyModule,
	item: itemModule,
	content: contentModule,
	employee: employeeModule,
	investedItem: investedItemModule
};

export function createStore() {
	return new Vuex.Store({
		modules
	});
}

