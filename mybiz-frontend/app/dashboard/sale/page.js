'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../../components/navbar';
import SideNav from '../../components/sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function SalePage() {
    const [viewTotal, setViewTotal] = useState(true);
    const [hide, setHide] = useState(false);

    const data = [
        { item: 'Neocidal', qty: 5, sellingPrice: 'Ksh 5000', manufacturer: 'Company A' },
        { item: 'Okra', qty: 10, sellingPrice: 'Ksh 3000', manufacturer: 'Company B' },
        { item: 'Kungunil', qty: 8, sellingPrice: 'Ksh 4000', manufacturer: 'Company C' },
        { item: 'Tomato', qty: 15, sellingPrice: 'Ksh 2000', manufacturer: 'Company D' },
        { item: 'Maize', qty: 12, sellingPrice: 'Ksh 2500', manufacturer: 'Company E' },
        { item: 'Rice', qty: 30, sellingPrice: 'Ksh 3500', manufacturer: 'Company F' },
        { item: 'Wheat', qty: 20, sellingPrice: 'Ksh 2800', manufacturer: 'Company G' },
    ];

    return (
        <div className="h-screen">
            <NavBar />
            <div className="flex flex-row w-full h-screen">
                <SideNav />
                <div className="w-[80%] pl-[2%] pr-[2%] h-full grid grid-cols-2 gap-4 bg-[#F8FAFC]">
                    <div className="col-span-2 flex items-center h-auto gap-4">
                        <div className='bg-white
                                        shadow-sm rounded-lg
                                        border w-1/2 flex
                                        items-center
                                        justify-center
                                        '
                        >
                            <input
                                type="text"
                                placeholder="Search product..."
                                className="text-sm w-[70%]
                                            p-4 border border-gray-300
                                            rounded-tl-full rounded-bl-full
                                            mt-4 mb-4 outline-none
                                            focus:border-purple-500
                                            "
                            />
                            <button className='text-sm
                                               text-white
                                               border-t border-b
                                               border-r p-4 rounded-tr-full
                                               rounded-br-full
                                               hover:bg-opacity-90
                                               h-full
                                               bg-purple-600
                                               '
                            >
                                Search
                            </button>
                        </div>
                        <div className='ml-auto p-4 w-1/2
                                        border rounded-xl shadow-sm
                                        flex flex-row justify-center
                                        items-center text-[#001F3F]
                                        bg-white'
                        >
                            <FontAwesomeIcon icon={faEye} aria-hidden="true"
                                className={`text-sm ${viewTotal ? 'block' : 'invisible'}
                                            cursor-pointer
                                            p-2 rounded-lg
                                            hover:bg-gray-200
                                            text-gray-600
                                        `}
                                onClick={() => setViewTotal(!viewTotal)}
                            />
                            <FontAwesomeIcon icon={faEyeSlash} aria-hidden="true"
                                className={`text-sm ${viewTotal ? 'invisible' : 'block'}
                                            cursor-pointer
                                            p-2 rounded-lg
                                            hover:bg-gray-200
                                            text-gray-600
                                        `}
                                onClick={() => setViewTotal(!viewTotal)}
                            />
                            <h2 className={`${viewTotal ? '' : 'filter blur-sm'}
                                            text-purple-600 font-bold`}
                            >
                                Total: 10,000
                            </h2>
                        </div>
                    </div>
                    <div className="rounded-xl border h-full
                                    shadow-sm overflow-y-scroll scrollbar-thin
                                    scrollbar-thumb-rounded-full
                                    scrollbar-track-rounded
                                    scrollbar-thumb-gray-500
                                    scrollbar-track-gray-300
                                    bg-white"
                    >
                        <Link href='/products' className='hover:underline hover:text-[#01F3F]'>
                            <h2 className='top-0 z-10 p-4 text-gray-600 font-bold bg-white'>ALL PRODUCTS</h2>
                        </Link>
                        <table className='w-full'>
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

                    <div className='flex flex-col gap-4 h-full'>
                        <div className='h-[60%] border rounded-xl shadow-sm overflow-y-scroll'>
                            <h2 className='p-4 text-gray-600 font-bold bg-white flex justify-between'>
                                CART
                                <FontAwesomeIcon className='text-base mt-4 text-gray-600' icon={faCartShopping} />
                            </h2>
                            <table className='w-full'>
                                <thead className="sticky top-0 bg-gray-100 z-10">
                                    <tr>
                                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Item</th>
                                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Qty</th>
                                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Selling Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-50 h-[2%]">
                                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.item}</td>
                                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.qty}</td>
                                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.sellingPrice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    </div>
                    <div className='border rounded-xl shadow-sm overflow-y-scroll h-[40%]'>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}