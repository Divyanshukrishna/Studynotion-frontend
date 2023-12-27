import React from 'react';
import HighlightText from './HighlightText';
import knowprogress from "../../../assets/Images/knowprogress.png";
import compare from "../../../assets/Images/compare.png";
import plan from "../../../assets/Images/plan.png";
import CTAButton from "./CTAButton";

const LearninglanguageSection =() =>{
    return(
        <div className='mt-[8%] mb-32'>
         <div className='flex flex-col gap-5 items-center'>

             <div className='text-4xl font-semibold text-center'>
                 Your swiss knife for
                 <HighlightText text ={"learning new language"}/>
             </div>

             <div className='text-center text-black mx-auto text-base w-[70%]'>
                Using spin making learning multiple languages easy with 20+ languages realistic voice-over, progress tracking ,custom schedule and more.
             </div>

             <div className='flex flex-row items-center justify-center mt-5'>
                <img
                   src={knowprogress}
                   alt="know your progress"
                   className='object-contain'
                />

              <img          
                   src={compare}
                   alt="know your progress"
                   className='object-contain'
                />

                <img
                   src={plan}
                   alt="know your progress"
                   className='object-contain'
                />
             </div>

             <div className='w-fit'> 
               <CTAButton active={true} linkto={"/signup"}> 
               <div>Learn more
               </div>
               </CTAButton>
              
             </div>

         </div>
        </div>
    )
}

export default LearninglanguageSection