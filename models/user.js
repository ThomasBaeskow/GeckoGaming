import mongoose from "mongoose"
// import ProductDetail from "./productDetail.js"
import validator from "validator"
import bcrypt from "bcrypt"
import crypto from "crypto"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name"],
        trim: true
      },
    email: {
        type: String,
        required: [true, "A user must have an email"],
        validate: [validator.isEmail, "Email is not valid"],
        unique: true,
        trim: true,
        lowercase: true
      },
    photo: {
      type: String,
      default: "default.jpg" // name of default image stored in dev-data/data/img/users/default.jpg
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    wishlist:[{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    password: {
        type: String,
        required: [true, "A user must have a password"],
        minlength: 8,
        select: false // we dont want to show the password to the client. We just want to store it in the DB
      },
    confirmPassword: {
        type: String,
        required: [true, "Confirm your password"],
        validate: {
          // this only works on CREATE and SAVE!!!
          validator: function(val) { // validation function return always true or false(error) --> if its false we get a validationError
            return val === this.password
          },
          message: "password must be the same"
        }
      },
    // security
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
}
)

// ENCRYPTION OF THE PASSWORDS: this function applies before the document gets saved to the DB --> we need to install extra package "bcryptjs"
// thats the way to store users passwords in a secure way to our DB
userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) { // "isModified" is a mongoose method. You need to pass the field of the model which gets updated. (password) --> if the password didnt get modified the execution goes on to the next middleware.
    return next()

  } else {
    this.password = await bcrypt.hash(this.password, 12) // here we encrypt (hash) the current documents password with a cost of 12. its like adding additional string to the password.
    // console.log(this.password);
    this.confirmPassword = undefined // the confirmPassword field wont be saved to the DB
    next()
  }
})

// // Update passwordChangedAt property for the user when he changed the password
userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next() // means if the field "password" didnt get modified or its a new document --> middleware jumps to next middleware

  this.passwordChangedAt = Date.now() - 1000 // if it got updated, change the passwordChangeAt property to current time. we do "-1" because sometimes saving to the DB is a bit slower than creating the JWT. That the changedPasswordTimestamp is sometimes st a bit after the JWT has been created. User wouldnt be able to login, because JWT would already be expired.
  next()
})

// query middleware for not showing inactive (deleted) users
userSchema.pre(/^find/, function(next) { // using regular expression which looks for words in query event which start with "find"
  // this points to current query
  this.find({active: {$ne: false}}) // before the find query is executed, we change our query to just finding documents with the field "active: true" ($ne: false) --> because in earlier documents we didnt set the field active yet.
  next()
})

// middleware for manipulating query before find() executes.
userSchema.pre(/^find/, function(next) {
  this.populate({ // populate(fieldName) // we fill the field guide with the actual data instead of just showing the id of the users. we replace the id with the users data.
    path: "wishlist", // field we want to update
    select: "-__v -product_detail_url -original_price" // which fields we want to exclude
  })
  next()
})


// // INSTANCE METHOD: 
// // available on all Documents of a certain Collection.
// // checks if password is correct
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return  await bcrypt.compare(candidatePassword, userPassword) // this.password is not available in the output due to select: false in the model. bcrypt.compare() returns true if passwords are the same or false if not.
}

// // checks if password was changed after creating token (login) JWTtimestamp
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if(this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)

    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp // 100 < 200 (JWTTimestamp = time when the token was created; changedTimestamp = time when the password was changed)
  }

  // false means password not changed
  return false
}

// // Reset the JWT Token
// // import crypto (build in module of node.js)
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex") // this is creating a new "secret" (32 character string) Like we already stored in our config.env file.

//   // we need to encrypt our reseted token for security reasons
//   // sha256 is an algorithm
//   // update our 32 character String encrypted.
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex") // we are updating our field in model with the encrypted String

  // console.log({resetToken}, this.passwordResetToken);
  
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000 // for 60 minutes, for seconds, for milli-seconds --> new reset token expires after 10 minutes!

  return resetToken // we return the 32 character string (secret) to send it in the next step to the user
}


// creating a Model out of it: Model variables always wih capital Letter.
const User = mongoose.model("User",userSchema)

export default User

