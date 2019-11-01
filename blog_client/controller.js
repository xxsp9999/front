
const fs = require('fs');

// add url-route in /controllers:
//过滤并注册请求路径
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {//get请求
            var path = url.substring(4);
            router.get(path, mapping[url]);
            // console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {//post请求
            var path = url.substring(5);
            router.post(path, mapping[url]);
            // console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {//put请求
            var path = url.substring(4);
            router.put(path, mapping[url]);
            // console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {//delete请求
            var path = url.substring(7);
            router.del(path, mapping[url]);
            // console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
//注册controller文件夹下的请求路径
function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
