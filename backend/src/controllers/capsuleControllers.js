import ApplicationError from '../config/applicationError.js'
import Capsule from '../models/CapsuleSchema.js'
import { decryptContent, encryptContent } from '../utils/encryption.js'


export const createCapsule = async (req, res, next) => {
    const { title, content, unlockDate, status } = req.body
    const createdBy = req.userID

    try {
        if (!title || !content || !unlockDate || !status) {
            throw new ApplicationError("Please Provide All The Details", 401)
        }

        const newCapsule = new Capsule({
            title,
            content: encryptContent(content),
            unlockDate,
            createdBy,
            status
        })
        const result = await newCapsule.save();

        res.send(result)
    } catch (error) {
        next(error)
    }
}

export const unlockCapsule = async (req, res, next) => {
    
    try {
        const capsule = await Capsule.findById(req.params.id)
        if (new Date() < capsule.unlockDate) {
            throw new ApplicationError("Capsule is still locked.", 403)
        }

        const decryptedContent = decryptContent(capsule.content)
        capsule.decryptedContent = decryptContent
        res.send(capsule)
    } catch (error) {
        next(error)
    }
}