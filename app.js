/**
 * Created by donghyunkim on 2017. 3. 28..
 */
const express = require("express");
const app = express();
const main = require("./routes");
const board = require("./routes/board");
//var login = require("./routes/login");
//var signup = require("./routes/signup");

const bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");


app.use("/main", main);
app.use("/board", board);
//app.use("/login", login);
//app.use("/signup", signup);



app.listen(3000, function(){
    console.log("3000 port connect!!!");
});




