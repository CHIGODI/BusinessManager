'use client';
import { useState } from 'react';
import NavBar from '../../components/navbar';
import SideNav from '../../components/sidenav';
import CheckoutCard from './components/CheckoutCard';
import ProductListCard from './components/ProductListCard';
import CartCard from './components/CartCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function SalePage() {
    const [viewTotal, setViewTotal] = useState(true);
    return (
        <div className="h-screen">
            <NavBar />
            <div className="flex flex-row w-full h-full">
                <SideNav />
                <div className="w-[80%] px-[2%] py-[2%]
                                h-full grid grid-cols-2
                                gap-x-4 bg-[#F8FAFC]">
                    {/* search products and days total  */}
                    <div className="col-span-2 flex items-center h-3/5">
                        <div className='w-1/2 flex
                                        items-center
                                        h-full'>
                            <input
                                type="text"
                                placeholder="Search product..."
                                className="text-sm w-[80%]
                                            p-4 border border-gray-300
                                            rounded-tl-full rounded-bl-full
                                            mt-4 mb-4 outline-none
                                            focus:border-purple-500
                                            "/>
                            <button className='text-sm
                                               text-white
                                               border-t border-b
                                               border-r p-4 rounded-tr-full
                                               rounded-br-full
                                               hover:bg-opacity-90
                                                w-[20%]
                                               bg-purple-600'>
                                Search
                            </button>
                        </div>
                        <div className='ml-auto p-4 w-2/6
                                        border rounded-xl shadow-sm
                                        flex flex-row justify-center
                                        items-center text-[#001F3F]
                                        bg-white
                                        h-full'>
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
                                            text-purple-600 font-bold`}>
                                Today's Total: 10,000
                            </h2>
                        </div>
                    </div>
                    {/* all products card */}
                    <ProductListCard />
                    {/* cart and checkout card */}
                    <div className='flex flex-col gap-4 h-[80%]'>
                        <CartCard />
                        <CheckoutCard />
                    </div>
                </div>
            </div>
        </div>
    );
}