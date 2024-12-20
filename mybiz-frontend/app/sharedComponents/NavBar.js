'use client'
import Image from "next/image";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function NavBar(){
    const Router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openMenu = () => {
        setIsMenuOpen(isMenuOpen ? false : true);
    };
    const handleLogout = async () => {
        await axios.post(
            'http://localhost:8000/api/v1/account/logout/',
            { refresh: Cookies.get('refresh_token') },
            {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('access_token')}`,
                }
            }
        ).then((response) => {
            console.log(response);
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            Router.push('/');
        }).catch((error) => {
            console.log(error);
            toast.error('Error logging out');
        });
    };

    return(
        <nav className="sticky z-10 top-0 h-[70px] flex items-center justify-between border-b bg-white">
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
                <FontAwesomeIcon  onClick={handleLogout} className="text-sm text-[#001F3F] hover:text-[#4A007E] p-2 hover:bg-gray-200 rounded-md" icon={faRightFromBracket} />
                <div className="absolute bg-green-500 w-full h-[20vh] invisible"></div>
            </div>
        </nav>
    )
}