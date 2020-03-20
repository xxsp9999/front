const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const LoginLog = require("../model/login_log");
const config = require("../../config");
const resUtils = require("./res_utils");

/**
 * @description 获取MongoDB连接 这种写法有问题：操作时间太长
 * @returns resInfo
 * @deprecated
 */
exports.getMongoConn = async function getMongoConn() {
    try {
        let url = config.mongdb.url;
        return await new Promise(function (resolve, reject) {
            MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true, //添加useUnifiedTopology: true解决警告问题
            }, function (err, db) {
                if (err)
                    reject(er);
                resolve(db);
            });
        });
    } catch (e) {
        console.log("获取mongo连接异常");
        throw e;
    }
};

/**
 * @description 直接插入文档，检查mongo插入缓慢问题
 * @param log
 * @returns {Promise<*>}
 */
exports.directInsert = async function directInsert(log) {
    try {
        let db = await this.getMongoConn();
        let collection = db.db('blog').collection('login_log');
        return new Promise((resolve, reject) => {
            collection.insertOne(log, function (err, data) {
                if (err)
                    reject(err);
                resolve(err);
            });
        })
    } catch (e) {
        throw e;
    }
};

/**
 * @description 直接查找
 * @param logId
 * @returns {Promise<void>}
 * @deprecated 查询无效
 */
exports.directFind = async function directFind(logId) {
    try {
        let db = await this.getMongoConn();
        let collection = db.db('blog').collection('login_log');
        return new Promise((resolve, reject) => {
            collection.find({_id: logId}).toArray(function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            })
        })
    } catch (e) {
        throw e;
    }
};

/**
 * @description mongoose 插入数据
 * @param log
 * @returns {Promise<void>}
 * @constructor
 */
exports.mongooseInsert = async function mongooseInsert(log) {
    try {
        await mongooseConnect();
        let loginLog = new LoginLog(log);
        return loginLog.save();
    } catch (e) {
        throw e;
    }
};

/**
 * @description mongoose查询
 * @param logId
 * @returns {Promise<void>}
 */
exports.mongooseFind = async function mongooseFind(logId) {
    try {
        await mongooseConnect();
        return new Promise((resolve, reject) => {
            LoginLog.findOne({_id: logId}, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            })
        })
    } catch (e) {
        throw  e;
    }
};

/**
 * @description mongose连接数据库
 */
function mongooseConnect() {
    mongoose.connect(config.mongdb.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true, //添加useUnifiedTopology: true解决警告问题
    });
}