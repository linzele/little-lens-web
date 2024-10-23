import React from 'react';
import styles from '../style';

import { getDocs, collection } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import { useEffect, useState } from "react";

import { socialMedia } from '../constants';

const Footer = () => {

  const [companyDetails, setCompanyDetails] = useState({});

  async function getCompanyDetails() {
    try {
      const accountsCollection = collection(db, 'CompanyContact');
      const querySnapshot = await getDocs(accountsCollection);

      let temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({
          id: doc.id,
          ...doc.data()
        });
      });
    
      setCompanyDetails(temp[0]);

    } catch (error) {
      console.error("Error fetching accounts:", error);
      return [];
    }
  }

  useEffect(() => {
    getCompanyDetails();
  }, []);

  if (Object.keys(companyDetails).length === 0) {
    return (<><h1 className='text-2xl text-white'>Loading...</h1></>);
  }

  if (Object.keys(companyDetails).length !== 0) {
    return (
      <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
        <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]'>

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
            {companyDetails?.socials.map((social, index) => (
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

    <div className='mt-6'>
    <a 
      href="/PrivacyCode.html" 
      className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white hover:underline"
        >
      Privacy Policy
    </a>

          </div>
        </div>
      </section>
    ); 
  }
};

export default Footer;
