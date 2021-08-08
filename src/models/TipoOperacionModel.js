const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const TipoOperacionSchema = mongoose.Schema({
    idTipoOperacion: { type: Number, required: true },
    tipo: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

autoIncrement.initialize(mongoose.connection)
TipoOperacionSchema.plugin(autoIncrement.plugin, 'tipo_operaciones')

module.exports = mongoose.model('tipo_operaciones', TipoOperacionSchema);