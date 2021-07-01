const mongoose = require('mongoose');

const RolSchema = mongoose.Schema({
    name: { type: String, required: true },
    regions: { type: Array, required: true },
    number: { type: Number, required: true },
})

module.exports = mongoose.model('regiones_comunas', RolSchema);