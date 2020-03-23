let config = {
  //mongo数据库信息
  mongdb: {
    url: 'mongodb://blog:blog^&5583@180.76.104.38:27017/blog',//带用户名密码
    // url: 'mongodb://localhost:27017/blog',
    poolsize: 20
  },
  //mysql数据库信息
  //本地
  /*mysql: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'blog',
    acquireTimeout: 2000,
    connectionLimit: 100
  },*/

  //服务器
  mysql: {
    host: '127.0.0.1',
    user: 'blog',
    password: 'blog^&5583',
    port: '3306',
    database: 'blog',
    acquireTimeout: 2000,
    connectionLimit: 100
  },
  //session设置
  session: {
    key: 'koa:sess',
    maxAge: 1 * 60 * 60 * 1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
  },
  secret: {
    key: "123456789abcdefg" || "xxsp9999",//密钥
    iv: "123456789abcdefg" //初始化向量
  },
  //标记设置
  mark: {
    sourceFile: "/xx_blog_data/mark/source",//源文件
  },
  //文件上传
  upload: {
    path: "public/project/upload"
  }

};
module.exports = config;