const mysqlConn = require("../utils/mysqlUtils");//mysql连接
const resInfo = require("../utils/resInfoUtils");
const logDao = require("../dao/LogDao");

/**
 * @description 添加用户
 * @param user
 * @returns resInfo
 */
exports.addUser = async function addUser(user) {
    let sql = "insert into user(user_name,user_password,add_time) values(?,?,?)";
    // let p = mysqlConn.sqlQuery(sql, [user.userName, user.userPassword, new Date()]);
    let p = mysqlConn.sqlPoolQuery(sql, [user.userName, user.userPassword, new Date()]);
    let res;
    await p.then(function (result) {
        res = resInfo(true, "添加用户成功", result.insertId)
    }).catch(function (err) {
        res = resInfo(false, "添加用户失败", err);
    })
    return res;
};

/**
 * @description 用户登录验证
 * @param user
 * @returns resInfo
 */
exports.virifyUser = async function addUser(user) {
    let sql = "select id,user_name,user_password from user where user_name = ? and user_password = ?";
    let p = mysqlConn.sqlQuery(sql, [user.userName, user.userPassword]);
    let res;
    await p.then(async function (data) {
        if (data.length > 0) {
            user = data[0];
            delete user.user_password;
            try {
                await logDao.mongooseInsert(user);//保存登录日志
                res = resInfo(true, "用户验证成功", user);
            } catch (e) {//保存日志失败
                res = resInfo(false, "系统错误", "");
            }
        } else {
            res = resInfo(false, "用户名或密码错误", "");
        }
    }).catch(function (err) {
        res = resInfo(false, "数据库连接失败，请联系管理员", err);
    });
    return res;
};