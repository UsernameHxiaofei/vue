const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const bodyParser = require('body-parser')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const jsSHA = require("jssha"); //引入加密模块
const config = require('./config'); //引入配置文件
const getToken = require('./getToken') //引入获取access_token文件

const isProd = process.env.NODE_ENV === 'production'
const microcache = require('route-cache')
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

//在微信中运行需要可以打开   getToken()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const MemoryStore = require('session-memory-store')(session);
app.use(session({
    name: 'linktou', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 120 * 60 * 1000 }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'qribsgdfow21234',
    store: new MemoryStore({
        expires: 60 * 60 * 12, //Defined how long each session will be expired. In second.
        checkperiod: 120 * 60 //Defined how long MemoryStore will check for expired. In second.
    })
}));

// {
//     "token": "weixin",
//     "appId": "wx71989d5a60126579",
//     "appSecret": "371f116949110e98340530af9c2292e6"
// }
//f01f4392bb655850a0b1a2aa6b6af408
//EncodingAESKey:YmvUKbniuOe1c27ku8NclppyRiLxSqHhezQKiEJ9sro
function createRenderer(bundle, options) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, Object.assign(options, {

        // for component caching
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),
        // recommended for performance
        runInNewContext: false
    }))
}

let renderer
let readyPromise
const templatePath = resolve('./src/index.template.html')
if (isProd) {
    // In production: create server renderer using built server bundle.
    // The server bundle is generated by vue-ssr-webpack-plugin.
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('./dist/vue-ssr-server-bundle.json')
        // The client manifests are optional, but it allows the renderer
        // to automatically infer preload/prefetch links and directly add <script>
        // tags for any async chunks used during render, avoiding waterfall requests.
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    })
} else {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = require('./build/setup-dev-server')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options)
        }
    )
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(compression({ threshold: 0 }))
app.use(favicon('./public/logo-48.png'))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'))
    //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx71989d5a60126579&redirect_uri=https%3a%2f%2fwx.linktou.com%2f&response_type=code&scope=snsapi_base&state=123#wechat_redirect
    //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx529e7a6d6b9e284c&redirect_uri=https%3a%2f%2fwx.linktou.com%2f&response_type=code&scope=snsapi_base&state=123#wechat_redirect

app.use('/getOpenId', function(req, res) {
    console.log('getOpenId');
    console.log('req.query.code', req.query);
    console.log('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config.appId + '&secret=' + config.appSecret + '&code=' + req.query.code + '&grant_type=authorization_code');
    request('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config.appId + '&secret=' + config.appSecret + '&code=' + req.query.code + '&grant_type=authorization_code', function(error, response, body) {
        console.log('body:', body, typeof body, JSON.parse(body).openid); // Print the HTML for the Google homepage. 
        req.session.openId = JSON.parse(body).openid
        console.log("res.redirect('/ajax/actorTask/loginWechat');");
        res.redirect('/ajax/actorTask/loginWechat');
        //res.redirect('/index');

    });
});
const { router } = require('./src/backend/process');
app.use('/ajax', router);
app.use('/wx', serve('./public/1.html'));
var request = require('request');


app.use('/url', function(req, res) {
    console.log('/url');
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var signature = req.query.signature, //微信加密签名
        timestamp = req.query.timestamp, //时间戳
        nonce = req.query.nonce, //随机数
        echostr = req.query.echostr; //随机字符串
    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = [config.token, timestamp, nonce];
    array.sort();
    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    //console.log('tempStr', tempStr);
    // const hashCode = crypto.createHash('sha1'); //创建加密类型 
    // var resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密
    var shaObj = new jsSHA("SHA-1", "TEXT");
    //shaObj.setHMACKey("", "TEXT");
    shaObj.update(tempStr);
    var resultCode = shaObj.getHash("HEX");
    //shaObj = new jsSHA(tempStr, 'TEXT');
    //resultCode = shaObj.getHash('SHA-1', 'HEX');
    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    console.log(resultCode, signature);
    if (resultCode === signature) {
        res.send(echostr);
    } else {
        res.send('mismatch');
    }
});
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
// const microCache = LRU({
//     max: 100,
//     maxAge: 1000
// })
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.

function render(req, res) {
    const s = Date.now()

    res.setHeader("Content-Type", "text/html")
    res.setHeader("Server", serverInfo)

    const handleError = err => {
        if (err && err.code === 404) {
            res.status(404).end('404 | Page Not Found')
        } else {
            // Render Error Page or Redirect
            res.status(500).end('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }


    const context = {
        title: '链投科技', // default title
        url: req.url,
        session: req.session
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.send(html)
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
})


const port = process.env.PORT || 8081
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})