
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
const SELECT_ALL_BOARD_VIEW_SQL = "SELECT U._ID AS userId, U.USER_PROFILE_IMG_URL AS userProfileImgUrl, U.USER_NICKNAME AS userNickname, B.BOARD_CREATED_DATE AS boardCreateDate, B.BOARD_IMG_URL AS boardImgUrl, B.BOARD_PUBLIC_STATE AS boardPublicState, B.BOARD_CONTENT AS boardContent, B._ID AS boardId, (SELECT count(*) FROM LIKE_TB WHERE B._ID = BOARD_ID) AS boardLikeCnt , (SELECT count(*) FROM LIKE_TB WHERE USER_ID = ? AND B._ID = BOARD_ID) AS likeState FROM USER_TB U JOIN BOARD_TB B ON U._ID = B.USER_ID ORDER BY boardCreateDate DESC;"

const UPDATE_BOARD_SQL = "UPDATE BOARD_TB SET BOARD_CONTENT = ?, BOARD_IMG_URL = ?, BOARD_PUBLIC_STATE = ?, BOARD_UPDATED_DATE = NOW() WHERE _ID=?;";


const SELECT_BOARD_SQL = "SELECT * FROM BOARD_TB WHERE _ID=?;";


const DELETE_BOARD_SQL = "DELETE FROM BOARD_TB WHERE _ID=?;";
const DELETE_LIKE_BOARD_SQL = "DELETE FROM LIKE_TB WHERE BOARD_ID=?;";

const INSERT_LIKE_SQL = "INSERT INTO LIKE_TB VALUES(DEFAULT,?,?);";
const DELETE_LIKE_SQL = "DELETE FROM LIKE_TB WHERE USER_ID=? AND BOARD_ID=?;";
const SELECT_LIKE_SQL = "SELECT count(*) as count, BOARD_ID as boardId FROM LIKE_TB WHERE BOARD_ID=?;";
const SELECT_LIKE_GROUP_SQL = "SELECT count(*) as count, BOARD_ID as boardId FROM LIKE_TB group by BOARD_ID;";


router.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "../../public/html/board/boardWrite.html"));
});


// 게시물 작성
router.post("/insertBoard",upload.single('imgFile'),function(req,res){
        let data = req.body;
        let imgUrl = req.file.path;
        imgUrl = imgUrl.slice(imgUrl.indexOf("/"));

        //session 처리
        let session = req.session.user;
        let user_id = Number(session._ID);
        if(imgUrl === "" || imgUrl === undefined) imgUrl  = "images/default/default-thumbnail.jpg";
        dbConnection.query(INSERT_BOARD_SQL,[data.content,imgUrl,Number(data.state),user_id],function(err, rows){
        if(err) throw err;
        else {
            res.json(rows);
        }
    });

});




// 게시물 작성
router.post("/updateBoard",upload.single('imgFile'),function(req,res){
    let data = req.body;
    console.log("data",data);
    let imgUrl = req.file.path;
    imgUrl = imgUrl.slice(imgUrl.indexOf("/"));
    //session 처리
    let session = req.session.user;
    let user_id = Number(session._ID);
    if(imgUrl === "" || imgUrl === undefined) imgUrl  = "images/default/default-thumbnail.jpg";
    dbConnection.query(UPDATE_BOARD_SQL,[data.content,imgUrl,Number(data.state),Number(data.boardId)],function(err, rows){
        if(err) throw err;
        else {
            res.json(rows);
        }
    });

});


// db 데이터 가져오는 라우터
router.get("/getBoards",function(req,res){
    let session = req.session.user;
    let user_id = Number(session._ID);
    
    dbConnection.query(SELECT_ALL_BOARD_VIEW_SQL,[user_id],function(err, rows){
        if(err) throw err;
        else if(rows.length === 0) console.log("no data");
        else{
            let jsonData = rows;
            //console.log(jsonData);
            res.json({boardList : jsonData, userNickname : session.USER_NICKNAME});
        }
    });

});



router.get("/updateRenderBoards/:id",function(req,res){

    let boardId = req.params.id;
    console.log(boardId);

    dbConnection.query(SELECT_BOARD_SQL,[Number(boardId)],function(err, rows){
        if(err) throw err;
        else if(rows.length === 0) console.log("no data");
        else{
            console.log( rows[0]);

            res.render("board/boardUpdate",{boardModel: rows[0]});
        }
    });

});



// db 데이터 삭제 라우터
router.post("/deleteBoards",function(req,res){

    let data = req.body;
    //console.log("data",data);


    dbConnection.query(DELETE_LIKE_BOARD_SQL + DELETE_BOARD_SQL,[Number(data.boardId),Number(data.boardId)],function(err, rows){
        if(err) throw err;
        else if(rows.length === 0) console.log("no data");
        else{
            // let jsonData = createJson(rows);
            // res.json(jsonData);
            res.status(200).send();
        }
    });
});


// 좋아요
router.post("/checkLikeBoards",function(req,res){

    let data = req.body;
    //console.log(data);


    let session = req.session.user;
    let user_id = Number(session._ID);
    let state = data.state;
    let sql = "";
    if(state === "1"){
        sql = DELETE_LIKE_SQL;
    }else{
        sql = INSERT_LIKE_SQL;
    }

    dbConnection.query( sql + SELECT_LIKE_SQL, [user_id,Number(data.boardId),Number(data.boardId)], function(err, rows) {
        if(err) throw err;
        else{
            rows[1][0].boardId = data.boardId;
            res.json(rows[1]);
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