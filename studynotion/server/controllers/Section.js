const Setion = require("../models/Section");
const Course = require("../models/Course");
const Section = require("../models/Section");

exports.createSection = async(req,res)=>{
    try{
       //data fetch
       //data validation
       //create section
       //update course with section
       //return resopnse


       //step 1
       const {sectionname,courseId}=req.body;
      //step2
      if(!sectionname || !courseId){
        return res.status(400).json({
            success:false,
            message:'Missing properties'
        })
      }
      //step3
      const newsection = await Section.create({sectionname});
      //step4
      const updatedcoursedetails = await Course.findByIdAndUpdate(
       courseId,
        {
            $push:{
                courseContent:newsection._id,
            }

        },
        {new:true},
      )
      return res.status(200).json({
        success:true,
        message:'section created successfully',
        updatedcoursedetails,
      })
    }
    catch(error){
     return res.status(500).json({
      success:false,
      message:'could not create section',
      error:error.message
     })
    }
}
exports.updateSection = async(req,res)=>{
  try{
  //data input 
  //data validation
  //update data
  //return res
  const{sectionname,sectionId}=req.body;

  if(!sectionname || !sectionId){
    return res.status(400).json({
      success:false,
      message:'Missing properties'
    })
  }
  const section = await Section.findByIdAndUpdate(sectionId,{sectionname},{new:true})

  return res.status(200).json({
    success:true,
    message:"updated section carefully"
  })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:'could not update section',
      error:error.message
     })
  }
}
exports.deleteSection = async(req,res)=>{
   try{
          //get id
          //find by id and delete
          //return response
          const {sectionId}=req.params
          await Section.findByIdAndDelete(sectionId)
          return res.status(200).json({
            success:true,
            message:"deleted section carefully"
          })
   }
   catch(error){
    return res.status(500).json({
      success:false,
      message:'could not delete section',
      error:error.message
     })
   }
}