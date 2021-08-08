const mongoose = require('mongoose');

const TipoOperacionSchema = mongoose.Schema({
    idTipoOperacion: { type: Number, required: true },
    tipo: { type: String, required: true },
    created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('tipo_operaciones', TipoOperacionSchema);