const mongoose = require('mongoose');

const losAngelesSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    image: String,
    nearby: String
});

const LosAngeles = mongoose.model('Los Angeles', losAngelesSchema);

module.exports = LosAngeles;