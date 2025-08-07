'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faGrip, faMoneyBill, faBox, faGear, faCircleChevronDown, faChartLine } from "@fortawesome/free-solid-svg-icons";

export default function SideNav() {
    const pathname = usePathname();
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        useEffect(() => {
            const paths = ['sale', 'summary', 'products'];

            const isMatchingPath = paths.some((path) => pathname.startsWith(`/admin/dashboard/${path}`));

            setIsDropdownOpen(isMatchingPath);
        }, [pathname]);


        const handleDropdownToggle = () => {
            setIsDropdownOpen(!isDropdownOpen);
        };

    return (
        <div className="w-[20%] border-r h-[calc(100vh-70px)] border-b hidden sticky z-10 top-[70px] lg:block">
            <ul className='flex flex-col justify-start'>
                <Link href="/admin/dashboard"
                    className={`mb-1 links ${pathname.startsWith('/admin/dashboard') ?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                        onClick={handleDropdownToggle}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faGrip} />
                        Dashboard
                        {/* <FontAwesomeIcon className='ml-20' icon={faCircleChevronDown} /> */}
                    </li>
                </Link>
                {/* pages in dashboard path
                <ul className={`w-[82%] ml-[10%] transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'max-h-40' : 'max-h-0'}`}>
                    <Link href="/admin/dashboard/sale">
                        <li className={`p-2 mb-1 text-sm bg-gray-50 text-[#001F3F] ${pathname === '/admin/dashboard/sale' ? 'bg-[#A29] text-white' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'}`}>
                            Sale
                        </li>
                    </Link>
                    <Link href="/admin/dashboard/summary">
                        <li className={`p-2 mb-1 text-sm bg-gray-50  text-[#001F3F] ${pathname === '/admin/dashboard/summary' ? 'bg-[#A29] text-white' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'}`}>
                            Summary
                        </li>
                    </Link>
                </ul> */}
                <Link href="/admin/products"
                    className={`links ${pathname.startsWith('/admin/products') ?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faBox} />
                        All products
                    </li>
                </Link>
                <Link href="/admin/perfomance"
                    className={`links ${pathname.startsWith('/admin/perfomance') ?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faChartLine} />
                       Perfomance
                    </li>
                </Link>
                <Link href="/admin/sales"
                    className={`links ${pathname.startsWith('/admin/sales') ?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faMoneyBill} />
                        Sales
                    </li>
                </Link>
                <Link href="/admin/settings"
                    className={`links ${pathname.startsWith('/admin/settings') ?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faGear} />
                        Settings
                    </li>
                </Link>
            </ul>
        </div>
    )
}