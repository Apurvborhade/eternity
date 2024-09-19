import chalk from 'chalk';
import mongoose from 'mongoose'
const connectDB = async () => {
    try {
        console.log(chalk.cyanBright('MongoDB conneting ......'));
        await mongoose.connect(process.env.MONGODBURI)
        console.log(chalk.greenBright('MongoDB connection successful'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB