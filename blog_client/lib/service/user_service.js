const mysqlUtils = require("../utils/mysql_utils");//mysql连接
const resUtils = require("../utils/res_utils");
const enc = require("../utils/encrypt_utils");//引入加密工具
const logService = require("./log_service");
let services = {
    /**
     * @description 添加用户
     * @param request
     */
    addUser: async function (request) {
        try {
            let {email, password} = request.body;
            let repeatSql = "select id from user where user_name = ?";
            let res = await mysqlUtils.sqlPoolQuery(repeatSql, [email]);
            if (res.length > 0) {
                return resUtils(false, "该用户已存在");
            }
            sql = "insert into user(user_name,user_password,add_time) values(?,?,?)";
            let p = await mysqlUtils.sqlPoolQuery(sql, [email, password, new Date()]);
            return resUtils(true, "添加用户成功");
        } catch (e) {
            return resUtils(false, "添加用户异常");
        }
    },

    /**
     * @description 用户登录验证
     * @param request
     */
    verifyUser: async function (request) {
        let loginLog = {};
        try {
            let {email, password} = request.body;
            let sql = "select id,user_name,user_password from user where user_name = ? and user_password = ?";
            let res = await mysqlUtils.sqlPoolQuery(sql, [email, enc.encrypt(password)]);
            loginLog = {user_name: email};
            if (res.length > 0) {
                loginLog.user_id = res[0].id;
                loginLog.status = true;
                loginLog.msg = "登录成功";
                logService.mongooseInsert(loginLog);
                return resUtils(true, "登录成功", {email});
            } else {
                console.log("用户不存在，登录失败");
                loginLog.status = false;
                loginLog.msg = "用户不存在，登录失败";
                logService.mongooseInsert(loginLog);
                return resUtils(false, "用户不存在");
            }
        } catch (e) {
            console.log("登录异常:" + e);
            loginLog.status = true;
            loginLog.msg = "登录异常:" + e;
            logService.mongooseInsert(loginLog);
            return resUtils(false, "登录异常，请稍后重试");
        }
    }
};

module.exports = services;
