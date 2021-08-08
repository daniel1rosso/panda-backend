const express = require('express');
const router = express.Router();
const ProductoModel = require('../models/ProductoModel');
const checkAuth = require('../middleware/checkAuth');
const userLog = require('../middleware/userLog');
const HistorialOperacionModel = require('../models/HistorialOperacionModel');

//--- Todos los productos ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const productos = await ProductoModel.find();
        res.status(201).json(productos);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un producto ---//
router.get('/:producto_id', checkAuth, async(req, res) => {
    try {
        const producto = await ProductoModel.find({ _id: req.params.producto_id });
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo Producto ---//
router.post('/new_producto', checkAuth, userLog, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog

        const existingProducto = await ProductoModel.find({ nombre: req.body.nombre})
        if (existingProducto.length !== 0) {
            return res.status(409).json({ message: "The Producto does exist ..." })
        }
        const producto = new ProductoModel({
            nombre: req.body.nombre,
            codigo: req.body.codigo,
            cantidad: req.body.cantidad,
            descripcion: req.body.descripcion,
            proveedor: req.body.proveedor,
            activo: req.body.activo,
            costo: req.body.costo,
            precio_venta: req.body.precio_venta,
            cantidad_stock: req.body.cantidad_stock
        });

        if(req.file){
            const {filename} = req.file
            producto.setImgUrl(filename)
        }
        
        //--- New Producto ---//
        const createdProducto = await producto.save().then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 3,
                tipo_operacion: 1,
                user: userLogin
            })
            await historial.save()
            res.status(201).json(createdProducto);
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de producto ---//
router.put('/:producto_id', checkAuth, userLog, (req, res) => {
    //--- User Logeado ---//
    var userLogin = res.userlog
    //--- Update Producto ---//
    ProductoModel.updateMany({ _id: req.params.producto_id }, { $set: req.body }).exec()
    .then(async () => {
        //--- Historial Operaciones ---//
        const historial = new HistorialOperacionModel({
            operacion: 3,
            tipo_operacion: 2,
            user: userLogin
        })
        await historial.save()
        res.json(req.body)
    }).catch(err => {
        res.json({ message: err })
    })
});

//--- Borrado de producto ---//
router.delete('/:productoID', checkAuth, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog
        //--- Delete Producto ---//
        await ProductoModel.deleteOne({ _id: req.params.productoID }).exec().then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 3,
                tipo_operacion: 3,
                user: userLogin
            })
            await historial.save()
            res.status(200).json({
                message: 'Producto been deleted ...',
                data: historial,
            })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Productos faltantes ---/
router.post('/productos_faltantes', checkAuth, async(req, res) => {
    try {
        const productos = await ProductoModel.find();
        var productos_faltantes = []
        productos.forEach(element => {
            if (element.cantidad_stock >= element.cantidad) {
                productos_faltantes.push(element)
            }
        })
        res.status(201).json(productos_faltantes);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;