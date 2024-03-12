const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const CitaSchema = new Schema({
    user: {type: String, required: true},
    artist: {type: String, required: true},
    cita: {type: String, required: true},
    descripcion: {type: String, required: true}
})

module.exports = mongoose.model('Cita', CitaSchema);