const secret = require("../../config").secret;
/**
 * @加密模块
 * @author xiexing
 * */
const crypto = require('crypto');
/**
 * @deprecated
 * @aes192加密模块
 * @param str string 要加密的字符串
 * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
 * @retrun string 加密后的字符串
 * */
exports.getEncAse192 = function (str) {
    let cipher = crypto.createCipheriv("aes192", secret, "xx"); //设置加密类型 和 要使用的加密密钥
    let enc = cipher.update(str, "utf8", "hex");    //编码方式从utf-8转为hex;
    enc += cipher.final("hex"); //编码方式从转为hex;
    return enc; //返回加密后的字符串
};
/**
 * @deprecated
 * @aes192解密模块
 * @param str string 要解密的字符串
 * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
 * @retrun string 解密后的字符串
 * */
exports.getDecAse192 = function (str) {
    let decipher = crypto.createDecipheriv("aes192", secret, "xx");
    let dec = decipher.update(str, "hex", "utf8");//编码方式从hex转为utf-8;
    dec += decipher.final("utf8");//编码方式从utf-8;
    return dec;
};


/**
 * @description 加密
 * @param data 机密的数据
 * @returns {*}
 */
exports.encrypt = function encrypt(data) {
    let decipher = crypto.createCipheriv('aes-128-cbc', secret.key, secret.iv);
    return decipher.update(data, 'binary', 'base64') + decipher.final('base64');
};

/**
 * @description 解密
 * @param crypted
 * @returns {*}
 */
exports.decrypt = function decrypt(crypted) {
    crypted = new Buffer.from(crypted, 'base64').toString('binary');
    let decipher = crypto.createDecipheriv('aes-128-cbc', secret.key, secret.iv);
    return decipher.update(crypted, 'binary', 'utf8') + decipher.final('utf8');
};

//------------test-------------------------
// let enc = this.encrypt("123456");
// console.log(enc);
// let dec = this.decrypt(enc);
// console.log(dec);
//------------test-------------------------

