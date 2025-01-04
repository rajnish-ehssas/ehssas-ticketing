// const dotenv = require('dotenv')
// dotenv.config()

export const MONGODB_URI: string = process.env.MONGODB_URI || "";
export const DB_NAME: string = process.env.DB_NAME || "";
export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";
export const EMAIL_USERNAME: string = process.env.EMAIL_USERNAME || "";
export const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD || "";
export const CLIENT_PASSWORD: string = process.env.CLIENT_PASSWORD || "";