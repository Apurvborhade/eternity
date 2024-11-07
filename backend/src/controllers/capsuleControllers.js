import mongoose from 'mongoose'
import ApplicationError from '../config/applicationError.js'
import Capsule from '../models/CapsuleSchema.js'
import { decryptContent, encryptContent } from '../utils/encryption.js'


export const createCapsule = async (req, res, next) => {
    const { title, content, unlockDate, status, notification } = req.body

    const media  = res.locals;
    const createdBy = req.userID
    try {
        if (!title || !content || !unlockDate || !status) {
            throw new ApplicationError("Please Provide All The Details", 401)
        }
        const dateObj = new Date(unlockDate);
        if (isNaN(dateObj.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }
        const isoDate = dateObj.toISOString();
        const newCapsule = new Capsule({
            title,
            content: status === 'locked' ? encryptContent(content) : content,
            unlockDate: isoDate,
            createdBy,
            status,
            notification,
            media

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
        if (!capsule) {
            throw new ApplicationError("Cannot Find Capsule", 404)
        }
        if (new Date() < capsule.unlockDate) {
            throw new ApplicationError(`Capsule is still locked. you can unlock it on ${capsule.unlockDate.toLocaleDateString()}`, 403)
        }


        const decryptedContent = decryptContent(capsule.content)
        capsule.decryptedContent = decryptedContent
        if (capsule.status !== 'unlocked') {
            capsule.status = 'unlocked'
        }

        await capsule.save()
        res.send(capsule)
    } catch (error) {
        next(error)
    }
}

export const uploadFile = async (req, res, next) => {
    try {
        const capsuleID = req.params.capsuleID

        const uploadedFile = res.locals

        if (!mongoose.Types.ObjectId.isValid(capsuleID)) {
            throw new ApplicationError("Invalid CapusleID", 403)
        }
        const updatedCapsule = await Capsule.findByIdAndUpdate(capsuleID, {
           media: uploadedFile
        }, { new: true })

        if (!updatedCapsule) {
            throw new Error("Cannot Find Capsule", 404)
        }

        res.status(200).json(updatedCapsule)
    } catch (error) {
        next(error)
    }
}

export const getCapsule = async (req, res, next) => {
    const userID = req.userID;

    try {
        const capsules = await Capsule.find({ createdBy: { $eq: userID } })
        res.send(capsules)
    } catch (error) {
        next(error)
    }

}