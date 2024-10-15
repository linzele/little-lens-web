import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";




export default function ReviewsTable(props) {
    const {tableHeader,reviews,dataHeaders} = props
  


    // Step 1: Add state for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Step 2: Filter Reviews based on first alphabet based on search query
    const filteredReviews = reviews.filter((rev) =>
        rev.review.toLowerCase().startsWith(searchQuery.toLowerCase())
    );


   
    


    if (reviews.length > 0 )
    {
    return (
    <>
            {/* OUTER CONTAINER */}
            <div className='w-full h-[100%]  p-5'>
            {/*INNER CONTAINER*/}
            <div className='bg-white w-full h-full rounded-xl shadow-xl flex flex-col border-2'>

                {/*Header*/}
                <div className='w-full h-[25%] p-5  flex flex-col sm:flex-row justify-between'>
                    <div className="flex flex-col">
                    <h1 className='text-4xl font-semibold'>{tableHeader}</h1>
                    <p className='text-gray-400 font-medium'>Manage All Your Users' {tableHeader}</p>
                    </div>
                    <Input type="text" 
                    placeholder="🔍 Search..." 
                    className="sm:w-[20%]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                   />
          
                </div>


                {/*Table*/}
                <div className="w-full h-full  p-5 ">
                <Table>

                {/* TABLE HEADER  */}
                <TableHeader>
                    <TableRow>
           
                    {dataHeaders.map((header,index)=>(
                         <TableHead key={index}>{header}</TableHead>
                    ))}


                    </TableRow>
                </TableHeader>

                
                <TableBody>
                    
                    {/*------------------------MAP YOUR DATA HERE (MAX CAN DISPLAY UP TO 4 ACCOUNTS) --------------------------*/}
                    {filteredReviews.length > 0?(
                        filteredReviews.map((data,index)=>(
                            <TableRow key={index}>

                            <TableCell>{data.userid}</TableCell>
                            <TableCell>{Date(data.datePublished).toString()}</TableCell>
                            <TableCell>{data.published + ""}</TableCell>
                            <TableCell>{data.review}</TableCell>
                            <TableCell>{data.reviewCategory}</TableCell>
                            {/* UPDATE/DELETE BUTTON */}
                            <TableCell>
                                <button className="bg-white">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 15.9642C4 16.2269 4.05173 16.487 4.15224 16.7296C4.25275 16.9723 4.40007 17.1927 4.58579 17.3784C4.7715 17.5642 4.99198 17.7115 5.23463 17.812C5.47728 17.9125 5.73736 17.9642 6 17.9642C6.26264 17.9642 6.52272 17.9125 6.76537 17.812C7.00802 17.7115 7.2285 17.5642 7.41421 17.3784C7.59993 17.1927 7.74725 16.9723 7.84776 16.7296C7.94827 16.487 8 16.2269 8 15.9642C8 15.7016 7.94827 15.4415 7.84776 15.1989C7.74725 14.9562 7.59993 14.7357 7.41421 14.55C7.2285 14.3643 7.00802 14.217 6.76537 14.1165C6.52272 14.016 6.26264 13.9642 6 13.9642C5.73736 13.9642 5.47728 14.016 5.23463 14.1165C4.99198 14.217 4.7715 14.3643 4.58579 14.55C4.40007 14.7357 4.25275 14.9562 4.15224 15.1989C4.05173 15.4415 4 15.7016 4 15.9642ZM14 15.9642C14 16.4947 14.2107 17.0034 14.5858 17.3784C14.9609 17.7535 15.4696 17.9642 16 17.9642C16.5304 17.9642 17.0391 17.7535 17.4142 17.3784C17.7893 17.0034 18 16.4947 18 15.9642C18 15.4338 17.7893 14.9251 17.4142 14.55C17.0391 14.1749 16.5304 13.9642 16 13.9642C15.4696 13.9642 14.9609 14.1749 14.5858 14.55C14.2107 14.9251 14 15.4338 14 15.9642ZM24 15.9642C24 16.4947 24.2107 17.0034 24.5858 17.3784C24.9609 17.7535 25.4696 17.9642 26 17.9642C26.5304 17.9642 27.0391 17.7535 27.4142 17.3784C27.7893 17.0034 28 16.4947 28 15.9642C28 15.4338 27.7893 14.9251 27.4142 14.55C27.0391 14.1749 26.5304 13.9642 26 13.9642C25.4696 13.9642 24.9609 14.1749 24.5858 14.55C24.2107 14.9251 24 15.4338 24 15.9642Z" fill="black"/>
                                </svg>
                                </button>
                            </TableCell>


                        </TableRow>
                        ))
                    ):
                    
                    <TableRow>
                        <TableCell>No records found</TableCell>
                    </TableRow>
                    }
                     
    
                </TableBody>
                </Table>
                </div>




            {/*OUT OF TABLE CONTAINER*/}
            {/* FOOTER  */}
                <div className="p-5  w-full h-[10%]  flex justify-between items-center">
                    <p>Showing 4 out of 10 Records</p>
 
 
                    <div className="flex gap-5 ">
                    <button className="p-4 flex items-center gap-4">
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.36611 1.72209V0.859364C7.36611 0.784587 7.28017 0.743292 7.22213 0.789051L2.19088 4.71874C2.14813 4.75198 2.11354 4.79455 2.08975 4.8432C2.06596 4.89184 2.05359 4.94528 2.05359 4.99943C2.05359 5.05358 2.06596 5.10702 2.08975 5.15567C2.11354 5.20431 2.14813 5.24688 2.19088 5.28012L7.22213 9.20981C7.28128 9.25557 7.36611 9.21427 7.36611 9.1395V8.27677C7.36611 8.22209 7.34044 8.16963 7.29803 8.13615L3.28017 4.99999L7.29803 1.86271C7.34044 1.82923 7.36611 1.77677 7.36611 1.72209Z" fill="#838383"/>
                    </svg>
                     <span className="text-gray-500">Prev</span>
                    </button>

                    <button className="p-4 flex items-center gap-4">
                     <span className="text-gray-500">Next</span>

                     <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.83147 4.71877L2.80022 0.78908C2.78708 0.77873 2.77128 0.772297 2.75464 0.770522C2.738 0.768746 2.7212 0.771699 2.70617 0.779042C2.69113 0.786385 2.67847 0.797819 2.66964 0.812032C2.66081 0.826245 2.65617 0.84266 2.65625 0.859392V1.72212C2.65625 1.7768 2.68192 1.82926 2.72433 1.86274L6.74219 5.00002L2.72433 8.13729C2.6808 8.17078 2.65625 8.22323 2.65625 8.27792V9.14064C2.65625 9.21542 2.74219 9.25671 2.80022 9.21095L7.83147 5.28127C7.87424 5.24791 7.90883 5.20524 7.93262 5.15651C7.95642 5.10777 7.96878 5.05425 7.96878 5.00002C7.96878 4.94578 7.95642 4.89226 7.93262 4.84353C7.90883 4.79479 7.87424 4.75212 7.83147 4.71877Z" fill="black"/>
                    </svg>

                    </button>

                </div>
 
 
 
                </div>

 


            </div>
        </div>
    
    
    
    </>
  )
}
 // when loading
 return <div className="flex justify-center items-center w-full h-full"><h1 className="text-4xl">Loading....</h1></div>

}
