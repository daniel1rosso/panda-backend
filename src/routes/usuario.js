const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UsuarioModel = require('../models/UsuarioModel');
var jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth');

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
router.post('/signup', async(req, res) => {
    try {
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
            localidad: req.body.localidad,
            provincia: req.body.provincia,
            dni: req.body.dni,
            activo: {
                "id": 0,
                "nombre": "Activo"
            },
            rol: {
                "id": 2,
                "nombre": "Usuario"
            }
        });
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de usuario ---//
router.put('/:user_id', checkAuth, (req, res) => {
    UsuarioModel.updateMany({ _id: req.params.user_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de usuario ---//
router.delete('/:userID', checkAuth, async(req, res) => {
    try {
        const deletedUser = await UsuarioModel.deleteOne({ _id: req.params.userID })
        res.status(200).json({
            message: 'User been deleted ...',
            data: deletedUser,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Login al sistema ---//
router.post('/login', (req, res) => {
    UsuarioModel.findOne({ username: req.body.username }).exec()
        .then(user => {
            if (user) {
                if(user.activo[0].id == 0) {
                    verifyPassword(user, req, res)
                } else {
                    res.status(500).json({ message: "Inactive user" , success: 0})
                }
            } else {
                res.json({ message: "Incorrect username or password...",  success: 0 })
            }
        }).catch(error => {
            res.status(500).json({ message: `error : ${error}` })
        });
});

//--- Verificacion de contraseña ---//
const verifyPassword = (user, req, res) => {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return res.status(500).json({ message: err })
        else {
            if (result) return getToken(user, res)
            else return res.json({ message: "Authentication failed ...",  success: 0 })
        }
    })
}

//--- Generacion de Token ---//
const getToken = async (user, res) => {
    const token = jwt.sign({ userId: user._id, },
        Math.random().toString(36).substring(0,20))
        user.token = user.tokens.concat({token});

    res.json({
        success: 1,
        message: "Auth successful",
        "bearer": "Bearer",
        token: token,
        "id":user._id,
        "username": user.username,
        "authorities": {"authority":user.rol[0].nombre}
    });
    await user.save()
}

//--- Logout al sistema ---//
router.post('/logout', checkAuth, (req, res) => {
    process.env.token = ""
    res.json({ message: "Logout Successful...",  success: 0 })
});

module.exports = router;
