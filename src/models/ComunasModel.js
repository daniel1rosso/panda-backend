const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const ComunaSchema = mongoose.Schema({
    comuna: { type: String, required: true },
    id: { type: Number, required: true },
    provincia_id: { type: Number, required: true }
});

autoIncrement.initialize(mongoose.connection)
ComunaSchema.plugin(autoIncrement.plugin, 'comunas')

module.exports = mongoose.model('comunas', ComunaSchema);