const config = require("../config");
var mysql      = require('mysql');
var connection = mysql.createConnection(config.mysql);

connection.connect();
//测试数据库
connection.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});