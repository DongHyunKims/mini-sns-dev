
/**
 * Created by hwigyumKIM on 2017. 4. 3..
 */
var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var router = express.Router();
var path = require('path');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy


/////////설정부분
var dbConnection =  require("../../model/dbConnection");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

// passport.serializeUser(function(user, done) {
//   console.log("passport session save : ", user)
//   done(null, user);
// });
// passport.deserializeUser(function(id, done) {
//     console.log("passport session get id : ", id)
//     done(null, id);
// });
//////////////////////////////////////////////////


// hwigyumKIM 작성부분
router.get("/", function(req,res){
	console.log("/routes/signup enter hello");

	var msg="";
	var errMsg = req.flash('error');
	if(errMsg) msg = errMsg;

	res.render('signup/signup.ejs', {'message': msg})

	// res.sendFile(path.join(__dirname, "../../public/html/signup/signup.html"))
})

router.post('/', function(req,res){
	console.log('/router/signup post enter');
	var data = req.body;
	var responseData = {};
	
	var sql = {USER_EAMIL:data.email, USER_PASSWARD:data.password, USER_NAME:data.name, USER_NICKNAME:data.nickname}
	var query = dbConnection.query('select * from USER_TB where USER_EAMIL=?',[data.email] ,function(err,rows){

		console.log(rows)
		if(err){
			console.log('local-signup callback ERROR called');
			return done(err);
		}
		if(rows.length){
			//비정상인 경우
			console.log("existed user")
			return res.redirect('/signup');
		} else{
			console.log("정상적인경우");
			var query = dbConnection.query('insert into USER_TB set ?', sql, function(err,rows){
				if(err) throw err
				return res.redirect('/login');
			})
		}
	})
})


//프로그램 끝.
module.exports = router;

// passport.use('local-signup', new LocalStrategy({
// 	usernameField: 'email',
// 	passwordField: 'password',
// 	passReqToCallback: true
// }, function(req,email,password, done){
// 	console.log('local-signup callback enter');
// 	// console.log(email, password);
// 	// console.log(req.body)
// 	var data = req.body;
// 	var responseData = {};
	
// 	var sql = {USER_EAMIL:data.email, USER_PASSWARD:data.password, USER_NAME:data.name, USER_NICKNAME:data.nickname}
// 	var query = dbConnection.query('select * from USER_TB where USER_EAMIL=?',[email] ,function(err,rows){
// 		console.log(email)
// 		console.log(rows)
// 		if(err){
// 			console.log('local-signup callback ERROR called');
// 			return done(err);
// 		}
// 		if(rows.length){
// 			//비정상인 경우
// 			console.log("existed user")
// 			return done(null, false, {message: "your email is already used"})
// 		} else{
// 			console.log("정상적인경우");
// 			var query = dbConnection.query('insert into USER_TB set ?', sql, function(err,rows){
// 				if(err) throw err
// 				return done(null, {'email':email, 'id':rows.insertId, 'status':'ok'});
// 			})
// 		}
// 	})
// 	}
// ));

// router.post('/', function(req,res){
// 	console.log("/router/signup post")
// 	console.log(req.body)
// 	console.log(req.body.email)
// })


//***수정필요
// router.post('/', passport.authenticate('local-signup',{
// 	successRedirect: '/board',
// 	failureRedirect: '/signup',
// 	failureFlash: true
// }))


// router.post("/insertSignup",function(req,res){
// 	console.log("/routes/signup/insertSignup");
// 	// console.log(req.body);
// 	var data = req.body;
// 	var responseData = {};
	
// 	var sql = {USER_EAMIL:data.email, USER_PASSWARD:data.password, USER_NAME:data.name, USER_NICKNAME:data.nickname}
// 	var insert = dbConnection.query('insert into USER_TB set ? ', sql, function(err,rows){
// 		console.log("rows");
// 		console.log(rows);		
// 		if(err){
// 			throw err;
// 		}
		
// 		if(rows[0]){
// 			console.log("insert ok");
// 			// console.log(rows[0]);
// 			responseData.status = "ok";
// 			responseData.data = rows;		
// 		} else{
// 			console.log("insert none");
// 			responseData.status = "none";
// 			responseData.data = rows;
// 		}
// 		// res.json(responseData);
// 	})
// 	console.log("insert function done");  
// 	console.log(insert);
// })


//테스트용 DB연결부분
// var mysql = require('mysql')
// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'bk',
// 	password: 'test1234',
// 	database: 'instabookDB'
// })
// connection.connect();

//성공했는거
//	var insert = connection.query('insert into user_tb(USER_EAMIL, USER_PASSWARD, USER_NAME, USER_NICKNAME) values(?, ?, ?, ?)',[data.email, data.password, data.name, data.nickname], function(err,rows){
//		console.log("rows");
//		console.log(rows);		
//		if(err){
//			throw err;
//		}
//		
//		if(rows[0]){
//			console.log(rows[0]);		
//		} else{
//			console.log("none");
//		}
//		res.json(responseData);
//	})
//	console.log("insert");  
//	console.log(insert);
//	
	
//	var insert = connection.query('insert into user_tb(USER_EAMIL, USER_PASSWARD, USER_NAME, USER_NICKNAME) values(' + '"' +data.email+ '", "' + data. password + '", "'+ data.name + '", "' + data.nickname+ '"' +')', function(err,rows){
//		console.log("rows");
//		console.log(rows);		
//		if(err){
//			throw err;
//		}
//		
//		if(rows[0]){
//			console.log(rows[0]);		
//		} else{
//			console.log("none");
//		}
//		res.json(responseData);
//	})
//	console.log("insert");  
//	console.log(insert);
//	
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