import React from 'react';
import logo1 from "../../../assets/Timelinelogo/logo1.jpg";
import logo2 from "../../../assets/Timelinelogo/logo2.jpg";
import logo3 from "../../../assets/Timelinelogo/logo3.jpg";
import logo4 from "../../../assets/Timelinelogo/logo4.jpg";
import timelineimg from "../../../assets/Timelinelogo/timelineimg.png"


const timeline =[
    {
        Logo: logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: logo2,
        heading:"Responsibility",
        Description:"Student will always be our top priority",
    },
    {
        Logo: logo3,
        heading:"Flexibility",
        Description:"The abilityto switch is an important skill",
    },
    {
        Logo: logo4,
        heading:"Solve the problem",
        Description:"Code your way to solution",
    },
]

const TimelineSection =() =>{
    return (
        <div>
          <div className='flex flex-row gap-15 items-center'>
           
            <div className='w-[45%] flex flex-col gap-5'>
                {
                    timeline.map((element,index)=>{
                        return(
                            <div className='flex flex-row gap-6' key={index}>
                                <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                    <img src={element.Logo}/>
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='relative shadow-blue-200'>
                <img src={timelineimg}
                alt ="timeline Image"
                className='shadow-white object-cover h-fit'/>

                <div className='absolute bg-lime-900 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-row gap-3 items-center border-r border-lime-700 px-7'>
                       <p className='text-4xl font-bold'>10</p>
                       <p className='text-lime-400 text-sm '>Years of Experience</p>
                    </div>

                    <div className='flex gap-2 items-center px-7'>
                       <p className='text-4xl font-bold'>250</p>
                       <p className='text-lime-400 text-sm'>Types of Courses</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default TimelineSection