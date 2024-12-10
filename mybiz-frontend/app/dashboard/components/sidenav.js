import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faMoneyBill, faMoneyBillTrendUp, faGear } from "@fortawesome/free-solid-svg-icons";
export default function SideNav(){

    return(
        <div className="w-[20%] border-r border-b shadow-right-sm hidden md:block">
            <ul className='flex flex-col justify-start'>
                <Link href="/dashboard">
                    <li className="links">
                        <FontAwesomeIcon className="text-base mr-4 text-[#001F3F]" icon={faGrip} />
                        Dashboard
                    </li>
                </Link>
                <Link href="/Home">
                    <li className="links">
                        <FontAwesomeIcon className="text-base mr-4 text-[#001F3F]" icon={faMoneyBillTrendUp} />
                        Expenses
                    </li>
                </Link>
                <Link href="/dashboard">
                    <li className="links">
                        <FontAwesomeIcon className="text-base mr-4 text-[#001F3F]" icon={faMoneyBill} />
                        Sales
                    </li>
                </Link>
                <Link href="/dashboard">
                    <li className="links">
                        <FontAwesomeIcon className="text-base mr-4 text-[#001F3F]" icon={faGear} />
                        Settings
                    </li>
                </Link>
            </ul>
        </div>
    )
}