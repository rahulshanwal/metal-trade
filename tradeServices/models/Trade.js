const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

let TradeSchema = new Schema({
    tradeDate: String,
    price: String,
    quantity: Number,
    side: String,
    userId: String,
    commodity: String,
    counterParty: String,
    location: String
});

autoIncrement.initialize(mongoose.connection);
TradeSchema.plugin(autoIncrement.plugin, 'Trade')
// Export the model
module.exports = mongoose.model('Trade', TradeSchema);