const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //try {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //const decoded = jwt.verify(token, process.env.token)
        const decoded = (token == process.env.token) ? true : false
        res.userData = decoded;
        (decoded) ? next() : res.status(401).json({ message: "Auth failed",  success: 0 })
    //} catch (error) {
    } catch (error) {
        //res.status(401).json({ message: "Auth failed",  success: 0 })
    //}
    }
}

