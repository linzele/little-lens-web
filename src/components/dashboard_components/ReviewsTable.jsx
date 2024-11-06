import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function ReviewsTable(props) {
    const { tableHeader, reviews, dataHeaders } = props;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRating, setSelectedRating] = useState(''); // Initially no rating selected

    const filteredReviews = reviews.filter((rev) =>
        rev.review.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
        (selectedRating ? rev.rating === parseInt(selectedRating) : true) // Filter by rating if selected
    );

    const handleRatingChange = (event) => {
        setSelectedRating(event.target.value); 
    };

    if (reviews.length > 0) {
        return (
            <>
                {/* OUTER CONTAINER */}
                <div className='w-full h-[100%]  p-5'>
                    {/* INNER CONTAINER */}
                    <div className='bg-white w-full h-full rounded-xl shadow-xl flex flex-col border-2'>

                        {/* Header */}
                        <div className='w-full h-[25%] p-5 flex flex-col sm:flex-row justify-between'>
                            <div className="flex flex-col">
                                <h1 className='text-4xl font-semibold'>{tableHeader}</h1>
                                <p className='text-gray-400 font-medium'>Manage All Your Users' {tableHeader}</p>
                            </div>
                            <Input
                                type="text"
                                placeholder="🔍 Search..."
                                className="sm:w-[20%]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Rating Filter Dropdown */}
                        <div className="w-full h-[10%] p-5 flex flex-col">
                            <label className="font-semibold mb-2">Filter by Rating:</label>
                            <select
                                className="border rounded-md p-2"
                                value={selectedRating}
                                onChange={handleRatingChange}
                            >
                                <option value="">All Ratings</option>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <option key={rating} value={rating}>
                                       {rating} Star 
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Table */}
                        <div className="w-full h-full p-5 ">
                            <Table>

                                {/* TABLE HEADER */}
                                <TableHeader>
                                    <TableRow>
                                        {dataHeaders.map((header, index) => (
                                            <TableHead key={index}>{header}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>

                                    {/* Map your data here */}
                                    {filteredReviews.length > 0 ? (
                                        filteredReviews.map((data, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{data.userDisplayName}</TableCell>
                                                <TableCell>{Date(data.datePublished).toString()}</TableCell>
                                                <TableCell>{data.published + ""}</TableCell>
                                                <TableCell>{data.rating}</TableCell>
                                                <TableCell>{data.review}</TableCell>
                                                <TableCell>{data.reviewCategory}</TableCell>
                                                {/* Update/Delete button left empty*/}
                                                <TableCell>
                                                </TableCell>

                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell>No records found</TableCell>
                                        </TableRow>
                                    )}

                                </TableBody>
                            </Table>
                        </div>

                    </div>
                </div>
            </>
        )
    }
    // when loading
    return <div className="flex justify-center items-center w-full h-full"><h1 className="text-4xl">Loading....</h1></div>
}