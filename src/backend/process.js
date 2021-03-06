const { StuffClient } = require('./client');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = 'linktou.base.task.data.Passport'; //放置通行证对象的字段名
// 8883
let sc = new StuffClient('127.0.0.1', 9882);
// let sc = new StuffClient('127.0.0.1', 8876);
if (process.env.NODE_ENV === 'production') {
	if (process.env.server === 'test') {
		sc = new StuffClient('10.240.240.147', 9880);
	} else if (process.env.server === 'demonstration') {
		sc = new StuffClient('10.240.240.150', 9880);
	} else if (process.env.server === 'dev') {
		sc = new StuffClient('10.240.240.144', 9880);
	} else {
		sc = new StuffClient('10.240.240.152', 9880);
	}
}


//这里调用的router方法，来拦截vue请求给node服务器
require('./server_routers/login_router')(router, sc, passport);
require('./server_routers/risk_router')(router, sc, passport);
require('./server_routers/customer_router')(router, sc, passport);
require('./server_routers/enterprise_router')(router, sc, passport);
require('./server_routers/system_router')(router, sc, passport);
require('./server_routers/money_router')(router, sc, passport);
require('./server_routers/item_router')(router, sc, passport);
require('./server_routers/content_router')(router, sc, passport);
require('./server_routers/employee_router')(router,sc, passport);
require('./server_routers/investedItem_router')(router,sc, passport);
require('./server_routers/contract_router')(router,sc, passport);


//上传下载 通用                   ↓↓↓↓↓↓
router.all('/fileupload', multer().single('file'), function(req, res) { //上传组件必须有data{fileType:1}
	let param = req.body;
	const stuff = sc.instanceRequest('FileManage', 'fileUpload', 'fileManage');
	stuff.items = [req.file.originalname, param.fileType || 1, 'N']; // fileType：1文件，2图片
	stuff.auxiliary = {
		[passport]: req.session.passport 
	}; 
	stuff.essences = [sc.instanceEssence(null, req.file.buffer)];
	sc.send(stuff).then((resp) => {
		res.json(resp);
	});
});
//上传下载 通用                   ↓↓↓↓↓↓
router.all('/fileupload_editor', multer().single('upload'), function(req, res) { //上传组件必须有data{fileType:1}
	let param = req.body;
	const stuff = sc.instanceRequest('FileManage', 'fileUpload', 'fileManage');
	stuff.items = [req.file.originalname, param.fileType || 1, 'N']; // fileType：1文件，2图片
	stuff.essences = [sc.instanceEssence(null, req.file.buffer)];
	stuff.auxiliary = {
		[passport]: req.session.passport 
	}; 
	sc.send(stuff).then((resp) => {
			res.json(resp);
	});
});
//上传头像截图信息
router.all('/fileuploadBlob', multer().single('file'), function(req, res) { //上传组件必须有data{fileType:1}
	let param = req.body;
	const stuff = sc.instanceRequest('FileManage', 'fileUpload', 'fileManage');
	stuff.items = [param.name, 2, 'N']; // fileType：1文件，2图片
	stuff.auxiliary = {
		[passport]: req.session.passport };
	stuff.essences = [sc.instanceEssence(null, req.file.buffer)];
	sc.send(stuff).then((resp) => {
		res.json(resp);
	});
});
router.all('/filedownload*', function(req, res) {
	if (!req.query.url) {
		res.json('下载失败');
		return;
	}
	let url = req.query.url.trim();
	let name = '';
	if (req.query.name) {
		name = req.query.name.trim();
	}
	const stuff = sc.instanceRequest('FileManage', 'getFileByte', 'fileManage');
	stuff.items = [url];
	let prefix = '';
	let suffix = url.slice(url.lastIndexOf('.'), url.length);
	if (name.lastIndexOf('.') == -1 && name.length > 0) {
		prefix = name;
	} else {
		prefix = name && name.length > 0 ? name.slice(0, name.lastIndexOf('.')) : url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.') - 1);
	}
	let fileName = prefix + suffix;
	stuff.auxiliary = {
		[passport]: req.session.passport };
	sc.send(stuff).then((resp) => {
		res.set({
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': 'attachment; filename=' + encodeURIComponent(fileName),
			'Content-Length': resp.essences[0].byteBuffer.length,
		});
		res.send(resp.essences[0].byteBuffer);
	});
});

module.exports = { router, sc, passport };