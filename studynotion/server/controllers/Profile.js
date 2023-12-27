const profile = require("../models/Profile");
const User = require("../models/User");
const user = require("../models/User");


exports.updateProfile = async(req,res)=>{
    try{
       //get data
       //get userid
       //validate data
        //find and update profile
        //return response

        const{dateofbirth="",about="",contactNumber,gender}=req.body;
        const id = req.user.id;
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:true,
                message:"missing fields"
            });
        }
        const userdetail = await User.findbyId(id)
        const profileid = userdetail.additionalDetails;
        const profileDetails = await Profile.findbyId(profileid)

        profileDetails.dateofbirth = dateofbirth;
        profileDetails.gender = gender
        profileDetails.about = about
        profileDetails.contactNumber = contactNumber;


        await profileDetails.save();
        return res.status(200).json({
            success:true,
            message:"updated profile successfully",
            profileDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

//delete account

exports.deleteAccount = async(req,res)=>{
    try{
        //getid
        //validation
        //delete profile
        //delete user
        //return response
        const id = req.user.id;
        const userdetail = await User.findbyId(id)
        if(!userdetail){
            return res.status(404).json({
                success:false,
                message:"could not find user"
            })
        }
        await Profile.findbyIdandDelete({_id:userdetail.additionalDetails})
        await User.findByIdAndDelete({_id:id})

        //
        return res.status(200).json({
            success:true,
            message:'user deleted successfully'
        })
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message:'User cant be deleted'
      })
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
          const id = req.user.id
          const userdetail = await User.findById(id).populate("additionalDetails").exec();
        
          return res.status(200).json({
            success:true,
            message:'all details fetched successfully'
          })
    }
    catch(error){
        return res.status(500).json({
            success:false,
           error:error.message
        })
    }
}
exports.getEnrolledCourses = async(req,res)=>{
    
}