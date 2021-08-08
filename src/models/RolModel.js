const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const RolSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

autoIncrement.initialize(mongoose.connection)
RolSchema.plugin(autoIncrement.plugin, 'roles')

module.exports = mongoose.model('roles', RolSchema);