import jwt from 'jsonwebtoken'
import ApplicationError from '../config/applicationError.js';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) throw new ApplicationError("Access denied", 401)

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWTSECRET)
        req.userID = decoded.userID
        next()
    } catch (error) {
        next(error)
    }
}

export const injectToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        req.headers['authorization'] = `Bearer ${token}`
    }

    next()
}