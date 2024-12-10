'use client'
import Link from 'next/link'
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, fas } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openMenu = () => {
        setIsMenuOpen(isMenuOpen ? false : true);
    };

    return (
        <nav className="relative h-[15%] pl-[2.5%] pr-[2.5%] flex flex-col md:h-[70px] md:items-center md:flex-row md:justify-between md:p-0">
            <div className="flex justify-between items-center h-[70px] md:h-auto w-full md:w-[50%]">
                <Image
                    src="/Images/myBIZ2.png"
                    alt="MyBiz Logo"
                    width={60}
                    height={30}
                    className='flex items-center justify-center'
                />
                <FontAwesomeIcon className="text-purple-800 text-3xl md:invisible" icon={faBars} onClick={openMenu} />
            </div>
            <ul
                className={`absolute top-[100%] pl-[2.5%] pr-[2.5%] bg-[#F2F9FF] left-0 w-full flex flex-col gap-8 transition-[height] duration-500 ease-in-out ${isMenuOpen ? "h-[60vh] opacity-100" : "h-0 opacity-0"
                    } md:static md:h-auto md:opacity-100 md:gap-0 md:flex-row md:justify-around md:transition-none md:items-center md:bg-white md:p-0`}
            >
                <Link href="/home">
                    <li className="cursor-pointer hover:text-purple-700 transition duration-300 ease-in-out mt-[2.5%]">
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