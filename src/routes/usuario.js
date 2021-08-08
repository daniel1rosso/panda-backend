const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UsuarioModel = require('../models/UsuarioModel');
const checkAuth = require('../middleware/checkAuth');
const userLog = require('../middleware/userLog');
const HistorialOperacionModel = require('../models/HistorialOperacionModel');
const { constants } = require('fs');

//--- Todos los usuarios ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const users = await UsuarioModel.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un usuario ---//
router.get('/:user_id', checkAuth, async(req, res) => {
    try {
        const user = await UsuarioModel.find({ _id: req.params.user_id });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo usuario ---//
router.post('/signup', checkAuth, userLog, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog

        const existingUser = await UsuarioModel.find({ username: req.body.username })
        if (existingUser.length !== 0) {
            return res.status(409).json({ message: "The User does exist ..." })
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        
        const user = new UsuarioModel({
            
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            telefono: req.body.telefono,
            username: req.body.username,
            password: hashPassword,
            localidad: req.body.comuna,
            provincia: req.body.provincia,
            activo: {
                "id": 0,
                "nombre": "Activo"
            },
            rol: {
                "id": 2,
                "nombre": "Usuario"
            }
        });
        //--- New User ---//
        const createdUser = await user.save().then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 1,
                tipo_operacion: 1,
                user: userLogin
            })
            await historial.save().then(()=>{
                res.status(201).json(createdUser);
            })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de usuario ---//
router.put('/:user_id', checkAuth, userLog, async (req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog
        //--- Hash Password ---//
        req.body.password = await bcrypt.hash(req.body.password, 10)
        //--- Update User ---//
        await UsuarioModel.updateMany({ _id: req.params.user_id }, { $set: req.body }).exec()
        .then(async () => {
            //--- Historial Operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 1,
                tipo_operacion: 2,
                user: userLogin
            })
            await historial.save().then(()=>{
                res.json(req.body)
            })
        }).catch(err => {
            res.json({ message: err })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Borrado de usuario ---//
router.delete('/:userID', checkAuth, userLog, async(req, res) => {
    try {
        //--- User Logeado ---//
        var userLogin = res.userlog
        //--- Delete User ---//
        await UsuarioModel.deleteOne({ _id: req.params.userID }).then(async () => {
            //--- Historial de operaciones ---//
            const historial = new HistorialOperacionModel({
                operacion: 1,
                tipo_operacion: 3,
                user: userLogin
            })
            await historial.save().then(()=>{
                res.status(200).json({
                    message: 'User been deleted ...',
                    data: historial,
                })
            })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;
