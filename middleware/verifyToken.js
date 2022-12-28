const jwt = require('jsonwebtoken');
const {promisify} = require('utils');
/**
 * 1. Check if token exists 
 * 2. if not exists token return
 * 3. decode the token
 * 4. if valid token next
 * 
 */
module.exports = async(req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')?.[1];
        if(!token){
            return res.status(401).json({
                status: 'Failed',
                error: 'You are not logged in.'
            })
        }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    
    } catch (error) {
        res.status(403).json({
            status: 'Failed',
            message: 'Invalid token',
            error: error.message
        })
    }
}