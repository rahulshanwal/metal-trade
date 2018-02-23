const mongoose = require('mongoose');

const SideSchema = new mongoose.Schema({
    value: String,
    label: String
});

module.exports = mongoose.model("Side", SideSchema);