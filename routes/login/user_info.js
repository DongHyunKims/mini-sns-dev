var express = require("express");
var app = express();
var router = express.Router();
// var mysql = require('mysql')
var bodyParser = require('body-parser') 
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')


//DATABASE SETTING
//노출되지 않는 곳에 보관하는 방법 고려 
// var connection = mysql.createConnection({
//     host : '192.168.56.101',
//     user : 'instabook_login',
//     password : 'instabook',
//     database : 'test'
// });

// connection.connect()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session)
app.use(flash())

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, function(req, email, password, done) {
        console.log('local-join callback called');
    }
));

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/board',
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
//     var query = connection.query('INSERT INTO node (email, password) VALUES ($1, $2);', [email, password], function(err, rows) {
//         if (err) throw err;
// 		if(rows[0]) {
// 			console.log(rows[0].name)
// 		} else {
// 			console.log('none : ' + rows[0])
// 		}
//     })
// }); 

module.exports = router;