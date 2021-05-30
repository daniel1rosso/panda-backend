const mongoose = require('mongoose');

const CompraDetalleSchema = mongoose.Schema({
    producto: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    descuento: Number,
    subtotal: { type: Number, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('compras_detalle', CompraDetalleSchema);