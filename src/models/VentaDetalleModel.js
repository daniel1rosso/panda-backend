const mongoose = require('mongoose');

const VentaDetalleSchema = mongoose.Schema({
    producto: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    descuento: Number,
    subtotal: { type: Number, required: true },
    idVenta: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('ventas_detalle', VentaDetalleSchema);