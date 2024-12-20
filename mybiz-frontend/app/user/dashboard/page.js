import SideNav from '../../sharedComponents/SideNav';
import Link from 'next/link';
import NavBar from '../../sharedComponents/NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowUpRightFromSquare, faCoins, faBox } from "@fortawesome/free-solid-svg-icons";
import withRole from '../../hoc/withRole';


function Dashboard() {
    return (
        <div className="h-screen box-border">
            <NavBar />
            <div className="flex flex-row w-full h-screen justify-center">
                <SideNav />
                <main className='w-[80%] pr-[5%] pl-[5%] pt-[5%]
                                flex flex-col lg:flex-row
                                lg:flex-wrap gap-4'
                >
                    <div className='cards flex flex-col justify-center'>
                        <h5 className='text-center text-[#001F3F]'>
                            MAKE SALE
                        </h5>
                        <FontAwesomeIcon className='text-7xl mt-4 text-[#A6AEBF]' icon={faCartShopping} />
                        <Link href='/user/dashboard/sale' className='flex items-center justify-center'>
                            <button className='border text-[#001F3F]
                                                rounded p-2 mt-4 hover:bg-gray-200'
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
                        <FontAwesomeIcon className='text-7xl mt-4 text-[#A6AEBF]' icon={faCoins} />
                        <Link href='#' className='flex items-center justify-center'>
                            <button className='border text-[#001F3F]
                                               rounded p-2 mt-4 hover:bg-gray-200'
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
                        <FontAwesomeIcon className='text-7xl mt-4 text-[#A6AEBF]' icon={faBox} />
                        <Link href='/products' className='flex items-center justify-center'>
                            <button className='border text-[#001F3F]
                                            rounded p-2 mt-4 hover:bg-gray-200'
                            >
                                All products list
                                <FontAwesomeIcon className='ml-2' icon={faArrowUpRightFromSquare} />
                            </button>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default withRole(Dashboard, ['user']);