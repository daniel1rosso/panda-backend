const mongoose = require('mongoose');

const CompraSchema = mongoose.Schema({
    proveedor: { type: Array, required: true },
    total: { type: Number, required: true },
    descuento: Number,
    fecha: Date,
    activo: Number,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('compras', CompraSchema);