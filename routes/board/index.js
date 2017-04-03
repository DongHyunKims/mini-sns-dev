
/**
 * Created by donghyunkim on 2017. 4. 3..
 */
var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
var Q = require("q");
var multerFile= require("multer")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

var dbConnection =  require("../../model/dbConnection");

const INSERT_BOARD_SQL = "INSERT INTO BOARD_TB VALUES(DEFAULT,?,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,?);";


router.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "../../public/html/board/boardWrite.html"));
});


router.post("/insertBoard",function(req,res){
        let data = req.body;
        let user_id = 1;

        data["user_id"] = user_id;
        console.log("data",data);



        dbConnection.query(INSERT_BOARD_SQL,[data.content,data.user_id],function(err, rows){
        if(err) throw err;
        else{
            res.json(rows);
        }


        // upload(req, res).then(function (file) {
        //     console.log("file",file)
        //
        // }, function (err) {
        // res.send(500, err);
        // });





    });

});

//
// var upload = function(req,res){
//     let deferred = Q.defer();
//     let storage = multerFile.diskStorage({
//         //경로 도찯지
//         destination: function (req, file, callback) {
//             callback(null,  path.join(__dirname, "../../public/images/upload/"));
//         },
//         //server 저장 폴더 지정
//         filename: function (req,file,callback) {
//             file.uploadedFile = {
//                 name : req.body.imgUrl,
//                 //확장자
//                 ext : file.mimetype.split('/')[1]
//             };
//             callback(null,file.uploadedFile.name + '.' + file.uploadedFile.ext);
//         }
//     });
//     var upload = multerFile({ storage: storage }).single('file');
//     upload(req, res, function (err) {
//         if (err) deferred.reject();
//         else deferred.resolve(req.file.uploadedFile);
//     });
//     return deferred.promise;
//
// };

/*

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







module.exports = router;