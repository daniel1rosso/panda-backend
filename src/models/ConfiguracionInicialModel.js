const mongoose = require('mongoose');

const ConfiguracionInicialSchema = mongoose.Schema({
    razon_social: { type: String, required: true },
    cuil: { type: Number, required: true },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('configuracion_inicial', ConfiguracionInicialSchema);