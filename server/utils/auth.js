const jwt = require('jsonwebtoken');
const secret = 'omaygottamattaa';
const expiration = '3h';

module.exports = {
    authMiddleware: function (req, res, next) {
        let token = req.query.token || req.headers.authorization;
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        };
        if (!token) {
            return res.status(400).json({message: 'Token not found'});
        };
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.profile = data;
        } catch {
            console.log('Invalid token');
            return res.status(400).json({ message: 'Invalid Token' });
        }
    },
    signToken: function (userInfo) {
        const payload = { userInfo };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration});
    },
};