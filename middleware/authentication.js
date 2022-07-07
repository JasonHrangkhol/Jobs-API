
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticaedError}  = require('../errors')

const auth = (req, res, next)=>{

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer'))
        throw new UnauthenticaedError('Authentication invalid')
    
    const token = authHeader.split(' ')[1]
    
    try{

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user ={
            userId:payload.userId,
            name:payload.userName
        }
        next()
    }
    catch{
        throw new UnauthenticaedError('Authentication Invalid')
    }
}


module.exports = auth

