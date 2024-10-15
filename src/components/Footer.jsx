import React from 'react';
import styles from '../style';

import { getDocs, collection } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import { useEffect, useState } from "react";

import {  socialMedia } from '../constants';

const Footer = () => {

  const [companyDetails,setCompanyDetails] = useState({});

  async function getCompanyDetails() {
    try {
      // Reference to the 'Accounts' collection
      const accountsCollection = collection(db, 'CompanyContact');
      
      // Get all documents from the collection
      const querySnapshot = await getDocs(accountsCollection);
      // Create an array to store the accounts
      let temp = []; 
      // Loop through each document and extract the data
      querySnapshot.forEach((doc) => {
 
        // Push the document data along with the document ID into the array
        
          temp.push({
            id: doc.id, // Document ID
            ...doc.data() // Spread the document data (email, name, status)
          });

      });
    
      console.log(temp[0])
    setCompanyDetails(temp[0]);





    } catch (error) {
      console.error("Error fetching accounts:", error);
      return [];
    }
  }

  useEffect(()=>{
    getCompanyDetails();
    console.log(companyDetails)
  },[])

  if (Object.keys(companyDetails).length===0)
  {
    return (<><h1 className='text-2xl text-white'>Loading...</h1></>)
  }


  if (Object.keys(companyDetails).length !== 0)
  {
    return (
      <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
        <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]'>
    

    
            {/* Move email and address below */}
            <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
              {companyDetails.email}
            </p>
            <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
              {companyDetails.address}
            </p>
          </div>

<br/>
<br/>
<br/>
          <div className='flex flex-col items-center gap-4'>
            <p className='font-poppins font-normal text-center text-[18px] leading-[27px] text-white'>
              2024 Little Lens. All Rights Reserved.   
            </p> 
    
          <div className='flex flex-row md:mt-0 mt-6'>
            {/* NOW USING THE DATABASE SVG / HREF */}
            {companyDetails?.socials.map((social,index) => (
              <a 
                href={social.address} 
                key={index} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img
                  src={social.image}
                  alt={"svg"}
                  style={{ filter: 'invert(100%) brightness(1000%)' }}
                  fill="currentColor"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    ); 
};
}

export default Footer;
