import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk';
// MiddleWare
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
// Routes
import userRoutes from './routes/userRoutes.js'
import capsuleRoutes from './routes/capsuleRoutes.js'
import connectDB from './config/mongoDB.js';
import { injectToken } from './middlewares/authMiddleware.js';

// MiddleWare
const app = express();
dotenv.config();

connectDB()
app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)
app.use(injectToken)
//? Routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/capsule", capsuleRoutes)

// ! Error Handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(chalk.grey(`Server Listening on port: ${chalk.white(process.env.PORT)}`))
})