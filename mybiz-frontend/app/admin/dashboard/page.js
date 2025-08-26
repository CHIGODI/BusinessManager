'use client';
import { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import Link from 'next/link';
import NavBar from '../../sharedComponents/NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowUpRightFromSquare, faCoins, faBox } from "@fortawesome/free-solid-svg-icons";
import { useSession } from 'next-auth/react';


function AdminDashboard() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const[greeting, setGreeting] = useState('');


    useEffect(() => {
        if (status !== 'loading') {
            setLoading(false);
        }
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good morning');
        } else if (hour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good evening');
        }

    }, [status]);

    if (loading) {
        return null
    }

    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <main className="w-[100%] md:w-[80%] md:px-[2%] md:py-[2%] h-full flex flex-col gap-4">
                    {/* welcome message */}
                    <div className="border-l border-green-500 flex items-center justify-center items-center p-4 w-fit">
                        <h2 className="text-gray-600">
                            <span className="block text-2xl font-bold">{greeting} !</span>
                            <span className="block font-semibold">{session?.user?.username}</span>
                            <span className="block text-xs">welcome to your dashboard</span>
                        </h2>
                    </div>
                    {/* action cards */}
                    <div className="h-full overflow-y-scroll flex flex-col gap-4  items-center lg:items-start lg:flex-row lg:flex-wrap p-4 md:p-0">
                        <div className='cards flex flex-col justify-center'>
                            <h5 className='text-center text-[#001F3F]'>
                                MAKE SALE
                            </h5>
                            <FontAwesomeIcon className='text-5xl md:text-7xl mt-4 text-[#A6AEBF]' icon={faCartShopping} />
                            <Link href='/admin/dashboard/sale' className='flex items-center justify-center'>
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
                                SUMMARY
                            </h5>
                            <FontAwesomeIcon className='text-5xl md:text-7xl mt-4 text-[#A6AEBF]' icon={faCoins} />
                            <Link href='/admin/perfomance/' className='flex items-center justify-center'>
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
                            <Link href='/admin/products' className='flex items-center justify-center'>
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

export default AdminDashboard;