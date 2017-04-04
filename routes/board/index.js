
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



var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
var multer = require("multer");


router.use(express.static('public'));


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/images/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname+ '-' + Date.now() + "." +file.mimetype.split("/")[1])
    }
});

var upload = multer({ storage: storage });




router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));



var dbConnection =  require("../../model/dbConnection");

const INSERT_BOARD_SQL = "INSERT INTO BOARD_TB VALUES(DEFAULT,?,?,?,DEFAULT,DEFAULT,DEFAULT,?)";
const SELECT_ALL_BOARD_VIEW_SQL = "SELECT U._ID AS userId, U.USER_PROFILE_IMG_URL AS userProfileImgUrl, U.USER_NICKNAME AS userNickname, B.BOARD_CREATED_DATE AS boardCreateDate, B.BOARD_IMG_URL AS boardImgUrl, B.BOARD_PUBLIC_STATE AS boardPublicState, B.BOARD_CONTENT AS boardContent, B._ID AS boardId, B.LIKE_CNT AS boardLikeCnt FROM USER_TB U JOIN BOARD_TB B ON U._ID = B.USER_ID";

router.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "../../public/html/board/boardWrite.html"));
});


router.post("/insertBoard",upload.single('imgFile'),function(req,res){

    // console.log(req.body); //form fields
    // console.log(req.file.path); //form file
        let data = req.body;
        let imgUrl = req.file.path;
        //session 처리
        let user_id = 1;
        if(imgUrl === "" || imgUrl === undefined) imgUrl  = "public/images/default/default-thumbnail.jpg";
        dbConnection.query(INSERT_BOARD_SQL,[data.content,imgUrl,Number(data.state),user_id],function(err, rows){
        if(err) throw err;
        else {
            res.json(rows);
        }
    });

});



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




function createJson(rows){

    return rows.map(function(val){
        return val;
    });

}






module.exports = router;