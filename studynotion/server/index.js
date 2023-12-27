const express = require("express")
const app = express();

const userRoutes = require("./routes/User")
const paymentRoutes = require("./routes/Payment")
const courseRoutes = require("./routes/Course")
const profileRoutes = require("./routes/Profile")

const dbConnect = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const{cloudinaryConnect}= require("./config/cloudinary")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
const dbconnect = require("./config/database");
dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect 
dbconnect();

//middleware 
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,

    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/profile",profileRoutes)

//default route
app.post('/example', (req, res) => {
    // Your callback function logic here
    res.send('POST request received');
  });
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"ypur server is up and running...."
    })
})

//activate server
app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`)
})