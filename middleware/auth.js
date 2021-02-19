// this is a function wich will check if we have 
// a token for the protected routes

const jwt = require('jsonwebtoken');
// Config will get access to the jwt secret
const config = require('config');

module.exports = function(req, res,next ){
    // Get the token from header
    const token = req.header('x-auth-token');

    // check if not token
    if(!token){
        return res.status(401).json({msg:"No token, authorization denied."});
    }
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"Token is not valid"});
    }
}