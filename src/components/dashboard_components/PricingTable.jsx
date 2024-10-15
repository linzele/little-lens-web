import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"





export default function PricingTable(props) {
    
    const {prices,dataHeaders} = props



    


    if (prices.length !== 0 )
    {
    return (
    <>



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
                    {prices.map((price,index)=>(

                        <TableRow key={index}>
                        <TableCell>{price.product}</TableCell>
                        <TableCell>$ {price.unit_amount*0.01}</TableCell>
                        <TableCell>{price.recurring.interval}</TableCell>
                        <TableCell>{price.recurring.interval_count}</TableCell>
                    
                        {/* UPDATE/ DELETE BUTTON */}
                        <TableCell>
                        <button>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 15.9642C4 16.2269 4.05173 16.487 4.15224 16.7296C4.25275 16.9723 4.40007 17.1927 4.58579 17.3784C4.7715 17.5642 4.99198 17.7115 5.23463 17.812C5.47728 17.9125 5.73736 17.9642 6 17.9642C6.26264 17.9642 6.52272 17.9125 6.76537 17.812C7.00802 17.7115 7.2285 17.5642 7.41421 17.3784C7.59993 17.1927 7.74725 16.9723 7.84776 16.7296C7.94827 16.487 8 16.2269 8 15.9642C8 15.7016 7.94827 15.4415 7.84776 15.1989C7.74725 14.9562 7.59993 14.7357 7.41421 14.55C7.2285 14.3643 7.00802 14.217 6.76537 14.1165C6.52272 14.016 6.26264 13.9642 6 13.9642C5.73736 13.9642 5.47728 14.016 5.23463 14.1165C4.99198 14.217 4.7715 14.3643 4.58579 14.55C4.40007 14.7357 4.25275 14.9562 4.15224 15.1989C4.05173 15.4415 4 15.7016 4 15.9642ZM14 15.9642C14 16.4947 14.2107 17.0034 14.5858 17.3784C14.9609 17.7535 15.4696 17.9642 16 17.9642C16.5304 17.9642 17.0391 17.7535 17.4142 17.3784C17.7893 17.0034 18 16.4947 18 15.9642C18 15.4338 17.7893 14.9251 17.4142 14.55C17.0391 14.1749 16.5304 13.9642 16 13.9642C15.4696 13.9642 14.9609 14.1749 14.5858 14.55C14.2107 14.9251 14 15.4338 14 15.9642ZM24 15.9642C24 16.4947 24.2107 17.0034 24.5858 17.3784C24.9609 17.7535 25.4696 17.9642 26 17.9642C26.5304 17.9642 27.0391 17.7535 27.4142 17.3784C27.7893 17.0034 28 16.4947 28 15.9642C28 15.4338 27.7893 14.9251 27.4142 14.55C27.0391 14.1749 26.5304 13.9642 26 13.9642C25.4696 13.9642 24.9609 14.1749 24.5858 14.55C24.2107 14.9251 24 15.4338 24 15.9642Z" fill="black"/>
                                </svg>
                                </button>
                        </TableCell>


                        </TableRow>

                    ))}
            
                </TableBody>
                </Table>
                </div>




 
    
    </>
  )
}
 // when loading
 return <div className="flex justify-center items-center w-full h-full"><h1 className="text-4xl">Loading....</h1></div>

}
