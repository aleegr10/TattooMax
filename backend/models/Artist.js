const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const ArtistSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    descripcion: {type: String, required: true},
    imagen: {type: String},
    vacaciones:{type: Boolean, default: false}
})

module.exports = mongoose.model('Artist', ArtistSchema);