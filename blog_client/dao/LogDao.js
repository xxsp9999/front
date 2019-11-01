const mongoConn = require("../utils/MongoDBUtils");//MongoDB连接
const uuid = require("node-uuid");
const resInfo = require("../utils/resInfoUtils");
/**
 * @description 添加登录日志
 * @param user
 * @returns resInfo
 * @deprecated
 */
exports.addLoginLog = async function addLoginLog(user) {
    let log = {};
    log.login_user = user;
    log.login_time = new Date();
    let res = await mongoConn.getMongoConn();
    if (res.success === true) {
        let db = res.data;
        let collection = db.db('blog').collection('login_log');
        let p = new Promise(function (resolve,reject) {
            collection.insertOne(log,function (err,data) {
                if(err){
                    reject(resInfo(false,"添加登录日志失败",err));
                }
                resolve(resInfo(true,"添加登录日志成功",data));
            });
        });
        await p.then(function (data) {
            res = data;
        }).catch(function (err) {
            res = err;
        });
        return res;
    }else{
        return res;
    }
}

/**
 * @author XieXing
 * @description 直接插入mongo文档
 * @param user
 * @returns {Promise<void>}
 */
exports.insertLoginLog = async function insertLoginLog(user) {
    let log = {};
    log.login_user = user;
    log.login_time = new Date();
    try{
        await mongoConn.directInsert(log);
    }catch (e) {
        console.debug(e);
    }

}

/**
 * @description mongoose 插入数据
 * @param user
 * @returns {Promise<void>}
 */
exports.mongooseInsert = async function mongooseInsert(user) {
    let log = {};
    log.login_user = user;
    log.login_time = await new Date();
    try{
        await mongoConn.mongooseInsert(log);
    }catch (e) {
        console.debug(e);
    }

}