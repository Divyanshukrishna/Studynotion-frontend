import React from 'react';
import {FaArrowRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/CTAButton';
import Banner from "../assets/banner.mp4";
import CodeBlocks  from '../components/core/Homepage/CodeBlocks';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearninglanguageSection from '../components/core/Homepage/LearninglanguageSection';
import Instructorsection from "../components/core/Homepage/Instructorsection";
import Footer1 from '../components/common/Footer1';
import Exploremore from '../components/core/Homepage/Exploremore';
import Navbar from '../components/common/Navbar';

const Home=()=>{    
    
    return(
        <div>
            <Navbar />
       {/*Section 1*/}
       <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between italics'>
        <Link to={"/signup"}>
            <div className='group mt-16 p-1 mx-auto rounded-full bg-slate-800  text-slate-50 transition-all duration-200 hover:scale-95 w-fit '>
                <div className='flex flex-row items-center gap-2 rounded-full px-3 py-1 transition-all duration-200 group-hover:bg-black italics'>
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                </div>
            </div>
        </Link>
        <div className='text-center font-semibold mt-7 text-4xl'>
         Empower Your Future with 
         <HighlightText text="Coding Skills" />
        </div>

        <div className='w-[70%] text-center text-lg font-bold text-slate-500 mt-4'>
            With our online courses you can learn from your pace,anywhere in the world,including hands-on projects along with quizzes and assignments provided by our Instructors.
        </div>

        <div className='flex flex-row gap-7 mt-8'>
         <CTAButton active={true} linkto={"/signup"}>
           Learn more
         </CTAButton>

         <CTAButton active={false} linkto={"/login"}>
           Book a demo
         </CTAButton>
        </div>

        <div className='shadow-cyan-400 mx-14 my-12'>
            <video muted loop autoPlay>
            <source src={Banner} type="video/mp4"/>
            </video>
        </div>
        {/*code section1*/}
        <div>
            <CodeBlocks 
            position={"lg:flex-row"}
            heading={     
                <div className='text-4xl font-semibold'>
                Unlock your
                <HighlightText text={"coding potential"}/>
                with our online courses
            </div>
            }
            subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={
                {
                    btntxt:"Try It Yourself",
                    linkto:"/signup",
                    active: true,
                }
            }
            ctabtn2={
                {
                    btntxt:"Learn more",
                    linkto:"/login",
                    active: false,
                }
            }
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title><linkrel ='stylesheet' href="style.css">\n</head>\n<body>\n<h1 <a href="/">header>>`}
              codecolor={"text-yellow-500"}
            />
        </div>

         {/*code section2*/}
         <div>
            <CodeBlocks 
            position={"lg:flex-row-reverse"}
            heading={
                <div className='text-4xl font-semibold'>
                   Start
                    <HighlightText text={"coding "}/>
                   in seconds
                </div>
            }
            subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={
                {
                    btntxt:"Continue lessons",
                    linkto:"/signup",
                    active: true,
                }
            }
            ctabtn2={
                {
                    btntxt:"Learn more",
                    linkto:"/login",
                    active: false,
                }
            }
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title><link rel='stylesheet' href="style.css">\n</head>\n<body>\n<h1 <a href="/">header>>`}
            codecolor={"text-yellow-500"}
            />
        </div>
        <Exploremore />
       </div>
        {/*Section 2*/}

    <div className='bg-white text-slate-900'>
        <div className='hompage_bg h-[300px]'>

           <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
            <div className='h-[100px]'></div>
            <div className='flex flex-row gap-7 text-white'>
                <CTAButton active={true} linkto={"/signup"}>
                   <div className='flex items-center gap-2'>
                    Explore full catalog
                    <FaArrowRight />
                   </div>
                  
                </CTAButton>
                <CTAButton active={false} linkto={"/signup"}>
                   <div>
                    Learn more
                    </div>
                  
                </CTAButton>
             
            </div>

           </div>

        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
           
            <div className='flex flex-row gap-5 mb-10 mt-8'>
              <div className='text-4xl font-semibold w-[45%]'>
                Get the skills that you need for a 
                <HighlightText text={"Job that is in demand"}/>
              </div>
              <div className='flex flex-col gap-8 w-[40%] items-start'>
            <div className='test-[16px]'>
                The modern Studynotion is the dictates its own terms. Today,to be a competitve specialist requires more than professional skills. 
            </div>
            
            <CTAButton active={true} linkto={"/signup"}>
              <div>
                Learn more
              </div>
            </CTAButton>
           </div>
            </div>
       
  
         <TimelineSection />
         <br>
        </br>
         <LearninglanguageSection />
         </div>
    </div>


        {/*Section 3*/}
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-slate-900 text-white'>
   
         <Instructorsection />

        </div>
         {/*footer*/}
         <Footer1/>
        </div>
    );
}
export default Home 