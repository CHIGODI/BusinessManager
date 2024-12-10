'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../components/navbar';
import SideNav from '../components/sidenav';

export default function SalePage() {

    const data = [
        { item: 'Neocidal', qty: 5, sellingPrice: 'Ksh 5000', manufacturer: 'Company A' },
        { item: 'Okra', qty: 10, sellingPrice: 'Ksh 3000', manufacturer: 'Company B' },
        { item: 'Kungunil', qty: 8, sellingPrice: 'Ksh 4000', manufacturer: 'Company C' },
        { item: 'Tomato', qty: 15, sellingPrice: 'Ksh 2000', manufacturer: 'Company D' },
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
                <div className="w-[80%] pl-[2%] pr-[2%] h-full">
                    <div className="w-full flex justify-center items-center">
                        <input
                            type="text"
                            placeholder="Search product..."
                            className="text-sm w-[50%] p-2 border border-gray-300 rounded-tl-full rounded-bl-full mt-4 mb-4 outline-none focus:border-purple-500"
                        />
                        <button className='text-sm text-gray-500 border-t border-b border-r p-2 bg-purple-500 rounded-tr-full rounded-br-full hover:bg-opacity-90'>Search</button>
                    </div>
                    <div className="flex bg-white rounded-xl w-[100%] border h-[85%] shadow-sm">
                        <table className='w-full'>
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b px-4 py-2 text-left text-gray-600">Item</th>
                                    <th className="border-b px-4 py-2 text-left text-gray-600">Qty</th>
                                    <th className="border-b px-4 py-2 text-left text-gray-600">Selling Price</th>
                                    <th className="border-b px-4 py-2 text-left text-gray-600">Manufacturer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50 h-[2%]">
                                        <td className="border-b px-4 py-2">{row.item}</td>
                                        <td className="border-b px-4 py-2">{row.qty}</td>
                                        <td className="border-b px-4 py-2">{row.sellingPrice}</td>
                                        <td className="border-b px-4 py-2">{row.manufacturer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}