const express = require("express");
const router = express.Router();
const{
    createSubsection,
    updateSubsection,
    deleteSubsection,
}=require("../controllers/Subsection")

const {
    createRating,
    getAverageRating,
    getAllRating
}=require("../controllers/RatingAndReview")

const{auth,isInstructor,isStudent,isAdmin}= require("../middleware/auth")
const{
    createCourse,
    getcoursedetails,
    getallcourses
}=require("../controllers/Course")

const{
    createSection,
    updateSection,
    deleteSection
}=require("../controllers/Section")


router.post("/createCourse",auth,isInstructor,createCourse)
router.post("/addSection",auth,isInstructor,createSection)
router.post("/updateSection",auth,isInstructor,updateSection)
router.post("/deleteSection",auth,isInstructor,deleteSection)
router.post("/addsubSection",auth,isInstructor,createSubsection)
router.post("/updatesubSection",auth,isInstructor,updateSubsection)
router.post("/deletesubSection",auth,isInstructor,deleteSubsection)

router.get("/getallcourses",getallcourses)
router.post("/getcoursedetails",getcoursedetails)
//const { isAdmin } = require("../middleware/auth");
//const router = require("./User");

router.post("/createRating",auth,isStudent,createRating)
router.get("/getAverageRating",getAverageRating)
router.get("/getReviews",getAllRating)
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for test'
    })
})

module.exports = router