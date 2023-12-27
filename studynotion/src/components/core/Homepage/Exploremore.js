import React, { useState } from 'react';
import {homepageexplore} from '../../data/homepageexplore';
import HighlightText from './HighlightText';


const tabsname=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
]

const Exploremore=()=>{

   const [currenttab,setcurrenttab]= useState(tabsname[0]);
   const [courses,setcourses]=useState(homepageexplore[0].courses);
   const [currentcard,setcurrentcard]= useState(homepageexplore[0].courses.heading)

   const setmycard=(value)=>{
    setcurrenttab(value);
    const result = homepageexplore.filter((course)=>course.tag===value);
    setcourses(result[0].courses);
    setcurrentcard(result[0].courses[0].heading);
   }

    return(
     <div>
        <br></br>
       <div className='text-4xl font-semibold items-center'>
        Unlock the 
        <HighlightText text={"Power of Code"}/>
       </div>
       <p className='text-center font-semibold text-slate-600 mt-3 text-sm'>
        Learn to build anything you imagine
       </p>
       <br></br>
       <div className='flex flex-row rounded-full bg-slate-800 mb-5 px-1 py-1'>
        {
            tabsname.map((element,index)=>{
                return (
                    <div className={`text-[16px] flex flex-row items-center gap-2 ${currenttab===element?"bg-slate-900 text-slate-50 font-medium":"text-slate-500"} rounded-full transition-all duration-200 cursor-pointer hover:bg-slate-900  hover:text-slate-50 px-7 py-2`} key={index}
                    onClick={()=>setmycard(element)}>
                       {element}
                    </div>
                )
            })
        }
       </div>
       <div className='h-[150px]'>
          <div className='absolute flex flex-row gap-5 justify-between w-full '>
            {
                courses.map((element,index)=>{
                    return(
                        <div>
                         </div>
                       // <Coursecard key={index}
                        //carddata = {element}
                        //currentcard ={currentcard}
                        //setcurrentcard={setcurrentcard}/>
                    )
                })
            }
          </div>
       </div>
     </div>
    )
}

export default Exploremore