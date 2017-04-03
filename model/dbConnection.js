/**
 * Created by donghyunkim on 2017. 4. 3..
 */

const fs = require("fs");
var mysql = require("mysql");
//mysql connectio을 위한 객체 생성, mysql 모듈은 createConnection 모듈을 사용 해 만든다
const dbConfig  = fs.readFileSync("/instabookDatacnf/instabookDataConfig.json","utf-8");

const dbConnection = mysql.createConnection(JSON.parse(dbConfig));
dbConnection.connect();

module.exports = dbConnection;