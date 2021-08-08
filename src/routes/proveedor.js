const express = require('express');
const router = express.Router();
const ProveedorModel = require('../models/ProveedorModel');
const checkAuth = require('../middleware/checkAuth');
const userLog = require('../middleware/userLog');
const HistorialOperacionModel = require('../models/HistorialOperacionModel');

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
router.post('/new_proveedor', checkAuth, userLog, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog

        const existingProveedor = await ProveedorModel.find({ nombre_empresa: req.body.nombre_empresa })
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
            activo: req.body.activo,
        });
        //--- New Proveedor ---//
        const createdProveedor = await proveedor.save().then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 2,
                tipo_operacion: 1,
                user: userLogin
            })
            await historial.save().then(()=>{
                res.status(201).json(createdProveedor);
            })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de proveedor ---//
router.put('/:proveedor_id', checkAuth, userLog, async (req, res) => {
    //--- User Logeado ---//
    var userLogin = res.userlog

    await ProveedorModel.updateMany({ _id: req.params.proveedor_id }, { $set: req.body }).exec()
    .then(async () => {
        //--- Historial Operaciones ---//
        const historial = new HistorialOperacionModel({
            operacion: 2,
            tipo_operacion: 2,
            user: userLogin
        })
        await historial.save().then(()=>{
            res.json(req.body)
        })
    }).catch(err => {
        res.json({ message: err })
    })
});

//--- Borrado de proveedor ---//
router.delete('/:proveedorID', checkAuth, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog
        //--- Delete Proveedor ---//
        await ProveedorModel.deleteOne({ _id: req.params.proveedorID }).then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 2,
                tipo_operacion: 3,
                user: userLogin
            })
            await historial.save().then(()=>{
                res.status(200).json({
                    message: 'Proveedor been deleted ...',
                    data: historial,
                })
            })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;
