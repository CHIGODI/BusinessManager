'use client'
import Image from "next/image";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavBar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openMenu = () => {
        setIsMenuOpen(isMenuOpen ? false : true);
    };

    return(
        <nav className="relative h-[70px] flex items-center justify-between border-b">
            <div className='w-[100%] pl-[2.5%] pr-[2.5%] h-full flex items-center justify-between md:pl-[2%] md:w-[20%] md:pr-0'>
                <Image
                    src="/Images/myBIZ.png"
                    alt="MyBiz Logo"
                    width={60}
                    height={40}
                />
                <FontAwesomeIcon className="text-purple-800 text-3xl md:invisible" icon={faBars} onClick={openMenu} />
            </div>
        </nav>
    )
}