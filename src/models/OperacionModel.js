const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const OperacionSchema = mongoose.Schema({
    idOperacion: { type: Number, required: true },
    operacion: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

autoIncrement.initialize(mongoose.connection)
OperacionSchema.plugin(autoIncrement.plugin, 'operaciones')

module.exports = mongoose.model('operaciones', OperacionSchema);