
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from '@/components/ui/table';

export default function PricingTable(props) {
  const { prices, dataHeaders, onEditClick } = props;

  if (prices.length !== 0) {
      return (
          <div className="w-full h-full p-5">
              <Table>
                  <TableHeader>
                      <TableRow>
                          {dataHeaders.map((header, index) => (
                              <TableHead key={index}>{header}</TableHead>
                          ))}
                      </TableRow>
                  </TableHeader>

                  <TableBody>
                      {prices.map((price, index) => (
                          <TableRow key={index}>
                              <TableCell>{price.product}</TableCell>
                              <TableCell>$ {price.unit_amount * 0.01}</TableCell>
                              <TableCell>{price.recurring.interval}</TableCell>
                              <TableCell>{price.recurring.interval_count}</TableCell>

                              {/* Edit Button */}
                              <TableCell>
                                  <button onClick={() => onEditClick(price)}>
                                  <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.1429 27.5715H2.85714C2.22499 27.5715 1.71428 28.0822 1.71428 28.7144V30.0001C1.71428 30.1572 1.84285 30.2858 1.99999 30.2858H30C30.1571 30.2858 30.2857 30.1572 30.2857 30.0001V28.7144C30.2857 28.0822 29.775 27.5715 29.1429 27.5715ZM6.91785 24.5715C6.98928 24.5715 7.06071 24.5644 7.13214 24.5536L13.1393 23.5001C13.2107 23.4858 13.2786 23.4536 13.3286 23.4001L28.4679 8.26078C28.501 8.22774 28.5272 8.1885 28.5451 8.14529C28.5631 8.10209 28.5723 8.05577 28.5723 8.009C28.5723 7.96222 28.5631 7.91591 28.5451 7.8727C28.5272 7.8295 28.501 7.79025 28.4679 7.75721L22.5321 1.81793C22.4643 1.75007 22.375 1.71436 22.2786 1.71436C22.1821 1.71436 22.0929 1.75007 22.025 1.81793L6.88571 16.9572C6.83214 17.0108 6.79999 17.0751 6.78571 17.1465L5.73214 23.1536C5.69739 23.345 5.70981 23.5419 5.7683 23.7273C5.8268 23.9128 5.92962 24.0812 6.06785 24.2179C6.30357 24.4465 6.59999 24.5715 6.91785 24.5715Z" fill="black" />
                            </svg>
                                  </button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </div>
      );
  }

  return <div className="flex justify-center items-center w-full h-full"><h1 className="text-4xl">Loading....</h1></div>;
}
