const jwt = require('jsonwebtoken');
const modules = require('.');

const secret = process.env.JWT_SECRET;
module.exports =  (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).end();
    try {
        const request_token =  req.headers.authorization.split(' ')[1];
        jwt.verify(request_token, secret);
        next();
    } catch (e){
        console.log(e);
        res.status(401).end();
    }
}
