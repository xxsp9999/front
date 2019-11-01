/**
 * @description 信息返回封装
 * @param success
 * @param msg
 * @param data
 */
module.exports = function resInfoUtils(success,msg,data) {
    let res = {};
    res.success = success;
    res.msg = msg;
    res.data = data;
    return res;
}