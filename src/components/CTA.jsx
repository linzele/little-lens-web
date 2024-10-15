import React from 'react'
import styles from '../style'
import Button from './Button'

import { useState,useEffect } from 'react'
import PricingTable from './dahsboard_components/PricingTable'
import {  collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";



const CTA = () => {

  const [prices,setPrices] = useState([]);
  const subscriptionPlanId = "prod_R0zfOl6Hu8Teuy";  // Your document ID, **** WILL CRASH IF DOCUMENT NAME CHANGES TAKE NOTE !!!!!!!!!!!

  const pricesCollectionRef = collection(db, "subscriptionPlans", subscriptionPlanId, "prices");
  
  const fetchPrices = async () => {
  try {
      const querySnapshot = await getDocs(pricesCollectionRef);
      const pricesArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
      }));
      console.log(pricesArray);
      return pricesArray;
  } catch (error) {
      console.error("Error fetching prices: ", error);
  }
  };

  useEffect(() => {
    const fetchAndSetPrices = async () => {
      const pricesArray = await fetchPrices();
      setPrices(pricesArray);
    };

    fetchAndSetPrices();
  }, []);



  

  return (
    <div className='flex flex-col'>
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
      <div className='flex-1 flex flex-col'>
      <h2 className={styles.heading2}>Start Your Adventure Today!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Download now and unlock the full potential of your images—let your creativity shine!
      </p>
      </div>
      <div className={`${styles.flexCenter} sm:ml-10 ml-0`}>
        <Button/>
      </div>
    </section>



    <div className='border-white w-full border-2 rounded-lg'>
      <h1 className='text-3xl text-white text-center  border-b-2 p-4'>Pricing</h1>
      {prices.length>0?
      <div className='flex flex-col sm:flex-row justify-evenly'>
         {prices.map((price,index)=>(
            <div key={index} className='text-white flex flex-col p-8 gap-2 items-center'>
              <h1 className='text-2xl'>$ {price.unit_amount*0.01} {price.currency}</h1>
              <h1>Billed every {price.interval}</h1>
              <button className='text-white border-2 border-white p-4 rounded-lg hover:bg-white hover:text-black'>Check it out</button>
            </div>

         ))}



      </div>:
      <><h1>Loading...</h1></>
        
    }

    </div>
    </div>
  )
}

export default CTA
