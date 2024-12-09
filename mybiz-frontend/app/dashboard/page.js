import Link from 'next/link';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGrip, faMoneyBill, faMoneyBillTrendUp, faGear, faArrowUpRightFromSquare, faCoins, faBox } from "@fortawesome/free-solid-svg-icons";


export default function Dashboard(){
    return(
        <div className="h-screen box-border">
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
                <main className='w-[80%] pr-[5%] pl-[5%] pt-[5%] flex flex-row flex-wrap gap-4'>
                    <div className='cards flex flex-col justify-center'>
                        <h5 className='text-center text-[#001F3F]'>
                            MAKE SALE
                        </h5>
                        <FontAwesomeIcon className='text-7xl mt-4 text-[#A6AEBF]' icon={faCartShopping} />
                        <button className='border text-[#001F3F] rounded p-2 mt-4 hover:bg-[#F8FAFC]'>Go to sale point<FontAwesomeIcon className='ml-2' icon={faArrowUpRightFromSquare} /></button>
                    </div>
                    <div className='cards flex flex-col justify-center'>
                        <h5 className='text-center text-[#001F3F]'>
                            DAY SUMMARY
                        </h5>
                        <FontAwesomeIcon className='text-7xl mt-4 text-[#A6AEBF]' icon={faCoins} />
                        <button className='border text-[#001F3F] rounded p-2 mt-4 hover:bg-[#F8FAFC]'>View day summary<FontAwesomeIcon className='ml-2' icon={faArrowUpRightFromSquare} /></button>
                    </div>
                    <div className='cards flex flex-col justify-center'>
                        <h5 className='text-center text-[#001F3F]'>
                            ALL PRODUCTS
                        </h5>
                        <FontAwesomeIcon className='text-7xl mt-4 text-[#A6AEBF]' icon={faBox} />
                        <button className='border text-[#001F3F] rounded p-2 mt-4 hover:bg-[#FFEB3B]'>Go to sale point<FontAwesomeIcon className='ml-2' icon={faArrowUpRightFromSquare} /></button>
                    </div>
                </main>
            </div>
        </div>
    );
};