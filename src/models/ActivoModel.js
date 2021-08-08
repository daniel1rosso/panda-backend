const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const ActivoSchema = mongoose.Schema({
    codigo: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

autoIncrement.initialize(mongoose.connection)
ActivoSchema.plugin(autoIncrement.plugin, 'activos')

module.exports = mongoose.model('activos', ActivoSchema);