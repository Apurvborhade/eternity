import express from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/authControllers.js';



const router = express.Router();

/**
 * Register User
 * @method POST
 */

router.post('/register', registerUser)

/**
 * Login User
 * @method POST
 */
router.post('/login', loginUser)

/**
 * Logout User
 * @method POST
 */
router.post('/logout', logoutUser)


export default router