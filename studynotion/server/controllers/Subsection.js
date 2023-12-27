const subsection = require("../models/SubSection")
const section = require("../models/Section")
const {uploadimgtocloud} = require("../utils/imguploader")
//crete subsection
exports.createSubsection = async(req,res)=>{
    try{
        //fetch data
        //extract file
        //validation
        //upload image to cloudinary
        //create section
        //update section
        //return response
        const{sectionId,title,timeDuration,description}=req.body;
        const video = req.file.videoFile
        if(!sectionId || !title||!timeDuration||!description){
            return res.status(400).json({
                success:false,
                message:'all field are required'
            })
        }
        const uploadDetails = await uploadimgtocloud(video,process.env.FOLDER_NAME)
        const subsectionDetails = await subsection.create({
            titel:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        })
        const updatedSection = await Section.findByIdandUpdate({_id:sectionId},
            {$push:{
              subsection:subsectionDetails._id
            }},{new:true}
            )

        return res.status(200).json({
            success:true,
            message:'subsection created successfully',
            updatedSection,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'could not create subsection',
            error:error.message
           })
    }
}
exports.updateSubsection=async(req,res)=>{

}
exports.deleteSubsection = async(req,res)=>{
    
}