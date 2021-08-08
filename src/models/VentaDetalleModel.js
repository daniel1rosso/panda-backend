const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const VentaDetalleSchema = mongoose.Schema({
    producto: { type: Array, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    descuento: Number,
    subtotal: { type: Number, required: true },
    idVenta: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

autoIncrement.initialize(mongoose.connection)
VentaDetalleSchema.plugin(autoIncrement.plugin, 'ventas_detalle')

module.exports = mongoose.model('ventas_detalle', VentaDetalleSchema);