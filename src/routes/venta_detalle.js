const express = require('express');
const router = express.Router();
const VentaDetalleModel = require('../models/VentaDetalleModel');
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
        const venta_detalle = new VentaDetalleModel({
            producto: req.body.producto,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
            descuento: req.body.descuento,
            subtotal: req.body.subtotal,
            idVenta: req.params.venta_id
        });
        const createdVentaDetalle = await venta_detalle.save();
        res.status(201).json(createdVentaDetalle);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de un detalle de venta ---//
router.put('/:venta_detalle_id', checkAuth, (req, res) => {
    VentaDetalleModel.updateMany({ _id: req.params.venta_detalle_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de una venta ---//
router.delete('/:ventaID', checkAuth, async(req, res) => {
    try {
        const deletedVenta = await VentaDetalleModel.deleteOne({ _id: req.params.ventaID })
        res.status(200).json({
            message: 'Detalle de Venta been deleted ...',
            data: deletedVenta,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;