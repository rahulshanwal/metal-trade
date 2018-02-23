const express = require('express');
const amqp = require('./amqp-connect');
const router = express.Router();
const Trade = require('./models/Trade');

router.get("/", function(req, res) {  
    res.json({
        status: "My Trade API is alive!"
    });
});

const getAllTrades = (req, res, uid) => {
    Trade.find({userId: uid}, function(err, allTrades){
        if(err) {
            res.status(500).send(new Error('Not able to fetch all trades'));
        }
        amqp.sendDataToQueue(allTrades);
        res.send({message: 'Trade updated successfully'});
    });
};

router.get("/trades", function(req, res) {  
    getAllTrades(req, res, req.query.userId);
});

router.post('/trade', function(req, res){
    Trade.create(req.body.trade, function(err, savedTrade){
        if(err){
            res.status(500).send(new Error('Not able to save the trade'));
        }
        getAllTrades(req, res, req.body.trade.userId);
    });
});

router.put('/trade', function(req, res){
    Trade.findByIdAndUpdate(req.body.trade._id, req.body.trade, function(err, savedTrade){
        if(err){
            res.status(500).send(new Error('Not able to save the trade'));
        }
        getAllTrades(req, res, req.body.trade.userId);
    });
});

router.delete('/trade', function(req, res){
    Trade.findByIdAndRemove(req.body.id, function(err, savedTrade){
        if(err){
            res.status(500).send(new Error('Not able to save the trade'));
        }
        getAllTrades(req, res, req.body.userId);
    });
});

module.exports = router;