const mongoose = require('mongoose');
const {appConfig} = require('../../config');
var autoIncrement = require('mongoose-auto-increment')

const ProductoSchema = mongoose.Schema({
    nombre: String,
    codigo: { type: String, required: true },
    cantidad: Number,
    descripcion: String,
    proveedor: Array,
    activo: Number,
    costo: Number,
    precio_venta: Number,
    cantidad_stock: Number,
    imgUrl: String,
    created: { type: Date, default: Date.now }
})

autoIncrement.initialize(mongoose.connection)
ProductoSchema.plugin(autoIncrement.plugin, 'productos')

module.exports = mongoose.model('productos', ProductoSchema);

ProductoSchema.methods.setImgUrl = function setImgUrl(filename){
 const {host, port} = appConfig
 this.imgUrl = `${host}:${port}/public/${filename}`
}