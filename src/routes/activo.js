const express = require('express');
const router = express.Router();
const ActivoModel = require('../models/ActivoModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los activos ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const activos = await ActivoModel.find();
        res.status(201).json(activos);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo usuario ---//
router.post('/new_activo', async(req, res) => {
    try {
        const existingActivo = await ActivoModel.find({ nombre: req.body.nombre })
        if (existingActivo.length !== 0) {
            return res.status(409).json({ message: "The Activo does exist ..." })
        }
        const activo = new ActivoModel({
            nombre: req.body.nombre,
        });
        const createdActivo = await activo.save();
        res.status(201).json(createdActivo);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de activo ---//
router.put('/:activo_id', checkAuth, (req, res) => {
    ActivoModel.updateMany({ _id: req.params.activo_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de activo ---//
router.delete('/:activoID', checkAuth, async(req, res) => {
    try {
        const deleteActivo = await ActivoModel.deleteOne({ _id: req.params.activoID })
        res.status(200).json({
            message: 'Activo been deleted ...',
            data: deleteActivo,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;