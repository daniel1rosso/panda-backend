const jwt = require('jsonwebtoken')
const Usuario = require('../models/UsuarioModels.js')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = (token == process.env.token) ? true : false
        res.userData = decoded;
        (decoded) ? next() : res.status(401).json({ message: "Auth failed",  success: 0 })
    } catch (error) {
        res.status(401).json({ message: "Auth failed",  success: 0 })
    }
}