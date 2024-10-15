import { useState,useEffect } from 'react'
import PricingTable from './dashboard_components/PricingTable'
import {  collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";




export default function PricingPlans() {  

  const [prices,setPrices] = useState([]);

  const dataHeaders = ["Product Key","price","interval","interval count",""]


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
    <div className='md:col-span-2 border-2 w-full h-full p-2 bg-white shadow-xl rounded-lg flex flex-col'>

      <div className='w-full h-[10%] border-b-2 p-2 self-center flex items-center justify-center'>
        <h1 className='text-4xl'>Pricing Plans</h1>
      </div>

      <PricingTable dataHeaders={dataHeaders} prices={prices}/>


    </div>
  )
}
