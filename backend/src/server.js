import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk';

// MiddleWare
import errorHandler from './middlewares/errorHandler.js';

// Routes


const app = express();
dotenv.config();

app.use(errorHandler)
app.listen(process.env.PORT,() => {
    console.log(chalk.grey(`Server Listening on port: ${chalk.white(process.env.PORT)}`))
})