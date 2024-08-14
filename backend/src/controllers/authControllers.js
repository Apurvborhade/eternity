import { loginUserService, createUserService } from "../services/authService.js"
import { genHashedPassword } from "../utils/authUtils.js"

export const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        const hashedPassword = await genHashedPassword(password)
        const results = await createUserService(username, email, hashedPassword)
        res.status(200).json(results)
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const results = await loginUserService(email, password)
        res.status(200).json(results)
    } catch (error) {
        next(error)
    }
}