const mongoose = require('mongoose');

const OperacionSchema = mongoose.Schema({
    idOperacion: { type: Number, required: true },
    operacion: { type: String, required: true },
    created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('operaciones', OperacionSchema);