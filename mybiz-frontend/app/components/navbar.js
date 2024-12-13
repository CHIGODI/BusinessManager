'use client'
import Image from "next/image";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function NavBar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openMenu = () => {
        setIsMenuOpen(isMenuOpen ? false : true);
    };

    return(
        <nav className="relative h-[70px] flex items-center justify-between border-b">
            <div className='w-[100%] pl-[2.5%] pr-[2.5%] h-full flex items-center justify-between lg:pl-[2%] lg:w-[20%] lg:pr-0'>
                <Image
                    src="/Images/myBIZ.png"
                    alt="MyBiz Logo"
                    width={60}
                    height={40}
                />
                <FontAwesomeIcon className="text-purple-800 text-3xl lg:invisible" icon={faBars} onClick={openMenu} />
            </div>
            <div className="hidden lg:flex w-1/6 h-1/2 mr-[5%] relative items-center justify-end">
                <div className="w-[20%] h-[100%] rounded-[50%] mx-[5%] bg-gray-200">
                </div>
                <FontAwesomeIcon className="text-sm text-[#001F3F] hover:text-[#4A007E] p-2 hover:bg-gray-200 rounded-md" icon={faRightFromBracket} />
                <div className="absolute bg-green-500 w-full h-[20vh] invisible"></div>
            </div>
        </nav>
    )
}