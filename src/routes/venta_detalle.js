const express = require('express');
const router = express.Router();
const VentaDetalleModel = require('../models/VentaDetalleModel');
const ProductoModel = require('../models/ProductoModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los detalle de una ventas ---//
router.get('/:venta_id', checkAuth, async(req, res) => {
    try {
        const venta_detalle = await VentaDetalleModel.find({ idVenta: req.params.venta_id });
        res.status(201).json(venta_detalle);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo detalle de venta ---//
router.post('/new_venta_detalle/:venta_id', async(req, res) => {
    try {
        const producto = req.body.producto
        const cantidad_detalle = req.body.cantidad
        //-- Producto de la coleccion --//
        producto_collection = await ProductoModel.find({ _id: producto._id })
        //-- Nuevo sotck --//
        const cantidad_stock = producto_collection[0].cantidad - cantidad_detalle
        //-- Asignacion del nuevo stock del producto --//
        producto.cantidad = cantidad_stock
        
        ProductoModel.updateMany({ _id:  producto._id }, { $set: producto }).exec()
        .then(() => {
            const venta_detalle = new VentaDetalleModel({
                producto: req.body.producto,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                descuento: req.body.descuento,
                subtotal: req.body.subtotal,
                idVenta: req.params.venta_id
            });
            const createdVentaDetalle = venta_detalle.save();
            res.status(201).json(createdVentaDetalle);
        }).catch(err => {
            res.json({ message: err })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de un detalle de venta ---//
router.put('/:venta_detalle_id', checkAuth, async (req, res) => {
    const producto = req.body.producto
    const cantidad_detalle = req.body.cantidad
    
    //-- Producto de la coleccion --//
    producto_collection = await ProductoModel.find({ _id: producto._id })
    venta_detalle = await VentaDetalleModel.find({ _id: req.params.venta_detalle_id });
    
    //-- Nuevo sotck --//
    if (cantidad_detalle > venta_detalle.cantidad){
        cantidad_stock = producto_collection[0].cantidad - cantidad_detalle
    } else if (cantidad_detalle < venta_detalle.cantidad) {
        cantidad_stock = producto_collection[0].cantidad + cantidad_detalle
    } else {
        cantidad_stock = cantidad_detalle
    }
    
    //-- Asignacion del nuevo stock del producto --//
    (cantidad_detalle != venta_detalle.cantidad) ? producto.cantidad = cantidad_stock : "";

    ProductoModel.updateMany({ _id:  producto._id }, { $set: producto }).exec()
    .then( async () => {
        await VentaDetalleModel.updateMany({ _id: req.params.venta_detalle_id }, { $set: req.body }).exec()
            .then(() => {
                res.json(req.body)
            }).catch(err => {
                res.json({ message: err })
            })
    }).catch(err => {
        res.json({ message: err })
    })
});

//--- Borrado de una venta ---//
router.delete('/:detalleVentaID', checkAuth, async(req, res) => {
    try {
        const producto = req.body.producto
        const cantidad_detalle = req.body.cantidad
        //-- Producto de la coleccion --//
        producto_collection = await ProductoModel.find({ _id: producto._id })
        //-- Nuevo sotck --//
        const cantidad_stock = producto_collection[0].cantidad + cantidad_detalle
        //-- Asignacion del nuevo stock del producto --//
        producto.cantidad = cantidad_stock

        ProductoModel.updateMany({ _id:  producto._id }, { $set: producto }).exec()
        .then( async () => {
            const deletedDetalleVenta = await VentaDetalleModel.deleteOne({ _id: req.params.detalleVentaID })
            res.status(200).json({
                message: 'Detalle de Venta been deleted ...',
                data: deletedDetalleVenta,
            })
        }).catch(err => {
            res.json({ message: err })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;