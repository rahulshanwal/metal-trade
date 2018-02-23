var amqp = require('amqplib/callback_api');
const prices = require('./prices');
let rabbitmqurl = process.env.AMQPURL || 'amqp://localhost';
let intrvl;
console.log('amqp url ------------>'+process.env.AMQPURL);
amqp.connect(rabbitmqurl, function(err, conn) {
    if (err) {
        console.log("[AMQP] error --> "+err.message);
        return;
    }
    conn.on("error", function(err) {
        console.log("[AMQP] error --> " + err.message);
        return;
    });
    conn.createChannel(function(err, ch) {
        if(err){
            console.log("not able to create channel");
        }
        ch.assertQueue('priceupdate', {durable: true}); //create queue
        ch.sendToQueue('priceupdate', Buffer.from(JSON.stringify(prices))); //send prices on the queue
        let updatePrices;
        intrvl = setInterval(()=>{
            updatePrices = prices.map((metal)=>{
                let m = {...metal};
                m.price = Math.round(m.price*((Math.random() * 1.25) + .75)*100)/100;
                return m;
            });
            ch.sendToQueue('priceupdate', Buffer.from(JSON.stringify(updatePrices))); //send prices on the queue
        }, 10000);
    });
    conn.on("close", function() {
        console.log("[AMQP] close");
        clearInterval(intrvl);
        return setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
});