/**
 * Created by donghyunkim on 2017. 3. 28..
 */
var express = require("express");
var router = express.Router();
var path = require("path");
var dbConnection = require("../model/dbConnection");


const SELECT_ALL_BOARD_SQL = "SELECT * FROM BOARD_TB";
const SELECT_ALL_BOARD_VIEW_SQL = "SELECT U._ID AS userId, U.USER_NICKNAME AS nickname, B.BOARD_CREATED_DATE AS boardCreateDate, B.BOARD_IMG_URL AS boardImgUrl, B.BOARD_PUBLIC_STATE AS boardState, B.BOARD_CONTENT AS boardContent, B._ID AS boardId, B.LIKE_CNT AS boardLikeCnt FROM USER_TB U JOIN BOARD_TB B ON U._ID = B.USER_ID";
//const SELECT_ALL_BOARD_VIEW_SQL = "SELECT * FROM USER_TB U JOIN BOARD_TB B ON U._ID = B.USER_ID";
router.get("/",function(req,res){
    // dbConnection.query(SELECT_ALL_BOARD_VIEW_SQL,function(err, rows){
    //     if(err) throw err;
    //     else if(rows.length === 0) console.log("no data");
    //     else console.log("rows",rows);
    // });
     res.sendFile(path.join(__dirname,"../public/html/index.html"));
});


module.exports = router;