/*创建登录日志model*/
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let LoginLogSchema = new Schema({
  login_user: {
    user_id: Number,
    user_name: String,
    status: Boolean,
    msg: String
  },
  login_time: Date,
});
let Login_log = mongoose.model('Login_log', LoginLogSchema);
module.exports = Login_log;