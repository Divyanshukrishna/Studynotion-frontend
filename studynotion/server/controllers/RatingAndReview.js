const RatingAndReviews = require("../models/RatingAndReview")
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRating = async(req,res)=>{
    try{
       const userId = req.user.id;
       const {rating,review,courseId}=req.body
       //check if user is already enrolled
       const courseDetails = await Course.findOne({_id:courseId,
                                                    studentsEnrolled:{$elemMatch:{$eq:userId}}})

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'student is not enrolled in the course'
            })
        }
       //check id user already reviewed the course
       const alreadyReviewed = await RatingAndReview.findOne({
                                                          user:userId,
                                                          course:courseId,
       })
       
       if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:'course is already reviewed'
        })
       }
      //creat erating and review
      const ratingReview = await RatingAndReview.create({rating,review,course:courseId,user:userId})
       //updat ecourse with this rating and review
      const updatedCourseDetails =  await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReviews:ratingReview}},{new:true})
      console.log(updatedCourseDetails) 
      //return response
       return res.status(200).json({
        success:true,
        message:'sucessfully created rating and review'
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

//get average rating
exports.getAverageRating = async(req,res)=>{
    try{
      //get course id
      const courseId = req.body.courseid

      //calculate avg rating
      const result = await RatingAndReview.aggregate([
        {
            $match:{
               course:new mongoose.Types.ObjectId(courseId)
            }
        },
        {
            $group:{
                _id:null,
                averageRating:{$avg:"$rating"}
            }
        }
      ])
      
      //return rating
      if(result.length>0){
        return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating
        })
      }
      
      return res.status(200).json({
        success:true,
        message:'average rating is 0 till now',
        averageRating:0
      })
    }
    catch(error){
    console.log(error)
    return res.status(500).json({
        success:false,
        message:'could not calculate avg rating'
    })
    }
}

//get all rating
exports.getAllRating = async(req,res)=>{
    try{
      const allReviews = await RatingAndReview.find({})
                                .sort({rating:"desc"})  
                                .populate({
                                    path:"user",
                                    select:"firstname lastname email image"
                                })
                                .populate({
                                    path:"course",
                                    select:"courseName",
                                })
                                .exec();

        return res.status(200).json({
            success:true,
            message:"all reviews fetched successfully ",
            data:allReviews
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
