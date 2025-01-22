import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config({  });

const { ENCRYPTION_KEY, SECRET_IV, ENCRYPTION_METHOD } = process.env

const key = crypto
    .createHash('sha512')
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .digest('hex')
    .substring(0, 16)

    


export const encryptContent = (content) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, SECRET_IV)

    return Buffer.from(cipher.update(content, 'utf-8', 'hex') + cipher.final('hex')).toString('base64')
}


export const decryptContent = (encryptedContent) => {

    const buff = Buffer.from(encryptedContent, 'base64')

    const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, ENCRYPTION_KEY, SECRECT_IV)

    let decrypted = decipher.update(buff.toString('utf8'), 'hex', 'utf8');
    decrypted += decipher.final('utf8')
    

    return decrypted.toString('hex')
}