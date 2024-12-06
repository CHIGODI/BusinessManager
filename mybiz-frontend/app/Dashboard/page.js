'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function DashboardPage() {
    return (
        <div className="h-screen">
            <nav className="relative h-[70px] flex items-center justify-between border-b">
                <div className='w-[20%] h-full flex items-center justify-center'>
                    <p className='font-bold text-gray-500'>myBIZ</p>
                </div>
            </nav>
            <div className="flex flex-row w-full h-full">
                <div className="w-[20%] border-r border-l">
                    <ul>
                        <li className='links'>
                            <Link href="/Home">Dashboard</Link>
                        </li>
                        <li className='links'>
                            <Link href="/Home">Expenses</Link>
                        </li>
                        <li className='links'>
                            <Link href="/dashboard">Sales</Link>
                        </li>
                        <li className='links'>
                            <Link href="/dashboard">Settings</Link>
                        </li>
                    </ul>

                </div>
                <div className="w-[80%] pl-[2%] pr-[2%]">
                    <div className="w-full flex justify-center items-center">
                        <input
                            type="text"
                            placeholder="Search product..."
                            className="text-sm w-[50%] p-2 border border-gray-300 rounded-tl-full rounded-bl-full mt-4 mb-4 outline-none focus:border-purple-500"
                        />
                        <button className='text-sm text-gray-500 border-t border-b border-r p-2 bg-purple-500 text-white rounded-tr-full rounded-br-full hover:bg-opacity-90'>Search</button>
                    </div>
                    <div className="flex bg-white rounded-xl w-[100%] border h-full shadow-sm">
                        <ol>
                            <li>Okra </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}