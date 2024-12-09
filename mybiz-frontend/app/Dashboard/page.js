import Link from 'next/link';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGrip, faMoneyBill, faMoneyBillTrendUp, faGear } from "@fortawesome/free-solid-svg-icons";


export default function Dashboard(){
    return(
        <div className="h-screen">
            <nav className="relative h-[70px] flex items-center justify-between border-b">
                <div className='w-[20%] h-full flex items-center pl-[2%]'>
                    <Image
                        src="/Images/myBIZ.png"
                        alt="MyBiz Logo"
                        width={60}
                        height={40}
                    />
                </div>
            </nav>
            <div className="flex flex-row w-full h-screen">
                <div className="w-[20%] border-r border-b">
                    <ul className='flex flex-col justify-start'>
                        <li className='links'>
                            <Link href="/Home"><FontAwesomeIcon className='text-base mr-4' icon={faGrip} />Dashboard</Link>
                        </li>
                        <li className='links'>
                            <Link href="/Home"><FontAwesomeIcon className='text-base mr-4' icon={faMoneyBillTrendUp} />Expenses</Link>
                        </li>
                        <li className='links'>
                            <Link href="/dashboard"><FontAwesomeIcon className='text-base mr-4' icon={faMoneyBill} />Sales</Link>
                        </li>
                        <li className='links'>
                            <Link href="/dashboard"><FontAwesomeIcon className='text-base mr-4' icon={faGear} />Settings</Link>
                        </li>
                    </ul>
                </div>
                <main className='w-[80%] pr-[5%] pl-[5%] pt-[5%] flex flex-row flex-wrap gap-4'>
                    <div className='cards'>
                        <h5 className="text-text-lg flex justify-between items-center">
                            SALE POINT
                        </h5>
                        <h2 className='text-text-dk text-bold text-xl'>hey</h2>
                        <p className="text-text-lg text-xs">
                            Total number of gardens you have
                        </p>
                    </div>
                    <div className='cards'>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                    <div className='cards'></div>
                </main>
            </div>
        </div>
    );
};