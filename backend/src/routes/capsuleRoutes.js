import express from 'express'
import { createCapsule, unlockCapsule } from '../controllers/capsuleControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

/**
 * Create Capsule
 * @method POST
 */
router.post('/api/v1/create', verifyToken, createCapsule)
router.post('/api/v1/unlock/:id', verifyToken, unlockCapsule)

export default router