import React, { useEffect, useState } from 'react'
import { feedback } from '../constants'
import styles from '../style'
import Feedback from './Feedback'


import { getDocs, collection } from "firebase/firestore";
import { db } from '@/firebase/firebase';



const Testimonials = () => {

  const [reviewsData,setReviewstData] = useState([]);
  const limit =3;

  async function getAllReviews() {
    try {
      // Reference to the 'Accounts' collection
      const reviewsCollection = collection(db, 'reviews');
      
      // Get all documents from the collection
      const querySnapshot = await getDocs(reviewsCollection);
      console.log(querySnapshot);
      // Create an array to store the accounts
      const reviewsArray = [];
  
      // Loop through each document and extract the data
      querySnapshot.forEach((doc) => {
        // Push the document data along with the document ID into the array
       if (reviewsArray.length < limit)
       {
        reviewsArray.push(doc.data());
       }
       
      });
            // SET the array of accounts
            setReviewstData(reviewsArray)
    } catch (error) {
      console.error("Error fetching accounts:", error);
      return [];
    }
  }

  useEffect(()=>{
    getAllReviews();
  
  },[])




  return (
    <section id='Reviews' className={`${styles.paddingY} ${styles.flexce} flex-col relative`}>
      <div className='absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40'/>
      <div className='w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]'>
        <h2 className={styles.heading2}>What people are <br className='sm:block hidden'/>saying about us</h2>
        <div className='w-full md:mt-0 mt-6'>
          <p className={`${styles.paragraph} text-left max-w-[450px]`}>
            Everything you need in one scan. 
          </p>  
        </div>
      </div>
      <div className='flex flex-wrap sm:justify-start justify-center w-full feedback-contrainer relative z-[1]'>
        {reviewsData.map((data,index) => (
          <Feedback key={index} data={data} />        
        ))}
      </div>      
    </section>
  )
}

export default Testimonials
