const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const VentaSchema = mongoose.Schema({
    cliente: { type: Array, required: true },
    total: { type: Number, required: true },
    descuento: Number,
    fecha: Date,
    activo: Number,
    created: { type: Date, default: Date.now }
})

autoIncrement.initialize(mongoose.connection)
VentaSchema.plugin(autoIncrement.plugin, 'ventas')

module.exports = mongoose.model('ventas', VentaSchema);