var express = require("express"),
bodyParser = require("body-parser"),  
app = express(),
routes = require('./routes'),
mongoose = require("mongoose");

mongoose.connect(process.env.TRADEDATABASEURL || 'mongodb://localhost/tradesdb');
app.use(bodyParser.json());  
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', routes);

app.listen(process.env.PORT || 3002, function(){
    console.log('Trade service has started');
});

module.exports = app;  