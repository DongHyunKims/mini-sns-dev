/**
 * Created by donghyunkim on 2017. 4. 3..
 */

var mysql = require("mysql");
//mysql connectio을 위한 객체 생성, mysql 모듈은 createConnection 모듈을 사용 해 만든다
const dbConnection = mysql.createConnection({
    host : "192.168.56.101",
    user : "instabook",
    password :  "instabook12",
    port : 3306,
    database : 'instabookDB'
});
dbConnection.connect();


module.exports = dbConnection;