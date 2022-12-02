import express from "express"
import mongoose from "mongoose"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import productsRouter from "./routes/productsRoutes.js"
import productRouter from "./routes/productRoutes.js"


dotenv.config({path:"./.env"})

const port = process.env.PORT || 3000;

const __dirname = path.resolve();

const app = express();

app.use(cors())

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

app.use(express.json({limit: "10kb"})); // we can add options to our .json middleware to limit the data which the client can send to our application. We limit to10 kilobyte
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// request time for every request added to the request object as a key.
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
});


app.use('/api/v1/products', productsRouter);
app.use('/api/v1/product', productRouter);
// app.use("/api/v1/reviews");
// app.use("/api/v1/orders");

