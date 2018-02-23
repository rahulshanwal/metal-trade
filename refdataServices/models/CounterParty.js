const mongoose = require('mongoose');

const CounterPartySchema = new mongoose.Schema({
    value: String,
    primaryText: String
});

module.exports = mongoose.model("CounterParty", CounterPartySchema);