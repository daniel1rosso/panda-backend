const express = require('express');
const router = express.Router();
const RegionesModel = require('../models/RegionesModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos las regiones ---//
router.get('/', checkAuth, async (req, res) => {
    try {
        const regiones = await RegionesModel.find();
        res.status(201).json(regiones[1].regions);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Todos las comunas de una region ---//
router.post('/comunas', checkAuth, async (req, res) => {
    try {
        const regiones = await RegionesModel.find();
        comuna = []
        regiones[1].regions.forEach((respuesta) => {
            if(respuesta.number == req.body.number){
                comuna = respuesta.communes
            }
        })
        res.status(201).json(comuna);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;