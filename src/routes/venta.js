const express = require('express');
const router = express.Router();
const VentaModel = require('../models/VentaModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los ventas ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const ventas = await VentaModel.find();
        res.status(201).json(ventas);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de una venta ---//
router.get('/:venta_id', checkAuth, async(req, res) => {
    try {
        const venta = await VentaModel.find({ _id: req.params.venta_id });
        res.status(201).json(venta);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nueva venta ---//
router.post('/new_venta', async(req, res) => {
    try {
        const venta = new VentaModel({
            cliente: req.body.cliente,
            total: req.body.total,
            descuento: req.body.descuento,
            fecha: req.body.fecha,
            activo:0
        });
        const createdVenta = await venta.save();
        res.status(201).json(createdVenta);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de una venta ---//
router.put('/:venta_id', checkAuth, (req, res) => {
    VentaModel.updateMany({ _id: req.params.venta_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de una venta ---//
router.delete('/:ventaID', checkAuth, async(req, res) => {
    try {
        const deletedVenta = await VentaModel.deleteOne({ _id: req.params.ventaID })
        res.status(200).json({
            message: 'Venta been deleted ...',
            data: deletedVenta,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;