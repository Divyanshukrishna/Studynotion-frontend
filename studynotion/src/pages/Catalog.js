import React from 'react'
import Footer1 from '../components/common/Footer1'
const Catalog =()=>{
  return (
    <div className='text-white'>
        <div>
            <p>

            </p>
            <p>

            </p>
        </div>
        <div>
            {/*section*/}
            <div>
                <div className='flex gap-x-3'>
                    <p>Most popular</p>
                    <p>new</p>
                </div>
            </div>
           { /*section2*/}
           <div>
            <p>Top courses</p>
           </div>
           {/*section3*/}
           <div>
            <p>Frequently bought</p>
           </div>

        </div>
        {/*footer*/}
        <Footer1/>
    </div>
  )
}

export default Catalog