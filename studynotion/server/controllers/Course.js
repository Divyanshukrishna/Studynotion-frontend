const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");
const {uploadimgtocloud} = require("../utils/imguploader")

//create course
exports.createCourse = async(req,res)=>{
    try{
        //fetch data 
        const {coursename,coursedescription,whatuwilllearn,price,tag}=req.body 
        //get thumbnail 
        const thumbnail = req.files.thumbnailimg;
        //validation
        if(!coursename||!coursedescription||!price||!tag||!whatuwilllearn){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        //check for instructor
        const userId = req.user.id;
        const instructordetails = await User.findById(userId)
        console.log("instructor Deatils:",instructordetails)
        if(!instructordetails){
            return res.status(404).json({
                success:false,
                message:"instructor not find"
            })
        }  
        //check given tag is valid or not
        const tagdetails = await Tag.findById(tag)
        if(!tagdetails){
            return res.status(404).json({
                success:false,
                message:"tag is not valid"
            })
        }
        //upload img to cloudinary
        const thumbnailimg = await uploadimgtocloud(thumbnail,process.env.FOLDER_NAME);

        //create an  entry for new course
        const newcourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructordetails._id,
            whatUwillLearn:whatUwillLearn,
            price,
            tag:tagdetails._id,
            thumbnail:thumbnailimg.secure_url
        })

        //add the new course to instructor schema
        await User.findByIdAndUpdate(
            {_id:instructordetails._id},
            {
                $push:{
                  courses:newcourse._id
                }
            },
            {new:true},

        )
       
        //update  tag ka schema

        //return response
        return res.status(200).json({
            success:true,
            message:"course created successfully",
            data:newcourse,
        })
        
    }
    catch(error){
     console.error(error);
     return res.status(500).json({
        success:false,
        message:"failed to create course"
     });

    }

}
//get all courses handler function'
exports.getallcourses= async(req,res)=>{
    try{
      const allcourse = await Course.find({},{courseName:true,
                                              price:true,
                                              thumbnail:true,
                                              instructor:true,
                                              ratingAndReviews:true,
                                              studentsEnrolled:true,
                                            }).populate("instructor").exec();
        return res.status(201).json({
            success:true,
            message:"data for all courses is fetched successfully"
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"cannot fetch all course"
        })
    }
}

//get course details
exports.getcoursedetails = async(req,res)=>{
    try{
       const {courseId}=req.body
       const courseDetails = await Course.find({_id:courseId}).populate({path:instructor,populate:{path:"additionalDetails"}})
       .populate("ratingAndReviews")
       .populate({
           path:"courseContent",
           populate:{
            papth:"SubSection"
           }
       }).exec();

       //validation
       if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:'could not fnd the course'
        })
       }
       return res.status(200).json({
        success:true,
        message:'course details fetched successfully',
        data:courseDetails
       })
    }
    catch(error){
         console.log(error)
         return res.status(500).json({
            success:false,
            message:error.message
         })
    }
}