import multer from 'multer'
import B2 from 'backblaze-b2'
export const upload = multer({ storage: multer.memoryStorage() })
import Capsule from '../models/CapsuleSchema.js'
import ApplicationError from '../config/applicationError.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' });
const { BACKBLAZE_KEYID,
    BACKBLAZE_APPKEY,
    BACKBLAZE_BUCKETID } = process.env

export const uploadB2 = async (req, res, next) => {

    try {
        const b2 = new B2({
            applicationKeyId: '7cd42c68367f',
            applicationKey: '00304efac1a7876305b0f6357c5d666dee2994facb'
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
            try {
                
                const { data: uploadData } = await b2.getUploadUrl({ bucketId: 'f7dccda482ecd6089316071f' })
                const { authorizationToken, uploadUrl } = uploadData
    
                const params = {
                    uploadUrl,
                    uploadAuthToken: authorizationToken,
                    filename: file.originalname,
                    data: file.buffer
    
                }
    
    
                const { data: fileInfo } = await b2.uploadFile(params)
                return fileInfo
            } catch (error) {
                console.log(error)
            }

        }))




        res.locals = media
        next()
    } catch (error) {
        next(error)
    }

}