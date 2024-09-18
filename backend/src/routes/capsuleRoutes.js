import express from 'express'
import { createCapsule, getCapsule, unlockCapsule, uploadFile } from '../controllers/capsuleControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { upload, uploadB2 } from '../middlewares/uploadMiddleware.js';
const router = express.Router();

/**
 * Create Capsule
 * @method POST
 */
router.get('/getcapsule', verifyToken, getCapsule);
router.post('/create', verifyToken, createCapsule)
router.post('/unlock/:id', verifyToken, unlockCapsule)
router.post('/upload/:capsuleID', verifyToken, upload.any(), uploadB2, uploadFile)

export default router