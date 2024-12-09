import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faMoneyBill, faMoneyBillTrendUp, faGear } from "@fortawesome/free-solid-svg-icons";

export default function SideNav(){
    return(
        <div className="w-[20%] border-r border-b shadow-right-sm">
            <ul className='flex flex-col justify-start'>
                <li className='links'>
                    <Link href="/Home"><FontAwesomeIcon className='text-base mr-4 text-[#001F3F]' icon={faGrip} />Dashboard</Link>
                </li>
                <li className='links'>
                    <Link href="/Home"><FontAwesomeIcon className='text-base mr-4 text-[#001F3F]' icon={faMoneyBillTrendUp} />Expenses</Link>
                </li>
                <li className='links'>
                    <Link href="/dashboard"><FontAwesomeIcon className='text-base mr-4 text-[#001F3F]' icon={faMoneyBill} />Sales</Link>
                </li>
                <li className='links'>
                    <Link href="/dashboard"><FontAwesomeIcon className='text-base mr-4 text-[#001F3F]' icon={faGear} />Settings</Link>
                </li>
            </ul>
        </div>
    )
}