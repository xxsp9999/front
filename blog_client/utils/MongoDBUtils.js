const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const LoginLog = require("../model/LoginLog");
const config = require("../config");
const resInfo = require("./resInfoUtils");

/**
 * @description 获取MongoDB连接 这种写法有问题：操作时间太长
 * @returns resInfo
 * @deprecated
 */
exports.getMongoConn = async function getMongoConn() {
    let url = config.mongdb.url;
    let p = new Promise(function (resolve, reject) {
        MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true, //添加useUnifiedTopology: true解决警告问题
        }, function (err, db) {
            if (err)
                reject(er);
            resolve(db);
        });
    });
    let res;
    await p.then(function (db) {
        res = resInfo(true, "获取mongo连接成功", db);
    }).catch(function (e) {
        res = resInfo(false, "获取mongo连接失败", e);
    });
    return res;
}

/**
 * @description 直接插入文档，检查mongo插入缓慢问题
 * @param user
 * @returns {Promise<*>}
 */
exports.directInsert = async function directInsert(log) {
    let url = config.mongdb.url;
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true, //添加useUnifiedTopology: true解决警告问题
    }, function (err, db) {
        let collection = db.db('blog').collection('login_log');
        collection.insertOne(log,function (err,data) {
            if(err)
                console.error(err);
            console.debug(data.insertedId);
        });
    });
}

/**
 * @description 直接查找
 * @param logId
 * @returns {Promise<void>}
 * @deprecated 查询无效
 */
exports.directFind = async function directFind(logId) {
    let url = config.mongdb.url;
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true, //添加useUnifiedTopology: true解决警告问题
    }, function (err, db) {
        let collection = db.db('blog').collection('loginlogs');
        let result = collection.find({_id:logId}).toArray(function (err,result) {
            if(err)
                console.debug(err);
            console.debug("查询结果："+result);
        })

    });
}

/**
 * @description mongoose 插入数据
 * @param log
 * @returns {Promise<void>}
 * @constructor
 */
exports.mongooseInsert = async function mongooseInsert(log) {
    mongoose.connect(config.mongdb.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true, //添加useUnifiedTopology: true解决警告问题
    });
    let loginLog = new LoginLog(log);
    loginLog.save().then(function (data) {
        console.debug(data._id);
    }).catch(function (err) {
        console.debug(err);
    })
}

/**
 * @description mongoose查询
 * @param logId
 * @returns {Promise<void>}
 */
exports.mongooseFind = async function mongooseFind(logId) {
    mongoose.connect(config.mongdb.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true, //添加useUnifiedTopology: true解决警告问题
    });
    LoginLog.findOne({_id:logId},function (err,loginLog) {
        console.debug("loginLog:"+loginLog);
    })
}