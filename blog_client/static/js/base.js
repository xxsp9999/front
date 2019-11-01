/**
 * @description ajax通用方法
 * @param url 路径
 * @param method 方法名
 * @param data 数据（类型：对象）
 * @returns {Promise<*>}
 */
async function ajaxMethod(url, type, data) {
    let res;
    await $.ajax({
        url: url,
        type: type,
        dataType: "json",
        data:data,
        success: function (result) {
            res = result;
        },
        error(err) {
            res = err;
        }
    });
    return res;
}