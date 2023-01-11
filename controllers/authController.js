import User from "../models/user.js"
import { catchAsync } from "../utils/catchAsync.js"
import jwt from "jsonwebtoken"
import AppError from "../utils/appError.js"
import {promisify} from "util"
import {Email} from "../utils/email.js"
import crypto from "crypto"


const signToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN // we add an object as the option, that the JWT expires after 90 days
    })
}

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id) // --> the object "{id: newUser._id}" is the payload which we add to our JWT. Second parameter is our "secret" with at least 32 characters. We store it in config.env. third parameter is an additional option. The "JWT Header "will be added automatically from JWT package.
    // we can use the debugger on "jwt.io" to look at our token.(Header,Payload,Secret)

    // CREATING COOKIE --> res.cookie("cookieName", cookieValue, {cookieoptions})
    // is a small piece of text which a server sends to clients. When client receives the cookie it will automatically be stored and send back along with all future requests to the same server.

    res.cookie("jwt", token, { // this sends the cookie as respond to client
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), // converting to milliseconds
        httpOnly: true, // cookie can not be accessed or modified in any way by the browser (Cross-Site scripting attacks)
        // secure: req.secure || req.headers("x-forwarded-proto") === "https" // cookie will only send on encrypted connection (https). That line is necessary for heroku.
    })
    // console.log(cookieOptions);

    // console.log(res.cookie.jwt);

    user.password = undefined // we dont want to see the password on the client site
    user.__v = undefined


    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    })
}

// SIGN UP
export const signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create(req.body)
    const url = `${req.protocol}://${req.get("host")}/me` // maybe need to fix this to just "/me"
    console.log(url);

    await new Email(newUser, url).sendWelcome() //  pass in our Email class, which builds objects with email data, according to the newUsers data and the url we pass in.

    // JWT - Login Users with secure JWT
    // for authentication we install the package "jsonwebtoken"
    // documentation on github. We can use jwt methods like (sign, verify, etc)
    createSendToken(newUser, 201, req, res)
})


// LOGIN
export const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body

    // 1) Check if email and password exist
    if(!email || !password) {
        return next(new AppError("Please provide email and password!", 400)) // we use return because we want to stop the login function right away if there is no password or email provided by the client (user). without return our application would send a response to the client from the error AND from our res.json. We can just send one response.
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({email}, {email:1, name:1}).select("+password") // --> its short for {email: email} -- this looks in our DB if the email is existing and if the password is correct. .select("+password") means --> we excluded in our model User the password. Thats why we have to add it here again to have access.
    // console.log(user);
    // "test1234" === '$2a$12$im0/kJn2OSC4raVqxJb5k.RYJhQmkiome6pL9A4PQcg4wqIAHSuvm' --> we need to compare the encrypted password in DB with users typed in password. To solve this we need to encrypt the users password too in our User model with bcrypt package

    // console.log(user, "first");
    if(!user || !(await user.correctPassword(password, user.password))) { // if theres no user with the given email or the password is not the same --> execute the error and stop the process. // return true if they are same, false if not (password, user.password)
        return next(new AppError("Incorrect email or password!", 401))
    }

    // console.log(user, "second");
    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res)
})

// We create a workaround for deleting the cookie (which is not possible because of httpOnly: true). When users logout, we create a logout route on clicking on lockout button that will send back a new cookie with the exact same name, but without the token. this will overwrite the current cookie in the browser with one that has the same name, but no token. When that cookie is send along with next request, we cannot identify the user anymore and deny access. Cookie gets very short expiration time. its like deleting.
export const logout = (req, res) => {
    res.cookie("jwt", "loggedout", {  // the new created cookie with the same name as the current cookie stored in the browser
        expires: new Date(Date.now() + 10 * 1000), // 10 seconds from now
        httpOnly: true
    })

    res.status(200).json({
        status: "success"
    })
}

