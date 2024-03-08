const mongoose = require('mongoose');
const { Schema } = mongoose;

const HorarioLocalSchema = new Schema({
    dias: {type: Array, required: true},
    horas: {type: Array, required: true}
})

module.exports = mongoose.model('HorarioLocal', HorarioLocalSchema);