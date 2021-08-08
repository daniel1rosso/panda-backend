const express = require('express');
const router = express.Router();
const HistorialOperacionesModel = require('../models/HistorialOperacionModel');
const checkAuth = require('../middleware/checkAuth');

//--- Historial de Operaciones ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const historial = await HistorialOperacionesModel.find();
        res.status(201).json(historial);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;