const mongoose = require('mongoose');

const VentaSchema = mongoose.Schema({
    cliente: { type: Number, required: true },
    total: { type: Number, required: true },
    descuento: Number,
    fecha: Date,
    activo: Number,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('ventas', VentaSchema);