const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const CompraDetalleSchema = mongoose.Schema({
    producto: { type: Array, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    descuento: Number,
    subtotal: { type: Number, required: true },
    created: { type: Date, default: Date.now }
})

autoIncrement.initialize(mongoose.connection)
CompraDetalleSchema.plugin(autoIncrement.plugin, 'compras_detalle')

module.exports = mongoose.model('compras_detalle', CompraDetalleSchema);