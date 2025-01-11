'use client';
import SideNav from '../components/SideNav';
import Link from 'next/link';
import NavBar from '../../sharedComponents/NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowUpRightFromSquare, faCoins, faBox } from "@fortawesome/free-solid-svg-icons";
import { useSession } from 'next-auth/react';


function UserDashboard() {
    const { data: session, status } = useSession();
    console.log(session);

    if (status === 'loading') return null;

    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <main className="w-[100%] md:w-[80%] md:px-[2%] md:py-[2%] h-full flex flex-col gap-4">
                    {/* welcome message */}
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-600 pt-4 pl-4">Hello 👋🏽</h2>
                    </div>
                    {/* action cards */}
                    <div className="h-full overflow-y-scroll flex flex-col gap-4  items-center lg:items-start lg:flex-row lg:flex-wrap p-4 md:p-0">
                        <div className='cards flex flex-col justify-center'>
                            <h5 className='text-center text-[#001F3F]'>
                                MAKE SALE
                            </h5>
                            <FontAwesomeIcon className='text-5xl md:text-7xl mt-4 text-[#A6AEBF]' icon={faCartShopping} />
                            <Link href='/user/dashboard/sale' className='flex items-center justify-center'>
                                <button className='border text-[#001F3F]
                                                rounded p-2 mt-4 hover:bg-gray-100'
                                >
                                    Go to sale point
                                    <FontAwesomeIcon className='ml-2' icon={faArrowUpRightFromSquare} />
                                </button>
                            </Link>
                        </div>
                        <div className='cards flex flex-col justify-center'>
                            <h5 className='text-center text-[#001F3F]'>
                                DAY SUMMARY
                            </h5>
                            <FontAwesomeIcon className='text-5xl md:text-7xl mt-4 text-[#A6AEBF]' icon={faCoins} />
                            <Link href='#' className='flex items-center justify-center'>
                                <button className='border text-[#001F3F]
                                            rounded p-2 mt-4 hover:bg-gray-100'
                                >
                                    View summary
                                    <FontAwesomeIcon className='ml-2' icon={faArrowUpRightFromSquare} />
                                </button>
                            </Link>
                        </div>
                        <div className='cards flex flex-col justify-center'>
                            <h5 className='text-center text-[#001F3F]'>
                                ALL PRODUCTS
                            </h5>
                            <FontAwesomeIcon className='text-5xl md:text-7xl mt-4 text-[#A6AEBF]' icon={faBox} />
                            <Link href='/products' className='flex items-center justify-center'>
                                <button className='border text-[#001F3F]
                                            p-2 mt-4 hover:bg-gray-100'
                                >
                                    All products list
                                    <FontAwesomeIcon className='ml-2' icon={faArrowUpRightFromSquare} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;