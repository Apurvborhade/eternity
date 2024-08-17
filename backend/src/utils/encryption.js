import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
const { ENCRYPTION_KEY, SECRECT_IV, ENCRYPTION_METHOD } = process.env

const key = crypto
    .createHash('sha512')
    .update(ENCRYPTION_KEY)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .update(SECRECT_IV)
    .digest('hex')
    .substring(0, 16)

export const encryptContent = (content) => {
    const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, encryptionIV)


    return Buffer.from(cipher.update(content, 'utf8', 'hex') + cipher.final('hex')).toString('base64')
}


export const decryptContent = (encryptedContent) => {
    const buff = Buffer.from(encryptedContent, 'base64')
    const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, key, encryptionIV)


    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    )
}