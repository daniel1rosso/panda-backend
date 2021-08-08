const express = require('express');
const router = express.Router();
const VentaModel = require('../models/VentaModel');
const checkAuth = require('../middleware/checkAuth');
const userLog = require('../middleware/userLog');
const HistorialOperacionModel = require('../models/HistorialOperacionModel');

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
router.post('/new_venta', checkAuth, userLog, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog

        const venta = new VentaModel({
            cliente: req.body.cliente,
            total: req.body.total,
            descuento: req.body.descuento,
            fecha: req.body.fecha,
            activo:0
        });
        //--- New Venta ---//
        const createdVenta = await venta.save().then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 4,
                tipo_operacion: 1,
                user: userLogin
            })
            await historial.save()
            res.status(201).json(createdVenta);
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de una venta ---//
router.put('/:venta_id', checkAuth, userLog, (req, res) => {
    //--- User Logeado ---//
    var userLogin = res.userlog
    //--- Update Venta ---//
    VentaModel.updateMany({ _id: req.params.venta_id }, { $set: req.body }).exec()
    .then(async () => {
        //--- Historial Operaciones ---//
        const historial = new HistorialOperacionModel({
            operacion: 4,
            tipo_operacion: 2,
            user: userLogin
        })
        await historial.save()
        res.json(req.body)
    }).catch(err => {
        res.json({ message: err })
    })
});

//--- Borrado de una venta ---//
router.delete('/:ventaID', checkAuth, userLog, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog
        //--- Delete Venta ---//
        await VentaModel.deleteOne({ _id: req.params.ventaID }).then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 4,
                tipo_operacion: 3,
                user: userLogin
            })
            await historial.save().then(()=>{
                res.status(200).json({
                    message: 'Venta been deleted ...',
                    data: historial,
                })
            })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;