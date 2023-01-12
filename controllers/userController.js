import User from "../models/user.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import {factoryDeleteOne, factoryGetAll, factoryGetOne, factoryUpdateOne} from "./handlerFactory.js"
import { factoryCreateOne } from "./handlerFactory.js";
import multer from "multer"
import sharp from "sharp"
import { v4 as uuidv4 } from 'uuid';
import path from "path";

// We simply store the file in our memory as a buffer. Which is available on req.file.buffer. The filename property wont get set here, thats why we need to set it below in resizeUserPhoto()
const multerStorage = multer.memoryStorage()

// BUILT OPTION FOR FILTER
// MULTER FILTER
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) { // we are checking, if value of mimetype property starts with "image". Means if a image gets uploaded ==> no error
    cb(null, true)
  } else { // if its no image ==> error!
    cb(new AppError("Not an image! Please upload only images.", 400), false) // we need t pass in false as second parameter
  }
}

// PASS IN MULTER OPTIONS INTO multer() function:
const upload = multer({ // thats the path to the folder, where we want to save the images, uploaded by the form. We pass in an configuration object. We upload images into our filesystem and put a link into the DB to the images
  storage: multerStorage,
  fileFilter: multerFilter
}) 

// ADD IT AS MIDDLEWARE TO STACK AND CONNECT TO INPUT FIELD WITH NAME "photo"
export const uploadUserPhoto = upload.single("photo") // "photo" is the name of the input field in the form, where we upload the images. "single" stands for sending a single file to filesystem. The following userController "updateCurrentUserData" can use this data by req.file/req.body

// RESIZE UPLOADED FILE with sharp package
export const resizeUserPhoto = catchAsync(async(req, res, next) => {

  if (!req.file) return next()

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`

  await sharp(req.file.buffer).resize(500, 500).toFormat("jpeg").jpeg({quality: 90}).toFile(`public/img/users/${req.file.filename}`) // sharp is a image processing library (package) for resizing images in a simple way. We pass into sharp() the name of the file we want to resize. It gives back an object, where we can use JS methods on for resizing. "resize(500, 500)" is resizing the image to a square, all the image files will have the format "jpeg". jpeg method compresses the image quality to 90% that it wont take too much space. toFile() needs the path to the file and want to save this to the file in our fileSystem.
  next()
})

// we use this function in our updateCurrentUserData function
const filterObj = (obj, ...allowedFields) => { // ...allowedFields = ["name", "email"] ; obj = req.body
  const newObj = {}
  Object.keys(obj).forEach(item => { // Object.keys(obj) = [array of field names of the passed "obj"] -_> which is req.body. We loop through the fields of req.body and check, if its one of the "allowedFields"
    if (allowedFields.includes(item)) { // we store the fitting "allowedFields" of the array of field names inside our empty Object "newObj" and return it
      newObj[item] = obj[item]
    }
  })
  return newObj
}


// thats a little middleware to replace the req.params.id with the req.user.id. To get the current User when hes logged in.
export const getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}


export const updateCurrentUserData = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError("This route is not for password updates. Please use /updateMyPassword.", 400))
  }

  // 2) Filtered out unwanted field names of the req.body object that are not allowed to be updated! "email" and "name" properties are allowed to be updated by the user itself.
  const filteredBody = filterObj(req.body, "name", "email")

  if (req.file) filteredBody.photo = req.file.filename // we check if the user uploaded an image, which gets saved in req.file. If yes we create a property inside our filteredBody object called photo, where we store the filename of the uploaded image.

  // console.log(filteredBody);

  // 3) Update user document
  // we are not passing as the second parameter req.body because we dont want to allow the user to update every field. for example:
  // body.role: "admin" --> user gives himself the role admin and got now the authority to delete and update tours, which could be crucial.
  // thats why we use "filteredBody" which only contains name and email
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { // we can use findByIdAndUpdate because we are not updating password or Email, where we have and need our validation. 
    new: true, // returns the updated object instead of the old one
    runValidators: true // we want to still run our validators
  })

  console.log("im the file",req.file);
  console.log("im the user", req.user);
  console.log("im the req.body",req.body);
  console.log("im the updated user", updatedUser);

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser // we update the currentUser name, email or photo properties.
    }
  })
})


// delete current User (setting field "active" to false)
export const deleteCurrentUser = catchAsync(async(req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {active: false}) // this only works for logged in users (protect). The id of the currentUser is stored inside the req.user.id. We are also not deleting the document, we are setting the field "active" to false.

  res.status(204).json({ // 204 for deleted
    status: "success",
    data: null
  })
})

export const createUser = factoryCreateOne(User)


// Controllers with factory functions:
export const getAllUsers = factoryGetAll(User)


export const getUser = factoryGetOne(User)


// Do NOT update passwords with this!
export const updateUser = factoryUpdateOne(User)


export const deleteUser = factoryDeleteOne(User)
