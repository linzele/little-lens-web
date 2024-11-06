import React, { useEffect, useState } from 'react'

import Sidebar from '../dashboard_components/Sidebar'

import TopHeader from '../dashboard_components/TopHeader'
import AdminTable from '../dashboard_components/AdminTable'


import { getDocs, collection } from "firebase/firestore";
import { db } from '@/firebase/firebase';

import { useAuth } from "@/contexts/auth"


const Home = () => {

    const [accountsData,setAccountData] = useState([]);
    const limit = 4;

    const { currentUser } = useAuth()
   
    const dataHeaders = [
        "Avatar","Email","Name","Status",""
    ]



    async function getAllAccounts() {
        try {
          // Reference to the 'Accounts' collection
          const accountsCollection = collection(db, 'users');
          
          // Get all documents from the collection
          const querySnapshot = await getDocs(accountsCollection);
          console.log(querySnapshot);
          // Create an array to store the accounts
          const accountsArray = [];
      
          // Loop through each document and extract the data
          querySnapshot.forEach((doc) => {
            // Push the document data along with the document ID into the array
            if (accountsArray.length < limit)
            {
              accountsArray.push({
                id: doc.id, // Document ID
                ...doc.data() // Spread the document data (email, name, status)
              });
            }
          });
      
                // SET the array of accounts
                setAccountData(accountsArray)
        } catch (error) {
          console.error("Error fetching accounts:", error);
          return [];
        }
      }

      useEffect(()=>{
        getAllAccounts();

      },[])


    return (

        <div className='w-screen h-screen flex'>
        <Sidebar/>
        
        <div className='flex flex-col w-full gap-5'>

        <TopHeader header="All Accounts"/>

        {/*DATA WILL BE LOOPED INSIDE HERE*/}
        <AdminTable tableHeader="Accounts" accounts={accountsData} dataHeaders={dataHeaders}/>
        
     

        </div>        
        </div>
    )
}

export default Home;
