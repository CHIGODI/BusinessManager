import Link from 'next/link';
// import Landing1 from '../../public/Landing1.jpg';

export default function LandingPage({ pathname }) {

    const isActive = (href) => pathname === href;

    return (
        <div className="h-screen ml-[5%] mr-[5%]">
            <nav className="h-[70px] flex items-center justify-between">
                <div className="w-[50%] Logo">
                    <h1 className="text-purple-800">myBIZ</h1>
                </div>
                <ul className="w-[50%] flex items-center justify-around">
                    <li className={`relative ${isActive('/Home') ? 'text-purple-500' : ''}`}><Link href="/Home">Home</Link></li>
                    <li className={`relative ${isActive('/Home') ? 'text-purple-500' : ''}`}><Link href="/dashboard">Our Services</Link></li>
                    <li className={`relative ${isActive('/Home') ? 'text-purple-500' : ''}`}><Link href="/dashboard">About Us</Link></li>
                    <li>
                        <Link href="/SignUp">
                            <button className="w-[120px] border border-purple-500 text-purple-500 py-2 px-4 rounded-full hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
                                SignUp
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Login">
                            <button className="w-[120px] bg-purple-700 text-white py-2 px-4 rounded-full hover:bg-purple-500 transition duration-300 ease-in-out">
                                Login
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
            <main className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white">
                <div className="md:w-1/2 space-y-4 bg-red-400">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Think, plan, and track all in one place
                    </h2>
                    <p className="text-lg text-gray-700">
                        Efficiently manage your tasks and boost productivity.
                    </p>
                    <button className="bg-purple-600 text-white px-6 py-3 text-lg rounded hover:bg-blue-700">
                        Get started
                    </button>
                </div>
                {/* Image */}
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img
                        src="/Images/Landing2.jpg"
                        alt="ChronoTask Dashboard"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </main>
            <section className="services">
            </section>
            <footer>
            </footer>
        </div>
    );
}
