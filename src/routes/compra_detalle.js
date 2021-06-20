const express = require('express');
const router = express.Router();
const CompraDetalleModel = require('../models/CompraDetalleModel');
const ProductoModel = require('../models/ProductoModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los detalle de una compra ---//
router.get('/:compra_id', checkAuth, async(req, res) => {
    try {
        const compra_detalle = await CompraDetalleModel.find({ idCompra: req.params.compra_id });
        res.status(201).json(compra_detalle);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo detalle de compra ---//
router.post('/new_compra_detalle/:compra_id', async(req, res) => {
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
            const compra_detalle = new CompraDetalleModel({
                producto: req.body.producto,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                descuento: req.body.descuento,
                subtotal: req.body.subtotal,
                idCompra: req.params.compra_id
            });
            const createdCompraDetalle = await compra_detalle.save();
            res.status(201).json(createdCompraDetalle);
        }).catch(err => {
            res.json({ message: err })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de un detalle de compra ---//
router.put('/:compra_detalle_id', checkAuth, async (req, res) => {
    const producto = req.body.producto
    const cantidad_detalle = req.body.cantidad
    
    //-- Producto de la coleccion --//
    producto_collection = await ProductoModel.find({ _id: producto._id })
    compra_detalle = await CompraDetalleModel.find({ _id: req.params.compra_detalle_id });
    
    //-- Nuevo sotck --//
    if (cantidad_detalle > compra_detalle.cantidad){
        cantidad_stock = producto_collection[0].cantidad - cantidad_detalle
    } else if (cantidad_detalle < compra_detalle.cantidad) {
        cantidad_stock = producto_collection[0].cantidad + cantidad_detalle
    } else {
        cantidad_stock = cantidad_detalle
    }
    
    //-- Asignacion del nuevo stock del producto --//
    (cantidad_detalle != compra_detalle.cantidad) ? producto.cantidad = cantidad_stock : "";

    ProductoModel.updateMany({ _id:  producto._id }, { $set: producto }).exec()
    .then( async () => {
        await CompraDetalleModel.updateMany({ _id: req.params.compra_detalle_id }, { $set: req.body }).exec()
            .then(() => {
                res.json(req.body)
            }).catch(err => {
                res.json({ message: err })
            })
    }).catch(err => {
        res.json({ message: err })
    })
});

//--- Borrado de una compra ---//
router.delete('/:detalleCompraID', checkAuth, async(req, res) => {
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
            const deletedDetalleCompra = await CompraDetalleModel.deleteOne({ _id: req.params.detalleCompraID })
            res.status(200).json({
                message: 'Detalle de Compra been deleted ...',
                data: deletedDetalleCompra,
            })
        }).catch(err => {
            res.json({ message: err })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;