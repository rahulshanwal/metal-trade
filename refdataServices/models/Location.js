const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    value: String,
    primaryText: String
});

module.exports = mongoose.model("Location", LocationSchema);