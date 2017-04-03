var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, + "../public/html/login.html"))
    res.sendFile(path.join(__dirname, + "../public/css/login.css"))
})

module.exports = router; 