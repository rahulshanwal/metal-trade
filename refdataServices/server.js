const express = require("express");  
const bodyParser = require("body-parser");  
//const refData = require("./refData.js");
const routes = require('./router');
const mongoose    = require("mongoose");
const app = express();

mongoose.connect(process.env.REFDATABASEURL || 'mongodb://localhost/refdatadb', {useMongoClient: true});

app.use(bodyParser.json());  
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use("/", routes);

app.listen(process.env.PORT || 3003, function(){
    console.log('RefData service has started ');
});

module.exports = app;