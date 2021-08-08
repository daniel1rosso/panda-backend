const mongoose = require('mongoose');

const ComunaSchema = mongoose.Schema({
    comuna: { type: String, required: true },
    id: { type: Number, required: true },
    provincia_id: { type: Number, required: true }
});

module.exports = mongoose.model('comunas', ComunaSchema);