const mongoose = require('mongoose');

const HistorialOperacionSchema = mongoose.Schema({
    operacion: { type: Number, required: true },
    tipo_operacion: { type: Number, required: true },
    user: { type: Array, required: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('historial_operaciones', HistorialOperacionSchema);