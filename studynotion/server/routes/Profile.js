const express = require("express");
const router = express.Router();
const{auth}=require("../middleware/auth")
const{
    deleteAccount,
    updateProfile,
    getAllUserDetails,
   // updateDisplayPicture,
    getEnrolledCourses,
   
}=require("../controllers/Profile")


router.delete("/deleteProfile",deleteAccount)
router.put("/updateProfile",updateProfile)
router.get("/getuserDetails",auth,getAllUserDetails)
router.get("/getenrolledcourses",auth,getEnrolledCourses)
//router.put("/updatedisplay",auth,updateDisplayPicture)


module.exports = router