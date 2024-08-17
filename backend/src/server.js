import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk';
// MiddleWare
import errorHandler from './middlewares/errorHandler.js';

// Routes
import userRoutes from './routes/userRoutes.js'
import capsuleRoutes from './routes/capsuleRoutes.js'
import connectDB from './config/mongoDB.js';

// MiddleWare
const app = express();
dotenv.config();

connectDB()
app.use(express.json())

//? Routes
app.use("/user", userRoutes)
app.use("/capsule", capsuleRoutes)

// ! Error Handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(chalk.grey(`Server Listening on port: ${chalk.white(process.env.PORT)}`))
})