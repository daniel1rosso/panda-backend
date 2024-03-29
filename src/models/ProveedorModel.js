const mongoose = require('mongoose');

const ProveedorSchema = mongoose.Schema({
    nombre_empresa: { type: String, required: true },
    telefono: Number,
    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    web: String,
    direccion: String,
    nro_piso: String,
    depto: String,
    localidad: Array,
    provincia: Array,
    activo: Number,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('proveedores', ProveedorSchema);
