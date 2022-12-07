import express from "express";
import { getAllUsers, createUser, deleteUser, updateUser, getUser } from "../controllers/userController.js";
import { signup, login, logout } from "../controllers/authController.js";



const router = express.Router()

// authentication route- (signUp)
router
.route("/signup")
.post(signup)
// // login
router
.route("/login")
.post(login)
// // ROUTE FOR LOGGING OUT - updates the cookie and makes it invalid.
router
.route("/logout")
.get(logout)


// Forgot "Password page" --> creating new token
// router
// .route("/forgotPassword")
// .post(forgotPassword)
// // reset Password
// router
// .route("/resetPassword/:token")
// .patch(resetPassword)


// // calling this middleware here applies the protect middleware on every following method (GET,POST,PATCH,DELETE,etc.). Protect all following routes!
// router.use(protect)

// // update current user password
// router
// .route("/updateMyPassword")
// .patch(updatePassword)
// // /me route
// router
// .route("/me")
// .get(getMe, getUser)
// // update current user data
// router
// .route("/updateMe")
// .patch(uploadUserPhoto, resizeUserPhoto, updateCurrentUserData) 
// // delete current user (set active to false)
// router
// .route("/deleteMe")
// .delete(deleteCurrentUser)


// just admins can create user, see all users, update/delete/get user they want. (protect and restrictTo("admin"))
// router.use(restrictTo("admin"))

router
.route("/")
.get(getAllUsers)
.post(createUser)

router
.route("/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser)



export default router