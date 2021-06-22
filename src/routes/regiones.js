const express = require('express');
const router = express.Router();
const RegionesModel = require('../models/RegionesModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos las regiones ---//
router.get('/', checkAuth, async (req, res) => {
    try {
        const regiones = await RegionesModel.find();
        res.status(201).json(regiones[0].regions);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;