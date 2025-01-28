import jwt from "jsonwebtoken";
import ApplicationError from "../config/ApplicationError.js"
import pool from "../config/db.js"
import { checkEmailAlreadyExists, checkUsernameAlreadyExists, getUserByEmail, registerUserQuery } from "../config/queries.js"
import { verifyPassword } from "../utils/authUtils.js";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 
 * @param {*} username 
 * @param {*} email 
 * @param {*} hashedPassword 
 * @returns  
 */
export const createUserService = async (username, email, hashedPassword) => {
    try {
        if (!username || !email || !hashedPassword) {
            throw new ApplicationError("Please Provide all the Details", 400)
        }
        if (!emailRegex.test(email)) throw new ApplicationError("Invalid Email Address", 400)

        //? Check if user already exists
        const { rows: usernameCheck } = await pool.query(checkUsernameAlreadyExists, [username])
        const { rows: emailCheck } = await pool.query(checkEmailAlreadyExists, [email])

        if (usernameCheck.length != 0) throw new ApplicationError("Username Already Exists", 400);
        if (emailCheck.length != 0) throw new ApplicationError("Email Already Exists", 400);

        //? Create A User in DB
        const results = await pool.query(registerUserQuery, [username, email, hashedPassword, "admin"])
        const token = jwt.sign({ userID: results.rows[0].id }, process.env.JWTSECRET, {
            expiresIn: '1h'
        })

        const userObject = {
            id:results.rows[0].id,
            username:results.rows[0].username,
            email:results.rows[0].email,
            created_at:results.rows[0].created_at,
            updated_at:results.rows[0].updated_at
        }
       

        return {
            user: userObject,
            token
        }
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export const loginUserService = async (email, password) => {
    try {
        if (!email || !password) {
            throw new ApplicationError("Please Provide all the Details", 400)
        }
        const { rows } = await pool.query(getUserByEmail, [email])
        if (!rows[0]) throw new ApplicationError("User Does not Exists", 404)

        const passwordMatch = await verifyPassword(password, rows[0].password_hash)
        if (!passwordMatch) throw new ApplicationError("Wrong Password", 401)
        const token = jwt.sign({ userID: rows[0].id }, process.env.JWTSECRET, {
            expiresIn: '1h'
        })


        const userObject = {
            id:rows[0]?.id,
            username:rows[0]?.username,
            email:rows[0]?.email,
            created_at:rows[0]?.created_at,
            updated_at:rows[0]?.updated_at
        }
        return {
            user: userObject,
            token
        }
    } catch (error) {
        throw new Error(error)
    }
}