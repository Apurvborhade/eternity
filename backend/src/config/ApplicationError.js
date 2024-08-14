class ApplicationError extends Error {
    constructor(message, status) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = '';
        this.message = message ||
            'Something went wrong. Please try again.';
        this.status = status || 500;
    }
}

export default ApplicationError