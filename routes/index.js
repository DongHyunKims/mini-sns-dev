/**
 * Created by donghyunkim on 2017. 3. 28..
 */
var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

var dbConnection = require("../model/dbConnection");
router.use(express.static('public'));


const SELECT_ALL_BOARD_SQL = "SELECT * FROM BOARD_TB";
//const SELECT_ALL_BOARD_VIEW_SQL = "SELECT * FROM USER_TB U JOIN BOARD_TB B ON U._ID = B.USER_ID";
router.get("/",function(req,res){
     res.sendFile(path.join(__dirname,"../public/html/index.html"));
});





module.exports = router;