import Vue from 'vue'
import Vuex from 'vuex'

import {loginModule} from './login'
import {riskModule} from './riskModule'
import {customerModule} from './customerModule'
import {enterpriseModule} from './enterpriseModule'
import {systemModule} from './systemModule'
import {moneyModule} from './moneyModule'
import {itemModule} from './itemModule'
import {contentModule} from './contentModule'

Vue.use(Vuex)

const modules={
    risk:riskModule,
    customer:customerModule,
    enterprise:enterpriseModule,
    login:loginModule,
    system:systemModule,
    money:moneyModule,
    item:itemModule,
    content:contentModule
  }

export function createStore () {
    return new Vuex.Store({
      modules: modules
    })
}

