'use strict'

var express = require('express')
var mysql = require('mysql')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)
var redis = require('redis')
var bodyParser = require('body-parser')
var app = express()
var router = express.Router()
//template engine
var engine = require('./engine.js')
//load environment variables
require('dotenv').load()

app.engine('html',engine);
app.set('views','./public')
app.set('view engine','html');

app.use(express.static('public'))

//use session middleware
app.use(session({
  store: new RedisStore({
    client:redis.createClient()
  }),
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}));

//temporary
app.get('/login',function(req,res)
{
  req.session.login = 'hi';
  res.redirect('/');
});


app.get('/',function(req,res){
  var theSession = req.session;
  if(!theSession.login)
    res.send('Please Login before accessing system');
  else
    res.render('index',{var1:'WinXp'});
});

//routers
router.all('/api/',function(req,res,next){
  res.send('NOOP');
})
//api router

//api/debug router
var debugRouter = express.Router();
debugRouter.use(bodyParser.urlencoded({extended:true}))
debugRouter.get('/api/debug',function(req,res)
{
  for(var o in req.query)
  {
    console.log('[Debug]: <GET>' + o + ':' + req.query[o])
  }
  if(!req.xhr) res.redirect('/');
})

debugRouter.post('/api/debug',function(req,res)
{
  for(o in req.body)
  {
    console.log('[Debug]: <POST>' + o + ':' + req.body[o])
  }
  if(!req.xhr) res.redirect('/');
});

app.use(router)
app.use(debugRouter)

app.listen(3000,function()
{
  console.log('Listening on port 3000');
});
