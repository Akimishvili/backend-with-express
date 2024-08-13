const ErrorResponse = require('../utils/errorResponse');
const userResource = require('../resources/userResource')
const User = require('../models/userModel');



class AuthController{
    static register = async(req, res, next) => {
        const {username, email, password} = req.body;
        try{
            //create user
            const user = await User.create({username, email, password});
            //create token
            const token = user.getSignedJwtToken();
            res.status(200).json({ success: true, token})
        } catch(err){
            next(err)
        }
    }

    static login = async (req, res, next) => {
        const { email, password } = req.body;
    
        // Validate email & password
        if (!email || !password) {
            return next(new ErrorResponse('Please provide an email and password', 400));
        }
    
        // Check for user
        const user = await User.findOne({ email }).select('+password');
    
        // Return 403 if no such user is found
        if (!user) {
            return next(new ErrorResponse('No user found with this email', 403));
        }
    
        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid password', 401));
        }
    
        // Generate auth token and save in cookies
        this.sendTokenResponse(user, 200, res);
    }
    

    // Get token from model, create cookie and send response
    static sendTokenResponse = (user, statusCode, res) => {
        // Create token
        const token = user.getSignedJwtToken();
        let options = {
            expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };
        if (process.env.NODE_ENV === 'production') {
            options = {...options, secure: true}
        }
        res.status(statusCode)
        .setHeader('Authorization', `Bearer ${token}`)  // Set the token in the header
        .cookie('token', token, options)      // Set the token in the cookie
        .json({
            success: true,
            token,
        });     
    }

    static logout = async(req, res, next) => {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            data: {},
            msg: "user successfully logout"
        })
    }

    static profile = async(req, res, next) => {
        const user = await User.findById(req.user.id);
        res.status(200).json({success: true, data: userResource(user)})
    }
}
module.exports = AuthController