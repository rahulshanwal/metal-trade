const amqp = require('amqplib/callback_api');
const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(process.env.PORT || 3005, function(){
    console.log('Notification service is up');
});
// Socket setup & pass server
const io = socket(server);

let prices, trades;
const sendUpdatedPrice = () => io.sockets.emit('metalPrices', prices);
const sendUpdatedTrade = () => io.sockets.emit('tradeUpdate', trades);
let rabbitmqurl = process.env.AMQPURL || 'amqp://localhost';
//connect to rabbit mq
amqp.connect(rabbitmqurl, function(err, conn) {
    if(err) {
        console.log('not able to connect to amqp');
        return;
    }
  conn.createChannel(function(err, ch) {
      if(err){
          console.log("Not able to create amqp channel");
          return;
      }
    console.log('created amqp channel');
    ch.assertQueue('priceupdate', {durable: true});
    ch.consume('priceupdate', function(msg) {
        prices = JSON.parse(msg.content);
        sendUpdatedPrice();
    }, {noAck: true});
    ch.assertQueue('tradeupdate', {durable: true});
    ch.consume('tradeupdate', function(msg) {
        trades = JSON.parse(msg.content);
        sendUpdatedTrade();
    }, {noAck: true});
  });
});
//open websocket connection
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);
    sendUpdatedPrice();
    sendUpdatedTrade();
    socket.on('disconnect', () => {
        console.log('Client disconnected from websocket');
    });
});
