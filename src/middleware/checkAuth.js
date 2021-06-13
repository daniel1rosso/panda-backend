const jwt = require('jsonwebtoken')
const User = require('../models/UsuarioModels.js')

module.exports = async (req, res, next) => {
    try {
    	 
        const token = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({ _id: token._id, 'tokens.token': token })
        const decoded = (token == user.token) ? true : false
        res.userData = decoded;
        (decoded) ? next() : res.status(401).json({ message: "Auth failed",  success: 0 })
    } catch (error) {
        res.status(401).json({ message: "Auth failed",  success: 0 })
    }
}