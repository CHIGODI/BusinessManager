'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faMoneyBill, faMoneyBillTrendUp, faGear } from "@fortawesome/free-solid-svg-icons";
export default function SideNav(){
    const pathname = usePathname();

    return(
        <div className="w-[20%] border-r h-full border-b hidden sticky z-10 top-[70px] lg:block">
            <ul className='flex flex-col justify-start'>
                <Link href="/dashboard"
                    className={`links ${pathname.startsWith('/dashboard')?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faGrip} />
                        Dashboard
                    </li>
                </Link>
                <Link href="/expenses"
                    className={`links ${pathname.startsWith('/expenses') ?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faMoneyBillTrendUp} />
                        Expenses
                    </li>
                </Link>
                <Link href="/sales"
                    className={`links ${pathname.startsWith('/sales') ?
                        'bg-[#F5EFFF] text-[#4A007E]' : 'hover:bg-[#F5EFFF] hover:text-[#4A007E]'
                        }`}
                >
                    <li className='text-sm'>
                        <FontAwesomeIcon className="text-sm mr-4 text-[#001F3F]" icon={faMoneyBill} />
                        Sales
                    </li>
                </Link>
                <Link href="/settings"
                    className={`links ${pathname.startsWith('/settings') ?
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