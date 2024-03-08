const mongoose = require('mongoose');
const { Schema } = mongoose;

const OpinionSchema = new Schema({
    artist: {type: String, required: true},
    imgArtist: {type: String, required: true},
    user: {type: String, required: true},
    imgUser: {type: String, required: true},
    titulo: {type: String, required: true},
    opinion: {type: String, required: true}
})

module.exports = mongoose.model('Opinion', OpinionSchema);