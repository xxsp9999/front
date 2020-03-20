const mysql = require("mysql");
const config = require("../../config");
/**
 * @description 执行sql语句
 * @param sql
 * @param arr
 * @returns {Promise<p>}
 */
exports.sqlQuery = function (sql, arr) {
    return new Promise(function (resolve, reject) {
        try {
            let connection = mysql.createConnection(config.mysql);
            connection.query(sql, arr, function (err, data) {
                if (err)
                    reject(err);
                connection.release();
                resolve(data);
            });
        } catch (err) {
            resolve(err);
        }
    });
};

/**
 * @description 采用连接池 执行sql
 * @param sql
 * @param arr
 */
exports.sqlPoolQuery = async function (sql, arr) {
    return new Promise(function (resolve, reject) {
        try {
            let connnection = mysql.createPool(config.mysql);
            connnection.getConnection(function (err, conn) {
                if (err) {
                    reject(err);
                }
                try {
                    conn.query(sql, arr, function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        conn.release();
                        resolve(result);
                    })
                } catch (e) {
                    reject(e);
                }
            })
        } catch (err) {
            reject(err);
        }
    });
};