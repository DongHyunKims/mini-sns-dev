/**
 * Created by donghyunkim on 2017. 3. 28..
 */

var express = require("express");
var app = express();
var main = require("./routes");
var board = require("./routes/board");
var login = require("./routes/login");
var user_info = require("./routes/login/user_info")
//var signup = require("./routes/signup");
var flash = require('connect-flash')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var bodyParser = require("body-parser");
var signup = require("./routes/signup");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");


app.use("/main", main);
app.use("/board", board);
app.use("/login", login);
app.use("/user_info", user_info.router);
app.use("/signup", signup);




app.listen(3000, function(){
    console.log("3000 port connect!!!");
});




