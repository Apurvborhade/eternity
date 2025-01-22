import { loginUserService, createUserService } from "../services/authService.js"
import { genHashedPassword } from "../utils/authUtils.js"

export const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        const hashedPassword = await genHashedPassword(password)
        const results = await createUserService(username, email, hashedPassword)
        //? Storing JWT
        res.cookie('token', results.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 3600000
        })
        res.status(200).json(results.user)
    } catch (error) {
        next(error)
        
    }
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const results = await loginUserService(email, password)
        res.cookie('token', results.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 3600000
        })

        res.status(200).json(results.user)
    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: new Date(0),
            maxAge: 0
        })

        res.json({ message: 'logged out' })
    } catch (error) {
        next(error)
    }
}