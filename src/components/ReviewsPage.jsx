import React, { useEffect, useState } from 'react'

import Sidebar from './dahsboard_components/Sidebar';

import TopHeader from './dahsboard_components/TopHeader'

import ReviewsTable from './dahsboard_components/ReviewsTable';

import { getDocs, collection } from "firebase/firestore";
import { db } from '@/firebase/firebase';

import { useAuth } from "@/contexts/auth"


const ReviewsPage = () => {

    const [reviewsData,setReviewstData] = useState([]);
    const limit =3;

    const { currentUser } = useAuth()
   
    const dataHeaders = [
        "Userid","DatePublished","Published","Rating","Review","ReviewCategory",""
    ]



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

        <div className='w-screen h-screen flex'>
        <Sidebar/>
        
        <div className='flex flex-col w-full gap-5'>

        <TopHeader header={"Reviews"}/>

        <ReviewsTable tableHeader="All Reviews" reviews={reviewsData} dataHeaders={dataHeaders}/>



     

        </div>        
        </div>
    )
}

export default ReviewsPage;
