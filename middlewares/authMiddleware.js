const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/userModel');


const protectRoute = async (req, res, next) => {
    let token = null;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];

    }

    // make sure token exists
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try{
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
}


module.exports = protectRoute