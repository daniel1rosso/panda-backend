const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const CompraSchema = mongoose.Schema({
    proveedor: { type: Array, required: true },
    total: { type: Number, required: true },
    descuento: Number,
    fecha: Date,
    activo: Number,
    created: { type: Date, default: Date.now }
})

autoIncrement.initialize(mongoose.connection)
CompraSchema.plugin(autoIncrement.plugin, 'compras')

module.exports = mongoose.model('compras', CompraSchema);