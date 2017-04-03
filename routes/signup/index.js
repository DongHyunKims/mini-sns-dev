
/**
 * Created by hwigyumKIM on 2017. 4. 3..
 */
var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
module.exports = router;

//DB연결부분
var mysql = require('mysql')
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'bk',
	password: 'test1234',
	database: 'instabookDB'
})
connection.connect();

// hwigyumKIM 작성부분
router.get("/", function(req,res){
	console.log("/signup enter");
	res.sendFile(path.join(__dirname, "../../public/html/signup/signup.html"))
})

router.post("/insertSignup",function(req,res){
	console.log("insertSignup");
	console.log(req.body);
	var data = req.body;
	var responseData = {};
	
	var insert = connection.query('insert into user_tb(USER_EAMIL, USER_PASSWARD, USER_NAME, USER_NICKNAME) values(' + '"' +data.email+ '", "' + data. password + '", "'+ data.name + '", "' + data.nickname+ '"' +')', function(err,rows){
		console.log("rows");
		console.log(rows);		
		if(err){
			throw err;
		}
		
		if(rows[0]){
			console.log(rows[0]);		
		} else{
			console.log("none");
		}
		res.json(responseData);
	})
	console.log("insert");  
	console.log(insert);
	
//	var query = connection.query('select _ID, USER_EAMIL, USER_PASSWARD, USER_NAME, USER_NICKNAME from user_tb', function(err,rows){
//		if(err){
//			throw err;
//		}
//		if(rows[0]){
//			console.log(rows[0]);
//		} else{
//			console.log("none");
//		}
//		res.json(responseData)
//	})
})

