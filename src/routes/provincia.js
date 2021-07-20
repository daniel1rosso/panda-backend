const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ProvinciasModel = require('../models/ProvinciasModel');
const ComunasModel = require('../models/ComunasModel');

//--- Todos las regiones ---//
router.get('/provincias', checkAuth, async (req, res) => {
    try {
        const provincias = await ProvinciasModel.find();
        res.status(201).json(provincias);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});
router.get('/comunas/:provincia_id', checkAuth, async(req, res) => {
    try {
        const comunas = await ComunasModel.find({ provincia_id: req.params.provincia_id});
        
        res.status(201).json(comunas);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});
module.exports = router;