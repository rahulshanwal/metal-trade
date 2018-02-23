const amqp = require('amqplib/callback_api');
let channel, rabbitmqurl = process.env.AMQPURL || 'amqp://localhost';

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
        if(err) {
            console.log('Not able to create channel');
        }
        ch.assertQueue('tradeupdate', {durable: true}); //create queue
        channel = ch;
    });
    conn.on("close", function() {
        console.log("[AMQP] close");
        return setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
});
module.exports = {
    sendDataToQueue : (alltrades) => {
        if(channel) {
            channel.sendToQueue('tradeupdate', Buffer.from(JSON.stringify(alltrades))); //send alltrades on the queue
        }
    }
};