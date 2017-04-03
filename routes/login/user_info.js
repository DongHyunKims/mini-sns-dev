var express = require("express");
var app = express();
var router = express.Router();
var path = require('path')
var bodyParser = require('body-parser') 


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.post('/', function(req,res){
    res.send({'email': req.body.email, 'password': req.body.password});
})

module.exports = router;