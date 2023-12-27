const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();

//sendotp

exports.sendotp = async(req,res)=>{
    try{

   //fetch email from body of request
    
   const {email}=req.body;
   
   //check if user already exists
   
   const checkUser = await User.findOne({email});
   
   //if user already exists
   
   if(checkUser){
    return res.status(401).json({
        success:false,
        message:"user already registered"
    })
   }
   
   //generate otp
   
   var otp = otpGenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false,
   });
   console.log("otp genrated",otp);

   //check if otp is unique
   const result = await OTP.findOne({otp:otp});
   while(result){
    otp = otpGenerator(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
     result = await OTP.findOne({otp:otp});
   }
   const otpPayload = {email,otp};
   
   //create entry in db
  const otpBody = await OTP.create(otpPayload);
  console.log(otpBody)

  //return response
  res.status(200).json({
    success:true,
    message:"otp sent successfully",
    otp,
  })
   }

   catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,
    })
   }

}

//signup
exports.signup = async(req,res)=>{
  
  try{
  const {
    firstname,
    lastname,
    email,
    password,
    confirmpasswaord,
    accountType,
    contactnumber,
    otp
  }=req.body;
  if(!firstname || !lastname|| !email|| !password ||!confirmpasswaord||!otp){
    return res.status(403).json({
        success:false,
        message:"all fields are required",
    })
  }
  //matching both passwords
  if(password !== confirmpasswaord){
    return res.status(400).json({
        success:false,
        message:"passwords dont match"
    });
  }
  //Check user already exist or not
  const existinguser = await User.findOne({email});
  if(existinguser){
    return res.status(400).json({
      success:false,
      message:"user already exist",
    });
  }
  // find most recent otp
  const recentotp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
  console.log(recentotp);

  //validate otp
  if(recentotp.length == 0){
    return res.status(400).json({
      success:false,
      message:"not a valid otp"
    })
  }
  else if(otp !== recentotp.otp){
    return res.status(400).json({
      success:false,
      message:"not a valid otp"
    })
  }
  const hashedpassword = await bcrypt.hash(password,10)
  
  const profiledetails = await Profile.create({
    gender:null,
    dateofbirth:null,
    about:null,
    contactnumber:null,
  })
  const user = await User.create({
    firstname,
    lastname,
    email,
    contactnumber,
    password:hashedpassword,
    accountType,
    additionalDetails:profiledetails._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,   
  })
  //return res
  return res.status(200).json({
    success:true,
    message:'user is registered successflly',
    user,
  })
}
catch(error){
   console.log(error)
   return res.status(500).json({
    success:false,
    message:"user cant be registeres.please try again"
   })
}
}

//login
exports.login = async(req,res)=>{
  try{
     //get data from req body

     const{email,password}=req.body;

     //validation data

     if(!email || !password){
      return res.status(403).json({
        success:false,
        message:"all fields are required"
      })
     }

     //check if user is already present

     const user = await User.findOne({email}).populate("additionalDetails");
     if(!user){
      return res.status(401).json({
        success:false,
        message:"sign up first"
      });
     }

     //gnerate JWT,after password matching
     if(await bcrypt.compare(password,user.password)){
      const payload={
        email:user.email,
        id:user._id,
        accountType:user.accountType,
      }
      const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h",
      })
      user.token = token
      user.password = undefined
     
     //create cookie and send response
     const options = {
      expires:new Date(Date.now()+3*24*60*60*1000),
      httpOnly:true,
     }
     res.cookie("token",token,options).status(200).json({
      success:true,
      token,
      user,
      message:"logged in successfully"
     })
    }
    else{
      return res.status(402).json({
          success:false,
          message:"couldnot login"
      })
    }
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"login failed,try again"
    })
  }
}


//change password
exports.changePassword = async(req,res)=>{
  //get data from req body
  //get old password,new password confirmpassowrd
  //validation
  //update in db
  //return response
}
