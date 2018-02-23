var express = require("express");  
var bodyParser = require("body-parser");  
var jwt = require("jwt-simple");  
var auth = require("./auth.js")();  
var app = express();
var mongoose = require("mongoose");
var routes = require('./routes');
var proxy = require('http-proxy-middleware'); //for api gateway

mongoose.connect(process.env.AUTHDATABASEURL || 'mongodb://localhost/authdb', {useMongoClient: true});

app.use(auth.initialize());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


/**
 * Configure trades proxy
 */
var tptarget = process.env.TRADEPROXY || 'http://localhost:3002';
var tradesProxy = proxy({
    target: tptarget,
    changeOrigin : !!process.env.TRADEPROXY,
    logLevel: 'debug'
  });
console.log("Trade proxy ---->"+process.env.TRADEPROXY);
app.use('/trades',auth.authenticate(), tradesProxy);
app.use('/trade',auth.authenticate(), tradesProxy);

/**
 * Configure refData proxy
 */
var rptarget = process.env.REFDATAPROXY || 'http://localhost:3003';
var refDataProxy = proxy({
    target: rptarget,
    changeOrigin : !!process.env.REFDATAPROXY,
    logLevel: 'debug'
  });
console.log("Ref data proxy ---->"+process.env.REFDATAPROXY);
app.use('/getRefData',refDataProxy);

app.use(bodyParser.json());// this should be after the proxy
app.use('/', routes);


app.listen(process.env.PORT || 3001, function(){
    console.log('server has started');
});

module.exports = app;  