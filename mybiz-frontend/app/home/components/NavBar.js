'use client'
import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className="relative h-[70px] flex items-center justify-between">
            <div className="w-[50%] Logo">
                <h1 className="text-purple-800">myBIZ</h1>
            </div>
            <ul className="w-[50%] flex items-center justify-around">
                <Link href="/home">
                    <li className="cursor-pointer hover:text-purple-700 transition duration-300 ease-in-out">
                        Home
                    </li>
                </Link>
                <Link href="/services">
                    <li className="cursor-pointer hover:text-purple-700 transition duration-300 ease-in-out">
                        Our Services
                    </li>
                </Link>
                <Link href="/about-us">
                    <li className="cursor-pointer hover:text-purple-700 transition duration-300 ease-in-out">
                        About Us
                    </li>
                </Link>
                <Link href="/signup">
                    <li className="cursor-pointer">
                        <button
                            className="
                            w-[120px] border
                            border-purple-500
                            text-purple-500
                            py-2 px-4 rounded-full
                            hover:bg-purple-700
                            hover:text-white
                            transition duration-300
                            ease-in-out
                        ">
                            SignUp
                        </button>
                    </li>
                </Link>
                <Link href="/signup">
                    <li>
                        <button
                            className="
                            w-[120px]
                            bg-purple-700
                            text-white
                            py-2 px-4 rounded-full
                            hover:bg-purple-500
                            transition duration-300
                            ease-in-out
                            "
                        >
                            Login
                        </button>
                    </li>
                </Link>
            </ul>
        </nav>
    );
};