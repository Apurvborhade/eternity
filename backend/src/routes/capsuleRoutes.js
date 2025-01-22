import express from 'express'
import { createCapsule, getCapsule, getCapsuleDetails, unlockCapsule, uploadFile } from '../controllers/capsuleControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { upload, uploadB2 } from '../middlewares/uploadMiddleware.js';
const router = express.Router();

/**
 * Create Capsule
 * @method POST
 */
router.get('/getcapsule', verifyToken, getCapsule);
router.get('/capsule/:id', verifyToken, getCapsuleDetails);
router.post('/create', verifyToken, upload.any('files'),uploadB2,createCapsule)
router.post('/unlock/:id', verifyToken, unlockCapsule)
router.post('/upload/:capsuleID', verifyToken, upload.any(), uploadB2, uploadFile)

export default router