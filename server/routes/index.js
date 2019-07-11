var express = require('express');
var router = express.Router();
var User = require("../models/user")

var bcrypt = require("bcrypt")
/* GET home page. */
router.get('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', async function(req, res, next) {
  var result = await User.find();
  res.json(result);
});
router.get('/login', async function(req, res, next) {
  var result = {}
  var index = req.originalUrl.indexOf('?');
  if(index!=-1){
    var search = req.originalUrl.slice(index+1).split(/[=&]+/)
    var result = await User.findOne({'email':search[1]});
    if(result == null){
      result = {}
    }else{
      if(!await bcrypt.compare(search[3],result.pass)){
        result = {};
      }
    }
  }
  res.json(result);
});
router.get('/email', async function(req, res, next) {
  var index = req.originalUrl.indexOf('?');
  if(index!=-1){
    var search = req.originalUrl.slice(index+1).split(/[=&]+/)
    var result = await User.findOne({'email':search[0]});
  }
  res.json(result);
});
router.post('/user', async function(req, res, next) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    pass: await bcrypt.hash(req.body.pass, 10),
  })
  await user.save();
});

module.exports = router;