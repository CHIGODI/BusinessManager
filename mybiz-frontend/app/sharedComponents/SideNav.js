'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faMoneyBill, faBox, faGear, faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
export default function SideNav(){
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    useEffect(() => {
        if (pathname.startsWith('/user/dashboard/sale')) {
            setIsDropdownOpen(true);
        }
    }, [pathname]);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <div className="w-[20%] h-full border-r border-b sticky z-10 top-[70px] hidden lg:block">
            <ul className='flex flex-col justify-start'>
                <Link href="/user/dashboard"
                    className={`links mb-1 ${pathname.startsWith('/user/dashboard')?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                    onClick={handleDropdownToggle}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faGrip} />
                        Dashboard
                        <FontAwesomeIcon className='ml-20' icon={faCircleChevronDown} />
                    </li>
                </Link>
                {/* pages in dashboard path */}
                <ul className={`w-[82%] ml-[10%] transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'max-h-40' : 'max-h-0'}`}>
                    <Link href="/user/dashboard/sale">
                        <li className={`p-2 mb-1 text-sm bg-gray-50 text-[#001F3F] ${pathname === '/user/dashboard/sale' ? 'bg-[#AA80FF] text-white' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'}`}>
                            Sale
                        </li>
                    </Link>
                    <Link href="/user/dashboard/summary">
                        <li className={`p-2 mb-1 text-sm bg-gray-50  text-[#001F3F] ${pathname === '/user/dashboard/summary' ? 'bg-purple-100 text-white' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'}`}>
                            Summary
                        </li>
                    </Link>
                    <Link href="/user/dashboard/products">
                        <li className={`p-2 mb-1 text-sm bg-gray-50 text-[#001F3F] ${pathname === '/user/dashboard/products' ? 'bg-purple-200 text-white' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'}`}>
                            Products
                        </li>
                    </Link>
                </ul>
                <Link href="/user/products"
                    className={`links ${pathname.startsWith('/user/products') ?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faBox} />
                        All products
                    </li>
                </Link>
                <Link href="/user/sales"
                    className={`links ${pathname.startsWith('/user/sales') ?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faMoneyBill} />
                        Sales
                    </li>
                </Link>
                <Link href="/user/settings"
                    className={`links ${pathname.startsWith('/user/settings') ?
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