const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const ProvinciaSchema = mongoose.Schema({
    provincia: { type: String, required: true },
    id: { type: String, required: true },
    
})

autoIncrement.initialize(mongoose.connection)
ProvinciaSchema.plugin(autoIncrement.plugin, 'provincias')

module.exports = mongoose.model('provincias', ProvinciaSchema);