const {instance}=require("../config/razorpay")
const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const {default:mongoose}=require("mongoose");

//capture payment and initiate razorpay order
exports.createPayment = async(req,res)=>{
    //get course and user id
    //validation
    //user already pay
    //create ordr and return response

    const {course_id}= req.body
    const userid = req.User.id
    if(!course_id){
        return res.json({
            success:false,
            message:'please enter valid id'
        })
    }
    let course;
    try{
     course = await Course.findById(course_id)
     if(!course){
        return res.json({
            success:false,
            message:'could not find the course'
        })
     }
     const uid = new mongoose.Types.ObjectId(userid)
     if(course.studentsEnrolled.includes(uid)){
        return res.status(200).json({
            success:false,
            message:'user already paid'
        })
     }

    }
    catch(error){
       console.error(error);
       return res.status(500).json({
        success:false,
        message:error.message
       })
    }

    //oreder create
    const amount = course.price
    const currency = "INR"
    const options = {
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId :course_id,
            userid,
        }

    };
    try{
       //inititate the payment 
       const paymentresponse = await instance.orders.create(options)
       console.log(paymentresponse)
       return res.status(200).json({
        success:true,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        thumbnail:course.thumbnail,
        orderid:paymentresponse.id,
        currency:paymentresponse.currency,
        amount:paymentresponse.amount,

       })
    }
    catch(error){
    console.log(error);
    res.json({
        success:false,
        message:"could not initiate order"
    })
    }
}

//verify signature of razorpay and server

exports.verifysignature = async(req,res)=>{
   
        const webhooksecret= "12345678"
        const signature = req.headers["x-razorpay-signature"];
        //hash based message authentication code  HMAC
        const shasum = crypto.createHmac("sha256",webhooksecret)
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");
        if(signature === digest){
            console.log("payment is authorized")
            const {courseId,userid}= req.body.payload.payment.entity.notes
           try{
              //fulfil the action
              //find the course and enroll the student in it
              const enrolledcourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled: userid}},{new:true})
              if(!enrolledcourse){
                return res.status(500).json({
                    success:false,
                    message:'course not found'
                })
              }
              console.log(enrolledcourse)
               //find the student and add the coure to the enroled one
               const enrolledstudent = await User.findOneAndUpdate({_id:userid},{$push:{courses:courseId}},{new:true})
               console.log(enrolledstudent)
               return response.status(200).json({
                success:true,
                message:'signature verified'
               })
          }
           catch(error){
             console.log(error)
             return res.status(500).json({
                success:false,
                message:error.message,

             })
           }
        }
        else{
            return res.status(400).json({
                success:false,
                message:'invalid request'
            })
        }

}