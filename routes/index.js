/**
 * Created by donghyunkim on 2017. 3. 28..
 */
var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
    res.send("<h1>hello!!!!!!!</h1>");
});

module.exports = router;