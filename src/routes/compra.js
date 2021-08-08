const express = require('express');
const router = express.Router();
const CompraModel = require('../models/CompraModel');
const checkAuth = require('../middleware/checkAuth');
const userLog = require('../middleware/userLog');
const HistorialOperacionModel = require('../models/HistorialOperacionModel');

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
router.post('/new_compra', checkAuth, userLog, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog

        const compra = new CompraModel({
            proveedor: req.body.proveedor,
            total: req.body.total,
            descuento: req.body.descuento,
            fecha: req.body.fecha,
            activo:0
        });
        //--- New Compra ---//
        const createdCompra = await compra.save().then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 5,
                tipo_operacion: 1,
                user: userLogin
            })
            await historial.save()
            res.status(201).json(createdCompra);
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de una compra ---//
router.put('/:compra_id', checkAuth, userLog, (req, res) => {
    //--- User Logeado ---//
    var userLogin = res.userlog
    //--- Update Compra ---//
    CompraModel.updateMany({ _id: req.params.compra_id }, { $set: req.body }).exec()
    .then(async () => {
        //--- Historial Operaciones ---//
        const historial = new HistorialOperacionModel({
            operacion: 5,
            tipo_operacion: 2,
            user: userLogin
        })
        await historial.save()
        res.json(req.body)
    }).catch(err => {
        res.json({ message: err })
    })
});

//--- Borrado de una compra ---//
router.delete('/:compraID', checkAuth, userLog, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog
        //--- Delete Compra ---//
        const deletedCompra = await CompraModel.deleteOne({ _id: req.params.compraID }).then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 5,
                tipo_operacion: 3,
                user: userLogin
            })
            await historial.save().then(()=>{
                res.status(200).json({
                    message: 'Compra been deleted ...',
                    data: historial,
                })
            })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;