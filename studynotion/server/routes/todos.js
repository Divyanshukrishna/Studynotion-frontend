const express = require("express");
const router = express.Router();

// import controller
const {login,signup} = require("../studynotion/server/controllers/Auth");

//define API routes
router.post("/login",login);
router.get("/signup",signup);

//testing protected routes
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for test'
    })
})

// protected route
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'welcome for students',
    });
});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to admin'
    })
})
module.exports = router;