import { sc, passport } from '../backend/process';


const loginApi = require('./login/login_server')(sc, passport);

const riskApi = require('./riskModule/risk_server')(sc, passport);
const customerApi = require('./customerModule/customer_server')(sc,passport);
const enterpriseApi = require('./enterpriseModule/enterprise_server')(sc, passport);
const systemApi = require('./systemModule/system_server')(sc);
const moneyApi = require('./moneyModule/money_server')(sc);
const itemApi = require('./itemModule/item_server')(sc, passport);
const contentApi = require('./contentModule/content_server')(sc);
const employeeApi = require('./employeeModule/employee_server')(sc, passport);

export const api = {
    ...loginApi,
    ...riskApi,
    ...customerApi,
    ...enterpriseApi,
    ...systemApi,
    ...moneyApi,
    ...itemApi,
    ...contentApi,
    ...employeeApi
}