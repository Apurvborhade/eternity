import chalk from 'chalk';

const errorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500
    const errMsg = err.message || "Something Went Wrong"

    console.log(chalk.redBright(err.stack));
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: err.stack
    })
}

export default errorHandler