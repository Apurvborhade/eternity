import express from 'express'
import { loginUser, registerUser } from '../controllers/authControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

/**
 * Register User
 * @method POST
 */

router.post('/api/v1/register', registerUser)

/**
 * Login User
 * @method POST
 */
router.post('/api/v1/login', loginUser)


export default router