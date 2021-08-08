const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const HistorialOperacionSchema = mongoose.Schema({
    operacion: { type: Number, required: true },
    tipo_operacion: { type: Number, required: true },
    user: { type: Array, required: true },
    created: { type: Date, default: Date.now }
});

autoIncrement.initialize(mongoose.connection)
HistorialOperacionSchema.plugin(autoIncrement.plugin, 'historial_operaciones')

module.exports = mongoose.model('historial_operaciones', HistorialOperacionSchema);