
/**
 * Created by donghyunkim on 2017. 4. 3..
 *
 *
 {}

 { fieldname: 'myfile',

 originalname: '20160224_104138.jpg',

 encoding: '7bit',

 mimetype: 'image/jpeg',

 destination: '/tmp/upload/',

 filename: '8563e0bef6efcc4d709f2d1debb35777',

 path: '/tmp/upload/8563e0bef6efcc4d709f2d1debb35777',

 size: 1268337 }
 */



const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");


router.use(express.static('public'));


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/images/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname+ '-' + Date.now() + "." +file.mimetype.split("/")[1])
    }
});

const upload = multer({ storage: storage });




router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));



const dbConnection =  require("../../model/dbConnection");

const INSERT_BOARD_SQL = "INSERT INTO BOARD_TB VALUES(DEFAULT,?,?,?,DEFAULT,DEFAULT,DEFAULT,?)";
const SELECT_ALL_BOARD_VIEW_SQL = "SELECT U._ID AS userId, U.USER_PROFILE_IMG_URL AS userProfileImgUrl, U.USER_NICKNAME AS userNickname, B.BOARD_CREATED_DATE AS boardCreateDate, B.BOARD_IMG_URL AS boardImgUrl, B.BOARD_PUBLIC_STATE AS boardPublicState, B.BOARD_CONTENT AS boardContent, B._ID AS boardId, B.LIKE_CNT AS boardLikeCnt FROM USER_TB U JOIN BOARD_TB B ON U._ID = B.USER_ID ORDER BY boardCreateDate DESC";
const DELETE_BOARD_SQL = "DELETE FROM BOARD_TB WHERE _id=?";
const INSERT_LIKE_SQL = "INSERT INTO LIKE_TB VALUES(DEFAULT,?,?)";
const DELETE_LIKE_SQL = "DELETE FROM LIKE_TB WHERE USER_ID=? AND BOARD_ID=?";
const SELECT_LIKE_SQL = "SELECT count(*) as count FROM LIKE_TB WHERE BOARD_ID=?";



router.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "../../public/html/board/boardWrite.html"));
});


// 게시물 작성
router.post("/insertBoard",upload.single('imgFile'),function(req,res){
        let data = req.body;
        let imgUrl = req.file.path;
        imgUrl = imgUrl.slice(imgUrl.indexOf("/"));

        //session 처리
        let user_id = 1;
        if(imgUrl === "" || imgUrl === undefined) imgUrl  = "images/default/default-thumbnail.jpg";
        dbConnection.query(INSERT_BOARD_SQL,[data.content,imgUrl,Number(data.state),user_id],function(err, rows){
        if(err) throw err;
        else {
            res.json(rows);
        }
    });

});


// db 데이터 가져오는 라우터
router.get("/getBoards",function(req,res){
    dbConnection.query(SELECT_ALL_BOARD_VIEW_SQL,function(err, rows){
        if(err) throw err;
        else if(rows.length === 0) console.log("no data");
        else{
            let jsonData = createJson(rows);
            res.json(jsonData);
        }
    });

});



// db 데이터 가져오는 라우터
router.post("/deleteBoards",function(req,res){

    let data = req.body;
    console.log("data",data);
    dbConnection.query(DELETE_BOARD_SQL,[Number(data.boardId)],function(err, rows){
        if(err) throw err;
        else if(rows.length === 0) console.log("no data");
        else{
            // let jsonData = createJson(rows);
            // res.json(jsonData);
            res.status(200).send();
        }
    });
});


// db 데이터 가져오는 라우터
router.post("/checkLikeBoards",function(req,res){

    let data = req.body;
    console.log("data",data);


    res.status(200).send();
    let state = data.state;
    let sql = "";
    if(state === "1"){
        sql = DELETE_LIKE_SQL;
    }else{
        sql = INSERT_LIKE_SQL;
    }

    dbConnection.query(sql,[Number(data.userId),Number(data.boardId)],function(err, rows){
        if(err) throw err;
        else{
            // dbConnection.query(SELECT_LIKE_SQL,[Number(data.boardId)],function(err, rows){
            //     if(err) throw err;
            //     else{
            //         let jsonData = rows[0];
            //         console.log(jsonData.count);
            //         res.status(200).send(jsonData.count + "");
            //     }
            //
            // });
            let jsonData = rows;
            console.log(jsonData);
            res.status(200).send();
        }
    });
});




function createJson(rows){
    return rows.map(function(val){
        //console.log("val",val);
        return val;
    });
}






module.exports = router;