const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")


//auth
exports.auth = async(req,res,next) =>{
  try{
    //extract token
    const token = req.cookies.token 
                    ||req.body.token
                    ||req.header("Authorisation").replace("Bearer","");
    //if token missing then return respone
    if(!token){
     return res.status(401).json({
        success:false,
        message:"token not found",
     });
    }
     //verify the token
     try{
       const decode =jwt.verify(token,process.env.JWT_SECRET);
       console.log(decode);
       req.user = decode;
     }
     catch(err){
         return res.status(401).json({
            success:false,
            message:"token not verified"
         });
     }
    
    next();
  }
  catch(error){
  return res.status(401).json({
    success:false,
    message:"something went wrong while validating token"
  })
  }
}

//isStudent
exports.isStudent = async(req,res,next)=>{

    try{
      if(req.user.accountType !== "Student"){
        return res.status(401).json({
            success:false,
            message:"this is protected route for student only"
        })
      }
      next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user role can not found"
        })
    }
}

//isInstructor
exports.isInstructor = async(req,res,next)=>{

    try{
      if(req.user.accountType !== "Instructor"){
        return res.status(401).json({
            success:false,
            message:"this is protected route for instructor only"
        })
      }
      next();
      
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"instructor role can not found"
        })
    }
}

//isAdmin
exports.isAdmin = async(req,res,next)=>{

    try{
      if(req.user.accountType !== "Admin"){
        return res.status(401).json({
            success:false,
            message:"this is protected route for Admin only"
        })
      }
      next();
      
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"admin role can not found"
        })
    }
}

