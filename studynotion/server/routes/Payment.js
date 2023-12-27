const express = require("express");
const router = express.Router();

const{capturePayment,verifysignature} = require("../controllers/Payments")
const {auth,isInstructor,isStudent,isAdmin}=require("../middleware/auth")
//router.post("/capturePayment",auth,isStudent,capturePayment)
router.post("/verifysign",verifysignature)

module.exports = router