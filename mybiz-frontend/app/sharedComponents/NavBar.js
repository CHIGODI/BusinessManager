'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function NavBar() {
    const Router = useRouter();
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(isMenuOpen ? false : true);
    };

    const handleLogout = async () => {
        if (!session) {
            return;
        }
        setIsLoggingOut(true);
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
            toast.error('Error logging out');
        }).finally(() => {
            setIsLoggingOut(false);
        });
    };

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
                    <FontAwesomeIcon className="text-purple-800 text-3xl lg:invisible" icon={faBars} onClick={openMenu} />
                </div>
                <div className="hidden lg:flex w-1/2 h-full mr-[5%] relative items-center justify-end">
                    <div className="skeleton-text"></div>
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
                <div className="w-[30%] h-[70%]  justify-end flex items-center">
                    <FontAwesomeIcon className='p-2 text-sm text-gray-600 hover:bg-gray-200' icon={faUser} />
                    <FontAwesomeIcon
                        onClick={handleLogout}
                        className={`text-xs text-gray-600 p-2 hover:bg-gray-200 ${isLoggingOut ? 'opacity-50 pointer-events-none' : ''}`}
                        icon={faRightFromBracket}
                    />
                </div>
            </div>
        </nav>
    );
}
