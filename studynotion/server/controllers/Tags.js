const tags = require("../models/tags")
const Tag = require("../models/tags")

//create tag ka handler function
exports.createTag = async(req,res)=>{
    try{
        const{name,description}=req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        //create entry in db
        const tagdetails = await Tag.create({
            name:name,
            description:description
        });
        console.log(tagdetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"tag created successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}