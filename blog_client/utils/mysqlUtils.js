const mysql = require("mysql");
const config = require("../config");
/**
 * @description 执行sql语句
 * @param sql
 * @param arr
 * @returns {Promise<any>}
 */
exports.sqlQuery = function (sql, arr) {
    let p = new Promise(function (resolve, reject) {
        try {
            let connection = mysql.createConnection(config.mysql);
            connection.query(sql, arr, function (err, data) {
                if (err)
                    reject(err);
                resolve(data);
            });
        } catch (err) {
            resolve(err);
        }
    })
    return p;
};

/**
 * @description 采用连接池 执行sql
 * @param sql
 * @param arr
 */
exports.sqlPoolQuery = function (sql, arr) {
    let p = new Promise(function (resolve, reject) {
        let connnection = mysql.createPool(config.mysql);
        connnection.getConnection(function (err, conn) {
            if (err)
                reject(err);
            conn.query(sql, arr, function (err, result) {
                if (err)
                    reject(err);
                conn.release();
                resolve(result);
            })
        })
    })
    return p;
}