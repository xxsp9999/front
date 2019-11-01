const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const session= require("koa-session");

const controller = require('./controller');

const templating = require('./templating');

const sessionConfig = require("./config").session;

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';


//注册session
app.keys = ['some secret hurr'];
app.use(session(sessionConfig, app));

// 打印url及其访问时长
app.use(async (ctx, next) => {
    // console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 给于用户static文件夹的访问权限
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:注册views文件夹并使用nunjucks模版
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:注册controller
app.use(controller());



app.listen(8088);//注册端口8088
console.log('app started at port 8088...');
