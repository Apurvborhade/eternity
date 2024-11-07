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
    console.log(req.body)
    try {
        const b2 = new B2({
            applicationKeyId: BACKBLAZE_KEYID,
            applicationKey: BACKBLAZE_APPKEY
        })

        // if (!mongoose.Types.ObjectId.isValid(req.params.capsuleID)) {
        //     throw new ApplicationError("Invalid Object Id", 403)
        // }
        // const capsuleToUpdate = await Capsule.findById(req.params.capsuleID)
        // if (!capsuleToUpdate) {
        //     throw new ApplicationError("Cannot Find Capsule", 404)
        // }
        const authResponse = await b2.authorize()
        const { downloadUrl } = authResponse.data

       
        if (!req.files || req.files.length === 0) {
            throw new ApplicationError("No files uploaded", 400);
        }


        const media = await Promise.all(req.files.map(async file => {
            const { data: uploadData } = await b2.getUploadUrl({ bucketId: BACKBLAZE_BUCKETID })
            const { authorizationToken, uploadUrl } = uploadData

            const params = {
                uploadUrl,
                uploadAuthToken: authorizationToken,
                filename: file.originalname,
                data: file.buffer

            }
            const { data: fileInfo } = await b2.uploadFile(params)
            return fileInfo

        }))
        
        res.locals = media
        next()
    } catch (error) {
        next(error)
    }

}