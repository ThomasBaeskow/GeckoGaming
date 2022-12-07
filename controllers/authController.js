import User from "../models/user.js"
import { catchAsync } from "../utils/catchAsync.js"
import jwt from "jsonwebtoken"
import AppError from "../utils/appError.js"





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
    // const newUser = await User.create(req.body)
    // due to security reasons we need to replace above code with following code: We only allow the data we actually need to be saved in the new user in our DB. Even when a user tries to manually add a "role: admin". It wont be stored in the user
    const newUser = await User.create(req.body)
    // const url = `${req.protocol}://${req.get("host")}/me`

    // console.log(url);

    // await new Email(newUser, url)
    // .sendWelcome() //  pass in our Email class, which builds objects with email data, according to the newUsers data and the url we pass in.

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
    const user = await User.findOne({email}).select("+password") // --> its short for {email: email} -- this looks in our DB if the email is existing and if the password is correct. .select("+password") means --> we excluded in our model User the password. Thats why we have to add it here again to have access.
    // console.log(user);
    // "test1234" === '$2a$12$im0/kJn2OSC4raVqxJb5k.RYJhQmkiome6pL9A4PQcg4wqIAHSuvm' --> we need to compare the encrypted password in DB with users typed in password. To solve this we need to encrypt the users password too in our User model with bcrypt package

    if(!user || !(await user.correctPassword(password, user.password))) { // if theres no user with the given email or the password is not the same --> execute the error and stop the process. // return true if they are same, false if not (password, user.password)
        return next(new AppError("Incorrect email or password!", 401))
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res)
})

// We create a workaround for deleting the cookie (which is not possible because of httpOnly: true). When users logout, we create a logout route on clicking on lockout button that will send back a new cookie with the exact same name, but without the token. this will overwrite the current cookie in the browser with one that has the same name, but no token. When that cookie is send along with next request, we cannot identify the user anymore and deny access. Cookie gets very short expiration time. its like deleting.
export const logout = (req, res) => {
    res.cookie('jwt', "loggedout", {  // the new created cookie with the same name as the current cookie stored in the browser
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    }) 
    res.status(200).json({
        status: "success"
    })
}