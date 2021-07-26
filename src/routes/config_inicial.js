const express = require('express');
const router = express.Router();
const ConfiguaracionInicialModel = require('../models/ConfiguracionInicialModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todas las configuraciones iniciales ---//
router.get('/:config_id', checkAuth, async(req, res) => {
    try {
        const configuracion_inicial = await ConfiguaracionInicialModel.find();
        res.status(201).json(configuracion_inicial);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Configuracion incial perteneciente al id ---//
router.get('/:config_id', checkAuth, async(req, res) => {
    try {
        const configuracion_inicial = await ConfiguaracionInicialModel.find({ _id: req.params.config_id });
        res.status(201).json(configuracion_inicial);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nueva configuracion incial ---//
router.post('/new_configuracion_inicial', checkAuth, async(req, res) => {
    try {
        const configuracion_inicial = new ConfiguaracionInicialModel({
            razon_social: req.body.razon_social,
            cuit: req.body.cuit,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        });
        const createdConfiguracionInicial = await configuracion_inicial.save();
        res.status(201).json(createdConfiguracionInicial);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de la configuracion incial ---//
router.put('/:config_id', checkAuth, async (req, res) => {
    ConfiguaracionInicialModel.updateMany({ _id: req.params.config_id }, { $set: req.body }).exec()
    .then( async () => {
        res.json(req.body)
    }).catch(err => {
        res.json({ message: err })
    })
});

//--- Borrado de la configuracion inicial ---//
router.delete('/:config_id', checkAuth, async(req, res) => {
    try {
        const deleteConfiguracionInicial = await ConfiguaracionInicialModel.deleteOne({ _id: req.params.config_id })
        res.status(200).json({
            message: 'Configuración Inicial been deleted ...',
            data: deleteConfiguracionInicial,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;