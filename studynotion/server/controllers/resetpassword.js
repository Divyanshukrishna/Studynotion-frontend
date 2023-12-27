const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")

//resetpasswordtoken
exports.resetPasswordToken = async(req,res)=>{
   try{
     //get email from the body 
     const email = req.body.email;
     //chech user 
     const user = await User.findOne({email:email})
     if(!user ){
        return res.json({
            success:false,
            message:"user not exist"
        })
     }
     //generate token
     const token = crypto.randomUUID;
     //update user 
     const updatedDetails= await User.findOneAndUpdate(
                                                {email:email},
                                                {token:token,
                                                resetPasswordExpires:Date.now()+5*60*1000},
                                                {new:true}
     )
     //create url
     const url = `https://localhost:3000/update-password/${token}`
     //send mail
     await mailSender(email,"Password reset link",`Password reset link:${url}`)
     //return response
     return res.json({
        success:true,
        message:"email sent successfully"
     })
   }
   catch(error){
      console.log(error)
      return res.status(500).json({
        success:false,
        message:"something went wrong"
      })
   }
}

//reset password
exports.resetPassword = async(req,res)=>{
    try{
         //fetch data
         const {password,confirmPassword,token}=req.body
         //validation
         if(password !== confirmPassword){
            return res.json({
                success:false,
                 message:"password not matching"
            })
         }
         //get user details from db usingtoken
         const userDetails = await User.findOne({token:token})
         //if no entry-token invali
         if(!userDetails){
            return res.json({
                success:false,
                message:"token invalid"
            })
         }
         //token expiry
         if( userDetails.resetPasswordExpires<Date.now()){
            return res.json({
              success:false,
              message:"token expired"
            })
         }
         //hash password
        const hashedPassword = await bcrypt.hash(password,10)
         //updat epassword
         await User.findOneAndUpdate({token:token},
                                     {password:hashedPassword},
                                     {new:true},
                                     )
         //return respons
         return res.status(200).json({
            success:true,
            message:"password reset successfully"
         })

    }
    catch(error){
     console.log(error);
     return res.status(500).json({
        success:false,
        message:"something went wrong while reseting password"
     })
    }
}