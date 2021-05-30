const express = require('express');
const router = express.Router();
const CompraModel = require('../models/CompraModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos las compras ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const compras = await CompraModel.find();
        res.status(201).json(compras);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de una compra ---//
router.get('/:compra_id', checkAuth, async(req, res) => {
    try {
        const compra = await CompraModel.find({ _id: req.params.compra_id });
        res.status(201).json(compra);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nueva compra ---//
router.post('/new_compra', async(req, res) => {
    try {
        const compra = new CompraModel({
            proveedor: req.body.proveedor,
            total: req.body.total,
            descuento: req.body.descuento,
            fecha: req.body.fecha,
            activo:0
        });
        const createdCompra = await compra.save();
        res.status(201).json(createdCompra);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de una compra ---//
router.put('/:compra_id', checkAuth, (req, res) => {
    CompraModel.updateMany({ _id: req.params.compra_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de una compra ---//
router.delete('/:compraID', checkAuth, async(req, res) => {
    try {
        const deletedCompra = await CompraModel.deleteOne({ _id: req.params.compraID })
        res.status(200).json({
            message: 'Compra been deleted ...',
            data: deletedCompra,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;