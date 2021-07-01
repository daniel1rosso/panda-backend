const mongoose = require('mongoose');

const ProvinciaSchema = mongoose.Schema({
    provincia: { type: String, required: true },
    id: { type: String, required: true },
    
})

module.exports = mongoose.model('provincias', ProvinciaSchema);