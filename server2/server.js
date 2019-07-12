const express = require('express')
const fetch = require("node-fetch");
const redis = require('redis')
const cookieParser= require('cookie-parser')
var bcrypt = require("bcrypt")
// create express application instance
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// create and connect redis client to local instance.
const client = redis.createClient(6379)
 
// echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});
 
app.get('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.get('/', function(req, res, next) {
});

app.get('/user', async function(req, res, next) {
});
app.get('/login', async function(req, res, next) {
    var index = req.originalUrl.indexOf('?');
    if(index!=-1){
        var search = req.originalUrl.replace('%40','@').slice(index+1).split(/[=&]+/)
        client.hgetall(search[1],async function(err,reply) {
            if(reply == null){
                res.json(reply);
            }else{
               if(!await bcrypt.compare(search[3],reply.password)){
                    res.json(null)
                }else{
                    res.json(reply) 
                }
            }
        });
    }
});
app.get('/email', async function(req, res, next) {
    var index = req.originalUrl.indexOf('?');
    if(index!=-1){
        var search = req.originalUrl.slice(index+1).split(/[=&]+/)
        client.hgetall(search[0],function(err,reply) {
            res.json(reply);
        });
    }   
});
app.post('/user', async function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var pass =  await bcrypt.hash(req.body.pass, 10);
    client.hmset(email,"username",username,"password",pass);
});






// start express server at 3000 port
app.listen(3000, () => {
    console.log('Server listening on port: ', 3000)
});