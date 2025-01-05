'use client';
import Image from "next/image";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function NavBar() {
    const Router = useRouter();
    const { data: session, status } = useSession(); // Get session data and status
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(isMenuOpen ? false : true);
    };

    const handleLogout = async () => {
        console.log(session.user.refresh);
        console.log(session.user.access);
        await axios.post(
            'http://localhost:8000/api/v1/account/logout/',
            { 'refresh': session?.user?.refresh },
            {
                headers: {
                    "Authorization": `Bearer ${session?.user?.access}`,
                }
            },
        ).then((response) => {
            if (response.status === 205) {
                signOut({ callbackUrl: '/' });
                Router.push('/');
            }
        }).catch((error) => {
            console.log(error);
            toast.error('Error logging out');
        });
    };

    // Check if the session is loading
    if (status === "loading") {
        return (
            <nav className="sticky z-10 top-0 h-[70px] flex items-center justify-between border-b bg-white">
                <div className='w-[100%] pl-[2.5%] pr-[2.5%] h-full flex items-center justify-between lg:pl-[2%] lg:w-[20%] lg:pr-0'>
                    <Image
                        src="/Images/myBIZ.png"
                        alt="MyBiz Logo"
                        width={60}
                        height={40}
                    />
                    <p className="text-gray-500 text-sm">Loading...</p> {/* Show loading state */}
                </div>
            </nav>
        );
    }

    return (
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
            <div className="hidden lg:flex w-1/2 h-full mr-[5%] relative items-center justify-end">
                <div className="w-[30%] h-[70%] border border-purple-600 mx-[5%] flex items-center gap-4 p-4 rounded-full">
                    <FontAwesomeIcon className='border border-purple-600 rounded-full p-2 text-gray-950' icon={faUser} />
                    <p className="text-sm text-gray-600">{session?.user?.email}</p>
                </div>
                <FontAwesomeIcon onClick={handleLogout} className="text-sm text-[#001F3F] hover:text-[#4A007E] p-2 hover:bg-gray-200 rounded-md" icon={faRightFromBracket} />
                <div className="absolute bg-green-500 w-full h-[20vh] invisible"></div>
            </div>
        </nav>
    );
}
