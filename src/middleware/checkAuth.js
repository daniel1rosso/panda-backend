const jwt = require('jsonwebtoken')
const User = require('../models/UsuarioModel')

module.exports = async (req, res, next) => {
    try {
    	 
        const token = req.headers.authorization.split(" ")[1];
        const data = await User.findOne({ _id: token._id, 'tokens.token': token })
        console.log(data);
        const decoded = (token == user.token) ? true : false
        res.userData = decoded;
        (decoded) ? next() : res.status(401).json({ message: "Auth failed",  success: 0 })
    } catch (error) {
        res.status(401).json({ message: "Auth failed",  success: 0 })
    }
}


const auth = async(req, res, next) => {
   const token = req.header('Authorization').replace('Bearer ', '')
   const data = jwt.verify(token, process.env.JWT_KEY)
   try {
      const user = await User.findOne({ _id: data._id, 'tokens.token': token })
      if (!user) {
         throw new Error()
      }
      req.user = user
      req.token = token
      next()
   } catch (error) {
      res.status(401).send({ error: 'Not authorized to access this resource' })
   }

}
module.exports = auth