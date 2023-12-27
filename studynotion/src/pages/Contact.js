import React from "react";
import Navbar  from "../components/common/Navbar";
import Footer1 from "../components/common/Footer1";

const Contact= () => {
    return(
             <div className="bg-slate-900">
                <Navbar />
                <div className="text-white text-[32px]">
                    <marquee>Contact Us</marquee>
                </div>
                <div className="flex flex-col">
                    <div className="w-[50px] text-white flex flex-row items-center gap-2">
                        <img src="https://i.pinimg.com/736x/8f/c3/7b/8fc37b74b608a622588fbaa361485f32.jpg" alt="email_logo" />
                        <abbr title="ayushi7453gupta@gmail.com">Email:</abbr>
                        <p className="text-white">ayushi7453gupta@gmail.com</p>
                    </div>
                    <br></br>
                    <div className="w-[30px] flex flex-row items-center gap-2">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLLK1ErtvZn9CV9exr8dRY3TSNDMtl85hZfg&usqp=CAU" alt="mobile_logo" />
                        <p className="text-white">7453820810</p>
                    </div>
                
                </div>
                <Footer1/>
            </div>
       
    );
}

export default Contact;