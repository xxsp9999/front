const uuid = require("node-uuid");
const fs = require("fs");
const send = require('koa-send');
module.exports = {
    'POST /getLastedNews': async (ctx, next) => {
        let data = [];
        data.push("HTML5开发APP有哪些优点和缺点？HTML5优势和劣势大对比");
        data.push("SEO做网站优化需要每天都更新文章吗？");
        data.push("UI设计师现在月薪多少？");
        var res = {};
        res.datas = data;
        res.success = true;
        ctx.response.body = res;
    },
    'POST /getLastedPlans': async (ctx, next) => {
        let data = [];
        data.push("个人博客开发。");
        data.push("备考2019下半年软考中级网络工程师。");
        data.push("准备2021考研。");
        var res = {};
        res.datas = data;
        res.success = true;
        ctx.response.body = res;
    },

    'GET /getLastedPlansForget': async (ctx, next) => {
        console.debug("------------");
        let data = [];
        data.push("个人博客开发。");
        data.push("备考2019下半年软考中级网络工程师。");
        data.push("准备2021考研。");
        var res = {};
        res.datas = data;
        res.success = true;
        ctx.response.body = res;
    },
    //文件下载
    'GET /downLoad': async (ctx, next) => {
        let filePath = ctx.request.query.filePath;
        if (filePath) {
            try {
                let readStream = fs.createReadStream(filePath);
                ctx.response.body = readStream;
            } catch (e) {
                console.error("加载图片路径不存在！");
            }
        } else {
            console.debug("下载文件路径不能为空！");
        }
    },
    //获取用户ip地址和所在城市信息
    'GET /ipInfo': async (ctx, next) => {
        let ip = getClientIP(ctx.request);
        console.log(ip);
        ctx.response.body = ip;
    }
};


/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    /* console.log(req);
     let ip =  req.headers['x-forwarded-for'] ||// 判断是否有反向代理 IP
         req.connection.remoteAddress || // 判断 connection 的远程 IP
         req.socket.remoteAddress || // 判断后端的 socket 的 IP
         req.connection.socket.remoteAddress;
     if(ip.split(',').length>0){
         ip = ip.split(',')[0]
     }
     ip = ip.substr(ip.lastIndexOf(':')+1,ip.length);*/

    // let ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '')
    return  "127.0.0.1";
}


