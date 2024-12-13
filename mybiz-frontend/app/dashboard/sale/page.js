'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../../components/navbar';
import SideNav from '../../components/sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function SalePage() {

    const data = [
        { item: 'Neocidal xxxxxxxxxxxx', qty: 5, sellingPrice: 'Ksh 5000', manufacturer: 'Company A' },
        { item: 'Okra', qty: 10, sellingPrice: 'Ksh 3000', manufacturer: 'Company B' },
        { item: 'Kungunil', qty: 8, sellingPrice: 'Ksh 4000', manufacturer: 'Company C' },
        { item: 'Tomato', qty: 15, sellingPrice: 'Ksh 2000', manufacturer: 'Company D' },
        { item: 'Maize', qty: 12, sellingPrice: 'Ksh 2500', manufacturer: 'Company E' },
        { item: 'Rice', qty: 30, sellingPrice: 'Ksh 3500', manufacturer: 'Company F' },
        { item: 'Wheat', qty: 20, sellingPrice: 'Ksh 2800', manufacturer: 'Company G' },
        { item: 'Potato', qty: 18, sellingPrice: 'Ksh 1500', manufacturer: 'Company H' },
        { item: 'Carrot', qty: 25, sellingPrice: 'Ksh 1800', manufacturer: 'Company I' },
        { item: 'Onion', qty: 40, sellingPrice: 'Ksh 2200', manufacturer: 'Company J' },
        { item: 'Maize', qty: 12, sellingPrice: 'Ksh 2500', manufacturer: 'Company E' },
        { item: 'Rice', qty: 30, sellingPrice: 'Ksh 3500', manufacturer: 'Company F' },
        { item: 'Wheat', qty: 20, sellingPrice: 'Ksh 2800', manufacturer: 'Company G' },
        { item: 'Potato', qty: 18, sellingPrice: 'Ksh 1500', manufacturer: 'Company H' },
        { item: 'Carrot', qty: 25, sellingPrice: 'Ksh 1800', manufacturer: 'Company I' },
        { item: 'Onion', qty: 40, sellingPrice: 'Ksh 2200', manufacturer: 'Company J' },
    ];

    return (
        <div className="h-screen">
            <NavBar />
            <div className="flex flex-row w-full h-screen">
                <SideNav />
                <div className="w-[80%] pl-[2%] pr-[2%] h-full grid grid-cols-2 gap-4 bg-[#F8FAFC]">
                    <div className="col-span-2 flex items-center  h-auto">
                        <input
                            type="text"
                            placeholder="Search product..."
                            className="text-sm w-[50%] p-4 border border-gray-300 rounded-tl-full rounded-bl-full mt-4 mb-4 outline-none focus:border-purple-500"
                        />
                        <button className='text-sm text-gray-500 border-t border-b border-r p-4 rounded-tr-full rounded-br-full hover:bg-opacity-90'>Search</button>
                        <div className='ml-auto p-4 w-1/6 border rounded-xl shadow-sm flex flex-row justify-between items-center text-[#001F3F] bg-white'>
                            <FontAwesomeIcon icon={faEye} className='text-sm' />
                            <FontAwesomeIcon className='text-sm'  icon={faEyeSlash} />
                            <h2>Total: 10,000</h2>
                        </div>
                    </div>
                    <div className="rounded-xl border h-full shadow-sm overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded scrollbar-thumb-gray-500 scrollbar-track-gray-300 bg-white">
                        <h2 className='top-0 z-10 p-4 text-gray-600 font-bold bg-white'>ALL PRODUCTS</h2>
                        <table className='w-full h-full'>
                            <thead className="sticky top-0 bg-gray-100 z-10">
                                    <tr>
                                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Item</th>
                                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Qty</th>
                                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Selling Price</th>
                                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Manufacturer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-50 h-[2%]">
                                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.item}</td>
                                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.qty}</td>
                                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.sellingPrice}</td>
                                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.manufacturer}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    <div className='grid grid-cols-subgrid col-span-1 gap-4'>
                        <div className='border rounded-xl shadow-sm bg-white'>
                            <h2 className='p-4 text-gray-600 font-bold'>PRODUCT DETAILS</h2>
                            <div className='p-4'>
                                <h3 className='text-sm text-gray-600'>Item: Neocidal xxxxxxxxxxxx</h3>
                                <h3 className='text-sm text-gray-600'>Qty: 5</h3>
                                <h3 className='text-sm text-gray-600'>Selling Price: Ksh 500
                                </h3>
                                <h3 className='text-sm text-gray-600'>Manufacturer: Company A</h3>
                            </div>
                        </div>
                        <div className='border rounded-xl shadow-sm bg-white'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}