// PROTECT ROUTES FOR LOGGED IN USERS:
export const protect = catchAsync(async(req, res, next) => {
    // 1) Getting the token and check if its exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) { // if header exists and the String starts with "Bearer". Common practice to use authorization: "Bearer token......." for header in postman. You get access to it with "req.headers.authorization"
        token = req.headers.authorization.split(" ")[1] // saves the tokenString into token variable

        // console.log(token, "first");

    } else if (req.cookies.jwt) {
        token = req.cookies.jwt

        // console.log(req.cookies, "second");
    }

    // console.log(token, "third");

    if (!token) {
        return next(new AppError("You are not logged in! Please login to get access.", 401))
    }

    // 2) Validate the token - VERIFICATION
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET) // jwt.verify(tokenString, secret, callback) the callback runs as soon as the verification has completed. its an async function.
    // console.log(decoded); // we can see that the id in our DB is the same with the id of the user, who logged in with his JWT. In JWT is the _id saved in the payload.

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id) // it checks if the id, which was send with the token, is still existing in our DB.
    if (!currentUser) {
        return next(new AppError("The user belonging to this token does no longer exist.", 401))
    }

    // 4) Check if user changed password after the token was created
    if (currentUser.changedPasswordAfter(decoded.iat)) { // if its true, so the password was changed after login in (creation of the token). The Error gets send to the client.
        return next(new AppError("User recently changed the password! Please log in again.", 401))
    }

    // GRANT ACCESS TO PROTECTED ROUTE - next goes to next handler
    req.user = currentUser
    // console.log(req.user);
    // res.locals.user = currentUser; // We save the current User data inside our local variables in pug as "user"
    next()
})

// This function just gives permission for users with role "admin" or "lead-guide" to access the next middleware "deleteTour".
export const restrictTo = (...roles) => {
    return (req, res, next) => { // this middleware function has access to the roles, which are given in as parameter in the routes due to the closure.
        // roles ["admin", "user"]. role = "user"
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to perform that action", 403))
        }
        next()
    }
}

export const forgotPassword = catchAsync(async(req, res, next) => {

    // 1) Get user based on POSTed email
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return next(new AppError("There is no user with this email address.", 404))
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken()
    await user.save({validateBeforeSave: false}) // this deactivate all the validators which we specified in our user schema. We add this property to our current user. And we save the encrypted string to our DB

    // 3) Send it to users email
    try {
        const resetURL = `${req.protocol}://${req.get("host")}/api/v1/user/resetPassword/${resetToken}` // we are sending the plain resetToken and not the encrypted one!
        await new Email(user, resetURL).sendPasswordReset() // this is creating the email and sending it to the user.
    
        // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didnt forget your password, please ignore this email!`

        // await sendEmail({
        //     email: user.email,
        //     subject: "Your password reset token is (valid for 10 min)",
        //     message
        // })

        res.status(200).json({
            status: "success",
            message: "Token sent to email!"
        })
    } catch(err) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({validateBeforeSave: false})

        return next(new AppError("There was an error sending the email. Try again later!", 500))
    }
})

// RESET PASSWORD - In Postman we need to copy our generated Token into URL which we got via Email after hitting forgotPassword route.
export const resetPassword = catchAsync(async(req, res, next) => {

    // 1) get user based on the token
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex") // its req.params.token because we defined the route in userRoutes.js like that. We need to encrypt the token again because we want to search in our User Model (DB) for the document with same value. We stored in DB the encrypted token.

    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}}) // we check if the expiring Date of the token is still greater then the current time. (still valid)

    // 2) If token has not expired, and there is a user, set the new password
    if (!user) {
        return next(new AppError("Token is invalid or has expired!", 400))
    }

    // here we are updating the current user objects properties like password,confirmPassword, passwordResetToken, passwordResetExpires and save it
    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save() // we are not turning off the validation here because we want to confirm, that the password is correct etc.

    // 3) Update passwordChangedAt property for the user
    // we do this in our user model as a pre save middleware!

    // 4) Log the user in, send JWT
    createSendToken(user, 200, req, res)
})

// We need to ask the user to write their credentials, before updating the password. If your logged in and a stranger person is changeing you password and logs you out without being prompted for the current password before, you loose your account.
export const updatePassword = catchAsync(async(req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select("+password")
    // console.log(req.user);
    // 2) Check if POSTed password is correct
    if(!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError("Your current password is wrong!", 401))
    }
    // 3) If so, update password
    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    await user.save() // we are not turning off the validations of the model because we want it for passwords and emails. User.findByIdAndUpdate will not work!

    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res)

})