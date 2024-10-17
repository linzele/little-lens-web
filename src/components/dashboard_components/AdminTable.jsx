import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function AdminTable(props) {
  
    const {tableHeader,accounts,dataHeaders} = props
  


    // Step 1: Add state for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Step 2: Filter accounts based on search query
    const filteredAccounts = accounts.filter((account) =>
        account.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    if (accounts.length > 0)
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
                    onChange={(e) => setSearchQuery(e.target.value)} />
          
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
                    
                    {/*------------------------MAP YOUR DATA HERE (MAX CAN DISPLAY UP TO 5 ACCOUNTS) --------------------------*/}
                    
                    {filteredAccounts.length > 0?(
                        filteredAccounts.map((data,index)=>(
                            <TableRow key={index}>
                            {data.avatar?
                            <TableCell>
                                {/*YOUR AVATAR*/}
                                <div className="w-16 h-16 bg-gray-500 rounded-lg">
                                    <img src={data.avatar} alt="" className="object-fill rounded-lg"></img>
                                </div>
                            </TableCell>:
                            
                            <TableCell><div className="w-16 h-16 bg-gray-500 rounded-lg"> </div></TableCell>
                            }
                            <TableCell>{data.id}</TableCell>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.status}</TableCell>
                            {/* UPDATE/DELETE BUTTON */}
                            <TableCell>

                            </TableCell>


                        </TableRow>
                        ))
                    ):
                    
                    <TableRow>
                        <TableCell>No records found</TableCell>
                    </TableRow>
                    
                    
                    }

                    
                    {/*----------------------------------------------------------------------*/}

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
  )}

   // when loading
 return <div className="flex justify-center items-center w-full h-full"><h1 className="text-4xl">Loading....</h1></div>
}
