var express = require("express");
var app = express();
var router = express.Router();
//var mysql = require('mysql')
var bodyParser = require('body-parser') 
//var flash = require('connect-flash')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var dbConnection = require("../../model/dbConnection");


// DATABASE SETTING
// 노출되지 않는 곳에 보관하는 방법 고려 
// var connection = mysql.createConnection({
//     host : '192.168.56.101',
//     user : 'instabook_login',
//     password : 'instabook',
//     database : 'instadb'
// });

//connection.connect()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }))
// app.use(passport.initialize())
// app.use(passport.session)
//app.use(flash())



router.get('/', function(req, res) {
 console.log("asdfasdf");
 res.render('login.ejs')
//  var msg;
//  var errMsg = req.flash('error')
//  if (errMsg) msg = errMsg;
//  res.render('login.ejs', {'message' : msg });
})

passport.serializeUser(function(user, done) {
    console.log('passport session save: ', user)
    done(null, user)
});

passport.deserializeUser(function(id, done) {
    console.log('passport session get id: ', id)
    done(null, id);
}) 

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',

    passReqToCallback: true
    }, function(req, email, password, done) {
        var query = dbConnection.query('SELECT * FROM USER_TB WHERE USER_EAMIL=? AND USER_PASSWORD=?', [email, password], function(err, rows) {
            if(err) return done(err);

            if (rows.length) {
                //세션에 담을 정보 
                req.session.some = rows[0];
                // console.log(req.session.some)
                console.log('user exists')
                console.log(rows[0]);
                return done(null, {'USER_EAMIL': email, 'id': rows[0]._ID});
            } else {
                return done(null, false, {message : 'Sorry, your email or password was incorrect.'})
            }
        })
    }
));

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true })

)


// router.post('/', function(req,res){
//     res.send({'email': req.body.email, 'password': req.body.password});
// })

// router.post('/', function(req, res){
//     var email = req.body.email;
//     var password = req.body.password;
//     var responseData = {};
//     var query = connection.query('INSERT INTO instatable (email, password) VALUES (?, ?);', [email, password], function(err, rows) {
//         if (err) throw err;
// 		if(rows[0]) {
// 			console.log(rows[0].name)
// 		} else {
// 			console.log('none : ' + rows[0])
// 		}
//     })
// }); 

module.exports = router;