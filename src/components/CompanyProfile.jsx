import React from 'react'
import Sidebar from './dashboard_components/Sidebar'
import TopHeader from './dashboard_components/TopHeader'
import CompanyContact from './CompanyContact'
import ReviewCategory from './ReviewCategory'
import StoryGenres from './StoryGenres'
import PricingPlans from './PricingPlans'

export default function CompanyProfile() {
  return (

    <div className='w-screen h-screen flex'>
    <Sidebar/>
    
    <div className='flex flex-col w-full gap-5'>

    <TopHeader header="Company Profile Management"/>

        {/* CONTENT STARTS HERE */}
        <div className='grid grid-cols-1 md:grid-cols-3 w-full h-full p-10 gap-4'>
          
          <div className='flex flex-col  gap-4 '>
            {/* COMPANY CONTACT DETAILS CONTAINER*/}
                <CompanyContact/>

            {/* REVIEW CATEGORIES CONTAINER*/}
                <ReviewCategory/>
                
            {/* REVIEW CATEGORIES CONTAINER*/}
            <StoryGenres/>

          </div>


        <PricingPlans/>



        </div>
 

    </div>        
    </div>
  )
}
