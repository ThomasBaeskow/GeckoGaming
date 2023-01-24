import express from "express"
import mongoose from "mongoose"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import productDetailRouter from "./routes/productDetailRoutes.js"
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import {globalErrorHandler} from "./controllers/errorControllers.js"
import AppError from "./utils/appError.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import contact from "./routes/contactRoute.js"
import sgMail from "@sendgrid/mail"
import {corsOptions} from "./config/corsOptions.js"
import {fileURLToPath} from "url"

dotenv.config({path:"./.env"})

sgMail.setApiKey(process.env.SENDGRID_API2);


const port = process.env.PORT || 3000;

const __dirname = path.resolve();

const app = express();

app.use(cors(corsOptions))

// THIS IS FOR DEPLOYMENT AS ONE APP TO RENDER.COM
const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)
app.use(express.static(path.join(__dirName, "./client/build")))

// NEW CHANGE
app.use(express.static("public"));

const DB = process.env.DATABASE

// connection to hosted ATLAS database
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
  )
  .then(() => 
   app.listen(port, console.log(`DB connected and listening on ${port}`)))
  .catch((err) => {
    console.log(`${err} did not connect...`);
  })



if (process.env.NODE_ENV === 'development') { // - We just want to use morgan middleware when we are in development, not in production.
    app.use(morgan('dev'));
}

// app.use("/images",express.static("public/img/users"))
app.use(express.json({limit: "10Mb"})); // we can add options to our .json middleware to limit the data which the client can send to our application. We limit to10 kilobyte
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser())

// request time for every request added to the request object as a key.
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
});


app.use('/api/v1/product', productDetailRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/about', contact);

// THIS IS FOR DEPLOYMENT AS ONE APP TO RENDER.COM
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirName, "./client/build", index.html))
})


// ERROR HANDLING:
// "all" means all http methods (get,post,delete, etc). "*" means all routes.
// this middleware should be always at the end of the call-stack. This middleware will never be reached, if the route is defined.
app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404)) // when we pass in the error, the next will skip all the other middleware in the stack and goes to the next error middleware
})

// Jonas global error handler:
// by implementing 4 arguments (parameters) express knows, that this is a global error handling middleware
app.use(globalErrorHandler)


//CONTACT FORM

// app.route("/").get(function (req, res) {
//   res.sendFile(path.join(__dirname, '/form.html'));
// });

// app.post('/contact', (req, res) => {
//   console.log(req);
//   const msg = {
//       to: `RECIPIENT_EMAIL`, // Change to your recipient
//       from: 'SENDER_EMAIL', // Change to your verified sender
//       subject: req.body.subject,
//       text: `Message from ${req.body.email}:\n${req.body.message}`,
//   }
//   try {
//       sgMail.send(msg);
//       res.send("Message Successfully Sent!");
//     } catch (error) {
//       res.send("Message Could not be Sent");
//     }
// });

