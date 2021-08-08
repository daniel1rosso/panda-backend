const mongoose = require('mongoose');

const ActivoSchema = mongoose.Schema({
    codigo: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('activos', ActivoSchema);