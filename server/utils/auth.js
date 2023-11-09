const jwt = require('jsonwebtoken');
const secret = 'omaygottamattaa';
const expiration = '3h';

module.exports = {
    signToken: function (userInfo) {
        const payload = { userInfo };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration});
    },
};