const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const UsuarioSchema = mongoose.Schema({
    apellido: String,
    nombre: String,
    telefono: Number,
    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    localidad: Number,
    provincia: Number,
    activo: Array,
    rol: Array,
    created: { type: Date, default: Date.now }
})

autoIncrement.initialize(mongoose.connection)
UsuarioSchema.plugin(autoIncrement.plugin, 'usuarios')

module.exports = mongoose.model('usuarios', UsuarioSchema);