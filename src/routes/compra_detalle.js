const express = require('express');
const router = express.Router();
const CompraDetalleModel = require('../models/CompraDetalleModel');
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
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de un detalle de compra ---//
router.put('/:compra_detalle_id', checkAuth, (req, res) => {
    CompraDetalleModel.updateMany({ _id: req.params.compra_detalle_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de una compra ---//
router.delete('/:compraID', checkAuth, async(req, res) => {
    try {
        const deletedCompra = await CompraDetalleModel.deleteOne({ _id: req.params.compraID })
        res.status(200).json({
            message: 'Detalle de Compra been deleted ...',
            data: deletedCompra,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;