const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    image: String,
    nearby: String
});

const Travels = mongoose.model('Travel', travelSchema);

module.exports = Travels;