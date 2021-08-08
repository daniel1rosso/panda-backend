const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const ConfiguracionInicialSchema = mongoose.Schema({
    razon_social: { type: String, required: true },
    cuit: { type: Number, required: true },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
    created: { type: Date, default: Date.now }
})

autoIncrement.initialize(mongoose.connection)
ConfiguracionInicialSchema.plugin(autoIncrement.plugin, 'configuracion_inicial')

module.exports = mongoose.model('configuracion_inicial', ConfiguracionInicialSchema);