'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faMoneyBill, faBox, faGear } from "@fortawesome/free-solid-svg-icons";
export default function SideNav(){
    const pathname = usePathname();

    return(
        <div className="w-[20%] border-r h-full border-b hidden sticky z-10 top-[70px] lg:block">
            <ul className='flex flex-col justify-start'>
                <Link href="/admin/dashboard"
                    className={`links ${pathname.startsWith('/admin/dashboard')?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faGrip} />
                        Dashboard
                    </li>
                </Link>
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