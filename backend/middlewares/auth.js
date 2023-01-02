const jwt = require("jsonwebtoken");

const verifyToken = async(req, res, next) => {
    if(!req.headers.authorization) return res.status(403).json({msg: 'Not authorized. No token'})

    if(req.headers.authorization.startsWith("Bearer ")){
      const token = req.headers.authorization.split(' ')[1] // get the second el which is the token itself(without the "Bearer" text)
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err) return res.status(403).json({msg: 'Wrong or expired token.'})
        else {
            req.user = data // an object with only the user id as its property
            next()
        }
      })
    } else {
        return res.status(403).json({msg: 'Not authorized. No token'})
    }
}

module.exports = verifyToken
