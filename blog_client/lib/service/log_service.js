const mongoConn = require("../utils/mongo_utils");//MongoDB连接
const uuid = require("node-uuid");
const resUtils = require("../utils/res_utils");

let services = {
    /**
     * @description 添加登录日志
     * @param user
     * @returns resInfo
     * @deprecated
     */
    addLoginLog: async function (user) {
        try {
            let log = {};
            log.login_user = user;
            log.login_time = new Date();
            let db = await mongoConn.getMongoConn();
            let collection = db.db('blog').collection('login_log');
            return new Promise(function (resolve, reject) {
                collection.insertOne(log, function (err, data) {
                    if (err) {
                        reject(resUtils(false, "添加登录日志失败"));
                    }
                    resolve(resUtils(true, "添加登录日志成功"));
                });
            });
        } catch (e) {
            return resUtils(false, "添加日志异常");
        }
    },

    /**
     * @author XieXing
     * @description 直接插入mongo文档
     * @param user
     * @returns {Promise<void>}
     */
    insertLoginLog: async function (user) {
        let log = {};
        log.login_user = user;
        log.login_time = new Date();
        try {
            await mongoConn.directInsert(log);
        } catch (e) {
            console.debug(e);
        }

    },

    /**
     * @description mongoose 插入数据
     * @param user
     * @returns {Promise<void>}
     */
    mongooseInsert: async function (user) {
        let log = {};
        log.login_user = user;
        log.login_time = await new Date();
        try {
            let res = await mongoConn.mongooseInsert(log);
            console.log(res);
        } catch (e) {
            console.debug(e);
        }

    },
};

module.exports = services;

