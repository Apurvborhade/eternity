import multer from 'multer'
import B2 from 'backblaze-b2'
export const upload = multer({ storage: multer.memoryStorage() })
import Capsule from '../models/CapsuleSchema.js'
import ApplicationError from '../config/applicationError.js'
import mongoose from 'mongoose'

const { BACKBLAZE_KEYID,
    BACKBLAZE_APPKEY,
    BACKBLAZE_BUCKETID } = process.env

export const uploadB2 = async (req, res, next) => {
    try {
        const b2 = new B2({
            applicationKeyId: BACKBLAZE_KEYID,
            applicationKey: BACKBLAZE_APPKEY
        })

        if (!mongoose.Types.ObjectId.isValid(req.params.capsuleID)) {
            throw new ApplicationError("Invalid Object Id", 403)
        }
        const capsuleToUpdate = await Capsule.findById(req.params.capsuleID)
        if (!capsuleToUpdate) {
            throw new ApplicationError("Cannot Find Capsule", 404)
        }
        const authResponse = await b2.authorize()
        const { downloadUrl } = authResponse.data

        const { data: uploadData } = await b2.getUploadUrl({ bucketId: BACKBLAZE_BUCKETID })
        const { authorizationToken, uploadUrl } = uploadData

        const params = {
            uploadUrl,
            uploadAuthToken: authorizationToken,
            filename: req.files[0].originalname,
            data: req.files[0].buffer

        }
        const { data: fileInfo } = await b2.uploadFile(params)

        res.locals = fileInfo
        next()
    } catch (error) {
        next(error)
    }

}