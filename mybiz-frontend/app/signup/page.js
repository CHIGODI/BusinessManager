'use client';
import axios from "axios";
import Link from "next/link";
import { toast } from 'react-toastify';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword || !email) {
            toast.error('All fields are required!');
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const data = {
            'email': email,
            'username': username,
            'password': password
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/account/register/",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response.status === 201){
                toast.success('Account created successfully');
                router.push('/login');
            };
        } catch (error) {
            if (error.response.data.username && error.response.data.email) {
                toast.error(error.response.data.username[0]);
            } else if (error.response.data.email) {
                toast.error(error.response.data.email[0]);
            }   else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

return (
    <div className="h-screen
                        flex flex-row
                        items-center
                        "
    >
        <div className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            w-full
                            lg:w-1/2
                            m-auto
                            h-full">

            <div className="flex flex-col justify-center bg-purple-600
                                w-[90%] lg:w-[70%]
                                h-[70%]
                                p-8
                                shadow-md
                                ">
                <header className="
                                text-center mb-4
                                text-2xl font-bold
                                text-white"
                >
                   Create an Account
                </header>
                <form className="flex flex-col
                            space-y-4
                            "
                    onSubmit={handleSignup}
                >
                    <div className="flex flex-row gap-2 w-full">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`p-2
                                w-1/2
                                text-sm
                                lg:text-base
                                `}
                        />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="John"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`p-2 border
                                w-1/2
                                text-sm
                                lg:text-base
                               `}
                        />
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`p-2 border
                                text-sm
                                lg:text-base
                               `}
                    />
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Retype password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`p-2 border
                                text-sm
                               lg:text-base
                               `}
                    />
                    <button
                        type="submit"
                        className="my-4
                                w-full
                                py-3 bg-purple-950
                                text-white -lg
                                hover:bg-purple-600
                                focus:outline-none focus:ring-2
                                focus:ring-purple-500
                                text-sm
                                lg:text-base
                                "
                    >
                        Create Account
                    </button>
                    <div className="text-center">
                        <Link href="/login" className="text-gray-300 text-sm hover:underline hover:text-white lg:text-base">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
)};

export default SignUpPage;