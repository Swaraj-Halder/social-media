const express = require("express")
const {loginUser, getOtpForSignup, signupUser, changePassword, deleteUser} = require("../controllers/userController")
const router = express.Router()

// Login route
router.post("/login", loginUser)

// Get otp for varify email to singup

router.post("/get-otp-for-signup", getOtpForSignup)

// Signup route
router.post("/signup", signupUser)

// Change Password route
router.patch("/change-password", changePassword)

// Delete user route
router.delete("/delete-user", deleteUser)

module.exports = router 
