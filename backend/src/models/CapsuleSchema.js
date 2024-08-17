import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CapsuleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    unlockDate: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: String, // UUID from PostgreSQL
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['locked', 'unlocked'],
        default: 'locked',
    },
    decryptedContent: {
        type: String
    }
})
const model = mongoose.model("Capsule", CapsuleSchema)
export default model