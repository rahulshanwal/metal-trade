const mongoose = require('mongoose');

const CommoditySchema = new mongoose.Schema({
    value: String,
    primaryText: String
});

module.exports = mongoose.model("Commodity", CommoditySchema);