const express = require("express");
const router = express.Router();
const {
    login,
    signup,
    sendotp,
    changePassword,
}=require("../controllers/Auth1")

const {
    resetPasswordToken,
    resetPassword,
}=require("../controllers/resetpassword")



const{auth}=require("../middleware/auth")

router.post("/login",login)
router.get("/signup",signup)
router.post("/sendotp",sendotp)
router.post("/changePassword",auth,changePassword)

router.post("/reset-password-token",resetPasswordToken)
router.post("resetpassword",resetPassword)

module.exports = router
