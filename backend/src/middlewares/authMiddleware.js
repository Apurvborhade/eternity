import jwt from 'jsonwebtoken'
import ApplicationError from '../config/applicationError.js';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) throw new ApplicationError("Access denied", 401)

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        req.userID = decoded.userID
        next()
    } catch (error) {
        next(error)
    }
}