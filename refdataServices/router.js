const express = require('express');
const router = express.Router();
const CounterParty = require('./models/CounterParty');
const Commodity = require('./models/Commodity');
const Location = require('./models/Location');
const Side = require('./models/Side');

router.get("/", function(req, res) {
    res.json({
        status: "My Ref Data API is alive!"
    });
});

router.get('/getRefData', function(req, res){
    let refData = {};
    //TODO - refactor below callback hell
    Commodity.find({}, (err1, commodities) => {
        if(err1){
            refData.commodity = [];    
        }else{
            refData.commodity = commodities;
        }
        Location.find({}, (err2, locations) => {
            if(err2){
                refData.location = [];    
            }else{
                refData.location = locations;
            }
            CounterParty.find({}, (err3, counterParties)=> {
                if(err3){
                    refData.counterParty = [];
                }else{
                    refData.counterParty = counterParties;
                }
                Side.find({}, (err4, sides) => {
                    if(err4){
                        refData.side = [];
                    }else{
                        refData.side = sides;
                    }
                    res.json({refData: refData});
                });  
            })
        });

    });
});

module.exports = router;