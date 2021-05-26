const express = require('express');
const router = express.Router();
const ProveedorModel = require('../models/ProveedorModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los proveedor ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const proveedores = await ProveedorModel.find();
        res.status(201).json(proveedores);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un proveedor ---//
router.get('/:proveedor_id', checkAuth, async(req, res) => {
    try {
        const proveedor = await ProveedorModel.find({ _id: req.params.proveedor_id });
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo Proveedor ---//
router.post('/new_proveedor', checkAuth, async(req, res) => {
    try {
        const existingProveedor = await ProveedorModel.find({ nombre: req.body.nombre, apellido: req.body.apellido })
        if (existingProveedor.length !== 0) {
            return res.status(409).json({ message: "The Proveedor does exist ..." })
        }
        const proveedor = new ProveedorModel({
            nombre_empresa: req.body.nombre_empresa,
            telefono: req.body.telefono,
            email: req.body.email,
            web: req.body.web,
            direccion: req.body.direccion,
            nro_piso: req.body.nro_piso,
            depto: req.body.depto,
            localidad: req.body.localidad,
            provincia: req.body.provincia,
            activo: Activo,
        });
        const createdProveedor = await proveedor.save();
        res.status(201).json(createdProveedor);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de proveedor ---//
router.put('/:proveedor_id', checkAuth, (req, res) => {
    ProveedorModel.updateMany({ _id: req.params.proveedor_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de proveedor ---//
router.delete('/:proveedorID', checkAuth, async(req, res) => {
    try {
        const deleteProveedor = await ProveedorModel.deleteOne({ _id: req.params.proveedorID })
        res.status(200).json({
            message: 'Proveedor been deleted ...',
            data: deleteProveedor,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;