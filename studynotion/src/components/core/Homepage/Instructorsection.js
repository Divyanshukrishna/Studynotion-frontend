import React from 'react';
import instructor from '../../../assets/Images/instructor.jpg'
import HighlightText from './HighlightText';
import CTAButton from "../Homepage/CTAButton";
import {FaArrowRight} from "react-icons/fa";

const Instructor=()=>{
    return(
    <div>
      <div className='flex flex-row gap-20 items-center'>
        <div className='w-[50%]'>
           <img
           src={instructor} 
           alt =" "
           className='shadow-white'
           />
        </div>
        <div className='w-[50%] flex flex-col gap-10'>
          <div className='font-semibold text-4xl'>
            Become an 
            <HighlightText text={"instructor"}/>
          </div>
          <p className='text-[16px] font-medium w-[90%] text-slate-400'>
            Instructors from around the world teach millions of students on Studynotion.We provide the tools ans skills to teach what you love.
          </p>
          <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
             <div className='flex flex-row gap-2 items-center'>
              Start learning Today
              <FaArrowRight/>
             </div>
          </CTAButton>
          </div>
          

        </div>

      </div>
    </div>
    );
}

export default Instructor