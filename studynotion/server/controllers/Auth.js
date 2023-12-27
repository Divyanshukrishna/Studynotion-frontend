const bcrypt = require("bcrypt");
const Todo = require("../models/Todo");
const jwt=require("jsonwebtoken");
require("dotenv").config();
//signup route handler
exports.signup = async(req,res)=>{
    try{
     //get data
     const{name,email,password,role} = req.body;
     //check if user already exist
     const existingUser = await Todo.findOne({email})
     if(existingUser){
        return res.status(400).json({
            success:false,
            message:'User already exist',
        });
     }
     //secure password
     let hashedPassword;
     try{
        hashedPassword= await bcrypt.hash(password,10);
     }
     catch(error){
        return res.status(500).json({
            success:false,
            message:'error in hashing password',
        });
     }

     //create entry for user
     const user = await Todo.create({
        name,email,password:hashedPassword,role
     })
     return res.status(200).json({
        success:true,
        message:'user created successfully',
     });
    }
    catch(error){
       console.error(error);
       return res.status(500).json({
        success:false,
        message:'try again',
       });
    }
}

//login form
exports.login = async(req,res) =>{
 try{
  //data fetch
  const{email,password}=req.body;
  //validation on email and password
  if(!email || !password){
   return res.status(400).json({
      success:false,
      message:'fill all details',
   });
  }
  //check for registered user
  const user = await Todo.findOne({email})
  if(!user){
   return res.status(401).json({
      success:false,
      message:'user not registered',
   });
  }

  const payload={
   email:user.email,
   id:user._id,
   role:user.role
  }
  //verify password
  if(await bcrypt.compare(password,user.password)){
   //password match
   const token =jwt.sign(payload,
                        process.env.JWT_SECRET,
                        {
                           expiresIn:"2h"
                        })
   user.token = token;
   user.password= undefined;
   const options ={
    expires:new Date(Date.now() + 3*24*60*60*1000),
    httpOnly:true,
   }
   res.cookie("token",token,options).status(200).json({
     success:true,
    token,
    user,
    message:'log in successfully',
   });
  }
  else{
   return res.status(403).json({
      success:false,
      message:'Incorrect password',
   });
  }
 }
 catch(error){
    console.log("error");
    return res.status(500).json({
      success:false,
      message:'login fail'
    });
 }
}