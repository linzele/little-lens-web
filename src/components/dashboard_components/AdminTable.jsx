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
                            <TableCell>{data.email}</TableCell>
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


                </div>
                </div>
    </>
  )}

   // when loading
 return <div className="flex justify-center items-center w-full h-full"><h1 className="text-4xl">Loading....</h1></div>
}
