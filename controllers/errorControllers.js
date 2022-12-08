import AppError from "../utils/appError.js"


// FUNCTIONS FOR GLOBAL ERROR HANDLER:

// CastError: HANDLE INVALID INPUT
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.` // path and value are saved in the error object automatically as properties.
    return new AppError(message, 400)
}

// MongoError: HANDLE DUPLICATE FIELDS
const handleDuplicateFieldsDB = err => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0] // matches all the text between strings ("') [0] picks the first string of the array which you can se in console.log(value) without [0]
    // console.log(value);

    const message = `Duplicate field value: ${value} is already existing!` // path and value are saved in the error object automatically as properties.
    return new AppError(message, 400)
}

// MongoError: Validation Error
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(item => item.message)
    const message = `Invalid input data! ${errors.join(". ")}`
    return new AppError(message, 400)
}

// JsonWebTokenError - token not valid
const handleJsonWebTokenErrorDB = () => new AppError("Invalid token. Please log in again!", 401) // short version of using {return}, when you have a one-liner.

// handleTokenExpiredErrorDB -  token expired
const handleTokenExpiredErrorDB = () => new AppError("Your token has expired! Please log in again.", 401)


// DISTINGUISH BETWEEN DEV AND PROD:
// DEV
const sendErrorDev = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith("/api")) { // originalUrl means the URL without the host (localhost:127.0.0.1:3000) --> so routes will start with /api...If that is true, we respond to the client with an object, which gives back the error in a structured way as json.
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
          })
    }
    // B) RENDERED WEBSITE
    // if the user tries to hit a route which is not starting with "/api" we respond with rendering inside our pug template "error.pug" a local variable called title and msg. 
    console.error("ERROR", err);
    return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message
    }) 
}

// PROD
const sendErrorProd = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith("/api")) {
        // A) Operational, trusted error: send message to client (if the user input invalid data, wants to visit a route which does not exist, etc.)
        if (err.isOperational) { // if its operational error, we return just a message with the status and errormessage
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
              })
        }
        // B) Programming or other unknown error: dont leak error details to the client (user)
        // 2) Send generic message
        return res.status(500).json({ // if its not operational error we send again generic error message to the client. (we dont let the user see the original error message)
            status: "error",
            message: "Something went very wrong!"
        })
    }
    // RENDERED WEBSITE
    if (err.isOperational) { // if route starts with "/api" and its operational error, we render a new pug template "error.pug" where we save in local variables the title and msg (err.message)
        return res.status(err.statusCode).render("error", {
            title: "Something ent wrong!",
            msg: err.message
        })
    }
    // 1) Log error
    console.error("ERROR", err);

    // 2) Send generic message
    return res.status(err.statusCode).render('error', { // if route starts with "/api" and its not an operational error we render again error.pug with a different msg.
        title: 'Something went wrong!',
        msg: 'Please try again later.'
    })
}


// GLOBAL ERROR HANDLER:
export const globalErrorHandler = (err, req, res, next) => {
//   console.log(err.stack);
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    // here we want to show the error in a different way, when we are in development or production mode. We declared that in our config.env and script in package.json
    if(process.env.NODE_ENV === "development") {
        sendErrorDev(err, req, res)
    } else if (process.env.NODE_ENV === "production") {
        let {name, code} = err // destructer infos which i need
        // error.message = err.message

        // castError
        if(name === "CastError") {
            err = handleCastErrorDB(err)
        }

        // duplicate fields
        if(code === 11000) {
            err = handleDuplicateFieldsDB(err)
        }

        // validationError
        if(name === "ValidationError") {
            err = handleValidationErrorDB(err)
        }

        // JsonWebTokenError - when token is not valid
        if (name === "JsonWebTokenError") {
            err = handleJsonWebTokenErrorDB()
        }
        // this line created a bug in production. When i hit a route hwich is not defined, i got the TokenExpiredError. But cookie was still valid.
        // if (name = "TokenExpiredError") {
        //     err = handleTokenExpiredErrorDB()
        // }

        // sending the response to the client
        sendErrorProd(err, req, res)
    }
  }